import { getCalibrationResult, Operation } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

const measure = (fn: () => void) => {
  const start = process.hrtime();
  const result = fn();
  const stop = process.hrtime(start);
  const executionTime = (stop[0] * 1e9 + stop[1]) / 1e9;
  console.log(`timeout: ${executionTime}`);
};

describe('Day 7', () => {
  describe('Part 1', () => {
    it('smoke', () => {
      const s = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
      const r = getCalibrationResult(s, [Operation.mul, Operation.add]);
      assert.strictEqual(r, 3749);
    });

    it('integration', () => {
      const r = getCalibrationResult(process.env.DAY_7_INPUT, [
        Operation.mul,
        Operation.add,
      ]);
      assert.strictEqual(r, 1038838357795);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
      const r = getCalibrationResult(s, [
        Operation.mul,
        Operation.add,
        Operation.concatenation,
      ]);
      assert.strictEqual(r, 11387);
    });

    it('integration', () => {
      measure(() => {
        const r = getCalibrationResult(process.env.DAY_7_INPUT, [
          Operation.mul,
          Operation.add,
          Operation.concatenation,
        ]);
        assert.strictEqual(r, 254136560217241);
      });
    });
  });
});
