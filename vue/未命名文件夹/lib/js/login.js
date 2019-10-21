var CONFIG = require('./config');
var popup = require('./popup');
var util = require('./utilities');

$(function () {
    var ua = navigator.userAgent;
    var channelName = util.gotChannelName(window.location);
    var dataPushHandler = function (event) {
        return channelName !== '' ? 'dataLayer.push({"event":"' + channelName + event + '"})' : '';
    };

    var redirectUrl = top.location.href;
    var ifrUrl = CONFIG.ZHIYOU_LOGIN_BASE_URL + 'user/login/window/#redirect_url=' + encodeURIComponent(redirectUrl);
    var domTpl = ['<div class="z-popup login-popup" id="J_login_popup">',
        '<div class="z-popup-head z-clearfix">',
        "<a href='javascript:;' onclick='" + dataPushHandler('关闭按钮') + "' class='z-popup-close z-icons icon-times-o J_popup_close'></a>",
        '</div>',
        '<div class="z-popup-content">',
        '<iframe id="J_login_iframe" name="J_login_iframe" frameborder="0" src="{{url}}" frameborder="0"></iframe>',
        '</div>',
        '</div>'].join('');

    var loginPop = popup.create($(domTpl), {
        useTemplate: true,
        closeBtn: '.J_popup_close',
        beforeShow: function () {
            if (channelName) {
                $('.popup-bg').attr('onclick', 'dataLayer.push({"event":"' + channelName + '半透明区域"})');
            }
            if ($(window).width() <= CONFIG.MOBIEL_WIDTH) {
                window.location = ifrUrl;
                return false;
            } else {
                this.update({url: ifrUrl});
            }
        },
        afterClose: function () {
            this.update({url: ' '});
        }
    });

    $(document).data('zLogin', {
        popShow: showPop,
        popClose: $.proxy(loginPop.hide, loginPop)
    });

    // 点击按钮弹窗
    $('.J_login_trigger').unbind('click.login').bind('click.login', function (e) {
        e.preventDefault();
        if (top.location.href.indexOf('#follow') > -1) {
            ifrUrl = CONFIG.ZHIYOU_LOGIN_BASE_URL + 'user/login/window/#redirect_url=' + encodeURIComponent(redirectUrl + '#follow');
        }
        if (channelName && typeof dataLayer !== 'undefined') {
            // 登录弹窗出现次数(包括各种情况下trigger出来的登录弹窗)
            dataLayer.push({'event': channelName + '登录弹窗_出现次数'});
        }
        showPop();
        // loginPop.show();

        // showPopup();
    });

    // 点击注册按钮
    $('.J_register_trigger').unbind('click.login').bind('click.login', function (e) {
        e.preventDefault();
        var that = $(this);
        if (channelName && typeof dataLayer !== 'undefined') {
            // 注册弹窗出现次数(包括各种情况下trigger出来的登录弹窗)
            dataLayer.push({'event': channelName + '注册弹窗_出现次数'});
        }
        loginPop.show();

        if (that.data('style') === 'register') {
            // 主页面向子页面发送消息
            var ifr = document.getElementById('J_login_iframe');
            ifr.onload = function () {
                var dataJson = JSON.stringify({
                    type: 1
                });
                // iframe加载完主页面向子页面立即发送一条消息
                ifr.contentWindow.postMessage(dataJson, '*');
            };
        }
    });

    // 七鱼智能客服初始化
    $(document).on('click', '.J_smart_kefu', function (e) {
        e.preventDefault();
        /* Act on the event */
        $.ajax({
            url: '//zhiyou.smzdm.com/user/info/jsonp_get_current',
            type: 'GET',
            dataType: 'jsonp',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (res.smzdm_id === 0) {
                    // 判断未登录状态下登录
                    if ($(window).width() <= 480) {
                        /* eslint-disable */
                        if (typeof call_client_login === 'function') {
                            call_client_login();
                        } else {
                            $('.J_login_trigger').trigger('click');
                        }
                        /* eslint-enable */
                    } else {
                        $('.J_login_trigger').trigger('click');
                    }
                } else {
                    // 登录状态下跳转到智能客服入口
                    ysf.logoff();

                    ysf.config({
                        robotShuntSwitch: 1, // 开启机器人
                        uid: res.qyuid, // 用户id
                        name: res.nickname, // 用户昵称
                        staffid: res.qiyu_group_info.staffid, // 客服id
                        groupid: res.qiyu_group_info.groupid, // 客服组id
                        data: JSON.stringify([
                            {'key': 'real_name', 'hidden': 'true'},
                            {'key': 'mobile_phone', 'hidden': 'true'},
                            {'key': 'email', 'hidden': 'true'},
                            {'type': 'crm_param', 'key': 'qytoken', 'value': res.qytoken}
                        ]),
                        success: function () { // 成功回调
                            if ($(window).width() <= 480) {
                                window.location.href = ysf.url();
                            } else {
                                window.open(ysf.url(), '_blank');
                            }
                        },
                        error: function () { // 错误回调
                        }
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    // 监听子窗口协议相关传递过来的 agreeStatusType参数 by Li Wei
    if (window.addEventListener) {
        window.addEventListener('message', agreeEventListener, false);
    } else {
        if (window.attachEvent) {
            window.attachEvent('onmessage', agreeEventListener);
        }
    }

    function agreeEventListener (e) {
        // 利用MessageEvent对象判断消息源
        if (e.origin !== 'https://zhiyou.smzdm.com') return;
        var data = JSON.parse(e.data);
        if (data.agreeStatusType === 1) {
            resetLoginIframe();
        } else if (data.agreeStatusType === 2) {
            var ifr = document.getElementById('J_login_iframe');
            ifr.onload = function () {
                var dataJson = JSON.stringify({
                    agreeType: 'register_post'
                });
                // iframe加载完主页面向子页面立即发送一条消息
                ifr.contentWindow.postMessage(dataJson, '*');
                resetLoginIframe();
            };
        }
    }

    function resetLoginIframe () {
        $('.popup-bg').off('click');
        $('#J_login_popup .J_popup_close').hide();
        $('#J_login_popup .z-popup-head').hide();
        $('#J_login_popup').css({
            'padding': '0',
            'width': '500px',
            'height': '410px'
        });
        $('#J_login_iframe').css({
            'width': '500px',
            'height': '410px'
        });
    }

    function showPop () {
        var version;

        /* eslint-disable */
        if (/smzdmapp/i.test(navigator.userAgent) && (typeof call_client_login === 'function')) {
            if (/iphone_smzdmapp/i.test(ua)) {
                version = Number(ua.match(/iphone_smzdmapp\/(\d+\.\d+)/)[1]);

                // iOS客户端大于7.4版本的客户端才能调用原生登录接口
                if (version > 7.4) {
                    call_client_login();
                } else {
                    loginPop.show();
                }
            } else {
                call_client_login();
            }
        } else {
            loginPop.show();
        }
        /* eslint-enable */
    }
});
