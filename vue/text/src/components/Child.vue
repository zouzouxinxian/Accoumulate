<template>
<div class="child">
    <el-alert
        title="新密码:"
        type="success">
        <span>{{password}}</span>
        <!-- 可直接使用从父组件接收的数据 -->
    </el-alert>
    <!-- 添加一个按钮，点击调用方法，再向父组件传值 -->
    <el-button @click="handleClick">确定</el-button>
</div>
</template>
<script>
import Child from './Child';
import Brother from './Borther';
 export default {
    data() {
      return {
        show: false,
        password: '',
        message: '请记住密码'
      };
    },
    props: {
        password: String
        // 自定义一个属性
    },
    components: {
      Brother
    },
    methods: {
        handleClick () {
            // 向父组件传值
            this.$emit('getChild', this.message);

            // 兄弟组件传值
            Brother.$emit('getChild', this.message);
            
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body .child .el-alert__content {
    margin: 0 auto;
}
</style>