area = {
	canvas : document.createElement('canvas'),
	start : function() {
		keyPress = new keyHandler();
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
		this.nextMove = 0;
		this.m = [];
		for (var i = 0; i < 30; i++) {
			this.m[i] = [];
			for (var j = 0; j < 30; j++) {
				this.m[i][j] = new square(i, j, 0);
			}
		}
		this.score = 0;
		this.direction = 0;
		this.m[15][15].color = 1;
		this.canvas.width = 598;
		this.canvas.height = 598;
		this.newDirection = true;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(update, 20);
		window.addEventListener('keydown', function (e) {
			keyPress.keyDown(e);
		})
		window.addEventListener('keyup', function (e) {
			keyPress.keyUp(e);
		})
	},
	reset : function() {
		for (var i = 0; i < 30; i++) {
			for (var j = 0; j < 30; j++) {
				if (this.m.color != 0) {
					this.m[i][j].color = 0;
					this.m[i][j].life = 0;
					this.score = 0;
					config.LIFE_TIME = 30;
				}
			}
			this.m[15][15].color = 1;
			this.direction = 0;
		}
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	update : function() {
		if (this.nextMove >= snakey.velocity) {
			this.newDirection = true;
		}
		if (keyPress.log.length > 0 && this.newDirection) {
			this.direction = keyPress.log[0];
			this.newDirection = false;
		}
		for (var i = 0; i < this.m.length; i++) {
			for (var j = 0; j < this.m.length; j++) {
				try {
					if (this.m[i][j].color == 1 && this.direction == "left" && this.nextMove >= snakey.velocity) {
						this.m[i][j].color = 2;
						if (this.m[i][j - 1].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							this.score += config.SCORE_CANDY; 
						}
						if (this.m[i][j - 1].color == 0 || this.m[i][j - 1].color == 3) {
							this.m[i][j - 1].color = 1;
							this.m[i][j - 1].life = 0;
							this.nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (this.m[i][j].color == 1 && this.direction == "up" && this.nextMove >= snakey.velocity) {
						this.m[i][j].color = 2;
						if (this.m[i - 1][j].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							this.score += config.SCORE_CANDY; 
						}
						if (this.m[i - 1][j].color == 0 || this.m[i - 1][j].color == 3) {
							this.m[i - 1][j].color = 1;
							this.m[i - 1][j].life = 0;
							this.nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (this.m[i][j].color == 1 && this.direction == "right" && this.nextMove >= snakey.velocity) {
						this.m[i][j].color = 2;
						if (this.m[i][j + 1].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							this.score += config.SCORE_CANDY; 
						}
						if (this.m[i][j + 1].color == 0 || this.m[i][j + 1].color == 3) {
							this.m[i][j + 1].color = 1;
							this.m[i][j + 1].life = 0;
							this.nextMove = 0;
						}
					}
				} catch (err) {}
				try {
					if (this.m[i][j].color == 1 && this.direction == "down" && this.nextMove >= snakey.velocity) {
						this.m[i][j].color = 2;
						if (this.m[i + 1][j].color == 3) {
							config.LIFE_TIME += config.CANDY_AMOUNT;
							this.score += config.SCORE_CANDY; 
						}
						if (this.m[i + 1][j].color == 0 || this.m[i + 1][j].color == 3) {
							this.m[i + 1][j].color = 1;
							this.m[i + 1][j].life = 0;
							this.nextMove = 0;
						}
					}
				} catch (err) {}
			}
		}
		keyPress.log.shift();
		food.update();
	}
}

keyHandler = function() {
	this.log = [];
	this.keyDown = function(key) {
		this.keys = (this.keys || []);
		this.keys[key.keyCode] = true;
		this.update();
	}
	this.keyUp = function(key) {
		this.keys[key.keyCode] = false;
	}
	this.update = function() {
		if (this.keys) {
			if (this.keys[config.A_KEY] && area.direction != "left" && area.direction != "right") {
				this.log[this.log.length] = "left";
			}
			if (this.keys[config.W_KEY] && area.direction != "up" && area.direction != "down") {
				this.log[this.log.length] = "up";
			}
			if (this.keys[config.D_KEY] && area.direction != "right" && area.direction != "left") {
				this.log[this.log.length] = "right";
			}
			if (this.keys[config.S_KEY] && area.direction != "down" && area.direction != "up") {
				this.log[this.log.length] = "down";
			}
			if (this.keys[config.LEFT_KEY] && area.direction != "left" && area.direction != "right") {
				this.log[this.log.length] = "left";
			}
			if (this.keys[config.UP_KEY] && area.direction != "up" && area.direction != "down") {
				this.log[this.log.length] = "up";
			}
			if (this.keys[config.RIGHT_KEY] && area.direction != "right" && area.direction != "left") {
				this.log[this.log.length] = "right";
			}
			if (this.keys[config.DOWN_KEY] && area.direction != "down" && area.direction != "up") {
				this.log[this.log.length] = "down";
			}
		}
	}
}

candy = function() {
	this.update = function() {
		var candy = true;
		for (var i = 0; i < area.m.length; i++) {
			for (var j = 0; j < area.m.length; j++) {
				if (area.m[i][j].color == 3) {
					candy = false;
				}
			}
		}
		if (candy) {
			document.title = area.score + " Points";
			area.m[Math.floor((Math.random() * 30))][Math.floor((Math.random() * 30))].color = 3;
		}
	}
}

snake = function(
	invisible,  // True in hardcore mode; only last part of tail is visible
	velocity,   // Current snake speed. A lower value makes for a faster snake
	snout,      // The snake's head color
	body_1,     // Color of the tiles closest to the tail
	body_2,     // ...
	body_3,     // ...
	body_4      // Color of the tiles closest to the head
	) {
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
				document.getElementById("chuckNorrisMode").style.background = "white";
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
				document.getElementById("chuckNorrisMode").style.background = "red";
			break;
			default:
			break;
		}
	}
	this.speed = function() {
		switch (this.velocity) {
			case config.NEXT_MOVE_TIME:
				this.velocity = config.NEXT_MOVE_TIME_HARD;
				holder.velocity = config.NEXT_MOVE_TIME_HARD;
				candy.amount = 75;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Starving";
				document.getElementById("difficulty").style.backgroundColor = config.HARD_COLOR;
			break;
			case config.NEXT_MOVE_TIME_HARD:
				this.velocity = config.NEXT_MOVE_TIME_EASY;
				holder.velocity = config.NEXT_MOVE_TIME_EASY;
				candy.amount = 12;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Well-Fed";
				document.getElementById("difficulty").style.backgroundColor = config.EASY_COLOR;
			break;
			case config.NEXT_MOVE_TIME_EASY:
				this.velocity = config.NEXT_MOVE_TIME;
				holder.velocity = config.NEXT_MOVE_TIME;
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
	MEDIUM_COLOR : "pink",
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
	A_KEY : 65,
	W_KEY : 87,
	D_KEY : 68,
	S_KEY : 83,
	RIGHT_KEY : 39,
	UP_KEY : 38,
	LEFT_KEY : 37,
	DOWN_KEY : 40
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
	area.nextMove++;
	area.clear();
	area.update();
	for (var i = 0; i < area.m.length; i++) {
		for (var j = 0; j < area.m.length; j++) {
			area.m[i][j].update();
		}
	}
}