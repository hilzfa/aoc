import { readFileSync } from 'fs';

const gameMap = new Map<number, Map<string, number>>();
const start = () => {
  const input = readFileSync('src/2023/2/input.txt', 'utf8');
  const cleanedAndReducedInput = input.split(/^\n/gm).map((test) => {
    return test.split('\n').filter((a) => a.length !== 0);
  });

  //cleanedAndReducedInput.map((inputLine) => console.log(inputLine));

  const res = cleanedAndReducedInput[0].map((line) => {
    const innerMap = new Map<string, number>();
    const firsSplit = line.split(':');
    const gameId = parseInt(firsSplit[0].match(/\d/g)![0]);
    const secondSplit = firsSplit[1].split(';').map((secondSplit)=>);


    return;
  });

  console.log(res);
};

const init = (): void => {
  console.log('###### Challenge Day 2 ######');
  start();
};

init();
