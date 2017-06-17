[npm-month]: https://img.shields.io/npm/dm/ciffi.svg
[npm-total]: https://img.shields.io/npm/dt/ciffi.svg
[npm-version]: https://img.shields.io/npm/v/ciffi.svg
[npm-url]: https://www.npmjs.com/package/ciffi

[![npm-version][npm-version]][npm-url]
[![npm-month][npm-month]][npm-url]
[![npm-total][npm-total]][npm-url]
[![Build Status](https://travis-ci.org/ciffi/ciffi-js.svg?branch=master)](https://travis-ci.org/ciffi/ciffi-js)
[![Join the chat at https://gitter.im/ciffi-js/Lobby](https://badges.gitter.im/ciffi-js/Lobby.svg)](https://gitter.im/ciffi-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Ciffi Frontend Generator #

#### install ciffi
```
npm install -g ciffi
```
#### setup new project
```
ciffi setup [projectname]
```
#### local dev server (is not available for webpack2 installation)
```
ciffi serve
```
#### local dev build
```
ciffi dev
```
#### generate build
```
ciffi build
```
#### e2e test with nightwatch and cucumber (use default if configuration is not defined)
```
ciffi e2e [configuration]
```
#### new js page
```
ciffi newpage [pagename]
```
#### new js component
```
ciffi newcomponent [componentname]
```
#### new js module
```
ciffi newmodule [modulename]
```
#### generate javascript documentation
- with jsdoc

```
ciffi jsdoc
```

#### generate css documentation
- with sassdoc

```
ciffi cssdoc
```

#### generate styleguides
- with kss

```
ciffi styleguide
```

#### copy assets
- defined in .ciffisettings file

```
ciffi assets
```

- - -

## CLI COMPLETION

- add this snippet to your .bash_profile
 
```
# ciffi completion
if [ -f /usr/local/lib/node_modules/ciffi/ciffi.bash ]; then
  . /usr/local/lib/node_modules/ciffi/ciffi.bash
fi
```

- - -

## WORKFLOW

1. create folder (I usually use frontend in the root of project), then browse inside it and run setup task
2. project name is the name of your development host (if host is myapp.local your project name is myapp)
3. answer the setup process questions
4. finish project's configuration by edit the .ciffisetting file 
5. link main.css and main.js to your project
6. run dev task and start to write code
7. run build task and you are ready to deploy

- - -

__full documentation available at [ciffi.it/ciffi-js](https://www.ciffi.it/ciffi-js)__