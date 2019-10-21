removeOldClicks();

// 防广告屏蔽插件
$(document).on('click', 'a[isconvert]', function (e) {
    var $self = $(this);

    if (!(typeof (CanRunAds) !== 'undefined' && CanRunAds === true)) { // 被屏蔽广告
        var isconvert = $self.attr('isconvert');
        var dataUrl = $self.attr('data-url');

        if (isconvert === '1' && dataUrl.length > 0) { // 并且是淘宝链接
            $self.attr('href', dataUrl);
        }
        $self.removeAttr('data-url');
    }
});

function removeOldClicks (selector) {
    var $convertLinks = selector ? $(selector).find('a[isconvert]') : $('a[isconvert]');
    // 删掉旧的广告屏蔽代码
    $convertLinks.each(function (index, el) {
        var fnName = $(el).attr('onclick');

        if (fnName && fnName.match(/change_direct_url/)) {
            $(el).removeAttr('onclick');
        }
    });
}

module.exports = {
    removeOldClicks: removeOldClicks
};
