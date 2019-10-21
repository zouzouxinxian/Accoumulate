<template>
    <section class="wrap">
    <div class="broke-wrap">
        <!--爆料必读-->
        <div class="must-read">
            <img src="http://www.smzdm.com/resources/img/mustread.png?v=2019042901"><span>爆料必读</span>
            <div class="reading_box_pop box_shadow">
                <span class="border_radius grey"><i class="icon-xiaoai"><!--[if lt IE 8]>i<![endif]--></i></span>
                <p class="title">优质爆料三要素</p>
                <ol>
                    <li>1.主流商城的优质选品；</li>
                    <li>2.准确的价格描述；</li>
                    <li>3.丰富的原创理由；</li>
                    <li>想解锁更多爆料姿势，快来查看<a href="http://www.smzdm.com/p/1059121/" target="_blank">《爆料必读》</a>；</li>
                </ol>
                <p class="title">爆料奖励机制</p>
                <ol>
                    <li>爆料奖励=定级爆料基础奖励+热度奖励</li>
                    <li>基础奖励：定级为银牌/金牌/超级爆料的奖励</li>
                    <li>热度奖励：根据爆料发布后24小时内的热度情况发放的爆料奖励</li>
                    <li>超级爆料：采用至首页频道的爆料，发放超级爆料基础奖励18金币+热度奖励</li>
                    <li>金牌爆料：采用至精选频道的爆料，发放金牌爆料基础奖励8金币+热度奖励</li>
                    <li>银牌爆料：采用至全部好价频道的爆料，发放银牌爆料基础奖励2金币+热度奖励</li>
                    <li>个人主页的爆料不参与定级</li>
                </ol>
                <p class="title">处罚标准</p>
                <ol>
                    <li>对于爆料违规的情况，我们将依据不同的违规行为对相关账号及爆料进行处理，方式包括但不限于对发布的违规爆料进行回收、对违规用户进行有时限的禁止爆料。<a href="http://news.smzdm.com/p/28906/" target="_blank">点击查看详细规则</a></li>
                </ol>
                <p class="title">大把金币如何挥霍？</p>
                <ol>
                    <li><a href="#" target="_blank">值友福利</a>：兑换周边和优惠券；</li>
                    <li><a href="#" target="_blank">消费众测</a>：不愁参与资格；</li>
                    <li><a href="#" target="_blank">原创打赏</a>：金币碎银赏出干货；</li>
                    <li><a href="#" target="_blank">闲置转让</a>：买的放心卖的安心；</li>
                    <li><a href="#" target="_blank">幸运屋</a>：见证RP帝诞生。</li>
                </ol>
            </div>
        </div>

        <!--爆料投稿头部-->
        <div class="section-header">
            <div class="sh-head">爆料投稿</div>
            <div class="sh-content">
                    独剁剁不如众剁剁，分享你看到的好价商品，让网友们跟你一起 buy buy buy！<br>关注<a href="http://search.smzdm.com/?c=home&amp;s=%E8%B5%8F%E9%87%91%E8%AE%A1%E5%88%92" target="_blank"><b>赏金计划</b></a>，超值礼品卡、神秘大奖等你来拿～            </div>
        </div>
        <div class="section-body">
            <form class="un-feedback-form" id="un-feedback-form" method="post" enctype="multipart/form-data" action="//www.smzdm.com/baoliao/submit">
                <input type="hidden" id="type" name="type" value="baoliao" readonly="readonly" ignorereset="1">
                <input type="hidden" name="subtype" value="web" readonly="readonly" ignorereset="1">
                <input type="hidden" name="net_url" id="net_url" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="focus_pic" id="focus_pic" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="focus_order" id="focus_order" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="repeat_hotinfor_ids" id="repeat_hotinfor_ids" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="del_order_pic" id="del_order_pic" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="order_pic_url" id="order_pic_url" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="third_party" id="third_party" value="-1" readonly="readonly" autocomplete="off">
                <input type="hidden" name="flag" value="1" readonly="readonly" ignorereset="1" autocomplete="off">
                <input type="hidden" name="category" id="un-item-category" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="detail_category_id" value="" readonly="readonly" autocomplete="off">
                <input type="hidden" name="content" value="" readonly="readonly" autocomplete="off">
                <input type="file" value="" id="upload_head_img" name="user_focus_img">
                <input type="file" value="" id="upload_order_img" name="order_img">
                <input type="hidden" name="i_l_b" value="1" readonly="readonly" autocomplete="off">
                <input type="hidden" name="bl_pic_authorize" value="0" readonly="readonly" autocomplete="off">
                <input type="hidden" id="no_repeat" name="no_repeat" value="0">
                <input type="hidden" id="J_test_ab" name="j_test_ab" value="b">
                <div class="sy-content">
                    <div class="select-radio">
                        <ul class="ul-radio J_radio_change">
                            <li><span class="red"><i></i></span>单品爆料</li>
                            <li><span><i></i></span>活动爆料</li>
                        </ul>
                    </div>
                    <!--优惠链接部分-->
                    <div class="cheap-link">
                        <div class="left cl-text"><span>*</span>优惠链接:</div>
                        <div class="left cl-content">
                            <input type="text" name="item_link" value="" placeholder="在这里粘贴单品链接" autocomplete="off">
                            <div class="get-info" id="get_info_btn" onclick="GA_push('个人中心_爆料')">获取信息</div>
                        <!-- <script>
                                //jiangzhan@smzdm.com 获取用户行上传BI
                                function GA_push(event) {
                                    var testBranch = $('#J_test_ab').val();
                                    var node = $(".J_radio_change").children();
                                    var operation = "";
                                    if (node[0].firstChild.className == "red") {
                                        operation = "单品爆料";
                                    }
                                    if (node[1].firstChild.className == "red") {
                                        operation = "活动爆料";
                                    }
                                    dataLayer.push({'event': event, 'operation': operation, '好价样式AB测试': testBranch});
                                }
                        </script> -->
                            <span class="change">切换至活动爆料</span>
                        </div>
                        <div class="get-info-notice">
                            <span class="layerError layerError6">暂不支持自动提取该链接的信息，请手动填写信息。</span>
                        </div>
                    </div>
                    <!--获取链接之后要显示的内容-->

                    <div class="after-get">
                        <!--小编提示-->
                        <div class="after-tips">
                            <ul class="ul-tips">
                                <li class="t1"></li>
                                <li class="t2">小编提示：高质量爆料可以触发“极速发”后门，秒审通过哦！</li>
                                <li class="t3"></li>
                            </ul>
                        </div>
                        <!--商品名称-->
                        <div class="product-name">
                            <div class="left pn-text"><span>*</span>商品名称:</div>
                            <div class="left pn-content">
                                <input type="text" placeholder="请输入商品名称" id="un-item-goods" name="item_goods" autocomplete="off">
                                <p class="baoliao-tip">商品名称仅包含商品自身标题，请勿在后面重复填写 商品数量、凑单品、优惠券！</p>
                                <p id="un-item-goods-error" class="baoliao-error layerError layerError6">请输入商品标题</p>
                            </div>
                        </div>
                       <!--分类-->
                        <div class="product-classify">
                            <div class="left pc-text"><span>*</span>商品分类:</div>
                            <div class="left pc-content">
                                <!--模拟select-->
                                <div class="div_select_box">
                                    <div class="div_search">
                                        <input type="text" placeholder="请输入关键词查找分类" class="match_input" id="match_type">
                                        <div class="match_type_select">
                                            <ul class="match_type_list"></ul>
                                        </div>
                                    </div>
                                    <div id="search_type_one" class="div_select div_select_first border_radius_2">
                                        <cite data-index="0" class="color-lighter">一级分类<i class="arrow_down"></i></cite>
                                        <div class="more_select_box">
                                            <ul class="category_box_select"><li data-id="163">电脑数码</li><li data-id="27">家用电器</li><li data-id="191">运动户外</li><li data-id="57">服饰鞋包</li><li data-id="113">个护化妆</li><li data-id="75">母婴用品</li><li data-id="1515">日用百货</li><li data-id="95">食品生鲜</li><li data-id="131">礼品钟表</li><li data-id="7">图书音像</li><li data-id="93">玩模乐器</li><li data-id="177">办公设备</li><li data-id="37">家居家装</li><li data-id="147">汽车消费</li><li data-id="1523">金融服务</li><li data-id="5337">旅游出行</li><li data-id="5375">文化娱乐</li><li data-id="5384">房产置业</li></ul>
                                        </div>
                                    </div>
                                    <div id="search_type_two" class="div_select div_select_second border_radius_2">
                                        <cite data-index="1" class="color-lighter">二级分类<i class="arrow_down"></i></cite>
                                        <div class="more_select_box">
                                            <ul class="category_box_select"></ul>
                                        </div>
                                    </div>
                                    <div id="search_type_three" class="div_select div_select_third border_radius_2">
                                        <cite data-index="2" class="color-lighter">三级分类<i class="arrow_down"></i></cite>
                                        <div class="more_select_box">
                                            <ul class="category_box_select"></ul>
                                        </div>
                                    </div>
                                    <div id="search_type_four" class="div_select div_select_forth border_radius_2">
                                        <cite data-index="3" class="color-lighter">四级分类<i class="arrow_down"></i></cite>
                                        <div class="more_select_box">
                                            <ul class="category_box_select"></ul>
                                        </div>
                                    </div>
                                    <p id="un-item-category-error" class="baoliao-error layerError layerError6">请选择商品分类</p>
                                </div>
                                <!--模拟select end-->
                            </div>
                        </div>
                        <!--品牌-->
                         <div class="product-brand">
                            <div class="left pb-text"><span>*</span>品牌:</div>
                            <div class="left pb-content">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" id="un-item-brand" name="item_brand" autocomplete="off" class="ui-autocomplete-input" placeholder="请输入品牌名称">
                                <p id="un-item-brand-error" class="baoliao-error layerError layerError6">请填品牌名称</p>
                            </div>
                        </div>

                        <div class="product-price">
                            <div class="left pp-text"><span>*</span>实付总价:</div>
                            <div class="left pp-content">
                                <input type="text" id="un-item-price" name="item_price" autocomplete="off" placeholder="实际订单总价">
                               
                                <p id="un-item-price-error" class="baoliao-error layerError layerError6">请填写最终实付价格</p>
                            </div>
                            <div class="left pp-unit">
                                <cite data-unit="CNY" id="money_unit">元<i class="arrow_down"></i></cite>
                                <ul class="money_unit_select">
                                    <li data-unit="CNY">元</li>
                                    <li data-unit="HKD">港币</li>
                                    <li data-unit="USD">美元</li>
                                    <li data-unit="GBP">英镑</li>
                                    <li data-unit="EUR">欧元</li>
                                    <li data-unit="JPY">日元</li>
                                    <li data-unit="AUD">澳元</li>
                                    <li data-unit="NZD">纽币</li>
                                    <li data-unit="KRW">韩元</li>
                                    <li data-unit="CAD">加元</li>
                                    <li data-unit="TWD">新台币</li>
                                    <li data-unit="SGD">新元</li>
                                    <li data-unit="INR">卢比</li>
                                    <li data-unit="RUB">卢布</li>
                                    <li data-unit="THB">泰铢 </li>
                                </ul>
                            </div>
                                                            <p class="pp-tip">参考价：<span class="pp-num">0</span>元。如爆料海淘商品，需包含税费和邮费（邮费：直邮费用or转运费用）</p>
                                                    </div>
                        <div class="product-number">
                                <div class="left pn-text"><span>*</span>主商品数量:</div>
                                <div class="left pn-content">
                                    <input type="text" value="1" id="un-item-number" autocomplete="off" onkeyup="value=value.replace(/[^\d\.]/g,'')">
                                    <span>件</span>
                                </div>
                                                            <p class="pn-tip">参考件数：<span class="pn-num">1</span>件。特指爆料链接对应的主商品“购买”数量</p>
                                                            <p id="un-item-number-error" class="baoliao-error layerError layerError6">请填写主商品数量 </p>
                            </div>
                            <div class="product-one">
                                <div class="left po-text">折后单价:</div>
                                <div class="left po-price">
                                    <input type="text" id="un-item-one" readonly="readonly">
                                    <p>元</p>
                                </div>
                            </div>
                        <!--补充信息-->
                        <div class="add-info">
                            <div class="left ao-text">更多:</div>
                            <div class="left ao-content">
                                <ol class="input-ol">
                                    <li id="coudan">
                                        <input type="checkbox"> 可用凑单品
                                        <div class="coudan hide-broke">
                                            <ul class="coudan-ul">
                                                <li>
                                                    <input type="text" placeholder="请输入商品名称" class="coudan-input1 add-info-name">
                                                    <input type="text" name="coudanpin_link[]" placeholder="请输入凑单品链接" class="coudan-input2 add-info-url">
                                                    <input type="button" value="+" class="coudan-input4">
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li id="is-active">
                                        <input type="checkbox"> 属于某活动
                                        <div class="second-ol hide-broke">
                                            <ul class="active-ul">
                                                <li class="so-last">
                                                    其他
                                                    <input type="text" name="item_associated_detail_huodong[other][title]" placeholder="请输入名称" class="add-info-name">
                                                    <input type="text" name="item_associated_detail_huodong[other][link]" placeholder="请输入链接" class=" add-info-url">
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li id="is-coupon">
                                        <input type="checkbox"> 可叠加优惠券
                                        <div class="second-ol hide-broke">
                                            <ul class="coupon-ul">
                                                <li class="so-last">其他
                                                    <input type="text" name="item_associated_detail_youhuiquan[other][title]" placeholder="请输入名称" class="add-info-name">
                                                    <input type="text" name="item_associated_detail_youhuiquan[other][link]" placeholder="请输入链接" class="add-info-url">
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ol>
                                <p id="un-item-addinfo-error" class="baoliao-error layerError layerError6">请输入链接</p>
                            </div>
                        </div>
                        <!-- 是否专享 -->
                        <div class="select-radio-vip">
                            <div class="left pn-text">是否专享:</div>
                            <ul class="left ul-radio J_radio_vip">
                                <li class="vip-none"><span class="red" data="0"><i></i></span>无</li>
                                <li class="vip-mobile"><span data="1"><i></i></span>移动端专享</li>
                                <li class="vip-weixin"><span data="2"><i></i></span>微信端专享</li>
                            </ul>
                        </div>
                    </div>
                    <!--推荐理由-->
                    <div class="recommend-reason">
                        <div class="left rn-text"><span>*</span>推荐理由:</div>
                        <div class="left rn-content">
                            <div class="rn2">
                                <textarea id="un-content-price" autocomplete="off" style="color: rgb(160, 160, 160);">价格值：请描述得到此价格的折扣方法，并评价优惠力度，新手可参考万能模板
