/**
 * 好价／社区详情页左侧挂件
 * 收藏／分享／二维码交互，挂件定位
 */
var QRCode = require('qrcode');

$('.J_common_shares').on('click', function (e) {
    e.stopPropagation();
    $('.J_common_shares .J_share_dropdown').toggle();
});

$(document).on('click', function () {
    $('.J_common_shares .J_share_dropdown').hide();
});

$('.J_common_shares .J_share_dropdown').on('click', function (e) {
    e.stopPropagation();
});

/**
 * 左侧挂件定位交互处理
 * @param  {jquery object} b 左侧挂件jq dom
 * @param  {jquery object} c 详情内容描述区域jq dom
 * @return {avoid}
 */
function fixSidePosition (b, c) {
    var i = $(window).width();
    var h = $(window).height();
    var e = $('section.wrap').width();
    var a = $(b).height();
    var g = $(c).offset().top;
    var d = h / 2 - a / 2 - 81 - 60;
    var j = i / 2 - e / 2 - 10 - 48;
    if (j >= 0) {
        $(b).fadeIn();
        $(b).css({
            'left': j,
            'top': g + 'px',
            'position': 'absolute'
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() >= d) {
                $(b).css({
                    'left': j,
                    'top': d + 'px',
                    'position': 'fixed'
                });
            } else {
                $(b).css({
                    'left': j,
                    'top': g + 'px',
                    'position': 'absolute'
                });
            }
        });
    } else {
        $(b).css({
            'left': 0,
            'top': g + 'px',
            'position': 'absolute'
        });
    }
}

if ($('article .item-name').length >= 1) {
    $('.J_left_layer').show();
    fixSidePosition('.J_left_layer', 'article .item-name');
    $(window).resize(function () {
        fixSidePosition('.J_left_layer', 'article .item-name');
    });
}

// 二维码
QRCode.toDataURL($('#J_share_qrcode').attr('data-url'), {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 0,
    width: 180,
    height: 180,
    rendererOpts: {
        quality: 0.92
    }
}, function (err, url) {
    if (err) {
        throw err;
    }

    var img = document.getElementById('J_share_qrcode');
    img.src = url;
});

QRCode.toDataURL($('#J_share_code').attr('data-url'), {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 0,
    width: 100,
    height: 100,
    rendererOpts: {
        quality: 0.92
    }
}, function (err, url) {
    if (err) {
        throw err;
    }

    var img = document.getElementById('J_share_code');
    img.src = url;
});
