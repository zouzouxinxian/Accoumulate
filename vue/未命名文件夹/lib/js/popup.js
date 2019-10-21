var mustache = require('mustache');
/**
 * 弹窗组件构造函数
 * 本插件需要用到样式文件 css/zdm_ui/partial/popup.scss
 *
 * @param $content { Instance of jQuery } 弹窗中的内容
 * @param options { Object } 配置项
                    - closeBtn { String } default: null, 关闭弹窗的按钮的选择器，值为false表示不显示关闭按钮
                    - clickBgClose { Boolean } default: true, 是否点击背景关闭弹窗，默认true
                    - useTemplate { Boolean } default: false, 是否使用mustache模板，可实时更新弹窗内容的DOM结构
                    - autoCenter { Boolean } default: true, 是否自动垂直居中
                    - preventScroll { Boolean } default: true, 是否在弹窗打开时阻止页面滚动
                    - beforeShow { Function } default: $.noop, 弹窗显示之前执行的函数，参数为 .show() 方法传入的参数
                    - afterShow { Function } default: $.noop, 弹窗显示之后执行的函数，参数为 .show() 方法传入的参数
                    - beforeClose { Function } default: $.noop, 弹窗关闭之前执行的函数
                    - afterClose { Function } default: $.noop, 弹窗关闭之后执行的函数
                    - id { String } default: null, 弹窗的ID，弹窗打开时地址栏会显示hash值，用浏览器回退按钮可关闭弹窗
                    - zIndex { Number } default: 9999, 弹窗的层级

 * @return {Instance} 返回实例化对象，以下为实例化对象提供的方法
                    .show(data) 显示弹窗
                        data { Object } 参数为任意数据，当 useTemplate 为 true 时，data用来渲染模板

                    .hide() 隐藏弹窗
                    .update(data) 更新数据并更新DOM结构
                    .updateConfig(config) 更新初始化时的配置项
                    .isOpen() 检查弹窗是否打开，返回true或者false
 */
function Popup ($content, options) {
    var self = this;

    // 默认配置项
    self.defaults = {
        closeBtn: null,
        clickBgClose: true,
        useTemplate: false,
        data: {}, // 模板初始化数据
        autoCenter: true,
        preventScroll: true,
        fade: false, // 渐隐渐显效果
        fadeDuration: 300, // 渐隐渐显动画时长
        beforeShow: $.noop,
        afterShow: $.noop,
        beforeClose: $.noop,
        afterClose: $.noop,
        id: null,
        zIndex: 9999 // 弹窗的层级
    };

    self.$content = $content;
    self.options = $.extend(true, self.defaults, options);
    self.template = self.$content.get(0).outerHTML;

    self._init();
}

Popup.prototype._init = function () {
    this._createDom();
    this._setDom();
    this._setEvents();
};

Popup.prototype._createDom = function () {
    this.$wrap = $('<div class="popup-wrap">').css('display', 'none');
    this.$contentBox = $('<div class="popup-content">');
    this.closeBtnName = 'popup-close';
    this.$btnClose = $('<a href="javascript:;" class="z-icons icon-times-o"></a>').addClass(this.closeBtnName);
    this.$bg = $('<div class="popup-bg" >');

    if (this.options.clickBgClose) {
        this.$wrap.append(this.$bg);
    }

    if (this.options.fade) {
        this.$wrap.css('transition', 'opacity ' + this.options.fadeDuration + 'ms');
    }

    this.$contentBox.append(this.$content.show());
    this.$wrap.append(this.$contentBox);

    if (this.options.closeBtn) {
        this.closeBtnName = this.options.closeBtn;
    } else {
        if (this.options.closeBtn !== false) {
            this.$wrap.append(this.$btnClose);
            this.closeBtnName = '.' + this.closeBtnName;
        }
    }

    if (this.options.useTemplate) {
        this._setData(this.options.data);
    }
};

Popup.prototype._setDom = function () {
    $('body').append(this.$wrap);
};

