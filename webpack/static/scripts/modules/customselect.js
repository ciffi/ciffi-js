var $ = require('jquery');
var Customselect = (function () {

    'use strict';

    function canStart() {
        $('.js-customselect').each(function () {
            new Customselect(this);
        });
    }

    function Customselect(el) {
        this.el = $(el);
        this.init();
    }

    Customselect.prototype.init = function () {
        var _parentClass = this.el.attr('data-class') || '';
        var _showArrow = this.el.attr('data-arrow') || 'true';
        var _arrowBlock = (_showArrow === 'true') ? '<i class="fa fa-chevron-down" style="float:right;"></i>' : '';
        this.el.css({
            display: 'block',
            opacity: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
        }).parent().css('position', 'relative');
        this.el.wrap('<div class="form__customselect ' + _parentClass + '" style="position:relative;"></div>');
        this.el.before('<span class="form__customselect__text js-cutomselect--text"></span>' + _arrowBlock);
        this.el.siblings('.js-cutomselect--text').html(this.el.find('option:selected').text());
        this.el.on('change', function () {
            $(this).siblings('.js-cutomselect--text').html($(this).find('option:selected').text());
        });
    };

    canStart();

    return Customselect;

})();

module.exports = Customselect;