const chalk = require('chalk');
const utilFunctions = require('./utils');

const mdLinks = (userPath, options) => new Promise((resolve, reject) => {
  if (utilFunctions.validatePath(userPath)) {
    const absPath = utilFunctions.absolutePath(userPath);

    let arrOfLinks = [];
    if (utilFunctions.pathIsFile(absPath) && !utilFunctions.getExtension(absPath)) {
      reject(new Error(`\nNo se encontró archivos markdown en ${chalk.yellow(userPath)}`));
    } else if (options.validate) {
      arrOfLinks = utilFunctions.getStatus(absPath);
      resolve(arrOfLinks);
    } else {
      arrOfLinks.push(...utilFunctions.getLinks(absPath));
      resolve(arrOfLinks);
    }
  } else {
    reject(new Error(`\nLa ruta ${chalk.yellow(userPath)} no es válida`));
  }
});

module.exports = mdLinks;
