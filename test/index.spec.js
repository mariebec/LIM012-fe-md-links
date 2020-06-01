const path = require('path');

const {
  absolutePath, pathIsFile, pathIsDirectory, validatePath, /* isMarkdown, allLinks, mdLinksApi, */
} = require('../src/index');

const testPath = path.resolve('./src/');
// const mdPath = path.resolve('./README.md');

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
    expect(absolutePath('./src/')).toBe(testPath);
    expect(absolutePath(testPath)).toBe(testPath);
  });
});

describe('validatePath', () => {
  it('Debería retornar "true" si la ruta es válida', () => {
    expect(validatePath(testPath)).toBe(true);
    // expect(validatePath('ffhg')).toBe(false);
  });
});

describe('pathIsFile', () => {
  it('Debería retornar "true" si la ruta corresponde a un archivo', () => {
    expect(pathIsFile('./src/index.js')).toBe(true);
  });
});

describe('pathIsDirectory', () => {
  it('Debería retornar "true" si la ruta corresponde a un directorio', () => {
    expect(pathIsDirectory(testPath)).toBe(true);
  });
});

// describe('isMarkdown', () => {
//   it('Debería retornar "true" si el archivo es .md', () => {
//     expect(isMarkdown(mdPath)).toBe(true);
//   });
// });

// describe('allLinks', () => {
// eslint-disable-next-line max-len
//   it('Debería retornar un array con los links encontrados o un array vacío si no hay links', () => {
//     expect(allLinks(mdPath)).toEqual(testArray);
//     expect(allLinks(mdEmpty)).toEqual([]);
//   });
// });
