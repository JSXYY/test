$(function(){
    $(".menu").add($('.classify')).hover(function(){
        $('.classify').css("display","block")
    },function(){
        $('.classify').css("display","none")
    })

    var str = decodeURI(location.href);
    var start = str.indexOf('?')+1;
    var end = str.indexOf("=");
    // alert(start+","+end);
    var goodsType = str.slice(start,end);
    $('#breadcrumb').find("span").eq(1).html(goodsType);
    var index = str.slice(end+1);
    // alert(goodsType+","+index);

    $.ajax({
        url:"../json/goods.json",
        success:function(res){
            for(var i in res){
                for(var j in res[i]){
                    if(j == goodsType){
                        var obj = res[i][j][index];
                    }
                }
            }
            $(document).attr("title","海信商城-"+obj.abstract);
            setDetail(obj);
            changeUl();
        }
    });
    magnifying();
    addAmount();
});

function magnifying(){
        var oS_box=$('.s_box');
        var oS_position=$(".position_box");
        var oS_mark=$(".mark_box");
        var oB_box=$('.b_box');
        var b_img = oB_box.find("img")
        oS_mark.mouseover(function(){
            oS_position.css("display",'block');
            oB_box.css("display",'block');

        })
        oS_mark.mouseout(function(){
            oS_position.css("display",'none');
            oB_box.css("display",'none');
        })

        oS_mark.mousemove(function(event){
            var evt=event||window.event;
            var left=evt.offsetX-parseInt(oS_position.css("width"))/2;
            //console.log(left)
            if(left<0){
                left=0;
            }else if(left>parseInt(oS_box.css("width"))-parseInt(oS_position.css("width"))){
                left=parseInt(oS_box.css("width"))-parseInt(oS_position.css("width"))
            }
            //console.log(left)
            oS_position.css("left",left);
            var top=evt.offsetY-parseInt(oS_position.css("height"))/2;
            if(top<0){
                top=0;
            }else if(top>parseInt(oS_box.css("height"))-parseInt(oS_position.css("height"))){
                top=parseInt(oS_box.css("height"))-parseInt(oS_position.css("height"))
            }
            //console.log(top)
            oS_position.css("top",top);
            var proportionX=left/(parseInt(oS_box.css("width"))-parseInt(oS_position.css("width")));
            var proportionY=top/(parseInt(oS_box.css("height"))-parseInt(oS_position.css("height")));
            // console.log(proportionX+':'+proportionY)

            //利用比例去算出大小不同的元素的偏移距离；

            b_img.css("left",-proportionX*(parseInt(b_img.css("width"))-parseInt(oB_box.css("width"))));
            b_img.css("top",-proportionY*(parseInt(b_img.css("height"))-parseInt(oB_box.css("height"))));

        })
}

function setDetail(obj){
    $(".detail").find("h3").html(obj.abstract);
    $(".detail").find(".fline").html(obj.old_pic);
    $(".detail").find("b").html(obj.pic);
    for(var i = 0;i<obj.big_img.length;i++){
        var newLi = $('<li><img src="'+ obj.big_img[i].img +'"/></li>');
        newLi.click(function(){
            $(".s_box").find("img").attr("src",$(this).find("img").attr("src"))
            $(".b_box").find("img").attr("src",$(this).find("img").attr("src"))
        });
        newLi.appendTo($(".ss_center").find("ul"));
    }
    $(".s_box").find("img").attr("src",obj.big_img[0].img);
    $(".b_box").find("img").attr("src",obj.big_img[0].img);
    $(".ss_center").find("ul").css("width",obj.big_img.length*87)
}

function changeUl(){
    $(".ss_right").find('img').click(function(){
        var ul_w = parseInt($(".ss_center").find("ul").css("width"));
        var ul_l = parseInt($(".ss_center").find("ul").css("left"));
        var ss_center = parseInt($(".ss_center").css("width"));
        // console.log(ul_w);
        // console.log(ul_l);
        if(ul_w+ul_l > ss_center){

            // $(".ss_center").find("ul").css("left",ul_l- ss_center);
            $(".ss_center").find("ul").animate({left:ul_l- ss_center});
        }
    })
    $(".ss_left").find('img').click(function(){
        var ul_l = parseInt($(".ss_center").find("ul").css("left"));
        var ss_center = parseInt($(".ss_center").css("width"));
        // console.log(ul_l);
        if(ul_l < 0){
            // $(".ss_center").find("ul").css("left",ul_l+ ss_center);
            $(".ss_center").find("ul").animate({left:ul_l+ ss_center});
        }
    })
}

function addAmount(){
    $(".amount-increase").click(function(){
        var val = $("#input-amount").val();
        // console.log(val);
        $("#input-amount").val(++val);
    })
    $(".amount-decrease").click(function(){
        var val = $("#input-amount").val();
        // console.log(val);
        if(val>0){
            $("#input-amount").val(--val);
        }
    })
}