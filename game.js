area = {
	canvas : document.createElement('canvas'),
	start : function() {
		m = [];
		for (var i = 0; i < 30; i++) {
			m[i] = [];
			for (var j = 0; j < 30; j++) {
				m[i][j] = new square(i, j, 0);
			}
		}
		m[15][15].color = 1;
		this.canvas.width = 598;
		this.canvas.height = 598;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(update, 20);
		window.addEventListener('keydown', function (e) {
			area.keys = (area.keys || []);
			area.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			area.keys[e.keyCode] = false;
		})
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	update : function() {
		
	}
}

config = {
	EMPTY_TILE : "#818181",
	SNAKE_TILE : "#1500ff",
	CANDY_TILE : "#ff0000",
	SNOUT_TILE : "#00ecff",
	KEY_LEFT : 65,
	KEY_UP : 87,
	KEY_RIGHT : 68,
	KEY_DOWN : 83
}

square = function(row, column, color) {
	this.color = color;
	this.row = row * 20;
	this.column = column * 20;
	this.update = function() {
		ctx = area.context;
		ctx.save;
		switch(this.color) {
			case 0:
				ctx.fillStyle = config.EMPTY_TILE;
				break;
			case 1:
				ctx.fillStyle = config.SNOUT_TILE;
				break;
			case 2:
				ctx.fillStyle = config.SNAKE_TILE;
				break;
			case 3:
				ctx.fillStyle = config.CANDY_TILE;
				break;
			default:
				break;
		}
		ctx.fillRect(this.row, this.column, 18, 18);
		ctx.restore;
	}
}

update = function() {
	area.clear();
	area.update();
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m.length; j++) {
			m[i][j].update();
		}
	}
}