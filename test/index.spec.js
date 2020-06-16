const path = require('path');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const utilFunctions = require('../src/utils');

const testPath = path.resolve('./src/');
const mdPath = path.resolve('./test/folder/anotherFolder/README.md');

// describe('mdLinksApi', () => {
// eslint-disable-next-line max-len
//   it('Debería retornar una promesa con un array en resolve', (done) => mdLinksApi(mdPath, { validate: true })
//     .then(() => {
//       expect(mdPath).toEqual(validArray);
//       done();
//     }));
// });

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
    expect(utilFunctions.getMdFiles('./test/folder/anotherFolder/')).toEqual([mdPath]);
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

describe('httpRequest', () => {
  const mock = new MockAdapter(axios);
  const data = { status: 200, statusText: 'OK' };
  mock.onGet('link').reply(200, data);
  it('Debería retornar un array con los links encontrados y el status', (done) => utilFunctions.httpRequest('link').then((res) => {
    expect(res.data.statusText).toBe('OK');
    done();
  }));
});
