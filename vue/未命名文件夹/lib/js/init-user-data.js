/**
 * Created by caoxudong on 16/7/26.
 */
var config = require('./config'),
    baseUrl = config.ZHIYOU_LOGIN_BASE_URL;
var utils = require('./utilities');

var startTime = Date.now();

$.ajax({
    type: 'get',
    url: baseUrl + 'user/info/jsonp_get_current',
    data: '',
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function (resp) {
        // 用户是否拥有BGM权限
        resp.smzdm_id !== 0 && resp.smzdm_id && resp.bgm.length !== 0 ? utils.setCookie('HAVE_BGM', 1, {'seconds': 86400, 'path': '/', 'domain': '.smzdm.com'}) : utils.deleteCookie('HAVE_BGM');
        // 判断用户是否已同意smzdm用户协议与隐私
        if (resp.is_agree_protocol === 0) {
            $(function () {
                $('.J_login_trigger').click();
                var ifr = document.getElementById('J_login_iframe');
                ifr.onload = function () {
                    var agreeDataJson = JSON.stringify({
                        agreeType: 'reload_post'
                    });
                    // iframe加载完主页面向子页面发送
                    ifr.contentWindow.postMessage(agreeDataJson, '*');
                    resetLoginIframe();
                };
            });
        } else {
            if (resp.smzdm_id) {
                $(document).data('loginData', resp)
                    .trigger('dataloaded', resp);
            }

            // smzdm_id为0表示未登录
            $(function () {
                if (resp.smzdm_id) {
                    init(resp);
                } else {
                    // 单独处理顶部关注按钮
                    if (resp.smzdm_id === 0 && $('.focus-lvyou').length) {
                        $('.focus-lvyou').html('<i class="icon-plus-o"></i><span>关注旅游</span>').show();
                    }
                    // 初始化评论
                    $('#textareaComment').val('');
                    $('#textareaComment, .comment_tips').addClass('zhiyou_login');
                    $.noop();
                }
            });
        }
    },
    error: function () {
    }
});

window.zframework = window.zframework || {};

// 以下接口暴露到全局，用于在页面上手动调用，以提高数据加载速度
window.zframework.initUserData = function () {
    var data = $(document).data('loginData');

    if (data) {
        userInfoInit(data);
    } else {
        $(document).unbind('dataloaded.entry').bind('dataloaded.entry', function (ev, loginData) {
            userInfoInit(loginData);
        });
    }
};

window.zframework.initNavData = function () {
    var data = $(document).data('loginData');

    if (data) {
        loginNavStatusInit(data);
        noticeInit(data);
        focusNoticeInit(data);
        hideBaoliao(data);
    } else {
        $(document).unbind('dataloaded.nav').bind('dataloaded.nav', function (ev, loginData) {
            loginNavStatusInit(loginData);
            noticeInit(loginData);
            focusNoticeInit(loginData);
            hideBaoliao(loginData);
        });
    }
};

/**
 * @Author   liwei
 * @DateTime 2018-05-03
 * @return   {[type]}   [重置iframe框架样式]
 */
function resetLoginIframe () {
    $('.popup-bg').off('click');
    $('#J_login_popup .J_popup_close').hide();
    $('#J_login_popup .z-popup-head').hide();
    $('#J_login_popup').css({
        'padding': '0',
        'width': '500px',
        'height': '410px'
    });
    $('#J_login_iframe').css({
        'width': '500px',
        'height': '410px'
    });
}
/*
    获取用户level by liuyongsheng
*/
function getLevel (resp) {
    var level = resp.level;
    return '<a href="//zhiyou.smzdm.com/user/tequan/" target="_blank" title="' + level + '级">LV' + level + '</a>';
}
/*
    获取用户v认证 by lining
*/
function getVHtml (resp) {
    /* eslint-disable camelcase */
    let official_auth = resp.logo_front.official_auth;
    if (official_auth && official_auth.official_auth_icon) {
        // 认证图标 认证文案 跳转链接
        let {official_auth_icon, official_auth_type, official_auth_url} = official_auth;
        if (!official_auth_url) {
            return `<span title="${official_auth_type}"><img class="avatar-xunzhang" src="${official_auth_icon}" _hover-ignore="1"></span>`;
        } else {
            return `<a href="${official_auth_url}" title="${official_auth_type}" target="_blank"><img class="avatar-xunzhang" src="${official_auth_icon}" _hover-ignore="1"></a>`;
        }
    }
    /* eslint-enable camelcase */

    return '';
}
/**
 * @for 用户信息初始化(包含签到模块、徽章信息)
 * @param {object} resp 请求用户信息接口的ajax返回值
 *
 * @author caoxudong
 * */
