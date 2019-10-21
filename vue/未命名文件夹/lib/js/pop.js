/**
 * Created by caoxudong on 16/7/25.
 */
function adjustPosition ($pop) {
    var winWidth = $(window).width(),
        winHeight = $(window).height(),
        width = $pop.width(),
        height = $pop.height();
    $pop.css({
        left: (winWidth - width) / 2,
        top: (winHeight - height) / 2
    });
}

$(function () {
    adjustPosition($('.pop'));
});

module.exports = {
    /**
     * @for 首页收藏弹窗
     * @param {String} url 弹框中额链接地址
     * @param {String} text 弹框中文案
     *
     * */
    favPop: function (url, text, channelId) {
        var $cover = $('#cover'), $fav = $('.pop.pop-fav').not('.J_pop_focus').not('.J_focus_success'), hideTime;
        $fav.find('.pop-info-show a').attr('href', url).end().find('.fav-text').html(text);
        if (channelId && +channelId === 66) {
            // 把 好物榜单的，去我的收藏夹，隐藏掉
            $fav.find('.pop-info-show a').hide();
        } else {
            $fav.find('.pop-info-show a').show();
        }

        $cover.show();
        $fav.show();
        hideTime = setTimeout(function () {
            $cover.hide();
            $fav.hide();
        }, 3000);
        $fav.find('.icon-times-o').click(function () {
            clearTimeout(hideTime);
            $(this).parent().hide();
            $cover.hide();
        });
    },
    /**
     * @for 关注多选框弹窗
     * @param {String} text 弹框中文案
     * */
    focusPop: function (text) {
        var $cover = $('#cover'), $focus = $('.J_pop_focus'), hideTime;
        $focus.find('.fav-text').html(text);
        $cover.show();
        $focus.show();
        hideTime = setTimeout(function () {
            $cover.hide();
            $focus.hide();
        }, 2000);
        $focus.find('.icon-times-o').click(function () {
            clearTimeout(hideTime);
            $cover.hide();
            $focus.hide();
        });
        $cover.click(function () {
            clearTimeout(hideTime);
            $cover.hide();
            $focus.hide();
        });
    },
    /**
     * @for 关注成功弹窗
     * @param {String} url 弹框中额链接地址
     * @param {String} text 弹框中文案
     *
     * */
    focusSuccessPop: function (url, text) {
        var $cover = $('#cover'), $fav = $('.pop.pop-fav.J_focus_success'), hideTime;
        $fav.find('.pop-info-show a').attr('href', url).end().find('.fav-text').html(text);
        $cover.show();
        $fav.show();
        hideTime = setTimeout(function () {
            $cover.hide();
            $fav.hide();
        }, 3000);
        $fav.find('.icon-times-o').click(function () {
            clearTimeout(hideTime);
            $(this).parent().hide();
            $cover.hide();
        });
    },
    addFocusPop: function (text) {
        $('.J_add_alert').find('span').html(text).end().show();
        var timeOut = setTimeout(function () {
            $('.J_add_alert').hide();
        }, 2000);
        $('.J_add_alert .icon-times-o').off('click').on('click', function () {
            clearTimeout(timeOut);
            $('.J_add_alert').hide();
        });
    },
    /**
     * @for 通用弹窗
     * @ajaxOpt 如果会发起ajax的话,此处为ajax参数,若未传递ajax参数,此处为另一个参数callback
     * @callback {Function} 点击触发按钮之后的回调,用来个性化修改一些弹窗的必要信息
     *
     * */
    popShow: function ($pop, callback) {
        if ($.isFunction(callback)) {
            callback();
        }
        $('#cover').show();
        $pop.show();
        $('.J_pop_close,#cover').click(function () {
            $('.pop,#cover').hide();
        });
    },
    popHide: function (callback) {
        if ($.isFunction(callback)) {
            callback();
        }
        $('#cover').hide();
        $('.pop').hide();
    }
};
