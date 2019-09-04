var
    oCurrentTime = document.getElementsByClassName('current-time')[0],
    oAllTime = document.getElementsByClassName('all-time')[0],
    oBtn = document.getElementsByClassName('btn')[0],
    oIsPlay = oBtn.getElementsByClassName('iconfont')[0],
    oProActive = document.getElementsByClassName('pro-active')[0],
    oRadioBox = document.getElementsByClassName('radio-box')[0],
    oProBox = document.getElementsByClassName('pro-box')[0],
    oMain = document.getElementsByClassName('main')[0],
    oVolume = document.getElementsByClassName('volume')[0],
    oActive = document.getElementsByClassName('active-box')[0],
    vioceRadio = document.getElementsByClassName('vioce-radio')[0],
    oVioce = document.getElementsByClassName('vioce')[0],
    oSpan = vioceRadio.getElementsByTagName('span')[0],
    tool = document.getElementsByClassName('tool')[0],
    prev = document.getElementsByClassName('prev')[0],
    next = document.getElementsByClassName('next')[0];

var timer,
    duration,
    bgWidth = 162,
    sound;
var main = document.getElementsByClassName('main')[0];
var oAudio = document.createElement('audio');
// oAudio.setAttribute('id','audio');
// oAudio.setAttribute('src','./img/1.mp3');
oAudio = new Audio();
var num = 1;
var src = oAudio.src = './img/' + num + '.mp3';
oAudio.id = 'audio';
oAudio.style.src = src;
main.appendChild(oAudio);
//ondurationchange事件是duration一改变就触发   线上用
//oncanplay 
window.onload = function () {
    oCurrentTime.innerHTML = conversion(oAudio.currentTime);
    // console.log(oAudio);
    duration = oAudio.duration;   //总时长
    // console.log(duration);
    oAllTime.innerHTML = conversion(duration);
}
//转换数字
function conversion(time) {
    //秒
    var sec = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    //分
    var min = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
    return min + ":" + sec;
}

//绑定点击事件
oBtn.onmouseup = function () {
    //判断当前音乐的状态
    // console.log(111);
    if (oAudio.paused) {
        musicPlay();
    } else {
        musicPause();
    }
}
function musicPlay() {
    oAudio.play();
    oIsPlay.className = 'iconfont icon-zanting';
    timer = setInterval(movePro, 200);
    oMain.classList.add('rotate');
    oMain.style.webkitAnimationPlayState = "running";
}
function musicPause(e) {
    oAudio.pause();
    oIsPlay.className = 'iconfont icon-bofang';
    oMain.style.webkitAnimationPlayState = "paused";
    clearInterval(timer);
}
function movePro() {
    var currentTime = oAudio.currentTime;
    // console.log(currentTime);
    oCurrentTime.innerHTML = conversion(currentTime);
    oProActive.style.width = currentTime / duration * bgWidth + 8 + 'px';
}
//播放到最后
oAudio.onended = function () {
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    oProActive.style.width = 8 + 'px';
    num++;
    if (num > 3) {
        num = 1;
    }
    src = oAudio.src = './img/' + num + '.mp3';
    //第一种方法
    //load() 方法用于在更改来源或其他设置后对音频/视频元素进行更新
    oAudio.load();
    //更改后需要重新加载 audio 元素，在 audio 元素加载完成后 （oncanplay），此时才能获取到正确的 duration 值
    // oAudio.oncanplay = function () {
    //     duration = this.duration;
    //     // console.log(oAudio.duration);
    //     oAllTime.innerHTML = conversion(duration);
    // }

    //第二种方法
    //duration 的值可以在 canplay 事件发生之前的 durationchange 阶段中获取。
    oAudio.ondurationchange = function () {
        duration = oAudio.duration;
        oAllTime.innerHTML = conversion(duration);
    }

    musicPlay();
}
//拖拽事件
oRadioBox.onmousedown = function () {
    clearInterval(timer);
    var c = oAudio.currentTime;
    document.body.onmousemove = function (e) {
        //oProBox.getBoundingClientRect().left是oProBox距离浏览器左侧的值
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;
        if (newWidth < 8) {
            newWidth = 8;
        } else if (newWidth > 170) {
            newWidth = 170;
        }
        oProActive.style.width = newWidth + 'px';
        c = (newWidth - 8) / bgWidth * duration;
        oCurrentTime.innerHTML = conversion(c);

    }
    document.body.onmouseup = function () {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        oAudio.currentTime = c;
        musicPlay();
    }
}

//点击切换歌曲
prev.onclick = function(){
    console.log(111);
    num --;
    // console.log(num);
    if(num < 1){
        num = 3;
    }
    src = oAudio.src = './img/' + num + '.mp3';
    oAudio.load();
    oAudio.ondurationchange = function () {
        duration = oAudio.duration;
        oAllTime.innerHTML = conversion(duration);
    }
    musicPlay();


}
next.onclick = function(){
    console.log(222);
     num ++;
    // console.log(num);
    if(num > 3){
        num = 1;
    }
    src = oAudio.src = './img/' + num + '.mp3';
    oAudio.load();
    oAudio.ondurationchange = function () {
        duration = oAudio.duration;
        oAllTime.innerHTML = conversion(duration);
    }
    musicPlay();
}


//点击切换音乐的大小
oActive.style.display = 'none';
oVolume.addEventListener('click',function(){
    if(oActive.style.display == 'block'){
        oActive.style.display = 'none';
    }else if(oActive.style.display == 'none'){
        oActive.style.display = 'block';
    }
    vioceRadio.onmousedown = function () {
        oAudio.volume = 1;
        console.log(111);
        oSound = sound;
        document.body.onmousemove = function (e) {
            var x = e.clientX;
            var newX = x - vioceRadio.getBoundingClientRect().left;
            if (newX < 0) {
                newX = 0;
            } else if (newX > 92) {
                newX = 92;
            }
            oSpan.style.left = newX  + 'px';
            oVioce.style.width = newX + 'px';
             sound = newX * oAudio.volume / 100;
            //  console.log(newX + '--' + sound + '--'+oAudio.volume);
        }
        document.body.onmouseup = function () {
            console.log(333);
            oAudio.volume = sound;
            document.body.onmousemove = null;
            document.body.onmouseup = null;
        }
        
    }
}) 


