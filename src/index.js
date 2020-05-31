const insertedPath = './src/cli.js';
const path = require('path');

// const convertToAbsolute = (newPath) => {
//   let route = newPath;
//   if (!path.isAbsolute(newPath)) route = path.resolve(newPath);
//   return route;
// };

const convertToAbsolute = (newPath) => (path.isAbsolute(newPath) ? newPath : path.resolve(newPath));

convertToAbsolute(insertedPath);

// const validatePath = () => {
//   console.log('Validar ruta');
// };

// const isFile = () => {
//   console.log('Determinar si es un archivo');
// };

// const isDirectory = () => {
//   console.log('Determinar si es un directorio');
// };


module.exports = {
  convertToAbsolute,
  /* validatePath,
  isFile,
  isDirectory, */
};
