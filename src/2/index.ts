import * as fs from 'fs';

const input = fs.readFileSync('src/2/input.txt', 'utf8');
enum Action {
  DOWN = 'down',
  UP = 'up',
  FORWARD = 'forward',
}
var a: Array<string> = input.split('\n');

let b: string[][] = a.map((value) => value.split(' '));

console.log(b);

let aim = 0;
let horizontal = 0;
let depth = 0;

b.forEach((value) => {
  let numericValue: number = parseInt(value[1]);
  switch (value[0]) {
    case Action.DOWN:
      aim += numericValue;
      break;
    case Action.UP:
      aim -= numericValue;
      break;
    case Action.FORWARD:
      horizontal += numericValue;
      depth += aim * numericValue;
      break;
    default:
      break;
  }
});

console.log('Horizontal: ', horizontal);
console.log('Depth: ', depth);
console.log('Aim: ', aim);

console.log('Result: ', depth * horizontal);

//let keyMap = new Map<string, number>();

/*a.map((value) => value.split(' ')).forEach((arr) => {
  if (!keyMap.has(arr[0])) {
    keyMap.set(arr[0], parseInt(arr[1]));
  } else {
    var tmp = keyMap.get(arr[0]);
    var newValue = tmp + parseInt(arr[1]);
    keyMap.set(arr[0], newValue);
  }
});*/

// console.log(keyMap);

// console.log('Horizontal: ', keyMap.get('forward'));
//console.log('Depth: ', keyMap.get('down') - keyMap.get('up'));

//console.log(
//  'Result',
//  keyMap.get('forward') * (keyMap.get('down') - keyMap.get('up'))
//);
