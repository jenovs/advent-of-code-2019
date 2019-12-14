// @ts-check
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8')
  .split('\n')
  .reduce((acc, n) => {
    const [key, value] = n.split(')');
    acc[key] ? acc[key].push(value) : (acc[key] = [value]);
    return acc;
  }, {});

const head = 'COM';

const traverse = (orbits, startKey) => {
  let count = 0;

  const recurse = (key = startKey, cnt = 0) => {
    count += cnt;

    if (!orbits[key]) {
      return;
    }

    orbits[key].forEach(n => {
      recurse(n, cnt + 1);
    });
  };

  recurse();

  return count;
};

const findParent = needle => {
  for (const key in input) {
    if (input[key].includes(needle)) {
      return key;
    }
  }
};

let log = [];

const logPath = startKey => {
  const log = [];

  const recurse = (key = startKey) => {
    const parent = findParent(key);

    if (parent === head || !key) {
      return;
    }

    log.push(parent);
    recurse(parent);
  };

  recurse();
  return log;
};

const countOrbits = (id1, id2) => {
  const path1 = logPath(id1);
  const path2 = logPath(id2);

  for (let i = 0; i < path1.length; i++) {
    const el = path1[i];

    if (path2.includes(el)) {
      return i + path2.indexOf(el);
    }
  }
};

console.log('Part One:', traverse(input, head));
console.log('Part Two:', countOrbits('YOU', 'SAN'));
