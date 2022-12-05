import { readFileSync } from 'fs';

// Enter code here
interface Solution2 {
  one: string;
  two: string;
  three: string;
  trippleLetter: string;
  points: number;
}

interface Solution1 {
  one: string;
  two: string;
  doubleLetter: string;
  points: number;
}

const lowercaseMap: Map<string, number> = new Map(
  Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)).map((a, i) => [a, i + 1]),
);

const uppercaseMap: Map<string, number> = new Map(
  Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).map((a, i) => [a, i + 27]),
);

const start = () => {
  const input = readFileSync('src/2022/3/input.txt', 'utf8');

  const cleanedInput = input
    .split('\n')
    .filter((a) => a !== '')
    .map((v, index, arr) => {
      if (index % 3 === 0) {
        return <Solution2>{ one: arr[index], two: arr[index + 1], three: arr[index + 2] };
      }
    })
    .filter((a) => isDefined(a))
    .map(
      (obj) =>
        <Solution2>{
          ...obj,
          trippleLetter: [...(obj as Solution2).one]
            .map((element, index) => {
              if ([...(obj as Solution2).two].includes(element) && [...(obj as Solution2).three].includes(element)) {
                return element;
              }
              return 'bla';
            })
            .filter((t) => t !== 'bla')[0],
        },
    )
    .map(
      (end) =>
        <Solution2>{
          ...end,
          points: lowercaseMap.get(end.trippleLetter) ?? uppercaseMap.get(end.trippleLetter),
        },
    );
  /*const cleanedInput = input
    .split('\n')
    .filter((a) => a !== '')
    .map(
      (v) =>
        <Solution>{
          one: v.slice(0, v.length / 2),
          two: v.slice(v.length / 2, v.length),
        },
    )
    .map(
      (obj) =>
        <Solution>{
          ...obj,
          doubleLetter: [...obj.one]
            .map((element, index) => {
              if ([...obj.two].includes(element)) {
                return element;
              }
              return 'bla';
            })
            .filter((t) => t !== 'bla')[0],
        },
    )
    .map(
      (end) =>
        <Solution>{
          ...end,
          points: lowercaseMap.get(end.doubleLetter) ?? uppercaseMap.get(end.doubleLetter),
        },
    );*/

  const solution = cleanedInput.reduce(
    (a, b) =>
      <Solution2>{
        points: a.points + b.points,
      },
  );
  console.log(solution);
  
};

const isDefined = (value: Solution2 | undefined): value is Solution2 => {
  return value !== undefined;
};

const init = (): void => {
  console.log('###### Challenge Day 3 ######');
  start();
};

init();
