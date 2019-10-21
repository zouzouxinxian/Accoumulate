/* eslint-disable */
// var login = require('js/lib/zframework/login');
var until = require('lib/js/utilities.js');
/* jshint ignore:start */
// 从 userbase.js 里面提取
/* -------------------------------------- comment start -------------------------------------------------------------------------------- */
// COOKIE中最多存储20个数据
var cookie_length_limit = 20;

var smzdm_domain = '.smzdm.com';
// 评论举报COOKIE名字
var comment_report_cookiename = 'comment_report';
// 举报评论COOKIE数据（一维数组）
// window.comment_report_cookie_list;
// 评论打分COOKIE名字
var comment_rating_cookiename = 'comment_rating';
// 举报打分COOKIE数据（二维数组）
// window.comment_rating_cookie_list;

window.comment_rating_ajax = comment_rating_ajax;
window.show_floors = show_floors;
window.mosaic_show_textarea = mosaic_show_textarea;
window.mosaic_comment = mosaic_comment;
window.delete_comment_confirm = delete_comment_confirm;
window.on_check_comment_page = on_check_comment_page;

var zhiyou_relate = window.zhiyou_relate || {};

zhiyou_relate.baseUrl = '//zhiyou.smzdm.com/';
zhiyou_relate.popup_login_show = popShowLogin;

// 这两个函数要在别的文件里面调用
// init_smile();
// init_comment_rating();

$(document).on('click', '.zhiyou_login', popShowLogin);

function popShowLogin () {
    $('.J_login_trigger').trigger('click');
}

//模板迭代 jxt
var StringBuilder = function (d) {
    this.s = new Array(d);
    this.onMultiAppendBeforeHandle = null;
    this.onMultiAppendBefore = function (param) {
        this.onMultiAppendBeforeHandle = param;
        return this;
    };

    this.append = function (d) {
        this.s.push(d);
        return this;
    };
    this.toString = function () {
        return this.s.join('');
    };
    this.clear = function () {
        this.s = [];
    };
    this.appendMultiFormat = function (format_str, data) {
        if (typeof (data) == 'object') {
            for (var i in data) {
                // TODO: 是否缺少hasOwnProperty检查
                if (this.onMultiAppendBeforeHandle != null) {
                    this.onMultiAppendBeforeHandle(data[i]);
                }
                this.appendFormat(format_str, data[i]);
            }
        }
        return this;
    };
    this.appendFormat = function () {
        var n = arguments.length;
        if (n == 0) {
            return this;
        }
        var f = arguments[0];
        if (n == 1) {
            return this.append(f);
        }
        var arg = arguments[1];
        if (arg == null) {
            arg = '';
        }
        var i, e, c, k, akFun;
        if (typeof (arg) == 'object') {
            akFun = function (a, k) {
                return a[1][k];
            };
        } else {
            akFun = function (a, k) {
                return a[k - 0 + 1];
            };
        }
        for (i = 0; i < f.length;) {//be careful  the brace cannot be nesting
            c = f.charAt(i);
            if (c == '{') {
                e = f.indexOf('}', i);
                k = f.substring(i + 1, e);
                this.s.push(akFun(arguments, k));
                i = e + 1;
                continue;
            }
            this.s.push(c);
            i++;
        }
        return this;
    };
};
//模板迭代结束

//弹层
function popPosition (o) {
    var wrapWidth = $(window).width();
    var wrapHeight = $(window).height();
    var oWidth = $(o).width();
    var oHeight = $(o).height();

    $(o).css({left: wrapWidth / 2 - oWidth / 2, top: wrapHeight / 2 - oHeight / 2});
}

/**
 * textarea height auto
 */
$.fn.autoTextarea = function (options) {
    if ($('#quickReply')) {
        var defaults = {
            maxHeight: null,
            minHeight: $(this).height()
        };
        var opts = $.extend({}, defaults, options);

        $(this).bind('paste cut keydown keyup focus blur', function () {
            var height, style = this.style;
            this.style.height = opts.minHeight + 'px';
            var padding_top_obj = $(this).css('padding-top').split('', 1);
            var padding_top = parseInt(padding_top_obj);
            if (this.scrollHeight > opts.minHeight) {
                if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
                    height = opts.maxHeight - padding_top;
                    style.overflowY = 'scroll';
                } else {
                    height = this.scrollHeight - padding_top;
                    style.overflowY = 'hidden';
                }
                style.height = (height - padding_top) + 'px';
            }
        });
    }
};

/**
 * JS json_encode 方法
 *      ——来源：http://blog.csdn.net/cangyingaoyou/article/details/7433431
 *
 * @param   {Array|Object}    mixed_val  待json转义的数据
 * @returns {String}          转码后数据字符串
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function json_encode (mixed_val) {
    var json = window.JSON;
    if (typeof json === 'object' && typeof json.stringify === 'function') {
        return json.stringify(mixed_val);
    }

    var value = mixed_val;
    var quote = function (string) {
        var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    };

    var str = function (key, holder) {
        var gap = '';
        var indent = '    ';
        var i = 0;          // The loop counter.
        var k = '';          // The member key.
        var v = '';          // The member value.
        var length = 0;
        var mind = gap;
        var partial = [];
        var value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // What happens next depends on the value's type.
        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':
                // JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            case 'object':
                // If the type is 'object', we might be dealing with an object or an array or
                // null.
                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.
                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];

                // Is the value an array?
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.
                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // Iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.
                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    };

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {
        '': value
    });
}

/**
 * JS json_decode 方法
 *      ——来源：http://blog.csdn.net/cangyingaoyou/article/details/7433431
 *
 * @param   {String}      str_json        待json解码的字符串
 * @returns string      解码后的数据
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function json_decode (str_json) {
    var json = window.JSON;
    if (typeof json === 'object' && typeof json.parse === 'function') {
        return json.parse(str_json);
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var j;
    var text = str_json;

    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.
    cx.lastIndex = 0;
    if (cx.test(text)) {
        text = text.replace(cx, function (a) {
            return '\\u' +
                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
    }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        j = eval('(' + text + ')');

        return j;
    }

    // If the text is not JSON parseable, then a SyntaxError is thrown.
    throw new SyntaxError('json_decode');
}

/**
 * 获取COOKIE数据
 * @param       string      name        cookie名字
 * @returns     array|string            cookie中数据
 */
function getCookie (name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(';', cookie_start);
    var val = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
    return cookie_start == -1 ? '' : decodeURIComponent(val);
}

/**
 * 设置COOKIE(单一数据：字符串、数字)
 *
 * @param   {String}      cookieName      COOKIE名字
 * @param   {String}      cookieValue     COOKIE数据
 * @param   {Number}         seconds         有效时间，单位秒。默认604800 = 7天*24*3600
 * @param   {String}      path            路径
 * @param   {String}      domain          域名
 * @param   {String}      secure          安全
 * @returns
 */
function setCookie (cookieName, cookieValue, seconds, path, domain, secure) {
    seconds = seconds ? seconds : 604800;
    seconds = seconds * 1000;

    var expires = new Date();
    expires.setTime(expires.getTime() + seconds);
    document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '')
        + (path ? '; path=' + path : '/')
        + (domain ? '; domain=' + domain : '')
        + (secure ? '; secure' : '');
    return;
}

