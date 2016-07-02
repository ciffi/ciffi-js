var $ = require('jquery');
var Form = (function() {

	'use strict';

	function Form(config) {
		this.config = config;
		this.init();
	}

	function validateRequired(input) {
		var value = input.prop('value');
		var type = input.prop('type');
		if(type === 'checkbox') {
			if(input.is(':checked')) {
				return true;
			}else {
				input.siblings('.js-formError').html('').parents('.form__input').addClass('has-error');
				return false;
			}
		}else {
			if(!value || value === '') {
				input.siblings('.js-formError').html('').parents('.form__input').addClass('has-error');
				return false;
			}else {
				return true;
			}
		}
	}

	function validateEmail(input) {
		var value = $(input).prop('value');
		
		if(!value || value === '') {
			input.siblings('.js-formError').html('This field must not be left blank').parents('.form__input').addClass('has-error');
			return false;
		}

	    var _reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    if(!_reg.test(value)) {
	    	input.siblings('.js-formError').html('This field is not in the correct format').parents('.form__input').addClass('has-error');
	    }
	    return _reg.test(value);
	}

	function wathcPhoneChange(input) {
		var value = $(input).prop('value');

		if(value.substr(0,1) === '+') {
			value = value.substr(1,value.length);
			value = value.replace(/\s+/g, '-').replace(/[^0-9-]/g, '').replace(/\-+/g,'');
			value = '+' + value.substr(0,value.length);
		}else {
			value = value.replace(/\s+/g, '-').replace(/[^0-9-]/g, '').replace(/\-+/g,'');
			value = value.substr(0,value.length);
		}

		input.val(value);
	}

	function validatePhone(input) {
		var value = $(input).prop('value');

		if(!value || value === '') {
			input.siblings('.js-formError').html('This field must not be left blank').parents('.form__input').addClass('has-error');
			return false;
		}

	    if(value.length < 10) {
	    	input.siblings('.js-formError').html('This field is not in the correct format').parents('.form__input').addClass('has-error');
	    	return false;
	    }else {
	    	return true;
	    }
	}

	function wathcDateChange(input) {
		var value = $(input).prop('value');

		value = value.replace(/\s+/g, '-').replace(/[^0-9-/]/g, '').replace(/\-+/g,'');
		value = value.substr(0,10);

		input.val(value);
	}

	Form.prototype.init = function() {
		$(this.config.form).on('submit', $.proxy(function (ev) {
		    ev.preventDefault();
		    this.submit($(this.config.form));
		    return false;
		},this));

		$('.js-input').focus(function() {
			$(this).parents('.has-error').removeClass('has-error');
		}).on('change',function() {
			$(this).parents('.has-error').removeClass('has-error');
		});

		$('[type="tel"]').on('input',function() {
			wathcPhoneChange($(this));
		});

		$('[name="birthdate"]').on('input',function() {
			wathcDateChange($(this));
		});

		$('.js-input').click(function() {
			$(this).parents('.has-error').removeClass('has-error');
		});
	};

	Form.prototype.validate = function(callback) {
		var errors = 0;
		$(this.config.form).find('[data-validation]').each(function(index,item) {
			var _validation = $(item).attr('data-validation').split(',');
			var _isValid = false;
			$.each(_validation,function(index,type) {
				if(type === 'required') {
					 _isValid = validateRequired($(item));
				}

				if(type === 'email') {
					_isValid = validateEmail($(item));
				}

				if(type === 'phone') {
					_isValid = validatePhone($(item));
				}

				if(!_isValid) {
					errors++;
				}
			});
		});

		if (errors === 0) {
			callback();
		}else {
			$('.section').scrollTop(0);
		}
	};

	Form.prototype.submit = function(form) {

		this.validate($.proxy(function() {
			$.ajax({
			    type: this.config.method,
			    url: this.config.apiUrl,
			    data: $(this.config.form).serialize(),
			    success: $.proxy(function (res) {
			    	if(this.config.onSuccess && typeof this.config.onSuccess === 'function') {
			    		this.config.onSuccess(res);
			    	}
			    },this),
			    error: $.proxy(function(err) {
			    	switch(err.status) {
			    		case 401:
			    			console.debug('Errore campi server da gestire');
			    			console.log('--> ',err);
			    			break;
			    		case 409:
			    			$('.section').scrollTop(0);
			    			$(this.config.form).find('[type="email"]').siblings('.js-formError').html('This user already exists').parents('.form__input').addClass('has-error');
			    			break;
			    		default:
			    			break;
			    	}
			    },this)
			});
		},this));
	};

	return Form;

})();

module.exports = Form;