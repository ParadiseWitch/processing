var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
	createCanvas(200,200);
	pixelDensity(1);
	grid = [];
	next = [];
	for(var x = 0;x < width;x++) {
		grid[x] = [];
		next[x] = [];
		for(var y = 0;y < height;y++) {
			grid[x][y] = {a:1,b:0};
			// 下面的a为1，为0时出现边缘
			next[x][y] = {a:1,b:0};
		}
	}

	// 需要一块区域来引起反应（而不是一个点）
	for (var i = 95; i < 105; i++) {
		for (var j = 95; j < 105; j++) {
			grid[i][j].b = 1;		
		}
	}		
}


function draw() {
	background(51);
	// frameRate(5);

	for (var x = 1; x < width - 1; x++) {
		for (var y = 1; y<height - 1; y++) {
			var a = grid[x][y].a;
			var b = grid[x][y].b;

			next[x][y].a = a + 
						   (dA * laplaceA(x,y)) - 
						   (a * b * b) +
						   (feed * (1 - a));
			next[x][y].b = b + 
						   (dB * laplaceB(x,y)) +
						   (a * b * b) -
						   ((k + feed) * b);

		}
	}


	loadPixels();
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var pix = (x + y*width)*4;
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = floor((a - b) * 255) ;
			pixels[pix + 0] = c;
			pixels[pix + 1] = c;
			pixels[pix + 2] = c;
			pixels[pix + 3] = 255;
		}
	}
	updatePixels();

	swap();
}


function laplaceA(x,y){
	var sumA  = 0;
	sumA += grid[x][y].a * -1;
	sumA += grid[x-1][y].a * 0.2;
	sumA += grid[x+1][y].a * 0.2;
	sumA += grid[x][y-1].a * 0.2;
	sumA += grid[x][y+1].a * 0.2;
	sumA += grid[x-1][y-1].a * .05;
	sumA += grid[x-1][y+1].a * .05;
	sumA += grid[x+1][y-1].a * .05;
	sumA += grid[x+1][y+1].a * .05;

	return sumA;
}

function laplaceB(x,y){
	var sumB  = 0;
	sumB += grid[x][y].b * -1;
	sumB += grid[x-1][y].b * 0.2;
	sumB += grid[x+1][y].b * 0.2;
	sumB += grid[x][y-1].b * 0.2;
	sumB += grid[x][y+1].b * 0.2;
	sumB += grid[x-1][y-1].b * .05;
	sumB += grid[x-1][y+1].b * .05;
	sumB += grid[x+1][y-1].b * .05;
	sumB += grid[x+1][y+1].b * .05;

	return sumB;
}


function swap(){
	var temp = grid;
	grid = next;
	next = temp;

}
