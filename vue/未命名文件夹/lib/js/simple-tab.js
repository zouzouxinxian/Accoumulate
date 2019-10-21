$(function () {
    // tab切换
    var $tab = $('.J_simple_tab');
    var eventName = $tab.attr('data-event');
    var $tabItems = $tab.children();
    var $relCons = $('#' + $tab.attr('data-rel')).children();
    var $cons = $relCons.length ? $relCons : $('.J_simple_tab_con').children();

    var initIndex = 0;
    var prevIndex = initIndex;
    var ACTIVE_CLASS = 'active';

    eventName = eventName || 'mouseenter';

    $tabItems.each(function (index, el) {
        var $self = $(el);

        $self.bind(eventName, function (event) {
            event.preventDefault();

            $tabItems.eq(prevIndex).removeClass(ACTIVE_CLASS);
            $cons.eq(prevIndex).hide();

            $self.addClass(ACTIVE_CLASS);
            $cons.eq(index).show();

            prevIndex = index;
        });
    });
});
