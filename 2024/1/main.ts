export const distance = (s: string): number => {
  const left = [];
  const right = [];

  s.split('\n').forEach(line => {
    const [l, r] = line.trim().split(/\s+/);
    left.push(parseInt(l, 10));
    right.push(parseInt(r, 10));
  });

  left.sort();
  right.sort();

  let distances = 0;
  for (let i = 0; i < left.length; i++) {
    distances += Math.abs(right[i] - left[i]);
  }
  return distances;
};

export const simalarity = (s: string): number => {
  const left = [];
  const right = {};

  s.split('\n').forEach(line => {
    const [l, r] = line.trim().split(/\s+/);
    left.push(l);
    if (!right[r]) {
      right[r] = 0;
    }
    if (!right[l]) {
      right[l] = 0;
    }
    right[r] += 1;
  });
  return left.reduce((acc, cur) => acc + parseInt(cur, 10) * right[cur], 0);
};
