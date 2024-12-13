import { sumScore, sumRating } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

const measure = (fn: () => void) => {
  const start = process.hrtime();
  fn();
  const stop = process.hrtime(start);
  const executionTime = (stop[0] * 1e9 + stop[1]) / 1e9;
  console.log(`timeout: ${executionTime}`);
};

describe('Day 10', () => {
  describe('Part 1', () => {
    it.skip('smoke 0', () => {
      const s = `
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;
      const res = sumScore(s);
      assert.strictEqual(res, 2);
    });

    it('smoke 1', () => {
      const s = `
..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;
      const res = sumScore(s);
      assert.strictEqual(res, 4);
    });

    it('smoke 2', () => {
      const s = `
10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01
`;
      const res = sumScore(s);
      assert.strictEqual(res, 3);
    });

    it('smoke 3', () => {
      const s = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;
      const res = sumScore(s);
      assert.strictEqual(res, 36);
    });

    it('integration', () => {
      measure(() => {
        const res = sumScore(process.env.DAY_10_INPUT);
        assert.strictEqual(res, 638);
      });
    });
  });

  describe('Part 2', () => {
    it.skip('smoke 0', () => {
      const s = `
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;
      const res = sumRating(s);
      assert.strictEqual(res, 2);
    });

    it('smoke 1', () => {
      const s = `
..90..9
...1.98
...2..7
6543456
765.987
876....
987....
`;
      const res = sumRating(s);
      assert.strictEqual(res, 13);
    });

    it('smoke 2', () => {
      const s = `
012345
123456
234567
345678
4.6789
56789.`;
      const res = sumRating(s);
      assert.strictEqual(res, 227);
    });

    it('smoke 3', () => {
      const s = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
      const res = sumRating(s);
      assert.strictEqual(res, 81);
    });

    it('integration', () => {
      measure(() => {
        const res = sumRating(process.env.DAY_10_INPUT);
        assert.strictEqual(res, 6154342787400);
      });
    });
  });
});
