// 爆料必读
<template>
    <div class="read">
        <!-- <p>{{con}}</p> -->
        <div class="must-read">
            <img src="//www.smzdm.com/resources/img/mustread.png?v=2019051801"><span>爆料必读</span>
            <div class="reading_box_pop box_shadow" style="top: 45px;opacity: 1;">
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
                    <li><a href="http://duihuan.smzdm.com/" target="_blank">值友福利</a>：兑换周边和优惠券；</li>
                    <li><a href="http://test.smzdm.com/" target="_blank">消费众测</a>：不愁参与资格；</li>
                    <li><a href="http://post.smzdm.com/" target="_blank">原创打赏</a>：金币碎银赏出干货；</li>
                    <li><a href="http://2.smzdm.com/" target="_blank">闲置转让</a>：买的放心卖的安心；</li>
                    <li><a href="http://zhiyou.smzdm.com/user/crowd/" target="_blank">幸运屋</a>：见证RP帝诞生。</li>
                </ol>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            // con: 'demo content.'
        };
    }
};
</script>

<style scoped lang="scss">
.must-read {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}
.must-read img {
    position: relative;
    top: 0px;
    right: 10px;
}
.reading_box_pop {
    width: 400px !important;
    height: auto;
    padding: 30px 50px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    position: absolute;
    right: -20px;
    top: 45px;
    text-align: left;
    opacity: 1;
    display: block;
    z-index: 1000;
    text-align: justify;
}
.reading_box_pop span.grey {
    background-color: #e6e6e6;
    float: right;
}
.reading_box_pop p.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
.reading_box_pop ol li {
    color: #666;
}
a {
    color: #5188a6;
    text-decoration: none;
    cursor: pointer;
}
.reading_box_pop ol {
    margin-bottom: 30px;
}
</style>
