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
      const points = getDistinctPositions(s);
      assert.strictEqual(points.size, 41);
    });

    it('integration', () => {
      const points = getDistinctPositions(process.env.DAY_6_INPUT);
      assert.strictEqual(points.size, 5199);
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
      const points = getValidPositions(s);
      assert.strictEqual(points.length, 6);
    });

    it('integration', () => {
      const points = getValidPositions(process.env.DAY_6_INPUT);
      assert.strictEqual(points.length, 1915);
    });
  });
});
