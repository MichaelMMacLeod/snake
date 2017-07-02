(() => {
    'use strict';

    var $ = (id) => document.getElementById(id);
    var resize = (obj, width, height) => {
        canvas.width = width;
        canvas.height = height;
    };
    var update = (grid, context, width, height) => () => {
        clearGridPaint(context, width, height);
        paintGrid(grid, context, width, height);
        console.log(keys);
    };
    var getGrid = (rows, columns) => {
        var grid = [];
        for (let row = 0; row < rows; row++) {
            grid[row] = [];
            for (let col = 0; col < columns; col++) {
                grid[row][col] = 0;
            }
        }
        return grid;
    };
    var keydown = (keys) => (e) => keys[e.keyCode] = true;
    var keyup = (keys) => (e) => keys[e.keyCode] = false;
    var clearGridPaint = (context, width, height) => {
        context.clearRect(0, 0, width, height);
    };
    var paintGrid = (grid, context, width, height) => {
        var rowDensity = width / grid.length;
        var colDensity = height / grid.length;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                context.fillRect(row * rowDensity, col * colDensity, rowDensity, colDensity);
            }
        }
    };

    var canvas = $('canvas');
    var context = canvas.getContext('2d');
    var CANVAS_WIDTH = 600;
    var CANVAS_HEIGHT = 600;
    var grid = getGrid(30, 30);
    var keys = [];

    window.addEventListener('resize', resize(canvas, CANVAS_WIDTH, CANVAS_HEIGHT));
    window.addEventListener('keydown', keydown(keys));
    window.addEventListener('keyup', keyup(keys));
    window.setInterval(update(grid, context, CANVAS_WIDTH, CANVAS_HEIGHT), 20);
})();


