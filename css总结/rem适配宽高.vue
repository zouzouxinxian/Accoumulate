<template>
    <div class="newuser">
        <div class="container">
            <div class="content">
                <img src="https://res.smzdm.com/h5/h5_haojia/dist/img/share-quota-top.png" alt="" class="share-quota-top">
                <p class="txt"> 你还忙碌于多家电商各种比价只想找到心仪好价？你还迷路在海量商品大海捞针只为入手心动好物？</p>
                <img src="https://res.smzdm.com/h5/h5_haojia/dist/img/share-quota-bottom.png" alt="" class="share-quota-bottom">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
        };
    },
    computed: {
    },
    beforeMount () {
    },
    mounted () {
    },
    components: {
    },
    watch: {
    },
    methods: {
    },
    // 使用js 进行rem计算
    beforeCreate () {
        let html = document.querySelector('html');
        let docWidth = html.getBoundingClientRect().width;
        if (!docWidth) return;
        if (docWidth > 750) {
            html.style.fontSize = 750 / 10 + 'px';
        } else {
            html.style.fontSize = docWidth * 0.1 + 'px';
        }
    },
    created () {
    }
};
</script>
<style lang="scss">
    @import 'src/commons/styles/common.scss';
    // 一。sass进行rem计算
    @function rem($px) {
        @return $px/75 * 2rem;
    }
    img {
        width: rem(250);
        // 此时的px为单倍像素值
    }
</style>
