$(function(){
    //产品移入移出
    infor_2()
    //拖拽
    drag()
    //加载json里的信息  新建节点  添加到全部商品列表里
    $.ajax({
        url:"../json/goodsCategory.json",
        type:"get",
        success:function(res){
            for(var i = 0 ;i<res.length;i++){
                var newLi = $('<li class="class-item"></li>');
                newLi.appendTo($('#menu'));
                var newA = $('<a href="#" target="_blank"><div class="cate"><img src='+ res[i].img +'>'+ res[i].title +'</div></a>');
                var newDiv = $('<div class="exh"><ul class="left"></ul><ul class="right"></ul></div>');
                newA.appendTo($('#menu').find('.class-item').eq(i));
                newDiv.appendTo($('#menu').find('.class-item').eq(i));
                for(var j=0;j<res[i].classify.length;j++){
                    var newUl1_li = $('<li><a href="#" target="_blank"><img src='+ res[i].classify[j].img +' alt="" width="40" height="40"><span>'+ res[i].classify[j].title+'</span></a></li>');
                    newUl1_li.appendTo($('#menu').find('.exh').eq(i).find('.left'));
                }
                if(res[i].recommend){
                    for(var k=0;k<res[i].recommend.length;k++){
                        var newUl2_li = $('<a href="#"target="_blank"><li><div class="info_new"><p class="name">'+res[i].recommend[k].title+'</p><p class="price"><span class="rmb">¥</span>'+res[i].recommend[k].price+'</p></div><img class="change_img"src='+res[i].recommend[k].img+' alt=""></li></a>');
                        newUl2_li.appendTo($('#menu').find('.exh').eq(i).find('.right'));
                    }
                }

            }
            setClass_item();
        }
    });


    //按钮移入切换轮播图
    var oBtn = $("#control").find("li");
    var oA = $(".img_box").find("a");
    oBtn.mouseover(function(){
        clearInterval(timer);
        iNow = $(this).index();
        tab();
    });
    oA.mouseover(function(){
        clearInterval(timer);
    });
    oBtn.add(oA).mouseout(function(){
        timer = setInterval(function(){
            timerInner()
        },3000);
    })

    //左右箭头切换图片
    prev_next();


    //加载json
    $.ajax({
        url:"../json/banner.json",
        type:"get",
        success:function(res){
            //banner图片
            banner1 = res[0].banner1;
            var myA = $('.img_box').find("a");
            // console.log(myA.eq(1));
            for(var i = 0;i<myA.length;i++){
                myA.eq(i).attr("style","background:url("+banner1[i].img+") no-repeat center center / cover;opacity:0;display:none")
            }
            //将第一张显示
            myA.eq(0).css("display","block");
            myA.eq(0).css("opacity","1");
            //启动定时器  调用  调用切换图片的函数
            timer = setInterval(function(){
                timerInner()
            },3000);

            //功能导航
            func_nav = res[1].func_nav;
            var navImg = $('#func_nav').find('img');
            for(var i = 0;i<func_nav.length;i++){
                navImg.eq(i+4).attr("src",func_nav[i].img);
            }

            //热门推荐
            hot_groom = res[2].banner2;
            for(var i = 0;i<hot_groom.length*2;i++){
                j = i%hot_groom.length;
                var newLi = $('<li><a href="#"><img src='+ hot_groom[j].img +'><div class="info"><p class="name">'+hot_groom[j].title+'</p><p class="price"><span class="rmb">¥</span>'+hot_groom[j].pic+'</p></div></a></li>');
                newLi.appendTo($("#hot_groom").find("ul"));
            }
            info();

            //广告
            $('#ad').find('img').attr("src",res[3].ad_img);

            //视频
            var video = res[4].video.length;
            for(var i = 0;i<video;i++){
                $('.bri-video').find("img").eq(i).attr("src",res[4].video[i].img);
            }
            var col = $(".bri-video").find("ul").find("li").clone();
            var col1 = $(".bri-video").find("ul").find("li").clone();
            col.appendTo($(".bri-video").find("ul"));
            col1.appendTo($(".bri-video").find("ul"));
            $(".bri-video").find("ul").css("left",-parseInt($(".bri-video").find("ul").css("width"))/3);

            //login
            $('#login_body').css("backgroundImage","url("+res[5].login+")")
            //register
            $('#register_body').find("img").attr("src",res[6].register)
        }
    })

    //加载json
    $.ajax({
        url:"../json/goods.json",
        type:"get",
        success:function(res){
            // console.log(res)
            var category = $('.category');
            for(var i = 0;i<category.length;i++){
                //获取到对应的对象名
                var topic = category.eq(i).find(".topic").find("a").eq(0).html();
                for(var j = 0;j<res[i][topic].length;j++){
                    category.eq(i).find("li").eq(j).find("p").eq(0).html(res[i][topic][j].title);
                    category.eq(i).find("li").eq(j).find("p").eq(1).html("<span class='rmb'>¥</span>"+res[i][topic][j].pic);
                    category.eq(i).find("li").eq(j).find('img').attr("src",res[i][topic][j].img);
                }
                // console.log(res[i].电视);
                //
            }
        }
    })
    var myLis = $('#fixed-nav').find('li');
    for(var i = 0;i<myLis.length-1;i++){
        myLis.eq(i).hover(function(){
            $(this).css("background-position","-64px center");
            $(this).css("background-color","#000");
        },function(){
            $(this).css("background-position","0 center");
            $(this).css("background-color","#fff");
        })
    }
    myLis.eq(myLis.length-1).click(function(){
        $("body").animate({scrollTop: 0})
    })
    $(window).scroll(function(){
        var scr = $(window).scrollTop();
        var hei =document.documentElement.clientHeight;
        if(scr >= hei){
            $('.back-top').css('visibility',"visible");
        }else{
            $('.back-top').css('visibility',"hidden");
        }
    })
});
//全部商品列表 添加移入移出事件
function setClass_item(){
    var class_item = $('.class-item');
            // console.log(class_item);
    for(var i =0;i< class_item.length;i++){
        class_item.eq(i).mouseenter(function(){
            $(this).find($('.exh')).css("display","block");
        });
        class_item.eq(i).mouseleave(function(){
            $(this).find($('.exh')).css("display","none");
        });
    }
}
//轮播图
//调用切换图片的函数并计数
var iNow = 0;
var timer = null;
function timerInner(){
    iNow++;
    tab();
}

