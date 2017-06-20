/**
* 2016-1-20
* by @oulafen
* */

Zepto(function () {
   initPage();

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });
    // start listening to device motion
    myShakeEvent.start();
    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);
});

function shakeEventDidOccur(){
    if (!lottery.rolling) {
        lottery.start();
    }
    return false;
}

function initPage(){
    lottery.init('lottery');

    $('.J-again-btn').on('tap',function(){
        notice.hide();
        window.addEventListener('shake', shakeEventDidOccur, false);
    });

    $('.J-achieve-btn').on('tap',function(){
        notice.hide();
        $('.J-achieve-tip').show();
    });

    $('.J-share-btn').on('tap',function(){
        notice.hide();
        $('.J-share-tip').show();
    });
}

var lottery = {
    index: -1,	//当前转动到哪个位置，起点位置
    count: 0,	//总共有多少个位置
    timer: 0,	//setTimeout的ID，用clearTimeout清除
    speed: 20,	//初始转动速度
    times: 0,	//转动次数
    cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,	//中奖位置
    rolling: false,  //记录在转奖的状态
    init: function (id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
        }
    },
    roll: function () {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },

    stop: function () {
        clearTimeout(lottery.timer);
        notice.show();

        lottery.prize = -1;
        lottery.times = 0;
        lottery.rolling = false;

        window.removeEventListener('shake', shakeEventDidOccur, false);
    },

    start: function(){
        this.speed = 20;
        roll();
        this.rolling = true;
    }
};

function roll() {
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        lottery.stop();
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            var index = Math.random() * (lottery.count) | 0;
            lottery.prize = index;
            notice.setContent();
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        }
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}

var notice = {
    show: function () {
        var status = prize[lottery.prize]['status'];
        this.hide();

        setTimeout(function(){
            $('.J-' + status + '-tip').show();
        },1000);
    },
    hide: function () {
        $('.tip-box').hide();
    },
    setContent : function(){
        var status = prize[lottery.prize]['status'];
        $('.J-' + status + '-tip .' + status + '-box').empty().append(prize[lottery.prize]['prize-img']);
        $('.J-' + status + '-tip .desc-box').empty().append(prize[lottery.prize]['desc-html']);
    }
};

var prize = {
    0: {
        'status': 'prize',
        'title': '恭喜您获得“千金情义”的红包一个',
        'desc': '从此事业爱情双丰收',
        'prize-img': '<img class="prize-img" src="images/prize/1-img.png">',
        'desc-html': '<p>获得<span class="warning">“千金情义”</span>的红包一个</p><p class="title-2">从此事业爱情双丰收</p>'
    },
    1: {
        'status': 'no-prize',
        'title': '你知道大头儿子小头爸爸又出贺岁动画片了吗',
        'desc': '可为什么大头儿子抱着机器人，2月7日19:00央视少儿频道，我不多说，你去看。',
        'prize-img': '<img src="images/prize/2-img.png" alt="">',
        'desc-html': '<p class="title-2">你知道大头儿子小头爸爸</p><p class="title-2">又出贺岁动画片了吗</p><p>可为什么大头儿子抱着机器人</p><p>2月7日19:00央视少儿频道</p><p>我不多说，你去看</p>'
    },
    2: {
        'status': 'prize',
        'title': '恭喜您获得去往“全家幸福岛”的飞机票',
        'desc': '从此阖家团圆乐开怀',
        'prize-img': '<img class="prize-img" src="images/prize/3-img.png">',
        'desc-html': '<p>获得去往<span class="warning">“全家幸福岛”</span>的飞机票</p><p class="title-2">从此阖家团圆乐开怀</p>'
    },
    3: {
        'status': 'prize',
        'title': '恭喜您获得“好多个亿”有奖彩票一张',
        'desc': '从此走上人生巅峰',
        'prize-img': '<img class="prize-img" src="images/prize/4-img.png">',
        'desc-html': '<p>获得<span class="warning">“好多个亿”</span>有奖彩票一张</p><p class="title-2">从此走上人生巅峰</p>'
    },
    4: {
        'status': 'no-prize',
        'title': '2月7日19:00央视少儿频道',
        'desc': '去看小头爸爸怎样耍宝 赢得猴年贺岁合家欢',
        'prize-img': '<img src="images/prize/5-img.jpg">',
        'desc-html': '<p class="title-1">2月7日19:00央视少儿频道</p><p>去看小头爸爸怎样耍宝</p><p>赢得猴年贺岁合家欢</p>'
    },
    5: {
        'status': 'prize',
        'title': '恭喜您获得“我最酷炫”数码产品一套',
        'desc': '从此潮品不断任君挑选',
        'prize-img': '<img class="prize-img" src="images/prize/6-img.png">',
        'desc-html': '<p>恭喜您获得<span class="warning">“我最酷炫”</span>数码产品一套</p><p class="title-2">从此潮品不断任君挑选</p>'
    },
    6: {
        'status': 'no-prize',
        'title': '除夕19:00锁定央视少儿频道',
        'desc': '围观小头爸爸变机器人啦',
        'prize-img': '<img src="images/prize/7-img.jpg">',
        'desc-html': '<p class="title-1">除夕19:00锁定央视少儿频道</p><p>围观小头爸爸变机器人啦</p>'
    },
    7: {
        'status': 'prize',
        'title': '获得“只播放欢乐”的家庭影院',
        'desc': '从此家庭和睦更加融洽',
        'prize-img': '<img class="prize-img" src="images/prize/8-img.png">',
        'desc-html': '<p>获得<span class="warning">“只播放欢乐”</span>的家庭影院</p><p class="title-2">从此家庭和睦更加融洽</p>'
    }
};