function userInfoInit (resp) {
    var userNameString, // 用户名
        punchInfoString, // 用户签到信息
        $entry = $('.J_entry'),
        $quanEntry = $('.J_quan_entry'),
        avatarUrl = resp.avatar.replace(/-small\./, '-middle.'),
        authority = resp.capabilities;
    // 设置登录状态信息
    $('body').append('<input id="log_status" type="hidden" value="1" />')
        .append('<input id="user_id" type="hidden" value="' + resp.smzdm_id + '" />');
    console.log('触发logined', resp);
    $(document).trigger('logined', { data: resp });
    // set authority flag
    if (authority !== '') {
        if (authority.administrator || authority.editor || authority.pinglun || authority.edit_posts || authority.moderate_comments) {
            $('body').append('<input type="hidden" id="authority" value="editor" />');
            $('#authority').val('all');
        }
    }
    // 如果当前页面存在用户信息模块
    if ($entry.length !== 0) {
        // 用户头像
        // 将返回的small类型的图片变成middle类型
        $('.J_avatar img.avatar-img').attr('src', avatarUrl);
        // 用户徽章
        // 现有徽章只能显示三个,按照产品给的优先级顺序,等级常驻最后一个,首席生活家 > App7.0 > 值友节 > 众测 > 金牌爆料团,因此按此顺序排列
        // 获取等级数值:
        // 拼接字符串
        userNameString = 'Hi <a class="name-link" title="' + resp.nickname + '" href="//zhiyou.smzdm.com/user" target="_blank">' + resp.nickname + '</a><span class="user-achieve">' + getLevel(resp) + '</span>';
        // userInfoString = '积分:' + resp.point + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '金币:' + resp.gold;
        if (resp.checkin.has_checkin) {
            punchInfoString = '已签到' + resp.checkin.daily_checkin_num + '天';
        } else {
            punchInfoString = '签到领奖';
        }
        var medalImg = getVHtml(resp);
        if (medalImg) {
            $('.J_avatar').append(medalImg);
        }
        $('.J_name').html(userNameString);
        // $('.J_info').removeClass('not-login').html(userInfoString);
        $('.J_punch').html(punchInfoString);
    }
    // 优惠券页面
    if ($quanEntry.length !== 0) {
        // 用户头像
        // 将返回的small类型的图片变成middle类型
        var loginContent = [
            '<a href="//zhiyou.smzdm.com/user/" class="quan-avatar" target="_blank"><img src="' + avatarUrl + '" alt="用户昵称"/></a>',
            '<div class="quan-name">Hi,<a title="' + resp.nickname + '" href="//zhiyou.smzdm.com/user" target="_blank">' + resp.nickname + '</a></div>',
            '<div class="quan-achieve"><span class="user-achieve">' + getMedal(resp) + '</span></div>',
            '<div class="quan-info"><span>积分:' + resp.point + '</span><span>金币:' + resp.gold + '</span></div>',
            '<a href="//zhiyou.smzdm.com/user/coupon/" class="quan-my-info" target="_blank">我的优惠券</a><a href="//zhiyou.smzdm.com/user/tequan/" class="quan-get" target="_blank">如何获取金币积分?</a>'
        ];
        $quanEntry.html(loginContent.join(''));
        $quanEntry.show();
    }

    console.log('init time:', Date.now() - startTime);
}
/**
 * @for 导航栏登录样式初始化,显示用户名,去除登陆/注册按钮
 * @param {object} resp 请求用户信息接口的ajax返回值
 *
 * @author caoxudong
 * */
function loginNavStatusInit (resp) {
    $('.J_login_trigger').parent('.nav-logins').hide();
    $('.J_user_entry').show();
    $('.J_nav_username').html(resp.nickname);
}
/**
 * @for 消息提醒初始化
 * @param {object} resp 请求用户信息接口的ajax返回值
 *
 * @author caoxudong
 * */
