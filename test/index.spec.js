const {
  absolutePath, pathIsFile, pathIsDirectory, validatePath,
} = require('../src/index');

describe('absolutePath', () => {
  it('Debería retornar una ruta absoluta', () => {
    // Depende de la computadora donde se ejecute el test
    const path = '/home/dell/Documentos/bootcamp-Lab/LIM012-fe-md-links/src';
    expect(absolutePath('./src/')).toBe(path);
    expect(absolutePath(path)).toBe(path);
  });
});

describe('validatePath', () => {
  it('Debería retornar "true" si la ruta es válida', () => {
    expect(validatePath('./src/')).toBe(true);
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
    expect(pathIsDirectory('./src/')).toBe(true);
  });
});
