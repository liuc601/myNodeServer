var ctrlBox={
    top:0,//元素距顶部的距离
    left:0,//元素距离屏幕左边的距离
    ele:null,
    iEle:null,
    init:function(select){
        this.ele=$(select);
        this.iEle=$(select).find("i");
        this.bindEvent(select);
        this.top=$(select).offset().top;
        this.left=$(select).offset().left;
    },
    bindEvent:function(select){
        var ele=$(select);
        var _this=this;
        ele[0].addEventListener("touchstart",function(e){
            var touch=e.targetTouches[0];
            var x=touch.pageX-_this.left;
            var y=touch.pageY-_this.top;
            _this.ballMove(x,y);
        });
        ele[0].addEventListener("touchmove",function(e){
            var touch=e.changedTouches[0];
            var x=touch.pageX-_this.left;
            var y=touch.pageY-_this.top;
            console.log(y);
        });
        ele[0].addEventListener("touchend",function(e){
            var touch=e.changedTouches[0];
        });
    },
    ballMove:function(x,y){
        this.iEle.css("transform","translate3d("+(x-17.5)+"px,"+(y-17.5)+"px,0)");
    }
}