function noticeInit (resp) {
    var $noticeBlock = $('.J_notice'),
        $message = $('.J_notice_message'),
        $commnet = $('.J_notice_comment'),
        $menuMessage = $('.J_menu_message'),
        $menuComment = $('.J_menu_comment');
    var unread = resp.unread;
    // 消息提示
    if (Number(unread.notice.num) !== 0 || Number(unread.pm.num) !== 0 || Number(unread.comment.num) !== 0) {
        var messageNum = parseInt(unread.notice.num) + parseInt(unread.pm.num);
        if (messageNum !== 0) {
            var messageUrl = unread.notice.url;
            if (parseInt(unread.notice.num) <= 0) {
                messageUrl = unread.pm.url;
            }
            $message.attr('href', messageUrl).find('em').html(messageNum);
            // 消息数超过100，显示99+
            if (messageNum > 99) {
                messageNum = '99+';
            }
            $menuMessage.attr('href', messageUrl).css('position', 'relative').html('我的消息<span style="position: absolute;background: #f04848;width: 6px;height: 6px;top: 2px;right: 12px;border-radius: 50%;"></span>');
        } else {
            $message.hide();
        }
        // 评论
        if (Number(unread.comment.num) !== 0) {
            var commentUrl = unread.comment.url;
            $commnet.attr('href', commentUrl).find('em').html(unread.comment.num);
            // 评论数超过100，显示99+
            if (unread.comment.num > 99) {
                unread.comment.num = '99+';
            }
            $menuComment.attr('href', commentUrl).css('position', 'relative').html('我的评论<span style="position: absolute;background: #f04848;width: 6px;height: 6px;top: 2px;right: 12px;border-radius: 50%;"></span>');
        } else {
            $commnet.hide();
        }
        // 显示提醒框并且绑定关闭方法
        $noticeBlock.show().find('i.icon-times-o').click(function () {
            $(this).parent().hide();
        });
        $noticeBlock.slideDown('slow');
    } else {
        $noticeBlock.hide();
    }
}
// 关注动态提醒
function focusNoticeInit (resp) {
    var num = resp.has_guanzhu_dongtai;
    num = +num;
    if (num > 99) {
        num = '99+';
    }
    var html = '<div id="focus-notice" class="J_focus_notice">' +
        '<i class="icon-times-o" onclick=dataLayer.push({"event":"通用_关注浮层_关闭"})></i>' +
        '<a href="javascript:void(0)" target="_self">您有<span>' + num + '</span>条关注动态</a>' +
        '</div>';
    if (resp.has_guanzhu_dongtai !== 0 && resp.has_guanzhu_dongtai !== undefined) {
        // if(true){
        $('.J_notice').css('top', '70px');
        $('.nav-controls').append(html);
        $('.J_focus_notice').show();
        $(document).on('click', '.J_focus_notice .icon-times-o', function () {
            $('.J_focus_notice').hide();
            $('.J_notice').css('top', '34px');
        });
        $('#focus-notice a').unbind().click(function (event) {
            event.stopPropagation();
            dataLayer.push({'event': '通用_关注浮层'});
            window.location.href = '//www.smzdm.com#follow';
            if ($('.column-tab-name')[0]) {
                $('.column-tab-name').find('li').eq(1).trigger('click');
            }
        });
    }
}

window.focusNoticeInit = focusNoticeInit;
/**
 * @for 获取勋章相关
 * @param {object} resp 请求用户信息接口的ajax返回值
 * @return {string} 拼接到用户勋章里
 *
 * @author caoxudong
 * */
