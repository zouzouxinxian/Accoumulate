// 配置
var ua = navigator.userAgent;

module.exports = {
    MAIN_SITE_URL: 'https://www.smzdm.com/',
    ZHIYOU_BASE_URL: 'https://zhiyou.smzdm.com/',
    ZHIYOU_LOGIN_BASE_URL: 'https://zhiyou.smzdm.com/',
    TEST_BASE_URL: 'https://userapi.smzdm.com/',
    IS_MOBILE: /iphone|ipod|android|windows phone|blackberry/i.test(ua),
    MOBILE_MAIN_URL: 'http://m.smzdm.com/',
    ZHIKU_BASE_AJAX: 'https://wiki.smzdm.com/',
    MOBIEL_WIDTH: 480
};
