import * as fs from "fs";
import * as path from "path";

let rawData = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split(/\n/);

let linesUnfiltered = rawData.slice(0, 4);
let operatorUnfiltered = rawData.slice(4)[0];

let lines = linesUnfiltered.map((e) => e.trim().split(/ +/));
let operator = operatorUnfiltered?.trim().split(/ +/);
console.log(lines);
console.log(operator);
function part1() {
  let result = 0;
  if (operator != undefined)
    for (let op = 0; op < operator?.length; op++) {
      let buffer = 0;
      switch (operator[op]) {
        case "+":
          console.log("case +");
          for (let line of lines) {
            let tempLine = line[op];
            if (tempLine != undefined) {
              buffer += parseInt(tempLine, 10);

              console.log({ tempLine });
            }
          }
          console.log("buffer after +", buffer);
          break;
        case "*":
          buffer = 1;
          console.log("case *");
          for (let line of lines) {
            let tempLine = line[op];
            if (tempLine != undefined) {
              buffer *= parseInt(tempLine, 10);
              console.log({ tempLine });
            }
          }
          console.log("buffer after *", buffer);
          break;
        default: {
          console.log({ operator: operator[op] });
        }
      }
      result += buffer;
    }
  console.log(result);
}

part1();
