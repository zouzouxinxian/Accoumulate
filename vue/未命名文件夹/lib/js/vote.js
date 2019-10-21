var Mustache = require('mustache');
var pop = require('./popup.js');
$(function () {
    var vote = {
        htmlTemplate: '<div class="vote-wrapper">' +
        '        {{#form_name}}' +
        '            <div class="vote-info {{#is_death_date}}vote-timeover{{/is_death_date}}">' +
        '                投票{{^is_show_before}}' +
        '                {{#form_name.is_death_date}}已结束{{/form_name.is_death_date}} {{#form_name.form_vote_num}}<span class="vote-status">' +
        '                {{#showResult}}共有{{/showResult}}' +
        '                {{^showResult}}已有{{/showResult}}' +
        '                <span class="red">{{form_name.form_vote_num}}</span>人投票</span>{{/form_name.form_vote_num}}' +
        '                {{/is_show_before}}{{^is_show_date}}{{#show_date}}' +
        '                <span class="time show_date">揭晓时间：{{show_date}}</span>{{/show_date}}{{/is_show_date}}' +
        '                <span class="time">截止时间： {{death_date}}</span>' +
        '            </div>' +
        '        {{/form_name}}' +
        '        <div class="vote-content {{#form_name.is_death_date}}vote-timeover{{/form_name.is_death_date}}">' +
        '            <div class="vote-title">{{form_name.title}}</div>' +
        '            <ol>' +
        '            {{#form_type}}' +
        '                <li class="vote-qa">' +
        '                    <h3 class="vote-question"><span class="num">{{index}}.</span><span class="que-txt">{{name}}</span><span class="require">*</span></h3>' +
        '                    <ul class="vote-answer clearfix">' +
        '                        {{^form_name.showResult}}' +
        '                        {{#values}}' +
        '                        <li class="vote-item"><label><input type="{{types}}" name="{{id}}"><span class="icon {{types}}"></span><span class="J_value">{{.}}</span></label></li>' +
        '                        {{/values}}' +
        '                        {{/form_name.showResult}}' +
        '                        {{#form_name.showResult}}' +
        '                        {{#form_name.is_show_before}}' +
        '                        {{#vote_result_before}}' +
        '                        <li class="vote-item {{#hasSelected}} J_checked {{/hasSelected}}" ><label><span class="icon {{types}}"></span><span class="J_value">{{field}}</span></label></li>' +
        '                        {{/vote_result_before}}' +
        '                        {{/form_name.is_show_before}}' +
        '                        {{^form_name.is_show_before}}' +
        '                        {{#vote_result}}' +
        '                        <li class="vote-item vote-finish {{#hasSelected}}J_vote_selected{{/hasSelected}}">' +
        '                            <label>{{field}}</label>' +
        '                            <div class="vote-result z-clearfix">' +
        '                                <div class="progress-bar">' +
        '                                   <div class="inner" style="width:{{percent}}%"></div>' +
        '                                </div> ' +
        '                                <span class="votes-percent">{{percent}}%</span>' +
        '                                <span class="votes-count">{{counts}}票</span>' +
        '                            </div>' +
        '                        </li>' +
        '                        {{/vote_result}}' +
        '                        {{/form_name.is_show_before}}' +
        '                        {{/form_name.showResult}}' +
        '                    </ul> ' +
        '                    {{^form_name.showResult}}' +
        '                    {{#checkArr}} ' +
        '                    <div class="error red" data-needCheck="{{needCheck}}" data-ansLen="{{ansLen}}" data-condition="{{condition}}">{{errMsg}}</div>' +
        '                    {{/checkArr}} ' +
        '                    {{/form_name.showResult}}' +
        '                </li>' +
        '            {{/form_type}}' +
        '            </ol>' +
        '            {{#form_name.showResult}}' +
        '            {{^form_name.is_death_date}}' +
        '            <button class="vote-btn voted-btn" type="button">您已投票</button>' +
        '            {{/form_name.is_death_date}}' +
        '            {{/form_name.showResult}} ' +
        '            {{^form_name.showResult}}' +
        '            {{^form_name.is_death_date}}' +
        '            <button class="vote-btn" type="button">投票</button>' +
        '            {{/form_name.is_death_date}}' +
        '            {{/form_name.showResult}}' +
        '            {{#form_name.is_death_date}}' +
        '               {{#form_name.is_show_before}}' +
        '               <button class="vote-button" type="button">投票</button>' +
        '               {{/form_name.is_show_before}}' +
        '            {{/form_name.is_death_date}}' +
        '        </div>' +
        '   </div>',
        ajaxUrl: {
            status: '//tools.smzdm.com/vote/biaodan_vote/index',
            userLogin: '//zhiyou.smzdm.com/user/info/jsonp_get_current',
            submitForm: '//tools.smzdm.com/vote/biaodan_vote/submit?callback="1"'
        },
        init: function () {
            var $voteEl = $('.smzdm-vote');
            var biaodanId;
            var $voteWrapper;
            var _this = this;
            if ($voteEl.length) {
                // 防止PHP把js资源引用错乱，导致页面功能出现问题 所以把domain移到这里
                document.domain = 'smzdm.com';
                // 新的cms文章 一篇可能有多个投票
                $.each($voteEl, function (item, index) {
                    biaodanId = $(this).attr('data-voteid');
                    $voteWrapper = $(this);
                    _this.getData(biaodanId, $voteWrapper);
                });
            } else {
                // 防止PHP把js资源引用错乱，导致页面功能出现问题 所以把domain移到这里
                document.domain = 'smzdm.com';
                $voteEl = $('#J_vote_form');
                if ($voteEl.length > 0 && $voteEl.val() !== '0') {
                // 历史文章和好价的情况
                    biaodanId = $voteEl.val();
                    $voteWrapper = $('<div class="smzdm-vote" data-voteid="' + biaodanId + '"></vote>');
                    $voteWrapper.appendTo($('.left-wrap article'));
                    _this.getData(biaodanId, $voteWrapper);
                } else {
                // 文章上没有投票模块
                    return '';
                }
            }
            _this.clickEvent();

            Mustache.escape = function (str) {
                return str;
            };
            Mustache.parse(_this.htmlTemplate);
        },
        clickEvent: function () {
            var _this = this;
            /* 表单验证相关 */
            $(document).on('click', '.vote-content input', function () {
                var hasSelectAll = false;// 全选开关
                var $voteWrapper = $(this).parents('.smzdm-vote');
                var $voteBtn = $voteWrapper.find('.vote-btn');
                // if ($voteBtn.hasClass('voted-btn')) return;
                var $voteAnswer = $voteWrapper.find('.vote-answer');
                if ($(this).attr('type') === 'radio') {
                    var name = $(this).prop('name');
                    $("input[name='" + name + "']").removeClass('J_selected');
                    $(this).addClass('J_selected');
                } else {
                    $(this).toggleClass('J_selected');
                }
                hasSelectAll = true;
                $.each($voteAnswer, function (index, item) {
                    var $els = $(this).find('.J_selected');
                    if ($els.length === 0) {
                        hasSelectAll = false;
                    }
                });
                // 控制投票按钮的样式
                if (hasSelectAll) {
                    $voteBtn.addClass('vote-able');
                } else {
                    $voteBtn.removeClass('vote-able');
                }
            });
            /* 点击投票按钮 */
            $(document).on('click', '.vote-able', function () {
                var $voteWrapper = $(this).parents('.smzdm-vote');
                var biaodanId = $voteWrapper.attr('data-voteid');
                $.ajax({
                    url: _this.ajaxUrl.userLogin,
                    type: 'post',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (resp) {
                        if (resp.smzdm_id === 0) {
                            // 触发登录
                            $('.J_login_trigger').trigger('click');
                        } else {
                            // 已经登录，进行表单校验处理
                            _this.checkVoteForm(biaodanId, $voteWrapper);
                        }
                    },
                    error: function (resp) {
                        alert('网络出错，请稍后再试');
                    }
                });
            });
        },
        getData: function (biaodanId, $voteWrapper) {
            var _this = this;
            console.log(biaodanId);
            $.ajax({
                url: _this.ajaxUrl.status,
                type: 'get',
                dataType: 'jsonp',
                data: {biaodan_id: biaodanId},
                jsonp: 'callback',
                success: function (res) {
                    if (res.error_code === 0) {
                        var ajaxData = res.data;
                        var htmlStr;
                        var formType = ajaxData.form_type;
                        var formName = ajaxData.form_name;
                        // 用于揭晓日期之前的展示
                        var isShowBefore;
                        if (formName.show_time_style === 2 && !formName.is_show_date) {
                            formName.is_show_before = true;
                            isShowBefore = true;
                        } else {
                            formName.is_show_before = false;
                            isShowBefore = false;
                        }
                        if (formType.length > 0) {
                            $.each(formType, function (index, item) {
                                var voteResult = item.vote_result;// 投票结果
                                var totalCount = item.all_counts;// 投票总数
                                var myVote = item.my_vote;
                                var remain = 100;
                                var errMsg;
                                var checkArr;
                                item.index = index + 1;
                                item.values = item.values.split(',');
                                // form_name.form_vote_num = !!form_name.form_vote_num ? form_name.form_vote_num : 0;
                                // 处理投票问题显示，需加上单选多选
                                if (item.types === 'checkbox') {
                                    item.name += '（多选）';
                                } else if (item.types === 'radio') {
                                    item.name += '（单选）';
                                }
                                // 处理投票结果的百分比值
                                if (voteResult.length > 0) {
                                    voteResult = item.vote_result;
                                    $.each(voteResult, function (idex, items) {
                                        // 检测投票总数是否大于0
                                        if (totalCount > 0) {
                                            if (idex > 0) {
                                                items.percent = Math.round(items.counts * 100 / totalCount);
                                                remain -= items.percent;
                                            }
                                        } else {
                                            items.percent = 0;
                                        }
                                        items.hasSelected = false;
                                        // 处理个人已选投票的显示
                                        if (myVote.length > 0) {
                                            $.each(myVote, function (a, b) {
                                                if (b === items.field) {
                                                    items.hasSelected = true;
                                                }
                                            });
                                        }
                                    });
                                    // 检测投票总数是否大于0 对第一项的处理
                                    if (totalCount > 0) {
                                        voteResult[0].percent = remain;
                                    } else {
                                        voteResult[0].percent = 0;
                                    }
                                }
                                // 处理 定时投票 揭晓之前的，结果展示
                                if (isShowBefore) {
                                    var _values = item.values;
                                    var voteResultBefore = [];
                                    $.each(_values, function (idex, items) {
                                        var _obj = {
                                            field: items,
                                            hasSelected: false
                                        };
                                        if (myVote.length > 0) {
                                            $.each(myVote, function (a, b) {
                                                if (b === _obj.field) {
                                                    _obj.hasSelected = true;
                                                }
                                            });
                                        }
                                        voteResultBefore.push(_obj);
                                    });
                                    item.vote_result_before = voteResultBefore;
                                }
                                // 处理验证值
                                item.write_field_num_symbol = Number(item.write_field_num_symbol);
                                item.write_field_num = Number(item.write_field_num);
                                switch (item.write_field_num_symbol) {
                                case 1:
                                    errMsg = '此选项必须填写大于' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 1
                                    };
                                    break;
                                case 2:
                                    errMsg = '此选项必须填写大于等于' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 2
                                    };
                                    break;
                                case 3:
                                    errMsg = '此选项必须填写' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 3
                                    };
                                    break;
                                case 4:
                                    errMsg = '此选项必须填写小于' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 4
                                    };
                                    break;
                                case 5:
                                    errMsg = '此选项必须填写小于等于' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 5
                                    };
                                    break;
                                case 6:
                                    errMsg = '此选项必须填写不能等于' + item.write_field_num + '项';
                                    checkArr = {
                                        needCheck: true,
                                        ansLen: item.write_field_num,
                                        errMsg: errMsg,
                                        condition: 6
                                    };
                                    break;
                                default:
                                    checkArr = {
                                        needCheck: false
                                    };
                                }
                                item.checkArr = checkArr;
                            });
                            // 处理显示哪种结构的逻辑 显示问题的情况
                            if (formType[0].my_vote.length === 0 && !formName.is_death_date) {
                                formName.showResult = false;
                            } else {
                                formName.showResult = true;
                            }
                            console.log('ajaxData', ajaxData);
                            htmlStr = Mustache.render(_this.htmlTemplate, ajaxData);
                            $voteWrapper.html('');
                            $voteWrapper.append(htmlStr);
                        }
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });
        },
        loadRefresh: function (_this, biaodanId, $voteWrapper, json) {
            var errorMsg = json.error_msg;
            switch (json.error_code) {
            case 0:
                // 请求下一个接口
                _this.getData(biaodanId, $voteWrapper);
                pop.popUp('', '#pop-status-success', '投票成功，感谢您的参与');
                break;
            case 1:
            case 2:
            case 3:
                _this.getData(biaodanId, $voteWrapper);
                pop.popUp('', '#pop-status-fail', errorMsg);
                // 请求下一个接口
                break;
            case 4:
            case 5:
                pop.popUp('', '#pop-status-fail', errorMsg);
                break;
            case 6:
                // 触发登录
                $('.J_login_trigger').trigger('click');
                break;
            }
        },
        crossDominPost: function (url, data, fn, biaodanId, $voteWrapper) {
            // 创建表单以及需要提交的数据
            var _this = this;
            var form = document.createElement('form');
            var inputBiaodan = document.createElement('input');
            form.id = form.name = 'postForm';
            inputBiaodan.type = 'hidden';
            inputBiaodan.name = 'biaodan_id';
            inputBiaodan.value = data.biaodan_id;
            form.appendChild(inputBiaodan);
            $.each(data.field, function (index, item) {
                $.each(item, function (key, value) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'field[' + index + ']' + key;
                    input.value = value;
                    form.appendChild(input);
                });
            });
            // 创建iframe
            var iframe = document.createElement('iframe');
            iframe.setAttribute('name', 'postIFrame');
            iframe.id = 'postIFrame';
            iframe.width = 1;
            iframe.height = 1;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            document.body.appendChild(form);
            form.action = url;
            form.target = iframe.name;
            form.method = 'post';
            form.submit();
            // 给iframe的load事件绑定处理函数
            if (iframe.attachEvent) {
                // ie的兼容性写法
                iframe.attachEvent('onload', _loadFn);
            } else {
                iframe.onload = _loadFn;
            }
            // 记录iframe的加载状态
            iframe.state = 0;
            function _loadFn () {
                if (iframe.state === 1) {
                    // var data = '';
                    // //获取window.name保存的数据
                    // try{
                    //     data = iframe.contentWindow.name;
                    //     console.log(iframe.contentWindow);
                    //     console.log('12' + data);
                    // }catch(e){
                    //     console.log(e);
                    // }
                    // var json = data;
                    // try {
                    //     json = JSON.parse(data);
                    // } catch(e){}
                    // 相当于ajax里边的success
                    // _callback(json);
                    // iframe清除
                    iframe.onload = null;
                    document.body.removeChild(iframe);
                } else if (iframe.state === 0) {
                    // form提交完成之后，将location置为同域
                    iframe.state = 1;
                    var data = '';
                    // 获取window.name保存的数据
                    try {
                        data = iframe.contentWindow.name;
                        console.log(iframe.contentWindow);
                        console.log('12' + data);
                    } catch (e) {
                        console.log(e);
                    }
                    var json = data;
                    try {
                        json = JSON.parse(data);
                    } catch (e) {}
                    // 相当于ajax里边的success
                    console.log('数据已经提交，开始走回调');
                    _callback(json);
                    // proxy.html只是一个源域里的一个空白页面，
                    // 如果不考虑IE，也可以这样：iframe.contentWindow.location = "about:blank";
                    // iframe.contentWindow.location = "//post.smzdm.com/";
                    console.log(iframe.contentWindow.name);
                    iframe.contentWindow.location = 'about:blank';
                }
            }
            function _callback (json) {
                if (fn && typeof fn === 'function') {
                    console.log('走到这里了', _this);
                    fn(_this, biaodanId, $voteWrapper, json);
                }
            }
            return false;
        },
        checkVoteForm: function (biaodanId, $voteWrapper) {
            var _this = this;
            var selectedArr = [];
            var checkPass = true;
            var ajaxData = {};
            var $voteQa = $voteWrapper.find('.vote-qa');
            $voteQa.each(function (index, item) {
                var $selectedElsLen;
                var selectedObj = {};
                var fieldValue;
                var fieldId;
                var fieldType;
                var $errorTips = $(this).find('.error');
                var ansLen = Number($errorTips.attr('data-ansLen'));
                var condition = Number($errorTips.attr('data-condition'));
                var needCheck = $errorTips.attr('data-needcheck') === 'true';
                var showError = false;
                var $selectedEls = $(this).find('.J_selected');
                // 获取用户选择的值
                $selectedEls.each(function (index, item) {
                    fieldValue = $(this).siblings('.J_value').text();
                    fieldId = Number($(this).attr('name'));
                    selectedObj['[field_id]'] = fieldId;
                    fieldType = $(this).attr('type');
                    // 多选和单选的处理有区别
                    if (fieldType === 'checkbox') {
                        selectedObj['[field_value][' + index + ']'] = fieldValue;
                    } else {
                        selectedObj['[field_value]'] = fieldValue;
                    }
                });
                selectedArr.push(selectedObj);

                // 错误信息的显示处理
                if (needCheck) {
                    $selectedElsLen = $selectedEls.length;
                    if (condition) {
                        if ((condition === 1 && $selectedElsLen <= ansLen) ||
                            (condition === 2 && $selectedElsLen < ansLen) ||
                            (condition === 3 && $selectedElsLen !== ansLen) ||
                            (condition === 4 && $selectedElsLen >= ansLen) ||
                            (condition === 5 && $selectedElsLen > ansLen) ||
                            (condition === 6 && $selectedElsLen === ansLen)) {
                            checkPass = false;
                            showError = true;
                        }
                    }
                }
                if (showError) {
                    $errorTips.show();
                } else {
                    $errorTips.hide();
                }
            });
            ajaxData = {
                field: selectedArr,
                biaodan_id: biaodanId
            };
            // 如果表单通过，则提交表单
            if (checkPass) {
                _this.crossDominPost(_this.ajaxUrl.submitForm, ajaxData, _this.loadRefresh, biaodanId, $voteWrapper);
            }
        }
    };
    vote.init();
});
