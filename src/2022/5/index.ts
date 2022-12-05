import { readFileSync } from 'fs';

// Enter code here

const start = (isPart2: boolean) => {
  const input = readFileSync('src/2022/5/input.txt', 'utf8');

  console.log(!isPart2 ? '---Part One---' : '---Part Two---');

  const firstInputSplit = input
    .split('\n')
    .filter((a) => a !== '' && !a.startsWith('move'))
    .reverse()
    .map((b) => b.replace(/\s/g, '~'));

  const secondInputSplit = input.split('\n').filter((a) => a !== '' && a.startsWith('move'));

  const StackMap: Map<number, string[]> = new Map(
    Array.from(
      firstInputSplit[0]
        .split('~')
        .filter((b) => b !== '')
        .map((a) => parseInt(a)),
      (stackNumber) => {
        return [stackNumber, []];
      },
    ),
  );

  firstInputSplit.reverse().pop();
  firstInputSplit.reverse();

  firstInputSplit.forEach((stackRow, index) => {
    let arr = [...stackRow];
    let lastIndex = 0;
    for (let mapKey of StackMap.keys()) {
      let element = arr[mapKey + lastIndex];

      if (element !== '' && element !== '~' && element !== undefined) {
        StackMap.get(mapKey)?.push(element);
      }
      lastIndex += 3;
    }
  });

  const movements = secondInputSplit.map((a) => {
    const c = a
      .split(/(move \d+) (from \d+) (to \d+)/g)
      .filter((a) => a !== '')
      .map((b) => b.replace(/\D+/g, ''))
      .map((a) => parseInt(a));

    return {
      move: c[0],
      from: c[1],
      to: c[2],
    };
  });

  movements.forEach((movement) => {
    if (isPart2) {
      let toBeMoved = StackMap.get(movement.from)?.splice(-movement.move);
      if (toBeMoved) {
        StackMap.get(movement.to)?.push(...toBeMoved);
      }
    } else {
      for (let i = 1; i <= movement.move; i++) {
        let element = StackMap.get(movement.from)?.pop();

        if (element) {
          StackMap.get(movement.to)?.push(element);
        }
      }
    }

  });

  let solution = '';
  for (let stack of StackMap.values()) {
    solution += stack.pop();
  }

  console.log(solution);
};

const init = (): void => {
  console.log('###### Challenge Day 5 ######');
  start(true);
};

init();
