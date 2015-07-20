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
		inverse: false,
		clockwise: true
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

		if (this.settings.clockwise === false) {
			animHandler += '-counter';
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

		//If clockwise is false, use counter class
		var clickOff = 'sq-click-off';
		var clickOn = 'sq-click-on';
		if ( this.settings.clockwise === false ) {
			clickOn += '-counter';
		};

		if (animType == 'click') {
			$(this.hook).children().click(function() {
				$(this).toggleClass(clickOn);
				if(type) {
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
		var inverse = this.settings.inverse;

		//GET number of squares in the instance
			//Store the length in the variable number
		var number = $(this.hook).children().children().length;

		var standardAnim;

		//A function that returns the animHandler
			//to be appended to the end of the class name
			//This class name is used either for a click animation
			//or a hover animation
		// function checkHandler() {
		// 	if (animHandler === 'click') {
		// 		return animHandler;
		// 	} else {
		// 		return animHandler;
		// 	}
		// };

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

		//Counter for the loop
		var count = 0;

		//Loop through each child of the instance
		$(this.hook).children().children().each(function() {

				//Class name prefix
				var standard = 'sq-standard-';

				//Determine animtion based on number of squares
				if(number === 4) {
					//STANDARD 4
					standardAnim = [1,2];

				} else if (number === 9) {
					//STANDARD 9
					standardAnim = [0,2,4,6,8];

				} else if (number === 16) {
					//STANDARD 16
					standardAnim = [0,3,5,6,9,10,12,15];

				} else if (number === 25) {
					//STANDARD 25
					standardAnim = [0,1,3,4,5,6,8,9,12,15,
									16,18,19,20,21,23,24];

				} else if (number === 36) {
					//STANDARD 36
					standardAnim = [0,1,4,5,6,7,10,11,14,
									15,20,21,24,25,28,29,
									30,31,34,35];
					
				} else if ( number === 49 ) {
					//STANDARD 49
					standardAnim = [0,1,5,6,7,8,9,11,12,13,
									15,16,17,18,19,23,24,25,
									29,30,31,32,33,35,36,37,
									39,40,41,42,43,47,48];

				} else {
					return null;
				}

				//Add 
				if(type == "standard") {

					if ( makeAnimation(standardAnim) ) {
						$(this).addClass(standard + animHandler);
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





