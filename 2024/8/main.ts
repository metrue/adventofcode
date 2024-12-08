interface Point {
  i: number;
  j: number;
  frequency?: string;
}

const getAntenas = (map: string[][]): Record<string, Point[]> => {
  const groups: Record<string, Point[]> = {};
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cur = map[i][j];
      if (cur !== '.') {
        if (!groups[cur]) {
          groups[cur] = [];
        }
        groups[cur].push({
          i,
          j,
          frequency: cur,
        });
      }
    }
  }

  return groups;
};

const isOut = (p: Point, N: number, M: number): boolean => {
  return p.i < 0 || p.i >= N || p.j < 0 || p.j >= M;
};

const move = (p: Point, diff: number[], forward: boolean): Point => {
  return forward
    ? {
        i: p.i + diff[0],
        j: p.j + diff[1],
      }
    : {
        i: p.i - diff[0],
        j: p.j - diff[1],
      };
};

export const getAntiNodes = (
  p1: Point,
  p2: Point,
  N: number,
  M: number,
  oneLevelOnly: boolean = true,
): Point[] => {
  if (p1.frequency !== p2.frequency) {
    throw new Error(`invalid frequency pair`);
  }

  const nodes: Point[] = [];
  const diff = [p2.i - p1.i, p2.j - p1.j];

  let n1 = move(p1, diff, false);
  let n2 = move(p2, diff, true);
  if (oneLevelOnly) {
    if (!isOut(n1, N, M)) {
      nodes.push(n1);
    }
    if (!isOut(n2, N, M)) {
      nodes.push(n2);
    }
  } else {
    nodes.push(p1);
    nodes.push(p2);
    while (!isOut(n1, N, M)) {
      nodes.push(n1);
      n1 = move(n1, diff, false);
    }

    while (!isOut(n2, N, M)) {
      nodes.push(n2);
      n2 = move(n2, diff, true);
    }
  }
  return nodes;
};

const collectAntiNodes = (
  lst: Point[],
  N: number,
  M: number,
  res: Set<string>,
  oneLevelOnly: boolean = true,
): void => {
  for (let i = 0; i < lst.length; i++) {
    for (let j = i + 1; j < lst.length; j++) {
      getAntiNodes(lst[i], lst[j], N, M, oneLevelOnly).forEach(n => {
        res.add(`(${n.i}, ${n.j})`);
      });
    }
  }
};

export const getAllAntiNodes = (s: string, oneLevelOnly: boolean) => {
  const map: string[][] = s.split('\n').map(l => {
    return l.split('');
  });
  const N = map.length;
  const M = map.length;
  const groups = getAntenas(map);
  const nodes: Set<string> = new Set();
  for (const k of Object.keys(groups)) {
    // for (const g of groups) {
    collectAntiNodes(groups[k], N, M, nodes, oneLevelOnly);
  }
  return nodes;
};
