//Must use sq-hook to initialize
function SquareMaster() {
	this.defaultSettings = {
		hook: 'sq-hook',
		number: 9,
		color: "black",
		size: '50'
	};
};

//Create a Square Prototype
function Square(object) {
	SquareMaster.call(this);
	this.settings = $.extend(this.defaultSettings, object);
	this.settings.hook = $('#' + this.settings.hook);
};

Square.prototype = Object.create(SquareMaster.prototype);

//Choose Square
Square.prototype.buildSquare = function(num) {
	var $hook = this.settings.hook;
	var size = this.settings.size + 'px';
	var sqCssClass = 'sq-' + num; 
	var classSelector = '.' + sqCssClass;

	var htmlNode = '<div class="sq-container">';

	for(var i = 0; i < num; i++) {
		htmlNode += '<div class="' + sqCssClass + '">';
		htmlNode += '</div>';
	};

	htmlNode += '</div>';
	$hook.append(htmlNode);
	$hook.children().css({'height': size, 'width': size});
	$(classSelector).css('background-color', this.createColor());
};

//Create Initial Color
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

//Create the Square Type
Square.prototype.createSquares = function() {
	console.log(this.settings.number);
	if (this.settings.number == 4 || this.settings.number == 9 || this.settings.number == 16 || this.settings.number == 25) {
		this.buildSquare(this.settings.number);
	} else {
		console.log("Error: Not a Valid Number Choice.");
		return null;
	}
};

var newSquare = new Square();
newSquare.createSquares();
