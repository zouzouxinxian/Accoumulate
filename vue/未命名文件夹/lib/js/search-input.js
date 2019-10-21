var utils = require('./utilities');
var HISTROY_NAME = 's_his';
var DOMAIN = '.smzdm.com'; // 上线后需要替成线上域名

$(function () {
    var $inputSearch = $('#J_search_input');
    var $form = $inputSearch.closest('form');

    // 点击提交默认搜索词
    $('#search-form, #sub-search-form').on('submit', function (e) {
        var keywords = $('input[name="default_keywords"]').val();
        var searchField = $inputSearch.attr('name');
        var inputVal = $.trim($inputSearch.val());
        if (inputVal.length > 0) {
            saveHistory(inputVal);
            return true;
        }
        e.preventDefault();
        if ($.trim(keywords).length === 0) return false;
        var paramsArr = $(this).serializeArray();
        var params = '';
        $.each(paramsArr, function (index, obj) {
            var and = index === 0 ? '' : '&';
            if (obj.name === searchField) {
                obj.value = keywords;
            }
            params += (and + obj.name + '=' + obj.value);
        });
        window.location = $(this).get(0).action + '?' + params;
    });

    // 显示搜索历史
    $inputSearch.attr('autocomplete', 'off');
    $inputSearch.focus(function (e) {
        var searchHistory = utils.getCookie(HISTROY_NAME);

        if ($inputSearch.val().length || !searchHistory) return;

        showHistory();
    }).keyup(function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();
        }
    }).keydown(function (e) {
        if (!$form.hasClass('show-history')) return;

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();
        } else if (e.keyCode === 13) {
            // 统计搜索历史Enter按键搜索
            e.preventDefault();
            if ($inputSearch.val().length) {
                sendGA($inputSearch.val());
            }
        }
    }).bind('input propertychange', function () { // ie 8,9 需要propertychange
        if ($inputSearch.val().length) {
            hideHistory();
            showComplete($inputSearch.val());
        } else {
            showHistory();
        }
    });

    // 方向键控制历史搜索记录
    $(document).keyup(function (e) {
        var $sHistory = $form.find('.s-history');
        var keyCodeList = [13, 37, 38, 39, 40];

        if (!$sHistory.length || $sHistory.is(':hidden') || $.inArray(e.keyCode, keyCodeList) === -1) {
            return true;
        }

        e.preventDefault();
        e.stopPropagation();

        var $hisList = $sHistory.find('.s-history-list');
        var $initFocus = $hisList.find('li.focus');

        switch (e.keyCode) {
        case 13: // 回车
            $form.append('<input type="hidden" name="source" value="his">');
            $form.trigger('submit');
            break;
        case 37: // 向左，隐藏历史记录
            hideHistory();
            break;

        case 38: // 向上，从最后一个开始选择历史记录
            if ($initFocus.length) {
                selectItem($hisList.find('li.focus').index() - 1);
            } else {
                selectItem($hisList.find('li').length - 1);
            }
            break;

        case 39: // 向右，提交搜索
            if ($form.hasClass('show-history') && $inputSearch.val().length) {
                sendGA($inputSearch.val());
                $form.append('<input type="hidden" name="source" value="his">');
                $form.trigger('submit');
            }

            break;

        case 40: // 向下，从第一个开始选择历史纪录
            if ($initFocus.length) {
                selectItem($hisList.find('li.focus').index() + 1);
            } else {
                selectItem(0);
            }
            break;
        }

        function selectItem (index) {
            var $list = $sHistory.find('.s-history-list');
            var $current = $list.find('li.focus');
            var lastIndex = $list.children().length - 1;

            index = index < 0 ? lastIndex : (index > lastIndex) ? 0 : index;

            $current.removeClass('focus');
            var val = decodeURIComponent($list.children().eq(index).addClass('focus').attr('data-val'));
            $inputSearch.val(val);
        }
    });

    // 保存历史记录
    function saveHistory (input) {
        // 记录用户搜索历史
        var oldHistory = utils.getCookie(HISTROY_NAME);

        if (oldHistory) {
            var oldArr = oldHistory.split(',');
            var exitIndex = utils.inArray(input, oldArr);

            // 去掉已经存在的记录
            if (exitIndex > -1) {
                oldArr.splice(exitIndex, 1);
            }

            // 去掉最老的记录
            if (oldArr.length >= 10) {
                oldArr.splice(0, 1);
            }

            utils.setCookie(HISTROY_NAME, oldArr.join(','), {
                domain: DOMAIN
            });
        }

        utils.setCookieInArr(HISTROY_NAME, input, {
            domain: DOMAIN
        });
    }

    // 初始化搜索历史下拉列表
    function initHistory (sArr) {
        var $sHistory = createDom(sArr);
        $sHistory.css('top', $inputSearch.parent().outerHeight());
        $form.addClass('show-history').append($sHistory);

        $(document).bind('click', function (e) {
            hideHistory();
        });

        $form.on('click', function (e) {
            e.stopPropagation();
        });

        // 清除搜索历史
        $sHistory.on('click', '.s-history-head>a', function (e) {
            utils.deleteCookie(HISTROY_NAME); // 删除次级域下的cookie(2016.9.30之后可以去掉)
            utils.deleteCookie(HISTROY_NAME, {domain: DOMAIN});

            hideHistory();
            $sHistory.remove();
        });

        // 删除单个历史记录
        $sHistory.on('click', 'li>.J_his_remove', function (e) {
            var $li = $(this).parent('li');
            var val = decodeURIComponent($li.attr('data-val'));

            e.preventDefault();
            e.stopPropagation();

            utils.deleteCookie(HISTROY_NAME); // 删除次级域名下的cookie(2016.9.30之后可以去掉)
            utils.deleteCookieInArr(HISTROY_NAME, val, {domain: DOMAIN});
            $li.remove();
        });

        // 点击进行搜索
        $sHistory.on('click', '.s-history-list>li>a', function (e) {
            var val = decodeURIComponent($(this).parent().attr('data-val'));

            $inputSearch.val(val);
            $form.append('<input type="hidden" name="source" value="his">');
            $form.trigger('submit');
        });
    }

    // 创建搜索历史下拉列表
    function createDom (keywordsArr) {
        var gaClear = {
            event: '站内搜索_历史搜索_清空'
        };
        var $listWrap = $('<div>', {'class': 's-history'});
        var $listHead = $(['<div class="s-history-head">',
            '<span class="z-text-lightgray">最近搜过</span><a href="javascript:;" onclick=\'dataLayer.push(' + JSON.stringify(gaClear) + ');\'>清空</a>',
            '</div>'].join(''));

        var $list = createListDom(keywordsArr);

        return $listWrap.append($listHead).append($list);
    }

    function createListDom (keywordsArr) {
        // var liHtml = $('<ul/>');
        var $list = $('<ul>', {'class': 's-history-list'});

        $.each(keywordsArr, function (index, keyword) {
            var gaLi = {
                event: '站内搜索_历史搜索_点击',
                '搜索字词': keyword
            };

            var gaRemove = {
                event: '站内搜索_历史搜索_删除',
                '搜索字词': keyword
            };

            var textShow = keyword;

            // 超过20个字符截取
            if (keyword.length > 20) {
                textShow = keyword.substr(0, 20) + '...';
            }

            var $li = $('<li/>').attr('data-val', encodeURIComponent(keyword));

            $li.append($('<a/>', {
                'href': 'javascript:;',
                'onclick': 'dataLayer.push(' + JSON.stringify(gaLi) + ')'
            }).text(textShow)).append($('<span/>', {
                'class': 'J_his_remove',
                'onclick': 'dataLayer.push(' + JSON.stringify(gaRemove) + ')'
            }).html('&times;'));

            $list.prepend($li);
        });

        return $list;
    }

    function showHistory () {
        var searchHistory = utils.getCookie(HISTROY_NAME);
        var $sHistory = $form.find('.s-history');

        if (!searchHistory || searchHistory.length === 0) return;

        var searchArr = searchHistory.split(',');

        $form.addClass('show-history');

        if ($sHistory.length) {
            updateHistory(searchArr);
            $sHistory.show();
        } else {
            initHistory(searchArr);
        }
    }

    function showComplete (searchStr) {

    }

    function hideHistory () {
        var $sHistory = $form.find('.s-history');
        $form.removeClass('show-history');

        if ($sHistory.length) {
            $sHistory.hide();
            $sHistory.find('.s-history-list>li.focus').removeClass('focus');
        }
    }

    // 更新搜索历史记录
    function updateHistory (keywordsArr) {
        var $list = createListDom(keywordsArr);

        $form.find('.s-history .s-history-list').replaceWith($list);
    }

    // 点击搜索历史发送ga
    function sendGA (keyword) {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: '站内搜索_历史搜索_点击',
                '搜索字词': keyword
            });
        }
    }
});
