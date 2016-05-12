area = {
	canvas : document.createElement('canvas'),
	start : function() {
		buttonInput.sColor = "blue";
		buttonInput.snakeColor();
		buttonInput.grid = true;
		buttonInput.gridToggle();
		buttonInput.mode = 0;
		buttonInput.difficulty();
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
		var candy = true;
		for (var i = 0; i < m.length; i++) {
			for (var j = 0; j < m.length; j++) {
				if (m[i][j].color == 3) {
					candy = false;
				}
				try {
					if (m[i][j].color == 1 && this.direction == "left" && nextMove >= config.NEXT_MOVE_TIME) {
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
				} catch (err) { console.log("Game Over") }
				try {
					if (m[i][j].color == 1 && this.direction == "up" && nextMove >= config.NEXT_MOVE_TIME) {
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
				} catch (err) { console.log("Game Over") }
				try {
					if (m[i][j].color == 1 && this.direction == "right" && nextMove >= config.NEXT_MOVE_TIME) {
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
				} catch (err) { console.log("Game Over") }
				try {
					if (m[i][j].color == 1 && this.direction == "down" && nextMove >= config.NEXT_MOVE_TIME) {
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
				} catch (err) { console.log("Game Over") }
			}
		}
		if (candy) {
			m[Math.floor((Math.random() * 30))][Math.floor((Math.random() * 30))].color = 3;
		}
		document.title = score + " Points";
	}
}

buttonInput = {
	snakeColor : function() {
		switch (this.sColor) {
			case "blue":
				this.sColor = "green";
				config.SNAKE_TILE_4 = "#00fb50";
				config.SNAKE_TILE_3 = "#00db30";
				config.SNAKE_TILE_2 = "#00a925";
				config.SNAKE_TILE_1 = "#00761a";
			break;
			case "green":
				this.sColor = "purple";
				config.SNAKE_TILE_4 = "#7c00ff";
				config.SNAKE_TILE_3 = "#5700b2";
				config.SNAKE_TILE_2 = "#400083";
				config.SNAKE_TILE_1 = "#2a0056";
			break;
			case "purple":
				this.sColor = "blue";
				config.SNAKE_TILE_1 = "#1500ff";
				config.SNAKE_TILE_2 = "#3e2dff";
				config.SNAKE_TILE_3 = "#5e4fff";
				config.SNAKE_TILE_4 = "#9990ff";
			break;
			default:
			break;
		}
	},
	gridToggle : function() {
		if (this.grid == true) {
			area.canvas.style.backgroundColor = config.EMPTY_TILE;
			document.getElementById("grid").innerHTML = "[Grid] Off";
			this.grid = false;
		} else {
			this.grid = true;
			area.canvas.style.backgroundColor = "white";
			document.getElementById("grid").innerHTML = "[Grid] On";
		}
	},
	difficulty : function() {
		this.mode++;
		if (this.mode > 2) {
			this.mode = 0;
		}
		switch (this.mode) {
			case 0:
				config.NEXT_MOVE_TIME = 7;
				config.SCORE_CANDY = 12;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Well-Fed";
				document.getElementById("difficulty").style.backgroundColor = "#ffc3c3";
			break;
			case 1:
				config.NEXT_MOVE_TIME = 5;
				config.SCORE_CANDY = 30;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Hungry";
				document.getElementById("difficulty").style.backgroundColor = "#ff7474";
			break;
			case 2:
				config.NEXT_MOVE_TIME = 3;
				config.SCORE_CANDY = 75;
				document.getElementById("difficulty").innerHTML = "[Difficulty] Starving";
				document.getElementById("difficulty").style.backgroundColor = "#ff1818";
			break;
			default:
			break;
		}
	}
}

config = {
	NEXT_MOVE_TIME : 5,
	LIFE_TIME : 30,
	CANDY_AMOUNT : 30,
	SCORE_CANDY : 10,
	EMPTY_TILE : "#818181",
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
				ctx.fillStyle = config.SNOUT_TILE;
				break;
			case 2:
				this.life++;
				if (this.life >= config.LIFE_TIME) {
					ctx.fillStyle = config.EMPTY_TILE;
					this.color = 0;
				} else {
					if (this.life / config.LIFE_TIME >= 0.75) {
						ctx.fillStyle = config.SNAKE_TILE_1;
					} else if (this.life / config.LIFE_TIME >= 0.50) {
						ctx.fillStyle = config.SNAKE_TILE_2;
					} else if (this.life / config.LIFE_TIME >= 0.25) {
						ctx.fillStyle = config.SNAKE_TILE_3;
					} else if (this.life / config.LIFE_TIME >= 0.00) {
						ctx.fillStyle = config.SNAKE_TILE_4;
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