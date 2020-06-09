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

const getExtension = (newPath) => path.extname(newPath);

const httpRequest = (link) => axios.get(link);

const getLinks = (newPath, options) => {
  // Obtener el contenido del archivo y pasarlo a string
  const mdStringContent = fs.readFileSync(newPath).toString();
  // Convertir contenido del archivo .md a html
  const mdHtmlContent = marked(mdStringContent);
  // Extraer los links con jsdom
  const dom = new JSDOM(mdHtmlContent);
  const nodeList = dom.window.document.querySelectorAll('a');
  const arrayOfAnchor = Array.from(nodeList);

  const arr = [];

  arrayOfAnchor.forEach((element) => {
    const link = element.getAttribute('href');
    if (link.indexOf('http') !== -1) {
      if (options.validate) {
        const obj = httpRequest(link).then((res) => ({
          href: link,
          text: element.textContent,
          file: newPath,
          status: res.status,
          statusText: res.statusText,
        })).catch((err) => ({
          href: link,
          text: element.textContent,
          file: newPath,
          status: err.code,
          statusText: 'FAIL',
        }));
        arr.push(obj);
      } else {
        const obj = {
          href: link,
          text: element.textContent,
          file: newPath,
        };
        arr.push(obj);
      }
    }
  });
  return arr;
};

// Promise.all(getLinks('./folder/anotherFolder/README.md', { validate: true })).then((res) => {
//   console.log(res);
// });

const getMdFiles = (route) => {
  const arrOfFiles = [];
  const newPath = absolutePath(route);
  if (pathIsFile(newPath)) {
    if (getExtension(newPath) === '.md') {
      arrOfFiles.push(newPath);
    }
  } else {
    fs.readdirSync(newPath).forEach((element) => {
      const arr = getMdFiles(path.join(newPath, element));
      arrOfFiles.push(...arr);
    });
  }
  return arrOfFiles;
};

module.exports = {
  absolutePath,
  pathIsFile,
  validatePath,
  getExtension,
  getLinks,
  httpRequest,
  getMdFiles,
};
