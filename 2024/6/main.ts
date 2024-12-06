enum DIRECTION {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

interface Point {
  i: number;
  j: number;
  direction: DIRECTION;
}

const move = (point: Point): Point => {
  switch (point.direction as DIRECTION) {
    case DIRECTION.Up: {
      return {
        ...point,
        i: point.i - 1,
      };
    }
    case DIRECTION.Down: {
      return {
        ...point,
        i: point.i + 1,
      };
    }
    case DIRECTION.Left: {
      return {
        ...point,
        j: point.j - 1,
      };
    }
    case DIRECTION.Right: {
      return {
        ...point,
        j: point.j + 1,
      };
    }
    default:
      throw new Error(`${JSON.stringify(point, null, 2)}`);
  }
};

const turnRight = (point: Point) => {
  let direction = point.direction;
  switch (point.direction as DIRECTION) {
    case DIRECTION.Up: {
      direction = DIRECTION.Right;
      break;
    }
    case DIRECTION.Down: {
      direction = DIRECTION.Left;
      break;
    }
    case DIRECTION.Left: {
      direction = DIRECTION.Up;
      break;
    }
    case DIRECTION.Right: {
      direction = DIRECTION.Down;
      break;
    }
    default:
      throw new Error(`${JSON.stringify(point, null, 2)}`);
  }
  return {
    ...point,
    direction,
  };
};

const isOut = (point: Point, N: number, M: number): boolean => {
  return point.i < 0 || point.i >= N || point.j < 0 || point.j >= M;
};

const getStart = (map: string[][]): Point => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'v') {
        return {
          i,
          j,
          direction: DIRECTION.Down,
        };
      } else if (map[i][j] === '<') {
        return {
          i,
          j,
          direction: DIRECTION.Left,
        };
      } else if (map[i][j] === '>') {
        return {
          i,
          j,
          direction: DIRECTION.Right,
        };
      } else if (map[i][j] === '^') {
        return {
          i,
          j,
          direction: DIRECTION.Up,
        };
      }
    }
  }
  throw new Error('no start point');
};

export const getDistinctPositions = (s: string): number => {
  const map: string[][] = s.split('\n').map(l => l.split(''));
  const N = map.length;
  const M = map[0].length;

  const points = {};
  let cur = getStart(map);
  let steps = 0;
  while (!isOut(cur, N, M)) {
    if (!points[`${cur.i}${cur.j}`]) {
      points[`${cur.i},${cur.j}`] = true;
    }

    const next = move(cur);
    if (isOut(next, N, M)) {
      cur = next;
    } else {
      if (map[next.i][next.j] === '#') {
        cur = turnRight(cur);
      } else {
        cur = next;
      }
    }
    steps++;
  }
  return Object.keys(points).length;
};

export const isValidPlace = (
  i: number,
  j: number,
  map: string[][],
): boolean => {
  const N = map.length;
  const M = map[0].length;

  const points = {};
  let cur = getStart(map);
  let meetTimes = 0;
  let meetDirect = undefined;
  while (!isOut(cur, N, M)) {
    if (!points[`${cur.i}${cur.j}`]) {
      points[`${cur.i},${cur.j}`] = true;
    }

    const next = move(cur);
    if (isOut(next, N, M)) {
      cur = next;
      return false;
    } else {
      if (next.i === i && next.j === j) {
        if (meetTimes > 1 && meetDirect === cur.direction) {
          console.warn('valid: ', i, j);
          return true;
        }
        meetTimes += 1;
        meetDirect = cur.direction;
        cur = turnRight(cur);
      } else if (map[next.i][next.j] === '#') {
        cur = turnRight(cur);
      } else {
        cur = next;
      }
    }
  }
  return false;
};

export const getValidPositions = (s: string): number => {
  const map: string[][] = s.split('\n').map(l => l.split(''));
  const N = map.length;
  const M = map[0].length;

  let cur = getStart(map);

  let valids = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // skip the the guard position
      if (i === cur.i && j === cur.j) {
        continue;
      } else if (map[i][j] === '#') {
        continue;
      } else {
        if (isValidPlace(i, j, map)) {
          valids += 1;
        }
      }
    }
  }
  return valids;
};
