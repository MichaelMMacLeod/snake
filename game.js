update = function()
{
	area.clear();
	area.update();
	for (var i = 0; i < 30; i++)
	{
		for (var j = 0; j < 30; j++)
		{
			area.m[i][j].update();
		}
	}
}

config = 
{	
	LENGTH_DEFAULT : 20,
	LENGTH_ADD : 20,
	KEY_ARROW_LEFT : 37,
	KEY_ARROW_UP : 38,
	KEY_ARROW_RIGHT : 39,
	KEY_ARROW_DOWN : 40,
	KEY_LEFT : 65,
	KEY_UP : 87,
	KEY_RIGHT : 68,
	KEY_DOWN : 83,
	LIFE_TIME : 15,
	PIECE_EMPTY : "silver",
	PIECE_SNOUT : "white",
	PIECE_CANDY : "red",
	SPEED_NORMAL : 5,
	SPEED_HARD : 3,
	SPEED_EASY : 7,
}

area = 
{
	canvas : document.createElement('canvas'),
	start : function() 
	{
		food = new candy();
		snake = new player(
			config.SPEED_NORMAL,
			config.PIECE_SNOUT,
			0,
			config.LENGTH_DEFAULT,
			"blue",
			false);
		this.m = [];
		for (var i = 0; i < 30; i++)
		{
			this.m[i] = [];
			for (var j = 0; j < 30; j++)
			{
				this.m[i][j] = new piece(i, j, "empty");
			}
		}
		this.m[15][15].color = "snout";
		this.canvas.width = 598;
		this.canvas.height = 598;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(update, 20);
		window.addEventListener('keydown', function(e) 
		{
			area.keys = (area.keys || []);
			area.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e) 
		{
			area.keys[e.keyCode] = false;
		})
	},
	clear : function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	reset : function()
	{
		for (var i = 0; i < 30; i++)
		{
			for (var j = 0; j < 30; j++)
			{
				this.m[i][j].color = "empty";
				this.m[i][j].life = 0;
				snake.length = config.LENGTH_DEFAULT;
			}
		}
		this.m[15][15].color = "snout";
		snake.direction = 0;
		snake.log = [];
		snake.body = [];
	},
	update : function()
	{
		if (snake.invisible)
		{
			document.title = Math.round(1.2 * snake.body.length) + " Points";
		}
		else
		{
			document.title = snake.body.length + " Points";
		}
		food.update();
		snake.newDirection();
		this.nextMove = this.nextMove + 1 || 0;
		for (var i = 0; i < 30; i++)
		{
			for (var j = 0; j < 30; j++)
			{
				try
				{
					if (snake.direction == "left" && 
						this.nextMove > snake.velocity && 
						this.m[i][j].color == "snout")
					{
						snake.body[snake.body.length] = new bodyPart(i, j); 
						this.m[i][j].color = "body";
						if (this.m[i][j - 1].color == "empty" ||
							this.m[i][j - 1].color == "candy")
						{
							if (this.m[i][j - 1].color == "candy")
							{
								snake.length += config.LENGTH_ADD;
							}
							this.m[i][j - 1].color = "snout";
							this.nextMove = 0;
						}
					}
					if (snake.direction == "up" && 
						this.nextMove > snake.velocity && 
						this.m[i][j].color == "snout")
					{
						snake.body[snake.body.length] = new bodyPart(i, j); 
						this.m[i][j].color = "body";
						if (this.m[i - 1][j].color == "empty" ||
							this.m[i - 1][j].color == "candy") 
						{
							if (this.m[i - 1][j].color == "candy")
							{
								snake.length += config.LENGTH_ADD; 
							}
							this.m[i - 1][j].color = "snout";
							this.nextMove = 0;
						}
					}
					if (snake.direction == "right" && 
						this.nextMove > snake.velocity && 
						this.m[i][j].color == "snout")
					{
						snake.body[snake.body.length] = new bodyPart(i, j); 
						this.m[i][j].color = "body";
						if (this.m[i][j + 1].color == "empty" ||
							this.m[i][j + 1].color == "candy")
						{
							if (this.m[i][j + 1].color == "candy")
							{
								snake.length += config.LENGTH_ADD; 
							}
							this.m[i][j + 1].color = "snout";
							this.nextMove = 0;
						}
					}
					if (snake.direction == "down" && 
						this.nextMove > snake.velocity && 
						this.m[i][j].color == "snout")
					{
						snake.body[snake.body.length] = new bodyPart(i, j); 
						this.m[i][j].color = "body";
						if (this.m[i + 1][j].color == "empty" ||
							this.m[i + 1][j].color == "candy")
						{
							if (this.m[i + 1][j].color == "candy")
							{
								snake.length += config.LENGTH_ADD; 
							}
							this.m[i + 1][j].color = "snout";
							this.nextMove = 0;
						}
					}
				}
				catch (e)
				{}
			}			
		}
	}
}

