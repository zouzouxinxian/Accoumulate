/*
    侧边栏所有的逻辑
*/
$(function () {
    var btnPrev = '<button type="button" class="z-slick-btn-prev z-icons"><i class="icon-angle-left-o-thin"></i></button>',
        btnNext = '<button type="button" class="z-slick-btn-next z-icons"><i class="icon-angle-right-o-thin"></i></button>';
    // tab 切换
    if ($('.active .J_side_tab_slick').length) {
        $('.active .J_side_tab_slick').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 400,
            prevArrow: btnPrev,
            nextArrow: btnNext
        });
    }
    $('.side-combination-shequ .J_side_tab > span').click(function () {
        $(this).addClass('active').siblings('span').removeClass('active');
        var index = $(this).index();
        $(this).parents('.side-combination-shequ').find('.side-haowu-zhongce').eq(index).addClass('active').siblings().removeClass('active');
        if (!$('#J_side_combination .active .J_side_tab_slick').hasClass('slick-slider')) {
            $('.active .J_side_tab_slick').slick({
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 400,
                prevArrow: btnPrev,
                nextArrow: btnNext
            });
        } else {
            $('#J_side_combination .active .J_side_tab_slick').slick('refresh');
        }
    });
    $('.J_side_jingxuan .J_side_tab > span, .J_yuanchuang_shequ_side .J_side_tab > span').click(function () {
        $(this).addClass('active').siblings('span').removeClass('active');
        var _link = $(this).attr('data-more');
        $(this).parents('.z-side-head').find('.z-side-more a').attr('href', _link);
        var index = $(this).index();
        $(this).parents('.z-side-head').siblings('.J_hover_show').eq(index).addClass('show').siblings().removeClass('show');
    });
    $('.J_hover_show li').on('mouseenter', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // 侧边栏单个轮播初始化
    var $ycSideSlick = $('.J_side_yuanchuang_slick');
    if ($ycSideSlick.length) {
        $ycSideSlick.each(function (index) {
            var $that = $(this);
            // var $thatWrap = $that.parent().parent();
            // var autoplay = index === 0;
            $that.on('beforeChange', function (ev, slick, currIndex, nextIndex) {
                // $thatWrap.find('.J_side_slick_num').html(nextIndex + 1 + '&nbsp;/&nbsp;' + ($thatWrap.find('.side-yuanchuang').length - 2));
            }).slick({
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 400,
                prevArrow: btnPrev,
                nextArrow: btnNext
            });
        });
    }
});
