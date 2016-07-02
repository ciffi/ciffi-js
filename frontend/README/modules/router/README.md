# frontend - webpack module - Router #

##import##

```
#!javascript

var Router = require('./modules/router');

```

##configurazione##

```
#!javascript

var routerConfig = {
	routes: [{
		name: 'home',
		element: '.js-router--home'
	},{
		name: 'two',
		element: '.js-router--example',
		onLoad: function() {
			console.log('example page');
		}
	}],
	onLoadSuccess: function(data) {
		switch(data.currentRoute) {
			case 'home':
				require('./pages/home');
				break;
			case 'example':
				require('./pages/example');
				break;
			default:
				break;
		}
	}
};

```

##inizializzazione##

```
#!javascript

var appRouter = new Router(routerConfig);

```

##esempio##

```
#!javascript

/* import */
var appRouter = new Router(routerConfig);

/* config */
var routerConfig = {
	routes: [{
		name: 'home',
		element: '.js-router--home'
	},{
		name: 'two',
		element: '.js-router--example',
		onLoad: function() {
			console.log('example page');
		}
	}],
	onLoadSuccess: function(data) {
		switch(data.currentRoute) {
			case 'home':
				require('./pages/home');
				break;
			case 'example':
				require('./pages/example');
				break;
			default:
				break;
		}
	}
};

/* jQuery document ready */
$(document).ready(function() {

	/* init */
	var appRouter = new Router(routerConfig);

});

```

##config##

###routes###
array di oggetti

* name: (required) string - nome rotta
* element: (required) javascript query element - elemento jquery che identifica la rotta
* onLoad: (optional) function - callback identificazione singola rotta

```
#!javascript

routes: [{
	name: 'home',
	element: '.js-router--home',
	onLoad: function() {
		console.log('example page');
	}
}]

```

###onLoadSuccess###
callback caricamento rotta generica

* onLoadSuccess: (required) function - nella response è indicata la rotta appena caricata data.currentRoute
```
#!javascript

onLoadSuccess: function(data) {
	switch(data.currentRoute) {
		case 'home':
			require('./pages/home');
			break;
		case 'example':
			require('./pages/example');
			break;
		default:
			break;
	}
}

```