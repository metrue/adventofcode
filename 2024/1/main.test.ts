import { distance, simalarity } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 1', () => {
  describe('Part 1', () => {
    it('smoke', () => {
      const s = `3   4
4   3
2   5
1   3
3   9
3   3`;
      const integration = distance(s);
      assert.strictEqual(integration, 11);
    });
    it('integration', () => {
      const r = distance(process.env.DAY_1_INPUT);
      assert.strictEqual(r, 2285373);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `3   4
4   3
2   5
1   3
3   9
3   3`;
      const integration = simalarity(s);
      assert.strictEqual(integration, 31);
    });

    it('integration', () => {
      const r = simalarity(process.env.DAY_1_INPUT);
      assert.strictEqual(r, 21142653);
    });
  });
});
