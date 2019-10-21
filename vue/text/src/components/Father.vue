<template>
<div class="father">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    </el-form>
    <!-- 调用子组件 -->
    <!-- 当父组件数据填写完成之后，点击提交，调用子组件 -->
    <div v-if="show">

      <!-- 1.静态传递 -->
        <!-- <Child password='更改成功'></Child>  通过自定义属性传递数据 -->

      <!-- 2.动态传递 -->
        <Child :password='this.ruleForm.checkPass' @getChild='getSuccess' ref="child"></Child>





        <!-- <Child v-bind:password='this.ruleForm.checkPass'></Child> -->
    </div>
</div>
</template>
<script>
// 引入子组件
import Child from './Child';
 export default {
    data() {
      // 对表单提交，进行简单的校验，可忽略
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      // 对表单提交，进行简单的校验，可忽略

      return {
        // 表单中绑定的数据
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },

      // 对表单提交，进行简单的校验，可忽略
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
      // 对表单提交，进行简单的校验，可忽略

        show: false,
      };
    },
   // 引入子组件
    components: {
        Child
    },
    methods: {
      // 调用方法,接收传值
      getSuccess (value) {
        console.log(value);
            this.$message({
                message: value,
                type: 'success'
            });
      },
      // 点击提交，调用方法
      submitForm(formName) {
        
      // 对表单提交，进行简单的校验，可忽略
        this.$refs[formName].validate((valid) => {
      // 对表单提交，进行简单的校验，可忽略

          if (valid) {
            // 当校验成功时，显示子组件
            // console.log('submit!');
            this.show = true;

            // 调用子组件的方法
            this.$refs.child.getMessage(this.detail);

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.father{
  margin: 0 auto;
  text-align: center;
}
.father form{
  width: 80%;
  margin: 0 auto;
}
</style>