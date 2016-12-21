[npm-month]: https://img.shields.io/npm/dm/ciffi.svg
[npm-total]: https://img.shields.io/npm/dt/ciffi.svg
[npm-version]: https://img.shields.io/npm/v/ciffi.svg
[npm-url]: https://www.npmjs.com/package/ciffi

[![npm-version][npm-version]][npm-url]
[![npm-month][npm-month]][npm-url]
[![npm-total][npm-total]][npm-url]

# Ciffi Frontend Generator #

#### install ciffi
```
npm install -g ciffi
```
#### setup new project
```
ciffi setup projectname
```
#### local dev server
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
#### start local unit test development with karma and cucumber
```
ciffi unit
```
#### e2e test with nightwatch and cucumber (default configuration)
```
ciffi e2e
```
#### e2e test with nightwatch and cucumber (custom configuration)
```
ciffi e2e chrome //default, chrome or firefox
```
#### new page html and js
```
ciffi newpage pagename
```
#### new js component
```
ciffi newcomponent componentname
```
#### new js module
```
ciffi newmodule modulename
```
#### generate javascript documentation
- with jsdoc into ./jsdoc path
- ./jsdoc/index.html
```
ciffi jsdoc
```
#### generate css documentation
- with sassdoc into ./cssdoc path
- ./cssdoc/index.html
```
ciffi cssdoc
```
#### generate styleguides
- with kss into ./styleguides path
- it need build or dev task before
- ./styleguides/index.html
```
ciffi styleguide
```
