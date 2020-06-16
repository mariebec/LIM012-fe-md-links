/* eslint-disable max-len */
const path = require('path');
const mockAxios = require('axios');
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

// Jest mock

describe('getStatus', () => {
  it('Debería retornar un array con los links encontrados y el status OK', (done) => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, statusText: 'OK' }));

    utilFunctions.getStatus(mdGoogle).then((res) => {
      expect(res).toEqual([
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: mdGoogle,
          status: 200,
          statusText: 'OK',
        },
      ]);
      done();
    });
  });

  it('Debería retornar un array con los links encontrados y el status Not Found', (done) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404, statusText: 'Not Found' } }));

    utilFunctions.getStatus(mdGoogle).then((res) => {
      expect(res).toEqual([
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: mdGoogle,
          status: 404,
          statusText: 'Not Found',
        },
      ]);
      done();
    });
  });

  it('Debería retornar un array con los links encontrados y el Error', (done) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.get.mockImplementationOnce(() => Promise.reject({ code: 'Error' }));

    utilFunctions.getStatus(mdGoogle).then((err) => {
      expect(err).toEqual([
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: mdGoogle,
          status: 'Error',
          statusText: 'FAIL',
        },
      ]);
      done();
    });
  });
});