function getMedal (resp) {
    var level = resp.level,
        logo = resp.logo_front,
        media = logo.medal.media, // 媒体号
        living = logo.medal.living, // 生活家,0为没有,1为普通,2为高级
        vipLiving = 0,
        juweihui = logo.medal.juweihui, // 举报小能手图标 1为有0为无
        black5 = logo.medal.black5, // 黑五图标 1为有0为无
        seven = logo.medal.seven || 0, // app 7.0勋章 0为没有1为有
        xunzhang618 = logo.medal.xunzhang618 || 0, // 618勋章 0为没有1为有
        fans = logo.medal.fans, // 值友节勋章 0为没有1为有
        zhongce = logo.zhongce_grade, // 众测等级,0为没有1为初级2为高级等
        vipZhongce = 0,
        gold = logo.goldbl;// 金牌爆料团 0为没有 1为有
    if (Number(living) === 2) {
        vipLiving = 1;
        living = 0;
    }
    if (Number(zhongce) === 2) {
        vipZhongce = 1;
        zhongce = 0;
    }
    // 勋章算等级最多显示三个,显示的优先级为等级常驻,media > living > juweihui > seven > xunzhang618 > fans > zhongce > gold
    function _gotHtml (srcOne, srcTwo) {
        // array[0]为勋章名,array[1]为其指向的地址,array[2]为a链接title内容,array[3]为是否在新窗口打开
        function _gotSrcArr (src) {
            if (src === 'media') {
                return [src, 'javascript:;', '媒体号', false];
            } else if (src === 'living') {
                return [src, '//zhiyou.smzdm.com/author/', '生活家', true];
            } else if (src === 'vip_living') {
                return [src, '//zhiyou.smzdm.com/author/', '首席生活家', true];
            } else if (src === 'black5') {
                return [src, '//www.smzdm.com/zhuanti/friday/zhuanxiang/', '黑五专享', true];
            } else if (src === 'juweihui') {
                return [src, '//news.smzdm.com/p/28284/', '什么值得买居委会', true];
            } else if (src === 'seven') {
                return [src, '//news.smzdm.com/p/27683/', 'App7.0勋章', true];
            } else if (src === 'xunzhang618') {
                return [src, 'javascript:;', '618勋章', false];
            } else if (src === 'fans') {
                return [src, '//www.smzdm.com/zhuanti/zhiyou/2016/', '什么值得买首届值友节', true];
            } else if (src === 'zcchuji') {
                return [src, '//test.smzdm.com/', '众测初级', true];
            } else if (src === 'zczhongji') {
                return [src, '//test.smzdm.com/', '众测中级', true];
            } else if (src === 'jinpaibaoliaotuan') {
                return [src, 'javascript:;', '金牌爆料团', false];
            }
        }
        if (arguments.length === 0) {
            return '<a href="//zhiyou.smzdm.com/user/tequan/" target="_blank" title="' + level + '级"><span class="level-bg">Lv' + level + '</span></a>';
        } else if (arguments.length === 1) {
            return '<a href="' + _gotSrcArr(srcOne)[1] + '" title="' + _gotSrcArr(srcOne)[2] + '" target="' + (_gotSrcArr(srcOne)[3] ? '_blank' : '_self') + '"><img class="medal-first" src="//res.smzdm.com/images/user_logo/' + _gotSrcArr(srcOne)[0] + '.png"></a><a href="//zhiyou.smzdm.com/user/tequan/" target="_blank" title="' + level + '级"><span class="level-bg">Lv' + level + '</span></a>';
        } else if (arguments.length === 2) {
            return '<a href="' + _gotSrcArr(srcOne)[1] + '" title="' + _gotSrcArr(srcOne)[2] + '" target="' + (_gotSrcArr(srcOne)[3] ? '_blank' : '_self') + '"><img class="medal-first" src="//res.smzdm.com/images/user_logo/' + _gotSrcArr(srcOne)[0] + '.png" /></a><a href="' + _gotSrcArr(srcTwo)[1] + '" title="' + _gotSrcArr(srcTwo)[2] + '" target="' + (_gotSrcArr(srcTwo)[3] ? '_blank' : '_self') + '"><img class="medal-last" src="//res.smzdm.com/images/user_logo/' + _gotSrcArr(srcTwo)[0] + '.png" /></a><a href="//zhiyou.smzdm.com/user/tequan/" target="_blank" title="' + level + '级"><span class="level-bg">Lv' + level + '</span></a>';
        }
    }
    // 判断优先级的逻辑,每个数组元素 第一个字符串为服务器上图片文件名称
    var order = [
        ['media', media],
        ['living', living],
        ['vip_living', vipLiving],
        ['black5', black5],
        ['juweihui', juweihui],
        ['seven', seven],
        ['xunzhang618', xunzhang618],
        ['fans', fans],
        ['zcchuji', zhongce],
        ['zczhongji', vipZhongce],
        ['jinpaibaoliaotuan', gold]
    ];
    var countOuter = 0;
    for (var i = 0; i < order.length; i++) {
        if (order[i][1]) {
            var countInner = 0;
            for (var j = i + 1; j < order.length; j++) {
                if (order[j][1]) {
                    return _gotHtml(order[i][0], order[j][0]);
                } else {
                    countInner++;
                }
            }
            if (countInner === (order.length - i - 1)) {
                return _gotHtml(order[i][0]);
            }
        } else {
            countOuter++;
        }
    }
    if (countOuter === order.length) {
        return _gotHtml();
    }
}
/**
 * @for 评论区域初始化
 * @param {object} resp 请求用户信息接口的ajax返回值
 *
 * @author Lin Chen
 * */
