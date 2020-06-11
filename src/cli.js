#!/usr/bin/env node
/* eslint-disable no-console */

const mdlinks = require('./mdlinks');

if (process.argv.length === 2) {
  console.log('Ingrese una ruta');
} else if (process.argv.length === 3) {
  const route = process.argv[2];
  mdlinks(route, { validate: false }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err.message);
  });
} else if (process.argv.length === 4 && process.argv[3] === '--validate') {
  const route = process.argv[2];
  mdlinks(route, { validate: true }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err.message);
  });
} else if (process.argv.length === 4 && process.argv[3] === '--stat') {
  const route = process.argv[2];
  mdlinks(route, { validate: true }).then((res) => {
    const arr = res;
    const result = arr.reduce((sum, element) => {
      if (element.status !== 200) sum += 1;
      return sum;
    }, 0);
    console.log(`
    Total: ${arr.length}
    Unique: ${arr.length}
    Broken: ${result}
    `);
  }).catch((err) => {
    console.log(err.message);
  });
}
