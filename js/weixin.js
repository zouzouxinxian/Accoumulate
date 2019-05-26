function safari() {
    if (isWeiXin()) {
        console.log("weixin或app")
        return false
    } else if (!/smzdmapp/.test(ua)) {
        console.log("weixin或app")
        return false
    } else {
        console.log("safari")
        return true;
    }
}


function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    console.log(ua); //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


// 微信内分享
function jsWeixin() {

    var getAtatusUrl = 'https://api.smzdm.com/v1/weixin/getSignPackage';

    if ((/micromessenger/i).test(navigator.userAgent)) {
        $.ajax({
            url: getAtatusUrl,
            dataType: 'jsonp',
            data: {
                url: location.href.split('#')[0]
            },
            success: function(data) {
                console.log(data.data.appId);
                jscallback(data);
            }
        });
    }
}

function jscallback(args) {
    if (args.error_code === '0') {
        console.log('进入微信');
        wx.config({
            debug: false,
            appId: args.data.appId,
            timestamp: args.data.timestamp,
            nonceStr: args.data.nonceStr,
            signature: args.data.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareQZone',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        });

        wx.ready(function() {
            console.log('wxready');
            if (!window.shareData) {
                console.log(window.wxShare);
                window.shareData = {
                    title: "银联6·2支付嘉年华 签到送50金币",
                    desc: '5月31日-6月2日，三天62折！吃喝玩乐全部62折，尽在"银联云闪付"APP',
                    link: window.wxShare.link || location.href,
                    imgUrl: 'https://eimg.smzdm.com/201905/24/5ce792f6e7a116635.jpg'
                        // success: function() {
                        //     alert("成功");
                        // },
                        // cancel: function() {
                        //     alert("失败")
                        // }
                };
                window.shareqqData = {
                    title: '银联6·2支付嘉年华 签到送50金币',
                    desc: '5月31日-6月2日，三天62折！吃喝玩乐全部62折，尽在"银联云闪付"APP', // qq分享的时候一定要加这个字段
                    link: window.wxShare.link || location.href,
                    imgUrl: 'https://eimg.smzdm.com/201905/24/5ce792f6e7a116635.jpg',
                    trigger: function(res) {},
                    success: function(res) {},
                    cancel: function(res) {},
                    fail: function(res) {}
                };
            }
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareqqData);
            wx.onMenuShareWeibo(shareData);
            wx.onMenuShareQZone(shareqqData);
        });
    }
}