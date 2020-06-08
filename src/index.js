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

const getLinks = (newPath, userPath, options) => {
  // Obtener el contenido del archivo y pasarlo a string
  const mdStringContent = fs.readFileSync(newPath).toString();
  // Convertir contenido del archivo .md a html
  const mdHtmlContent = marked(mdStringContent);
  // Extraer los links con jsdom
  const dom = new JSDOM(mdHtmlContent);
  const nodeList = dom.window.document.querySelectorAll('a');
  const arrayOfAnchor = Array.from(nodeList);
  const arr = [];

  if (options.validate) {
    arrayOfAnchor.forEach((element) => {
      arr.push(httpRequest(element.href)
        .then((response) => ({
          href: element.getAttribute('href'),
          text: element.textContent,
          file: userPath,
          status: response.status,
          statusText: response.statusText,
        }))
        .catch(() => ({
          href: element.getAttribute('href'),
          text: element.textContent,
          file: userPath,
          status: 'nose',
          statusText: 'Fail',
        })));
    });
  } else {
    arrayOfAnchor.forEach((element) => {
      const obj = {
        href: element.getAttribute('href'),
        text: element.textContent,
        file: userPath,
      };
      arr.push(obj);
    });
  }

  return arr;
};

const getMdFiles = (newPath) => {
  const arrOfFiles = [];
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
