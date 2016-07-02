var $ = require('jquery');
var Storelocator = (function() {

	'use strict';

	var clusterConfig = {
		gridSize: 100,
		zoomOnClick: true,
		styles: [{
			url: '//placehold.it/32x32',
			width: 32,
			height: 32,
			anchor: [0, 0],
			textColor: '#fff',
			textSize: 11
		}]
	};

	var infoWindowEnabled = function(store) {
		window.alert(JSON.stringify(store));
	};

	function Storelocator(config) {
		checkConfig(config,$.proxy(function(config) {
			this.init(config);
		},this));
	}

	function checkConfig(config,successCallback) {
		var errorMessage = false;
		if(config && typeof config === 'object') {

			if(!errorMessage) {
				successCallback(config);
			}
		}else {
			errorMessage = 'Storelocator - check config object';
			console.error(errorMessage);
		}
	}

	function appendGoogleLibs(apiKey) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&key='+apiKey+'&signed_in=false&language=it&callback=initializeMap';
		document.body.appendChild(script);
	}

	function getStores(stores,callback) {
		if(stores && typeof stores === 'string') {
			getStoresFromUrl(stores,function(res) {
				callback(res);
			});
		}else if(stores && typeof stores === 'object') {
			callback(stores);
		}else {
			
		}
	}

	function getStoresFromUrl(stores,callback) {
		$.ajax({
			method: 'GET',
			url: '//inter.local/'+stores,
			success: function(res) {
				callback(res);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	function setStores(map,stores) {
		//var Infobox = require('./storelocator/infobox');
		var markers = [];
		$.each(stores,function(index,store) {
			markers.push(addMarker(map,store));

			if(markers.length === stores.length) {
				var Cluster = require('./storelocator/cluster');
				var markerClusterer = new Cluster(map,markers,clusterConfig);
			}
		});
	}

	function addMarker(map,store) {
		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(store.latitude,store.longitude),
		  map: map,
		  icon: store.markerImage
		});

		setInteraction(store,marker);

		return marker;
	}

	function setInteraction(store,marker) {
		google.maps.event.addListener(marker, 'click', function() {
			infoWindowEnabled(store);
		});
	}

	function initMap(app) {

		try {
			if(google) {
				app.map = new google.maps.Map(document.getElementById(app.config.el),app.config.map);
				
				app.map.setOptions({styles: app.config.mapStyles});
				
				google.maps.event.addDomListener(window,'resize',$.proxy(function() {
				  var center = app.map.getCenter();
				  google.maps.event.trigger(app.map, 'resize');
				  app.map.setCenter(center);
				},app));
				
				var loadListener = google.maps.event.addListenerOnce(app.map, 'idle', $.proxy(function(){
				  google.maps.event.trigger(app.map, 'resize');
				  google.maps.event.removeListener(loadListener);
				},app));

				getStores(app.config.stores,$.proxy(function(stores) {
					setStores(app.map,stores);
				},app));
			}
		}catch(err) {
			setTimeout(function() {
				initMap(app);
			},10);
		}
	}

	Storelocator.prototype.init = function(config) {
		this.config = config;

		this.config.triggerEl.append('<div id="'+this.config.el+'" style="width:100%;height:100%;position:absolute;top:0;left:0;" />');
		
		if(!$('body').hasClass('hasMaps')) {
			appendGoogleLibs(this.config.apiKey);
			window.initializeMap = $.proxy(function() {

				$.extend(true,this,initMap(this));
				window.initializeMap = false;

			},this);
			$('body').addClass('hasMaps');
		}else {
			$.extend(true,this,initMap(this));
		}
	};

	return Storelocator;

})();

module.exports = Storelocator;