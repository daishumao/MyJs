var c =document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var chinese ="恨爱"
chinese = chinese.split("");

var font_size = 64;
var columns = c.width/font_size;
var drops = [];

for(var x = 0;x < columns; x++){
	drops[x] = 0;
}
function draw(){
	ctx.fillStyle = "rgba(0,0,0,0.03)";
	ctx.fillRect(0,0,c.width,c.height);	
	ctx.fillStyle = "#FF0000";
	ctx.font = font_size + "px arial"
	for(var i = 0;i < drops.length;i++){
		var text =chinese[Math.floor(Math.random()*chinese.length)];
		if(Math.random()>0.975){
			ctx.fillText(text,i * font_size,Math.floor(Math.random()*c.height/font_size) * font_size);
		}
		if(Math.random()>0.998){
			ctx.font = font_size * 3 + "px arial"
			ctx.fillText(text,i * font_size,Math.floor(Math.random()*c.height/font_size/3) * font_size);
		}
	}

}
setInterval(draw,50)

