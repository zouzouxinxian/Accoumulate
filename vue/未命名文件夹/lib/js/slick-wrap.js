/**
 * Created by caoxudong on 16/7/11.
 */
$(function () {
    var btnPrev = '<button type="button" class="z-slick-btn-prev z-icons"><i class="z-icon-arrow-left"></i></button>',
        btnNext = '<button type="button" class="z-slick-btn-next z-icons"><i class="z-icon-arrow-right"></i></button>',
        $bannerSlick = $('.J_slick'),
        $sideSlick = $('.J_side_slick'),
        $ycSideSlick = $('.J_side_yuanchuang_slick'),
        $quanSlick = $('.J_quan_slick'),
        $videoSlick = $('.J_video_slick'),
        $baicaiSlick = $('.J_baicai_slick');

    if ($bannerSlick.length) {
        $bannerSlick.each(function () {
            $(this).slick({
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

    if ($sideSlick.length) {
        $sideSlick.each(function () {
            $(this).slick({
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 400,
                prevArrow: btnPrev,
                nextArrow: btnNext
            });
        });
    }

    if ($ycSideSlick.length) {
        $ycSideSlick.each(function (index) {
            var $that = $(this);
            var $thatWrap = $that.parent().parent();
            var autoplay = index === 0;
            $that.on('beforeChange', function (ev, slick, currIndex, nextIndex) {
                $thatWrap.find('.J_side_slick_num').html(nextIndex + 1 + '&nbsp;/&nbsp;' + ($thatWrap.find('.side-yuanchuang').length - 2));
            }).slick({
                infinite: true,
                autoplay: autoplay,
                autoplaySpeed: 5000,
                speed: 400,
                prevArrow: btnPrev,
                nextArrow: btnNext
            });
        });
    }

    // 优惠券详情页的slick
    if ($quanSlick.length) {
        $quanSlick.each(function () {
            $(this).slick({
                dots: false,
                infinite: true,
                autoplay: false,
                speed: 400,
                slidesToShow: 4,
                slidesToScroll: 4,
                variableWidth: false,
                prevArrow: btnPrev,
                nextArrow: btnNext
            });
        });
    }

    if ($videoSlick.length) {
        $videoSlick.each(function () {
            $(this).slick({
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

    if ($baicaiSlick.length) {
        $baicaiSlick.each(function () {
            var $that = $(this);
            var autoplay = $that.children('.slick-item').length > 1;
            var prevArrow = $that.children('.slick-item').length > 1 ? btnPrev : '';
            var nextArrow = $that.children('.slick-item').length > 1 ? btnNext : '';

            $that.on('beforeChange', function (ev, slick, currIndex, nextIndex) {
                $that.prev('.slick-number').html(nextIndex + 1 + '&nbsp;/&nbsp;' + ($that.find('.slick-item').length - 2));
            }).slick({
                infinite: true,
                autoplay: autoplay,
                autoplaySpeed: 5000,
                speed: 400,
                prevArrow: prevArrow,
                nextArrow: nextArrow
            });
        });
    }
});
