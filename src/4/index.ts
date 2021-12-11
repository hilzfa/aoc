import * as fs from 'fs';

const _bingoBoards = fs.readFileSync('src/4/input.txt', 'utf8');
const _numberSequence = fs.readFileSync('src/4/input_2.txt', 'utf8');
console.clear();
console.log('--------------Day 4---------------');

interface SingleEntry {
  n: number;
  status: boolean;
}

interface BoardValue {
  rows: SingleEntry[][];
  columns: SingleEntry[][];
}

let bingoBoards: string[] = _bingoBoards.split('\r\n');

let bingoBoardMap: Map<number, BoardValue> = new Map();
let tmpHelper: number = 0;
let columnIndex: number = 0;
let boardValueColumns: SingleEntry[][] = [];
bingoBoards
  .filter((value) => value.length > 0)
  .forEach((row, index) => {
    if (index % 5 === 0) {
      ++tmpHelper;
      columnIndex = 0;
      boardValueColumns = [];
    } else {
      ++columnIndex;
    }

    let boardValueRow = row
      .trim()
      .split(/\s+/g)
      .map((s) => parseInt(s))
      .map((value) => <SingleEntry>{ n: value, status: false });

    boardValueRow.forEach((bvr, bvrIndex) => {
      // console.log(columnIndex);
      if (columnIndex === 0) {
        //console.log(bvr);
        boardValueColumns.push([bvr]);
        //console.log(boardValueColumns);
      } else {
        //console.log(boardValueColumns);
        boardValueColumns[bvrIndex] = [...boardValueColumns[bvrIndex], bvr];
      }
    });

    if (!bingoBoardMap.has(tmpHelper)) {
      bingoBoardMap.set(tmpHelper, {
        rows: [[...boardValueRow]],
        columns: boardValueColumns,
      });
      return;
    }

    let currentBingoBoard = bingoBoardMap.get(tmpHelper);
    //console.log('currentBoard', currentBingoBoard);
    //console.log(index - 1);
    //console.log(currentBingoBoard[index - 1]);
    currentBingoBoard?.rows.push([...boardValueRow]);

    bingoBoardMap.set(tmpHelper, currentBingoBoard ?? {columns: [], rows: []});
  });

let numberSequence: number[] = _numberSequence
  .split(',')
  .map((s) => parseInt(s));

let isWinnerBoard = false;
let winningBoardIndex: number = 0;
let lastNumber: number = 0;

let winningBoardsCount: number = 0;
numberSequence.forEach((currentNumber: number) => {
  if (isWinnerBoard) return;

  bingoBoardMap.forEach((boardValue, boardIndex) => {
    if (!isWinnerBoard) {
      boardValue.rows.forEach((row) =>
        row.forEach((r) => (r.status = r.status || r.n === currentNumber))
      );
      boardValue.columns.forEach((column) =>
        column.forEach((c) => (c.status = c.status || c.n === currentNumber))
      );
      //console.log(boardValue.rows);

      isWinnerBoard =
        boardValue.rows.filter(
          (row) => row.filter((a) => a.status).length === 5
        ).length === 1 ||
        boardValue.columns.filter(
          (column) => column.filter((a) => a.status).length === 5
        ).length === 1;
    }

    if (isWinnerBoard) {
      console.log('STOP THE COUNT', boardIndex);
    }

    /*isWinnerBoard =
      boardValue.columns.filter(
        (column) => column.filter((a) => a.status).length === 5
      ).length > 1 ||
      boardValue.rows.filter((row) => row.filter((a) => a.status).length === 5)
        .length > 1;
    if (isWinnerBoard && winningBoardIndex === 0) {
      winningBoardIndex = boardIndex - 1;
      console.log('I am the winner: ', winningBoardIndex);
    } else if (isWinnerBoard && winningBoardIndex > 0) {
      return;
    }

    boardValue.columns.forEach((column) => {
      column.forEach((c) => (c.status = c.status || c.n === currentNumber));
    });
    boardValue.rows.forEach((row) => {
      row.forEach((r) => (r.status = r.status || r.n === currentNumber));
    });
    */
  });

  if (isWinnerBoard) {
    console.log('last Number', currentNumber);
  }
});

console.log('END');

/*console.log(bingoBoardMap.get(100).rows);

let result = bingoBoardMap
  .get(91)
  .rows.flatMap((c) => c.filter((abc) => !abc.status).map((d) => d.n));

console.log(result.reduce((a, b) => a + b) * 10);*/

/*let test = bingoBoardMap.get(1);

console.log(test);

let test2 =
  test.columns.filter((a) => a.filter((b) => !b.status).length !== 0).length ===
  5;

console.log(test2);
*/

//console.log('1 2 3 12 2'.split(/\s+/g));

//console.log(4 % 4);

//bingoBoards.map((row) => row.split(' '));
//console.log(bingoBoardMap.get(2).columns);

//console.log(bingoBoardMap.get(1)[0][3]);
//console.log(bingoBoards);
