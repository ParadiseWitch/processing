let qtree;

function setup() {
	createCanvas(400,400);

	let boundary = new Rectangle(200,200,200,200);

	qtree = new Quadtree(boundary,4);
	console.log(qtree);

	//在画布上随机 n 个点并插入到qt
/*	for(let i=0;i<500;i++){
		let p = new Point(random(width),random(height));
		qt.insert(p);
	}

	background(0);
	qt.show();*/
}


function draw() {
	if(mouseIsPressed){
		for(let i=0;i < 5; i++){
			let m = new Point(mouseX + random(-5,5),mouseY + random(-5,5));
			qtree.insert(m);
		}
	}
	background(0);
	qtree.show();
}
