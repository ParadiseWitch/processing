class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
}

class Rectangle{
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	//method
	contains(point){
		return(point.x >= this.x -this.w &&
			point.x <= this.x + this.w &&
			point.y >= this.y - this.h &&
			point.y <= this.y + this.h);
	}
}


class Quadtree {
	constructor(boundary,n) {
		//成员变量boundary 是一个 Rectangle类
		//分成capacity个分支
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;

	}

	// methods
	subdivde(){
		// _____________ 
		//|		|		|	  
		//|	ne	|	nw 	|
		//|-----|-------|
		//|	se	|	sw  |
		//|_____|_______|	
		
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w;
		let h = this.boundary.h;

		let ne = new Rectangle(x + w/2,y - h/2,w/2,h/2);
		this.northeast = new Quadtree(ne,this.capacity);
		let nw = new Rectangle(x - w/2,y - h/2,w/2,h/2);
		this.northwest = new Quadtree(nw,this.capacity);
		let se = new Rectangle(x + w/2,y + h/2,w/2,h/2);
		this.southeast = new Quadtree(se,this.capacity);
		let sw = new Rectangle(x - w/2,y + h/2,w/2,h/2);
		this.southwest = new Quadtree(sw,this.capacity);
		this.divided = true;

	}

	insert(point){

		//该点不在矩形内就直接返回
		if(!this.boundary.contains(point)){
			return false;
		}

		if(this.points.length < this.capacity){
			this.points.push(point);
			return true;
		}else{
			if(!this.divided){
				this.subdivde();
			}

		    if (this.northeast.insert(point)) {
		        return true;
		      } else if (this.northwest.insert(point)) {
		        return true;
		      } else if (this.southeast.insert(point)) {
		        return true;
		      } else if (this.southwest.insert(point)) {
		        return true;
		      }
		}
	}
	show(){
		stroke(255);
		strokeWeight(1);

		noFill();
		rectMode(CENTER);
		rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
		if(this.divided){
			this.northeast.show();
			this.northwest.show();
			this.southeast.show();
			this.southwest.show();
		}
		// 显示点
		// for(let p of this.points){
		// 	strokeWeight(1);
		// 	point(p.x,p.y);
		// }
		

	}
}