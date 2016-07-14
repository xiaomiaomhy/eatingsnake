//创建一个对象用于存储公共的变量
var Common={
	width:20,
	height:20,
	box:15,
	snake:null,
	food:null,
	timer:null,
	speed:300,
	$mainbox:$("#mainbox")
}

//创建蛇的对象
function Snake(){
	this.$head=null,  //蛇头
	this.tails=[] ,  //蛇尾
	this.dir="right",
	this.pos={x:0,y:0}
}
Snake.prototype={
	//创建蛇
	create:function(){
		
		this.$head=$('<span class="snakehead"></span>')
		this.$head.css({
			width:Common.box,
			height:Common.box,
			top:this.pos.y,
			left:this.pos.x
		})
		Common.$mainbox.append(this.$head)
	},
	//移动
	move:function(){
		var pos={x:this.pos.x,y:this.pos.y}
		
		switch(this.dir){
			case "up":
				this.pos.y-=Common.box
			break;
			case"down":
				this.pos.y+=Common.box
			break;
			case"left":
				this.pos.x-=Common.box
			break;
			case"right":
			 	this.pos.x+=Common.box
			break;
		}
		this.$head.css({
			top:this.pos.y,
			left:this.pos.x
		})
		this.pengLister()
		this.tailmove(pos)
	},
	//吃食物
	eat:function(){
		this.addTail()
		Common.food.updata()
	},
	//碰撞监听
	pengLister:function(){
		
		if(this.pos.x==Common.food.pos.x&&this.pos.y==Common.food.pos.y){
			this.eat()
		}
		if(this.pos.x<0||this.pos.x>(Common.width-1)*Common.box||this.pos.y<0||this.pos.y>(Common.height-1)*Common.box){
			this.over()
		}
		if(this.tails.length){
			for(var i=0;i<this.tails.length;i++){
				if(parseInt(this.tails[i].css("left"))==this.pos.x&&parseInt(this.tails[i].css("top"))==this.pos.y){
					this.over()
				}
			}
		}
	},
	//添加蛇尾
	addTail:function(){
		var tail=$('<span class="snake"></span>')
		Common.$mainbox.append(tail)
		this.tails.push(tail)
		console.log(this.tails)
	},
	//蛇尾移动
	tailmove:function(pos){
		if(this.tails.length){
			var last=this.tails.length-1;
			//console.log(last)
			this.tails[last].css({
				left:pos.x,
				top:pos.y
			})
			this.tails.unshift(this.tails.pop())
		}
	},
	//结束游戏
	over:function(){
		clearInterval(Common.timer)
		alert("game over")
	}
}

function Food(){
	this.$el=null;
	this.pos={x:0,y:0}
}
Food.prototype={
	create:function(){
		this.$el=$('<span class="food"></span>')
		this.createPosition()
		this.$el.css({
			width:Common.box,
			height:Common.box,
			top:this.pos.y,
			left:this.pos.x
		})
		Common.$mainbox.append(this.$el)
	},
	updata:function(){
		this.createPosition()
		this.$el.css({
			top:this.pos.y,
			left:this.pos.x
		})
	},
	createPosition:function(){
		var x=Math.floor(Math.random()*Common.width)*Common.box
		var y=Math.floor(Math.random()*Common.height)*Common.box
		this.pos={x:x,y:y}
	}
}
