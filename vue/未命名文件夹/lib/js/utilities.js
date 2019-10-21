// 工具类
module.exports = {
    /**
     * 设置直接键值对的cookie
     *
     * @param {String} name  名称
     * @param {String} value 值
     * @param {Object} others 其他配置项
               - seconds {Number} 默认值 604800 有效时间，以秒为单位
               - path    {String} 默认值 '/' 路径
               - domain  {String} 默认值 '' 起作用的域
               - secure  {Boolean} 默认值 false 是否只通过HTTPS传输
     *
     * @author Lin Chen
     */
    setCookie: function (name, value, others) {
        var defaults = {
            seconds: 604800,
            path: '/',
            domain: location.hostname, // 修复 ie domain 设置为空时静默失败的 bug
            secure: false
        };
        var props = ['expires', 'path', 'domain', 'secure'];

        var datas = this.extend(defaults, others, false);
        var cookieVal = '';
        var prop, propVal;
        datas.expires = new Date(new Date().getTime() + datas.seconds * 1000).toUTCString();
        cookieVal += encodeURIComponent(name) + '=' + encodeURIComponent(value);

        for (var i = 0, len = props.length; i < len; i++) {
            prop = props[i];
            propVal = datas[prop];

            if ((typeof propVal) !== 'undefined') {
                if (prop === 'secure') {
                    cookieVal += propVal ? ('; ' + prop) : '';
                } else {
                    cookieVal += '; ' + prop + '=' + propVal;
                }
            }
        }

        document.cookie = cookieVal;
    },
    /**
     * @for 设置/新增保存在以逗号分隔的的cookie的值,将cookie设置成数组的形式,类似于 name=value,value2;,一次只能写入一个
     * @param {String} name cookie的键
     * @param {String} value cookie的值
     * @param {Object} others 其他配置项
                - seconds {Number} 默认值 604800 有效时间，以秒为单位
                - path    {String} 默认值 '/' 路径
                - domain  {String} 默认值 '' 起作用的域
                - secure  {Boolean} 默认值 false 是否只通过HTTPS传输
     *
     * @author caoxudong
     * */
    setCookieInArr: function (name, value, others) {
        var that = this;
        var getCookieValue = that.getCookie(name);
        if (getCookieValue !== '') {
            var cookieArr = getCookieValue.split(',');
            if (this.inArray('' + value, cookieArr) === -1) {
                cookieArr.push(value);
                that.setCookie(name, cookieArr.join(','), others);
            }
        } else {
            that.setCookie(name, value, others);
        }
    },

    /**
     * 删除指定健名的Cookie
     *
     * @param {String} name cookie的键
     * @param {Object} others 其他选项配置项，域名等
     *
     * @author Lin Chen
     */
    deleteCookie: function (name, others) {
        var cookieVal = this.getCookie(name);

        var options = others || {};
        options.seconds = -1 * (new Date()).getTime() / 1000;

        this.setCookie(name, cookieVal, options);
    },
    /**
     * @for 删除保存在以逗号分隔的cookie的值,类似于 key={value:num,value:num2},一次只能写入一个,用于取消收藏
     * @param {String} name cookie的键
     * @param {String} value 将删除的cookie的值
     * @param {String} others 其他选项配置项，域名等
     * @author caoxudong
     * */
    deleteCookieInArr: function (name, value, others) {
        var that = this;
        var getCookieValue = that.getCookie(name);
        if (getCookieValue !== '') {
            var cookieArr = getCookieValue.split(',');
            if (this.inArray('' + value, cookieArr) !== -1) {
                cookieArr.splice(this.inArray('' + value, cookieArr), 1);
                that.setCookie(name, cookieArr.join(','), others);
            }
        }
    },
    /**
     * @for 设置/新增保存在对象中的cookie,将cookie设置成对象的形式,类似于 key={value:num,value:num2},一次只能写入一个
     * @param {String} name cookie的键
     * @param {String} value cookie的值
     * @param {String} num cookie的值的的类型,1为值,-1为不值(好物频道没有-1)
     * @param {Object} others 其他配置项
                 - seconds {Number} 默认值 604800 有效时间，以秒为单位
                 - path    {String} 默认值 '/' 路径
                 - domain  {String} 默认值 '' 起作用的域
                 - secure  {Boolean} 默认值 false 是否只通过HTTPS传输
     *
     * @author caoxudong
     * */
    setCookieInObj: function (name, value, num, others) {
        //
        var that = this,
            cookieObj = {};
        var getCookieValue = that.getCookie(name);
        if (getCookieValue !== '') {
            cookieObj = JSON.parse(getCookieValue);
            cookieObj[value] = num;
            that.setCookie(name, JSON.stringify(cookieObj), others);
        } else {
            cookieObj[value] = num;
            that.setCookie(name, JSON.stringify(cookieObj), others);
        }
    },
    /**
     * @for 删除保存在对象中的cookie的值,将cookie设置成对象的形式,类似于 key={value:num,value:num2},一次只能写入一个,暂时用不到
     * @param {String} name cookie的键
     * @param {String} value 将删除的cookie的值
     *
     * @author caoxudong
     * */
    deleteCookieInObj: function (name, value) {
        var that = this,
            cookieObj = {};
        var getCookieValue = that.getCookie(name);
        if (getCookieValue !== '') {
            cookieObj = JSON.parse(getCookieValue);
            delete cookieObj[value];
            that.setCookie(name, JSON.stringify(cookieObj));
        }
    },
    /**
     * 根据名称读取cookie
     *
     * @param  {String} name  名称
     * @return {String} 值
     *
     * @author Lin Chen
     */
    getCookie: function (name) {
        // var cookie = document.cookie;
        // var start = cookie.indexOf(name);
        // var end = cookie.indexOf(";", start);

        // if(start == -1){
        //     return '';
        // }else{
        //     start += name.length + 1;
        //     if(end < start){
        //         end = cookie.length;
        //     }
        //     return decodeURIComponent(cookie.substring(start, end));
        // }

        var cookieArr = document.cookie.split('; ');
        var len = cookieArr.length;
        var cookieNV;

        for (var i = 0; i < len; i++) {
            cookieNV = cookieArr[i].split('=');
            if (cookieNV[0] === name) {
                return decodeURIComponent(cookieNV[1]);
            }
        }

        return '';
    },

    /**
     * 合并对象，把第二个Object合并到第一个Object
     *
     * @param  {Object} targetObj  目标对象
     * @param  {Object} obj        其他对象
     * @param  {Boolean} deep      是否启用深度合并
     * @return {Object} 合并后的对象
     *
     * @author Lin Chen
     */
    extend: function (targetObj, obj, deep) {
        var target = targetObj;

        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                var val = obj[name];

                if (deep && typeof val === 'object' && !(val instanceof Node)) {
                    target[name] = this.extend(target[name], val, deep);
                } else {
                    target[name] = obj[name];
                }
            }
        }

        return target;
    },

    getEndDay: function () {
        var date = new Date(),
            end = date.getFullYear() + '/';
        end = end + (date.getMonth() + 1) + '/';
        end = end + date.getDate() + ' ';
        end = end + '23:59:59';
        return end;
    },

    getToday: function () {
        var date = new Date(),
            now = date.getFullYear() + '/';
        now = now + (date.getMonth() + 1) + '/';
        now = now + date.getDate() + ' ';
        now = now + date.getHours() + ':';
        now = now + date.getMinutes() + ':';
        now = now + date.getSeconds() + '';
        return now;
    },

    /**
     * 实现jQuery的 $.inArray() 功能
     *
     * @param {...} item 需要验证的单个元素
     * @param {Array} array 目标数组
     * @param {Number} fromIndex 需要验证的数组区域索引的起始位置
     *
     * @return {Number} 元素在数组中位置的索引，返回-1代表未找到该元素
     *
     * @author Lin Chen
     */
    inArray: function (item, array, fromIndex) {
        var startIndex = fromIndex || 0;

        if (Array.prototype.indexOf) {
            return array.indexOf(item, startIndex);
        } else {
            for (var i = startIndex, len = array.length; i < len; i++) {
                if (item === array[i]) return i;
            }

            return -1;
        }
    },

    /**
     * 数组去重
     *
     * @param {Array} arr 需要去重的数组
     * @return {Array} arr 去重后的新的数组
     *
     * @author Lin Chen
     */
    removeDuplicate: function (arr) {
        var result = [];

        for (var i = 0, len = arr.length; i < len; i++) {
            if (this.inArray(arr[i], result) === -1) {
                result.push(arr[i]);
            }
        }

        return result;
    },
    /**
     * 获取当前页面的频道号
     *
     * @param {String} location 当前页面的locaiton对象
     * @return {String} string 当前页面的频道号
     *
     * @author CaoXuDong
     *
     * */
    gotChannelName: function (location) {
        // 维护一个字典
        var map = {
            'www.smzdm.com': '首页_', // 包含商家导航『www.smzdm.com/mall』，专题汇总『www.smzdm.com/zhuanti/』，应用中心『www.smzdm.com/push/』，招聘专区『www.smzdm.com/zhaopin/hot/』，等不完全统计。（只从导航栏看）
            'www.smzdm.com/p/': '商品详情_',
            'post.smzdm.com': '原创_',
            'post.smzdm.com/p/': '原创详情_',
            'faxian.smzdm.com': '发现_',
            'haitao.smzdm.com': '海淘_',
            '2.smzdm.com': '闲值_',
            'news.smzdm.com': '资讯_',
            'news.smzdm.com/p/': '资讯详情_',
            'search.smzdm.com': '搜索_',
            'wiki.smzdm.com': '百科_',
            'wiki.smzdm.com/p/': '百科_', // 百科详情也归到百科中
            'test.smzdm.com': '众测_',
            'test.smzdm.com/p/': '众测_',
            'auto.smzdm.com': '汽车_',
            'lvyou.smzdm.com': '旅游_',
            'zhiyou.smzdm.com': '个人中心_', // 包含至少三种类型：『zhiyou.smzdm.com/member/xxxxx』是个人主页，『zhiyou.smzdm.com/user/』是个人中心，『zhiyou.smzdm.com/user/crowd/』是值友幸运屋
            'www.smzdm.com/fenlei/': '分类_',
            'duihuan.smzdm.com': '福利_',
            'new.brand.smzdm.com': '新品牌_'
            // 其他如信用卡『card.smzdm.com』，品牌导航『pinpai.smzdm.com』，『』
        };
        var pathnameArr = location.pathname.split('/');
        var channelName = '';
        var _gotPathName = function () {
            if (pathnameArr.indexOf('p') === 1) {
                return '/p/';
            } else if (pathnameArr.indexOf('fenlei') === 1) {
                return '/fenlei/';
            } else {
                return '';
            }
        };
        var realHref = location.hostname + _gotPathName();
        for (var i in map) {
            if (realHref === i) {
                channelName = map[i];
                break;
            }
        }
        if (channelName) {
            return channelName;
        } else {
            return '';
        }
    },
    /**
     * JavaScript判断字符串长度（含中英文）
     * @author  Liuyongsheng
     * @time    2017-11-22
     */
    strlen: function (s) {
        var w = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            // 单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                w++;
            } else {
                w += 2;
            }
        }
        return w;
    }
};
