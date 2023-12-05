// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

import { readFileSync } from 'fs';

// Enter code here

const start = (isPart2: boolean) => {
  const input = readFileSync('src/2022/8/input.txt', 'utf8');

  console.log(!isPart2 ? '---Part One---' : '---Part Two---');

  let Matrix: Map<number, number[]> = new Map();

  // prepare Matrix
  input
    .split('\n')
    .filter((a) => a !== '')
    .map((row, i) => {
      Matrix.set(
        i,
        [...row].map((e) => parseInt(e)),
      );
    });

  const visibleTrees = [];

  const matrixKeys = [...Matrix.keys()];

  let highestScenicScore = 0;

  for (let entry of Matrix.entries()) {
    let key = entry[0];
    let values = entry[1];

    // add edge trees
    if (key === 0 || key === Matrix.size - 1) {
      visibleTrees.push(...values);
    } else {
      visibleTrees.push(...[values[0], ...values.slice(-1)]);
    }

    if (key > 0 && key < Matrix.size - 1) {
      let previousRow = Matrix.get(key - 1) as number[];
      let nextRow = Matrix.get(key + 1) as number[];

      let toTop: number[] = [];
      let toLeft: number[] = [];
      let toBottom: number[] = [];
      let toRight: number[] = [];

      let isMaxToTop: boolean;
      let isMaxToBottom: boolean;
      let isMaxToLeft: boolean;
      let isMaxToRight: boolean;

      values.forEach((value, i) => {
        toTop = [];
        toBottom = [];
        toLeft = [];
        toRight = [];

        let currentScenicScore = 0;

        isMaxToBottom = false;
        isMaxToLeft = false;
        isMaxToRight = false;
        isMaxToTop = false;
        if (i > 0 && i < values.length - 1) {
          matrixKeys.forEach((k) => {
            if (k < key) {
              toTop = [...toTop, (Matrix.get(k) as number[])[i]];
            } else if (k > key) {
              toBottom = [...toBottom, (Matrix.get(k) as number[])[i]];
            }
          });

          values.forEach((v, index) => {
            if (index < i) {
              toLeft = [...toLeft, v];
            } else if (index > i) {
              toRight = [...toRight, v];
            }
          });

          toTop = toTop.reverse();

          toLeft = toLeft.reverse();

          // console.log(value, toLeft)

          let x =
            toBottom.findIndex((toCheck) => toCheck >= value) < 0
              ? toBottom.length
              : toBottom.findIndex((toCheck) => toCheck >= value) + 1;
          let y =
            toTop.findIndex((toCheck) => toCheck >= value) < 0
              ? toTop.length
              : toTop.findIndex((toCheck) => toCheck >= value) + 1;
          let z =
            toLeft.findIndex((toCheck) => toCheck >= value) < 0
              ? toLeft.length
              : toLeft.findIndex((toCheck) => toCheck >= value) + 1;
          let zz =
            toRight.findIndex((toCheck) => toCheck >= value) < 0
              ? toRight.length
              : toRight.findIndex((toCheck) => toCheck >= value) + 1;

          currentScenicScore = x * y * z * zz;

          /*console.log('value: ', value);
          console.log('toTopRaw', toTop);
          console.log('toBottomRaw', toBottom);
          console.log('toRightRaw', toRight);
          console.log('toLeftRaw', toLeft);
          console.log('toBottom', x);
          console.log('toTop', y);
          console.log('toLeft', z);
          console.log('toRight', zz);*/

          //console.log(value, currentScenicScore);

          highestScenicScore = currentScenicScore > highestScenicScore ? currentScenicScore : highestScenicScore;

          isMaxToBottom = Math.max(...[...toBottom, value]) === value && !toBottom.includes(value);
          isMaxToLeft = Math.max(...[...toLeft, value]) === value && !toLeft.includes(value);
          isMaxToTop = Math.max(...[...toTop, value]) === value && !toTop.includes(value);
          isMaxToRight = Math.max(...[...toRight, value]) === value && !toRight.includes(value);

          if (isMaxToBottom || isMaxToLeft || isMaxToRight || isMaxToTop) {
            visibleTrees.push(value);
          }

          //console.log(value, toRight)
          //toTop: key 2 => 0[i], 1[i]
          //toBottom: key 2 => 3[i], 4[i], 5[i]
        }
      });
    }
  }
  console.log(highestScenicScore);
  // console.log(fileTree);

  // console.log(input.split('\n'))
};

const init = (): void => {
  console.log('###### Challenge Day 8 ######');
  start(false);
};

init();

// 303732255625339535390

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
