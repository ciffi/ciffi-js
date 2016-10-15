### v0.2.0 (2016-10-15)

#### ready for new version 0.2.0
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