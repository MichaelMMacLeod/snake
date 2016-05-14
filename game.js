area = {
	canvas : document.createElement('canvas'),
	start : function() {
		food = new candy();
		snakey = new snake(
			false,
			config.NEXT_MOVE_TIME, 
			config.SNOUT_TILE,
			config.BLUE_1,
			config.BLUE_2,
			config.BLUE_3,
			config.BLUE_4);
		holder = new snake(
			false,
			config.NEXT_MOVE_TIME, 
			config.SNOUT_TILE,
			config.BLUE_1,
			config.BLUE_2,
			config.BLUE_3,
			config.BLUE_4);
		nextMove = 0;
		score = 0;
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
		if (area.keys && this.direction != "right" && area.keys[config.KEY_LEFT]) {
			this.direction = "left";
		}
		if (area.keys && this.direction != "right" && area.keys[config.KEY_LEFT_2]) {
			this.direction = "left";
		}
		if (area.keys && this.direction != "down" && area.keys[config.KEY_UP]) {
			this.direction = "up";
		}
		if (area.keys && this.direction != "down" && area.keys[config.KEY_UP_2]) {
			this.direction = "up";
		}
		if (area.keys && this.direction != "left" && area.keys[config.KEY_RIGHT]) {
			this.direction = "right";
		}
		if (area.keys && this.direction != "left" && area.keys[config.KEY_RIGHT_2]) {
			this.direction = "right";
		}
		if (area.keys && this.direction != "up" && area.keys[config.KEY_DOWN]) {
			this.direction = "down";
		}
		if (area.keys && this.direction != "up" && area.keys[config.KEY_DOWN_2]) {
			this.direction = "down";
		}
		for (var i = 0; i < m.length; i++) {
			for (var j = 0; j < m.length; j++) {
				if (m[i][j].color == 3) {
					candy = false;
				}
				try {
					if (m[i][j].color == 1 && this.direction == "left" && nextMove >= snakey.velocity) {
						m[i][j].color = 2;
						if (m[i][j - 1].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							score += config.SCORE_CANDY; 
						}
						if (m[i][j - 1].color == 0 || m[i][j - 1].color == 3) {
							m[i][j - 1].color = 1;
							m[i][j - 1].life = 0;
							nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (m[i][j].color == 1 && this.direction == "up" && nextMove >= snakey.velocity) {
						m[i][j].color = 2;
						if (m[i - 1][j].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							score += config.SCORE_CANDY; 
						}
						if (m[i - 1][j].color == 0 || m[i - 1][j].color == 3) {
							m[i - 1][j].color = 1;
							m[i - 1][j].life = 0;
							nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (m[i][j].color == 1 && this.direction == "right" && nextMove >= snakey.velocity) {
						m[i][j].color = 2;
						if (m[i][j + 1].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							score += config.SCORE_CANDY; 
						}
						if (m[i][j + 1].color == 0 || m[i][j + 1].color == 3) {
							m[i][j + 1].color = 1;
							m[i][j + 1].life = 0;
							nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (m[i][j].color == 1 && this.direction == "down" && nextMove >= snakey.velocity) {
						m[i][j].color = 2;
						if (m[i + 1][j].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							score += config.SCORE_CANDY; 
						}
						if (m[i + 1][j].color == 0 || m[i + 1][j].color == 3) {
							m[i + 1][j].color = 1;
							m[i + 1][j].life = 0;
							nextMove = 0;
						}
					}
				} catch (err) {}
			}
		}
		food.update();
		document.title = score + " Points";
	}
}

candy = function() {
	this.update = function() {
		var candy = true;
		for (var i = 0; i < m.length; i++) {
			for (var j = 0; j < m.length; j++) {
				if (m[i][j].color == 3) {
					candy = false;
				}
			}
		}
		if (candy) {
			m[Math.floor((Math.random() * 30))][Math.floor((Math.random() * 30))].color = 3;
		}
	}
}

snake = function(invisible, velocity, snout, body_1, body_2, body_3, body_4) {
	this.invisible = invisible;
	this.velocity = velocity;
	this.snout = snout;
	this.body_1 = body_1;
	this.body_2 = body_2;
	this.body_3 = body_3;
	this.body_4 = body_4;
	this.hardcore = function() {
		switch (this.invisible) {
			case true:
				this.invisible = holder.invisible;
				this.velocity = holder.velocity;
				this.snout = holder.snout;
				this.body_1 = holder.body_1;
				this.body_2 = holder.body_2;
				this.body_3 = holder.body_3;
				this.body_4 = holder.body_4;
				document.getElementById("snakeColor").style.background = holder.body_1;
			break;
			case false:
				holder = new snake(
					this.invisible,
					this.velocity,
					this.snout,
					this.body_1,
					this.body_2,
					this.body_3,
					this.body_4);
				this.invisible = true;
				this.body_1 = config.BLACK;
				this.body_2 = config.EMPTY_TILE;
				this.body_3 = config.EMPTY_TILE;
				this.body_4 = config.EMPTY_TILE;
				document.getElementById("snakeColor").style.background = config.BLACK;
			break;
			default:
			break;
		}
	}
	this.speed = function() {
		switch (this.velocity) {
			case config.NEXT_MOVE_TIME:
				this.velocity = config.NEXT_MOVE_TIME_HARD;
				candy.amount = 75;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Starving";
				document.getElementById("difficulty").style.backgroundColor = config.HARD_COLOR;
			break;
			case config.NEXT_MOVE_TIME_HARD:
				this.velocity = config.NEXT_MOVE_TIME_EASY;
				candy.amount = 12;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Well-Fed";
				document.getElementById("difficulty").style.backgroundColor = config.EASY_COLOR;
			break;
			case config.NEXT_MOVE_TIME_EASY:
				this.velocity = config.NEXT_MOVE_TIME;
				candy.amount = 25;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Hungry";
				document.getElementById("difficulty").style.backgroundColor = config.MEDIUM_COLOR;
			break;
			default:
			break;
		}
	}
	this.color = function() {
		if (!this.invisible) {
			switch (this.body_1) {
				case config.BLUE_1:
					this.body_1 = config.GREEN_1;
					this.body_2 = config.GREEN_2;
					this.body_3 = config.GREEN_3;
					this.body_4 = config.GREEN_4;
					document.getElementById("snakeColor").style.backgroundColor = config.GREEN_1;
				break;
				case config.GREEN_1:
					this.body_1 = config.PURPLE_1;
					this.body_2 = config.PURPLE_2;
					this.body_3 = config.PURPLE_3;
					this.body_4 = config.PURPLE_4;
					document.getElementById("snakeColor").style.backgroundColor = config.PURPLE_1;
				break;
				case config.PURPLE_1:				
					this.body_1 = config.BLUE_1;
					this.body_2 = config.BLUE_2;
					this.body_3 = config.BLUE_3;
					this.body_4 = config.BLUE_4;
					document.getElementById("snakeColor").style.backgroundColor = config.BLUE_1;
				break;
				default:
				break;
			}
		}
	}
}

config = {
	EASY_COLOR : "green",
	MEDIUM_COLOR : "white",
	HARD_COLOR : "red",
	WHITE : "white",
	BLACK : "black",
	BLUE_1 : "#9990ff",
	BLUE_2 : "#5e4fff",
	BLUE_3 : "#3e2dff",
	BLUE_4 : "#1500ff",
	GREEN_1 : "#00fb50",
	GREEN_2 : "#00db30",
	GREEN_3 : "#00a925",
	GREEN_4 : "#00761a",
	PURPLE_1 : "#7c00ff",
	PURPLE_2 : "#5700b2",
	PURPLE_3 : "#420087",
	PURPLE_4 : "#2a0056",
	NEXT_MOVE_TIME : 5,
	NEXT_MOVE_TIME_EASY : 7,
	NEXT_MOVE_TIME_HARD : 3,
	LIFE_TIME : 30,
	CANDY_AMOUNT : 30,
	SCORE_CANDY : 10,
	EMPTY_TILE : "gray",
	SNAKE_TILE_1 : "#1500ff",
	SNAKE_TILE_2 : "#3e2dff",
	SNAKE_TILE_3 : "#5e4fff",
	SNAKE_TILE_4 : "#9990ff",
	CANDY_TILE : "#ff0000",
	SNOUT_TILE : "white",
	KEY_LEFT : 65,
	KEY_UP : 87,
	KEY_RIGHT : 68,
	KEY_DOWN : 83,
	KEY_LEFT_2 : 37,
	KEY_UP_2 : 38,
	KEY_RIGHT_2 : 39,
	KEY_DOWN_2 : 40
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
				ctx.fillStyle = snakey.snout;
				break;
			case 2:
				this.life++;
				if (this.life >= config.LIFE_TIME) {
					ctx.fillStyle = config.EMPTY_TILE;
					this.color = 0;
				} else {
					if (this.life / config.LIFE_TIME >= 0.75) {
						ctx.fillStyle = snakey.body_1;
					} else if (this.life / config.LIFE_TIME >= 0.50) {
						ctx.fillStyle = snakey.body_2;
					} else if (this.life / config.LIFE_TIME >= 0.25) {
						ctx.fillStyle = snakey.body_3;
					} else if (this.life / config.LIFE_TIME >= 0.00) {
						ctx.fillStyle = snakey.body_4;
					}
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