import * as fs from "fs";
import * as path from "path";

let rawData = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split(/\n/);

let linesUnfiltered = rawData.slice(0, 4);
let operatorUnfiltered = rawData.slice(4)[0];

let lines = linesUnfiltered.map((e) => e.trim().split(/ +/));
let operator = operatorUnfiltered?.trim().split(/ +/);
// console.log(lines2);
// console.log(operator);
function part1() {
  let result = 0;
  if (operator != undefined)
    for (let op = 0; op < operator?.length; op++) {
      let buffer = 0;
      switch (operator[op]) {
        case "+":
          // console.log("case +");
          for (let line of lines) {
            let tempLine = line[op];
            if (tempLine != undefined) {
              buffer += parseInt(tempLine, 10);

              // console.log({ tempLine });
            }
          }
          // console.log("buffer after +", buffer);
          break;
        case "*":
          buffer = 1;
          // console.log("case *");
          for (let line of lines) {
            let tempLine = line[op];
            if (tempLine != undefined) {
              buffer *= parseInt(tempLine, 10);
              // console.log({ tempLine });
            }
          }
          // console.log("buffer after *", buffer);
          break;
        default: {
          // console.log({ operator: operator[op] });
        }
      }
      result += buffer;
    }
  console.log(result);
}

// part1();

function part2() {
  let result = 0;
  let lineLength = linesUnfiltered[0]?.length;
  let firstLine = linesUnfiltered[0];
  let secondLine = linesUnfiltered[1];
  let thirdLine = linesUnfiltered[2];
  let fourthLine = linesUnfiltered[3];
  let filteredFirstLine: string[] = [];
  let filteredSecondLine: string[] = [];
  let filteredThirdLine: string[] = [];
  let filteredFourthLine: string[] = [];
  let lastSpaceIndex = 0;
  if (lineLength != undefined)
    for (let i = 0; i < lineLength; i++) {
      if (
        firstLine != undefined &&
        secondLine != undefined &&
        thirdLine != undefined &&
        fourthLine != undefined
      )
        if (
          firstLine[i] === " " &&
          secondLine[i] === " " &&
          thirdLine[i] === " " &&
          fourthLine[i] === " "
        ) {
          let newNum = firstLine.slice(lastSpaceIndex, i);
          filteredFirstLine.push(newNum);
          newNum = secondLine.slice(lastSpaceIndex, i);
          filteredSecondLine.push(newNum);
          newNum = thirdLine.slice(lastSpaceIndex, i);
          filteredThirdLine.push(newNum);
          newNum = fourthLine.slice(lastSpaceIndex, i);
          filteredFourthLine.push(newNum);
          lastSpaceIndex = i;
        }
    }
  if (lineLength != undefined)
    for (let i = 0; i < lineLength; i++) {
      let op;
      let buffer;
      let innerLineLength = filteredFirstLine.length;
      if (operator != undefined) {
        op = operator[i];
      }
      if (operator && op === "*") {
        buffer = 1;
      } else if (operator && op === "+") {
        buffer = 0;
      }
      let firstLine = filteredFirstLine[i];
      let secondLine = filteredSecondLine[i];
      let thirdLine = filteredThirdLine[i];
      let fourthLine = filteredFourthLine[i];
      for (let j = 0; j < innerLineLength; j++) {
        if (firstLine && secondLine && thirdLine && fourthLine) {
          let firstDigit = firstLine[j];
          let secondDigit = secondLine[j];
          let thirdDigit = thirdLine[j];
          let fourthDigit = fourthLine[j];
          let num;
          if (firstDigit && secondDigit && thirdDigit && fourthDigit) {
            num = parseInt(
              firstDigit + secondDigit + thirdDigit + fourthDigit,
              10
            );
          }
          if (op === "*" && buffer && num) {
            buffer *= num;
          } else if (op === "+" && buffer && num) {
            buffer += num;
          }
        }
      }
      if (buffer) result += buffer;
    }
  console.log(result);
}
part2();
