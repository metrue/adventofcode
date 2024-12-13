import { blinks } from './main';
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
  describe('Part 1', () => {
    it.skip('smoke 0', () => {
      const s = `0 1 10 99 999`;
      const res = blinks(s, 1);
      assert.strictEqual(res, ['1', '2024', '1', '0', '9', '9', '2021976']);
    });

    it('smoke 1', () => {
      const s = `125 17`;
      const res = blinks(s, 1);
      assert.deepEqual(res, ['253000', '1', '7']);
    });

    it('smoke 2', () => {
      const s = `125 17`;
      const res = blinks(s, 4);
      assert.strictEqual(res.join(' '), '512 72 2024 2 0 2 4 2867 6032');
    });

    it('smoke 3', () => {
      const s = `125 17`;
      const res = blinks(s, 6);
      assert.strictEqual(
        res.join(' '),
        '2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2',
      );
    });

    it('integration', () => {
      measure(() => {
        const res = blinks(process.env.DAY_11_INPUT, 25);
        assert.strictEqual(res.length, 1289);
      });
    });
  });

  describe('Part 2', () => {
    it.skip('smoke 0', () => {});

    it('smoke 1', () => {});

    it('smoke 2', () => {});

    it('smoke 3', () => {});

    it('integration', () => {});
  });
});
