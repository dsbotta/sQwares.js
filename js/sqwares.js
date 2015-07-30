/*********************
		SQWARES
*********************/


//MasterSquare constructor that holds default settings
function SquareMaster() {

	// this.hideSq = $('.sq-hide');
	
	this.defaultSettings = {
		hook: 'sq-hook',
		number: 9,
		color: [0,0,0],
		size: '50',
		animHandler: 'click',
		speed: 'medium',
		animationType: false,
		inverse: false,
		clockwise: true,
		radius: false,
		rotation: 'standard',
		secondColor: false,
		secondColorSelect: false
	};

};

	//
	//Create the MAIN Square Constructor
		//Calls on SquareMaster for defaults
	//
	function Square(object) {

		SquareMaster.call(this);

		//Default second color to main color
		// this.settings.secondColor = this.settings.color;

		this.settings = $.extend(this.defaultSettings, object);

		if (this.settings.secondColor === false) {
			this.settings.secondColor = this.settings.color;
		}

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
	Square.prototype.createColor = function(color) {
		var typeTest = jQuery.type(this.settings.color);

		if (typeTest == "string") {
			return color;
		} else if (typeTest == "number") {
			return color.toString();
		} else if (typeTest == "array") {
			if (color.length === 3) {
				var rgb = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
				return rgb;
			} else {
				console.log('Error: Please add only 3 values to rgb color array.');
				return 'black';
			}
		} else {
			return 'black';
		}

	};

	//
	//Build the Square
	//
	Square.prototype.buildSquare = function(num) {

		//Variables for the function
		var $hook = this.hook;

		var size = this.settings.size + 'px';

		var sqCssClass = 'sq-' + num; 

		var classSelector = '.' + sqCssClass;

		var radius = this.settings.radius;

		var animationSpeed = function(speed) {
			if ( speed == 'slow' ) {
				return 'slow';
			} else if ( speed == 'fast' ) {
				return 'fast';
			} else {
				return 'medium'
			}
		};

		var animHandler;

		//Choose if animations occurs on hover 
		//or on click event
		if (this.settings.animHandler == 'hover') {
			animHandler = 'sq-hover';

			//If rotation set, add rotation type to class
			if(this.settings.rotation !== 'standard') {
				animHandler += '-';
				animHandler += this.settings.rotation;
			}
		} else {
			animHandler = 'sq-' + this.settings.animHandler + '-off';
		};

		if (this.settings.clockwise === false) {
			animHandler += '-counter';
		};

		//Build the HTML node
		var htmlNode = '<div class="sq-container-';
		htmlNode += animationSpeed(this.settings.speed) + ' ';
		htmlNode += animHandler;
		htmlNode += '">';

		for(var i = 0; i < num; i++) {
			htmlNode += '<div class="'
			htmlNode += sqCssClass + ' ';
			if(radius) {
				htmlNode += 'radius '
			};
			htmlNode += 'sq-default-';
			htmlNode += animationSpeed(this.settings.speed) + '">';
			htmlNode += '</div>';
		};

		htmlNode += '</div>';

		//Append the HTML Node
		$hook.append(htmlNode);

		//Give the squares some basic styles
		$hook.children().css({'height': size, 'width': size});
		$(this.hook).find(classSelector).css('background-color', this.createColor(this.settings.color));

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

		var rotation = this.settings.rotation;

		//If clockwise is false, use counter class
		var clickOff = 'sq-click-off';
		var clickOn = 'sq-click-on';

		//If rotation set, add rotation type to class
		if(rotation !== 'standard') {
			clickOn += '-';
			clickOn += rotation;
		}
		if ( this.settings.clockwise === false ) {
			clickOn += '-counter';
		};

		if (animType == 'click') {
			$(this.hook).children().click(function() {
				$(this).toggleClass(clickOn);
				if(type) {
					//If custom array is given,
					//set the animation type to standard for clas
					if (jQuery.type(type) == 'array') {
						type = 'standard';
					}
					//If animationType was specified:
						//Create a click handler to toggle classes for the animation	
					$(this).children('.sq-' + type + '-click')
						.toggleClass('sq-' + type + '-click-on');
				}
			});
		} else {
			return null;
		}
	};

	Square.prototype.animationType = function(type, animHandler) {

		var $hook = this.hook;

		var firstColor = this.createColor(this.settings.color);

		var secondColor = this.createColor(this.settings.secondColor);

		var inverse = this.settings.inverse;

		var animationType = this.settings.animationType;

		var secondColorSelect = this.settings.secondColorSelect;

		//GET number of squares in the instance
			//Store the length in the variable number
		var number = $(this.hook).children().children().length;

		var standardAnim;

		var standardSecondColor;

		//Class name prefixes
		var standard = 'sq-standard-';
		var large = 'sq-large-';

		//Checks if the function should hide the inverse animation
		function ifInverse(bool) {
			if (inverse) {
				return !bool;
			} else {
				return bool;
			}
		};

		//Build the animation type by iterating through
		//given array argument and adding a class to change
		//opacity to 0
		function makeAnimation(animArray) {
			if ( $.inArray(count, animArray) !== -1 )  {
				return ifInverse(false);
			} else {
				return ifInverse(true);
			}	
		};

		function setSecondaryColor(colorArray) {
			if ( $.inArray(count, colorArray) !== -1 )  {
				// console.log(colorArray +'\n');
				return true;
			} else {
				return false;
			}	
		};


		//Alternates between different classes and animations
		//on click or hover
		function secondaryAnimationEventHandler(hook, secondClass, initialClass, theArray) {
			if (animHandler === 'click') {
				hook.children().click(function() {
					if ( !classSwitch ) {
						$(this).children('.second-color').css('background-color', secondClass);
						if(alternateToBool >= theArray.length -1) {
								classSwitch = true;
								alternateToBool = 0;
							} else {
								alternateToBool++;
							}

					} else {
						$(this).children('.second-color').css('background-color', initialClass);
						if(alternateToBool < theArray.length -1) {
								alternateToBool++;
						} else {
							classSwitch = false;
							alternateToBool = 0;
						}
					}
				});
			} else {
				hook.children().hover(function() {
					if ( !classSwitch ) {
						$(this).children('.second-color').css('background-color', secondClass);
						if(alternateToBool < standardSecondColor.length -1) {
								alternateToBool++;
							} else {
								classSwitch = true;
								alternateToBool = 0;
							}

					} else {
						$(this).children('.second-color').css('background-color', initialClass);
						if(alternateToBool < standardSecondColor.length -1) {
								alternateToBool++;
						} else {
							classSwitch = false;
							alternateToBool = 0;
						}

					}
				});
			}
		};

		//Counter for the loop
		var count = 0;

		var classSwitch = false;

		var alternateToBool = 0;

		//Loop through each child of the instance
		$(this.hook).children().children().each(function() {

				//Determine animtion based on number of squares
				if(number === 4) {
					//STANDARD 4
					standardAnim = [0,3];					

				} else if (number === 9) {
					//STANDARD 9
					standardAnim = [0,2,4,6,8];
					standardSecondColor = [4];

				} else if (number === 16) {
					//STANDARD 16
					standardAnim = [0,3,5,6,9,10,12,15];
					standardSecondColor = [5,6,9,10];

				} else if (number === 25) {
					//STANDARD 25
					standardAnim = [0,1,3,4,5,6,8,9,12,15,
									16,18,19,20,21,23,24];
					standardSecondColor = [0,4,12,20,24];				

				} else if (number === 36) {
					//STANDARD 36
					standardAnim = [0,1,4,5,6,7,10,11,14,
									15,20,21,24,25,28,29,
									30,31,34,35];
					standardSecondColor = [0,5,14,15,20,21,30,35];				
					
				} else if ( number === 49 ) {
					//STANDARD 49
					standardAnim = [0,1,5,6,7,8,9,11,12,13,
									15,16,17,18,19,23,24,25,
									29,30,31,32,33,35,36,37,
									39,40,41,42,43,47,48];
					standardSecondColor = [0,6,8,12,16,18,24,30,32,36,40,42,48];				
					// standardAnim = [8,9,10,15,22,24,26,38];			

				} else {
					return null;
				}

				//If custom animation array given,
				//set standardAnim to custom array
				if (jQuery.type(animationType) == 'array') {
					//Custom Animation Type
					standardAnim = animationType;
				}

				//If custom colors select array given,
				//set standardSecondColor to custom array
				if (jQuery.type(secondColorSelect) == 'array') {
					//Custom Second Color Select
					standardSecondColor = secondColorSelect;
				}

				//Add 
				if(type == "standard" || jQuery.type(animationType) == 'array') {

					if ( makeAnimation(standardAnim) ) {
						$(this).addClass(standard + animHandler);
					}

					if( setSecondaryColor(standardSecondColor) ) {

						$(this).addClass('second-color');

						secondaryAnimationEventHandler($hook, secondColor, firstColor, standardSecondColor);
					}	
					
				} else if(type == "large") {
					
					// if ( makeAnimation(largeAnim) ) {
					// 	$(this).addClass(large + animHandler);
					// }

					// if( setSecondaryColor(largeSecondColor) ) {

					// 	$(this).addClass('second-color');

					// 	secondaryAnimationEventHandler($hook, secondColor, firstColor, largeSecondColor);
					// }

				} else {

					// console.log('something');

				}

			//Increment the counter variable
			count++;

		});
		
	};
