// aoc day2
import * as fs from "fs";
import * as path from "path";

const rawData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
let data = rawData.trim().split(",");
let filterdData: string[][] = data.map((e) => e.trim().split("-"));

function problem1(filterdData: string[][]) {
  let result = 0;
  // console.log(filterdData);
  for (const range of filterdData) {
    const start = parseInt(range[0] || "0", 10);
    const end = parseInt(range[1] || "0", 10);
    if (Number.isNaN(start) || Number.isNaN(end)) continue;
    for (let i = start; i <= end; i++) {
      const stringi = i.toString();
      const len = stringi.length;
      if (len % 2 == 0 && stringi.slice(0, len / 2) == stringi.slice(len / 2)) {
        console.log(i);
        result += i;
      }
    }
  }
  console.log(result);
}

// problem1(filterdData);

const problem2 = (filterdData: string[][]) => {
  let result: number = 0;
  for (const range of filterdData) {
    const start = parseInt(range[0] || "0", 10);
    const end = parseInt(range[1] || "0", 10);
    console.log({ start, end });
    for (let i = start; i <= end; i++) {
      const stringi = i.toString();
      let length = stringi.length;
      const sqrt = Math.floor(Math.sqrt(stringi.length));
      const factors: number[] = [];
      for (let j = 1; j <= sqrt; j++) {
        if (length % j == 0) {
          factors.push(j);
          if (j != length / j && j != 1) {
            factors.push(length / j);
          }
        }
      }
      for (let k = 0; k < factors.length; k++) {
        const factor = factors[k];
        if (factor == undefined) {
          continue;
        }
        let arr = Array.from({ length: length / factor }, (_, l) =>
          stringi.slice(l * factor, l * factor + factor)
        );

        let iteration = 0;
        let status: boolean = true;
        while (iteration < arr.length - 1) {
          if (arr[iteration] != arr[iteration + 1]) {
            status = false;
            break;
          }
          iteration++;
        }
        if (status == true) {
          result += i;
          console.log({ i, factors, length });
          break;
        }
      }
    }
  }
  console.log(result);
};

problem2(filterdData);
