/**
 * Created by caoxudong on 16/7/19.
 */

$(function () {
    $('.J_hover_nav > span').mouseenter(function () {
        $(this).addClass('active').siblings('span').removeClass('active');
        var index = $(this).index();
        $(this).parent('.J_hover_nav').siblings('.J_hover_ul').children('div').eq(index).show().siblings().hide();
    });
});
