const {
  convertToAbsolute, /* validatePath, isFile, isDirectory, */
} = require('../src/index');

describe('convertToAbsolute', () => {
  it('Debería retornar una ruta absoluta', () => {
    expect(convertToAbsolute('./src/')).toBe('/home/dell/Documentos/bootcamp-Lab/LIM012-fe-md-links/src');
    expect(convertToAbsolute('/home/dell/Documentos/bootcamp-Lab/LIM012-fe-md-links/src')).toBe('/home/dell/Documentos/bootcamp-Lab/LIM012-fe-md-links/src');
  });
});

/* describe('validatePath', () => {
  it('Debería retornar "true" si la ruta es válida', () => {
    expect(validatePath('../src/')).toBe(true);
  });
});

describe('isFile', () => {
  it('Debería retornar "true" si la ruta corresponde a un archivo', () => {
    expect(isFile('../src/')).toBe(true);
  });
});

describe('isDirectory', () => {
  it('Debería retornar "true" si la ruta corresponde a un directorio', () => {
    expect(isDirectory('../src/')).toBe(true);
  });
});
 */
