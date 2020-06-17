#!/usr/bin/env node
/* eslint-disable no-console */

const chalk = require('chalk');
const mdlinks = require('./mdlinks');

const terminalInput = process.argv;
const validateOp = terminalInput.includes('--validate') || terminalInput.includes('--v');
const statOp = terminalInput.includes('--stats') || terminalInput.includes('--s');
const help = terminalInput.includes('--help') || terminalInput.includes('--h');

const instructions = () => {
  console.log(`
  ${chalk.bold('Guía:')}

  ${chalk.grey('Opciones:')}
  --validate ${chalk.grey('o')} --v 
  --stats ${chalk.grey('o')} --s 

  ${chalk.grey('Ejemplo de uso:')}
  md-links <path>  ${chalk.grey('obtener todos los links')}
  md-links <path> --v ${chalk.grey('obtener status de links')}
  md-links <path> --s ${chalk.grey('obtener estadísticas')}
  md-links <path> --v --s ${chalk.grey('obtener status de links y estadísticas')}
  `);
};

if (terminalInput.length < 3) {
  console.log('\nIngrese una ruta');
  instructions();
} else {
  const route = process.argv[2];

  if (terminalInput.length === 3 && help) {
    instructions();
  } else if (terminalInput.length === 3) {
    mdlinks(route, { validate: false }).then((res) => {
      res.forEach((element) => {
        const index = element.file.indexOf(route.replace('.', ''));
        const mdPath = element.file.slice(index, element.file.length);
        const text = (element.text.length > 50) ? element.text.slice(0, 51) : element.text;
        console.log(`${mdPath} ${chalk.blue(element.href)} ${text}`);
      });
    }).catch((err) => {
      console.log(`${err.message}`);
    });
  } else if (terminalInput.length > 3 && terminalInput.length < 6) {
    if (validateOp && statOp) {
      mdlinks(route, { validate: true }).then((res) => {
        const arr = res.map(((element) => element.href));
        const unique = new Set(arr).size;
        const result = res.reduce((sum, element) => {
          // eslint-disable-next-line no-param-reassign
          if (element.status > 399 || typeof element.status === 'string') sum += 1;
          return sum;
        }, 0);
        console.log(`Total: ${arr.length}\nUnique: ${unique}\nBroken: ${chalk.red(result)}`);
      }).catch((err) => {
        console.log(err.message);
      });
    } else if (statOp && terminalInput.length === 4) {
      mdlinks(route, { validate: true }).then((res) => {
        const arr = res.map(((element) => element.href));
        const unique = new Set(arr).size;
        console.log(`\nTotal: ${arr.length}\nUnique: ${unique}`);
      }).catch((err) => {
        console.log(err.message);
      });
    } else if (validateOp && terminalInput.length === 4) {
      mdlinks(route, { validate: true }).then((res) => {
        res.forEach((element) => {
          const index = element.file.indexOf(route.replace('.', ''));
          const mdPath = element.file.slice(index, element.file.length);
          let status;
          let statusText;
          if (element.status < 300) {
            status = chalk.green(element.status);
            statusText = chalk.green(element.statusText);
          } else if (element.status < 400 && element.status > 299) {
            status = chalk.yellow(element.status);
            statusText = chalk.yellow(element.statusText);
          } else {
            status = chalk.red(element.status);
            statusText = chalk.red(element.statusText);
          }
          const text = (element.text.length > 50) ? element.text.slice(0, 51) : element.text;
          console.log(`${mdPath} ${chalk.blue(element.href)} ${statusText} ${status} ${text}`);
        });
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      console.log('\nOpción no válida');
      instructions();
    }
  } else {
    console.log('\nOpción no válida');
    instructions();
  }
}
