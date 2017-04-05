var Example = (function () {
	
	function Example() {
		this.init();
	}
	
	Example.prototype.init = function () {
		
		console.log('new Example initialiazed');
		
	};
	
	Example.prototype.ciao = function () {
		
		console.log('ciao');
		
	};
	
	Example.prototype.yeah = function () {
		
		console.log('yeah');
		
	};
	
	return Example;
	
})();

export default Example;

export function ciao() {
	console.log('ciao imported');
}

export function yeah() {
	console.log('yeah imported');
}