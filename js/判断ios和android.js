    // 判断是ios还是安卓
    iosOrAdr () {
        var userAgent = navigator.userAgent;

        var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; // android终端
        var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS终端

        if (isAndroid) {
            return 'android';
        } else if (isiOS) {
            return 'ios';
        }
        return 'ios';
    }