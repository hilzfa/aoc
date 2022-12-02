import * as fs from 'fs';

const input = fs.readFileSync('src/2021/3/input.txt', 'utf8');

let a: string[] = input.split('\n');

let b: string[][] = a.map((value) => [...value]);
let c: string[][] = a.map((value) => [...value]);

let valueMap: Map<number, number> = new Map();
for (var i = 0; i < 12; i++) {
  let zeroCount = 0;
  let oneCount = 0;

  for (var h = 0; h < b.length; h++) {
    let numericValue = parseInt(b[h][i]);
    switch (numericValue) {
      case 0:
        zeroCount++;
        break;
      case 1:
        oneCount++;
        break;
      default:
        break;
    }
  }
  let winnerDigit = zeroCount > oneCount ? 0 : 1;

  b = b.filter((value) => parseInt(value[i]) === winnerDigit);

  zeroCount = 0;
  oneCount = 0;

  for (var j = 0; j < c.length; j++) {
    if (c.length == 0) {
      console.log('c length', c.length);
      break;
    }
    let numericValue = parseInt(c[j][i]);
    switch (numericValue) {
      case 0:
        zeroCount++;
        break;
      case 1:
        oneCount++;
        break;
      default:
        break;
    }
  }
  let looserDigit = zeroCount > oneCount ? 1 : 0;
  if (c.length > 1) {
    c = c.filter((value) => parseInt(value[i]) === looserDigit);
  }

  // console.log(c.length);
}

let tester = c.flatMap((value) => value.reduce((a, b) => a + b));
let tester2 = b.flatMap((value) => value.reduce((a, b) => a + b));
console.log([...tester, ...tester2]);
/*let co2ScrubberRating = parseInt(
  c.reduce((a, b) => a && b).reduce((a, b) => a + b),
  2
);*/
/*let oxygenGeneratorRating = parseInt(
  b.reduce((a, b) => a && b).reduce((a, b) => a + b),
  2
);*/

//console.log(co2ScrubberRating * oxygenGeneratorRating);

//console.log(valueMap);

/*let test = 0;
while (b.length > 2) {
  b = b.filter((value) => value[i] === myMap[i]);
  i++;
}

console.log(valueMap.get(11));
*/
/*var gammaRate = parseInt('100111100011', 2);
var epsilonRate = parseInt('011000011100', 2);

console.log(gammaRate * epsilonRate);
*/
