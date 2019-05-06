var snakeGame={
    arr:[
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
    ],
    snakeObj:[{i:0,j:0}],//数组对象，用来保存蛇的位置信息
    score:0,//用来计算分数
    foodList:[],//保存食物信息列表
    foodObj:[],//用来保存当前食物的信息
    drc:"right",//方向
    speed:600,//蛇的速度
    timer:null,//定时器
    isOver:false,//游戏是否结束的判断
    init:function(){
        this.snakeObj=[];//初始化蛇的位置
        this.snakeObj[0]={i:0,j:0};//初始化蛇的位置
        this.drc="right";//初始化方向
        this.clearArr();//清空数组
        this.upArr();//更新整体的数组，将蛇映射进去
        this.upFoodList();//更新食物列表
        this.createFood();//生成食物，并且将食物映射进数组
        this.upView();//根据蛇数组和食物数组更新页面
//        this.move();
    },
    doSnakeArrObj:function(direction){//对蛇数组对象进行操作，实现蛇的移动
        var _this=this;
        var first={};
        switch(direction){
            case "left":
                first.i=_this.snakeObj[0].i;
                first.j=_this.snakeObj[0].j;
                first.j--;
            break;
            case "right":
                first.i=_this.snakeObj[0].i;
                first.j=_this.snakeObj[0].j;
                first.j++;
            break;
            case "top":
                first.i=_this.snakeObj[0].i;
                first.j=_this.snakeObj[0].j;
                first.i--;
            break;
            case "bottom":
                first.i=_this.snakeObj[0].i;
                first.j=_this.snakeObj[0].j;
                first.i++;
            break;
        }
            _this.snakeObj.unshift(first);
            _this.snakeObj.pop();
            _this.upArr();
    },
    clearArr:function(){//数组清空
        for(var i=0,len=this.arr.length;i<len;i++){
            for(var j=0,len=this.arr[i].length;j<len;j++){
                this.arr[i][j]=0;
            }
        }
    },
    upArr:function(){//将蛇和食物映射在数组上
        var _this=this;
        for(var k=0,len=_this.snakeObj.length;k<len;k++){
            _this.arr[_this.snakeObj[k].i][_this.snakeObj[k].j]=1;
        }
        if(_this.foodObj.length!=0){
            _this.arr[_this.foodObj[0].i][_this.foodObj[0].j]=2;
        }
    },
    upView:function(){//将数组里的蛇映射在页面上
        var _this=this;
        var table=document.getElementsByClassName("snake_box")[0];
        $(table).find("td").removeClass("snake");
        $(table).find("td").removeClass("food");
        for(var k=0,len=_this.snakeObj.length;k<len;k++){
            $(table).find("tr").eq(_this.snakeObj[k].i).find("td").eq(_this.snakeObj[k].j).addClass("snake");
        }
        if(_this.foodObj.length!=0){
            $(table).find("tr").eq(_this.foodObj[0].i).find("td").eq(_this.foodObj[0].j).addClass("food");
        }
    },
    addSize:function(){//添加蛇的长度
        this.snakeObj.unshift(this.snakeObj[0]);//压入第一个
    },
    upFoodList:function(){//找出当前可以生成食物的位置，并且保存
        for(var i=0,len=this.arr.length;i<len;i++){
            for(var j=0,len=this.arr[i].length;j<len;j++){
                if(!this.arr[i][j]){
                    var food={};
                    food.i=i;
                    food.j=j;
                    this.foodList.push(food);
                }
            }
        }
    },
    createFood:function(){//随机生成位置，之后查找,然后设置进数组里
        var _this=this;
        var len=parseInt(Math.random()*(_this.foodList.length+1));
        var foods=this.foodList[len];
        this.foodObj[0]=foods;
        this.arr[_this.foodObj[0].i][_this.foodObj[0].j]=2;
        console.log(this.foodObj[0]);
    },
    move:function(){//让蛇移动起来
        var _this=this;
        this.timer=setTimeout(function(){
            _this.gameOver();//先进行游戏是否结束的判断
            if(_this.isOver){//如果游戏结束，就直接输出gameover
                console.log("gameover");
                alert("gameover");
                _this.stop();
            }else{
                _this.doSnakeArrObj(_this.drc);//操作蛇数组
                _this.clearArr();//清空数组
                _this.upArr();//更新数组
                _this.upFoodList();//更新食物列表
                _this.upView();
                _this.move();
            }
        },_this.speed);
    },
    stop:function(){//提供蛇停止的方法
        var _this=this;
        clearTimeout(_this.timer);
        this.timer=null;
    },
    doScore:function(){//用来计算分数
        this.score++;
        if(this.score>90){
            this.speed=50;
        }else if(this.score>40){
            this.speed=200;
        }else if(this.score>30){
            this.speed=400;
        }else if(this.score>20){
            this.speed=600;
        }else if(this.score>5){
            this.speed=800;
        }
        console.log(this.score);
    },
    gameOver:function(){//用来做游戏结束的判定
        //拿到蛇头
        var _this=this;
        var hi=this.snakeObj[0].i;
        var hj=this.snakeObj[0].j;
        //拿到方向
        var first={};
        switch(_this.drc){
            case "left":hj--;break;
            case "right":hj++;break;
            case "top":hi--;break;
            case "bottom":hi++;break;
        }
        //之后进行边界判断，判断下一步有没有东西在
        this.isOver=((hi>9||hi<0)||(hj>9||hj<0));
        if(!this.isOver){//如果没有超出边界，此时判断下一步的位置是什么东西
            if(_this.arr[hi][hj]==1){
                this.isOver=true;
            }else if(_this.arr[hi][hj]==2){
                this.doScore();
                this.addSize();
                this.foodObj=[];
                this.createFood();//生成食物
            }
        }
    }
}
/*初始化*/
snakeGame.init();