商品值：折扣再多，值才重要！分享你真实的选品心得（严禁抄袭），说说这款商品值在哪，比如品牌认知度如何、商品功能性如何、适合哪些人群使用、是否有其他注意事项等。
丰富的推荐理由，能有机会获得追加金币奖励哦！</textarea>
                                <!-- <div contenteditable="true" id="un-content-price" class="reason-area"></div> -->
                            </div>
                            <div class="rn3">
                                <span class="rn3-left">最少输入14个字符</span>
                                <div class="rn6">
                                    <a href="javascript:void(0);">商品优势示例</a>
                                    <div class="reading_box_pop box_shadow">
                                        <ol>
                                            <li>来自值友“fangzhi”的爆料：Panasonic松下调理系列面包机SD-P104，采用松下自社马达，具备低转速、高扭力、静音等特点，相对而言，这都是国产面包机的软肋，模拟手工揉面，配合恰到好处的频率，让酵母和面粉更均匀，以达到更好的口感，独特的分段烘烤技术，可更好的调节靠色和面包皮的厚度。从网友评价来看，这货非常适合新手使用，完全可以做到面粉进去，面包出来，全自动“傻瓜”机。</li>
                                        </ol>
                                        <ol>
                                            <li>来自值友“疯筝”的爆料：iRobot是一家跟我们生活紧密联系的高科技公司，旗下不仅生产太空探测机器人这样的前沿高端货，还有我们比较熟悉的扫地和擦地机器人系列产品。这款iRobot Roomba 880是目前该系列的旗舰款型，囊获红点、iF和IHA三项国际大奖。搭载了全新的AeroForce高性能清扫系统，就是将原先的毛刷都换成了胶刷并设计了全新凹槽，结合吸力提升5倍的吸尘马达提供高速空气流，直接把异物“提取”吸入垃圾盒里。还有IADAPT响应导航技术，配合虚拟墙灯塔，指引机器人清扫房间的每一个角落。此外XLife提供最大2小时续航，还可自动返回充电。预设功能也非常贴心的，最多可设置一周7次自动运行。家里有地毯以及饲养宠物或者喜欢尝鲜的朋友，现在可以出手啦！</li>
                                        </ol>
                                    </div>
                                </div>
                                <div class="rn3-right rn3-template">
                                    <input type="checkbox" id="price_templet_btn">
                                    <span>引用万能模板</span>
                                </div>
                            </div>
                            <p id="un-item-content-error" class="baoliao-error layerError layerError6">请完善推荐理由,最少输入14个字符</p>
                        </div>
                    </div>
                    <div class="product-img">
                        <div class="left pi-text"><span>*</span>图片:</div>
                        <div class="left pi-content">
                            <div class="pi-set"><span class="focus-map">焦点图</span><span class="shadow"></span><span class="mask">设为焦点图</span><span class="i-delete icon-zhukushanchu"></span><img src="/resources/img/product_11.png" title=""></div>
                            <div class="pi-set"><span class="shadow"></span><span class="mask">设为焦点图</span><span class="i-delete icon-zhukushanchu"></span><img src="/resources/img/product_15.png" title=""></div>
                            <div class="pi-set"><span class="shadow"></span><span class="mask">设为焦点图</span><span class="i-delete icon-zhukushanchu"></span><img src="/resources/img/product_15.png" title=""></div>
                            <div class="pi-set"><span class="shadow"></span><span class="mask">设为焦点图</span><span class="i-delete icon-zhukushanchu"></span><img src="/resources/img/product_11.png" title=""></div>
                            <label for="upload_head_img">
                                <div class="up-img" id="upload_head_img_box"><span class="shadow"></span><span class="mask-up">上传图片</span></div>
                            </label>
                            <p class="set-rule">图片限5张，10mb以下的jpg、png格式的图片。</p>
                            <p id="focus_pic-error" class="baoliao-error layerError layerError6">请添加商品图片</p>
                        </div>
                    </div>
                    <!--订单截图-->
                    <div class="order-screenshot">
                        <div class="left os-text">订单截图:</div>
                        <div class="left os-content">
                            <label for="upload_order_img">
                                <div class="upload-img" id="upload_order_img_box">上传图片</div>
                            </label>
                            <p>支持小于300k,格式为 jpg,jpeg,png 的图片，截图请注意隐藏个人信息</p>
                        </div>
                    </div>
                                    <!--新增转载许可确认-->
                    <div class="reprint">
                        <input type="checkbox" value="" checked="" id="isReprint"> 允许转载
                        <p>为了更好的促进值友经验分享和传播，值得买请求获取您的授权，详情见<a href="https://www.smzdm.com/user/register/provisions" target="_blank">《什么值得买用户协议》</a></p>
                    </div>
                                    <div class="submit-button">
                        <input id="un-feedback-submit" type="button" value="提交爆料" class="submit-button-yes" onclick="GA_push('1240003')">
                        <input id="un-feedback-preview" type="button" value="预览" class="submit-button-preview">
                    </div>
                    <div class="view-rules-faxian">
                        <p>我已阅读
                            <a href="http://news.smzdm.com/p/28906/" target="_blank">《什么值得买好价爆料管理规范》</a></p>
                    </div>
                    <div class="view-rules">
                        <p>
                            <span id="bhNotice">您的用户等级为LV0，好价本周还可爆料0条。</span>&nbsp;
                            <a href="javascript:void(0);">查看规则</a>
                        </p>
                        <div class="rules">
                            <p>为防止无效爆料过多，提升爆料准确率，我们对单位时间内爆料数量进行了限制。请值友在提交前对选品、价格、是否其他值友已报，作出确认后再提交。</p>
                    <p>好价体系</p>
                    <p>LV0用户：0条/周</p>
                    <p>LV1至LV4用户：3条/周</p>
                    <p>LV5至LV9用户：5条/周</p>
                    <p>LV10至LV19用户：15条/周</p>
                    <p>LV20及以上用户：30条/周</p>                        </div>
                    </div>                    
                    <!-- 2019年新增用户爆料入口 -->
                    <div class="merchants-reported z-clearfix">
                      <img src="/resources/img/baoliao_icon.png">
                      <div class="reported-right">
                        <h3>商家爆料须知</h3>
                        <p>商家爆料和用户爆料采用一致的审核标准。本站禁止商家冒充用户爆料，一旦发现爆料将无法通过审核并予以封号处理。商家爆料请移步商业合作平台，我们为您准备了数据反馈、优惠券爆料、值友专享价提报等服务辅助您的提报。</p>
                      </div>
                      <a target="_blank" href="https://shangjia.smzdm.com/" onclick="dataLayer.push({'event':'1240001'})">商家爆料入口</a>
                    </div>

                </div>
            </form>
        </div>
    </div>
    <!-- number pop -->
    <div class="pop pop_main_box number-pop">
        <i class="pop-close icon-cross-lighter"><!--[if lt IE 8]>x<![endif]--></i>
        <div class="pop-title">
            <div class="pop_name">主商品数量</div>
        </div>
        <!-- pop-content -->
        <div class="pop-content">
            <div class="pop_width_320">
                <p class="pop_info">
                    商品数量最大<span>100</span>件！
                </p>
            </div>
        </div>
        <!-- pop-content end -->
    </div>
    <!-- number pop end -->


    <div class="pop" id="titleInspectBox">
        <i class="pop-close icon-cross-lighter"><!--[if lt IE 8]>x<![endif]--></i>
        <div class="pop-title">
            <div class="pop_name">提醒</div>
        </div>
        <!-- pop-content -->
        <div class="pop-content">
            <div class="pop_width_320">
                <p class="pop_info">
                    标题需包含中文描述！
                </p>
            </div>
        </div>
        <!-- pop-content end -->
    </div>


    <!-- one-price pop -->
    <div class="pop pop_main_box one-price-pop">
        <i class="pop-close icon-cross-lighter"><!--[if lt IE 8]>x<![endif]--></i>
        <div class="pop-title">
            <div class="pop_name">折后单价过低</div>
        </div>
        <!-- pop-content -->
        <div class="pop-content">
            <div class="pop_width_320">
                <p class="pop_info">
                    经过检测，您填写的折后单价过低<br>建议您仔细检查<span>实付总价、商品数量</span>是否有误！
                </p>
                <div class="a_blockBox">
                    <a href="javascript:;" class="a_greyBlock one-price-cancel">确&nbsp;&nbsp;定</a>
                </div>
            </div>
        </div>
        <!-- pop-content end -->
    </div>
    <!-- one-price pop end -->
    <!-- pop -->
    <div class="pop pop_main_box preview-pop">
        <i class="pop-close icon-cross-lighter"><!--[if lt IE 8]>x<![endif]--></i>
        <div class="pop-title">
            <div class="pop_name">预览爆料</div>
        </div>
        <!-- pop-content -->
        <div class="pop-content">
            <div class="pop_width_320">
                <p class="pop_info">
                    可快速查看爆料信息的展示效果<br>请注意核实<span>标题、价格、图片</span>的准确性！
                </p>
                <div class="a_blockBox">
                    <a href="#" class="a_redBlock lFloat preview-go" target="_blank">确定预览</a>
                    <a href="javascript:;" class="a_greyBlock rFloat preview-cancel">取&nbsp;&nbsp;消</a>
                </div>
            </div>
        </div>
        <!-- pop-content end -->
    </div>
    <!-- pop end -->
    <!--content end-->