candy = function()
{
	this.update = function()
	{
		var candy = true;
		for (var i = 0; i < 30; i++)
		{
			for (var j = 0; j < 30; j++)
			{
				if (area.m[i][j].color == "candy")
				{
					candy = false;
				}
			}
		}
		if (candy)
		{
			// hold onto your pants; this might take a while depending on how the gods of randomness are feeling today. By brute force, it places a piece of food on an unoccupied tile.
			var column = Math.floor((Math.random() * 30));
			var row = Math.floor((Math.random() * 30));
			var draw = true;
			for (var i = 0; i < snake.body.length; i++)
			{
				if (area.m[column][row].color == "body" ||
					area.m[column][row].color == "snout")
				{
					draw = false;
				}
			}
			if (draw)
			{
				area.m[column][row].color = "candy";
			}
		}
	}
}

piece = function(
	column,     // As column approaches +infinity, the piece moves downwards
	row,        // As row approaches +infinity, the piece moves right
	color       // Color of the tile. See config for values
	)
{
	this.row = row * 20;
	this.column = column * 20;
	this.color = color;
	this.life = 0;
	this.update = function()
	{
		ctx = area.context;
		ctx.save;
		switch (this.color)
		{
			case "empty":
				ctx.fillStyle = config.PIECE_EMPTY;
			break;
			case "snout":
				ctx.fillStyle = snake.snout;
			break;
			case "body":
				this.life++;
				if (this.life > snake.length)
				{
					snake.body.shift();
					this.life = 0;
					this.color = "empty";
					this.update();
				}
				else
				{
					if (!snake.invisible) 
					{
						for (var i = 0; i < snake.body.length; i++)
						{
							if (snake.body[i].column == this.column &&
								snake.body[i].row == this.row)
							{
								switch (snake.color) 
								{
									case "blue":
										var r = 0;
										var g = 0;
										var b = 255;
										r += Math.round(255 / snake.body.length * i);
										g += Math.round(255 / snake.body.length * i);
										ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
									break;
									case "green":
										var r = 0;
										var g = 255;
										var b = 0;
										r += Math.round(255 / snake.body.length * i);
										b += Math.round(255 / snake.body.length * i);
										ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
									break;
									case "purple":
										var r = 255;
										var g = 0;
										var b = 255;
										g += Math.round(255 / snake.body.length * i);
										ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
									break;
									default:
									break;
								}
							}
						}
					}
					else
					{
						if (snake.body[0].column == this.column &&
							snake.body[0].row == this.row)
						{
							switch (snake.color)
							{
								case "blue":
									ctx.fillStyle = "rgb(0, 0, 255)";
								break;
								case "green":
									ctx.fillStyle = "rgb(0, 255, 0)";
								break;
								case "purple":
									ctx.fillStyle = "rgb(255, 0, 255)";
								break;
								default:
								break;
							}
						}
						else
						{
							ctx.fillStyle = config.PIECE_EMPTY;
						}
					}
				}
			break;
			case "candy":
				ctx.fillStyle = config.PIECE_CANDY;
			break;
			default:
			break;
		}
		ctx.fillRect(this.row, this.column, 18, 18);
		ctx.restore;
	}
}

bodyPart = function(
	column,        // As column approaches +infinity, the piece moves downwards
	row            // As row approaches +infinity, the piece moves right
	)
{
	this.column = column * 20;
	this.row = row * 20;
}