function commentInit (resp) {
    var zhiyouRelate = window.zhiyou_relate || {};
    zhiyouRelate.baseUrl = '//zhiyou.smzdm.com/';
    if (resp.bgm && !$.isEmptyObject(resp.bgm)) {
        zhiyouRelate.bgm = resp.bgm;
    }
    var nickname = resp.nickname;
    var unread = resp.unread;
    var a = resp.avatar.split('small');
    var avatarUrl = typeof (a[0]) !== 'undefined' ? a[0] : '';
    if (typeof (a[1]) !== 'undefined') {
        avatarUrl += 'middle' + a[1]; // 头像地址
    }
    var personLink = zhiyouRelate.baseUrl + 'user'; // 个人中心
    var isAnonymous = '';
    var commentConnect = resp.comment_sync_sina; // 评论相关
    // 创建头像和用户名
    if (isAnonymous && Number(isAnonymous) === 1) { // 匿名
        $('#comment_avatar').attr({
            'src': window.no_avatar,
            'alt': '匿名用户'
        }).unwrap('span').wrap('<a href="javascript:;" class="userPic"></a>');
        $('#comment_avatar').parent('.userPic').after(' <span class="comment_nickName grey">匿名用户</span> ');
    } else {
        $('#comment_avatar').attr({
            'src': avatarUrl,
            'alt': nickname
        }).unwrap('span').wrap('<a href=" ' + personLink + '/" class="userPic" target="_blank" title=" ' + nickname + ' "></a>');
        $('#comment_avatar').parent('.userPic').after(' <a href=" ' + personLink + '/" class="comment_nickName a_underline" target="_blank"  title=" ' + nickname + ' ">' + nickname + '</a> ');
    }
    // 显示表情按钮和分享到新浪微博
    $('.comment_switch').show(function () {
        if (commentConnect && $('#commentform').find('.check').length > 0) { // 如果已经连接新浪微博
            $('#comments .comment_share i.check').addClass('icon-rightframe'); // “我要留言”、快捷回复，勾选“分享至”
        } else if (commentConnect && $('#commentform').find('.check').length > 0) {
            $('#comments .comment_share i.check').removeClass('icon-rightframe');
        }
    });
    // 消息提示
    if (Number(unread.notice.num) !== 0 || Number(unread.pm.num) !== 0 || Number(unread.comment.num) !== 0) {
        var messageNum = parseInt(unread.notice.num) + parseInt(unread.pm.num);
        if (messageNum !== 0) {
            var messageUrl = unread.notice.url;
            if (parseInt(unread.notice.num) <= 0) {
                messageUrl = unread.pm.url;
            }
            $('.J_notice_message').attr('href', messageUrl).find('em').html(messageNum);
            // 消息数超过100，显示99+
            if (messageNum > 99) {
                messageNum = '99+';
            }
            $('.J_menu_message').attr('href', messageUrl).css('position', 'relative').html('我的消息<span style="position: absolute;background: #f04848;width: 6px;height: 6px;top: 4px;right: 16px;border-radius: 50%;"></span>');
        } else {
            $('.J_notice_message').hide();
        }
        // 评论
        if (unread.comment.num !== 0) {
            var commentUrl = unread.comment.url;
            $('.J_notice_comment').attr('href', commentUrl).find('em').html(unread.comment.num);
            // 评论数超过100，显示99+
            if (unread.comment.num > 99) {
                unread.comment.num = '99+';
            }
            $('.J_menu_comment').attr('href', commentUrl).css('position', 'relative').html('我的评论<span style="position: absolute;background: #f04848;width: 6px;height: 6px;top: 4px;right: 16px;border-radius: 50%;"></span>');
        } else {
            $('.J_notice_comment').hide();
        }
        // 显示提醒框并且绑定关闭方法
        $('.J_notice').show().find('.icon-times-o,.icon-cross-lighter').click(function () {
            $('.J_notice').hide();
        });
        $('.J_notice').slideDown('slow');
    } else {
        $('.J_notice').hide();
    }
    // 设置登录状态隐藏域
    $('body').append('<input id="log_status" type="hidden" value="1" />');
    // 删除登录样式
    $('#comment_tips').remove();
    $('#textareaComment').removeClass('zhiyou_login');
    $('.noLogin').removeClass('noLogin');
    // 设置默认文本和鼠标事件
    var defaultText = $('#textareaComment').attr('default_data');
    $('#textareaComment').unbind('click').val(defaultText).focus(function () {
        if ($(this).val() === defaultText) {
            $(this).val('');
        }
        $(this).css('color', '#666');
    }).blur(function () {
        if ($(this).val() === '') {
            $(this).val(defaultText).css('color', '#ccc');
        }
    }).change(function () {
        $('#textCommentSubmit').removeAttr('disabled');
    });
    // 提交按钮激活
    $('#textCommentSubmit').removeAttr('disabled').removeClass('btn_subGrey').addClass('btn_sub');
    // 小黑屋
    var banright = resp.banright;
    if (banright.length > 0) {
        for (var i = 0, len = banright.length; i < len; i++) {
            if (Number(banright[i]) === 1) {
                var banMessage = resp.bantips;
                $('#textareaComment').html('').attr('disabled', 'disabled');
                $('#comment_error').html(banMessage).show();
                $('#textCommentSubmit').removeClass('btn_sub').addClass('btn_subGrey').attr('disabled', 'disabled');
                $('.comment_switch').hide();
                $('.atta,.reply').unbind('click');
                break;
            }
        }
    }
    // 验证码处理
    var loginError = parseInt(resp.login_error_num);
    var source = '';
    if (loginError >= 3) {
        source = $('#captcha_img').attr('data-src');
        $('#captcha_img').attr('src', source);
        $('.captcha_switch').show();
    }
    // 关闭评论
    if (resp.close_comment_enter) {
        $('#textareaComment').html('').attr('disabled', 'disabled');
        $('#textCommentSubmit').removeClass('btn_sub').addClass('btn_subGrey').attr('disabled', 'disabled');
        $('.comment_switch').hide();
        $('.atta,.reply').unbind('click');
    }
    // 是否强制开启验证码
    if (resp.is_use_captcha) {
        var sourceImg = $('#captcha_img').attr('data-src');
        $('#captcha_img').attr('src', sourceImg);
        $('.captcha_switch').show();
    }
    // 初始化文章评论列表，小编操作按钮(注意：只要有评论权限，就显示出来全部按钮，“关小黑屋”虽然是用户权限才可见的，也给显示出来)
    if (resp.bgm && resp.bgm.permission && resp.bgm.permission.commentpermission) {
        initAction();
        $('#comment').append('<input type="hidden" readonly="readonly" id="is_bgm" name="is_bgm" value="1" />');
    }
}
/**
 * 小编操作按钮初始化
 * @author  Dacheng Chen
 * @time    2015-12-1
 */
