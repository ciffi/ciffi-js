import Page from './allpages';
module.exports = (function () {
	
	return class @REPLACE__PAGENAME@Page extends Page {
		
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