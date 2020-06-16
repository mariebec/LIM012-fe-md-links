const path = require('path');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chalk = require('chalk');
const mdLinks = require('../src/mdlinks');

const mdPath = path.resolve('./test/folder/anotherFolder/README.md');
const jsPath = path.resolve('./test/folder/example.js');
const testArrayStatus = [
  {
    href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
    text: 'cifrado César',
    file: mdPath,
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://medium.com/laboratoria-how-to/vanillajs-vs-jquery-31e623bbd46e',
    text: 'vanilla JavaScript',
    file: mdPath,
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://www.facebook.com/photo.php?fbid=10216219635191680&set=g.410918248922046&type=1&theater&ifg=1',
    text: 'Imagen facebook',
    file: mdPath,
    status: 404,
    statusText: 'Not Found',
  },
  {
    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    text: 'Asincronía en Javascript',
    file: mdPath,
    status: 'ECONNREFUSED',
    statusText: 'FAIL',
  },
];

const testArray = [
  {
    href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
    text: 'cifrado César',
    file: mdPath,
  },
  {
    href: 'https://medium.com/laboratoria-how-to/vanillajs-vs-jquery-31e623bbd46e',
    text: 'vanilla JavaScript',
    file: mdPath,
  },
  {
    href: 'https://www.facebook.com/photo.php?fbid=10216219635191680&set=g.410918248922046&type=1&theater&ifg=1',
    text: 'Imagen facebook',
    file: mdPath,
  },
  {
    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    text: 'Asincronía en Javascript',
    file: mdPath,
  },
];

const mock = new MockAdapter(axios);
const data = { status: 200, statusText: 'OK' };
mock.onGet(mdPath).reply(200, data);

describe('mdLinksApi', () => {
  it('Debería retornar un array con los status de los links', (done) => mdLinks(mdPath, { validate: true })
    .then((res) => {
      expect(res).toEqual(testArrayStatus);
      done();
    }));

  it('Debería retornar un array de los links', (done) => mdLinks(mdPath, { validate: false })
    .then((res) => {
      expect(res).toEqual(testArray);
      done();
    }));

  it('Debería retornar que no se encontró archivos md', (done) => mdLinks(jsPath, { validate: false })
    .catch((err) => {
      expect(err.message).toBe(`\nNo se encontró archivos markdown en ${chalk.yellow(jsPath)}`);
      done();
    }));

  it('Debería retornar que la ruta no es válida', (done) => mdLinks('invalidPath', { validate: false })
    .catch((err) => {
      expect(err.message).toBe(`\nLa ruta ${chalk.yellow('invalidPath')} no es válida`);
      done();
    }));
});