function initAction () {
    if ($('#comments .tab_info .comment_listBox').length > 0) {
        $('.comment_listBox li.comment_list, .comment_listBox li.comment_list blockquote').each(function () {
            var commentID = $(this).attr('blockquote_cid');
            var userID = $(this).find('.user_name:first').attr('usmzdmid');
            if ($(this).hasClass('comment_list')) {
                var commentIdArray = $(this).attr('id').split('_');
                commentID = commentIdArray[commentIdArray.length - 1];
            }
            // 小编评论打码
            var mosaicDom = '<a href="javascript:void(0);" title="打码" onclick="mosaic_show_textarea(' + commentID + ')">打码</a>';
            var blackListDom = '<a href="http://users.bgm.smzdm.com/blackroom/user_add?smzdm_id=' + userID + '" title="关小黑屋" target="_blank">关小黑屋</a>';
            if (Number(userID) === 0 || userID === undefined) {
                blackListDom = '';
            }
            var deleteDom = '<a href="javascript:void(0);" onclick="delete_comment_confirm(' + commentID + ')" title="删除">删除</a>';
            var editDom = '<a href="http://comments.bgm.smzdm.com/comments/info/' + commentID + '" title="编辑" target="_blank">编辑</a>';
            var controls = mosaicDom + blackListDom + deleteDom + editDom;
            $(this).find('.dingNum:last').before(controls);
        });
    }
}
/*
 * @for 初始化关注按钮发送的ajax请求
 *
 * @author caoxudong
 * */
