// 频道号与后台编辑链接的对应关系
var YOUHUI_EDIT_URL = 'http://youhui.bgm.smzdm.com/edit_youhui/'; // 优惠编辑链接
var EDIT_URLS = {
    CHANNEL_1: YOUHUI_EDIT_URL,
    CHANNEL_2: YOUHUI_EDIT_URL,
    CHANNEL_3: YOUHUI_EDIT_URL,
    CHANNEL_5: YOUHUI_EDIT_URL,
    CHANNEL_6: 'https://article-bgm.smzdm.com/edit/',
    CHANNEL_7: 'http://bgm.smzdm.com/probation/probreport/detail/',
    CHANNEL_11: 'https://article-bgm.smzdm.com/edit/',
    CHANNEL_30: 'http://newbrand.bgm.smzdm.com/brand/edit_brand/?id=',
    CHANNEL_55: YOUHUI_EDIT_URL,
    CHANNEL_66: 'https://article-bgm.smzdm.com/edit/'
};

/**
 * 设置编辑按钮
 *
 * @param {Object} listElems 含有articaleid的DOM元素的jQuery对象集合
 * @param {String} container 编辑按钮的容器选择器，按钮元素会被append到$(container)里面
 */

function setEdits (listElems, container) {
    $.each(listElems, function (index, el) {
        if (!$(el).attr('articleid')) {
            return;
        }
        var $item = $(el);
        var numbers = $item.attr('articleid').split('_');
        var urlPrefix = EDIT_URLS['CHANNEL_' + numbers[0]];
        var $btn;
        if (urlPrefix) {
            $btn = $('<a/>', {'class': 'z-bgm-edit'}).text('编辑').attr({
                'href': (urlPrefix + numbers[1]),
                'target': '_blank',
                'style': 'font-size: 14px;'
            });
            $item.find(container).append($btn);
        }
    });
}

module.exports = {
    setEdits: setEdits
};
