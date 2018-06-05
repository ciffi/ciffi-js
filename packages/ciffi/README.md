[npm-version]: https://img.shields.io/npm/v/ciffi.svg
[npm-url]: https://www.npmjs.com/package/ciffi
[paypal]: https://img.shields.io/badge/-donate-blue.svg?logo=paypal

[![npm-version][npm-version]][npm-url]
[![Build Status](https://travis-ci.org/ciffi/ciffi-js.svg?branch=master)](https://travis-ci.org/ciffi/ciffi-js)
[![Build Status][paypal]](https://www.paypal.me/ciffidesign)

# Ciffi Frontend Generator #

Ciffi js is a frontend project generator with node based build system and javascript framework.

It includes webpack for javascript module, node-sass for build scss files with postCSS autoprefixer and cleancss, livereloadjs for fast development

_full documentation available at [ciffi.it/ciffi-js](https://www.ciffi.it/ciffi-js)_
- - - 

#### install ciffi
```
npm install -g ciffi
```
#### setup new project
```
ciffi setup [projectname]
```

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
4. define your config files in src/scripts/config/env/envName.js
5. finish project's configuration by edit the .ciffisettings file 
6. link main.css and main.js to your project
7. each new project contains all tasks for develop, test and build 

- - -

__full documentation available at [ciffi.it/ciffi-js](https://www.ciffi.it/ciffi-js)__