function isFocusAjaxRequest (data, initCallback) {
    $.ajax({
        type: 'get',
        url: '//zhiyou.smzdm.com/guanzhu/jsonp_is_followed',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: data,
        success: initCallback,
        error: function (err) {
            console.log(err);
        }
    });
}
/*
 * @for 初始化关注按钮状态
 *
 * @author caoxudong
 * */
function focusInit (resp) {
    var dataArr = [];
    $('.J_user_focus').each(function () {
        var $that = $(this);
        // data-follow为空的才是需要ajax初始化的，不为空的话由php确定按钮状态
        if ($.trim($(this).attr('data-follow')) === '' && $.trim($(this).attr('data-to')) === '') {
            dataArr.push({
                type: $that.data('type'),
                keyword: $that.data('cate')
            });
        }
    });
    if (dataArr.length) {
        isFocusAjaxRequest({keywords: dataArr}, function (resp) {
            if (resp.error_code === 0) {
                $.each(resp.data, function (key, value) {
                    var selector = '[data-type="' + value.type + '"][data-cate="' + value.keyword + '"]';
                    $(selector).not('input').attr('data-follow', '' + value.followed);
                    // 移植自老项目，新项目下目前没有出现需要初始化user类型关注按钮状态的
                    if (value.type === 'user') {
                        if (value.followed === 2) {
                            $(selector).html('已关注');
                        } else if (value.followed === 1) {
                            $(selector).html('<i class="icon-plus-o"></i>关注');
                        } else if (value.followed === 0) {
                            // 进入页面时候用户关注按钮当是自己的时候不显示
                            $(selector).hide();
                        }
                    } else {
                        if (value.followed === 1) {
                            $(selector).html('已关注');
                        } else if (value.followed === 0) {
                            if ($(selector).hasClass('focus-lvyou')) {
                                $(selector).html('<i class="icon-plus-o"></i><span>关注旅游</span>').show();
                            } else {
                                $(selector).html('<i class="icon-plus-o"></i>关注');
                            }
                        }
                    }
                });
            } else {
                console.log(resp.error_msg);
            }
        });
    }
}
/*
 * @for 顶部导航下拉菜单中根据接口返回值判断是否显示“我的视频”
 *
 * @author lizhiyong
 * */
function showMyVideo (resp) {
    resp.smzdm_id = parseInt(resp.smzdm_id, 10);
    if (resp.smzdm_id) {
        // 显示我的视频和视频投稿
        if (resp.is_show_video) {
            // 个人中心我的视频
            if ($('#global-nav ul.control-list li.user-entry ul.sub-nav').find('li').eq(5).find('a').html() !== '我的视频') {
                var _click = "{'event': '通用_个人中心导航', '按钮名称': '我的视频'}";
                var elementVideo = document.createElement('li');
                elementVideo.innerHTML = '<a href="http://zhiyou.smzdm.com/user/v/" target="_blank" onclick="dataLayer.push(' + _click + ')">我的视频</a>';
                $('#global-nav ul.control-list li.user-entry ul.sub-nav').find('li').eq(4).after(elementVideo);
            }
            // 视频投稿
            var videoTG = false;
            for (var i = 0; i < $('.submit-entry .sub-nav').find('li').size(); i++) {
                if ($('.submit-entry .sub-nav').find('li').eq(i).find('a').html() === '视频投稿') {
                    videoTG = true;
                }
            }
            if (!videoTG) {
                var element = document.createElement('li');
                element.innerHTML = '<a href="http://v.smzdm.com/baoliao/" target="_blank">视频投稿</a>';
                $('.submit-entry .sub-nav').append(element);
            }
        }
    }
}

/*
 * @for 顶部导航下拉菜单中根据接口返回值判断是否显示“爆料投稿”
 *
 * @author shiletian
 * */

function hideBaoliao (resp) {
    var subNavLi = $('.J_user_entry .sub-nav li');
    var subEntry = $('.submit-entry');
    if (resp.is_business && subEntry.length) {
        subEntry.hide();
        subNavLi.each(function (index, item) {
            $(this).hide();
        });
        subNavLi.first().show();
        subNavLi.last().show();
    }
}

/**
 * @for 初始化执行
 *
 * @author caoxudong
 * */
function init (resp) {
    commentInit(resp);
    focusInit(resp);
    showMyVideo(resp);
}
