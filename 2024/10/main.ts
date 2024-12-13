interface Position {
  x: number;
  y: number;
}

const isValid = (x: number, y: number, map: string[][]) => {
  return x >= 0 && x < map.length && y >= 0 && y < map[x].length;
};

export const backtrace = (
  start: Position,
  cur: Position,
  path: Position[],
  res: Set<string>,
  map: string[][] = [],
) => {
  if (map[cur.x][cur.y] === '9') {
    res.add(`(${start.x},${start.y})->(${cur.x},${cur.y}`);
    return;
  }

  const directions = [
    [-1, 0], // up
    [0, -1], // left
    [+1, 0], // down
    [0, +1], // right
  ];
  for (const d of directions) {
    const next = { x: cur.x + d[0], y: cur.y + d[1] };

    if (isValid(next.x, next.y, map)) {
      const nextValue = parseInt(map[next.x][next.y], 10);
      const curValue = parseInt(map[cur.x][cur.y], 10);
      if (nextValue - curValue === 1) {
        backtrace(start, next, [...path, next], res, map);
      }
    }
  }
};

export const sumScore = (s: string): number => {
  const map: string[][] = s
    .split('\n')
    .filter(l => l.length !== 0)
    .map(l => l.split(''));
  const zeros: Position[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '0') {
        zeros.push({
          x: i,
          y: j,
        });
      }
    }
  }
  const res: Set<string> = new Set();
  for (const z of zeros) {
    backtrace(z, z, [z], res, map);
  }
  console.warn('res:', res);
  return res.size;
};

const countRating = (
  cur: Position,
  path: string,
  res: Set<string>,
  map: string[][],
) => {
  if (map[cur.x][cur.y] === '9') {
    res.add(path);
    return;
  }

  const directions = [
    [-1, 0],
    [0, -1],
    [+1, 0],
    [0, +1],
  ];
  for (const d of directions) {
    const nextX = cur.x + d[0];
    const nextY = cur.y + d[1];
    if (isValid(nextX, nextY, map)) {
      const nextValue = parseInt(map[nextX][nextY], 10);
      const curValue = parseInt(map[cur.x][cur.y], 10);
      if (nextValue - curValue === 1) {
        countRating(
          {
            x: nextX,
            y: nextY,
          },
          `${path},(${nextX},${nextY})`,
          res,
          map,
        );
      }
    }
  }
};

export const sumRating = (s: string): number => {
  const map: string[][] = s
    .split('\n')
    .filter(l => l.length !== 0)
    .map(l => l.split(''));
  const zeros: Position[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '0') {
        zeros.push({
          x: i,
          y: j,
        });
      }
    }
  }
  const res: Set<string> = new Set();
  for (const z of zeros) {
    countRating(z, `(${z.x}, ${z.y})`, res, map);
  }
  return res.size;
};
