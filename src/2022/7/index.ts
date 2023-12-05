import { readFileSync } from 'fs';

// Enter code here

const start = (isPart2: boolean) => {
  const input = readFileSync('src/2022/7/input.txt', 'utf8');

  console.log(!isPart2 ? '---Part One---' : '---Part Two---');

  const FileMap: Map<string, string[]> = new Map();

  interface FileTree {
    [key: string]: number | FileTree | string;
  }

  let fileTree: FileTree = {};
  let currentDirectory = '/';
  const splittedInput = input.split('\n');
  let directoryPath: string[] = [];
  let lastIndex = 0;
  splittedInput.forEach((prompt, index) => {
    if (prompt.startsWith('$')) {
      // user prompt
      if (prompt.includes('cd')) {
        // change directory
        const dir = prompt.split(/\s/).slice(-1);
        if (dir[0] === '..') {
          // go one directory back
          directoryPath.pop();
        } else {
          directoryPath.push(...dir);
        }
      } else if (prompt.includes('ls')) {
        //list
        let obj: FileTree = {};
        for (let h = index + 1; h < splittedInput.length; h++) {
          let out = splittedInput[h];
          if (out.startsWith('$')) break;
          const bla = out.split(/\s/);
          obj[bla[1]] = bla[0].includes('dir') ? bla[0] : parseInt(bla[0]);
        }
        let blubber = directoryPath.slice(-1);
        if (obj) {
          let tmp = fileTree[directoryPath[0]] as FileTree;
          if (blubber.includes('/')) {
            fileTree[directoryPath[0]] = { ...obj };
          } else if (!blubber.includes('/') && directoryPath.length === 2) {
            fileTree[directoryPath[0]] = { ...(tmp as FileTree), [`${blubber}`]: { ...obj } };
          } else if (!blubber.includes('/') && directoryPath.length > 2) {
            Object.getOwnPropertyNames(tmp).forEach((a)=>{
              if(typeof tmp[a] === 'object'){
                console.log('object', a)
              }
            })
          }
        }
      }
    }

    //fileTree[directoryPath.reverse().slice(-1)[0]] = 42;

    // set current index for next run
    lastIndex = index;
  });

  // console.log(fileTree);

  // console.log(input.split('\n'))
};

const init = (): void => {
  console.log('###### Challenge Day 7 ######');
  start(false);
};

init();