/**
 * 重新设置COOKIE(一维数组)
 *      array(
 *              0 => 123456,
 *              1 => 4735869
 *           )
 *
 * @param   {String}      cookieName      COOKIE名字
 * @param   {Number | String}  data            COOKIE数据
 * @param   {Number}         seconds         有效时间，单位秒。默认604800 = 7天*24*3600
 * @param   {String}      path            路径
 * @param   {String}      domain          域名
 * @param   {String}      secure          安全
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function setCookieArr1 (cookieName, data, seconds, path, domain, secure) {
    var result_json = getCookie(cookieName);
    var one_list;
    if (result_json) {
        one_list = json_decode(result_json);
    }
    if (one_list) {
        var one_list_length = one_list.length;
        if (one_list_length >= cookie_length_limit) {
            var temp_list = new Array();
            one_list[cookie_length_limit] = data;
            for (var i in one_list) {
                if (i <= one_list_length - 1) {
                    var j = parseInt(i) + 1;
                    temp_list[i] = one_list[j.toString()];
                }
            }
            one_list = temp_list;
        } else {
            one_list[one_list_length] = data;
        }
    } else {
        var one_list = new Array();
        one_list[0] = data;
    }
    var cookie_list_json = json_encode(one_list);
    seconds = seconds ? seconds : 604800;
    setCookie(cookieName, cookie_list_json, seconds, path, domain, secure);
    return;
}

/**
 * 判断data是否在COOKIE一维数组中
 *      cookie数据结构：
 *          temp_arr = array(
 *                          0 => '123456',
 *                          1 => '4735869'
 *                      )
 *       调用方法：
 *          getBooInCookieArr1(temp_arr, 4735869)
 *
 * @param   string      cookieName      COOKIE名字
 * @param   int|string  data            COOKIE数据
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function getBooInCookieArr1 (cookieName, data) {
    var result_json = getCookie(cookieName);
    if (result_json) {
        var one_list = json_decode(result_json);
        if (one_list) {
            for (var i in one_list) {
                if (one_list[i] && one_list[i] == data) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 重新设置COOKIE(二维数组)
 *      array(
 *              0 => array(
 *                      0 => '123456'   //评论ID
 *                      1 => '1'        //1顶；0踩
 *              ),
 *              1 => array(
 *                      0 => '4735869'
 *                      1 => '0'
 *              )
 *           )
 * @param   string      cookieName      COOKIE名字
 * @param   int|string  param1          COOKIE数据1（评论ID）
 * @param   int|string  param2          COOKIE数据2（打分1顶；0踩）
 * @param   int         seconds         有效时间，单位秒。默认604800 = 7天*24*3600
 * @param   string      path            路径
 * @param   string      domain          域名
 * @param   string      secure          安全
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function setCookieArr2 (cookieName, param1, param2, seconds, path, domain, secure) {
    var result_json = getCookie(cookieName);
    var two_list;
    if (result_json) {
        two_list = json_decode(result_json);
    }
    if (two_list) {
        var two_list_length = two_list.length;
        if (two_list_length >= cookie_length_limit) {
            var temp_list = new Array();
            two_list[cookie_length_limit] = new Array();
            two_list[cookie_length_limit][0] = param1;
            two_list[cookie_length_limit][1] = param2;
            for (var i in two_list) {
                if (i <= two_list_length - 1) {
                    var j = parseInt(i) + 1;
                    temp_list[i] = two_list[j.toString()];
                }
            }
            two_list = temp_list;
        } else {
            two_list[two_list_length] = new Array();
            two_list[two_list_length][0] = param1;
            two_list[two_list_length][1] = param2;
        }
    } else {
        var two_list = new Array();
        two_list[0] = new Array();
        two_list[0][0] = param1;
        two_list[0][1] = param2;
    }
    var cookie_list_json = json_encode(two_list);
    seconds = seconds ? seconds : 604800;//默认7天
    setCookie(cookieName, cookie_list_json, seconds, path, domain, secure);
    return;
}

/**
 * 判断data是否在COOKIE一维数组中
 *      cookie数据结构：
 *          array(
 *                  0 => array(
 *                      'cid' => '123456'
 *                      'rating' => '1'
 *                  ),
 *                  1 => array(
 *                      'cid' => '4735869'
 *                      'rating' => '0'
 *                  )
 *           )
 *       调用方法：
 *          getBooInCookieArr2(temp_arr, 4735869)
 *
 * @param   string      cookieName      COOKIE名字
 * @param   int|string  data            COOKIE中cid数据
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function getBooInCookieArr2 (cookieName, data) {
    var result_json = getCookie(cookieName);
    if (result_json) {
        var two_list = json_decode(result_json);
        if (two_list) {
            for (var i in two_list) {
                if (two_list[i] && two_list[i][0] && two_list[i][0] == data) {
                    return true;
                }
            }
        }
    }
    return false;
}

$(function () {
    //导航黑条下载客户端浮层
    showHide('.downloadApp', '', '.more-share-box');

    /**
     * Ctrl + Enter 等于点击submit按钮
     */
    document.onkeydown = function (moz_ev) {
        var ev = null;
        if (window.event) {
            ev = window.event;
        } else {
            ev = moz_ev;
        }
        if (ev != null && ev.ctrlKey && ev.keyCode == 13) {
            var quick_isFocus = $('#quickComment').is(':focus');
            var comment_isFocus = $('#textareaComment').is(':focus');
            var choujiang_isFocus = $('#choujiangComment').is(':focus');
            if (true == comment_isFocus) {
                $('#textCommentSubmit').click();
            }
            if (true == quick_isFocus) {
                $('#textCommentSubmitQuick').click();
            }
            if (true == choujiang_isFocus) {
                $('#choujiangCommentSubmit').click();
            }
        }
    };

    //评论快捷回复
    commentQuickReply('.reply');
    //评论显示隐藏外层"举报"
    //showHide(".comment_list","",".jubao");//refs #41272: PC文章详情页，评论的举报button由hover展现改为默认展现。
    //鼠标滑过或滑出评论，操作状态为可见或不可见
    visibleOrNot('.operate_box', '.noGoods', 'visibility');
    visibleOrNot('blockquote', '.comment_action', 'display');
    //tab hover switch
    tab('.tab_comment_li', '.tab_info', 'current_item', 'click');
    //展开 收起
    openClose('.seaAll', '', 'comments');
    openClose('a.more', 'a.pickup', 'mallNav');
    //评论 分享到新浪微博
    comment_share_to_sina('i.check');

    $('.textarea_quick').height('auto');

    var quickComment_obj = $('#quickComment');
    if (quickComment_obj.length) {
        quickComment_obj.val('');
        quickComment_obj.autoTextarea({maxHeight: 200});
    }

    /**
     * “我要留言”参数初始化
     */
    var ok_txt = '评论成功，稍后在页面中显示。每日前三条评论还加经验哦！';
    var txt3 = '"><i class="icon-check-o"></i> ' + ok_txt,
        txt4 = '"><i class="icon-check-o"></i> ' + ok_txt,
        txt5 = '"><i class="icon-check-o"></i> 为维护良好讨论环境，新注册用户的评论需人工审核后再显示，请谅解',
        txt8 = '"><i class="icon-check-o"></i> <span class="red">你的投票已超过次数限制或未达到投票权限，该评论仅作为普通评论</span>',
        txt10 = '评论同步新浪微博失败，您尚未绑定微博账号，<span class="red" id="goback">4</span>秒后将带您进入微博授权页',
        $submit = $('#commentform #textCommentSubmit'),
        $submitQuickBtn = $('#commentquickform #textCommentSubmitQuick');

    $submit.attr('disabled', false);
    $submitQuickBtn.attr('disabled', false);

    /**
     * 0 “我要留言”提交评论
     */
    $('#commentform').submit(function () {
        if ($.trim($('#textareaComment').val()) == '' || $.trim($('#textareaComment').val()) == $('#textareaComment').attr('default_data')) { //如果提交内容不为空或者不是默认文本
            if ($('#error').is(':hidden')) {//如果没有错误提示（防止多次触发）
                $('#error').html('您是不是忘了说点什么？').slideDown().delay(3000).slideUp();
            }
        } else if (until.strlen($.trim($('#textareaComment').val())) > 1000) {
            //限制评论的长度最大为1000
            if ($('#error').is(':hidden')) {//如果没有错误提示（防止多次触发）
                $('#error').html('评论内容不能多于1000个字符').slideDown().delay(3000).slideUp();
            }
        } else {
            submit_comment(0);
        }
        return false;
    });
    /**
     * 1 “快捷回复”提交评论
     */
    $('#commentquickform').submit(function () {
        if ($.trim($('#quickComment').val()) == '' || $.trim($('#quickComment').val()) == $('#textareaComment').attr('default_data')) { //如果提交内容不为空或者不是默认文本
            if ($('#quick_error').is(':hidden')) {//如果没有错误提示（防止多次触发）
                $('#quick_error').html('您是不是忘了说点什么？').slideDown().delay(3000).slideUp();
            }
        } else if (until.strlen($.trim($('#quickComment').val())) > 1000) {
            //限制评论的长度最大为1000
            if ($('#quick_error').is(':hidden')) {//如果没有错误提示（防止多次触发）
                $('#quick_error').html('评论内容不能多于1000个字符').slideDown().delay(3000).slideUp();
            }
        } else {
            submit_comment(1);
        }
        return false;
    });

    /**
     * 渐渐移动页面至刚发表评论位置
     */
    var _time_slicing = 10;
    var wait = _time_slicing, submit_val = $submit.html(), waitquick = _time_slicing,
        quick_submit_val = $submitQuickBtn.html();

    function countdown () {
        if (wait > 0) {
            $submit.html(wait);
            wait--;
            setTimeout(countdown, 1000);
        } else {
            $submit.html(submit_val).attr('disabled', false).removeClass('btn_subGrey').addClass('btn_sub').fadeTo('slow', 1);
            wait = _time_slicing;
        }
    }

    function quickcountdown () {
        if (waitquick > 0) {
            $submitQuickBtn.html(waitquick);
            waitquick--;
            setTimeout(quickcountdown, 1000);
        } else {
            $submitQuickBtn.html(quick_submit_val).attr('disabled', false).removeClass('btn_subGrey').addClass('btn_sub').fadeTo('slow', 1);
            waitquick = _time_slicing;
        }
    }

    //x秒后点击确认关闭  倒计时返回上一页
    function count_down (obj) {
        var secs = parseInt($(obj).html());
        if (secs > 0) {
            $(obj).html(secs - 1);
            setTimeout(function () {
                count_down(obj);
            }, 1000);
        }
        if (secs == 0) {
            $('.sub_Success').fadeOut();
            $('#cover').fadeOut();
            // window.location.href = ulink;
        }
    }

    /**
     * “我要留言”、“快捷回复”提交评论
     *
     * @param   int         isQuickSumit         0“我要留言”提交评论；1“快捷回复”提交评论
     * @returns
     * @author  Dacheng Chen
     * @time    2014-5-18
     */
    function submit_comment (isQuickSumit) {
        var errorContainerId = 'error';
        var btn = $submit;
        var loadingImg = $('#loading');

        if (1 == isQuickSumit) { //如果是快捷回复
            var formObj = $('#commentquickform');

            errorContainerId = 'quick_error';
            btn = $submitQuickBtn;
            loadingImg = $('#loadingquick');
        } else {
            var formObj = $('#commentform');
        }

        // 服务端日志上报相关字段
        var serverLogStr = '',
            serverLogObj = {
                client_type: getClientType(),
                event_key: '评论',
                cid: !$('#data-cid').val() ? '无' : $('#data-cid').val(),
                atp: !$('#data-atp').val() ? '无' : $('#data-atp').val(),
                tagID: !$('#data-tagid').val() ? '无' : $('#data-tagid').val(),
                p: '无',
                sourcePage: !document.referrer ? '无' : document.referrer,
                sourceMode: '无'
            };

        $.each(serverLogObj, function (key, val) {
            var str = '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
            serverLogStr += str;
        });

        btn.attr('disabled', true).removeClass('btn_sub').addClass('btn_subGrey').fadeTo('slow', 1);

        //显示正在提交
        loadingImg.show();

        $.ajax({
            url: zhiyou_relate.baseUrl + 'user/comment/ajax_set_comment',
            data: formObj.serialize() + serverLogStr,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                var result = eval(data);

                //隐藏 正在提交
                loadingImg.hide();

                // 同步转发微博重新授权
                if (10 == result.error_code) {
                    // $('#'+errorContainerId).slideDown().html(txt10);
                    if (result.error_msg.sina_uri) {
                        // var sina_URL = result.error_msg.sina_uri;
                        //console.log(sina_URL);
                        $('#pop-status-fail').find('.pop_info').html(txt10);
                        $('#pop-status-fail').find('.icon-logintanhao').css({
                            'float': 'left',
                            'margin-left': '15px',
                            'margin-top': '15px'
                        });
                        $('#pop-status-fail').fadeIn();
                        $('#cover').fadeIn();
                        popPosition('#pop-status-fail');
                        count_down('#goback');
                        setTimeout(function () {
                            window.location.href = result.error_msg.sina_uri;
                        }, 4000);
                    } else {
                        setTimeout(function () {
                            btn.attr('disabled', false).removeClass('btn_subGrey').addClass('btn_sub').fadeTo('slow', 1);
                            $('#' + errorContainerId).slideUp();
                        }, 3000);
                    }
                    return;

                    // 显示刚发表的评论数据。6、8 时显示提示文字 || 6 == result.error_code || 8 == result.error_code
                } else if (0 == result.error_code) {
                    // 显示“最新”隐藏“最热”
                    var div_new = $('.comment_wrap .tab_nav').find('.tab_comment_li:first');
                    div_new.siblings().removeClass('current_item');
                    div_new.addClass('current_item');
                    $('#commentTabBlockNew').css('display', '');
                    $('#commentTabBlockHot').css('display', 'none');
                    //去新浪授权，以便同步评论
                    if (result.error_msg.sina_uri) {
                        window.location.href = result.error_msg.sina_uri;
                        return;
                    }
                    //当前评论楼层数
                    var the_floor = 0;
                    var floor_grey = $('#commentTabBlockNew ul.comment_listBox li:first .grey').html();
                    if (floor_grey) {
                        the_floor = floor_grey.split('楼')[0];
                    }
                    (the_floor) ? the_floor = parseInt(the_floor) + 1 : the_floor = 0;

                    // 提示文字
                    var ok_htm = '\n<div id="success_1' + txt3 + '</div>\n';
                    if (6 == result.error_code) {
                        ok_htm = '\n<div id="success_1' + txt4 + '</div>\n';
                    } else if (8 == result.error_code) {
                        ok_htm = '\n<div id="success_1' + txt8 + '</div>\n';
                    }
                    // JS显示刚发表的评论
                    var new_comment_html = '';
                    new_comment_html += '<li id="li_comment_4700621" class="comment_list">';
                    new_comment_html += '<div class="comment_avatar">';
                    new_comment_html += '<a href="javascript:void(0);" class="userPic"><img src="' + result.error_msg.head + '" width="36" height="36"/></a>';
                    new_comment_html += (the_floor) ? '<span class="grey">' + the_floor + '楼</span>' : '';
                    new_comment_html += '</div>';
                    new_comment_html += '<div class="comment_conBox">';
                    new_comment_html += '<div class="comment_avatar_time"><div class="time">' + result.error_msg.format_date + '</div>';
                    if (result.error_msg.is_anonymous) {
                        new_comment_html += '<span class="grey">' + result.error_msg.display_name + '</span>';
                    } else {
                        new_comment_html += '<a href="javascript:void(0);" class="a_underline user_name">' + result.error_msg.display_name + '</a>';
                    }
                    new_comment_html += '</div>';
                    new_comment_html += '<div class="comment_conWrap">';
                    new_comment_html += '<div class="comment_con"><p>' + result.error_msg.comment_content + '</p></div>';
                    new_comment_html += ok_htm;
                    new_comment_html += '<div class="blankDiv"></div>';
                    new_comment_html += '</div>';
                    new_comment_html += '</div>';
                    new_comment_html += '<div class="clear"></div>';
                    new_comment_html += '</li>';
                    $('#comment .tab_nav:first').css('display', 'block');
                    $('#li_comment_new').after(new_comment_html);

                    //3秒后关闭成功提示
                    setTimeout(function () {
                        $('#success_1').remove();
                    }, 3000);

                    //跳转显示到评论列表顶部
                    // $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    // $body.animate( { scrollTop: $('#panelTitle').offset().top - 30}, 900);

                    //启动计时器
                    if (1 == isQuickSumit) {
                        quickcountdown();
                    } else {
                        countdown();
                    }

                    //恢复数据
                    //$('.parentid').val(0);//$('#parentid').val(0);
                    if (1 == isQuickSumit) {
                        $('#quickComment').val('');
                    } else {
                        $('#textareaComment').val('');
                    }
                    cancle_vote();

                    //更新评论数
                    $('.commentNum').each(function () {
                        $(this).html(parseInt($(this).html()) + 1);
                    });

                    //评论成功后，初始化快捷回复位置输入框高度
                    $('#quickComment').height('auto');

                    //弹出扣分提示
                    var score = result.error_msg.post_points ? result.error_msg.post_points : 0;
                    var exp = result.error_msg.post_experience ? result.error_msg.post_experience : 0;
                    var gold = result.error_msg.post_gold ? result.error_msg.post_gold : 0;
                    var mana = result.error_msg.post_prestige ? result.error_msg.post_prestige : 0;

                    if (score != 0 || exp != 0 || gold != 0 || mana != 0) {
                        var scoreDom = (score == 0) ? '' : '<span class="comment_score">积分：<em>' + score + '</em></span>';
                        var expDom = (exp == 0) ? '' : '<span class="comment_exp">经验：<em>' + exp + '</em></span>';
                        var goldDom = (gold == 0) ? '' : '<span class="comment_gold">金币：<em>' + gold + '</em></span>';
                        var manaDom = (mana == 0) ? '' : '<span class="comment_mana">威望：<em>' + mana + '</em></span>';

                        $('#pop-comment-score').find('.pop_comment_info').html(scoreDom + expDom + goldDom + manaDom);
                        popUp('', '#pop-comment-score', '成功发表评论');
                    }
                    if ($('#' + errorContainerId).is(':hidden')) {//如果没有错误提示（防止多次触发）
                        $('#' + errorContainerId).html(ok_txt).css('color', 'green').slideDown().delay(3000).slideUp();
                    }
                } else if (7 == result.error_code) { //如果扣减积分不足
                    var msg = result.error_msg;

                    $('body').append('<div class="pop pop_no_title" id="pop-scorenotenough"><i class="pop-close icon-times-o"><!--[if lt IE 8]>x<![endif]--></i><div class="pop-content oneLine"><i class="icon-logintanhao"><!--[if lt IE 8]>404<![endif]--></i><p class="pop_info"></p></div></div>');

                    popUp('', '#pop-scorenotenough', msg);
                } else if (19 == result.error_code) { //引导型
                    showCommentBind(result.error_code, formObj.serialize(), isQuickSumit);
                    return;
                } else if (20 == result.error_code) { //强制型
                    showCommentBind(result.error_code, formObj.serialize(), isQuickSumit);
                    return;
                } else {// 发表失败
                    var no_htm = result.error_msg;
                    if (5 == result.error_code) {
                        no_htm = '请登录后发表评论';
                    }
                    $('#' + errorContainerId).slideDown().html(no_htm);
                    setTimeout(function () {
                        btn.attr('disabled', false).removeClass('btn_subGrey').addClass('btn_sub').fadeTo('slow', 1);
                        $('#' + errorContainerId).slideUp();
                    }, 3000);
                }
            }
        });
    }
    func_atta();
    func_report();
});

