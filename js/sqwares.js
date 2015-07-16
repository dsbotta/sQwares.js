//Must use sq-hook to initialize
function SquareMaster() {
	this.defaultSettings = {
		hook: 'sq-hook',
		number: 9,
		color: "black",
		size: '50',
		animHandler: 'click'
	};
};

	//
	//Create a Square Prototype
	//
	function Square(object) {
		SquareMaster.call(this);
		this.settings = $.extend(this.defaultSettings, object);
		this.settings.hook = $('#' + this.settings.hook);
	};

	Square.prototype = Object.create(SquareMaster.prototype);

	//
	//Create Initial Color
	//
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
	//Choose Square
	//
	Square.prototype.buildSquare = function(num) {
		var $hook = this.settings.hook;
		var size = this.settings.size + 'px';
		var sqCssClass = 'sq-' + num; 
		var classSelector = '.' + sqCssClass;
		var animHandler;
		if (this.settings.animHandler == 'hover') {
			animHandler = 'sq-hover';
		} else {
			animHandler = 'sq-' + this.settings.animHandler + '-off';
		};

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
		$hook.append(htmlNode);
		$hook.children().css({'height': size, 'width': size});
		$(classSelector).css('background-color', this.createColor());
		//Cal the animation type
		this.animations(this.settings.animHandler);
	};

	//
	//Create the Square Type
	//
	Square.prototype.createSquares = function() {
		console.log(this.settings.number);
		if (this.settings.number == 4 || 
			this.settings.number == 9 || 
			this.settings.number == 16 || 
			this.settings.number == 25 ||
			this.settings.number == 36 ||
			this.settings.number == 49 ||
			this.settings.number == 64) {

				this.buildSquare(this.settings.number);

		} else {
			console.log("Error: Not a Valid Number Choice.");
			return null;
		}
	};

	Square.prototype.animations = function(animType) {
		if (animType == 'click') {
			$('.sq-container').click(function() {
				$('.sq-container').toggleClass('sq-click-on sq-click-off');
			});
		} else {

		}
	}

//Initialize a squate instance
var newSquare = new Square({
	number: 16,
	size: 300,
	color: 'teal',
	animHandler: 'click'
});
newSquare.createSquares();
