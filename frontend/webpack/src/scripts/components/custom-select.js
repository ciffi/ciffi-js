'use strict';

/**
 * Custom select js module
 * @module CustomSelect
 * @requires jquery
 */

var $ = require('jquery');

var CustomSelect = (function () {
	
	/**
	 * This initialize new CustomSelect for each $('.js-custom-select') element
	 * @memberof CustomSelect
	 * @inner
	 */
	function canStart() {
		$('.js-custom-select').each(function () {
			new CustomSelect(this);
		});
	}
	
	/**
	 * This initialize new CustomSelect
	 * @exports CustomSelect
	 * @class
	 * @param {jQuery} el - jQuery select $('.js-custom-select')
	 * @example
	 * <select class="js-custom-select">
	 *     <option value="0">0</option>
	 *     <option value="1">1</option>
	 *     ...
	 *     <option value="x">x</option>
	 * </select>
	 */
	function CustomSelect(el) {
		this.el = $(el);
		this.init();
	}
	
	/**
	 * This create new tag and append it to the DOM, then wrap original select into it
	 * @memberof CustomSelect
	 */
	CustomSelect.prototype.init = function () {
		var _parentClass = this.el.attr('data-class') || 'form__custom-select';
		var _showArrow = this.el.attr('data-arrow') || 'true';
		var _arrowBlock = (_showArrow === 'true') ? '<i class="fa fa-angle-down" style="float:right;"></i>' : '';
		this.el.css({
			display: 'block',
			opacity: 0,
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0
		});
		this.el.wrap('<div class="' + _parentClass + '" style="position:relative;"></div>');
		this.el.before('<span class="' + _parentClass + '__text js-custom-select--text"></span>' + _arrowBlock);
		this.el.siblings('.js-custom-select--text').html(this.el.find('option:selected').text());
		this.el.on('change', function () {
			$(this).siblings('.js-custom-select--text').html($(this).find('option:selected').text());
		});
	};
	
	canStart();
	
	return CustomSelect;
	
})();

module.exports = CustomSelect;