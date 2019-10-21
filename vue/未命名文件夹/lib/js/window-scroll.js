/*
    右侧挂件吸顶 + 返回顶部 by liuyongsheng
*/
/* eslint-disable */
$(function () {
    var $doc = $(document);
    var $backTop = $('#J_back_top');
    var $footer = $('#footer');
    var viewHeight = $(window).height();
    var $subBackTop = $backTop.parent().hasClass('J_index_elevator') ? $() : $backTop.parent();
    var $contentWrap = $('#feed-wrap');
    var contentTop = $contentWrap.length ? $contentWrap.offset().top : 0;
    var sideHeight = $('#feed-side').height();

    var $sideFixeds = $('#feed-side>div.J_side_scroll_fixed');
    var $sideFixedsHeight = $sideFixeds.height();
    // $sideFixeds = $sideFixeds.hasClass('J_side_scroll_fixed') ? $sideFixeds.add($sideFixeds.prev('div')) : $('#feed-side>div').last();
    // var firstBlockTop = $sideFixeds.length ? $sideFixeds.first().position().top : 0;
    var feedSideTop = $('#feed-side').length ? $('#feed-side').offset().top : 0;

    var navHeight = $('#global-nav').height();
    var leftHeight = $('#feed-main').height();
    var rightHeight = $('#feed-side').length ? $('#feed-side').height() : 0;
    var isUseSideFixed = ((leftHeight - rightHeight - $sideFixedsHeight) > 0) && $contentWrap.length && ($sideFixeds.length === 1);
    $footer.append($subBackTop);
    $('#feed-main-list').bind('feedload leftHeightChange', function () {
        setTimeout(function () {
            leftHeight = $('#feed-main').height();
            isUseSideFixed = ((leftHeight - rightHeight - $sideFixedsHeight) > 0);
            if ($sideFixeds.length) {
                checkFixedSides($(document).scrollTop(), $footer.position().top);
            }
        }, 0);
    });

    if ($sideFixeds.length === 1) {
        var fixedSide = $('#feed-side>div.J_side_scroll_fixed').clone(true).addClass('J_side_fixed_copy');
        $('#feed-side').append(fixedSide);
    }

    $(window).scroll(function (e) {
        var docScrollTop = $doc.scrollTop();
        var footerTop = $footer.position().top;

        // 返回顶部按钮显示或隐藏
        if (docScrollTop > 0) {
            $backTop.addClass('show');
        } else {
            $backTop.removeClass('show');
        }

        // 返回顶部及反馈按钮距离footer 30px
        if (docScrollTop > footerTop - viewHeight) {
            $subBackTop.addClass('fixed-footer');
        } else {
            $subBackTop.removeClass('fixed-footer');
        }
        leftHeight = $('#feed-main').height();
        rightHeight = $('#feed-side').length ? $('#feed-side').height() : 0;
        // feed流-右侧挂件-吸顶挂件高度
        // if ((leftHeight - rightHeight - $sideFixedsHeight) > 0) {
            feedSideTop = $('#feed-side').offset().top;
            contentTop = $contentWrap.length ? $contentWrap.offset().top : 0;
            sideHeight = $('#feed-side').height();
            checkFixedSides(docScrollTop, footerTop);
        // }
    });

    // 返回顶部
    $backTop.on('click', 'a', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    // function requestAnimation (fn) {
    //     var scrolling = false;
    //     return function () {
    //         if (!scrolling) {
    //             window.requestAnimationFrame(function (e) {
    //                 fn.call(e);
    //                 scrolling = false;
    //             });
    //             scrolling = true;
    //         }
    //     };
    // }

    // 固定指定边栏模块
    function checkFixedSides (docScrollTop, footerTop) {
        if (docScrollTop > sideHeight + feedSideTop - navHeight) {
            if ($('.J_side_fixed_copy').hasClass('J_side_fixed_animation')) {
                checkFootOverlay(docScrollTop); 
            } else {
                $('.J_side_fixed_copy').addClass('J_side_fixed_animation').slideDown('fast');
                if ($('.J_side_fixed_copy .J_side_tab_slick').length === 1) {
                    $('.J_side_fixed_copy .J_side_tab_slick').slick('refresh');
                }
            }
        } else {
            $('.J_side_fixed_copy').slideUp('fast', function () {
                $(this).removeClass('J_side_fixed_animation');
            });
        }
    }

    // 获取所有元素的总高度
    function getTotalHeight ($elems) {
        var total = 0;

        $.each($elems, function (index, el) {
            total += $(el).height();
        });

        return total;
    }

    // 检测固顶元素是否与footer重叠
    function checkFootOverlay (docScrollTop) {
        var $fixedElems = $('#feed-side > div.J_side_fixed_animation');
        var fixedBottom = navHeight + getTotalHeight($fixedElems);
        var contentHeight = $contentWrap.height();

        if (docScrollTop + fixedBottom > contentTop + contentHeight) {
            $fixedElems.each(function (index, el) {
                var $el = $(el);
                if (!$el.hasClass('J_side_fixed_absolute')) {
                    $el.addClass('J_side_fixed_absolute');
                }
            });
        } else {
            $fixedElems.each(function (index, el) {
                var $el = $(el);
                if ($el.hasClass('J_side_fixed_absolute')) {
                    $el.removeClass('J_side_fixed_absolute');
                }
            });
        }
    }
});
