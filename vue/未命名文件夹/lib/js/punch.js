/**
 * Created by caoxudong on 16/7/25.
 */
var config = require('./config');
var time;
$(document).on('click', '.J_punch', function (e) {
    e.preventDefault();
    // 如果错误信息存在, 则不发送请求
    if ($('.error-msg').length) {
        return;
    }
    $.ajax({
        type: 'get',
        url: config.ZHIYOU_BASE_URL + 'user/checkin/jsonp_checkin',
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (resp) {
            var errorCode = resp.error_code;
            var errorMsg = resp.error_msg;
            var data = resp.data;
            var $wrap = $('.old-entry');
            if (errorCode === 0) { // 已签到
                if (errorMsg === '') { // 第一次签到
                    dataLayer.push({'event': '12310', 'button': '签到领奖'});
                    $('.J_punch').html('已签到' + data.checkin_num + '天');
                } else {
                    window.location.href = 'http://www.smzdm.com/qiandao/';
                }
            } else if (errorCode === 99) {
                dataLayer.push({'event': '12310', 'button': '签到领奖'});
                $('.J_login_trigger').eq(1).trigger('click');
            } else {
                var $error = $wrap.find('.error-msg');
                if ($wrap.length) {
                    if (!$error.length) {
                        $error = $('<span />').attr('class', 'error-msg').css({
                            width: 'auto',
                            display: 'none',
                            position: 'absolute',
                            height: '20px',
                            lineHeight: '1.5',
                            fontSize: '12px',
                            color: '#f04848',
                            bottom: '-22px',
                            left: '0'
                        }).text(errorMsg);
                        $wrap.append($error.fadeIn(200));
                        time = setTimeout(function () {
                            $error.fadeOut(400, function () {
                                $(this).remove();
                            });
                        }, 3000);
                    } else {
                        clearTimeout(time);
                        time = setTimeout(function () {
                            $error.fadeOut(400, function () {
                                $(this).remove();
                            });
                        }, 3000);
                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});
