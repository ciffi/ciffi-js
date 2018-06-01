import Page from './allpages';
module.exports = (function () {
	
	return class IndexPage extends Page {
		
		constructor(data) {
			super(data);
			
			this.content = {
				prova: ['a', 'b']
			};
		}
		
		onLoad() {
			console.log(this.data.page.route);
		}
	};
	
})();