</section>
</template>
<script>
export default {
  name: 'One',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reading_box_pop {
    width: 741px;
    height: auto;
    padding: 30px 50px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    position: absolute;
    right: -20px;
    top: 45px;
    text-align: left;
    opacity: 0;
    display: none;
    z-index: 1000;
    text-align: justify;
}
section.wrap{
    margin-top:-20px;
    background-color:white;
}
section .broke-wrap{
        position:relative
}
#upload_head_img,
#upload_order_img{
    position:fixed;
    left:-9999px;
    bottom:0
}
.left{
    float:left
}
.layerError6{
    position:absolute;
    padding-top:5px
}
.left.rn-content .layerError6{
    margin-top:20px
}
.section-header{
    width:730px;
    margin:0 auto;
    padding-top:60px;
    padding-bottom:30px
}
.sh-head{
    font-size:26px;
    color:#333;
    text-align:center;
    margin-bottom:15px;
    margin-top:60px
}
.sh-content{
    text-align:center;
    font-size:12px;
    color:#999
}
.sh-content a{
    color:#5188a6
}
.section-body{
    border-top:1px solid #e5e5e5;
    margin-bottom:128px
}
.sy-content{
    padding-top:32px
}
.reprint,
div.select-radio,
div.select-radio-vip,
.after-tips,.product-name,
.product-price,
.product-number,
.product-brand,
.product-mall,
.add-info,
.order-screenshot,
.product-one{
    width:850px;
    margin:0 auto;
    overflow:hidden
}
.product-price{
    overflow:initial;
    height:50px
}
.product-classify{
    width:850px;
    margin:0 auto;
    display:table
}
.ul-radio{
    margin-left:98px
}
.select-radio-vip .ul-radio{
    margin-left:0
}
.select-radio .ul-radio{
    overflow:hidden
}
.select-radio .ul-radio li,.select-radio-vip .ul-radio li{
    list-style-type:none;
    float:left;
    width:85px;
    margin-right:30px;
    height:24px
}
.select-radio-vip .ul-radio li{
    width:auto;
    cursor:pointer
}
.select-radio .ul-radio li span,
.select-radio-vip .ul-radio li span{
    border:1px solid #e5e5e5;
    border-radius:50%;
    display:inline-block;
    width:16px;
    height:16px;
    background-color:white;
    position:relative;
    margin-right:10px;
    cursor:pointer;
    top:4px
}
.select-radio .ul-radio li span.red,
.select-radio-vip .ul-radio li span.red{
    background-color:#f04848
}
.select-radio .ul-radio li span i,
.select-radio-vip .ul-radio li span i{
    border-radius:50%;
    width:4px;
    height:4px;
    position:absolute;
    left:6px;
    top:6px;
    background-color:white
}
div.get-info-notice{
    display:table;
    width:730px;
    margin:0 auto;
    margin-top:50px;
    display:none;
    position:relative
}
div.get-info-notice .layerError6{
    left:85px
}
div.cheap-link{
    display:table;
    width:850px;
    margin:0 auto;
    margin-top:28px
}
.cheap-link .cl-text,.rn-text,
.ao-text,
.os-text,
.pn-text,
.pp-text,
.pc-text,
.pb-text,
.pi-text,
.po-text{
    width:80px;
    text-align:right;
    padding-right:18px;
    font-size:14px;
    line-height:50px
}
.email-notice{
    margin:0 auto;
    margin-top:50px;
    display:none;
    position:relative;
    margin-left:85px
}
.order-screenshot .os-content{
    margin-top:12px
}
.cheap-link .cl-text span,
.rn-text span,
.ao-text span,
.os-text span,
.pn-text span,
.pp-text span,
.pc-text span,
.pi-text span,
.product-brand span{
    color:#f04848
}
.cl-content{
    position:relative
}
.cl-content input{
    width:490px;
    padding-left:20px;
    height:48px;
    line-height:48px;
    border:0;
    background-color:#f5f5f5;
    border:1px solid #f5f5f5;
    margin-right:-4px;
    border-radius:5px
}
.cl-content .change{
    position:absolute;
    right:-104px;
    top:19px;
    font-size:12px;
    color:#5188a6;
    cursor:pointer;
    display:none
}
.get-info{
    display:inline-block;
    width:120px;
    height:50px;
    line-height:50px;
    text-align:center;
    background-color:#f04848;
    color:white;
    margin-left:10px;
    cursor:pointer;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    -ms-border-radius:3px;
    -o-border-radius:3px;
    border-radius:3px
}
.recommend-reason{
    margin:30px auto 0;
    display:table;
    width:850px;
    display:none
}
.recommend-reason:before,
.recommend-reason:after{
    content:"";
    display:table;
    clear:both;
    width:0
}
.recommend-reason .rn-content{
    border:1px solid #e5e5e5;
    width:640px;
    padding-top:15px;
    padding-bottom:20px
}
.recommend-reason .rn-content>div{
    width:602px;
    margin:0 auto;
    font-size:12px;
    display:table
}
.recommend-reason .rn-content .rn1 span.rn1-left,
.rn4-left{
    color:#000
}
.rn3-left{
    color:#999
}
.rn3-left img{
    margin-right:5px;
    position:relative;
    top:1px
}
.recommend-reason .rn-content .rn1 span.rn1-right,
.rn4-right,
.rn3-right{
    float:right;
    color:#666
}
.rn3-example{
    margin-left:15px
}
.recommend-reason .rn-content .rn2{
    margin-top:5px
}
.rn2 textarea,
.rn2 .reason-area{
    border:0;
    background-color:#f5f5f5;
    width:586px;
    max-width:586px;
    min-height:109px;
    padding:15px;
    border-radius:5px;
    resize-x:none
}
.recommend-reason .rn-content .rn3{
    margin-top:5px;
    color:#666
}
.recommend-reason .rn-content .rn3 input{
    margin-right:5px
}
.recommend-reason .rn-content .rn4{
    margin-top:17px
}
.recommend-reason .rn-content .rn5{
    margin-top:5px
}
.recommend-reason .rn-content .rn5 textarea{
    height:109px
}
.recommend-reason .rn-content .rn6{
    text-align:right;
    width:102px;
    float:right;
    position:relative
}
.recommend-reason .rn-content .rn6 a{
    color:#5188a6
}
.add-info{
    overflow:hidden;
    margin-top:12px;
    display:none
}
.hide-broke{
    display:none
}
.add-info .ao-content{
    padding-top:15px
}
.input-ol>li{
    margin-bottom:5px
}
.coudan{
    background-color:#f4f4f4;
    width:508px;
    line-height:50px;
    padding-left:12px;
    margin-top:10px
}
.coudan input{
    height:30px;
    border-radius:2px;
    border:1px solid #dadada;
    padding-left:12px;
    line-height:30px
}
.coudan .coudan-input1{
    width:124px
}
.coudan .coudan-input2{
    width:280px;
    margin-left:20px
}
.coudan .coudan-input3{
    width:32px;
    height:32px;
    border:1px solid #dadada;
    border-radius:3px;
    font-size:10px;
    color:#adacab;
    cursor:pointer;
    background-color:#e1e2e1;
    margin-left:11px;
    padding-left:0
}
.coudan .coudan-input4{
    width:32px;
    height:32px;
    border:1px solid #dadada;
    border-radius:3px;
    font-size:10px;
    color:#f04848;
    cursor:pointer;
    background-color:white;
    margin-left:11px;
    padding-left:0
}
.second-ol input{
    height:30px;
    border-radius:2px;
    border:1px solid #dadada;
    padding-left:12px;
    line-height:30px;
    vertical-align:middle;
    margin-left:15px;
    margin-right:5px
}
.second-ol{
    background-color:#f4f4f4;
    width:520px;
    margin-top:5px
}
.second-ol ul{
    margin-left:12px;
    margin-top:15px
}
.second-ol ul li{
    padding-top:8px
}
.second-ol ul .so-last{
    padding-bottom:8px
}
.order-screenshot{
    overflow:hidden;
    margin-top:15px;
    display:none
}
.upload-img{
    width:120px;
    height:120px;
    background-color:#b2b2b2;
    text-align:center;
    line-height:120px;
    color:white;
    cursor:pointer
}
.after-get{
    margin-top:27px;
    display:none
}
.after-tips{
    padding-top:34px
}
.after-tips ul.ul-tips{
    overflow:hidden
}
.after-tips ul.ul-tips li{
    float:left;
    list-style-type:none;
    color:#666;
    font-size:14px
}
.t1,
.t3{
    width:208px;
    border-top:1px solid #e5e5e5;
    height:0;
    margin-top:9px
}
.t1{
    margin-right:30px
}
.t3{
    margin-left:30px
}
.product-name{
    margin-top:34px
}
.product-name .pn-content input,
.product-price .pp-content input,
.product-number .pn-content input,
.product-number .pn-price input,
.product-one .po-price input{
    background-color:#f5f5f5;
    border:1px solid #f5f5f5;
    width:474px;
    height:48px;
    line-height:48px;
    padding:0 18px;
    border-radius:5px
}
.product-one .po-price input{
    background-color:#fff;
    width:134px;
    border-color:#dcdcdc
}
.product-price .pp-content input,
.product-number .pn-content input,
.product-number .pn-price input{
    width:134px;
    margin-right:10px
}
.product-number .pn-content input{
    width:134px;margin-right:40px
}
.pn-content,
.pn-price{
    position:relative
}
.product-name .pn-content{
    position:initial
}
.pn-content span,
.pn-price p,
.po-price p{
    position:absolute;
    display:block;
    width:auto;
    line-height:50px;
    top:0;
    font-size:12px
}
.pn-content span{
    width:30px;
    left:174px;
    text-align:center
}
.product-number .pn-tip{
    font-size:12px;
    color:#999;
    height:18px;
    line-height:18px;
    padding-left:16px;
    background:url(https://res.smzdm.com/resources/public/img/baoliao_tip.png) no-repeat left 2px;
    background-size:12px auto;
    position:absolute;
    margin:53px 0 0 100px
}
.po-price{
    position:relative
}
.pn-price p{
    width:240px;
    margin-left:-5px
}
.po-price p{
    padding:0 7px;
    left:174px;
    width:40px;
    font-size:12px
}
.product-number .pn-price input{
    width:92px
}
.pn-price input{
    margin-left:10px
}
.product-price,
.product-classify,
.product-classify,
.product-brand,
.product-mall,
.product-img,
.product-number,
.product-one{
    margin-top:30px!important
}
.product-price .pp-tip{
    font-size:12px;
    color:#999;
    padding-left:16px;
    height:18px;
    line-height:18px;
    background:url(https://res.smzdm.com/resources/public/img/baoliao_tip.png) no-repeat left 2px;
    background-size:12px auto;
    position:absolute;
    margin:53px 0 0 100px
}
.product-classify .pc-content input,
.product-brand .pb-content input,
.product-mall .pb-content input{
    width:474px;
    height:48px;
    background-color:#f5f5f5;
    line-height:48px;
    padding:0 18px;
    border:1px solid #f5f5f5;
    border-radius:5px
}
.product-classify .pc-content input{
    width:134px
}
.ui-widget-content{
    width:294px!important;
    background:#fff;
    padding:10px;
    border-color:#dcdcdc!important;
    border-radius:2px
}
.ui-menu .ui-menu-item{
    float:left
}
.ui-menu .ui-menu-item a{
    text-align:center;
    display:inline-block;
    padding:0 10px;
    height:36px;
    line-height:36px;
    margin-right:5px;
    color:#333;
    font-size:12px;
    border-radius:2px
}
.ui-menu .ui-menu-item a.ui-state-focus,
.ui-menu .ui-menu-item a.ui-state-active{
    color:#fff;
    background:#f04848;
    border-color:#f04848
}
.pi-content{
    display:table
}
.pi-content>div{
    float:left;
    position:relative;
    cursor:pointer;
    width:120px;
    height:120px;
    background-color:white;
    margin-right:10px
}
.pi-content>label>div{
    float:left;
    position:relative;
    cursor:pointer;
    width:120px;
    height:120px;
    background-color:white;
    margin-right:10px
}
.pi-content .set-rule{
    font-size:12px;
    color:#999;
    padding-top:16px
}
.pi-content>div .mask,
.pi-content>div .mask-up{
    width:120px;
    height:120px;
    color:white;
    text-align:center;
    line-height:120px;
    position:absolute;
    top:0;
    left:0;
    font-size:14px;
    cursor:pointer;
    z-index:10;
    display:none
}
.pi-content>label>div .mask-up{
    width:120px;
    height:120px;
    color:white;
    text-align:center;
    line-height:120px;
    position:absolute;
    top:0;
    left:0;
    font-size:14px;
    cursor:pointer;
    z-index:10;
    display:none
}
.pi-content>div span.shadow{
    background-color:black;
    opacity:.4;
    filter:Alpha(opacity=40);
    width:120px;
    height:120px;
    position:absolute;
    top:0;
    left:0;
    display:none
}
.pi-content>label>div span.shadow{
    background-color:black;
    opacity:.4;
    filter:Alpha(opacity=40);
    width:120px;
    height:120px;
    position:absolute;
    top:0;
    left:0;
    display:none
}
.pi-content>div .i-delete{
    width:20px;
    height:20px;
    background-color:black;
    opacity:.2;
    filter:Alpha(opacity=20);
    right:-10px;
    top:-10px;
    position:absolute;
    cursor:pointer;
    z-index:11;
    border-radius:50%;
    text-align:center;
    line-height:20px;
    display:none
}
    
    .pi-content div.up-img {
        margin-right: 0
    }
    
    .pi-content>div.up-img span.mask,
    .pi-content>div.up-img span.mask-up {
        display: inline;
        background-color: #b2b2b2;
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0
    }
    
    .pi-content>label>div.up-img span.mask-up {
        display: inline;
        background-color: #b2b2b2;
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0
    }
    
    .pi-content>div img {
        width: auto;
        height: 120px;
        vertical-align: top;
        border: 0;
        display: block;
        margin: 0 auto
    }
    
    .pi-content>div .focus-map {
        display: inline-block;
        width: 50px;
        height: 22px;
        color: white;
        line-height: 22px;
        background-color: #f95352;
        font-size: 14px;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 11
    }
    
    .pi-content .pi-set:hover .shadow {
        display: inline
    }
    
    .pi-content .pi-set:hover .mask {
        display: inline
    }
    
    .pi-content .pi-set:hover span.i-delete {
        display: inline
    }
    
    .pi-content p {
        clear: both
    }
    
    .product-img {
        display: table;
        width: 850px;
        margin: 0 auto;
        display: none
    }
    
    .os-content p {
        font-size: 12px;
        color: #999;
        margin-top: 20px
    }
    
    .submit-button {
        width: 730px;
        margin: 0 auto;
        text-align: center;
        margin-top: 40px;
        display: none
    }
    
    .submit-button input.submit-button-yes {
        background-color: #f04848;
        color: white;
        font-size: 18px;
        text-align: center;
        height: 50px;
        border: 0;
        width: 265px;
        cursor: pointer;
        border-radius: 3px;
        margin-right: 20px
    }
    
    .submit-button input.submit-button-preview {
        background-color: #fff;
        color: #333;
        font-size: 18px;
        text-align: center;
        height: 50px;
        border: 0;
        width: 96px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-right: 20px
    }
    
    .must-read {
        position: absolute;
        top: 15px;
        right: 20px;
        cursor: pointer
    }
    
    .must-read .reading_box_pop {
        width: 400px!important
    }
    
    .must-read img {
        position: relative;
        top: 6px;
        right: 10px
    }
    
    .coudan-ul {
        padding-top: 5px;
        padding-bottom: 5px
    }
    
    .coudan-ul li {
        height: 40px;
        line-height: 40px
    }
    
    .reading_box_pop {
        width: 741px;
        height: auto;
        padding: 30px 50px;
        border: 1px solid #e6e6e6;
        background-color: #fff;
        position: absolute;
        right: -20px;
        top: 45px;
        text-align: left;
        opacity: 0;
        display: none;
        z-index: 1000;
        text-align: justify
    }
    
    .reading_box_pop span.grey {
        background-color: #e6e6e6;
        float: right
    }
    
    .reading_box_pop span.grey .icon-xiaoai {
        color: #999
    }
    
    .reading_box_pop p.title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px
    }
    
    .reading_box_pop ol {
        margin-bottom: 30px
    }
    
    .reading_box_pop ol:last-child {
        margin-bottom: 0
    }
    
    .reading_box_pop ol li {
        color: #666
    }
    
    .must-read:hover .reading_box_pop {
        display: block
    }
    
    .rn6:hover .reading_box_pop {
        display: block
    }
    
    .div_select_box {
        height: 50px;
        position: relative
    }
    
    .div_select_box .baoliao-error {
        left: 0;
        top: 50px
    }
    
    .more_get_info .inner_box .div_select cite {
        width: 293px
    }
    
    .div_select cite,
    .pp-unit cite {
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        width: 122px;
        height: 48px;
        line-height: 48px;
        display: block;
        cursor: pointer;
        font-size: 12px;
        padding-left: 18px;
        border-radius: 5px;
        position: relative;
        padding-right: 32px
    }
    
    .div_select_second cite,
    .div_select_third cite,
    .div_select_forth cite {
        width: 76px
    }
    
    .div_select_forth cite {
        width: 102px
    }
    
    .pp-unit cite {
        width: 78px
    }
    
    .div_select_first cite {
        width: 78px
    }
    
    .div_select cite .arrow_down,
    .pp-unit cite .arrow_down {
        border-top-color: #adadad
    }
    
    .div_select cite i,
    .pp-unit cite i {
        border-width: 6px;
        right: 20px;
        top: 23px
    }
    
    .arrow_down {
        width: 0;
        height: 0;
        border-width: 4px;
        border-color: #adadad transparent transparent;
        border-style: solid dashed dashed;
        position: absolute
    }
    
    .category_box_select {
        position: relative;
        z-index: 100
    }
    
    .div_search {
        float: left;
        height: 50px;
        position: relative;
        z-index: 100;
        margin-right: 10px
    }
    
    .match_type_select {
        position: absolute;
        top: 49px;
        left: 0;
        border: 1px solid #dcdcdc;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #fff;
        display: none;
        max-height: 310px;
        overflow: auto
    }
    
    .match_type_select li {
        width: 300px;
        padding: 0 18px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    
    .match_type_select li:hover {
        background-color: #f6f6f6;
        color: #5188a6
    }
    
    .div_select,
    .pp-unit {
        float: left;
        position: relative;
        height: 50px;
        margin-right: 10px
    }
    
    .div_select_forth {
        margin-right: 0
    }
    
    ul.money_unit_select {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        top: 49px;
        left: 0;
        width: 128px;
        border: 1px solid #e6e6e6;
        background: #fff;
        z-index: 100;
        display: none
    }
    
    ul.money_unit_select>li {
        padding-left: 18px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        font-size: 12px
    }
    
    ul.money_unit_select>li:hover {
        background: #f5f5f5
    }
    
    ul.category_box_select>li:hover .sub_category {
        display: block
    }
    
    .div_select .sub_category li:hover .sub_tags_box {
        display: block
    }
    
    .more_select_box {
        background-color: #fff;
        border: 1px solid #dcdcdc;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        left: 0;
        top: 49px;
        display: none;
        z-index: 100
    }
    
    .more_select_box p.grey {
        height: 30px;
        border-bottom: 1px solid #e6e6e6;
        display: block;
        line-height: 30px;
        font-size: 12px;
        color: #666;
        padding-left: 20px
    }
    
    ul.category_box_select li .li_item {
        padding-left: 20px;
        width: 110px
    }
    
    .div_select .sub_category {
        display: none;
        left: 151px;
        top: 0;
        width: 110px;
        height: 510px;
        border: 0;
        border-right: 1px solid #e6e6e6;
        padding: 0;
        box-shadow: none
    }
    
    .div_select .sub_category li {
        left: 0;
        width: 110px
    }
    
    .div_select .sub_category li.active>a {
        background-color: #f0f0f0;
        color: #333
    }
    
    .div_select .sub_category li>a {
        padding-left: 20px;
        display: block;
        height: 32px;
        line-height: 32px;
        color: #666
    }
    
    .sub_tags_box {
        position: absolute;
        left: 111px;
        top: -1px;
        width: 316px;
        height: 450px;
        padding: 30px;
        background-color: #fff;
        border-right: 1px solid #e6e6e6;
        display: none
    }
    
    .sub_tags_box a {
        display: inline-block;
        padding: 0 10px;
        margin-bottom: 3px;
        height: 30px;
        line-height: 30px;
        color: #333;
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px
    }
    
    .sub_tags_box a:hover {
        color: #fff;
        background-color: #f04848
    }
    
    .sub_tags_box a.active {
        color: #fff;
        background-color: #f04848
    }
    
    .div_select .sub_category li.active .sub_tags_box {
        display: block
    }
    
    .radio_box .error_red {
        float: left;
        padding-top: 0
    }
    
    .div_select li.last,
    .div_select li .sub_category,
    .div_select li .sub_tags_box {
        border-bottom: 1px solid #e6e6e6
    }
    
    .category_box_select li .li_item {
        padding: 0 20px 0 26px;
        height: 32px
    }
    
    .category_box_select li span {
        font-family: "simsun";
        font-size: 12px;
        color: #ccc;
        font-weight: bold;
        float: right
    }
    
    .category_box li i,
    .category_box_select li i {
        margin-right: 10px;
        vertical-align: -2px
    }
    
    .sub_category {
        position: absolute;
        background-color: #fff
    }
    
    .category_box li,
    .category_box_select li {
        height: 34px;
        line-height: 32px
    }
    
    .category_box_select li {
        padding: 0 18px
    }
    
    .div_select .category_box_select li {
        width: 90px;
        font-size: 12px
    }
    
    .div_select_forth .category_box_select li {
        width: 116px
    }
    
    .div_select cite,
    .div_select li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    
    .div_select_first .category_box_select li {
        width: 92px
    }
    
    .div_select_second,
    .div_select_third,
    .div_select_forth {
        display: none
    }
    
    li {
        list-style: none
    }
    
    .sub_tags_box {
        position: absolute;
        left: 110px;
        top: -1px;
        width: 316px;
        height: 388px;
        padding: 30px;
        background-color: #fff;
        border-right: 1px solid #e6e6e6;
        border-left: 1px solid #e6e6e6;
        display: none
    }
    
    .div_select .sub_category>li:hover {
        background-color: #f0f0f0
    }
    
    ul.category_box_select>li:hover {
        background-color: #f6f6f6;
        color: #5188a6;
        cursor: pointer
    }
    
    .pop {
        width: 1050px
    }
    
    #pop {
        height: 562px
    }
    
    .load-img {
        text-align: center;
        margin-bottom: 30px;
        margin-top: 38px
    }
    
    .load-img img {
        width: 102px;
        height: 102px
    }
    
    .load-font {
        margin: 0 auto;
        width: 910px;
        font-size: 18px;
        color: #666;
        text-align: center;
        margin-bottom: 35px
    }
    
    .blue-font {
        width: 910px;
        margin: 0 auto;
        height: 30px;
        background-color: #eef9ff;
        color: #999;
        line-height: 30px;
        text-align: center;
        font-size: 12px
    }
    
    .has-show .product-baike {
        width: 910px;
        margin: 0 auto;
        height: 84px
    }
    
    .has-show {
        margin-top: 15px
    }
    
    .has-show .product-baike div {
        float: left
    }
    
    .has-show .product-baike .product-right {
        width: 810px;
        margin-left: 14px
    }
    
    .has-show .product-baike div {
        float: left
    }
    
    .has-show .product-baike .product-right .pro-ul1 {
        list-style-type: none;
        height: 80px
    }
    
    .has-show .product-baike .product-right .li1 {
        margin-top: 2px;
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        width: 810px;
        overflow: hidden;
        height: 23px;
        line-height: 23px
    }
    
    .has-show .product-baike .product-right .li2 {
        font-size: 12px;
        color: #666;
        margin-bottom: 5px
    }
    
    .has-show .product-baike .product-right .li3 {
        color: #999;
        font-size: 12px
    }
    
    .has-show .two-button {
        clear: both;
        margin: 0 auto;
        width: 910px;
        text-align: center;
        border-top: 1px solid #efefef;
        margin-top: 20px
    }
    
    .has-show .two-button .goon {
        background-color: #f04848;
        margin-left: 30px
    }
    
    .has-show .two-button a {
        display: inline-block;
        width: 265px;
        height: 55px;
        background-color: #f04848;
        border-radius: 2px;
        line-height: 55px;
        color: white;
        font-size: 17px;
        text-align: center;
        margin-top: 32px;
        margin-bottom: 30px
    }
    
    .has-showed {
        padding-top: 40px
    }
    
    .has-showed .divide-line {
        width: 910px;
        height: 20px;
        margin: 0 auto;
        color: #da1b16
    }
    
    .has-showed .divide-line span {
        display: inline-block;
        font-size: 16px;
        *display: inline;
        *zoom: 1
    }
    
    .has-showed .divide-line .line-first {
        width: 325px;
        height: 5px;
        border-top: 1px solid red;
        margin-right: 14px;
        margin-top: -5px
    }
    
    .has-showed .divide-line .line-last {
        width: 325px;
        height: 5px;
        border-top: 1px solid red;
        margin-left: 14px
    }
    
    .has-showed .product-content {
        width: 910px;
        margin: 0 auto;
        height: 95px;
        margin-top: 26px;
        margin-bottom: 18px
    }
    
    .has-showed .product-content div {
        float: left
    }
    
    .has-showed .product-content .product-infor {
        margin-left: 13px;
        width: 800px;
        float: left
    }
    
    .has-showed .product-content .product-infor ul {
        list-style-type: none
    }
    
    .has-showed .product-content .product-infor ul .information1 {
        font-size: 14px;
        margin-bottom: 10px;
        float: left;
        width: 800px;
        height: 25px;
        line-height: 25px;
        max-height: 50px;
        overflow: hidden
    }
    
    .has-showed .product-content .product-infor ul .information1 .infor1-div {
        float: left;
        height: 25px;
        width: 550px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    
    .has-showed .product-content .product-infor ul .information2 {
        font-size: 12px;
        color: #4e4e4e;
        height: 20px;
        overflow: hidden;
        line-height: 20px;
        clear: both
    }
    
    .has-showed .product-content .product-infor ul .information1 .red-tag {
        display: inline-block;
        background-color: #f5f5f5;
        color: #f04848;
        text-align: center;
        margin-right: 5px;
        font-size: 12px;
        float: left;
        padding-left: 5px;
        padding-right: 5px
    }
    
    .has-showed .product-content .product-infor ul .information3 {
        font-size: 14px;
        color: #da1b16;
        clear: both;
        margin-top: 10px
    }
    
    .has-showed .product-content .product-infor ul .information3 span {
        font-size: 20px
    }
    
    .has-showed .product-content .product-user {
        font-size: 12px;
        color: #999;
        float: right
    }
    
    .has-showed .product-content .product-user span {
        color: #999
    }
    
    .has-showed .product-content .product-user .user-name {
        overflow: hidden;
        width: 50px;
        color: #333
    }
    
    .has-showed .product-content .product-user .user-time {
        color: #333
    }
    
    .has-showed .red-font {
        clear: both;
        width: 910px;
        margin: 0 auto;
        height: 35px;
        background-color: #feeded;
        color: #da1b16;
        line-height: 35px;
        text-align: center;
        margin-bottom: 10px;
        font-size: 12px
    }
    
    .has-showed .blue-font {
        width: 910px;
        margin: 0 auto;
        height: 30px;
        background-color: #eef9ff;
        color: #999;
        line-height: 30px;
        text-align: center
    }
    
    .has-showed .product-baike {
        width: 910px;
        margin: 0 auto;
        display: table;
        margin-top: 10px
    }
    
    .has-showed .product-baike div {
        float: left
    }
    
    .has-showed .product-baike .product-right {
        width: 810px;
        margin-left: 14px
    }
    
    .has-showed .product-baike .product-right .pro-ul1 {
        list-style-type: none;
        height: 80px
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li {
        height: 45px;
        border-top: 1px dashed #efefef;
        line-height: 45px;
        text-decoration: none;
        position: relative
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li a {
        margin-left: 7px;
        color: #666;
        font-size: 14px;
        margin-right: 2px
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li .span-time {
        color: #999;
        font-size: 12px
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li .money-span {
        display: inline-block;
        position: absolute;
        right: 0;
        color: #f04848;
        font-size: 20px;
        *display: inline;
        *zoom: 1
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li .money-span i {
        font-size: 12px
    }
    
    .has-showed .product-baike .product-right .pro-ul2 li .span-text {
        display: inline-block;
        height: 20px;
        width: 60px;
        color: #f04848;
        background-color: #f5f5f5;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        *display: inline;
        *zoom: 1
    }
    
    .has-showed .product-baike .product-right .li1 {
        margin-top: 2px;
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        width: 810px;
        overflow: hidden;
        height: 23px;
        line-height: 23px
    }
    
    .has-showed .product-baike .product-right .li2 {
        font-size: 12px;
        color: #666;
        margin-bottom: 5px
    }
    
    .has-showed .product-baike .product-right .li3 {
        color: #999;
        font-size: 12px
    }
    
    .has-showed .two-button {
        clear: both;
        margin: 0 auto;
        width: 910px;
        text-align: center;
        border-top: 1px solid #efefef;
        position: relative
    }
    
    .has-showed .two-button>a {
        display: inline-block;
        width: 265px;
        height: 55px;
        background-color: #f04848;
        border-radius: 2px;
        line-height: 55px;
        color: white;
        font-size: 17px;
        text-align: center;
        margin-top: 32px;
        margin-bottom: 50px;
        *display: inline;
        *zoom: 1
    }
    
    .has-showed .two-button span.signout {
        font-size: 14px;
        color: #999;
        position: absolute;
        right: 0;
        top: 70px;
        cursor: pointer
    }
    
    .has-showed .two-button .goon {
        background-color: #cbcbcb;
        margin-left: 30px
    }
    
    .category_box li .li_item a,
    .category_box_select li .li_item a,
    .category_box_select li .li_item font {
        color: #666
    }
    
    .os-content .os-set:hover .shadow {
        display: inline
    }
    
    .os-content .os-set:hover .mask {
        display: inline
    }
    
    .os-content .os-set:hover span.i-delete-order {
        display: inline
    }
    
    .os-content>div img {
        width: auto;
        height: 100%;
        vertical-align: top
    }
    
    .os-content>div {
        float: left;
        position: relative;
        cursor: pointer;
        width: 120px;
        height: 120px;
        margin-right: 10px
    }
    
    .os-content p {
        clear: both
    }
    
    .os-content>div span.shadow {
        background-color: black;
        opacity: .4;
        filter: Alpha(opacity=40);
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        display: none
    }
    
    .os-content>div .i-delete-order {
        width: 20px;
        height: 20px;
        background-color: black;
        opacity: .2;
        filter: Alpha(opacity=20);
        right: -10px;
        top: -10px;
        position: absolute;
        cursor: pointer;
        z-index: 11;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        display: none
    }
    
    .baoliao-error {
        display: none
    }
    
    .view-rules,
    .view-rules-faxian {
        text-align: center;
        font-size: 12px;
        color: #666
    }
    
    .view-rules-faxian {
        margin: 35px auto 10px
    }
    
    .rules {
        background-color: white;
        display: none;
        width: 500px;
        margin: 0 auto;
        font-size: 12px;
        color: #666;
        border-radius: 4px;
        padding: 10px;
        border: 1px solid #e7e7e7
    }
    
    .rules p {
        line-height: 20px
    }
    
    .bottom-radius-none {
        border-bottom-right-radius: 0!important;
        border-bottom-left-radius: 0!important;
        border-bottom: none!important
    }
    
    .input-focus {
        background-color: #fff!important;
        border-color: #dcdcdc!important
    }
    
    .ui-widget-content {
        border: 1px solid #dcdcdc
    }
    
    .color-lighter {
        color: #999!important
    }
    
    .preview-pop,
    .number-pop,
    .one-price-pop {
        width: 480px
    }
    
    .number-pop .pop-content {
        font-size: 18px
    }
    
    #focus_pic-error {
        position: relative;
        margin-bottom: 0
    }
    
    .product-img:before,
    .product-img:after {
        content: "";
        display: table;
        clear: both
    }
    
    .preview-pop,
    .number-pop .pop_info span,
    .number-pop .pop_info span,
    .one-price-pop .pop_info span {
        color: #f04848
    }
    
    .one-price-pop .one-price-cancel {
        background: #f04848
    }
    
    #un-item-number-error {
        margin: 50px 0 0 100px
    }
    
    div.select-radio-vip {
        margin-top: 30px
    }
    
    div.select-radio-vip .pn-text {
        line-height: 24px
    }
    
    .product-number .pn-text {
        line-height: 50px
    }
    
    .upload-img-box {
        width: 100%;
        height: 100%;
        overflow: hidden
    }
    
    .os-content label {
        float: left
    }
    
    .error-border {
        border-color: #f04848!important
    }
    
    .baoliao-tip {
        font-size: 12px;
        color: #999;
        padding-left: 16px;
        height: 18px;
        line-height: 18px;
        background: url(https://res.smzdm.com/resources/public/img/baoliao_tip.png) no-repeat left 2px;
        background-size: 12px auto;
        position: absolute;
        margin-top: 5px
    }
    
    .product-brand {
        margin-top: 34px!important
    }
    
    .layerContentFail {}
    
    .preview-pop .pop_name {
        color: #333
    }
    
    .input-disabled {
        background-color: #b2b2b2!important;
        color: #fff!important
    }
    
    #againInspectBox,
    #mentionCoupon,
    #denyMedical {
        color: #333!important;
        margin-left: -240px;
        margin-top: -120px;
        width: 480px
    }
    
    #againInspectBox .pop-title,
    #mentionCoupon .pop-title,
    #denyMedical .pop-title {
        border-bottom: 1px #ccc solid
    }
    
    #againInspectBox .pop-content,
    #mentionCoupon .pop-content,
    #denyMedical .pop-content {
        padding: 0 30px 30px 30px!important
    }
    
    #againInspectBox .pop_width_320,
    #mentionCoupon .pop_width_320,
    #denyMedical.pop_width_320 {
        width: auto!important;
        text-align: center
    }
    
    #againInspectBox .pop_info,
    #mentionCoupon .pop_info,
    #denyMedical .pop_info {
        padding: 40px 0;
        font-size: 14px!important
    }
    
    #againInspectBox .pop_info span,
    #mentionCoupon .pop_info span {
        color: #f04848!important
    }
    
    #againInspectBox .pop_info span.gray,
    #mentionCoupon .pop_info span.gray,
    #denyMedical .pop_info span.gray {
        color: #333!important
    }
    
    #mentionCoupon a.a_redBlock,
    #denyMedical a.a_redBlock {
        display: inline-block;
        width: 120px;
        margin: 0 10px
    }
    
    .merchants-reported {
        width: 739px;
        height: 122px;
        overflow: hidden;
        background: #f7f8ff;
        border-radius: 5px;
        margin-left: 120px;
        margin-top: 100px
    }
    
    .merchants-reported img {
        float: left;
        width: 134px;
        height: 122px
    }
    
    .merchants-reported .reported-right {
        width: 445px;
        float: left
    }
    
    .merchants-reported .reported-right h3 {
        font-size: 16px;
        color: #333;
        padding: 18px 0 4px 0
    }
    
    .merchants-reported .reported-right p {
        font-size: 12px;
        color: #999;
        line-height: 20px
    }
    
    .merchants-reported a {
        width: 120px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #f04848;
        background: #fff;
        display: inline-block;
        border-radius: 4px;
        margin: 45px 0 0 20px;
        box-shadow: 0 2px 4px 0 rgba(202, 205, 209, 0.50)
    }
    
    .merchants-reported a:hover {
        background: #f5f5f5;
        box-shadow: none
    }
    
    .view-rules {
        position: relative
    }
    
    .rules {
        position: absolute;
        left: 260px;
        top: 25px;
        text-align: left
    }
    
    .reprint {
        margin-top: 30px;
        padding-left: 98px;
        box-sizing: border-box;
        display: none
    }
    
    .reprint p {
        font-size: 12px;
        color: #999
    }
    
    .reprint p a {
        color: #999;
        text-decoration: underline
    }
    
    .succ-reward-tips {
        text-align: center;
        color: #666666;
        font-size: 16px;
        line-height: 30px
    }
</style>