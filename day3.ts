// day3 aoc
import * as fs from "fs";
import * as path from "path";

const rawData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const filteredData = rawData.trim().split("\r\n");

function sort(data: string, start: number, end: number) {
  let numData = data.split("").map((e) => parseInt(e, 10));
  numData = numData.slice(start, end);
  function merge(arr: number[], left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let i = 0; i < n2; i++) {
      R[i] = arr[mid + 1 + i];
    }
    let i = 0,
      j = 0,
      k = left;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }
  function mergeSort(arr: number[], left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor(left + (right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  mergeSort(numData, 0, numData.length);
  return numData.join("").toString();
}

function part1(input: string[]) {
  let result = 0;
  for (let i of input) {
    // let i =
    //   "2232323324122221212342323232341322431323733222421421112322424212433333423333133232343222231224222312";
    // const sorted = sort(i, 0, i.length - 1);
    // const sortedLength = sorted.length;
    // const firstN = sorted.slice(-1);
    // const firstIndex = i.indexOf(firstN || "");
    // const secondSorted = sort(i, firstIndex + 1, i.length);
    // const secondSortedLength = secondSorted.length;
    // const secondN = secondSorted.slice(-1);
    // const fullNum = parseInt(firstN + secondN, 10);
    // result += fullNum;
    // @ts-ignore
    let lastIndex = -1;
    let num = [];
    for (let j = 11; j >= 0; j--) {
      const sorted = sort(i, lastIndex + 1, i.length - j);

      num.push(sorted.slice(-1));
      lastIndex =
        i.slice(lastIndex + 1, i.length - j).indexOf(sorted.slice(-1)) +
        lastIndex +
        1;
      // console.log({
      //   sorted,
      //   length: sorted.length,
      //   ilenght: i.length,
      //   lastIndex,
      // });
    }

    const finalAns = parseInt(num.join(""), 10);
    result += finalAns;
  }
  console.log(result);
}

part1(filteredData);
