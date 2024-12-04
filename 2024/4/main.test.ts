import { countXMAS, countMAS } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 4', () => {
  describe('Part 1', () => {
    it.only('smoke', () => {
      const s = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
      const num = countXMAS(s);
      assert.strictEqual(num, 18);
    });
    it('integration', () => {
      const num = countXMAS(process.env.DAY_4_INPUT);
      assert.strictEqual(num, 2549);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
      const num = countMAS(s);
      assert.strictEqual(num, 9);
    });

    it('integration', () => {
      const num = countMAS(process.env.DAY_4_INPUT);
      assert.strictEqual(num, 2003);
    });
  });
});
