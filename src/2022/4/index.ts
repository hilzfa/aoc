import { readFileSync } from 'fs';

// Enter code here

const start = () => {
  const input = readFileSync('src/2022/4/input.txt', 'utf8');

  const cleanedInput = input
    .split('\n')
    .filter((a) => a !== '')
    .map(
      (pair) =>
        <
          {
            pairOne: { start: number; end: number };
            pairTwo: { start: number; end: number };
            isFullyContained: boolean;
          }
        >{
          pairOne: {
            start: parseInt(pair.split(',')[0].split('-')[0]),
            end: parseInt(pair.split(',')[0].split('-')[1]),
          },
          pairTwo: {
            start: parseInt(pair.split(',')[1].split('-')[0]),
            end: parseInt(pair.split(',')[1].split('-')[1]),
          },
        },
    )
    .map(
      (pair) =>
        <
          {
            pairOne: { start: number; end: number };
            pairTwo: { start: number; end: number };
            isFullyContained: boolean;
          }
        >{
          ...pair,
          isFullyContained: calculate(pair),
        },
    );

  console.log(cleanedInput.filter((a) => a.isFullyContained).length);
};

const calculate = (pair: {
  pairOne: { start: number; end: number };
  pairTwo: { start: number; end: number };
  isFullyContained: boolean;
}): boolean => {
  return (
    (pair.pairOne.start <= pair.pairTwo.end && pair.pairOne.end >= pair.pairTwo.start) ||
    (pair.pairTwo.start <= pair.pairOne.end && pair.pairTwo.end >= pair.pairOne.start)
  );
};

const init = (): void => {
  console.log('###### Challenge Day 4 ######');
  start();
};

init();
