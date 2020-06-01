// const insertedPath = './src/cli.js';
const path = require('path');
const fs = require('fs');

// const convertToAbsolute = (newPath) => {
//   let route = newPath;
//   if (!path.isAbsolute(newPath)) route = path.resolve(newPath);
//   return route;
// };

const absolutePath = (newPath) => (path.isAbsolute(newPath) ? newPath : path.resolve(newPath));

const validatePath = (newPath) => fs.existsSync(newPath);
// if (fs.existsSync(newPath)) return true;
// return false;
// };

const pathIsFile = (newPath) => fs.statSync(newPath).isFile();

const pathIsDirectory = (newPath) => fs.statSync(newPath).isDirectory();


module.exports = {
  absolutePath,
  pathIsFile,
  validatePath,
  pathIsDirectory,
};
