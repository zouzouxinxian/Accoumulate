<template>
    <div class="main">
        <read></read>
        <!-- <demo></demo> -->
    </div>
</template>
<script>
// import Demo from './components/demo.vue';
import Read from './components/read.vue';
export default {
    mounted () {
        // console.log('mounted!');
    },
    components: {
        // Demo,
        Read
    }
};
</script>
<style lang="scss">
    body {
        // background: #ccc;
    }
    body {
        padding: 32px 0 0;
        margin: 0;
        font-family: "Helvetica","Hiragino Sans GB","Microsoft Yahei",sans-serif;
        font-size: 14px;
        color: #333333;
    }
    .main{
        width: 1050px;
        height: 100px;
        margin: 0 auto;
        padding-bottom: 10px;
        position: relative;
    }
</style>
