/**
 * Created by caoxudong on 16/7/25.
 */
var config = require('./config'),
    util = require('./utilities'),
    pop = require('./pop');
/* 点值或不值操作 */
/**
 * @for 点赞/值/不值/收藏
 * @type click click事件
 * DOM取参数说明
 * @dom_param data-channel 频道名
 * @dom_param data-article 文章名
 * @dom_param data-type {zhi:点值/不值操作,zan:点赞,fav:收藏}
 * @dom_param data-zhi-type `可选` 若 'data-type="zhi" 则 -1不值,1值,否则其不存在
 *
 * @author caoxudong
 * */
$(document).on('click', '.J_zhi_like_fav', function () {
    /**
     * @for 元素相关信息变量获取
     * */
    var that = $(this),
        type = that.data('type'),
        articleId = that.data('article'),
        channelId = that.data('channel'),
        zhiFlag = that.data('zhi-type'),
        isHaowu = that.data('haowu'),
        isSearch = that.data('search'), // 搜索页点值/不值的样式有区别, 需要单独处理
        isWikiComment = that.data('wiki-comment'); // wiki点评点赞接口不同...
        // 优惠:值data-channel="" data-article="" data-search="1" data-type="zhi" data-zhi-type="1",不值data-zhi-type="-1",收藏data-channel="" data-article="" data-type="fav"
        // 闲置:赞 data-channel="" data-article="" data-type="zan"
        // 资讯,众测,品牌精选等等等等:收藏 data-channel="" data-article="" data-type="fav"
        // 原创:赞data-channel="" data-article="" data-type="zan",收藏data-channel="" data-article="" data-type="fav"

    // 因为百科商品点赞/收藏接口与好物的点值/收藏接口相同, 所以把百科商品的赞的属性改成好物的就能通用,
    // 百科商品:赞 data-article="" data-type="zhi" data-zhi-type="1" data-search="1" data-haowu="1", 收藏 data-article="" data-type="fav" data-haowu="1"
    // 百科点评:赞 data-article="" data-type="zan" data-wiki-comment="1"
    // 百科话题:收藏 data-article="" data-type="fav" data-wiki-topic="1"

    // product_recommend_post    好物/百科商品点赞cookie
    // smzdm_zk_collection       好物/百科商品收藏cookie
    /**
     * @for 首页点赞之后ajax回调
     * */
    var zanCb = function () {
            if (!that.hasClass('active')) {
                that.find('span.one-plus').fadeIn().animate({top: '-25px'}, 'normal').fadeOut(300, function () {
                    that.find('.feed-number').html(Number(that.find('.feed-number').html()) + 1);
                });
                that.addClass('active').find('i').attr('class', 'icon-thumb-up');
            }
        },
        /**
         * @for 首页点赞之后ajax回调
         * */
        zhiCb = function () {
            if (!that.parent().hasClass('voted')) {
                if (Number(zhiFlag) === 1) {
                    that.find('span.one-plus').fadeIn().animate({top: '-15px'}, 'normal').fadeOut(300);
                    that.find('.unvoted-wrap span').html(Number(that.find('.unvoted-wrap span').html()) + 1);
                    that.parent().addClass('voted');
                    if (Number(isSearch) === 1) {
                        that.parent().removeClass('price-btn-hover');
                        that.addClass('zhi-active');
                    }
                } else if (Number(zhiFlag) === -1) {
                    that.find('span.one-plus').fadeIn().animate({top: '15px'}, 'normal').fadeOut(300);
                    that.find('.unvoted-wrap span').html(Number(that.find('.unvoted-wrap span').html()) + 1);
                    that.parent().addClass('voted');
                    if (Number(isSearch) === 1) {
                        that.parent().removeClass('price-btn-hover');
                        that.addClass('buzhi-active');
                    }
                }
            }
        };

    // 判断是否pc
    function isPC () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }

    /**
     * @for 点值和赞之后执行的逻辑
     * */
    // 点值点赞+1ajax能走到success即可,前端无需使用返回的数据
    (function () {
        var callback, otype;
        if (type === 'zan') { // 赞
            // 如果元素已经点过(或者已经通过cookie初始化为active已点击状态)则不可点,直接返回
            if (that.hasClass('active')) {
                return;
            }
            callback = zanCb;
            otype = '点赞';
            // 赞的值默认是1,data-type='zan'的元素中没有存data-zhi-type的数据,但是后端已有的结构有这个字段,因此固定其值为1
            zhiFlag = 1;
        } else if (type === 'zhi') { // [首页]值/不值
            // 如果点击元素已经点过则不可点,直接返回
            if (that.parent().hasClass('voted')) {
                return;
            }
            callback = zhiCb;
            otype = zhiFlag === 1 ? '值' : '不值';
        } else {
            return;
        }
        if (Number(isHaowu) === 1) { // 非wiki         //TODO 原先为if(isHaowu!=1) 需要跟php确认, 是否只有=1的情况
            /* 搜索页百科商品的点赞和收藏可以共用好物的, 百科点评的赞和百科话题的收藏是单独的 */
            if (type === 'zhi') { // 好物和wiki点值
                var wikiUrl = config.ZHIKU_BASE_AJAX;
                $.ajax({
                    type: 'get',
                    url: wikiUrl + 'xhr_shared/add_recommend/', // 对某篇百科产品的点值操作
                    data: 'pro_id=' + articleId,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (resp) {
                        if (resp.error_code === 0) {
                            if (!that.parent().hasClass('voted')) {
                                if (Number(zhiFlag) === 1) { // 好物频道没有不值
                                    that.find('span.one-plus').fadeIn().animate({top: '-15px'}, 'normal').fadeOut(300, function () {
                                        that.find('.unvoted-wrap span').html(Number(that.find('.unvoted-wrap span').html()) + 1);
                                    });
                                    that.parent().addClass('voted');
                                    if (isSearch) {
                                        that.addClass('active');
                                    }
                                    util.setCookieInObj('product_recommend_post', articleId, zhiFlag);
                                }
                            }
                        }
                    }
                });
            }
        } else if (Number(isWikiComment) === 1) {
            // TODO 百科点评 点赞 请求后参照好物setCookie
            if (type === 'zan') {
                var proHashId = that.data('hash-id');
                wikiUrl = config.ZHIKU_BASE_AJAX;
                $.ajax({
                    type: 'get',
                    url: wikiUrl + 'xhr_detail/comment_support/', // 对某篇百科产品的点值操作
                    data: 'comment_id=' + articleId + '&pro_hash_id=' + proHashId,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (resp) {
                        if (resp.status === 1) {
                            if (!that.parent().hasClass('voted')) {
                                that.find('span.one-plus').fadeIn().animate({top: '-15px'}, 'normal').fadeOut(300, function () {
                                    that.find('.unvoted-wrap span').html(Number(that.find('.unvoted-wrap span').html()) + 1);
                                });
                                that.parent().addClass('voted');
                                that.addClass('active');
                                util.setCookieInObj('wiki_comment_sopport', articleId, zhiFlag);
                            }
                        }
                    }
                });
            }
        } else {
            $.ajax({
                type: 'get',
                url: config.ZHIYOU_BASE_URL + 'user/rating/jsonp_add',
                data: {
                    article_id: articleId,
                    channel_id: channelId,
                    rating: zhiFlag,
                    client_type: /smzdm/i.test(navigator.userAgent) ? /android/i.test(navigator.userAgent) ? 'android' : 'iphone' : isPC() ? 'PC' : 'WAP',
                    event_key: '点值',
                    otype: otype,
                    aid: articleId,
                    p: that.attr('data-position') || that.parents('li').attr('data-position') || '无',
                    cid: that.attr('data-cid') || that.parents('li').attr('data-cid') || '无',
                    source: '无',
                    atp: that.attr('data-atp') || that.parents('li').attr('data-atp') || '无',
                    tagID: that.attr('data-tagID') || that.parents('li').attr('data-tagID') || '无',
                    sourcePage: document.referrer || '无',
                    sourceMode: '无'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function () {
                    // 值和赞不需要传参
                    callback();
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    })();

    /**
     * @for 点击收藏的操作
     * @param {String} articleId 元素data-article的值
     * @param {String} channelId 元素data-channel的值
     * */

    (function (articleId, channelId) {
        if (type === 'fav') {
            if (Number(isHaowu) === 1) { // 非wiki收藏
                /* 搜索页百科商品的点赞和收藏可以共用好物的, 百科点评的赞和百科话题的收藏是单独的 */
                var wikiUrl = config.ZHIKU_BASE_AJAX; // wiki收藏
                $.ajax({
                    type: 'get',
                    url: wikiUrl + 'xhr_detail/collection/', // 对某篇百科商品的添加或取消收藏操作
                    data: {random: Math.random(), pro_hash_id: articleId},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (resp) {
                        var favNum;
                        if (resp.status === 3) {
                            // 用户需要登录
                            $('.J_login_trigger').trigger('click');
                        } else if (resp.status === 4) {
                            // 收藏成功
                            pop.favPop(config.ZHIYOU_BASE_URL + 'user/zhiku_love', '已收藏');
                            favNum = Number(that.find('span').html()) + 1;
                            if (favNum < 0) {
                                favNum = 0;
                            }
                            that.find('span').html(favNum);
                            that.addClass('active');
                            // 前端写入cookie
                            util.setCookieInArr('smzdm_zk_collection', articleId);
                        } else if (resp.status === 6) { // 取消收藏
                            // 取消收藏
                            pop.favPop(config.ZHIYOU_BASE_URL + 'user/zhiku_love', '已取消收藏');
                            favNum = Number(that.find('span').html()) - 1;
                            if (favNum < 0) {
                                favNum = 0;
                            }
                            that.find('span').html(favNum);
                            that.removeClass('active');
                            util.deleteCookieInArr('smzdm_zk_collection', articleId);
                        }
                    }
                });
            } else {
                var zhiyouUrl = config.ZHIYOU_LOGIN_BASE_URL + 'user/favorites/'; // 添加&取消收藏接口
                var cid, atp, tagid, position;

                if (that.data('cid')) {
                    cid = that.data('cid');
                } else if (that.parents('li').data('cid')) {
                    cid = that.parents('li').data('cid');
                } else {
                    cid = '无';
                }

                if (that.data('atp')) {
                    atp = that.data('atp');
                } else if (that.parents('li').data('atp')) {
                    atp = that.parents('li').data('atp');
                } else {
                    atp = '无';
                }

                if (that.data('tagid')) {
                    tagid = that.data('tagid');
                } else if (that.parents('li').data('tagid')) {
                    tagid = that.parents('li').data('tagid');
                } else {
                    tagid = '无';
                }

                if (that.data('position')) {
                    position = that.data('position');
                } else if (that.parents('li').data('position')) {
                    position = that.parents('li').data('position');
                } else {
                    position = '无';
                }

                // 服务器日志上报 相关字段
                var serverLogObj = {
                    client_type: getClientType(),
                    event_key: '收藏',
                    otype: that.hasClass('active') || that.hasClass('current') ? '取消收藏' : '收藏',
                    aid: articleId,
                    cid: cid,
                    p: position,
                    source: '无',
                    atp: atp,
                    tagID: tagid,
                    sourcePage: !document.referrer ? '无' : document.referrer,
                    sourceMode: '无'
                };

                $.ajax({
                    type: 'get',
                    url: zhiyouUrl + 'jsonp_favorite',
                    data: {
                        article_id: articleId,
                        channel_id: channelId,
                        client_type: serverLogObj.client_type,
                        event_key: serverLogObj.event_key,
                        otype: serverLogObj.otype,
                        aid: serverLogObj.aid,
                        cid: serverLogObj.cid,
                        p: serverLogObj.p,
                        source: serverLogObj.source,
                        atp: serverLogObj.atp,
                        tagID: serverLogObj.tagID,
                        sourcePage: serverLogObj.sourcePage,
                        sourceMode: serverLogObj.sourceMode
                    },
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (resp) {
                        // 这个map用来点击收藏之后在弹窗中显示对应链接地址的,相关字段跟cookie存储中的略有不同

                        var channelMap = {3: 'youhui', 6: 'news', 11: 'yuanchuang', 7: 'zhongce', 8: 'pingce', 16: '2', 31: 'newbrand_topic', 12: 'wiki', 38: 'v'};
                        var favNum;
                        var numStr = that.find('span').html();
                        if (resp.error_code === 0) {
                            // 收藏成功
                            pop.favPop(zhiyouUrl + channelMap[channelId], '已收藏', channelId);
                            /* 2.1K 这种情况 */
                            if (numStr.indexOf('K') > -1 || numStr.indexOf('k') > -1) {
                                // 不做处理
                            } else {
                                favNum = Number(numStr) + 1;
                                if (favNum < 0) {
                                    favNum = 0;
                                }
                                that.find('span').html(favNum);
                                if (that.hasClass('J_zhi_like_fav_detail')) {
                                    $('.J_zhi_like_fav_detail').find('span').html(favNum);
                                }
                            }
                            that.addClass('active').find('i').attr('class', 'icon-star');
                            if (that.hasClass('J_zhi_like_fav_detail')) {
                                $('.J_zhi_like_fav_detail').addClass('active').find('i').attr('class', 'icon-star');
                            }
                            // 添加cookie, wiki 详情页
                            if (channelId === 12) {
                                util.setCookieInArr('smzdm_tp_collection', articleId);
                                util.setCookieInArr('smzdm_collection_youhui', articleId);
                            }
                            // 埋点添加自定义属性
                            that.attr('data-severs', '取消收藏');
                        } else if (resp.error_code === 2) {
                            /* 2.1K 这种情况 */
                            if (numStr.indexOf('K') > -1 || numStr.indexOf('k') > -1) {
                                // 不做处理
                            } else {
                                // 取消收藏
                                pop.favPop(zhiyouUrl + channelMap[channelId], '已取消收藏', channelId);
                                favNum = Number(that.find('span').html()) - 1;
                                if (favNum < 0) {
                                    favNum = 0;
                                }
                                that.find('span').html(favNum);
                            }
                            that.removeClass('active').find('i').attr('class', 'icon-star-o-thin');
                            if (that.hasClass('J_zhi_like_fav_detail')) {
                                $('.J_zhi_like_fav_detail').find('span').html(favNum);
                                $('.J_zhi_like_fav_detail').removeClass('active').find('i').attr('class', 'icon-star-o-thin');
                            }
                            // 删除cookie, wiki 详情页
                            if (channelId === 12) {
                                util.deleteCookieInArr('smzdm_tp_collection', articleId);
                            }
                            // 埋点添加自定义属性
                            that.attr('data-severs', '收藏');
                        } else if (resp.error_code === 5) {
                            // 用户需要登录
                            $('.J_login_trigger').trigger('click');
                        } else if (resp.error_code === 6) {
                            // 服务器错误
                        } else if (resp.error_code === 1) {

                        }
                    },
                    error: function () {

                    }
                });
            }
        }
    })(articleId, channelId);

    /**
     * @func
     * @desc     服务端日志上报 获取客户端类型函数
     * @Author   liwei
     * @DateTime 2018-09-12
     * @return   {string}   [description]
     */
    function getClientType () {
        var ua = navigator.userAgent;
        if (/smzdmapp/i.test(ua)) {
            return /(Android)/i.test(ua) ? 'android' : 'iphone';
        } else {
            return /(Android)|i(Phone|Pad|Pod|OS)/i.test(ua) ? 'WAP' : 'PC';
        }
    }
});

/**
 * @for 通过cookie初始化页面收藏/点值/点赞的一些状态(点过或者没有点过)
 * @type IIFE
 *
 * @author caoxudong
 * */
var setActive = function () {
    var $obj = $('.J_zhi_like_fav');
    // 初始化点赞/点值
    var channelMapZhiorZan = [0, 3, 6, 7, 8, 9, 10, 11, 16, 38, 12]; // 看原来代码的意思,这个map是根据服务器端存储cookie的已经有的字段生成的,每个代表一个频道,只有这些频道才会生成smzdm_rating_x的cookie
    var channelMapFav = [
        [3, 'youhui'],
        [6, 'news'],
        [7, 'test'],
        [8, 'test_probation'],
        [11, 'yuanchuang'],
        [16, 'second'],
        [31, 'newbrand_topic'],
        [38, 'video'],
        [12, 'wiki']
    ];
    var articleIdInCookie;
    $obj.each(function () {
        var that = $(this),
            type = $(this).data('type'),
            articleId = $(this).data('article'),
            channelId = $(this).data('channel'),
            zhiOrNot = $(this).data('zhi-type'), // 之前的逻辑也没有用到这个,暂时放这以备用.
            isHaowu = $(this).data('haowu'),
            isSearch = that.data('search'),
            isWikiComment = that.data('wiki-comment'),
            isWikiTopic = that.data('wiki-topic'),
            getCookieKey,
            getCookieValue;

        // 点赞的cookie存储类型为smzdm_rating_x = {articleId:y,};x为频道id,articleId为文章id,y值1为值,-1为不值,赞的y默认是1
        // 获取cookie中存储的点赞/点值的状态

        if (type === 'zhi' || type === 'zan') { // 值或者赞
            if (Number(isHaowu) === 1) { // 好物和百科商品
                getCookieKey = 'product_recommend_post';
                getCookieValue = util.getCookie(getCookieKey);
                if (getCookieValue !== '') {
                    getCookieValue = JSON.parse(util.getCookie(getCookieKey));
                    for (articleIdInCookie in getCookieValue) {
                        if (articleId === articleIdInCookie) {
                            if (type === 'zhi') {
                                // 只要是zhi,不管其点的是不值还是值都是不可点(即不判断zhiOrNot)
                                if (!that.parent().hasClass('voted')) {
                                    that.parent().addClass('voted');
                                }
                                if (Number(isSearch) === 1) { // 搜索
                                    if (zhiOrNot === getCookieValue[articleIdInCookie]) {
                                        that.parent().removeClass('price-btn-hover');
                                        that.addClass('active');
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (Number(isWikiComment) === 1) {
                // TODO wiki点评 点赞
                getCookieKey = 'wiki_comment_sopport';
                getCookieValue = util.getCookie(getCookieKey);
                if (getCookieValue !== '') {
                    getCookieValue = JSON.parse(util.getCookie(getCookieKey));
                    for (articleIdInCookie in getCookieValue) {
                        if (articleId === articleIdInCookie) {
                            if (type === 'zan') {
                                // 只要是zhi,不管其点的是不值还是值都是不可点(即不判断zhiOrNot)
                                if (!that.parent().hasClass('voted')) {
                                    that.parent().addClass('voted');
                                }
                                that.parent().removeClass('price-btn-hover');
                                that.addClass('active');
                            }
                        }
                    }
                }
            } else { // 非好物
                $.each(channelMapZhiorZan, function (key, value) {
                    // 如果当前元素的type存在于channel_map中时才进一步操作
                    if (value === channelId) {
                        getCookieKey = 'smzdm_rating_' + value;
                        getCookieValue = util.getCookie(getCookieKey);
                        if (getCookieValue !== '') {
                            getCookieValue = JSON.parse(getCookieValue);
                            for (articleIdInCookie in getCookieValue) {
                                if (articleId === Number(articleIdInCookie)) {
                                    if (type === 'zan') {
                                        // 这个赞已经点过并存储在cookie中,因此标记为已经点过
                                        that.addClass('active').find('i').attr('class', 'icon-thumb-up');
                                    } else if (type === 'zhi') {
                                        // 只要是zhi,不管其点的是不值还是值都是不可点(即不判断zhiOrNot)
                                        if (!that.parent().hasClass('voted')) {
                                            that.parent().addClass('voted');
                                        }
                                        if (Number(isSearch) === 1) { // 搜索
                                            if (zhiOrNot === getCookieValue[articleIdInCookie]) {
                                                that.parent().removeClass('price-btn-hover');
                                                if (Number(zhiOrNot) === 1) {
                                                    that.addClass('zhi-active');
                                                } else {
                                                    that.addClass('buzhi-active');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } else if (type === 'fav') { // 收藏
            if (Number(isHaowu) === 1) { // 好物
                getCookieKey = 'smzdm_zk_collection';
                getCookieValue = util.getCookie(getCookieKey);
                if (getCookieValue !== '' && $.inArray('' + articleId, getCookieValue.split(',')) !== -1) {
                    that.addClass('active').find('i').attr('class', 'icon-star');
                    that.attr('data-severs', '取消收藏');
                } else {
                    that.attr('data-severs', '收藏');
                }
            } else if (Number(isWikiTopic) === 1) {
                // TODO 百科话题 收藏
                getCookieKey = 'smzdm_tp_collection';
                getCookieValue = util.getCookie(getCookieKey);
                if (getCookieValue !== '' && $.inArray('' + articleId, getCookieValue.split(',')) !== -1) {
                    that.addClass('active').find('i').attr('class', 'icon-star');
                    that.attr('data-severs', '取消收藏');
                } else {
                    that.attr('data-severs', '收藏');
                }
            } else { // 好物
                // 收藏的cookie存储类型为smzdm_cookie_xxxx,xxxx为type[i][1]
                $.each(channelMapFav, function (key, value) {
                    getCookieKey = 'smzdm_collection_' + value[1];
                    getCookieValue = util.getCookie(getCookieKey);
                    if (getCookieValue !== '' && channelId === value[0] && $.inArray('' + articleId, getCookieValue.split(',')) !== -1) {
                        that.addClass('active').find('i').attr('class', 'icon-star');
                        that.attr('data-severs', '取消收藏');
                    } else {
                        that.attr('data-severs', '收藏');
                    }
                });
            }

            // 增加 "百科" 页面初始化收藏按钮状态设置
            if (Number(channelId) === 12) {
                getCookieKey = 'smzdm_collection_youhui';
                getCookieValue = util.getCookie(getCookieKey);
                // console.log('getCookieValue===', getCookieValue);
                if (getCookieValue !== '' && $.inArray('' + articleId, getCookieValue.split(',')) !== -1) {
                    that.addClass('active').find('i').attr('class', 'icon-star');
                    that.attr('data-severs', '取消收藏');
                } else {
                    that.attr('data-severs', '收藏');
                }
            }
        }
    });

    // 初始化收藏
};

$(function () {
    setActive();
});

module.exports = setActive;
