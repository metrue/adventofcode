import { getMiddleSumOfOrderred, getMiddleSumOfFixOrderred } from './main';
import { describe, it } from 'node:test';
import assert = require('node:assert');
import process = require('process');

describe('Day 5', () => {
  describe('Part 1', () => {
    it.only('smoke', () => {
      const s = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
      const num = getMiddleSumOfOrderred(s);
      assert.strictEqual(num, 143);
    });

    it('integration', () => {
      const num = getMiddleSumOfOrderred(process.env.DAY_5_INPUT);
      assert.strictEqual(num, 5087);
    });
  });

  describe('Part 2', () => {
    it('smoke', () => {
      const s = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
      const num = getMiddleSumOfFixOrderred(s);
      assert.strictEqual(num, 123);
    });

    it('integration', () => {
      const num = getMiddleSumOfFixOrderred(process.env.DAY_5_INPUT);
      assert.strictEqual(num, 4971);
    });
  });
});
