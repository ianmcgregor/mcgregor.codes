# mcgregor.codes

<https://mcgregor.codes>

McGregor Codes Ltd portfolio website.

## Set up

From a terminal or command prompt at the project root run:

```shell
$ npm install
```

## Structure

* `/dist`  Minified assets
* `/src`   Unminified source files
* `/tasks` Individual Gulp tasks
* `/test`  Unit Test specifications

### JavaScript

The JS is written in ES6 and uses [React](https://facebook.github.io/react/) for rendering. [Babel](https://babeljs.io/) transforms the ES6 code to cross-browser compatible ES5 in the minified bundle. [Lodash](https://lodash.com/) is used for data transformations.

### CSS

The default CSS structure and build is based on [SUIT CSS](https://github.com/suitcss/) conventions. [Normalize](http://necolas.github.io/normalize.css/) and [SUIT base](https://github.com/suitcss/base/) are included as a basis for the project CSS. [PostCSS](https://github.com/postcss/postcss) is used to post-process the CSS, handling support for vars and vendor prefixes.

### Building

Gulp is used to run the build tasks for the project.

Starts the build, connect and watch tasks:

```shell
$ gulp
```

Builds CSS and minified JS bundle, uglified and cleaned of debug logs and sourcemaps:

```shell
$ gulp build --min
```

### Linting

[ESLint](https://github.com/eslint/eslint), [JSCS](http://jscs.info/) and [CSSLint](https://github.com/CSSLint) are setup to lint the working files.

```shell
$ gulp lint
```

A detailed report highlighting any problems will be output to the console.

### Testing

A testing set up is included, utilising the [Karma](https://github.com/karma-runner/karma) test runner, [Mocha](http://visionmedia.github.io/mocha/) framework and [Chai](http://chaijs.com/) assertion library.

```shell
$ npm install -g karma-cli
$ karma start
```
A report highlighting any failed test will be output to the console. Karma will keep running until the task is terminated and will rerun the tests when files are saved.
