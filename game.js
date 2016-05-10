area = {
	canvas : document.createElement('canvas'),
	start : function() {
		nextMove = 0;
		m = [];
		for (var i = 0; i < 30; i++) {
			m[i] = [];
			for (var j = 0; j < 30; j++) {
				m[i][j] = new square(i, j, 0);
			}
		}
		this.direction = 0;
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
		if (area.keys && area.keys[config.KEY_LEFT]) {
			this.direction = "left";
		}
		if (area.keys && area.keys[config.KEY_UP]) {
			this.direction = "up";
		}
		if (area.keys && area.keys[config.KEY_RIGHT]) {
			this.direction = "right";
		}
		if (area.keys && area.keys[config.KEY_DOWN]) {
			this.direction = "down";
		}
		for (var i = 0; i < m.length; i++) {
			for (var j = 0; j < m.length; j++) {
				try {
					if (m[i][j].color == 1 && this.direction == "left" && nextMove >= 10) {
						m[i][j].color = 2;
						m[i][j - 1].color = 1;
						m[i][j - 1].life = 0;
						nextMove = 0;
					}
				} catch (err) { }
				try {
					if (m[i][j].color == 1 && this.direction == "up" && nextMove >= 10) {
						m[i][j].color = 2;
						m[i - 1][j].color = 1;
						m[i - 1][j].life = 0;
						nextMove = 0;
					}
				} catch (err) { }
				try {
					if (m[i][j].color == 1 && this.direction == "right" && nextMove >= 10) {
						m[i][j].color = 2;
						m[i][j + 1].color = 1;
						m[i][j + 1].life = 0;
						nextMove = 0;
					}
				} catch (err) { }
				try {
					if (m[i][j].color == 1 && this.direction == "down" && nextMove >= 10) {
						m[i][j].color = 2;
						m[i + 1][j].color = 1;
						m[i + 1][j].life = 0;
						nextMove = 0;
					}
				} catch (err) { }
			}
		}
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

square = function(column, row, color) {
	this.row = row * 20;
	this.column = column * 20;
	this.color = color;
	this.life = 0;
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
				this.life++;
				if (this.life >= 30) {
					ctx.fillStyle = config.EMPTY_TILE;
				} else {
					ctx.fillStyle = config.SNAKE_TILE;
				}
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
	nextMove++;
	area.clear();
	area.update();
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m.length; j++) {
			m[i][j].update();
		}
	}
}