import { readFileSync } from 'fs';

// Enter code here
const literalToNumberMap = new Map<string, number>([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
]);

const start = () => {
  const input = readFileSync('src/2023/1/input.txt', 'utf8');
  const cleanedAndReducedInput = input.split(/^\n/gm).map((test) => {
    return test
      .split('\n')
      .filter((a) => a.length !== 0)
      .map((line) => {
        const pattern = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
        const matchesRaw = line.matchAll(pattern);
        const matches = [...matchesRaw].map((a) => a[1]);

        const result = parseInt(
          `${literalToNumberMap.get(matches[0]) ?? matches[0]}${
            literalToNumberMap.get(matches[matches.length - 1]) ?? matches[matches.length - 1]
          }`,
        );
        return result;
      })
      .reduce((prev, curr) => prev + curr);
  });

  console.log(cleanedAndReducedInput[0]);
};

const init = (): void => {
  console.log('###### Challenge Day 1 ######');
  start();
};

init();
