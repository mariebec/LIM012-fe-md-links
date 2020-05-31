const insertedPath = './src/cli.js';
const path = require('path');
const fs = require('fs');

// const convertToAbsolute = (newPath) => {
//   let route = newPath;
//   if (!path.isAbsolute(newPath)) route = path.resolve(newPath);
//   return route;
// };

const absolutePath = (newPath) => (path.isAbsolute(newPath) ? newPath : path.resolve(newPath));

absolutePath(insertedPath);

// const validatePath = () => {
//   console.log('Validar ruta');
// };

const pathIsFile = (newPath) => fs.statSync(newPath).isFile();

pathIsFile(insertedPath);

// const isDirectory = () => {
//   console.log('Determinar si es un directorio');
// };


module.exports = {
  absolutePath,
  pathIsFile,
  // validatePath,
  // isDirectory,
};
