const path = require('path');
const chalk = require('chalk');
const mockAxios = require('axios');
const mdLinks = require('../src/mdlinks');

const mdPath = path.resolve('./test/dir/anotherDir/oneLink.md');
const jsPath = path.resolve('./test/dir/example.js');

const testArrayStatus = [
  {
    href: 'https://www.google.com/',
    text: 'Google',
    file: mdPath,
    status: 200,
    statusText: 'OK',
  },
];

const testArray = [
  {
    href: 'https://www.google.com/',
    text: 'Google',
    file: mdPath,
  },
];

describe('mdLinksApi', () => {
  it('Debería retornar un array con los status de los links', (done) => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, statusText: 'OK' }));

    mdLinks(mdPath, { validate: true })
      .then((res) => {
        expect(res).toEqual(testArrayStatus);
        done();
      });
  });

  it('Debería retornar un array de los links', (done) => mdLinks(mdPath, { validate: false })
    .then((res) => {
      expect(res).toEqual(testArray);
      done();
    }));

  it('Debería retornar que no se encontró archivos md', (done) => mdLinks(jsPath, { validate: false })
    .catch((err) => {
      expect(err.message).toBe(`\nThere are not md files in ${chalk.yellow(jsPath)}`);
      done();
    }));

  it('Debería retornar que la ruta no es válida', (done) => mdLinks('invalidPath', { validate: false })
    .catch((err) => {
      expect(err.message).toBe(`\nPath ${chalk.yellow('invalidPath')} is not valid`);
      done();
    }));
});
