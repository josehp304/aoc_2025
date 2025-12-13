import * as fs from "fs";
import * as path from "path";

const rawData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const filteredData: string[] = rawData.trim().split(/\r?\n/);
let result = 0;
let flag = 1;
function pickPaper() {
  for (let i = 0; i < filteredData.length; i++) {
    let line = filteredData[i] as string;
    if (line) {
      for (let j = 0; j < line.length; j++) {
        if (line[j] == "@") {
          let noOfRolls = 0;
          if (line[j - 1] == "@") {
            noOfRolls++;
          }
          if (line[j + 1] == "@") {
            noOfRolls++;
          }
          let prevLine = filteredData[i - 1];
          if (prevLine) {
            if (prevLine[j - 1] == "@") {
              noOfRolls++;
            }
            if (prevLine[j + 1] == "@") {
              noOfRolls++;
            }
            if (prevLine[j] == "@") {
              noOfRolls++;
            }
          }
          let nextLine = filteredData[i + 1];
          if (nextLine) {
            if (nextLine[j - 1] == "@") {
              noOfRolls++;
            }
            if (nextLine[j + 1] == "@") {
              noOfRolls++;
            }
            if (nextLine[j] == "@") {
              noOfRolls++;
            }
          }
          if (noOfRolls < 4) {
            result++;
            flag++;
            console.log({ i, j });
            filteredData[i] =
              line.substring(0, j) + "X" + line.substring(j + 1);
            line = filteredData[i] as string;
          }
        }
      }
    }
  }
}

while (flag > 0) {
  flag = 0;
  pickPaper();
  if (flag > 0) {
    flag = 1;
  }
  console.log("🔃");
  console.log(filteredData);
  console.log(result);
}
console.log(result);
