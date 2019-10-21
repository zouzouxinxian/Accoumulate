$(function () {
    // 检查是否跳转到移动平台
    var config = require('./config');
    var utils = require('./utilities');

    var isMobile = config.IS_MOBILE;
    var mobileMainUrl = config.MOBILE_MAIN_URL;
    var re = /^https?:\/\/(www.smzdm.com\/|haitao.smzdm.com\/|v.smzdm.com\/p\/)/; // 目前只有新首页、海淘、视频详情页面需要检测
    var browseEdition = utils.getCookie('browse_edition');
    var mobileUrl = $('#mobile_url');
    var responseSiteArr = ['https://www.smzdm.com/faq', 'https://new.brand.smzdm.com/', 'https://www.smzdm.com/renzheng/xingqu/', 'https://www.smzdm.com/renzheng/shenghuojia/', 'https://www.smzdm.com/renzheng/meitihao/provisions/'];
    var inArray = function (ele, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === ele) {
                return true;
            }
        }
        return false;
    };
    if (browseEdition !== 'web' && isMobile && re.test(location.href) && !inArray(location.href.split('?')[0], responseSiteArr)) {
        if (mobileUrl.length !== 0) {
            window.location = mobileUrl.val();
        } else {
            window.location = mobileMainUrl;
        }
    }
});
