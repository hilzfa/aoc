import { readFileSync } from 'fs';

// Enter code here

const start = (isPart2: boolean) => {
  const input = readFileSync('src/2022/6/input.txt', 'utf8');

  const firstPossibleMarkerPosition: number = isPart2 ? 14 : 4;

  console.log(!isPart2 ? '---Part One---' : '---Part Two---');

  let markerPosition: number = 0;

  for (let i = 0; i < input.length; i++) {
    let toBeChecked = input.slice(i, i + firstPossibleMarkerPosition);

    let removedDuplicates = [...new Set(toBeChecked)];

    if (removedDuplicates.length === toBeChecked.length) {
      // no duplicates
      markerPosition = (input.indexOf(toBeChecked) + firstPossibleMarkerPosition);

      // stop loop
      break;
    }
  }

  console.log(`${markerPosition} characters need to be processed before the first marker is detected!`);
};

const init = (): void => {
  console.log('###### Challenge Day 6 ######');
  start(true);
};

init();
