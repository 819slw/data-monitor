<template>
	<div id="perconalCenter">
		<div class="perconalCenter">
			<p class="left-top-title"><span class="bar"></span>个人中心</p>
			<div class="perconalCenter-table">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="当前套餐" prop="name">
				    <span class="user-ID">{{ grade }}</span>   
				  </el-form-item>
				  <el-form-item label="用户名" prop="name">
				    <el-input type="text" disabled :value="name" auto-complete="off"></el-input> 
				  </el-form-item>
				  <el-form-item label="手机号" prop="name">
				    <el-input :value="ipone_num" disabled></el-input>         
				  </el-form-item>
				  <el-form-item label="当前密码" prop="oldpass">
				    <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')">修改密码</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
      	var str=value;
      	var strLength=str.toString();
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }

      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (strLength.length != 11) {
          callback(new Error('必须是十一位'));
        } else {
          callback();
        }
      }
      };
      
      var ipnoneNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入当前密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          oldpass:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          oldpass: [
            { validator: ipnoneNum, trigger: 'blur' }
          ]
        },
        ipone_num:0,
        grade:'',
        name:''
      };
    },
    methods: {
    	 amendSuccess: function(title) {
 			this.$notify({
 				title: '成功',
 				message: title,
 				type: 'success'
 			});
 		},
 		amendFail: function(title) {
 			this.$notify({
 				title: '失败',
 				message: title,
 				type: 'error'
 			});
 		},
 		 backFailWarn: function() {
 			this.$notify({
 				title: '失败',
 				message: title,
 				type: '请求异常，请刷新重试或联系管理员查看'
 			});
 		},
      submitForm(formName) {
		var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	var userInfo=JSON.parse(localStorage.getItem("userINfo"));
          	var id=userInfo[0].id;
            _this.ajaxData(_this,objs.url.checkIpone,{
            	id:id,
            	user_ipone:_this.ruleForm2.age
            },function(e,data){
				if(e){
		            _this.ajaxData(_this,objs.url.amendPassword,{
			            	id:id,
			            	user_password:_this.ruleForm2.pass
		            },function(e,data){
						if(e){
							var warn=data.msg;
							_this.amendSuccess(warn);  
						}
					})
				}
			})
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      title:function(){
      	document.title=objs.page_config.pageName[2].personalCenter;
      },
      init(){
      	var initInfo=JSON.parse(localStorage.getItem("userINfo"));
      	this.grade=initInfo[0].grade;
      	this.name=initInfo[0].name;
      	this.ipone_num=initInfo[0].ipone_num;
      }
    },
    mounted(){
    	this.title();
    	this.init();
    }
  }
</script>

<style scoped>
	.user-ID{
		font-size: 12px;
		color: #fff;
		padding: 4px 8px;
		background-color: #55D06C;
		border-radius: 18px;
	}
	.perconalCenter-table{
		width: 400px;
		margin-top: 50px;
	}
	.perconalCenter input{
		width: 240px;
	}
	.perconalCenter{
		padding: 20px;
		background-color: #fff;
		border-radius: 4px;
	}
    .bar{
        width:4px;
        height:20px; 
        display: inline-block;
        background:rgba(225,60,139,1);
        margin-right: 6px;
    }
    .left-top-title{
        color: #494F67;
        font-size: 20px;
        display: flex;
        align-items: center;
    }
    .el-button--primary{
		width: 156px;
	    height: 46px;
	    display: block;
	    margin: 0 auto;
	    text-align: center;
	    font-size: 16px;
	    color: #fff;
	    border-radius: 4px;
	    border: none;
	    outline: none;
	    background: -webkit-gradient(linear, right top, left top, from(#F56452), to(#EF3B8E)) !important;
	    background: linear-gradient(to left, #F56452, #EF3B8E) !important;
		-webkit-box-shadow: 1px 2px 6px #F4378D;
   		box-shadow: 1px 2px 20px #F4378D;
    }
   	.el-button--primary:hover{
		width: 156px;
	    height: 46px;
	    display: block;
	    margin: 0 auto;
	    text-align: center;
	    font-size: 16px;
	    color: #fff;
	    border-radius: 4px;
	    border: none;
	    outline: none;
	    background: -webkit-gradient(linear, right top, left top, from(#F56452), to(#EF3B8E)) !important;
	    background: linear-gradient(to left, #F56452, #EF3B8E) !important;
    }
    .el-form-item__content{
    	margin-left: 150px !important;
    }
    .el-form-item__content button{
    	margin-left: 0 !important;
    	margin-top: 20px !important;
    }
    .el-input__suffix{
    	right: -20px;
    }
</style>