const utilFunctions = require('./index');

const mdLinks = (userPath, options) => new Promise((resolve, reject) => {
  if (utilFunctions.validatePath(userPath)) {
    const absPath = utilFunctions.absolutePath(userPath);

    let arrOfLinks = [];
    if (utilFunctions.pathIsFile(absPath) && utilFunctions.getExtension(absPath) === '.md') {
      arrOfLinks = utilFunctions.getLinks(absPath, options);
    } else {
      utilFunctions.getMdFiles(absPath).forEach((element) => {
        const arr = utilFunctions.getLinks(element, options);
        arrOfLinks.push(...arr);
      });
    }
    if (arrOfLinks.length > 0) resolve(Promise.all(arrOfLinks));
    else reject(new Error('No se encontró archivos markdown con links'));
  } else {
    reject(new Error('Ruta no válida'));
  }
});


mdLinks('./folder/', { validate: true }).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err.message);
});

module.exports = mdLinks;
