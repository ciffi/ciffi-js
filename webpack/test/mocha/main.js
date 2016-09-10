'use strict';

var $ = require('jquery');
window.jQuery = $;

require('../../static/styles/main.scss');

require('../../static/scripts/router/router');

var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-jquery'));

describe('When my site is loaded', function () {
	
	it('should have body with app-is-ready className', function () {
		
		var body = $('body');
		
		expect(body).to.have.class('app-is-ready');
		
	});
	
	it('should have body with background transparent', function () {
		
		var body = $('body');
		
		expect(body).to.have.css('background-color', 'rgba(0, 0, 0, 0)');
		
	});
	
});