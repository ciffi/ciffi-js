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
#### new page html and js
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
4. run serve or dev task and start to write code
5. run build task and you are ready to deploy

## DEV CONFIGURATION

dev task opens your default browser on url set in relative config file, open dev_config.js and change variable "_indexUrl"

## JS PROJECT ENV CONFIGURATION

* add a tag with class "js-router--my-page" in each page

```html
<div class="js-router--my-page"></div>
```

in scripts/config/config.js you can configure your env variables that router component returns to each .getConfig method from page-class component

* generic page module when pushState is set to false
* .getConfig method returns app config from scripts/config/config.js relative to your current env detected by router component based on baseUrl attribute
```javascript
var Page = (function (PageClass) {
	
	function Page() {
		
		this.config = PageClass.getConfig();
		
	}
	
	return Page;
	
});

module.exports = Page;
```

- - -

## SPA Framework - pushState(true)

* add cd-view custom tag in your page
```html
<cd-view></cd-view>
```
* generic page module when pushState is set to true
* this.content is the data model for the twig view rendered by router 
* Page.prototype.load is called by router after that template was be rendered
```javascript
var Page = (function (PageClass) {
	
	function Page() {
		
		this.config = PageClass.getConfig();
		this.content = {
			title: 'title',
			items: {
				name: 'test',
				sizes: [1,2,3]
			}
		};
		
	}
	
	Page.prototype.load = function () {
		console.log('myPage loaded');
	};
	
	return Page;
	
});

module.exports = Page;
```