// 服务端日志上报 获取客户端类型函数
function getClientType () {
    var ua = navigator.userAgent;
    if (/smzdmapp/i.test(ua)) {
        return /(Android)/i.test(ua) ? 'android' : 'iphone';
    } else {
        return /(Android)|i(Phone|Pad|Pod|OS)/i.test(ua) ? 'WAP' : 'PC';
    }
}

// 显示评论手机绑定弹窗
function showCommentBind (errorCode, postData, isQuickSumit) {
    $('.J_register_trigger').click();
    $('#J_login_iframe').attr('src', 'https://zhiyou.smzdm.com/user/mobile/window/');
    var $commentPop = $('#J_login_popup .J_popup_close').addClass('J_comment_pop').off('click');
    if (errorCode === 19) {
        $(document).on('click', '.J_comment_pop, .popup-bg', function () {
            $.ajax({
                url: zhiyou_relate.baseUrl + 'user/comment/ajax_set_comment?submit_num=2',
                data: postData,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    window.location.reload();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    // 利用MessageEvent获取子窗口传递过来的参数
    if (window.addEventListener) {
        window.addEventListener('message', function (e) {
            console.log(e);
            if (e.origin !== 'https://zhiyou.smzdm.com') return; // 利用这时候的MessageEvent对象判断了一下消息源
            var data = JSON.parse(e.data);
            if (data.conType === 1) {
                $('.J_comment_pop').click();
                if (isQuickSumit) {
                    $('#textCommentSubmitQuick').removeAttr('disabled').click();
                } else {
                    $('#textCommentSubmit').removeAttr('disabled').click();
                }
            }
        }, false);
    } else {
        if (window.attachEvent) {
            window.attachEvent('onmessage', function (e) {
                if (e.origin !== 'https://zhiyou.smzdm.com') return; // 利用这时候的MessageEvent对象判断了一下消息源
                var data = JSON.parse(e.data);
                if (data.conType === 1) {
                    $('.J_comment_pop').click();
                    if (isQuickSumit) {
                        $('#textCommentSubmitQuick').removeAttr('disabled').click();
                    } else {
                        $('#textCommentSubmit').removeAttr('disabled').click();
                    }
                }
            });
        }
    }
}

//鼠标滑过显示、隐藏"更多下拉"或者子类
function showHide (obj, newClass, subBlock) {
    $(document).on('mouseover', obj, function () {
        $(this).addClass(newClass);
        $(this).find(subBlock).show();
    });
    $(document).on('mouseout', obj, function () {
        $(obj).removeClass(newClass);
        $(obj).find(subBlock).hide();
    });
}

//商家导航、评论"查看全部"展开收起
function openClose (openObj, closeObj, method) {
    var MAX_HEIGHT = 120;
    var $commentBlock, $currCon, $currBtn;

    if (method == 'mallNav') {
        $(openObj).click(function () {
            $(this).prev().css('height', 'auto');
            $(this).hide();
            $(this).next('a').show();
        });
        $(closeObj).click(function () {
            $(this).parent().find('ul').css('height', '64px');
            $(this).hide();
            $(this).prev('a').show();
        });
    } else if (method == 'comments') {
        var $comments = $('blockquote');
        var blockquoteNum = $comments.length;

        for (var i = 0; i < blockquoteNum; i++) {
            // var maxHeight = $(openObj).prev(".comment_con").eq(i).height();
            $commentBlock = $comments.eq(i);
            $currCon = $commentBlock.find('.comment_con>p');
            $currBtn = $commentBlock.find(openObj);

            if ($currCon.height() > MAX_HEIGHT) {
                $currCon.css('max-height', MAX_HEIGHT);
                $currBtn.css('display', 'block');
            } else {
                $currBtn.css('display', 'none');
            }
        }
        ;
        $(openObj).click(function () {
            $(this).prev().css({'height': 'auto', 'max-height': '100%'});
            $(this).hide();
            $(this).next('a').show();
        });
    }
}

/**
 * 小编操作按钮初始化
 * @author  Dacheng Chen
 * @time    2015-12-1
 */
function init_action () {
    if ($('#comments .tab_info .comment_listBox').length > 0) {
        $('.comment_listBox li.comment_list, .comment_listBox li.comment_list blockquote').each(function () {
            var commentID = $(this).attr('blockquote_cid');
            var userID = $(this).find('.user_name:first').attr('usmzdmid');

            if ($(this).hasClass('comment_list')) {
                var commentIdArray = $(this).attr('id').split('_');
                commentID = commentIdArray[commentIdArray.length - 1];
            }

            //小编评论打码
            var mosaicDom = '<a href="javascript:void(0);" title="打码" onclick="mosaic_show_textarea(' + commentID + ')">打码</a>';
            var blackListDom = '<a href="http://users.bgm.smzdm.com/blackroom/user_add?smzdm_id=' + userID + '" title="关小黑屋" target="_blank">关小黑屋</a>';
            if (userID == 0 || userID == undefined) {
                blackListDom = '';
            }
            var deleteDom = '<a href="javascript:void(0);" onclick="delete_comment_confirm(' + commentID + ')" title="删除">删除</a>';
            var editDom = '<a href="http://comments.bgm.smzdm.com/comments/info/' + commentID + '" title="编辑" target="_blank">编辑</a>';
            var controls = mosaicDom + blackListDom + deleteDom + editDom;
            $(this).find('.dingNum:last').before(controls);
        });
    }
}

/**
 * atta 点击后操作
 * @param   string      obj_name        atta容器名称
 */
function func_atta (obj_name) {
    if (!obj_name || typeof (obj_name) == undefined) {
        obj_name = '#comment';
    }
    $(obj_name + ' .atta').click(function () {
        //未登录时弹出登录框
        if (parseInt($('#log_status').val()) != 1) {
            zhiyou_relate.popup_login_show();
        } else {
            // 显示出完整的“我要留言”
            $(window).scrollTop($('#comments').offset().top - 50);

            var textcomment_obj = $('#textareaComment');
            if (textcomment_obj.length > 0) {
                var author = $(this).attr('title');
                // 点击“引用”后在评论编辑框中的这些提示代码去掉，用户输入的要保留。并且光标换行
                var output = $.trim(textcomment_obj.val());
                // 我要留言  默认显示文字
                var default_data = $.trim($('#textareaComment').attr('default_data'));
                if (output == default_data) {
                    output = author + ' ';
                } else {
                    var out_arr = output.split(' ');
                    var flag = true;
                    for (var i = 0; i < out_arr.length; i++) {
                        if (author == out_arr[i]) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        output = author + ' ' + output + ' ';
                    } else {
                        output += ' ';
                    }
                }
                textcomment_obj.focus().val(output);
                return true;
            }
        }

        return true;
    });
}

/**
 * 举报按钮初始化；点击事件绑定
 * @param   string      obj_name        atta容器名称
 */
function func_report (obj_name) {
    if (!obj_name || typeof (obj_name) == undefined) {
        obj_name = '#comment';
    }
    //评论举报按钮初始化
    $(obj_name + ' .jubao').each(function () {
        if ($(this).attr('id')) {
            var report_cid = $(this).attr('id').split('_')[1];
            if (report_cid == '' || report_cid == null || report_cid == '0') {
                return false;
            }

            // 初始化为“已举报”
            var result_json = getCookie(comment_report_cookiename);
            if (result_json) {
                var comment_report_cookie_list = json_decode(result_json);
                if (comment_report_cookie_list) {
                    for (var i in comment_report_cookie_list) {
                        if (comment_report_cookie_list[i] && comment_report_cookie_list[i] == report_cid) {
                            has_report_omment(report_cid);
                        }
                    }
                }
            }
        }
        //点击事件绑定
    }).click(function () {
        if ($(this).attr('id')) {
            var report_cid = $(this).attr('id').split('_')[1];
            if (report_cid == '' || report_cid == null || report_cid == '0') {
                return false;
            }

            // 获取COOKIE，若“已举报”直接提示并return
            var boo_in_cookie = getBooInCookieArr1(comment_report_cookiename, report_cid);
            if (boo_in_cookie) {
                // 存入COOKIE一维数组
                setCookieArr1(comment_report_cookiename, report_cid, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
                //alert('您已经举报过了，我们正在处理，多谢反馈！');
                popUp('', '#pop-status-fail-twoLine', '您已经举报过了，我们正在处理，多谢反馈！');
                return false;
            }

            //待给弹出层样式后，动态获取数据
            var report_type = 1;
            var report_text = '';

            popPosition('#pop-report');

            var $popReport = $('#pop_report_opinion'),
                $popSubmit = $('#pop_report_submit');
            //初始化“其他”的多行文本域 及按钮 样式
            $popReport.find('textarea').val('').end().hide();
            $popSubmit.removeAttr('disabled').removeClass().addClass('btn_login');

            $('#pop-report').show(function () {
                $(this).find('input[type=\'radio\']').removeAttr('checked').click(function () {
                    var n = $(this).attr('id').split('_')[2];

                    report_type = n;

                    if (n == 9) {
                        $popReport.find('textarea').val('').end().show();
                        $popSubmit.attr('disabled', 'disabled').removeClass('btn_login').addClass('btn_grey');
                        $popReport.find('textarea').bind('keyup mouseup', function () {
                            var len = $(this).val().length;
                            report_text = $popReport.find('textarea').val();

                            if (len >= 2) {//输入内容长度限制
                                $popSubmit.removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
                            } else {
                                $popSubmit.attr('disabled', 'disabled').removeClass('btn_login').addClass('btn_grey');
                            }
                        });
                    } else {
                        report_text = '';

                        if ($popReport.is(':visible')) {
                            $popReport.hide();
                            $('#pop_report_submit').removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
                        }
                    }
                });
            });
            $('#cover').show();
            popClose('#pop-report');

            $('#pop_report_submit').unbind('click').click(function () {
                $('#pop-report,#cover').hide();
                $('#pop_report_opinion').hide();
                $('#pop_report_opinion').find('textarea').val('');
                /* 提交举报表单 */
                $.ajax({
                    url: zhiyou_relate.baseUrl + 'user/comment/ajax_comment_report',
                    data: 'type=' + report_type + '&content=' + report_text + '&cid=' + report_cid,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (data) {
                        var result = eval(data);
                        if (0 == result.error_code) {
                            // 设置样式
                            has_report_omment(report_cid);
                            // 存入COOKIE一维数组
                            setCookieArr1(comment_report_cookiename, report_cid, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
                            popUp('', '#pop-status-success', '举报成功！');
                        } else {
                            if (result.error_msg) {
                                popUp('', '#pop-status-fail', result.error_msg);
                            } else {
                                popUp('', '#pop-status-fail', '举报失败！');
                            }
                        }
                        return;
                    },
                    error: function () {
                        popUp('', '#pop-status-fail', '网络错误');
                    }
                });
            });
            return;
        }
    });
}

/**
 * 评论举报 -- 我收到的评论页面
 *
 * @author  丁毅，Dacheng Chen
 * @time    2015-8-21
 */
function commentReport (commentid, obj) {
    //举报弹出框提交按钮点击事件
    var span_aid = obj.attr('id');
    if (!span_aid || span_aid == undefined || typeof (span_aid) == undefined) {
        return;
    }

    var report_cid = span_aid.split('_')[1];
    if (report_cid == '' || report_cid == null || report_cid == '0') {
        return false;
    }

    // 获取COOKIE，若“已举报”直接提示并return
    var boo_in_cookie = getBooInCookieArr1(comment_report_cookiename, report_cid);
    if (boo_in_cookie) {
        // 存入COOKIE一维数组
        setCookieArr1(comment_report_cookiename, report_cid, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
        //alert('您已经举报过了，我们正在处理，多谢反馈！');
        popUp('', '#pop-status-fail-twoLine', '您已经举报过了，我们正在处理，多谢反馈！');
        return false;
    }

    var report_type = 1;
    var report_text = '';
    popPosition('#pop-report');
    $('#pop-report').css({
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'margin-left': '-240px',
        'margin-top': '-165px'
    }).show(function () {
        $('#pop_report_opinion').hide();
        $(this).find('input[type=\'radio\']').removeAttr('checked').click(function () {
            var n = $(this).attr('id').split('_')[2];
            report_type = n;
            if (n == 9) {
                $('#pop_report_opinion').show();
                $('#pop_report_submit').attr('disabled', 'disabled').addClass('btn_grey');
                $('#pop_report_opinion').find('textarea').show().bind('keyup mouseup', function () {
                    var len = $(this).val().length;
                    report_text = $('#pop_report_opinion').find('textarea').val();

                    if (len >= 10) {
                        $('#pop_report_submit').removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
                    } else {
                        $('#pop_report_submit').attr('disabled', 'disabled').addClass('btn_grey');
                    }
                });
            } else {
                report_text = '';

                if ($('#pop_report_opinion').is(':visible')) {
                    $('#pop_report_opinion').hide().find('textarea').hide();
                    $('#pop_report_submit').removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
                }
            }
        });
    });
    $('#cover').show();
    popClose('#pop-report');

    //举报弹出框提交按钮点击事件
    $('#pop_report_submit').unbind('click').click(function () {
        $('#pop-report,#cover').hide();
        $('#pop_report_opinion').hide();
        $('#pop_report_opinion').find('textarea').val('');
        $(this).attr('disabled', 'disabled').addClass('btn_grey');
        $('.pop_report_opinion p').html('最少输入10个字').attr('class', 'grey');
        //提交举报表单
        $.ajax({
            type: 'POST',
            url: '/user/comment/ajax_report',
            data: 'type=' + report_type + '&content=' + report_text + '&cid=' + report_cid,
            dataType: 'json',
            success: function (data) {
                $(this).removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
                var result = eval(data);
                if (0 == result.error_code) {
                    has_report_omment(report_cid);
                    // 设置样式
                    $('#report_' + report_cid).removeAttr('onclick').html('已举报');
                    // 存入COOKIE一维数组
                    setCookieArr1(comment_report_cookiename, report_cid, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
                    popUp('', '#pop-status-success', '举报成功！');
                } else {
                    if (result.error_msg) {
                        popUp('', '#pop-status-fail', result.error_msg);
                    } else {
                        popUp('', '#pop-status-fail', '举报失败');
                    }
                }
                return;
            },
            error: function () {
                popUp('', '#pop-status-fail', '网络错误');
            }
        });

        $(this).removeAttr('disabled').removeClass('btn_grey').addClass('btn_login');
        return false;
    });

    return false;
}

/**
 * 改变评论举报按钮为已举报
 */
function has_report_omment (id) {
    $('#comment .tab_info .comment_listBox li #report_' + id).removeAttr('onclick')
        .addClass('comment-report')
        .html('已举报');
    return;
}

/**
 * 获得某评论打分顶、踩的总数
 *
 * @param   int     cid          评论ID
 * @param   int     licid        所属外层评论ID
 * @param   int     isding       1顶；0踩
 * @returns int     顶或踩总数
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function get_rating_num (licid, cid, isding) {
    var numID = 'cdc_support_' + cid;
    if (0 == isding) {
        numID = 'cdc_oppose_' + cid;
    }
    // 评论支持、反对分值
    var rs = $('#li_comment_' + licid + ' #' + numID + ':first span').html();
    if (rs) {
        var st = rs.split('(')[1];
        rs = st.split(')')[0];
        (rs) ? rs = parseInt(rs) : rs = 0;
    } else {
        rs = 0;
    }
    return rs;
}

/**
 * 评论打分“顶、踩”设置点击后样式
 *
 * @param   int     id          评论ID
 * @param   int     isding      1顶；0踩
 * @param   int     dingnum     顶总数
 * @param   int     cainum      踩总数
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function has_rating_omment (id, isding, dingnum, cainum) {
    if (1 == isding) {
        $('#comment .tab_info .comment_listBox li #cdc_support_' + id).removeAttr('onclick').addClass('current').html('顶<span>(' + dingnum + ')</span>');
        $('#comment .tab_info .comment_listBox li #cdc_oppose_' + id).removeAttr('onclick').removeClass('current');
    } else {
        $('#comment .tab_info .comment_listBox li #cdc_support_' + id).removeAttr('onclick').removeClass('current');
        $('#comment .tab_info .comment_listBox li #cdc_oppose_' + id).removeAttr('onclick').addClass('current').html('踩<span>(' + cainum + ')</span>');
    }
    return;
}

/**
 * 初始化评论表情
 *
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-16
 */
function init_smile () {
    /**
     * seo要求，将php输出的表情dom结构改成只输出数据，js拼接模板
     *
     * @author CaoXudong 2017-03-17
     *
     */
    var smilePageCount; //目前是5页
    var smilePageDom = '';
    if (typeof smileJSON !== 'undefined' && smileJSON.length) {
        smilePageCount = smileJSON.length;
        for (var i = 0; i < smilePageCount; i++) {
            var smileDom = '';
            for (var j = 0; j < smileJSON[i].length; j++) {
                smileDom += '<li><a href="javascript:void(0)" class="' + smileJSON[i][j][0] + '" default-data="[' + smileJSON[i][j][1] + ']" title="' + smileJSON[i][j][1] + '"></a></li>';
            }
            $('<ul class="smileBox" ' + ((i + 1) !== 1 ? 'style="display:none;"' : '') + '></ul>').append(smileDom).appendTo('.smileLayerBg');
            // 增加表情页数
            smilePageDom += '<a href="javascript:void(0)"' + ((i + 1) === 1 ? ' class="current"' : '') + '>' + (i + 1) + '</a>';
        }
        $('<div class="smilePage"></div>').append(smilePageDom).appendTo('.smileLayerBg');
    }
    // 我要留言  默认显示文字
    var default_data = $.trim($('#textareaComment').attr('default_data'));
    //点击笑脸图片显示表情图层
    $('.icon-small').click(function () {
        $('.smileLayerBg').hide();
        if ($(this).attr('isclick') == '1') {
            $(this).removeAttr('isclick');
        } else {
            $('.icon-small').each(function () {
                $(this).removeAttr('isclick');
            });
            $(this).attr('isclick', '1');
            var layerP = $(this).parent();
            layerP.find('.smileLayerBg').show();//.smileLayerBg #smiley
            layerP.find('.smileLayerBg .smileBox').hide().eq(0).show();//第一页表情DIV
            layerP.find('.smileLayerBg .smilePage a').removeAttr('class').eq(0).attr('class', 'current');//第一页表情分页
        }
    });
    //评论表情分页tab切换
    $(document).on('click', '.smilePage a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.smileBox').hide().eq($('.smilePage a').index(this)).show();
    });
    // 表情
    $(document).on('click', '.smileLayerBg li a', function () {
        var temp_div = $(this).parents('.comment_smileBox');
        var textarea_obj = temp_div.parent().parent().find('textarea:first');
        temp_div.find('.smileLayerBg').css('display', 'none');
        temp_div.find('.icon-small').removeAttr('isclick');//笑脸
        var dstr = textarea_obj.attr('default');
        var str = textarea_obj.val();
        if (str == default_data) str = '';
        var sstr = str;
        if (dstr) var sstr = str.replace(dstr, '');
        textarea_obj.val(sstr);
        textarea_obj.insertContent($(this).attr('default-data'));
    });
}

window.init_smile = init_smile;

/**
 * 评论打分 初始化
 */
function init_comment_rating (obj_name) {
    // 初始化为已打分样式
    var result_json = getCookie(comment_rating_cookiename);
    if (result_json) {
        if (!obj_name || typeof (obj_name) == undefined) {
            obj_name = '#comment';
        }
        $(obj_name + ' .dingNum').each(function () {
            if ($(this).attr('id')) {
                var rating_cid = $(this).attr('id').split('_')[2];
                if (rating_cid == '' || rating_cid == null || rating_cid == '0') {
                    return false;
                }

                var comment_rating_cookie_list = json_decode(result_json);
                if (comment_rating_cookie_list) {
                    for (var i in comment_rating_cookie_list) {
                        if (comment_rating_cookie_list[i] && comment_rating_cookie_list[i][0] && comment_rating_cookie_list[i][0] == rating_cid) {
                            if ('1' == comment_rating_cookie_list[i][1]) {
                                $('#comment .tab_info .comment_listBox li #cdc_support_' + rating_cid).removeAttr('onclick').removeClass('current').addClass('current');
                                $('#comment .tab_info .comment_listBox li #cdc_oppose_' + rating_cid).removeAttr('onclick').removeClass('current');
                            } else {
                                $('#comment .tab_info .comment_listBox li #cdc_support_' + rating_cid).removeAttr('onclick').removeClass('current');
                                $('#comment .tab_info .comment_listBox li #cdc_oppose_' + rating_cid).removeAttr('onclick').removeClass('current').addClass('current');
                            }
                        }
                    }
                }
            }
        });
    }
}

window.init_comment_rating = init_comment_rating;

/**
 * 评论打分ajax
 *
 * @param   string      type        评论类型
 * @param   int         rating      评论打分：1顶；0踩
 * @param   int         comment_id  评论ID
 * @param   int         pid         所属文章ID
 * @param   int         licid       所属顶级评论ID
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-17
 */
function comment_rating_ajax (type, rating, comment_id, pid, licid) {
    var dingnum = get_rating_num(licid, comment_id, 1);    //顶总数
    var cainum = get_rating_num(licid, comment_id, 0);     //踩总数

    // 获取COOKIE，若“已举报”直接提示并return
    var boo_in_cookie = getBooInCookieArr2(comment_rating_cookiename, comment_id);
    if (boo_in_cookie) {
        has_rating_omment(comment_id, rating, dingnum, cainum);
        setCookieArr2(comment_rating_cookiename, comment_id, rating, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
        alert('您已打分');
        return false;
    }

    // ajax
    $.ajax({
        type: 'GET',
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_rating',
        data: 'comment_id=' + comment_id + '&rating=' + rating,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var result = eval(data);
            // 设置样式
            if (rating == 0) {
                cainum = cainum + 1;
            } else {
                dingnum = dingnum + 1;
            }
            has_rating_omment(comment_id, rating, dingnum, cainum);
            if (0 == result.error_code) {
                // 存入COOKIE一维数组
                setCookieArr2(comment_rating_cookiename, comment_id, rating, 604800, '/', smzdm_domain);// 604800 = 7天*24*3600
            }
            return;
        }
    });
    return;
}

/**
 * 展示弹窗
 */
function show_confirm () {
    $('#pop-tips').css({'left': '50%', 'margin-left': '-240px', 'top': '50%', 'margin-top': '-115px'}).show();
    $('#cover').show();
    $('#layerBtnL').removeAttr('onclick');
    $('#cover').on('click', function () {
        close_submit_confirm();
    });
}

/**
 * 个人中心，用户自己删除评论时有弹窗
 * @param comment_id
 */
function del_comment_confirm (comment_id) {
    show_confirm();
    $('#layerBtnL').bind('click', function () {
        close_submit_confirm();
        del_comment(comment_id, 0);
    });
}

function del_comment (comment_id, operator) {
    $.ajax({
        type: 'POST',
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_del_comment',
        data: 'comment_id=' + comment_id + '&operator=' + operator,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (0 == data.error_code) {
                if (typeof ($('#div_comment_' + comment_id)) != undefined) {
                    $('#div_comment_' + comment_id).remove();
                }
                popUp('', '#pop-status-success', '删除成功');
            } else {
                if (data.error_msg) {
                    popUp('', '#pop-status-fail', data.error_msg);
                } else {
                    popUp('', '#pop-status-fail', '操作失败');
                }
            }
        },
        error: function () {
            popUp('', '#pop-status-fail', '网络错误');
        }
    });
}

/**
 * 文章评论列表，小编删除评论时有弹窗
 * @param comment_id
 */
function delete_comment_confirm (comment_id) {
    if (window.confirm('确定删除该评论？')) {
        commentDelete(comment_id, 1);
    }
}

/**
 * 删除评论
 * @param comment_id  评论ID
 * @param operator 操作人。默认0用户自己从个人中心删除；1小编删除；
 */
function commentDelete (comment_id, operator) {
    $.ajax({
        type: 'POST',
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_del_comment',
        data: 'comment_id=' + comment_id + '&operator=' + operator,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            if (data.error_code == 0) {
                $('.comment_listBox').find('#li_comment_' + comment_id).remove();
                $('.comment_listBox').find('[blockquote_cid=\'' + comment_id + '\']').remove();
                popUp('', '#pop-status-success', '删除成功');
            }
        }
    });
}

/**
 * 在textarea处插入文本
 */
(function ($) {
    $.fn.extend({
        insertContent: function (myValue, t) {
            var $t = $(this)[0];
            if (document.selection) { // ie
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd('character', wee + t);
                    t <= 0 ? sel.moveStart('character', wee - 2 * t - myValue.length) : sel.moveStart('character', wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    });
})(jQuery);

//初始化快速留言样式
function clearReplyCss () {
    $('#quickComment').val('');
    $('.textarea_quick').height('auto');
}

function commentQuickReply (obj) {
    $(obj).click(function () {
        //未登录时弹出登录框
        if (parseInt($('#log_status').val()) != 1) {
            zhiyou_relate.popup_login_show();
        } else {
            clearReplyCss();
            var reply_div = $('#quickReply');

            // 被引用评论ID
            var parentid = 0;
            if ($(this).attr('id')) {
                parentid = $(this).attr('id').split('_')[2];
                if (parentid == '' || parentid == null || parentid == '0' || parentid == 0) {
                    parentid = 0;
                }
                reply_div.find('#parentid').val(parentid);
            }

            var blank_div = $(this).parent().parent('.comment_conWrap').find('.blankDiv');
            if ($(blank_div).html() == '') {
                $(blank_div).html(reply_div);
                $('#quickReply').show();
                $(this).parent('.comment_action').css({display: 'block', visibility: 'visible'});
            } else {
                $('#quickReplyDiv').html(reply_div);
            }
        }
    });
}

//鼠标滑过或滑出评论，操作状态为可见或不可见
function visibleOrNot (target, parentObj, method) {
    $(target).hover(
        function () {
            if (method = 'visibility') {
                $(this).children().find(parentObj).css('visibility', 'visible');
            } else if (method = 'display') {
                $(this).children().find(parentObj).css('display', 'block');
            }
        }, function () {
            if (method = 'visibility') {
                $(this).children().find(parentObj).css('visibility', 'hidden');
            } else if (method = 'display') {
                $(this).children().find(parentObj).css('display', 'none');
            }
        }
    );
}

function popClose (o) {
    $(o).find('.pop-close').click(function () {
        $(o).hide();
        $('#cover').hide();
    });

    $('#cover').click(function () {
        $(o).hide();
        $('#cover').hide();
    });
}

function popUp (source, o, txt, isAlwaysShow) {
    if (source != '') {
        $(source).click(function () {
            popPosition(o);
            $(o).show();
            $('#cover').show();
            popClose(o);
        });
    } else {
        if (!isAlwaysShow) {
            $(o).find('.pop_info').html(txt);
            popPosition(o);
            $(o).show();
            $('#cover').show();
            setTimeout(function () {
                $(o).hide();
                $('#cover').hide();
            }, 2000);
            popClose(o);
        } else {
            $(o).find('.pop_info').html(txt);
            popPosition(o);
            $(o).show();
            $('#cover').show();
            popClose(o);
        }
    }
}

/**
 * 评论 分享到新浪微博
 *       所有“分享至”同步勾选、同步取消勾选
 *
 * @param   object      obj         当前对象
 * @returns
 */
function comment_share_to_sina (obj) {
    $(obj).click(function () {
        var temp_has = 0;
        if ($(this).hasClass('icon-rightframe')) {
            temp_has = 1;
            var is_comment_connect = 'no';
            $('#comments .comment_share i.check').removeClass('icon-rightframe');
        } else {
            temp_has = 0;
            var is_comment_connect = 'yes';
            $('#comments .comment_share i.check').addClass('icon-rightframe');
        }
        $.ajax({
            type: 'POST',
            url: '/ajax_set_weibo_connect',
            data: 'isconnect=' + is_comment_connect,
            dataType: 'json',
            success: function (data) {
                if (0 != data.error_code) {
                    popUp('', '#pop-status-fail', data.error_msg);
                    if (temp_has) {
                        $('#comments .comment_share i.check').addClass('icon-rightframe');
                    } else {
                        $('#comments .comment_share i.check').removeClass('icon-rightframe');
                    }
                }
                return true;
            }
        });
    });
    return false;
}

/**
 * JS实现页面跳转
 * 比如详情页评论分页
 * @param   int     max_page        最大页码
 * @param   string  href            跳转地址
 * @param   object  obj             GO点击JS对象
 * @returns
 * @author  Dacheng Chen
 * @time    2014-5-18
 */
function on_check_comment_page (max_page, href, obj) {
    var input_num = $(obj).parent().parent().find('.jumpToPage #input_num').val();
    var re = /^[1-9]+[0-9]*]*$/;
    if (re.test(input_num)) {
        if (input_num <= 0) {
            input_num = 1;
        }
        if (input_num > max_page) {
            input_num = max_page;
        }
        location.href = href + '#comments';
        if (input_num >= 1) {
            location.href = href + 'p' + input_num + '#comments';
        }
    } else {
        alert('请输入有效数字！');
    }
    return true;
}

/** -------------------- 展开更多 start ------------------------------------------- **/
//评论 开始
var comment_tpl = {
    //盖楼评论item
    'item': '<blockquote class="comment_blockquote" blockquote_cid="{comment_id}"><div class="comment_floor">{depth}</div><div class="comment_conWrap"><div class="comment_con" style="max-height:none;" >{user_display_name}</div><div class="comment_action"><a class="jubao" href="javascript:void(0);" id="report_{comment_id}">举报</a><a class="dingNum {ding_class}" href="javascript:void(0);" id="cdc_support_{comment_id}" onclick="return comment_rating_ajax(\'{comment_type}\', 1, {comment_id}, {article_id}, {li_comment_id});">顶<span>({up_num})</span></a><a class="caiNum" href="javascript:void(0);" id="cdc_oppose_{comment_id}" onclick="return comment_rating_ajax(\'{comment_type}\', 0, {comment_id}, {article_id}, {li_comment_id});">踩<span>({down_num})</span></a>{atta}<a class="reply" href="javascript:void(0);" id="cdc_reply_{comment_id}">回复</a></div><div class="blankDiv"></div></div></blockquote>',
    'item_no_atta_reply': '<blockquote class="comment_blockquote" blockquote_cid="{comment_id}"><div class="comment_floor">{depth}</div><div class="comment_conWrap"><div class="comment_con">{user_display_name}</div><div class="comment_action"><a class="jubao" href="javascript:void(0);" id="report_{comment_id}">举报</a><a class="dingNum {ding_class}" href="javascript:void(0);" id="cdc_support_{comment_id}" onclick="return comment_rating_ajax(\'{comment_type}\', 1, {comment_id}, {article_id}, {li_comment_id});">顶<span>({up_num})</span></a><a class="caiNum" href="javascript:void(0);" id="cdc_oppose_{comment_id}" onclick="return comment_rating_ajax(\'{comment_type}\', 0, {comment_id}, {article_id}, {li_comment_id});">踩<span>({down_num})</span></a></div><div class="blankDiv"></div></div></blockquote>'
};

/**
 * 获得comment_id的所有盖楼评论数据
 *
 * @param   int     comment_id      评论ID
 * @param   int     article_id      文章ID
 * @param   string  cate            new最新；hot最热
 * @param   int     channel_id      频道ID
 * @param   int     show_at_replay  1显示@TA和回复功能入口；0不显示。
 * @return
 * @author  Dacheng Chen
 * @time    2015-4-7
 */
function show_floors (comment_id, article_id, cate, channel_id, show_at_replay) {
    if (!comment_id || typeof (comment_id) == undefined || !cate || typeof (cate) == undefined || (cate != 'New' && cate != 'Hot')) {
        popUp('', '#pop-status-fail', '网络错误！');
        return;
    }
    if (typeof (show_at_replay) == undefined) {
        show_at_replay = 1;
    }

    var blockquote_obj = $('#commentTabBlock' + cate + ' #li_comment_' + comment_id + ' .blockquote_wrap');
    blockquote_obj.find('.comment_showAll').html('<a class="a_underline" href="javascript:void(0);">加载中，请稍候。。。</a>');
    if (!article_id || typeof (article_id) == undefined || !channel_id || typeof (channel_id) == undefined) {
        blockquote_obj.find('.comment_showAll').html('<a class="a_underline" href="javascript:void(0);">网络错误，请刷新重试</a>');
    }

    var reply_div = $('#quickReply');//快捷回复DIV
    var is_bgm = $('#is_bgm').val();//是否小编

    $.ajax({
        type: 'GET',
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_show_floors',
        data: 'comment_id=' + comment_id + '&article_id=' + article_id + '&channel_id=' + channel_id,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (res) {
            if (res.error_code > 0) {
                blockquote_obj.find('.comment_showAll').html('<a class="a_underline" href="javascript:void(0);" onclick="show_floors(' + comment_id + ',' + article_id + ', \'' + cate + '\', \'' + channel_id + '\', ' + show_at_replay + ')">网络错误，请重试</a>');
                return;
            }

            if (show_at_replay) {
                var tpl_item = comment_tpl.item;
            } else {
                var tpl_item = comment_tpl.item_no_atta_reply;
            }
            //评论盖楼HTML
            var comment_list = new StringBuilder('').onMultiAppendBefore(function (param) {
                //盖楼html
                param['li_comment_id'] = res.data.li_comment_id;
                param['article_id'] = res.data.article_id;
                param['channel_id'] = res.data.channel_id;
                param['user_display_name'] = '';
                param['atta'] = '';
                if (param['home_ta']) {
                    param['user_display_name'] = '<a class="a_underline user_name" target="_blank" href="' + param['home_ta'] + '" usmzdmid="' + param['smzdm_id'] + '">' + param['display_name'] + param['post_author'] + '</a>：<p>' + param['content'] + '</p>';
                } else {
                    param['user_display_name'] = '<span class="grey">' + param['display_name'] + param['post_author'] + '</span>：<p>' + param['content'] + '</p>';
                }
                if (1 != param['is_anonymous']) {
                    param['atta'] = '<a class="atta" href="javascript:void(0);" title="@' + param['display_name'] + '">@TA</a>';
                }
            }).appendMultiFormat(tpl_item, res.data.comment_rows).toString();
            blockquote_obj.html(comment_list);

            //鼠标滑过或滑出评论，操作状态为可见或不可见
            visibleOrNot('.operate_box', '.noGoods', 'visibility');
            visibleOrNot('blockquote', '.comment_action', 'display');
            //评论快捷回复
            commentQuickReply(blockquote_obj.find('.reply'));
            //关小黑屋、删除 操作按钮
            if (is_bgm && typeof (is_bgm) != undefined && blockquote_obj.find('blockquote').length > 0) {
                blockquote_obj.find('blockquote').each(function () {
                    var commentID = $(this).attr('blockquote_cid');
                    var userID = $(this).find('.user_name:first').attr('usmzdmid');
                    //小编评论打码
                    var mosaicDom = '<a href="javascript:void(0);" title="打码" onclick="mosaic_show_textarea(' + commentID + ')">打码</a>';
                    var blackListDom = '<a href="http://users.bgm.smzdm.com/blackroom/user_add?smzdm_id=' + userID + '" title="关小黑屋" target="_blank">关小黑屋</a>';
                    if (userID == 0 || userID == undefined) {
                        blackListDom = '';
                    }
                    var deleteDom = '<a href="javascript:void(0);" onclick="delete_comment_confirm(' + commentID + ')" title="删除">删除</a>';
                    var editDom = '<a href="http://comments.bgm.smzdm.com/comments/info/' + commentID + '" title="编辑" target="_blank">编辑</a>';
                    var controls = mosaicDom + blackListDom + deleteDom + editDom;
                    $(this).find('.dingNum:last').before(controls);
                });
            }
            //快捷回复
            var quick_reply_obj = $('#quickReplyDiv');
            if ($.trim(quick_reply_obj.html()) == '') {
                reply_div.find('#parentid').val(0);
                quick_reply_obj.html(reply_div);
            }
            //顶踩高亮显示
            init_comment_rating('#li_comment_' + comment_id + ' .blockquote_wrap');
            //@TA
            func_atta('#li_comment_' + comment_id + ' .blockquote_wrap');
            //举报
            func_report('#li_comment_' + comment_id + ' .blockquote_wrap');

            return;
        }
    });
    return;
}

/** -------------------- 展开更多 end ------------------------------------------- **/

/** -------------------- 评论打码 start ------------------------------------------- **/
/**
 * 显示文本框，以开始打码
 */
function mosaic_show_textarea (cid) {
    $('#pop-mosaic').remove();
    //打码内容
    var article_id = $.trim($('#commentform #pid').val());
    var channel_id = $.trim($('#commentform #type').val());//频道ID
    $.ajax({
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_content/',
        data: 'comment_id=' + cid + '&article_id=' + article_id,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var result = eval(data);
            if (0 != result.error_code) {
                alert(result.error_msg);
                return false;
            }

            var old_content = result.data;
            var html_txt = '<div class="pop pop_main_box" id="pop-mosaic" style="display:block;margin-left:-240px;margin-top:-138px;">' +
                '<i class="pop-close icon-times-o"><!--[if lt IE 8]>x<![endif]--></i>' +
                '<div class="pop-title"><div class="pop_name">打码</div></div>' +
                '<div class="pop-content">' +
                '<div class="pop_width_420">' +
                '<form id="commentform_' + cid + '">' +
                '<input type="hidden" name="comment_id" value="' + cid + '" readonly="readonly" />' +
                '<input type="hidden" name="article_id" value="' + article_id + '" readonly="readonly" />' +
                '<input type="hidden" name="channel_id" value="' + channel_id + '" readonly="readonly" />' +
                '<textarea name="old_content" id="old_content" readonly="readonly" style="display:none;">' + old_content + '</textarea>' +
                '<textarea name="content" id="txt_content_' + cid + '" class="textarea" id="mosaic-textarea" cols="60" rows="5">' + old_content + '</textarea>' +
                '<div class="a_blockBox"><a href="javascript:void(0);" class="a_redBlock" id="mosaicbtn_' + cid + '" onclick="mosaic_comment(' + cid + ')">打&nbsp;&nbsp;码</a></div>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>';
            var cover = $('#cover');
            cover.css('display', 'block');
            cover.click(function () {
                $(this).hide();
                $('#pop-mosaic').hide();
            });

            $('#comment').after(html_txt);

            //点击关闭
            $('#pop-mosaic').delegate('.pop-close', 'click', function () {
                $('#pop-mosaic').hide();
                cover.css('display', 'none');
            });

            return true;
        },
        error: function () {
            alert('网络错误');
        }
    });
    return true;
}

/**
 * 获得被选中的文本框中文本
 *
 * @param   string      id      文本框ID
 * @returns string      被选中的文本
 * @author  Dacheng Chen
 * @time    2015-7-29
 */
function get_select_txt (id) {
    var select_field = document.getElementById(id);
    var word = '';//被选中的文本
    if (document.selection) {
        var sel = document.selection.createRange();
        if (sel.text.length > 0) {
            word = sel.text;
        }
    }/*ie浏览器*/
    else if (select_field.selectionStart || select_field.selectionStart == '0') {
        var startP = select_field.selectionStart;
        var endP = select_field.selectionEnd;
        if (startP != endP) {
            word = select_field.value.substring(startP, endP);
        }
    }/*标准浏览器*/

    return word;
}

/**
 * 马赛克，评论内容打码
 *
 * @param   int     cid             评论ID
 * @returns bool
 * @author  Dacheng Chen
 * @time    2015-7-29
 */
function mosaic_comment (cid) {
    var mosaic_pre = '〖「【《';
    var mosaic_suf = '》】」〗';
    var mosaic_btn = $('#mosaicbtn_' + cid);
    var txt_obj = $('#txt_content_' + cid);
    txt_obj.attr('disabled', 'disabled');
    mosaic_btn.attr('disabled', 'disabled').html('打码中');
    var con = $.trim(txt_obj.val());//点击“打码”前的内容
    var old_con = con;
    var have_mosaic = con.indexOf(mosaic_pre) >= 0 || con.indexOf(mosaic_suf) >= 0;//是否选中文本
    var sel_txt = get_select_txt('txt_content_' + cid);
    var con_len = strlen(con);
    if (con_len > 900) {
        alert('该评论内容过长，请去后台操作');
        txt_obj.removeAttr('disabled');
        mosaic_btn.removeAttr('disabled').html('打码');
        return false;
    }

    //一、选中文本，打码。请注意不要出现嵌套打码。
    if (sel_txt) {
        var newcon = $.trim(txt_obj.val());
        if (newcon.indexOf(mosaic_pre) >= 0 || newcon.indexOf(mosaic_suf) >= 0) {//已有打码弹出提醒
            if (confirm('已经有打码内容，请注意不要嵌套打码')) {
                txt_obj.insertContent(mosaic_pre + sel_txt + mosaic_suf);
            } else {
                txt_obj.removeAttr('disabled');
                mosaic_btn.removeAttr('disabled').html('打码');
                return true;
            }
        } else {
            txt_obj.insertContent(mosaic_pre + sel_txt + mosaic_suf);
        }
        //二、未选中文本
    } else {
        //取消打码
        var regObj = {'〖「【《': '', '》】」〗': ''};//JSON
        for (reg in regObj) {
            con = con.replace(new RegExp(reg, 'g'), regObj[reg]);
        }
        txt_obj.val(con);
    }
    txt_obj.removeAttr('disabled');
    mosaic_btn.removeAttr('disabled').html('打码');

    $.ajax({
        url: zhiyou_relate.baseUrl + 'user/comment/ajax_edit/',
        data: $('#commentform_' + cid).serialize(),
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var result = eval(data);
            if (0 != result.error_code) {
                alert(result.error_msg);
                return false;
            }
            $('.p_content_' + cid).html(result.data);
            $('#pop-mosaic').find('#old_content').val(con);
            return;
        },
        error: function (XMLHttpRequest) {
            popUp('', '#pop-status-fail', '网络错误');
        }
    });

    return true;
}

/**
 * JavaScript判断字符串长度（含中英文）
 * @author  Dacheng Chen
 * @time    2013-2-7
 */
function strlen (s) {
    var w = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
    }
    return w;
}

/** -------------------- 评论打码 end ------------------------------------------- **/

/** -------------------- 评论投票 没有了 start ------------------------------------------- **/
/**
 * 点击文章内容中的“投票”按钮后，增加隐藏数据：被投票晒单ID
 * @param   int         vote_id         被投票文章ID
 * @param   int         post_id         投票活动文章ID
 * @param   string      vote_type       频道。os晒单；exp经验
 * @returns {unresolved}
 * @author  Dacheng Chen
 * @time    2014-1-14
 */
function vote_by_post_comment (vote_id, post_id, vote_type) {
    if (vote_type != 'os' && vote_type != 'exp') {
        return;
    }
    if (vote_pid != post_id) {
        return;
    }
    if (typeof (vote_id) == 'undefined') {
        return;
    }
    if (vote_id == '' || vote_id == 0) {
        return;
    }

    // 判断是否详情页，不是要跳转过来哦
    var thisUri = document.URL;
    var toUri = smzdm_site_domain + 'youhui/' + post_id;
    if (thisUri.indexOf(toUri) >= 0) {
        var t = $('#respond').offset().top;
        $(window).scrollTop(t - 300);
    } else {
        setCookie(vote_id_cookie_key, vote_id, 30);//30天
        setCookie(vote_type_cookie_key, vote_type, 30);//30天
        window.open(toUri + '#comments', '_blank');
    }
    show_vote_div(vote_id, vote_type);
    return false;
}

function show_vote_div (vote_id, vote_type) {
    // 设置隐藏字段
    $('#vote_id').val(vote_id);
    $('#vote_type').val(vote_type);
    // 回复给“XXX”，修改为 引用
    var vote_div = $('#hidden_vote_div');
    if (vote_div) {
        vote_div.css('display', '').html('');
    }
    var vote_title = $('#vote_' + vote_type + '_' + vote_id).html();
    $('#hidden_vote_div').css('display', 'block').html('<div id="cdc_vote_div" class="voteDiv" style="margin: -5px 10px 10px 0px; color: rgb(187, 2, 0); padding-left: 74px; width: 610px; line-height: 1.6em;">请填写推荐理由，提交后即可为《' + vote_title + '》投票。</div>');

    return false;
}

/**
 * 取消投票
 * &nbsp;&nbsp;<a class="voteCancle" href="javascript:;" title="取消投票" onclick="cancle_vote()">取消投票</a>
 */
function cancle_vote () {
    $('#vote_id').attr('value', 0);
    $('#vote_type').attr('value', '');
    var vote_div = $('#hidden_vote_div');
    if (vote_div) {
        vote_div.css('display', 'none').html('');
    }
}

// 从 2.smzdm.com 域名下的 main.js 里面提取
//tab 滑过or点击切换
function tab (tabNav, tabCont, currentClass, method) {
    if (method == 'click') {
        $(tabNav).click(function () {
            $(this).addClass(currentClass).siblings().removeClass(currentClass);
            $(tabCont).hide().eq($(tabNav).index(this)).show();
        });
    } else if (method == 'hover') {
        $(tabNav).mouseover(function () {
            $(this).addClass(currentClass).siblings().removeClass(currentClass);
            $(tabCont).hide().eq($(tabNav).index(this)).show();
        });
    }
}

/* jshint ignore:end */
