/**
 * Created by lenovo on 2016/12/23.
 */
(function(){
    var index=0;
    var car=$('.page2_car');
    var page6_img = $('.page6_car img');
    var page6_tel = $('.page6_tel img');
    var music = $('.music');
    var Amusic = $('.Amusic');
    //音乐暂停播放角度
    var angle = 0;
    var speed = 0.1;

    pager(1);
    //定时器
    function pager(index){
        if(index==1){
            var timer = setInterval(function(){
                    changed(index);
                    clearInterval(timer);
                },4000)/*4s*/
        }
        if(index==2){
            var timer = setInterval(function(){
                changed(index);
                clearInterval(timer);
            },1000);
        }
    }
    //翻页
    function changed(index){
        var num = -index;
        $('.contain>div').removeClass('active');
        $('.page'+(index+1)).addClass('active');
        $('.dir ').css('transform','rotate(0deg)');
        $('.dir').css('webkitTransform','rotate(0deg)');
        $('.dir>img').css('transform','rotate(0deg)');
        $('.dir>img').css('webkitTransform','rotate(0deg)');
       /* $('.contain')[0].style.transform = 'translateX('+num*12.5+'%)';*/
        $('.contain')[0].style.left=num*100+'%';
        if(index==5){
            run();
        }
    }
    //小车拖入车位
    touch.on('.page_2','tap','.page2_car',function(){
        clearInterval(car.timer);
        var speed = 0.1;
        var top = 26;
        car.timer = setInterval(function(){
            top = top + speed <= 53 ? top+speed:53;
            car[0].style.top=top+'%';
            if(top==53||top>53){
                car[0].style.top=26+'%';
                clearInterval(car.timer);
            }
        },5)
        pager(2);
    })
    //方向盘旋转的角度
    fangxiangpan();
    function fangxiangpan() {
        var num = 2;
        var angle = 0;//旋转角度
        touch.on('.dir>img', 'touchstart', function (ev) {
            ev.startRotate();
            ev.preventDefault();
        });
        touch.on('.dir>img', 'rotate', function (ev) {
            var totalAngle = angle + ev.rotation;//rotation：手势旋转的角度
            if (ev.fingerStatus === 'end') {
                angle = angle + ev.rotation;
                if(ev.direction=='left'){
                    num--;
                }
                if(ev.direction=='right'){
                    num++;
                }
                changed(num);
            }
            this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
            this.style.transform = 'rotate(' + totalAngle + 'deg)';
        });
    }

    //动画
    function run(){
        var i = 1;
        var timer= setInterval (function(){
            if(i==1){
                page6_img[0].style.left='80%';
                page6_tel[0].style.left='0%';
            }else if(i==2){
                page6_img[0].style.left='60%';
                page6_tel[0].style.left='-25%';
            }else if(i==3){
                page6_img[0].style.left='0%';
                page6_tel[0].style.left='-50%';
            }else if(i==4){
                page6_img[0].style.left='80%';
                page6_tel[0].style.left='-75%';
            } else if(i==5){
                page6_img[0].style.left='80%';
                page6_tel[0].style.left='0%';
            }
            i++;
        },1000)
    }
    time();
    //音乐暂停播放
    function time(){
        clearInterval(music.timer);
        console.log(music[0]);
        music.timer=setInterval(function(){
            angle+=speed;
            music.css('transform','rotate('+angle+'deg)');
        },5);
        music.on('click',function(e){
            e.stopPropagation();
            clearInterval(music.timer);
            if(Amusic[0].paused){
                Amusic[0].play();
                music.timer=setInterval(function(){
                    angle+=speed;
                    music.css('transform','rotate('+angle+'deg)');
                },5)
            }else{
                Amusic[0].pause();
                clearInterval(music.timer);
            }
        })
    }

    //判断横竖屏
    window.addEventListener("orientationchange", function() {
       /*alert('此app不支持横屏')*/
        if (window.orientation === 180 || window.orientation === 0) {
            alert('竖屏状态！');
        }
        if (window.orientation === 90 || window.orientation === -90 ){
            alert('横屏状态！');
        }
    }, false);

})();