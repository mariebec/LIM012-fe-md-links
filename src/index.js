// const insertedPath = './src/cli.js';
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const absolutePath = (newPath) => (path.isAbsolute(newPath) ? newPath : path.resolve(newPath));

const validatePath = (newPath) => fs.existsSync(newPath);

const pathIsFile = (newPath) => fs.statSync(newPath).isFile();

const pathIsDirectory = (newPath) => fs.statSync(newPath).isDirectory();

const getExtension = (newPath) => path.extname(newPath);

// fs.readdir('.', (err, files) => {
//   console.log(err);
//   files.forEach((element) => {
//     console.log(pathIsDirectory(element));
//   });
// });

const getLinks = (newPath) => {
  if (validatePath(newPath)) {
    const absPath = absolutePath(newPath);

    if (pathIsFile(absPath) && getExtension(absPath) === '.md') {
      // Obtener el contenido del archivo y pasarlo a string
      const mdStringContent = fs.readFileSync(newPath).toString();
      // console.log(mdStringContent);
      // Convertir contenido del archivo .md a html
      const mdHtmlContent = marked(mdStringContent);
      // Extraer los links con jsdom
      const dom = new JSDOM(mdHtmlContent);
      // console.log(dom);
      const nodeList = dom.window.document.querySelectorAll('a');
      const arrayOfAnchor = Array.from(nodeList);
      const arr = [];


      arrayOfAnchor.forEach((element) => {
        // console.log(element.textContent, element.getAttribute('href'));
        const obj = {
          href: element.getAttribute('href'),
          text: element.textContent,
          file: newPath,
        };

        axios.get(obj.href)
          .then((response) => {
            console.log(response.status, response.statusText);
          })
          .catch((error) => {
            console.log(error.code);
          });

        arr.push(obj);
      });
      // console.log(arr);
    } else {
      console.log('No es archivo md');
    }
  } else {
    console.log('Ruta no válida');
  }
};

getLinks('./README.md');

module.exports = {
  absolutePath,
  pathIsFile,
  validatePath,
  pathIsDirectory,
  getExtension,
};
