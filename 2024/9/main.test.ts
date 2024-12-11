import {
  checksum,
  checksum2,
  freeDisk2,
  decodeDiskMap,
  freeDisk,
} from './main';
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

describe('Day 9', () => {
  // describe('Unit', () => {
  //   it('decodeDiskMap 1', () => {
  //     const s = '12345';
  //     const res = decodeDiskMap(s.split('').map(d => parseInt(d, 10)));
  //     assert.strictEqual(res.join(''), '0..111....22222');
  //   });
  //
  //   it('decodeDiskMap 2', () => {
  //     const s = '2333133121414131402';
  //     const res = decodeDiskMap(s.split('').map(d => parseInt(d, 10)));
  //     assert.strictEqual(
  //       res.join(''),
  //       '00...111...2...333.44.5555.6666.777.888899',
  //     );
  //   });
  //
  //   it('decodeDiskMap 3', () => {
  //     const s = '233313312141413140203';
  //     const res = decodeDiskMap(s.split('').map(d => parseInt(d, 10)));
  //     console.warn(res);
  //     assert.strictEqual(
  //       res.join(''),
  //       '00...111...2...333.44.5555.6666.777.888899101010',
  //     );
  //   });
  //
  //   it('freeDisk 1', () => {
  //     const s = '12345';
  //     const decoded = decodeDiskMap(s.split('').map(d => parseInt(d, 10)));
  //     const res = freeDisk(decoded);
  //     assert.strictEqual(res.join(''), '022111222......');
  //   });
  //
  //   it('freeDisk 2', () => {
  //     const s = '2333133121414131402';
  //     const decoded = decodeDiskMap(s.split('').map(d => parseInt(d, 10)));
  //     const res = freeDisk(decoded);
  //     assert.strictEqual(
  //       res.join(''),
  //       '0099811188827773336446555566..............',
  //     );
  //   });
  // });
  //
  // describe('Part 1', () => {
  //   it('smoke', () => {
  //     const s = `2333133121414131402`;
  //     const res = checksum(s);
  //     assert.strictEqual(res, 1928);
  //   });
  //
  //   it('integration', () => {
  //     const res = checksum(process.env.DAY_9_INPUT);
  //     assert.strictEqual(res, 6154342787400);
  //   });
  // });

  describe('Part 2', () => {
    describe('Unit', () => {
      it('freeDisk 2', () => {
        const pointers = '00...111...2...333.44.5555.6666.777.888899'.split('');
        const res = freeDisk2(pointers);
        assert.strictEqual(
          res.join(''),
          '00992111777.44.333....5555.6666.....8888..',
        );
      });
    });
    // it('smoke', () => {
    //   let s = `2333133121414131402`;
    //   let res = checksum2(s);
    //   assert.strictEqual(res, 2858);
    //
    //   s = `0...1...2......33333`;
    //   res = checksum2(s);
    //   assert.strictEqual(res, 169);
    // });
    //
    // it('integration', () => {
    //   measure(() => {
    //     // const res = checksum2(process.env.DAY_9_INPUT);
    //     // assert.strictEqual(res, 6154342787400);
    //   });
    // });
  });
});
