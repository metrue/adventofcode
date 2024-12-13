export const blink = (stones: string[]): string[] => {
  const lst: string[] = [];
  for (let i = 0; i < stones.length; i++) {
    if (stones[i] === '0') {
      lst.push('1');
    } else if (stones[i].length % 2 === 0) {
      console.warn('+++');
      console.warn(stones[i]);
      console.warn('+++');
      const len = stones[i].length;
      lst.push(stones[i].substring(0, len / 2));
      const right = stones[i].substring(len / 2).replace(/^0+/, '');
      const rigthValue = right === '' ? '0' : right;
      lst.push(rigthValue);
    } else {
      lst.push(`${parseInt(stones[i], 10) * 2024}`);
    }
  }
  return lst;
};

export const blinks = (s: string, times: number): string[] => {
  let cur: string[] = s.split(' ');
  for (let i = 0; i < times; i++) {
    cur = blink(cur);
  }
  return cur;
};
