enum DIRECTION {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

interface Point {
  i: number;
  j: number;
  direction?: DIRECTION;
}

const toSignature = (p: Point, directionInclude: boolean = false) => {
  return directionInclude ? `${p.i},${p.j},${p.direction}` : `${p.i},${p.j}`;
};
const toPoint = (s: string) => {
  const [i, j, direction] = s.split(',');
  return {
    i: parseInt(i, 10),
    j: parseInt(j, 10),
    direction,
  };
};

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

export const getDistinctPositions = (s: string): Set<string> => {
  const map: string[][] = s.split('\n').map(l => l.split(''));
  const N = map.length;
  const M = map[0].length;

  const points: Set<string> = new Set();
  let cur = getStart(map);
  let steps = 0;
  while (!isOut(cur, N, M)) {
    points.add(toSignature(cur));

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
  return points;
};

const hasLoop = (map: string[][]): boolean => {
  const N = map.length;
  const M = map[0].length;
  const visited = new Set();
  let cur = getStart(map);
  while (!isOut(cur, N, M)) {
    const sig = toSignature(cur, true);
    if (visited.has(sig)) {
      return true;
    } else {
      visited.add(sig);
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
  }
  return false;
};

export const getValidPositions = (s: string): Point[] => {
  const map: string[][] = s.split('\n').map(l => l.split(''));

  const points = getDistinctPositions(s);

  const validPoints = [];
  points.forEach(p => {
    const point = toPoint(p);
    if (map[point.i][point.j] === '.') {
      map[point.i][point.j] = '#';
      if (hasLoop(map)) {
        validPoints.push(point);
      }
      map[point.i][point.j] = '.';
    }
  });

  return validPoints;
};
