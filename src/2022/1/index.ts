import { readFileSync } from 'fs';

// Enter code here

const start = () => {
  const input = readFileSync('src/2022/1/input.txt', 'utf8');
  const cleanedAndReducedInput = input.split(/^\n/gm).map((test) => {
    return test
      .split('\n')
      .filter((a) => a.length !== 0)
      .map((c) => parseInt(c))
      .reduce((b, c) => b + c);
  });
  const maxCalories = Math.max(...cleanedAndReducedInput);

  const elvesPos = cleanedAndReducedInput.findIndex((t) => t === maxCalories);

  console.log(`Elves Pos: ${elvesPos + 1} => carrying ${maxCalories} calories`);

  cleanedAndReducedInput.sort((d, e) => e - d);
  console.log(
    `First three calories in total: ${
      cleanedAndReducedInput[0] + cleanedAndReducedInput[1] + cleanedAndReducedInput[2]
    }`,
  );
};

const init = (): void => {
  console.log('###### Challenge Day 1 ######');
  start();
};

init();
