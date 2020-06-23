#!/usr/bin/env node
/* eslint-disable no-console */

const chalk = require('chalk');
const mdlinks = require('./mdlinks');
const cliFunctions = require('./cliFunctions');

const terminalInput = process.argv;
const validateOp = terminalInput.includes('--validate') || terminalInput.includes('-v');
const statOp = terminalInput.includes('--stats') || terminalInput.includes('-s');
const help = terminalInput.includes('--help') || terminalInput.includes('-h');

if (terminalInput.length < 3) {
  console.log('\nInsert a path\n', cliFunctions.instructions());
} else {
  const route = process.argv[2];

  if (terminalInput.length === 3 && help) {
    console.log(cliFunctions.instructions());
  } else if (terminalInput.length === 3) {
  // Solo mdlinks sin opciones
    mdlinks(route, { validate: false }).then((res) => {
      if (res.length > 0) {
        res.forEach((element) => {
          const mdPath = cliFunctions.filePath(element.file, route);
          const text = (element.text.length > 50) ? element.text.slice(0, 51) : element.text;
          console.log(`${mdPath} ${chalk.blue(element.href)} ${text}`);
        });
      } else {
        console.log(`\nThere are not md files with links in ${chalk.yellow(route)}`);
      }
    }).catch((err) => {
      console.log(`${err.message}`);
    });
  } else if (terminalInput.length > 3 && terminalInput.length < 6) {
    if (validateOp && statOp) {
    // mdlinks con validate y stats
      mdlinks(route, { validate: true }).then((res) => {
        if (res.length > 0) {
          const arr = res.map(((element) => element.href));
          const unique = new Set(arr).size;
          const result = res.reduce((sum, element) => {
            // eslint-disable-next-line no-param-reassign
            if (element.status > 399 || typeof element.status === 'string') sum += 1;
            return sum;
          }, 0);
          console.log(`Total: ${arr.length}\nUnique: ${unique}\nBroken: ${chalk.red(result)}`);
        } else {
          console.log(`\nThere are not md files with links in ${chalk.yellow(route)}`);
        }
      }).catch((err) => {
        console.log(err.message);
      });
    } else if (statOp && terminalInput.length === 4) {
    // mdlinks con stats
      mdlinks(route, { validate: true }).then((res) => {
        const arr = res.map(((element) => element.href));
        const unique = new Set(arr).size;
        console.log(`\nTotal: ${arr.length}\nUnique: ${unique}`);
      }).catch((err) => {
        console.log(err.message);
      });
    } else if (validateOp && terminalInput.length === 4) {
    // mdlinks con validate
      mdlinks(route, { validate: true }).then((res) => {
        if (res.length > 0) {
          res.forEach((element) => {
            const mdPath = cliFunctions.filePath(element.file, route);
            const text = (element.text.length > 50) ? element.text.slice(0, 51) : element.text;
            console.log(`${mdPath} ${chalk.blue(element.href)} ${cliFunctions.textColor(element.statusText, element.status)} ${text}`);
          });
        } else {
          console.log(`\nThere are not md files with links in ${chalk.yellow(route)}`);
        }
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      console.log('\nOption not valid\n', cliFunctions.instructions());
    }
  } else {
    console.log('\nOption not valid\n', cliFunctions.instructions());
  }
}