//切换图片的函数
function tab(){
    var oBtn = $("#control").find("li");
    var oA = $(".img_box").find("a");
    iNow = iNow%4;
    oBtn.css("background", "rgba(0,0,0,.7)");
    oBtn.eq(iNow).css("background", "#00aaa6");
    oA.css("display","none");
    oA.eq(iNow).css("display","block");
    oA.css("opacity","0");
    oA.eq(iNow).animate({opacity:1})
}

//左右箭头切换图片
function prev_next(){
    var bx_prev = $('.bx-prev');
    var bx_next = $('.bx-next');
    var count = 0;
    bx_prev.hover(function(){
        bx_prev.css("background","url(../img/prev_c.png)");
    },function(){
        bx_prev.css("background","url(../img/prev.png)");
    })
    bx_next.hover(function(){
        bx_next.css("background","url(../img/next_c.png)");
    },function(){
        bx_next.css("background","url(../img/next.png)");
    })
    bx_prev.click(function(){
        // console.log("-"+(parseInt($('.ul_wrap').find("ul").css("width"))+parseInt($('.ul_wrap').find("li").css("width"))));
        if(count==0){
            $('.ul_wrap').find("ul").css("left","-"+(parseInt($('.ul_wrap').find("ul").css("width"))/2)+"px");
            count = 5;
        }
        count--;
        var left = parseInt($('.ul_wrap').find("ul").position().left);
        // alert($('.ul_wrap').find("ul").css("left"));
        var width = parseInt($('.ul_wrap').find("li").css("width"));
        $('.ul_wrap').find("ul").animate({left:left+width});
        // alert(count);
        return false;
    })
    bx_next.click(function(){
        // console.log("-"+(parseInt($('.ul_wrap').find("ul").css("width"))+parseInt($('.ul_wrap').find("li").css("width"))));
        if(count==5){
            $('.ul_wrap').find("ul").css("left",0);
            count = 0;
        }
        count++;
        var left = parseInt($('.ul_wrap').find("ul").position().left);
        // alert($('.ul_wrap').find("ul").css("left"));
        var width = parseInt($('.ul_wrap').find("li").css("width"));
        $('.ul_wrap').find("ul").animate({left:left-width});
        // alert(count);
        return false;
    })
}

//banner2的移入移出
function info(){
    var Lis = $('.ul_wrap').find('li');
    for(var i = 0;i<Lis.length;i++){
        // console.log(Lis[i]);
        Lis.eq(i).mouseenter(function(){
            $(this).find(".name").css("color","#d72121").animate({top:255},100);
            $(this).find(".price").css("color","#d72121").animate({top:280},100);
        })
        Lis.eq(i).mouseleave(function(){
            $(this).find(".name").css("color","#282828").animate({top:262},100);
            $(this).find(".price").css("color","#282828").animate({top:290},100);
        })
    }
}

//产品移入移出
function infor_2(){
    var Lis = $('.category').find("li").hover(function(){
        $(this).find("img").animate({top:parseInt($(this).find("img").css("top"))-10})
        $(this).find("div").animate({top:parseInt($(this).find("div").css("top"))-10})
    },function(){
        $(this).find("img").animate({top:parseInt($(this).find("img").css("top"))+10})
        $(this).find("div").animate({top:parseInt($(this).find("div").css("top"))+10})
    });
}
//拖拽
function drag(){
    //记录相对的距离
    var disX = 0;
    $(".bri-video").find("ul").mousedown(function(ev){
        disX = ev.pageX - $(this).offset().left;
        //声明一个变量记录一下当前按下的ul
        var obj = $(this);
        $(document).mousemove(function(ev){
            //修改ul的坐标
            //修改当前按下的ul的坐标
            obj.css("left", ev.pageX - disX - parseInt($(".wrap_ul").offset().left));
            if(parseInt(obj.css("left"))>=0){
                obj.css("left","0px");
            }
            if(parseInt(obj.css("left"))<=-(parseInt($(".bri-video").find("ul").css("width"))-parseInt($(".wrap_ul").css("width")))){
                // console.log(obj.css("left"));
                obj.css("left",-(parseInt($(".bri-video").find("ul").css("width"))-parseInt($(".wrap_ul").css("width"))));
            }
        })
        $(document).mouseup(function(){
            $(document).off();
        })
    })
}