const blink = (num: string): string[] => {
  if (num === '0') {
    return ['1'];
  } else if (num.length % 2 === 0) {
    const left = num.substring(0, num.length / 2);
    const right = parseInt(num.substring(num.length / 2), 10);
    return [left, `${right}`];
  } else {
    return [`${parseInt(num, 10) * 2024}`];
  }
};

export const dp = (
  stone: string,
  times: number,
  mem: Map<string, number>,
): number => {
  if (mem.has(`${stone}:${times}`)) {
    return mem.get(`${stone}:${times}`);
  }

  if (times === 0) {
    return 1;
  }

  const blinked = blink(`${stone}`);
  let sum = 0;
  for (const b of blinked) {
    sum += dp(b, times - 1, mem);
  }
  mem.set(`${stone}:${times}`, sum);
  return sum;
};

export const solve = (s: string, times: number): number => {
  const stones = s.split(' ');
  let sum = 0;
  const mem = new Map<string, number>();
  for (const s of stones) {
    sum += dp(s, times, mem);
  }
  return sum;
};
