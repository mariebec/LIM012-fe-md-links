const path = require('path');
// const moxios = require('moxios');

const utilFunctions = require('../src/index');

const testPath = path.resolve('./src/');
const mdPath = path.resolve('./folder/anotherFolder/README.md');

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
    expect(utilFunctions.pathIsFile('./src/index.js')).toBe(true);
  });
});

describe('getExtension', () => {
  it('Debería retornar ".js"', () => {
    expect(utilFunctions.getExtension('./src/index.js')).toBe(false);
  });
});

// describe('httpRequest', () => {
//   it('Debería retornar el status del link', (done) => {
//     moxios.utilFunctions.httpRequest(testPath, {
//       status: 200,
//       responseText: 'holi',
//     });
//     let onFulfilled = sinon.spy();
//     axios.get
//   });
// });

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
        href: 'https://jestjs.io/es-ES/',
        text: 'Jest',
        file: mdPath,
      },
    ]);
    // expect(utilFunctions.getLinks('./folder/empty.md', { validate: true })).toEqual([]);
  });
});

describe('getStatus', () => {
  it('Debería retornar un array con los links encontrados y el status', (/* done */) => Promise.all(utilFunctions.getStatus(mdPath)).then((res) => {
    expect(res).toEqual([
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
        href: 'https://firebasestorage.googleapis.com/v0/b/voz-amiga.appspot.com/o/imagePhotoProfile%2F5HL0M8YKp8VQbJ7ot8yzdiIbk9m2%2FIMG_20190707_150320%20(2).jpg?alt=media&token=292d01f8-39fe-498f-8d4e-79d43879a742',
        text: 'Link sin acceso por seguridad',
        file: mdPath,
        status: 403,
        statusText: 'Forbidden',
      },
      {
        href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
        text: 'Error',
        file: mdPath,
        status: 'ECONNREFUSED',
        statusText: 'FAIL',
      },
    ]);
    // done();
  }));
});

describe('getMdFiles', () => {
  it('Debería retornar un array con los archivos markdown', () => {
    expect(utilFunctions.getMdFiles('./folder/anotherFolder/')).toEqual([mdPath]);
  });
});
