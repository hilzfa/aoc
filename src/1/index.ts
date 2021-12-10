import { readFileSync } from 'fs' ;

// Enter code here

const start = () => {
    const input = readFileSync('src/1/input.txt', 'utf8');
    
    var a = input.split('\n');
    console.log('length before: ', a.length);

    var b = a
      .map((value, index) => [
        parseInt(value),
        parseInt(a[index + 1]),
        parseInt(a[index + 2]),
      ])
      .filter((value) => !value.includes(NaN))
      .map((value) => value.reduce((a, b) => a + b));
    
    var c = b.filter((number, index) => {
      if (index === 0) {
        return false;
      }
    
      return number - b[index - 1] > 0;
    });
    
    // console.log(c);
    console.log('length after: ', c.length);
    
}









const init = (): void => {
    console.log("###### Challenge Day 1 ######");
    start()
}

init();
