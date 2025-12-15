import * as fs from "fs";
import * as path from "path";

let rawData = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .trim()
  .split(/\r?\n\r?\n/);
function mergeSort(arr: number[], left: number, right: number) {
  function merge(
    arr: number[],
    left: number,
    mid: number,
    right: number
  ): void {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    let Left = new Array(n1);
    for (let i = 0; i < n1; i++) Left[i] = arr[left + i];
    let Right = new Array(n2);
    for (let j = 0; j < n2; j++) Right[j] = arr[mid + 1 + j];
    let k = left,
      i = 0,
      j = 0;
    while (i < n1 && j < n2) {
      if (Left[i] <= Right[j]) {
        arr[k++] = Left[i++];
      } else {
        arr[k++] = Right[j++];
      }
    }
    while (i < n1) {
      arr[k++] = Left[i++];
    }
    while (j < n2) {
      arr[k++] = Right[j++];
    }
  }
  if (left >= right) return;
  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}
function mergeSortRange(arr: number[][], left: number, right: number) {
  function merge(
    arr: number[][],
    left: number,
    mid: number,
    right: number
  ): void {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    let Left = new Array(n1);
    for (let i = 0; i < n1; i++) Left[i] = arr[left + i];
    let Right = new Array(n2);
    for (let j = 0; j < n2; j++) Right[j] = arr[mid + 1 + j];
    let k = left,
      i = 0,
      j = 0;
    while (i < n1 && j < n2) {
      if (Left[i][0] <= Right[j][0]) {
        arr[k++] = Left[i++];
      } else {
        arr[k++] = Right[j++];
      }
    }
    while (i < n1) {
      arr[k++] = Left[i++];
    }
    while (j < n2) {
      arr[k++] = Right[j++];
    }
  }
  if (left >= right) return;
  const mid = Math.floor(left + (right - left) / 2);
  mergeSortRange(arr, left, mid);
  mergeSortRange(arr, mid + 1, right);
  merge(arr, left, mid, right);
}
let rawRanges: string = rawData[0] || "";
let ranges: number[][] = rawRanges.split(/\r?\n/).map((e) => {
  return e.split("-").map((e) => parseInt(e, 10));
});
mergeSortRange(ranges, 0, ranges.length - 1);
let rawIds: string = rawData[1] || "";
let ids: number[] = rawIds
  .trim()
  .split(/\r?\n/)
  .map((e) => parseInt(e, 10));
mergeSort(ids, 0, ids.length - 1);
let result = 0;
for (let range of ranges) {
  while (ids.length > 0) {
    let id = ids[0];
    let low = range[0];
    let high = range[1];
    if (id && low && high) {
      console.log({ id, low, high });
      if (id >= low && id <= high) {
        result++;
        ids.shift();
        console.log("match", result);
      } else if (id > high) {
        console.log("high");
        break;
      } else {
        console.log("low");
        ids.shift();
      }
    }
  }
}

console.log(result);
