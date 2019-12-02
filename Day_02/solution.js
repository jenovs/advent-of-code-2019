// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split(',')
  .map(Number);

/**
 * @param {number[]} input
 */
const calc = input => {
  for (let i = 0; i < input.length; i += 4) {
    const c = input[i];
    if (c === 99) {
      break;
    }

    const n1 = input[input[i + 1]];
    const n2 = input[input[i + 2]];
    const addr = input[i + 3];

    if (c === 1) {
      input[addr] = n1 + n2;
    } else if (c === 2) {
      input[addr] = n1 * n2;
    }
  }

  return input[0];
};

/**
 * @param {number[]} arr
 */
const part1 = arr => {
  const input = [...arr];
  input[1] = 12;
  input[2] = 2;

  return calc(input);
};

/**
 * @param {number[]} arr
 */
const part2 = arr => {
  const input = [...arr];
  const target = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    input[1] = noun;
    for (let verb = 0; verb < 100; verb++) {
      input[2] = verb;
      if (calc([...input]) === target) {
        return 100 * noun + verb;
      }
    }
  }
};

console.log('Part One:', part1(input));
console.log('Part Two:', part2(input));
