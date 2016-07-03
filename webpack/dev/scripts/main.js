/* CONFIG */

var DefaulConfig = require('./config/config');
var Config = require('./modules/config');
var CONFIG = new Config(JSON.parse(DefaulConfig).envs);

/* CONFIG */

// importo libreria npm jquery
var $ = require('jquery');

// importo moduli .js
var Device = require('./modules/device');
var Cookies = require('./modules/cookies');
var Router = require('./modules/router');
var Utils = require('./modules/utils');

$('body').addClass('appIsReady');

$(document).ready(function() {

	/* ROUTER */

	var routerConfig = {
		routes: [{
			name: 'home',
			element: '.js-router--home'
		},{
			name: 'example',
			element: '.js-router--example',
			onLoad: function() {
				console.log('example');
			}
		}],
		onLoadSuccess: function(data) {
			switch(data.currentRoute) {
				case 'home':
					require('./pages/home').setData({
						config: CONFIG.config
					});
					break;
				case 'example':
					require('./pages/example').setData({
						config: CONFIG.config
					});
					break;
				default:
					break;
			}
		}
	};

	var appRouter = new Router(routerConfig);

	/* ROUTER */

	/* COOKIES */
	/*
	var cookiesPrivacy = new Cookies({
		name: 'cookie__privacy',
		value: {
			userName: 'ciffi'
		}
	});

	cookiesPrivacy.write();
	var _privacy = cookiesPrivacy.read();
	console.log(_privacy);
	cookiesPrivacy.remove();
	*/
	/* COOKIES */

	/* UTILS */

	var utils = new Utils();

	utils.preloadImages([
		'http://ec2-54-229-173-102.eu-west-1.compute.amazonaws.com/assets/images/land/route-1.png',
		'http://ec2-54-229-173-102.eu-west-1.compute.amazonaws.com/assets/images/land/route-2.png',
		'http://ec2-54-229-173-102.eu-west-1.compute.amazonaws.com/assets/images/land/route-3.png'
	],function() {
	},function(res) {
		console.log(res);
	});

	utils.resizeEnd(function(res) {
		console.log('resize end',res);
	});

	utils.scrollEnd(function(res) {
		console.log('scroll end',res);
	});

	/* UTILS */

});