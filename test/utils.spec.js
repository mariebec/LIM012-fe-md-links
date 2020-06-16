const path = require('path');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const utilFunctions = require('../src/utils');

const testPath = path.resolve('./src/');
const mdPath = path.resolve('./test/folder/anotherFolder/README.md');
const mdGoogle = path.resolve('./test/folder/anotherFolder/oneLink.md');

describe('absolutePath', () => {
  it('Debería retornar una ruta absoluta', () => {
    expect(utilFunctions.absolutePath('./src/')).toBe(testPath);
    expect(utilFunctions.absolutePath(testPath)).toBe(testPath);
  });
});

describe('validatePath', () => {
  it('Debería retornar "true" si la ruta es válida', () => {
    expect(utilFunctions.validatePath(testPath)).toBe(true);
    // expect(validatePath('ffhg')).toBe(false);
  });
});

describe('pathIsFile', () => {
  it('Debería retornar "true" si la ruta corresponde a un archivo', () => {
    expect(utilFunctions.pathIsFile('./src/utils.js')).toBe(true);
  });
});

describe('getExtension', () => {
  it('Debería retornar ".js"', () => {
    expect(utilFunctions.getExtension('./src/utils.js')).toBe(false);
  });
});

describe('getMdFiles', () => {
  it('Debería retornar un array con los archivos markdown', () => {
    expect(utilFunctions.getMdFiles('./test/folder/anotherFolder/')).toEqual([mdPath, mdGoogle]);
  });
});

describe('getLinks', () => {
  it('Debería retornar un array con los links encontrados', () => {
    expect(utilFunctions.getLinks(mdPath)).toEqual([
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
    ]);
    // expect(utilFunctions.getLinks('./folder/empty.md', { validate: true })).toEqual([]);
  });
});

const mock = new MockAdapter(axios);
mock.onGet('https://www.google.com/').reply(200);

describe('httpRequest', () => {
  it('Debería retornar un array con los links encontrados y el status', (done) => utilFunctions.httpRequest('https://www.google.com/').then((res) => {
    expect(res.status).toBe(200);
    done();
  }));
});

describe('getStatus', () => {
  it('Debería retornar un array con los links encontrados y el status', (done) => utilFunctions.getStatus(mdGoogle).then((res) => {
    expect(res[0].status).toBe(200);
    done();
  }));
});
