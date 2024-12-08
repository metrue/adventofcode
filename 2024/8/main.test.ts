import { getAllAntiNodes, getAntiNodes } from './main';
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
  describe('Unit', () => {
    it('getAntiNodes', () => {
      const p1 = {
        i: 1,
        j: 8,
        frequency: '0',
      };
      const p2 = {
        i: 2,
        j: 5,
        frequency: '0',
      };
      const nodes = getAntiNodes(p1, p2, 12, 12);
      assert.strictEqual(nodes.length, 2);
      assert.equal(nodes[0].i, 0);
      assert.equal(nodes[0].j, 11);
      assert.strictEqual(nodes[1].i, 3);
      assert.strictEqual(nodes[1].j, 2);
    });

    it('getAntiNodes multiple', () => {
      const p1 = {
        i: 8,
        j: 8,
        frequency: 'A',
      };
      const p2 = {
        i: 9,
        j: 9,
        frequency: 'A',
      };
      const nodes = getAntiNodes(p1, p2, 12, 12, false);
      assert.strictEqual(nodes.length, 12);
    });
  });

  describe('Part 1', () => {
    it('smoke', () => {
      const s = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
      const nodes = getAllAntiNodes(s, true);
      assert.strictEqual(nodes.size, 14);
    });

    it('integration', () => {
      const nodes = getAllAntiNodes(process.env.DAY_8_INPUT, true);
      assert.strictEqual(nodes.size, 244);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
      const nodes = getAllAntiNodes(s, false);
      assert.strictEqual(nodes.size, 34);
    });

    it('integration', () => {
      measure(() => {
        const nodes = getAllAntiNodes(process.env.DAY_8_INPUT, false);
        assert.strictEqual(nodes.size, 912);
      });
    });
  });
});
