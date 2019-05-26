// **************
// app 内调起原生分享
// 分享调起原声方法
function getClientIsWkWebview() {
    let isWkWebview = false;
    let ua = navigator.userAgent;
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS && /smzdmapp/i.test(ua)) {

        if (/wkwebview/i.test(ua)) {
            isWkWebview = true;

        } else {
            if (!/uiwebview/i.test(ua)) {
                let iphoneVersion = Number(ua.match(/iphone_smzdmapp\/(\d+\.\d+)/)[1]);
                let iosVersion = Number(ua.toLowerCase().match(/iphone os ([0-9]+)_/)[1]);
                if (iphoneVersion && iphoneVersion >= 8.5 && iosVersion > 9) {
                    isWkWebview = true;
                }
            }
        }
    }
    return isWkWebview;
}

function share() {
    console.log("share")

    let ua = navigator.userAgent;
    let shareData = {
        "share_pic": "https://am.zdmimg.com/201708/07/59883d0f5562f2259.png_a680.jpg",
        "share_title": "企业形象征集,企业形象标识LOGO,设计征集",
        "share_title_separate": "eee企业形象征集,企业形象标识LOGO,设计征集",
        "share_sub_title": "eee企业形象征集,企业形象标识LOGO,设计征集",
        "coupon_sub_title": "eee企业形象征集,企业形象标识LOGO,设计征集",
        "article_url": "https://m.smzdm.com/zhuanti/sign/sign/",
        "article_pic": "https://am.zdmimg.com/201708/07/59883d0f5562f2259.png_a680.jpg"
    };
    const shareDataString = JSON.stringify(shareData);
    if (/smzdmapp/.test(ua)) {
        console.log("原生分享1")
        if (getClientIsWkWebview()) {
            console.log("原生分享2")
            window.webkit.messageHandlers.call_client_share.postMessage(shareDataString);
        } else {
            console.log("原生分享3")
            if (typeof call_client_share === 'function') {
                console.log("原生分享4")
                call_client_share(shareDataString);
            }
        }
    }

}



// 微信内分享页面