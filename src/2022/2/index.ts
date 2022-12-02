import { readFileSync } from 'fs';

// Enter code here
interface RPSRound {
  opponent: string;
  me: string;
  points: number;
}

const WinsAgainstMap: Map<string, string> = new Map([
  ['X', 'C'],
  ['Y', 'A'],
  ['Z', 'B'],
  ['A', 'Z'],
  ['B', 'X'],
  ['C', 'Y'],
]);

// reverse WinAgainstMap
const LooseAgainstMap: Map<string, string> = new Map(Array.from(WinsAgainstMap, (v) => [v[1], v[0]]));

const SelectionMap: Map<string, number> = new Map([
  ['A', 1],
  ['B', 2],
  ['C', 3],
  ['X', 1],
  ['Y', 2],
  ['Z', 3],
]);

const start = (isPart2: boolean) => {
  const input = readFileSync('src/2022/2/input.txt', 'utf8');

  console.log(isPart2 ? '---Calculation for Part 2--- ' : '---Calculation for Part 1---');

  const calculatePoints = (rpsRound: RPSRound, isPart2: boolean): number => {
    let myChoice = rpsRound.me;

    if (isPart2) {
      switch (rpsRound.me) {
        case 'X':
          // need a loose
          myChoice = WinsAgainstMap.get(rpsRound.opponent) ?? '';
          break;
        case 'Y':
          // need a draw
          myChoice = rpsRound.opponent;
          break;
        case 'Z':
          // need a win
          myChoice = LooseAgainstMap.get(rpsRound.opponent) ?? '';
          break;
      }
    }

    // points you got based on your selection
    let score: number = SelectionMap.get(myChoice) ?? 0;

    if (SelectionMap.get(rpsRound.opponent) === SelectionMap.get(myChoice)) {
      // draw
      score += 3;
    }

    if (WinsAgainstMap.get(myChoice) === rpsRound.opponent) {
      // win
      score += 6;
    }

    return score;
  };

  // noinspection DuplicatedCode
  const cleanedAndReducedInput = input
    .split(/\n/gm)
    .filter((x) => x.length !== 0)
    .map((a) => <RPSRound>{ opponent: a.split(' ')[0], me: a.split(' ')[1] })
    .map((rpsRound) => <RPSRound>{ ...rpsRound, points: calculatePoints(rpsRound, isPart2) })
    .map((a) => a.points)
    .reduce((a, b) => a + b);

  console.log(`You got a total count of points: ${cleanedAndReducedInput}`);
};

const init = (): void => {
  console.log('###### Challenge Day 2 ######');
  start(false);
};

init();
