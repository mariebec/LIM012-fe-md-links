const chalk = require('chalk');
const utilFunctions = require('./utils');

const mdLinks = (userPath, options) => new Promise((resolve, reject) => {
  if (utilFunctions.validatePath(userPath)) {
    const absPath = utilFunctions.absolutePath(userPath);

    let arrOfLinks = [];
    if (utilFunctions.pathIsFile(absPath) && !utilFunctions.getExtension(absPath)) {
      reject(new Error(`\nThere are not md files in ${chalk.yellow(userPath)}`));
    } else if (options.validate) {
      arrOfLinks = utilFunctions.getStatus(absPath);
      resolve(arrOfLinks);
    } else {
      arrOfLinks.push(...utilFunctions.getLinks(absPath));
      resolve(arrOfLinks);
    }
  } else {
    reject(new Error(`\nPath ${chalk.yellow(userPath)} is not valid`));
  }
});

module.exports = mdLinks;
