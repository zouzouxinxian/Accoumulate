<template>
<div class="up">
    <el-row>
    <h2 class="text-left">第一种样式上传方法：</h2>
		<el-col :span="8" :offset="8">
			<div id="upload">
        <!--elementui的form组件-->
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="活动名称">
						<el-input v-model="form.name" name="names" style="width:360px;"></el-input>
					</el-form-item>

          <label class="el-form-item__label" style="width: 80px;">上传图片</label>
          <!--elementui的上传图片的upload组件-->
          <!--
            :auto-upload=false  // 取消自动上传
            :on-remove="handleRemove" // 处理删除图片的操作
            :on-change="onchange" // 通过onchange这个属性来获取现在的图片和所有准备上传的图片
            :limit=1 // 限制只能上传一张，这里暂时只考虑一张图片的情况
            drag // 设置这个让可以把图片拖进来上传
            action="" // 这里暂时不设置上传地址，因为我们是要拦截在form中上传
            -->

          <el-upload
            class="upload-demo"
            :auto-upload=false
            :on-change="onchange"
            :on-remove="handleRemove"
            :limit=1
            drag
            action=""
            style="margin-left:80px;">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">这里只能上传一张,如需更换请先手动删除列表中的！</div>
          </el-upload>
          <el-form-item style="padding-top:20px;">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
				</el-form>
			</div>
		</el-col>

		<!--展示选中图片的区域-->
		<el-col :span="4" >
			<div style="width:100%;overflow: hidden;margin-left:150px;">
				<img :src="src" alt="" style="width:100%;"/>
			</div>
		</el-col>
	</el-row>
    <el-row>
    <h2 class="text-left">第二种样式上传方法：</h2>
		<el-col :span="8" :offset="8">
			<div id="upload2">
        <!--elementui的form组件-->
				<el-form ref="form2" :model="form2" label-width="80px">
					<el-form-item label="活动名称">
						<el-input v-model="form2.name" name="names" style="width:360px;"></el-input>
					</el-form-item>

          <el-form-item label-width="80px" label="上传图片">
            <!--elementui的上传图片的upload组件-->
            <el-upload
              class="upload-demo"
              action=""
              :limit=1
              :auto-upload=false
              :on-change="onchange2"
              :on-remove="handleRemove2"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>

					<el-form-item style="padding-top:20px;" >
						<el-button type="primary" @click="onSubmit2">立即创建</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
	</el-row>
</div>
</template>
<script>
import iview from 'iview';
import ElementUI from 'element-ui';
    export default {
        name: 'Up',
        data () {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                fileList2:[],
				form: {//form里面的参数
		            name: ''
                },
                form2: {
                name: ''
                },
                param:"",//表单要提交的参数
                params2:{},
                src:"https://afp.alicdn.com/afp-creative/creative/u124884735/14945f2171400c10764ab8f3468470e4.jpg" //展示图片的地址
            };
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            	beforeRemove(file, fileList) {
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//阻止upload的自己上传，进行再操作
			onchange(file,filesList) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;
				this.src=windowURL.createObjectURL(file.raw);
				//重新写一个表单上传的方法
				this.param = new FormData();
				this.param.append('file', file.raw, file.name);
				// return false;
            },
            onchange2(file,filesList){
                this.param2 = new FormData();
                        this.param2.append('file', file.raw, file.name);
            },
            handleRemove(file,filesList){
                this.param.delete('file')
            },
            handleRemove2(file,filesList){
                this.param2.delete('file')
            },
            onSubmit(){//表单提交的事件
                    var names = this.form.name;
                    //下面append的东西就会到form表单数据的fields中；
                    this.param.append('message', names);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    //然后通过下面的方式把内容通过axios来传到后台
                    //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
                    this.$reqs.post("/upload", this.param, config).then(function(result) {
                                    console.log(result);
                    })
            },
            onSubmit2(){//表单提交的事件
                    var names = this.form2.name;
                    //下面append的东西就会到form表单数据的fields中；
                    this.param2.append('message', names);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    //然后通过下面的方式把内容通过axios来传到后台
                    //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
                    this.$reqs.post("/upload", this.param2, config).then(function(result) {
                                    console.log(result);
                    })
			}
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
@import url("//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css");
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