Popup.prototype._setEvents = function () {
    var self = this;
    this.$wrap.on('click', this.closeBtnName, onClose);

    this.$bg.bind('click', onClose);

    if (this.options.id) {
        $(window).on('hashchange', function (e) {
            if (window.location.hash.substr(1) === self.options.id) {
                self.show();
            } else {
                self.hide();
            }
        });
    }

    function onClose (e) {
        e.preventDefault();

        if (self.options.id && window.location.hash.substr(1) === self.options.id && window.history.length > 1) {
            window.history.go(-1);
        } else {
            self.hide();
        }
    }
};

Popup.prototype._setData = function (data) {
    var html = mustache.render(this.template, data);

    this.$content.remove();
    this.$content = $(html).show();
};

Popup.prototype.show = function (data) {
    var self = this;

    if (self.isOpen()) return;

    if (self.options.useTemplate && data) {
        self.update(data);
    }

    if (self.options.id) {
        window.location.hash = self.options.id;
    }

    if (self.options.preventScroll) {
        $(document.body).css({
            'overflow': 'hidden'
        });
    }

    if (typeof self.options.zIndex === 'number' && !isNaN(self.options.zIndex)) {
        self.$wrap.css('z-index', self.options.zIndex);
    }

    self.$wrap.css('opacity', 0).show();

    if (self.options.beforeShow.call(self, data) === false) {
        self.$wrap.css('opacity', '');
        self.hide();
        return;
    }

    setTimeout(function () {
        var windowH = $(window).height();
        var contentH = self.$content.outerHeight();
        var contentW = self.$content.outerWidth();
        if (self.options.autoCenter) {
            if (contentH < windowH) {
                self.$contentBox.css({
                    'position': 'relative',
                    'top': (windowH - contentH) / 2,
                    'width': contentW
                });
            } else {
                self.$contentBox.css({
                    'position': 'relative',
                    'top': 0,
                    'width': contentW
                });
            }
        } else {
            self.$contentBox.css({
                'position': '',
                'top': '',
                'width': ''
            });
        }

        self.$wrap.css('opacity', '');

        self.options.afterShow.call(self, data);
    }, 0);
};

Popup.prototype.hide = function () {
    var self = this;

    if (!self.isOpen()) return;

    if (self.options.preventScroll) {
        $(document.body).css({
            'overflow': ''
        });
    }

    if (self.options.beforeClose.call(self) === false) return;

    var duration = self.options.fade ? self.options.fadeDuration : 0;
    self.$wrap.css('opacity', 0);
    setTimeout(function () {
        self.$wrap.hide(0, function () {
            self.options.afterClose.call(self);
        });
    }, duration);
};

Popup.prototype.update = function (data) {
    this._setData(data);
    this.$contentBox.empty().append(this.$content);
};

Popup.prototype.updateConfig = function (config) {
    this.options = $.extend(true, this.options, config);
};

Popup.prototype.isOpen = function () {
    return this.$wrap.is(':visible');
};

module.exports = {
    create: function ($content, options) {
        return new Popup($content, options);
    },
    alert: function (text, callback, options) {
        var $alertPop = $('.J_pop_alert');
        var tpl = ['<div class="brand-modal modal-tip modal-alert">',
            '<div class="modal-content">',
            '{{text}}',
            '<div class="modal-btns"><a href="javascript:;" class="btn-black modal-btn-confirm">{{btnConfirm}}</a></div>',
            '</div>',
            '</div>'].join('');
        var popup;
        var defaultConfig = {
            text: text,
            btnConfirm: '确定'
        };
        var showData = $.extend(true, defaultConfig, options);
        var onClose = (typeof callback === 'function') ? callback : $.noop;

        if ($alertPop.length) {
            popup = $alertPop.data('popup');
        } else {
            popup = new Popup($(tpl), {
                clickBgClose: false,
                useTemplate: true,
                closeBtn: false,
                beforeClose: callback
            });

            popup.$wrap.addClass('J_pop_alert')
                .data('popup', popup)
                .on('click', '.modal-btn-confirm', function (e) {
                    e.preventDefault();
                    popup.hide();
                });
        }

        popup.updateConfig({
            beforeClose: onClose
        });
        popup.show(showData);
    }
};
