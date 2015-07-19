/*********************
		SQWARES
*********************/


//MasterSquare constructor that holds default settings
function SquareMaster() {
	this.hideSq = $('.sq-hide');
	
	this.defaultSettings = {
		hook: 'sq-hook',
		number: 9,
		color: "black",
		size: '50',
		animHandler: 'click',
		animationType: false,
		inverse: false
	};
};

	//
	//Create the MAIN Square Constructor
		//Calls on SquareMaster for defaults
	//
	function Square(object) {
		SquareMaster.call(this);
		this.settings = $.extend(this.defaultSettings, object);
		this.hook = $('#' + this.settings.hook);
	};
	Square.prototype = Object.create(SquareMaster.prototype);


	//
	//Create Initial Color
	//
	//Values can be accepted in the form of:
		//string
		//integer
		//array container ints for (rgb)
	Square.prototype.createColor = function() {
		var typeTest = jQuery.type(this.settings.color);

		if (typeTest == "string") {
			return this.settings.color;
		} else if (typeTest == "number") {
			return this.settings.color.toString();
		} else if (typeTest == "array") {
			if (this.settings.color.length === 3) {
				var rgb = 'rgb(' + this.settings.color[0] + ',' +this.settings.color[1] + ',' + this.settings.color[2] + ')';
				return rgb;
			} else {
				console.log('Error: Please add only 3 values to rgb color array.');
			}
		} else {
			return 'black';
		}

	};

	//
	//Build the Square
	//
	Square.prototype.buildSquare = function(num) {

		//Variables for this function
		var $hook = this.hook;
		var size = this.settings.size + 'px';
		var sqCssClass = 'sq-' + num; 
		var classSelector = '.' + sqCssClass;
		var animHandler;

		//Choose if animations occurs on hover 
		//or on click event
		if (this.settings.animHandler == 'hover') {
			animHandler = 'sq-hover';
		} else {
			animHandler = 'sq-' + this.settings.animHandler + '-off';
		};

		//Build the HTML node
		var htmlNode = '<div class="sq-container ';
		htmlNode += animHandler;
		htmlNode += '">';

		for(var i = 0; i < num; i++) {
			htmlNode += '<div class="'
			htmlNode += sqCssClass + ' ';
			htmlNode += 'sq-default">';
			htmlNode += '</div>';
		};

		htmlNode += '</div>';

		//Append the HTML Node
		$hook.append(htmlNode);

		//Give the squares some basic styles
		$hook.children().css({'height': size, 'width': size});
		$(this.hook).find(classSelector).css('background-color', this.createColor());

		//Cal the animation type
		this.eventHandler(this.settings.animHandler, this.settings.animationType);
	};

	//
	//Create the Square Type
	//
	Square.prototype.createSquares = function() {

		//Determine if the product value 
		//for the amount of squares is valid
		if (this.settings.number == 4 || 
			this.settings.number == 9 || 
			this.settings.number == 16 || 
			this.settings.number == 25 ||
			this.settings.number == 36 ||
			this.settings.number == 49) 
		{
				this.buildSquare(this.settings.number);
				this.animationType(this.settings.animationType, this.settings.animHandler);

		} else {

			//Tell the user if they did not enter a valid number
			console.log('Error: ' + this.settings.number + ' is not a valid number choice. Please choose one of the follow:\n4\n9\n16\n25\n36\n49');
			return null;
		}
	};


	//
	//A function to Determine if animation occurs on click or not
	//
	Square.prototype.eventHandler = function(animType, type) {
		if (animType == 'click') {
			$(this.hook).children().click(function() {
				$(this).toggleClass('sq-click-on sq-click-off');
				if(type) {
					//If animationType was specified:
						//Create a click handler to toggle classes for the animation
					$(this).children('.sq-' + type + '-click')
						.toggleClass('sq-' + type + '-click-on', 'sq-' + type + '-click-off');
				}
			});
		} else {
			return null;
		}
	};

	Square.prototype.animationType = function(type, animHandler) {
		var inverse = this.settings.inverse;

		//GET number of squares in the instance
			//Store the length in the variable number
		var number = $(this.hook).children().children().length;

		//A function that returns the animHandler
			//to be appended to the end of the class name
			//This class name is used either for a click animation
			//or a hover animation
		function checkHandler() {
			if (animHandler === 'click') {
				return animHandler;
			} else {
				return animHandler;
			}
		};

		//Checks if the function should hide the inverse animation
		function ifInverse(bool) {
			if (inverse) {
				return !bool;
			} else {
				return bool;
			}
		};

		//Counter for the loop
		var count = 0;

		//Loop through each child of the instance
		$(this.hook).children().children().each(function() {

			if(type == "standard") {

				//Class name prefix
				var standard = 'sq-standard-';

				//Determine animtion based on number of squares
				if(number === 4) {
					//STANDARD 4
					function standard4() {
						if (count > 0 && count < 3) {
							return ifInverse(true);
						} else {
							return ifInverse(false);
						}
					};	

					if( standard4() ) {
						$(this).addClass(standard + checkHandler());
					}

				} else if (number === 9) {
					//STANDARD 9
					function standard9() {
						if ((count % 2) !== 0 ) {
							return ifInverse(true);
						} else {
							return ifInverse(false);
						}
					};

					if ( standard9() ) {
						$(this).addClass(standard + checkHandler());
					}

				} else if (number === 16) {
					//STANDARD 16
					function standard16() {
						if ( (count % 3) === 0 ) {
							return ifInverse(false);
						} else if (count < 1) {
							return ifInverse(false);
						} else if ((count % 5) === 0) {
							return ifInverse(false);
						} else {
							return ifInverse(true);
						}
					};
					if ( standard16() ) {
						$(this).addClass(standard + checkHandler());	
					}
				} else if (number === 25) {
					function standard25() {
						if ( count >= 0 && count <= 4 ) {
							if ( count !== 2) {
								return ifInverse(false);
							} else {
								return ifInverse(true);
							}
						} else if ( count >= 5 && count <= 9 ) {
							if ( count !== 7) {
								return ifInverse(false);
							} else {
								return ifInverse(true);
							}
						} else if ( count >= 10 && count <= 14 ) {
							if  ( count === 12 ) {
								return ifInverse(false);
							} else {
								return ifInverse(true);
							}
						} else if ( count >= 15 && count <= 19 ) {
							if ( count !== 17 ) {
								return ifInverse(false);
							} else {
								return ifInverse(true);
							}
						} else {
							if ( count !== 22 ) {
								return ifInverse(false);
							} else {
								return ifInverse(true);
							}
						};
					};
					if ( standard25() ) {
						$(this).addClass(standard + checkHandler());	
					}	
				}

			} else if(type == "smile") {

				// console.log('smile');

			} else {

				// console.log('something');

			}

			//Increment the counter variable
			count++;

		});
	};