import { getSafeReportNumber, getSafeReportNumberWithTolerate } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 2', () => {
  describe('Part 1', () => {
    it.only('smoke', () => {
      const s = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
      const num = getSafeReportNumber(s);
      assert.strictEqual(num, 2);
    });
    it('integration', () => {
      const num = getSafeReportNumber(process.env.DAY_2_INPUT);
      assert.strictEqual(num, 332);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
      const num = getSafeReportNumberWithTolerate(s);
      assert.strictEqual(num, 4);
    });

    it('integration', () => {
      const num = getSafeReportNumberWithTolerate(process.env.DAY_2_INPUT);
      assert.strictEqual(num, 398);
    });
  });
});
