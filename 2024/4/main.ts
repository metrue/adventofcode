const X = 'X';
const M = 'M';
const A = 'A';
const S = 'S';
const WORD = [X, M, A, S];

const PATTERNS: string[] = ['vertical', 'horizental', 'diagonal'];
type DIRECTION = number[][];

const DIRECTIONS: Record<string, DIRECTION[]> = {
  vertical: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [-3, 0],
    ],
  ],
  horizental: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [0, -1],
      [0, -2],
      [0, -3],
    ],
  ],
  diagonal: [
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    [
      [0, 0],
      [-1, -1],
      [-2, -2],
      [-3, -3],
    ],
    [
      [0, 0],
      [-1, 1],
      [-2, 2],
      [-3, 3],
    ],
    [
      [0, 0],
      [1, -1],
      [2, -2],
      [3, -3],
    ],
  ],
};

const getPoint = (i: number, j: number, map: string[][]) => {
  const N = map.length;
  const M = map[0].length;

  if (i < 0 || i >= N || j < 0 || j >= M) {
    return null;
  }
  return map[i][j];
};

const findMatches = (i: number, j: number, map: string[][]) => {
  let count = 0;
  for (const pattern of PATTERNS) {
    for (const dir of DIRECTIONS[pattern]) {
      if (
        getPoint(i + dir[0][0], j + dir[0][1], map) === WORD[0] &&
        getPoint(i + dir[1][0], j + dir[1][1], map) === WORD[1] &&
        getPoint(i + dir[2][0], j + dir[2][1], map) === WORD[2] &&
        getPoint(i + dir[3][0], j + dir[3][1], map) === WORD[3]
      ) {
        count++;
      }
    }
  }
  return count;
};

export const countXMAS = (s: string): number => {
  const points = s.split('\n').map(l => l.split(''));
  let num = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      if (points[i][j] === X) {
        num += findMatches(i, j, points);
      }
    }
  }
  return num;
};

const isXMAS = (i: number, j: number, map: string[][]) => {
  const routes = [];

  // M  M
  //  A
  // S  S
  if (
    getPoint(i - 1, j - 1, map) === M &&
    getPoint(i + 1, j + 1, map) === S &&
    getPoint(i + 1, j - 1, map) === M &&
    getPoint(i - 1, j + 1, map) === S
  ) {
    return true;
  }
  // M  S
  //  A
  // M  S
  else if (
    getPoint(i - 1, j - 1, map) === M &&
    getPoint(i + 1, j + 1, map) === S &&
    getPoint(i + 1, j - 1, map) === S &&
    getPoint(i - 1, j + 1, map) === M
  ) {
    return true;
  }
  // S  S
  //  A
  // M  M
  else if (
    getPoint(i - 1, j - 1, map) === S &&
    getPoint(i + 1, j + 1, map) === M &&
    getPoint(i + 1, j - 1, map) === S &&
    getPoint(i - 1, j + 1, map) === M
  ) {
    return true;
  }
  // S M
  //  A
  // S M
  else if (
    getPoint(i - 1, j - 1, map) === S &&
    getPoint(i + 1, j + 1, map) === M &&
    getPoint(i + 1, j - 1, map) === M &&
    getPoint(i - 1, j + 1, map) === S
  ) {
    return true;
  }

  return false;
};

export const countMAS = (s: string): number => {
  const points = s.split('\n').map(l => l.split(''));
  let num = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      if (points[i][j] === A) {
        num += isXMAS(i, j, points) ? 1 : 0;
      }
    }
  }
  return num;
};
