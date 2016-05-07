area = {
	canvas : document.createElement('canvas'),
	start : function() {
		m = []
		for (var i = 0; i < 25; i++) {
			m[i] = [];
			for (var j = 0; j < 25; j++) {
				m[i][j] = 0;
			}
		}
		this.canvas.width = 498;
		this.canvas.height = 498;
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
		for (var i = 0; i < m.length; i++) {
			for (var j = 0; j < m.length; j++) {
				m[i][j] = new square(i, j, "grey");
			}
		}
	}
}

square = function(row, column, color) {
	this.row = row * 20;
	this.column = column * 20;
	this.color = color;
	this.update = function() {
		ctx = area.context;
		ctx.save;
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