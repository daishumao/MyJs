document.writeln("Hello World!")
var myObejct = {};
myObejct.double=function(){
    var helper = function(){
        console.log(this==window);
    }
    helper();
};
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]){
		this.prototype[name] = func;
	}
};

String.method('deentityify', function (){
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	return function () {
		return this.replace(/&([^&;]+);/g,
			function (a, b) {
				console.log("a:"+a);
				console.log("b:"+b);
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);
	}
}())
