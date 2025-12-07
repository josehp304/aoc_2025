// AOC DAY - 1

import * as fs from "fs";
import * as path from "path";

let rawData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let lines = rawData.trim().split(/\r?\n/);
let i = 50;
let password = 0;
for (const line of lines) {
  console.log(i, line);
  const digit = parseInt(line.slice(1), 10);
  if (line[0] == "L") {
    const tempI = i;
    if (i % 100 == 0) {
      password--;
    }
    i = i - digit;

    while (i < 0) {
      i = i + 100;
      password++;
    }
    if (i == 0) {
      password++;
    }
    console.log({ tempI, i, password, digit });
  } else {
    const tempI = i;
    i = i + digit;
    while (i > 99) {
      if (i != 100) {
        password++;
      }
      i = i - 100;
    }
    if (i == 0) {
      password++;
    }
    console.log({ tempI, i, password, digit });
  }
}

console.log(password);
