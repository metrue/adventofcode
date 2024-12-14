import { solve } from './main';
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

describe('Day 11', () => {
  it('integration', () => {
    measure(() => {
      const res = solve(process.env.DAY_11_INPUT, 25);
      assert.strictEqual(res, 233875);
    });
  });
});

describe('Part 2', () => {
  it('integration', () => {
    measure(() => {
      const res = solve(process.env.DAY_11_INPUT, 75);
      assert.strictEqual(res, 277444936413293);
    });
  });
});
