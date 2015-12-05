$.simpleMS = {
	options: {
		header: {
			information: {
				show: true
			},
			filter: {
				show: true
			}
		},
		body: {
			button: {
				unselected: {
					html:		'<i class="glyphicon glyphicon-chevron-right"></i>'
								+ '<i class="glyphicon glyphicon-chevron-right"></i>'
				},
				selected: {
					html:		'<i class="glyphicon glyphicon-chevron-left"></i>'
								+ '<i class="glyphicon glyphicon-chevron-left"></i>'
				}
			}
		},
		lang: {
			default: 'en'
		}
	},
	langs: {
		en: {
			header: {
				information: {
					unselected: {
						title: 'Unselected'
					},
					selected: {
						title: 'Selected'
					}
				},
				filter: {
					unselected: {
						placeholder: 'Search...'
					},
					selected: {
						placeholder: 'Search...'
					}
				}
			}
		}
	}
};

function simpleMS(object, options) {
	this.multiselect = object;
	this.options = jQuery.extend(true, {}, $.simpleMS.options);
	
	// setup lang options
	if(options && 'lang' in options) {
		if('default' in options.lang && options.lang.default in $.simpleMS.langs) {
			this.options.lang.default = options.lang.default;
		}
	}
	
	// setup header options
	if(options && 'header' in options) {
		if('information' in options.header) {
			if('show' in options.header.information) {
				this.options.header.information.show = options.header.information.show;
			}
		}
		if('filter' in options.header) {
			if('show' in options.header.filter) {
				this.options.header.filter.show = options.header.filter.show;
			}
		}
	}
	
	// setup header options
	if(options && 'body' in options) {
		if('button' in options.body) {
			if('unselected' in options.body.button) {
				if('html' in options.body.button.unselected) {
					this.options.body.button.unselected.html = options.body.button.unselected.html;
				}
			}
			if('selected' in options.body.button) {
				if('html' in options.body.button.selected) {
					this.options.body.button.selected.html = options.body.button.selected.html;
				}
			}
		}
	}
	
  return this;
}
simpleMS.prototype.initialize = function() {
	this.$html = $('<div class="row simple-multiselect-box">'
									+'<div class="col-xs-12">'
										+'<div class="col-xs-6 simple-multiselect-unselected">'
											+'<div class="simple-multiselect-header">'
												+(this.options.header.information.show ? '<div class="simple-multiselect-information">' + $.trim($.simpleMS.langs[this.options.lang.default].header.information.unselected.title) + ': <span></span></div>' : $.trim(null))
												+(this.options.header.filter.show ? '<div class="simple-multiselect-filter">'
													+'<input type="text" class="form-control" placeholder="' + $.trim($.simpleMS.langs[this.options.lang.default].header.filter.unselected.placeholder) + '">'
												+'</div>' : $.trim(null))
											+'</div>'
											+'<div class="simple-multiselect-body">'
												+'<div class="simple-multiselect-select-button">'
													+'<button type="button" class="btn btn-default">'
														+ this.options.body.button.unselected.html
													+'</button>'
												+'</div>'
												+'<div class="simple-multiselect-options-box">'
													+'<ul class="simple-multiselect-options-list"></ul>'
												+'</div>'
											+'</div>'
										+'</div>'
										+'<div class="col-xs-6 simple-multiselect-selected">'
											+'<div class="simple-multiselect-header">'
												+(this.options.header.information.show ? '<div class="simple-multiselect-information">' + $.trim($.simpleMS.langs[this.options.lang.default].header.information.selected.title) + ': <span></span></div>' : $.trim(null))
												+(this.options.header.filter.show ? '<div class="simple-multiselect-filter">'
													+'<input type="text" class="form-control" placeholder="' + $.trim($.simpleMS.langs[this.options.lang.default].header.filter.selected.placeholder) + '">'
												+'</div>' : $.trim(null))
											+'</div>'
											+'<div class="simple-multiselect-body">'
												+'<div class="simple-multiselect-select-button">'
													+'<button type="button" class="btn btn-default">'
														+ this.options.body.button.selected.html
													+'</button>'
												+'</div>'
												+'<div class="simple-multiselect-options-box">'
													+'<ul class="simple-multiselect-options-list"></ul>'
												+'</div>'
											+'</div>'
										+'</div>'
									+'</div>'
								+'</div>');
	
	// apend simple multiselect html after multiselect
	this.multiselect.after(this.$html);
}
simpleMS.prototype.informationUPDATE = function() {
	if(this.options.header.information.show) {
		if(this.$html) {
			var unselectedCOUNT = this.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list li').length,
			selectedCOUNT = this.$html.find('.simple-multiselect-selected .simple-multiselect-options-list li').length;
			
			this.$html.find('.simple-multiselect-unselected .simple-multiselect-header .simple-multiselect-information span').html(unselectedCOUNT);
			this.$html.find('.simple-multiselect-selected .simple-multiselect-header .simple-multiselect-information span').html(selectedCOUNT);
		}
	}
}
simpleMS.prototype.optionsPUT = function() {
	if(this.$html) {
		var $unselectedLIST = this.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list'),
		$selectedLIST = this.$html.find('.simple-multiselect-selected .simple-multiselect-options-list');

		this.multiselect.find('option').each(function(index) {
			var $option = $('<li>' + $(this).html() + '</li>');
			$option.data('index', index);

			if($(this).is(':selected')) {
				$selectedLIST.append($option);
			}
			else {
				$unselectedLIST.append($option);
			}
		});
	}
}
simpleMS.prototype.optionsEMPTY = function() {
	if(this.$html) {
		var $unselectedLIST = this.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list'),
		$selectedLIST = this.$html.find('.simple-multiselect-selected .simple-multiselect-options-list');
		
		$unselectedLIST.empty();
		$selectedLIST.empty();
	}
}
simpleMS.prototype.filterTRIGGER = function() {
	if(this.options.header.filter.show) {
		if(this.$html) {
			var multiselect = this;
			
			// trigger filter for unselected options
			this.$html.find('.simple-multiselect-unselected .simple-multiselect-filter input').unbind('keyup');
			this.$html.find('.simple-multiselect-unselected .simple-multiselect-filter input').keyup(function(event) {
				var regexp = new RegExp(removeDiacritics($(this).prop('value')), 'i');
				var $valid = multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list li').filter(function(index) {
					return regexp.test(removeDiacritics($.trim($(this).html())));
				}).show();
				multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list li').not($valid).hide();
			});
			
			// trigger filter for selected options
			this.$html.find('.simple-multiselect-selected .simple-multiselect-filter input').unbind('keyup');
			this.$html.find('.simple-multiselect-selected .simple-multiselect-filter input').keyup(function(event) {
				var regexp = new RegExp(removeDiacritics($(this).prop('value')), 'i');
				var $valid = multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list li').filter(function (index) {
					return regexp.test(removeDiacritics($.trim($(this).html())));
				}).show();
				multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list li').not($valid).hide();
			});
		}
	}
}
simpleMS.prototype.selectUNBIND = function() {
	if(this.$html) {
		this.$html.find('.simple-multiselect-options-list li').unbind('click');
	}
}
simpleMS.prototype.selectTRIGGER = function() {
	if(this.$html) {
		var multiselect = this;
	
		this.$html.find('.simple-multiselect-options-list li').click(function(event) {
			if($(this).attr('active') === 'true' && (multiselect.$html.find('.simple-multiselect-options-list li[active=true]').length < 2 || (event.ctrlKey || event.metaKey))) {
				$(this).attr('active', false);
			}
			else {
				// unselect other options if ctrl or cmd key were not detected
				if((event.ctrlKey || event.metaKey) === false) {
					multiselect.$html.find('.simple-multiselect-options-list li[active=true]').attr('active', false);
				}

				// check if options are from same table
				if(multiselect.$html.find('.simple-multiselect-options-list li[active=true]').length === 0
					|| ($.contains(multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list').get(0), multiselect.$html.find('.simple-multiselect-options-list li[active=true]:first').get(0))
					&& ($.contains(multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list').get(0), $(this).get(0))))
					|| ($.contains(multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list').get(0), multiselect.$html.find('.simple-multiselect-options-list li[active=true]:first').get(0))
					&& ($.contains(multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list').get(0), $(this).get(0))))) {
					$(this).attr('active', true);
				}
			}
		});
	}
}
simpleMS.prototype.selectOptionTRIGGER = function() {
	var multiselect = this;
	
	this.$html.find('.simple-multiselect-unselected .simple-multiselect-select-button button').click(function(event) {
		multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list li[active=true]').each(function(index) {
			var index = $(this).data('index');
			
			// find proper selected option
			var $option = multiselect.multiselect.find('option:nth-child(' + (index + 1) + ')');

			// select proper option
			$option.prop('selected', true);
			
			var $li = $('<li>' + $(this).html() + '</li>');
			
			// set up option index
			$li.data('index', index);
			
			// move option in selected list
			multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list').append($li);
			
			// remove option
			$(this).remove();
		});
		
		// rebind row select
		multiselect.selectUNBIND();
		multiselect.selectTRIGGER();
		
		// update information
		multiselect.informationUPDATE();
	});
}
simpleMS.prototype.unselectOptionTRIGGER = function() {
	var multiselect = this;
	
	this.$html.find('.simple-multiselect-selected .simple-multiselect-select-button button').click(function(event) {
		multiselect.$html.find('.simple-multiselect-selected .simple-multiselect-options-list li[active=true]').each(function(index) {
			var index = $(this).data('index');
			
			// find proper selected option
			var $option = multiselect.multiselect.find('option:nth-child(' + (index + 1) + ')');

			// unselect proper option
			$option.prop('selected', false);
			
			var $li = $('<li>' + $(this).html() + '</li>');
			
			// set up option index
			$li.data('index', index);
			
			// move option in unselected list
			multiselect.$html.find('.simple-multiselect-unselected .simple-multiselect-options-list').append($li);
			
			// remove option
			$(this).remove();
		});
		
		// rebind row select
		multiselect.selectUNBIND();
		multiselect.selectTRIGGER();
		
		// update information
		multiselect.informationUPDATE();
	});
}
simpleMS.prototype.destroy = function() {
	if(this.$html) {
		this.$html.remove();
	}
}

$.fn.simpleMS = function(condition, options) {
	switch(condition) {
		case 'destroy': {
			// check if simple multiselect has been initialized
			if(this.data('simple-multiselect')) {
				var multiselect = this.data('multiselect');
				
				if(typeof multiselect === 'object' && multiselect.constructor.name === 'simpleMS') {
					// destroy simple multiselect
					multiselect.destroy();
				}

				// show multiselect
				this.show();

				// set up that simple multiselect has been destroyed
				this.data('simple-multiselect', false);

				this.data('multiselect', null);
			}
		}; break;
		case 'update': {
			// check if simple multiselect has been initialized
			if(this.data('simple-multiselect')) {
				var multiselect = this.data('multiselect');
				
				if(typeof multiselect === 'object' && multiselect.constructor.name === 'simpleMS') {
					// empty options
					multiselect.optionsEMPTY();

					// put options
					multiselect.optionsPUT();

					// update information
					multiselect.informationUPDATE();

					// filter trigger
					multiselect.filterTRIGGER();

					// select trigger
					multiselect.selectUNBIND();
					multiselect.selectTRIGGER();
				}
			}
		}; break;
		// by default simple multiselect will be initialized
		default: {
			if(!this.data('simple-multiselect')) {
				var multiselect = new simpleMS(this, options);
				
				// save object inside multiselect
				this.data('multiselect', multiselect);
				
				// hide multiselect
				this.hide();
				
				// initialize simple multiselect
				multiselect.initialize();
				
				// put options
				multiselect.optionsPUT();
				
				// update information
				multiselect.informationUPDATE();
				
				// filter trigger
				multiselect.filterTRIGGER();
				
				// select trigger
				multiselect.selectUNBIND();
				multiselect.selectTRIGGER();
				
				// select/unselect option trigger
				multiselect.selectOptionTRIGGER();
				multiselect.unselectOptionTRIGGER();
				
				// set up that simple multiselect has been activated
				multiselect.multiselect.data('simple-multiselect', true);
			}
		}; break;
	}
}