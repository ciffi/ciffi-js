### v1.0.0 (2018-06-05)

#### Refactoring
- Added Lerna
- Rewritten with latest javascript features
- Splitted codes in core and task

### v0.33.0 (2018-03-03)

#### Added prettier
- added prettier 

### v0.32.0 (2018-02-24)

#### New default babel presets
- fix webpack build

### v0.31.0 (2018-02-11)

#### New babel preset for react
- minor fixes

### v0.30.0 (2018-01-03)

#### Improved setup task
- minor fixes

### v0.29.0 (2017-12-29)

#### Integrated React
- now you can choose if want add React as project's dependency
- minor fixes

### v0.28.0 (2017-12-07)

#### Update ciffi js webpack base project dependencies
- auto update dependencies during new project setup
- some fixes

### v0.26.1 (2017-11-18)

#### Update ciffi js webpack base project dependencies

### v0.26.1 (2017-11-18)

#### Update ciffi js webpack base project dependencies

### v0.26.0 (2017-11-18)

#### Improved webpack project config
- fix dependencies ignore
- removed fastclick

#### Improved build task
- improved assets copy on project build

### v0.25.0 (2017-11-08)

#### New config task
- generate javascript config with `ciffi config[:env]` 

### v0.24.3 (2017-11-08)

#### Check new version on project setup
- check and update `ciffi` before project setup process

### v0.24.2 (2017-09-17)

#### Minor fix
- fixed default build env

### v0.24.1 (2017-09-17)

#### Minor fix
- new page/module/component fix

### v0.24.0 (2017-09-10)

#### Minor fix
- new version -- release ready

### v0.23.8 (2017-09-10)

#### Updated dependencies
- new "publicPath" in .ciffisettings

### v0.23.6 (2017-08-22)

#### Add custom configuration for autoprefixer
- edit .ciffisettings file

### v0.23.4 (2017-08-21)

#### Improved backward compatibility
- new `ciffi dev-old` task for backward compatibility
- new bash auto completion

### v0.23.0 (2017-08-16)

#### Fix build task and improved readme
- fix creation of config during build task
- updated readme

### v0.22.0 (2017-08-16)

#### Improved setup and backward compatibility
- choose router from project's features before install dependencies
- new `ciffi build-old` task for backward compatibility
- updated bash commands

### v0.21.0 (2017-08-14)

#### Some improvements
- improved log for config on build
- new `ciffi styles` task
- updated bash commands

### v0.20.0 (2017-08-7)

#### Custom output filename
- edit .ciffisettings files to customize your project

### v0.19.0 (2017-08-7)

#### Multi environment
- new `ciffi build[:env]` task

### v0.18.0 (2017-08-6)

#### Multi setup support
- choose project's features before install dependencies

### v0.15.8 (2017-06-18)

#### Fixed assets task
- fixed assets tasks for old projects

### v0.15.7 (2017-06-17)

#### Fixed assets task
- fixed assets tasks for old projects

### v0.15.5 (2017-06-17)

#### New assets task
- improved development workflow with ciffi assets task

### v0.15.4 (2017-06-02)

#### Removed yarn for setup project dependencies
- use npm@~5.0.0 or npm@latest

### v0.15.2 (2017-05-25)

#### Improved new component and newmodule tasks
- now create folder if does not exits

### v0.15.1 (2017-05-16)

#### Fixed dev task

### v0.15.0 (2017-05-16)

#### Fixed build task
- fixed clean-css task

### v0.14.2 (2017-05-13)

#### Updated base projects dependencies
- now includes ciffi base projects v0.3.0

### v0.14.1 (2017-05-13)

#### Fixed documentations tasks
- fixed source path

### v0.14.0 (2017-05-07)

#### Improved setup and core
- base resources are now npm packages
- removed base projects and core folder from ciffi

### v0.13.0 (2017-05-07)

