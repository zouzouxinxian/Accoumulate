require('./jquery.autocomplete.js');
$(function () {
    /* 搜索建议框宽度取#J_search_sug的宽度 */
    /* 搜索建议内容取#J_search_input的内容 */
    if ($('#J_search_sug').length > 0) {
        var $inputSearch = $('#J_search_input');
        var $form = $inputSearch.closest('form');
        $inputSearch.autocomplete({
            lookup: function (query, done) {
                $.ajax({
                    url: 'https://wiki.smzdm.com/xhr_shared/relation_search_word_result/',
                    // headers: {'x-requested-with': 'XMLHttpRequest'},
                    data: 'search_word=' + query,
                    type: 'post',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if ($inputSearch.val().length <= 0) {
                            // 此时字符为空
                        } else {
                            var list = [];
                            console.log('data===', data);
                            if (data.categoryinfo && data.categoryinfo.length > 0) {
                                for (var v = 0; v < data.categoryinfo.length; v++) {
                                    list.push({'value': data.categoryinfo[v].name});
                                }
                                if (list.length > 0) {
                                    var result = {
                                        suggestions: list
                                    };
                                    done(result);
                                }
                            } else {
                                done({suggestions: []});
                            }
                        }
                    }
                });
            },
            sugTag: '#J_search_sug',
            triggerSelectOnValidInput: false,
            onSelect: function (suggestion) {
                /* 因为sumbit后会直接在当前页跳转, 所以append后无需删除
                * 如果后续有变化可以在search-input.js的onsubmit方法中判断 */
                var $form = $inputSearch.closest('form');
                $form.append('<input type="hidden" name="source" value="sug">');
                $form.trigger('submit');
            },
            beforeRender: function () {
                $form.addClass('show-complete');
            },
            onHide: function () {
                $form.removeClass('show-complete');
            }
        });
    }
});
