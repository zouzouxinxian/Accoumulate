/* eslint-disable */
var mustache = require('mustache');
var page = require('./pagenation.js');
var QRCode = require('qrcode');

var feedTemplate = $('#J_feed_tpl').html();
var adfeedTemplate = $('#J_feed_ad').html();
var $mainFeed = $('#feed-main-list');
var $loadingbar = $('#J_feed_loading');
var $pagenation = $('#J_feed_pagenation');

function setupAJAX (_feedUrl, _sendTimesort) {
    if ($('#is_auto_load').val() !== '1' || pagenationTop === null) return;
    // 阻止 mustache 把html字符串编码
    mustache.escape = function (value) {
        return value;
    };
    // 提前解析模板，优化性能
    mustache.parse(feedTemplate);
    mustache.parse(adfeedTemplate);


    // **************mustache*************
    sendTimesort = _sendTimesort;
    feedUrl = _feedUrl;
    loadEvents();

    // 上一页
    $pagenation.on('click', '.prev-page', function (e) {
        e.preventDefault();
        $mainFeed.empty();
        select_page = current_page - 1;
        $(window).scrollTop($('#feed-main > .feed-main-con').offset().top - $tab_height);
        $loadingbar.show();

        dataLayer.push({'event': 'listvpage', 'vpage': $(this).find('a').attr('href').replace(/\/\//, '')});

        getFeeds(function () {
            $loadingbar.hide();
            pagenationTop = $('#J_feed_pagenation').offset().top;
            count = 0;
            lock = false;
            page.pageInit(current_page, select_page, total_page, PAGE_URL);
            document.title = PAGE_TITLE + '_第' + select_page + '页';
            current_page -= 1;
            select_page = 0;
        }, true);
    });
    // 下一页
    $pagenation.on('click', '.next-page', function (e) {
        e.preventDefault();
        $mainFeed.empty();
        select_page = current_page + 1;
        $(window).scrollTop($('#feed-main > .feed-main-con').offset().top - $tab_height);
        $loadingbar.show();

        dataLayer.push({'event': 'listvpage', 'vpage': $(this).find('a').attr('href').replace(/\/\//, '')});

        getFeeds(function () {
            $loadingbar.hide();
            pagenationTop = $('#J_feed_pagenation').offset().top;
            count = 0;
            lock = false;
            page.pageInit(current_page, current_page + 1, total_page, PAGE_URL);
            document.title = PAGE_TITLE + '_第' + (Number(current_page) + 1) + '页';
            current_page += 1;
        }, true);
    });
    // 选择页码
    $pagenation.on('click', '.page-number', function (e) {
        e.preventDefault();
        var page_number = Number($(this).text());
        $mainFeed.empty();
        // $(window).scrollTop($('#feed-main > .z-column-head').offset().top - 34);
        $loadingbar.show();
        // 判断ajax传参 timesort || page
        if (page_number === current_page) {
            return;
        } else {
            select_page = page_number;
            dataLayer.push({'event': 'listvpage', 'vpage': $(this).find('a').attr('href').replace(/\/\//, '')});
        }
        getFeeds(function () {
            $loadingbar.hide();
            pagenationTop = $('#J_feed_pagenation').offset().top;
            count = 0;
            page.pageInit(current_page, page_number, total_page, PAGE_URL);
            if (page_number == 1) {
                document.title = PAGE_TITLE;
            } else {
                document.title = PAGE_TITLE + '_第' + page_number + '页';
            }
            current_page = page_number;
            select_page = 0;

            // 滚动到一开始
            if ($('ul.column-tab-name')[0]) {
                $('html, body').animate({
                    scrollTop: tagtop - 40
                }, 10, function () {
                    lock = false;
                });
            } else {
                lock = false;
            }
        }, true);
    });
}
function loadEvents () {
    // 访问带页码的地址 渲染pagenation UI
    var t_page = Number($('#J_total_page').val()),
        c_page = Number($('#J_current_page').val());
    if (t_page && c_page) {
        current_page = c_page;
        total_page = t_page;
        page.pageInit(c_page, c_page, t_page, PAGE_URL);
    }

    $(window).bind('scroll', throttle(function (e) {
        // 如果tab不存在，或者tab存在，并且第一个“什么值得买精选”为当前状态时
        if (!$('.column-tab-name')[0] || !!$('.column-tab-name').find('li').eq(0).hasClass('current')) {
            // 三页之后就不再加载元素了，时间流
            if (lock || isStop) return;
            pagenationTop = $('#J_feed_pagenation').offset().top;
            console.log('$doc.scrollTop()', $doc.scrollTop() + viewHeight, pagenationTop);
            if ($doc.scrollTop() + viewHeight > pagenationTop) {
                lock = true;
                $loadingbar.show();
                getFeeds(function () {
                    $loadingbar.hide();
                    pagenationTop = $('#J_feed_pagenation').offset().top;
                    current_page += 1;
                    if ($('.J_sort_text').text() === '综合排序') {
                        //  无限滚动
                        lock = false;
                    } else {
                        count++;
                        // 滚动两屏之后禁止滚动加载
                        if (count >= 2) {
                            lock = true;
                        } else {
                            lock = false;
                        }
                        page.pageInit(current_page, current_page, total_page, PAGE_URL);
                    }
                }, false);
            }
        }
    }, 500)).bind('resize', function (e) {
        viewHeight = $(window).height();
        pagenationTop = $('#J_feed_pagenation').offset().top;
    });
}

function getFeeds (callback, isPage) {
    var lastTimesort = $mainFeed.children().last().attr('timesort');
    var data = {};
    if (isPage) {
        data = {
            p: select_page
        };
        // 分页url statePush
        if (select_page == 1) {
            window.history.pushState('', '', '/');
        } else {
            window.history.pushState('', '', '/p' + select_page + '/');
        }
    } else {
        data = sendTimesort ? {
            timesort: lastTimesort,
            p: current_page + 1
        } : {
            page: targetPage
        };
    }
    if (pastNum) {
        data.past_num = pastNum;
    }

    $.ajax({
        url: feedUrl,
        type: 'GET',
        dataType: 'json',
        data: data
    })
        .done(function (datas) {
            var allHtml = '';
            var topData = '';
            var newdatas = datas.data;
            if (newdatas.length === 0 && $('.J_sort_text').text() === '综合排序') {
                isStop = true;
                $loadingbar.hide();
                return;
            }
            total_page = parseInt(datas.total / 20) + 1;
            pastNum = datas.past_num;
            // 置顶的插入
            if (isPage) {
                if (typeof datas.top_data !== 'undefined' && datas.top_data.length) {
                    topData = datas.top_data;
                }
            }
            $mainFeed.trigger('feedload', newdatas);

            if (!newdatas || newdatas.length === 0 || newdatas.error_code === 1) {
                callback();
                return;
            }

            var imgHtml = '';
            var theLastPosition = 0;
            if ($('#feed-main-list>li').length > 0) {
                var eq_position = $('#feed-main-list>li').length - 1;
                theLastPosition = +$('#feed-main-list>li').eq(eq_position).attr('data-position');
            }
            console.log('theLastPosition', theLastPosition);
            $.each(newdatas, function (index, data) {
                // 增加字段，判断是否是拼多多
                if (data.article_mall === '拼多多') {
                    data.weChat = true;
                }

                // 上次阅读到这里
                if (data.type && data.type === 'recommend_feed_line') {
                    data.is_read_history = data;
                }
            });

            // *************mustache*****************
            $.each(newdatas, function (k, v) {
                allHtml += mustache.render(feedTemplate, v);
            });

            var $newLists = $(allHtml).filter('li');

            // 二维码
            if ($('.J_wechat_qrcode').length) {
                $('.J_wechat_qrcode').each(function (index, element) {
                    var img = $(element).data('url');
                    QRCode.toDataURL(img, {
                        errorCorrectionLevel: 'H',
                        type: 'image/png',
                        margin: 0,
                        width: 120,
                        height: 120,
                        rendererOpts: {
                            quality: 0.92
                        }
                    }, function (err, url) {
                        if (err) {
                            throw err;
                        }
                        // var img = document.getElementsByClassName('J_weChat_qrcode')[0];
                        // img.src = url;
                        $(element).attr('src', url);
                    });
                });
            }

            callback();
        })
        .fail(function () {
            console.error('get data failed');
        });
}

module.exports = {
    setupAJAX: setupAJAX,
    getFirstPage: getFirstPage
};
