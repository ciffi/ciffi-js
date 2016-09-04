### v0.0.17 (2016-09-04)

#### Fixed task - setup
* Fixed creation of .gitignore and .eslintrc files during setup task

### v0.0.16 (2016-09-04)

#### Refactoring base project structure
* Moved utils/_vars.scss to config/_config.scss

#### Added Customselect javascript module
* tag: <select class="js-customselect"><option>...</option></select>
* trigger class: "js-customselect"
* configuration: data-class="my-css-class" add "my-css-class" to new HTML wrapper tag
* configuration: data-arrow="boolean(true/false)" show/hide default arrow icon

#### Added ESLint
* All syntax errors javascript are on developer tools console

#### Removed Storeslocator module
* Storeslocator will become a javascript module


### v0.0.15 (2016-09-03)

#### Added Changelog file

#### Fixed task - setup
* Fixed replace assets url name when create new projectFixed bug that prevented the raplace of the assets path in static/scripts/config/congif.js file