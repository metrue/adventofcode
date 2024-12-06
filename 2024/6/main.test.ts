import { getDistinctPositions, getValidPositions } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 6', () => {
  describe('Part 1', () => {
    it('smoke', () => {
      const s = `....#.....
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
      const num = getDistinctPositions(s);
      assert.strictEqual(num, 41);
    });

    it('integration', () => {
      const num = getDistinctPositions(process.env.DAY_6_INPUT);
      assert.strictEqual(num, 5199);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `....#.....
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
      const num = getValidPositions(s);
      assert.strictEqual(num, 6);
    });

    it('integration', () => {
      // const num = getValidPositions(process.env.DAY_6_INPUT);
      // assert.strictEqual(num, 5199);
    });
  });
});
