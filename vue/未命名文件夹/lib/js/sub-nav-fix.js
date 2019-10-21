$(function () {
    /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

    if ($('.sub-channel').length > 0) { // 详情页

    }

    var $globalNav = $('#global-search').eq(0);
    var $doc = $(document);
    var navTop = $globalNav.position().top + $globalNav.height();

    function navFix () {
        var docTop = $doc.scrollTop();

        if (docTop >= navTop) {
            $globalNav.addClass('mini-bar');
            $globalNav.find('svg').attr('width', '94px');
            $globalNav.find('svg').attr('height', '30px');
            $globalNav.find('image').attr('width', '94px');
            $globalNav.find('image').attr('height', '30px');
        } else {
            $globalNav.find('svg').attr('width', '151px');
            $globalNav.find('svg').attr('height', '48px');
            $globalNav.find('image').attr('width', '151px');
            $globalNav.find('image').attr('height', '48px');
            $globalNav.removeClass('mini-bar');
        }
    }
    navFix();
    $(window).scroll(function (event) {
        navFix();
    });
});
