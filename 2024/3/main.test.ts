import { multiplications, multiplicationsWithInstruction } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 3', () => {
  describe('Part 1', () => {
    it.only('smoke', () => {
      const s = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
      const num = multiplications(s);
      assert.strictEqual(num, 161);
    });
    it('integration', () => {
      const num = multiplications(process.env.DAY_3_INPUT);
      assert.strictEqual(num, 179834255);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
      const num = multiplicationsWithInstruction(s);
      assert.strictEqual(num, 48);
    });

    it('integration', () => {
      const num = multiplicationsWithInstruction(process.env.DAY_3_INPUT);
      assert.strictEqual(num, 80570939);
    });
  });
});
