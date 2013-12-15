window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var W = window.screen.width, H = window.screen.height;
	canvas.width = 960;
	canvas.height = 540;
	var box =canvas.getBoundingClientRect();
	var particles = [];
	var mouse = {};
	var particle_count = 50;
	//各类参数初始化

	for(var i = 0; i < particle_count; i++){
		particles.push(new particle());
	}
	//初始化粒子数组
	
	canvas.addEventListener('mousemove',track_mouse,false);
	//监控鼠标移动绑定事件

	function track_mouse(e){
		if(e.pageX - box.left > 0 && e.pageY - box.top >0){
			mouse.x = e.pageX - box.left;
			mouse.y = e.pageY - box.top;
		}
	}


	function particle(){
		//粒子的属性设置
		this.speed = {
			x: -2 + Math.random() * 5, 
			y: -15 + Math.random() * 10
		};
		if (mouse.x && mouse.y){
			this.location = {x:mouse.x,y:mouse.y};
		}else{
			this.location ={x:W/2,y:H/2};
		}
		this.radius = 10 + Math.random() * 20;
		this.life = 20 + Math.random() * 10;
		this.remaining_life = this.life;
		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*255);
		this.b = Math.round(Math.random()*255);
	}


	function draw(){
		//图像绘制
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";
		for(var i = 0; i < particles.length; i++){
			var p = particles[i];
			ctx.beginPath();
			p.opacity = Math.round(p.remaining_life/p.life*100)/100;
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			if(p.remaining_life < 0 || p.radius < 0)
			{
				particles[i] = new particle();
			}			
		}		
	}

	//定时循环出发draw函数
	setInterval(draw, 33);
}