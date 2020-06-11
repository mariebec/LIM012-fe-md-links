const utilFunctions = require('./utils');

const mdLinks = (userPath, options) => new Promise((resolve, reject) => {
  if (utilFunctions.validatePath(userPath)) {
    const absPath = utilFunctions.absolutePath(userPath);

    const arrOfLinks = [];
    if (utilFunctions.pathIsFile(absPath) && !utilFunctions.getExtension(absPath)) {
      reject(new Error('No se encontró archivos markdown'));
    } else {
      utilFunctions.getMdFiles(absPath).forEach((element) => {
        if (options.validate) {
          arrOfLinks.push(...utilFunctions.getStatus(element));
        } else {
          arrOfLinks.push(...utilFunctions.getLinks(element));
        }
      });
    }
    if (arrOfLinks.length > 0) resolve(Promise.all(arrOfLinks));
    else reject(new Error('No se encontró archivos markdown con links'));
  } else {
    reject(new Error('Ruta no válida'));
  }
});


// mdLinks('./folder/anotherFolder/README.md', { validate: true }).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err.message);
// });

module.exports = mdLinks;
