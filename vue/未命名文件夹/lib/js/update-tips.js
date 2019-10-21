$(function () {
    // WEB低版本chrome浏览升级提示
    var utils = require('./utilities');
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m, isChrome, isWin, isMac, fWidh, ifqBro;
    if (ua.match(re) != null) {
        m = ua.match(re);
        isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        Sys.ver = m[2];
        ifqBro = navigator.userAgent.indexOf('QQBrowser');
        if (isChrome && parseInt(Sys.ver) <= 54 && (typeof navigator.credentials) === 'object' && ifqBro < 0) {
            if (utils.getCookie('chrome_v')) {
            } else {
                $('#global-nav .nav-inner').append("<div class='chrtips-wrap'><p>检测到您的 chrome 浏览器版本不是最新版，为了您的安全浏览和支付购买，请您升级 chrome 浏览器到最新版。<a href='' target='_blank'>去升级</a></p><span class='chrtips-close'>&times</span></div>");
                $('.chrtips-close').on('click', function () {
                    utils.setCookie('chrome_v', '1', {'seconds': 86400, 'path': '/', 'domain': '.smzdm.com'});
                    $('.chrtips-wrap').remove();
                });
                fWidh = parseInt($('#global-nav .nav-inner').css('width')) - 2;
                $('.chrtips-wrap').css({'width': fWidh});
                if (detectOs() === 'Mac') {
                    $('.chrtips-wrap a').attr('href', 'http://rj.baidu.com/soft/detail/25718.html?ald');
                } else {
                    $('.chrtips-wrap a').attr('href', 'http://rj.baidu.com/soft/detail/14744.html');
                }
            }
        }
    }
    function detectOs () {
        isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
        isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel');
        if (isMac) return 'Mac';
        if (isWin) return 'Windows';
    }
});
