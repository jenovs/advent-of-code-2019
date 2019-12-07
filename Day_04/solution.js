// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split('-')
  .map(Number);

const [min, max] = input;

const hasDouble = num => {
  const arr = String(num).split('');

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      return true;
    }
  }

  return false;
};

const isIncreasing = num => {
  return (
    String(num)
      .split('')
      .sort()
      .join('') == num
  );
};

const hasExactDouble = num => {
  const count = Array(10).fill(0);

  String(num)
    .split('')
    .map(Number)
    .forEach(num => {
      count[num] += 1;
    });

  return count.filter(n => n === 2).length;
};

let partOne = 0;
let partTwo = 0;

for (let i = min; i <= max; i++) {
  if (hasDouble(i) && isIncreasing(i)) {
    partOne++;

    if (hasExactDouble(i)) {
      partTwo++;
    }
  }
}

console.log('Part One:', partOne);
console.log('Part Two:', partTwo);
