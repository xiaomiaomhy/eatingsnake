$(document).ready(function(){
	Common.$mainbox.width(Common.width*Common.box)
	Common.$mainbox.height(Common.height*Common.box)
	
	Common.snake=new Snake()
	Common.snake.create()
	Common.food=new Food()
	Common.food.create()
	
	Common.timer=setInterval(function(){
		Common.snake.move()
	},Common.speed)
	
	$(document).swipe({
	swipe:function(dir){
		var deriction=arguments[1]
		
		//console.log(Common.snake.dir)//当前蛇头运动的方向
		//console.log(deriction)  //鼠标改变蛇头的方向
		if(Common.snake.dir=="right"&&deriction=="left"||Common.snake.dir=="left"&&deriction=="right"){
			deriction=Common.snake.dir
		}
		if(Common.snake.dir=="up"&&deriction=="down"||Common.snake.dir=="down"&&deriction=="up"){
			deriction=Common.snake.dir
		}
		Common.snake.dir=deriction
	}
})
})





