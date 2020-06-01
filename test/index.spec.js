const path = require('path');

const {
  absolutePath, pathIsFile, pathIsDirectory, validatePath,
} = require('../src/index');

const testPath = path.resolve('./src/');

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
  it('Debería retornar "false" si la ruta no corresponde a un archivo', () => {
    expect(pathIsFile('./src/index.js')).toBe(true);
  });
});

describe('pathIsDirectory', () => {
  it('Debería retornar "true" si la ruta corresponde a un directorio', () => {
    expect(pathIsDirectory(testPath)).toBe(true);
  });
});
