/**
 * Created by caoxudong on 16/x/x.
 */
var focusPop = require('./pop.js').focusPop;
var addFocusPop = require('./pop.js').addFocusPop;
var focusSuccess = require('./pop.js').focusSuccessPop;
function ajaxRequest (data, callback, $this) {
    $.extend(data, {
        type: $this.data('type') + '',
        keyword: $this.data('cate')
    });
    $.ajax({
        type: 'get',
        url: '//zhiyou.smzdm.com/guanzhu/jsonp_follow',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: data,
        success: function (resp) {
            callback(resp, $this);
        },
        error: function (err) {
            console.log(err);
            // 走到错误逻辑也要添加其他按钮的事件绑定
            clickUnlock();
        }
    });
}
function ajaxCallback (text, status) {
    return function (resp, $this) {
        clickUnlock();
        if (resp.error_code === 0) {
            if (resp.data === 'ok') {
                $this.attr('data-follow', '' + status);
                if ($this.prop('tagName') === 'INPUT') {
                    $this.prop('checked', status === 1);
                    focusPop(text);
                } else {
                    $this.html(text);
                    if ($this.hasClass('focus-lvyou') && text === '取消关注') {
                        focusSuccess('//zhiyou.smzdm.com/guanzhu/biaoqian/', '已关注');
                        $this.hide();
                    }
                    /* 旅游关注改变埋点 */
                    if ($this.hasClass('lvyou-popfoucs')) {
                        var name = $($this).parent().parent().siblings('.banner-title').text();
                        var icon = $($this).siblings('p').text();
                        var dataFollow = $($this).attr('data-follow');
                        var operation = $($this).find('span').text();
                        if (Number(dataFollow) === 1) {
                            operation = '取消关注';
                        } else if (Number(dataFollow) === 0) {
                            operation = '关注';
                        }
                        $($this).attr({'onclick': "dataLayer.push({'event':'11300','name':'" + name + "','icon':'" + icon + "','operation':'" + operation + "'});"});
                    }
                    if ($this.parents('.feed-block-small').length) {
                        var $count = $this.parents('.feed-block-small').find('.J_focus_count');
                        var num = parseInt($count.html());
                        // user类型的和其他类型的data-follow的状态值不一致 所以之类要分开处理
                        if ($this.attr('data-type') === 'user') {
                            if (status === 1) {
                                if (num - 1 <= 0) {
                                    $count.html(0);
                                } else {
                                    $count.html(num - 1);
                                }
                            } else {
                                $count.html(num + 1);
                            }
                        } else {
                            if (status === 0) {
                                if (num - 1 <= 0) {
                                    $count.html(0);
                                } else {
                                    $count.html(num - 1);
                                }
                            } else {
                                $count.html(num + 1);
                            }
                            // 修改统计参数
                            if ($this.attr('onclick')) {
                                let gaLayer = $this.attr('onclick');
                                let oldGaTxt = status === 0 ? '取消关注' : '关注';
                                let newGaTxt = status === 0 ? '关注' : '取消关注';
                                let newGaLayer = gaLayer.replace(oldGaTxt, newGaTxt);
                                $this.attr('onclick', newGaLayer);
                            }
                        }
                    }
                    // 社区详情页关注联动
                    if ($this.hasClass('J_user_focus_detail')) {
                        var shequDataFollow = $($this).attr('data-follow');
                        if (Number(shequDataFollow) === 2) {
                            $('.J_user_focus_detail').html('已关注');
                            $('.J_user_focus_detail').attr('data-follow', '2');
                        } else if (Number(shequDataFollow) === 1) {
                            $('.J_user_focus_detail').html('<i class="icon-plus-o-thin"></i>关注');
                            $('.J_user_focus_detail').attr('data-follow', '1');
                        }
                    }
                }
            } else {
                if ($this.parents('.J_add_focus_wrap').length) {
                    // 添加关注浮层的出错提醒
                    addFocusPop(resp.error_msg);
                } else {
                    focusPop(resp.error_msg);
                }
            }
        } else {
            if (resp.error_code === 1 && resp.error_msg === '用户未登录') {
                $('.J_login_trigger').trigger('click');
            } else if (resp.error_code === 2) {
                if ($this.parents('.J_add_focus_wrap').length) {
                    // 添加关注浮层的出错提醒
                    addFocusPop('关注数量超出限制，<br/>请先删除部分内容再尝试');
                } else {
                    focusPop('关注数量超出限制，<br/>请先删除部分内容再尝试');
                }
            } else {
                if ($this.parents('.J_add_focus_wrap').length) {
                    // 添加关注浮层的出错提醒
                    addFocusPop(resp.error_msg);
                } else {
                    focusPop(resp.error_msg);
                }
            }
        }
    };
}
function mouseEvent (text, $this) {
    if ($this.prop('tagName') !== 'INPUT') {
        // 那些非checkbox按钮
        if ($this.data('type') === 'user') {
            if ($this.attr('data-follow') === '2') {
                $this.html(text);
            }
        } else {
            if ($this.attr('data-follow') === '1') {
                $this.html(text);
            }
        }
    }
}
function clickUnlock () {
    $(document).on('click', '.J_user_focus', clickLock());
}
function clickLock () {
    return function (e) {
        e.preventDefault();
        // 阻止默认的点击选中事件,使是否选中由js和后端来判断
        $(document).off('click', '.J_user_focus');
        // 移除事件仍然需要禁止默认,直到ajax返回结果,即点击事件之后被锁定
        $(document).on('click', '.J_user_focus', function (e) { e.preventDefault(); });
        var $that = $(this);
        if ($that.prop('tagName') === 'INPUT') {
            var focusItem = ($that.parents('.focus-checkbox').parent().siblings('.J_user_focus').attr('data-follow') === '0') ? 0 : 1,
                otherOne = $that.parents('.focus-checkbox').siblings().find('input').prop('checked') ? 1 : 0;
            var checkBoxExtraction = function (data) {
                ajaxRequest({
                    follow: focusItem,
                    is_goodarticle: data.focusArticle,
                    is_goodprice: data.focusPrice
                }, ajaxCallback(data.text, data.status), $that);
            };
            // 多选框点击
            if ($that.prop('checked')) {
                // 此时应该是刚刚选中的状态,则无需判断另一个多选框是否选中
                if ($that.data('to') === 'goodprice') {
                    // 如果是好价
                    checkBoxExtraction({
                        focusPrice: 1,
                        focusArticle: otherOne,
                        text: '相关物品的好价已经关注!',
                        status: 1
                    });
                } else if ($that.data('to') === 'goodarticle') {
                    // 如果是好文
                    checkBoxExtraction({
                        focusPrice: otherOne,
                        focusArticle: 1,
                        text: '相关物品的好文已经关注!',
                        status: 1
                    });
                }
            } else {
                // 此时为取消选中的状态,需要判断另一个是否选中
                if (!$that.parents('.focus-checkbox').siblings().find('input').prop('checked')) {
                    // 若另一个多选框已经选中,则无需处理,若未选中,则警告好文好价至少选择一个
                    focusPop('请至少关注一项');
                    clickUnlock();
                } else {
                    // 此时另一个是选中状态,因此需要取消当前选择
                    if ($that.data('to') === 'goodprice') {
                        checkBoxExtraction({
                            focusPrice: 0,
                            focusArticle: 1,
                            text: '相关物品的好价已经取消关注!',
                            status: 0
                        });
                    } else if ($that.data('to') === 'goodarticle') {
                        checkBoxExtraction({
                            focusPrice: 1,
                            focusArticle: 0,
                            text: '相关物品的好文已经取消关注!',
                            status: 0
                        });
                    }
                }
            }
        } else {
            var text, afterClickFollow;
            if ($that.data('type') === 'user') {
                // 关注用户的follow比商品的多了一个状态,是否已经关注 0:自己，1未关注, 2已关注。不考虑为0关注自己的情况,因为已经被另一个接口隐藏了
                afterClickFollow = $that.attr('data-follow') === '1' ? 1 : ($that.attr('data-follow') === '2' ? 0 : 1);
                text = afterClickFollow === 0 ? '<i class="icon-plus-o-thin"></i>关注' : '取消关注';
                ajaxRequest({
                    follow: afterClickFollow
                }, ajaxCallback(text, afterClickFollow === 0 ? 1 : 2), $that);
            } else {
                // 关注商品
                afterClickFollow = parseInt($that.attr('data-follow')) === 1 ? 0 : 1;
                if ($that.hasClass('focus-lvyou')) {
                    text = afterClickFollow === 0 ? '<i class="icon-plus-o-thin"></i><span>关注旅游</span>' : '取消关注';
                } else {
                    text = afterClickFollow === 0 ? '<i class="icon-plus-o-thin"></i>关注' : '取消关注';
                }
                ajaxRequest({
                    follow: afterClickFollow
                }, ajaxCallback(text, afterClickFollow), $that);
            }
        }
    };
}
// 开始逻辑
$(document).on('mouseenter', '.J_user_focus', function () {
    mouseEvent('取消关注', $(this));
});
$(document).on('mouseleave', '.J_user_focus', function () {
    mouseEvent('已关注', $(this));
});
$(document).on('click', '.J_user_focus', clickLock());
