/**
 * Created by caoxudong on 16/7/19.
 */

$(function () {
    var $link = $('.J_hover_ul > div > ul > li > a');
    if ($link.length) {
        $link.on('mouseenter', function () {
            $(this).parent('li').css('zIndex', '10').find('div').animate({
                width: '102px'
            });
        }).on('mouseleave', function () {
            $(this).parent('li').css('zIndex', 'auto').find('div').stop(false, true).css({
                width: '0'
            });
        });
    }
});
