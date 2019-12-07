// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split('\n')
  .map(n => n.split(','));

const [wire1, wire2] = input;

const drawPath = wire => {
  let totalSteps = 0;
  const path = {};
  const pos = [0, 0];

  wire.forEach(([direction, ...rest]) => {
    const steps = +rest.join('');

    switch (direction) {
      case 'U':
        for (let i = 0; i < +steps; i++) {
          pos[1] = pos[1] - 1;
          path[pos.join()] = ++totalSteps;
        }
        break;
      case 'R':
        for (let i = 0; i < +steps; i++) {
          pos[0] = pos[0] + 1;
          path[pos.join()] = ++totalSteps;
        }
        break;
      case 'D':
        for (let i = 0; i < +steps; i++) {
          pos[1] = pos[1] + 1;
          path[pos.join()] = ++totalSteps;
        }
        break;
      case 'L':
        for (let i = 0; i < +steps; i++) {
          pos[0] = pos[0] - 1;
          path[pos.join()] = ++totalSteps;
        }
        break;
    }
  });

  return path;
};

const path1 = drawPath(wire1);
const path2 = drawPath(wire2);

let partOne = Infinity;
let partTwo = Infinity;

for (const key in path1) {
  if (path1.hasOwnProperty(key) && path2.hasOwnProperty(key)) {
    const [a, b] = key.split(',');
    const overlapPos = Math.abs(a) + Math.abs(b);
    const overlapSteps = path1[key] + path2[key];

    partOne = overlapPos < partOne ? overlapPos : partOne;
    partTwo = overlapSteps < partTwo ? overlapSteps : partTwo;
  }
}

console.log('Part One:', partOne);
console.log('Part Two:', partTwo);
