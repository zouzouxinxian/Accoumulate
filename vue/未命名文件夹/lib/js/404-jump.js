$(function () {
    var config = require('./config');
    var $count = $('#J_jump_count');
    var count = 5;
    var timer;

    if ($count.length) {
        timer = setInterval(function () {
            count--;

            if (count === 0) {
                window.location = config.MAIN_SITE_URL;
                clearInterval(timer);
            }
            $count.text(count);
        }, 1000);
    }
});
