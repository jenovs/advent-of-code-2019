// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split('\n')
  .map(Number);

const result1 = input.reduce((acc, mass) => {
  return acc + Math.floor(mass / 3) - 2;
}, 0);

/**
 * @param {Number} n
 */
const calcMass = n => {
  const m = Math.floor(n / 3) - 2;

  return m <= 0 ? 0 : m + calcMass(m);
};

const result2 = input.reduce((acc, mass) => {
  return acc + calcMass(mass);
}, 0);

console.log('Part One:', result1);
console.log('Part Two:', result2);
