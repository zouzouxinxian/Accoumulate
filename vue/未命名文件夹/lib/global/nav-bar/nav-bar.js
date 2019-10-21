// 导航栏hover动画
function navBarSlideDown () {
    $('.nav-list>li, .control-list>li, .login-control-list>li').each(function () {
        $(this).on({
            mouseenter: function () {
                var that = $(this);
                if (that.find('.sub-nav').length > 0) {
                    that.addClass('slide-hover');
                    that.find('.sub-nav').slideDown('fast');
                } else {
                    that.addClass('current');
                }
            },
            mouseleave: function () {
                var that = $(this);
                if (that.find('.sub-nav').length > 0) {
                    that.removeClass('slide-hover');
                    that.find('.sub-nav').stop(true, false).slideUp('fast');
                } else {
                    that.removeClass('current');
                }
            }
        });
    });
}
navBarSlideDown();
if (window.zframework && window.zframework.initNavData) {
    window.zframework.initNavData();
}
