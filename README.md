# Markdown Links

## Descripción

md-links es una herramienta que lee y analiza archivos en formato `Markdown`, para verificar los links que contiene y realizar estadísticas.

## Cómo instalar

Para instalar la librería y el módulo

`npm install --global mariebec/LIM012-fe-md-links`

Para instalar el módulo en un proyecto

`npm install mariebec/LIM012-fe-md-links`

### Módulo

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con la propiedad:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Ejemplo de uso

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

La aplicación se ejecuta de esta manera:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md

./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md http://google.com/ Google
```

#### Options

##### `--help`

La opción `--help` mostrará todas las opciones disponibles y sus porisbles combinaciones, además de una breve guía de cómo usar la librería. 

##### `--validate`

La opción `--validate` realizará una petición HTTP para averiguar si el link funciona o no. 

Por ejemplo:

```sh13d99df067c1
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ Link a algo ok 200 
./some/example.md https://otra-cosa.net/algun-doc.html fail 404
```

##### `--stats`

La opción `--stats` obtendrá estadísticas básicas sobre los links.

```sh
$ md-links ./some/example.md --stats

Total: 3
Unique: 3
```

También se puede combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate

Total: 3
Unique: 3
Broken: 1
```
## Diagrama de flujo

### API

![Api Flowchart](/img/api-flowchart.jpg)

### CLI

![Api Flowchart](/img/cli-flowchart.jpg)

## Objetivos de aprendizaje

Objetivos pendientes del proyecto anterior

- [x] Métodos del array (map | reduce) 

### Javascript
- [ ] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node
- [x] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [x] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [x] Testeo de tus funciones
- [x] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [x] Mocks manuales
- [x] Testeo para multiples Sistemas Operativos

### Git y Github
- [x] Organización en Github

### Buenas prácticas de desarrollo
- [x] Modularización
- [x] Nomenclatura / Semántica
- [x] Linting
