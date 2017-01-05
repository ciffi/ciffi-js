### v0.3.22 (2017-01-05)

#### Fixed update
- prevent loss package.json

### v0.3.21 (2017-01-05)

#### Fixed styleguide generated assets references
- solved assets name replace bug

### v0.3.20 (2016-12-29)

#### Fixed e2e firefox task
- now use geckodriver for selenium with marionette

### v0.3.19 (2016-12-29)

#### Fixed update task
- fixed update global ciffi

### v0.3.18 (2016-12-29)

#### Added update task for upgrade ciffi core
- new task ciffi update is now available

### v0.3.17 (2016-12-29)

#### Fixed e2e with env task
- fixed task ciffi e2e chrome
- fixed task ciffi e2e firefox

### v0.3.16 (2016-12-28)

#### Added cli completion
- cli completion for ciffi commands

#### Improved readme
- cli completion
- workflow

### v0.3.15 (2016-12-27)

#### Fixed docs re-generation path
- fix rm command

### v0.3.14 (2016-12-23)

#### Fixed docs generation path
- now the docs will be generated in build folder

### v0.3.13 (2016-12-23)

#### Fixed newcomponent task
- fix module name definition

### v0.3.12 (2016-12-21)

#### Fixed newpage task
- missing "module.export" in new page file

#### Added newcomponent task
- new task newcomponent available

### v0.3.11 (2016-11-30)

#### Added new tasks
- dev-unit
- build-prod

### v0.3.10 (2016-11-19)

#### Fixed styleguide task

### v0.3.9 (2016-11-19)

#### Removed yarn from setup

### v0.3.8 (2016-11-18)

#### Fixed styleguide task

### v0.3.7 (2016-11-17)

#### Fixed serve task first run eslint check

### v0.3.6 (2016-11-17)

#### Fixed app setup and serve task

### v0.3.5 (2016-11-17)

#### Added yarn for fast depndencies downloading

### v0.3.4 (2016-10-29)

#### Fixed setup path

### v0.3.3 (2016-10-29)

#### Some fix
- fix ruter
- fix app setup
- fix assets' path name

### v0.3.2 (2016-10-24)

#### Improved pushState router
- now can use subfolders for the sub routes 

#### Modified livereload scripts
- now livereload script is loaded by router

### v0.3.1 (2016-10-17)

#### Fixed livereload

### v0.3.0 (2016-10-17)

#### Added new task for documentation and style guides generation
- new task "ciffi cssdoc"
- new task "ciffi styleguides"
- fix setup task

### v0.2.4 (2016-10-16)

#### Auto load livereload script
- Livereload script tag is now append to body when you run "ciffi dev" task 

### v0.2.3 (2016-10-16)

#### Fixed serve task

### v0.2.2 (2016-10-16)

#### Added documentation for some default components
- cookies
- customselect
- device
- utils

### v0.2.1 (2016-10-15)

#### Added javascript documentations generator with jsdoc
- generate javascript documentation with jsdoc located in ./jsdoc/index.html
- new task "ciffi jsdoc"

### v0.2.0 (2016-10-15)

#### Ready for new version 0.2.0
- fix changelog
- fix console.log
- new readme
- fix commands list
- new task "ciffi e2e chrome" //default, chrome or firefox

### v0.1.2 (2016-10-15)

#### Improved test suite
- with e2e, nightwatchjs and cucumber
- new task "ciffi e2e"

#### Improved router with pushState support
- it must be defined when you you require router with
```
require('./router/router').pushState(boolean) //true/false
```

#### Improved router with pushState support
- /modules modified into /componets for default js modules
- /modules path is now for user custom js modules

### v0.1.1 (2016-09-11)
Ok, now it should be quite stable :D


### v0.1.0 (2016-09-11)
I think now is quite stable

#### Removed mocha and chai from test suite and relative tasks
- I prefer to use karma and cucumber for unit test

#### Added new command unit for testing
- Unit test with karma, cucumber and gherkin syntax for features files
- Refactoring test/ path

#### Removed dev test tasks
- It had some problems with live url


### v0.0.20 (2016-09-10)

#### Fixed commands - serve / test
- Fixed core modules


### v0.0.19 (2016-09-10)

#### Added Test Suite (moka - chai - cucumber)

New available commands

- test local dev server with moka and chai
```
ciffi moka
```
- test build with cucumber
```
ciffi test
```
- test local dev serer with cucumber
```
ciffi dev-test
```

### v0.0.18 (2016-09-04)

#### Fixed task - setup
- Fixed creation of .gitignore and .eslintrc files during setup task


### v0.0.17 (2016-09-04)

#### Fixed task - setup
- Fixed creation of .gitignore and .eslintrc files during setup task


### v0.0.16 (2016-09-04)

#### Refactoring base project structure
- Moved utils/_vars.scss to config/_config.scss

#### Added Customselect javascript module
- tag: <select class="js-customselect"><option>...</option></select>
- trigger class: "js-customselect"
- configuration: data-class="my-css-class" add "my-css-class" to new HTML wrapper tag
- configuration: data-arrow="boolean(true/false)" show/hide default arrow icon

#### Added ESLint
- All syntax errors javascript are on developer tools console

#### Removed Storeslocator module
- Storeslocator will become a javascript module


### v0.0.15 (2016-09-03)

#### Added Changelog file

#### Fixed task - setup
- Fixed replace assets url name when create new projectFixed bug that prevented the raplace of the assets path in static/scripts/config/congif.js file