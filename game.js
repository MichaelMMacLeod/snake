area = {
	canvas : document.createElement('canvas'),
	start : function() {
		this.canvas.width = 500;
		this.canvas.height = 500;
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
	}
}

update = function() {
	area.clear();
}