player = function(
	velocity,    // Current snake speed. A lower value makes for a faster snake
	snout,       // The snake's head color
	direction,   // Direction the snake is traveling
	length,      // Length of the snake
	color,       // Color of the body of the snake
	invisible    // Turns every tile except the first and last invisible.
	) 
{
	this.log = []; // Each movement key press is added to this array
	this.body = []; // Each snake tile (aside from head) is added to this array
	this.velocity = velocity;
	this.snout = snout;
	this.direction = direction;
	this.length = length;
	this.color = color;
	this.invisible = invisible;
	this.hardcore = function()
	{
		this.invisible = !this.invisible;
		if (this.invisible)
		{
			document.getElementById("chuckNorrisMode").style.backgroundImage = "url('button-ghost-on.png')";
		}
		else
		{
			document.getElementById("chuckNorrisMode").style.backgroundImage = "url('button-ghost-off.png')";
		}
	}
	this.newColor = function()
	{
		switch (this.color) {
			case "blue":
				this.color = "green";
				document.getElementById("snakeColor").style.backgroundImage = "url('button-color-green.png')";
			break;
			case "green":
				this.color = "purple";
				document.getElementById("snakeColor").style.backgroundImage = "url('button-color-pink.png')";
			break;
			case "purple":		
				this.color = "blue";
				document.getElementById("snakeColor").style.backgroundImage = "url('button-color-blue.png')";
			break;
			default:
			break;
		}
	}
	this.newDirection = function()
	{
		// Adds certain key presses to the log
		if (area.keys && 
			area.keys[config.KEY_LEFT] &&
			this.log[this.log.length - 1] != "left" &&
			this.log[this.log.length - 1] != "right")
		{
			this.log[this.log.length] = "left";
		}
		if (area.keys && 
			area.keys[config.KEY_UP] &&
			this.log[this.log.length - 1] != "up" &&
			this.log[this.log.length - 1] != "down")
		{
			this.log[this.log.length] = "up";
		}
		if (area.keys && 
			area.keys[config.KEY_RIGHT] &&
			this.log[this.log.length - 1] != "right" &&
			this.log[this.log.length - 1] != "left")
		{
			this.log[this.log.length] = "right";
		}
		if (area.keys && 
			area.keys[config.KEY_DOWN] &&
			this.log[this.log.length - 1] != "down" &&
			this.log[this.log.length - 1] != "up")
		{
			this.log[this.log.length] = "down";
		}
		if (area.keys && 
			area.keys[config.KEY_ARROW_LEFT] &&
			this.log[this.log.length - 1] != "left" &&
			this.log[this.log.length - 1] != "right")
		{
			this.log[this.log.length] = "left";
		}
		if (area.keys && 
			area.keys[config.KEY_ARROW_UP] &&
			this.log[this.log.length - 1] != "up" &&
			this.log[this.log.length - 1] != "down")
		{
			this.log[this.log.length] = "up";
		}
		if (area.keys && 
			area.keys[config.KEY_ARROW_RIGHT] &&
			this.log[this.log.length - 1] != "right" &&
			this.log[this.log.length - 1] != "left")
		{
			this.log[this.log.length] = "right";
		}
		if (area.keys && 
			area.keys[config.KEY_ARROW_DOWN] &&
			this.log[this.log.length - 1] != "down" &&
			this.log[this.log.length - 1] != "up")
		{
			this.log[this.log.length] = "down";
		}
		this.direction = this.log[0];
		if (this.log.length > 2) 
		// Holding down two keys won't clog up the array
		{
			this.log = [this.log[0], this.log[1]];
		}
		if (area.nextMove >= snake.velocity) 
		{
			if (this.log.length > 1)
			{
				this.log.shift();
			}
			this.direction = this.log[0];
		}
	}
	this.speed = function() {
		switch (this.velocity) {
			case config.SPEED_NORMAL:
				this.velocity = config.SPEED_HARD;
				document.getElementById("difficulty").style.backgroundImage = "url('button-speed-hard.png')";
			break;
			case config.SPEED_HARD:
				this.velocity = config.SPEED_EASY;
				document.getElementById("difficulty").style.backgroundImage = "url('button-speed-easy.png')";
			break;
			case config.SPEED_EASY:
				this.velocity = config.SPEED_NORMAL;
				document.getElementById("difficulty").style.backgroundImage = "url('button-speed-medium.png')";
			break;
			default:
			break;
		}
	}
}