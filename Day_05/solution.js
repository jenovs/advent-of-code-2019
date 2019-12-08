// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split(',')
  .map(Number);

const calc = (input, id) => {
  for (let i = 0; ; ) {
    const c = input[i];

    const [, mode2, mode1, , opcode] = String(c)
      .padStart(5, '0')
      .split('')
      .map(Number);

    const n1 = Number(mode1 ? input[i + 1] : input[input[i + 1]]);
    const n2 = Number(mode2 ? input[i + 2] : input[input[i + 2]]);
    const addr = input[i + 3];

    switch (opcode) {
      case 1:
        (input[addr] = n1 + n2), (i += 4);
        break;
      case 2:
        (input[addr] = n1 * n2), (i += 4);
        break;
      case 3: {
        (input[input[i + 1]] = id), (i += 2);
        break;
      }
      case 4: {
        if (n1) return n1;
        i += 2;
        break;
      }
      case 5:
        i = n1 ? n2 : i + 3;
        break;
      case 6:
        i = !n1 ? n2 : i + 3;
        break;
      case 7:
        (input[addr] = n1 < n2 ? 1 : 0), (i += 4);
        break;
      case 8:
        (input[addr] = n1 == n2 ? 1 : 0), (i += 4);
        break;
    }
  }
};

console.log('Part One:', calc([...input], 1));
console.log('Part Two:', calc([...input], 5));