#### Improved base projects
- updated [ciffi-js-router](https://www.npmjs.com/package/ciffi-js-router) dependencies to 0.2.0
- rewritten pages.js for easy trigger/module definition

### v0.12.0 (2017-05-06)

#### New ciffi-js-router component
- added [ciffi-js-router](https://www.npmjs.com/package/ciffi-js-router) as default dependencies
- removed router folder from project

#### New source folder
- now source files are located in src/ folder - __do not rename it__

### v0.11.1 (2017-05-06)

#### Improved setup process
- fixed setup if yarn is not installed
- fixed setup for node 6.x and 7.x

### v0.11.0 (2017-05-03)

#### Improved Router and pages
- added .onLoad method also to the allpages module that returns the current page
- page has config object in their constructor
- renamed .load in .onLoad method callable in the constructor with this.onLoad = myOnLoadFunctions;
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.10.5 (2017-05-01)

#### Removed views from dist folder
- twig views are included in mains.js files

### v0.10.4 (2017-05-01)

#### Removed dependencies for dev task
- now parallels tasks are controlled from ciffi's core
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.10.3 (2017-05-01)

#### Improved spa framework
- now you can specify one page module for multiple routes
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.10.2 (2017-04-30)

#### Improved spa framework and twig loader
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.10.1 (2017-04-30)

#### Some minor fixes
- defined default c-view style in _layout.scss
- removed _router.scss
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.10.0 (2017-04-29)

#### Changed twig container custom tag
- use c-view instead cd-view
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.9.10 (2017-04-28)

#### Improved router and pages
- improved pages constructor
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.9.9 (2017-04-22)

#### Rewritten router
- added new page-class modules in router component
- improved new page task that now supports nested path
- removed creation of html file when run newpage task
- rewritten pages modules
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.9.8 (2017-04-21)

#### Fixed setup process
- removed log during setup process

### v0.9.6 (2017-04-21)

#### Fixed setup process
- fixed error that block setup when project name is not specified

### v0.9.5 (2017-04-21)

#### Fixed setup process for custom node installations

### v0.9.4 (2017-04-20)

#### Improved pushState support with Twig
- added Twig as template engine for html views in pushState mode on (spa framework)

### v0.9.3 (2017-04-19)

#### Fixed setup process
- fixed error that block setup when project name is specified

### v0.9.2 (2017-04-14)

#### Fixed backward compatibility
- fixed new page component and module and serve task for old projects

### v0.9.1 (2017-04-09)

#### Improved functionality
- rewritten package.json, now contains only test task
- rewritten tasks execution and relative logs
- added questions for new modules, components or javascript pages
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.9.0 (2017-04-08)

#### Awesome refactor
- reintegrated webpack first version, now you can choose between webpack and webpack2
- reintegrated ciffi serve task for webpack version
- new setup process with new cli questions
- new log system 
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)

### v0.8.0 (2017-04-07)

#### New setup
- new silent setup process with funny emoji loading
- updated [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)  

### v0.7.0 (2017-04-06)

#### Switch to [webpack2](https://webpack.js.org/) 
- added .npmignore file
- added .eslintrc for ciffi-js main package development check
- updated development dependencies
- updated unused development dependencies
- updated dev.config.js settings
- updated esLint settings
- updated scripts/modules/example.js for tree shaking support
- updated newmodule and newcomponent task result for tree shaking support
- update [README.md](https://github.com/ciffi/ciffi-js/blob/master/README.md)
- fixed [fontawesome](http://fontawesome.io/icons/) fonts
- temporary disabled serve task
- temporary disabled unit task
- temporary disabled dev-unit task
- temporary disabled build-prod task
- removed styles.js used in serve task
- removed 'use-strict' in all js files - is unnecessary in module pattern

### v0.6.2 (2017-04-04)

#### Improved assets task 
- now support nested path

### v0.6.1 (2017-04-03)

#### Fixed device and grid variables 
- added $grid-max-width variable in _config.scss
- fixed js error in device.js

### v0.6.0 (2017-04-03)

#### Added new features and update dependencies 
- added default [reset css](https://www.npmjs.com/package/reset-css)
- added grid.scss in styles/utils
- added safari detection to device component
- improved custom-select component
- updated [fontawesome](http://fontawesome.io/icons/) to version 4.7
- fix meta in default html files

### v0.5.2 (2017-03-18)

#### Fixed setup js module creation tasks 
- now project, page, component and modules names are required

#### Disabled update task 
- update task is disabled for work in progress

### v0.5.1 (2017-03-05)

#### Fixed setup and update tasks 
- if build path finished with slash

### v0.5.0 (2017-03-05)

#### Added fastclick by default 
- fastclick required in main.js

#### Reorganized main.js require order  
- moved router at last loaded module position after fastclick and device component

### v0.4.6 (2017-02-07)

#### Fixed newpage, newmodule and newcomponent tasks
- there was an error if source path is different from "static"

### v0.4.5 (2017-02-05)

#### New dev config and env config.js
- after setup check dev_config.js to configure yours local dev url and scripts/config/config.js to configure yours env

### v0.4.4 (2017-02-04)

#### New dev config
- after setup check dev_config.js to configure yours local dev url

#### Added ESLint validation to dev task
- ESLint validation error in your console

#### Improved readme
- setup and config

### v0.4.3 (2017-02-01)

#### New default config.js
- check scripts/config/config.js after setup and configure yours env

### v0.4.2 (2017-01-29)

#### Fixed pushState router
- pushState native sub-folder support

### v0.4.1 (2017-01-28)

#### We Are On Line!!
- git repo is now public :)

### v0.4.0 (2017-01-28)

#### Fixed assets path
- fixed assets during setup

### v0.3.26 (2017-01-26)

#### Fixed package.json task
- fixed setup task with yarn default

### v0.3.25 (2017-01-26)

#### Minor fix and reinsert Yarn
- fixed rename of new js module/component/page
- try to install dependencies with yarn

### v0.3.24 (2017-01-10)

#### Fixed update
- fix cli log
- fix tasks timing

### v0.3.23 (2017-01-09)

#### Fixed update
- fix double slash for package.json

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