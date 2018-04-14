<template>
	<div id="login-grid">
		<div class="top">
			<div class="nav-top">
				<img src="../../static/img/logo.png" />
				<ul class="slider-ul">
					<li class="nav-active">首页</li>
					<li>首页</li>
					<li>首页</li>
					<li>首页</li>
					<li>首页</li>
				</ul>
				<div class="">
					<button class="nav-login">登录/注册</button>
				</div>
			</div>
		</div>
		<div class="login-content">
			<img id="ad" src="../../static/img/ad.png">
			<div class="login">
				<div class="login-box">
					<ul class="login-or-register">
						<li :class="{ 'login-active': loginActive }" @click="changeLogin">登录</li>
						<li :class="{ 'register-active': registerActive}" @click="changeRegister">注册</li>
					</ul>
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" v-show='showRegister' class="demo-ruleForm">
					  <el-form-item prop="age">
					    <el-input v-model.number="ruleForm2.age" placeholder="请输入手机号"></el-input>
					  </el-form-item>
					  <el-form-item prop="pass">
					    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
					  </el-form-item>
					  <el-form-item prop="checkPass">
					    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
					  </el-form-item>
					  <el-form-item prop="verify" id="verify-num">
					    <el-input v-model.number="ruleForm2.verify" id="register-verify-input" placeholder="验证码"></el-input>
					    <img id="verify-img" src="http://user.youtoupiao.com/index/verify.html" onclick="this.src='http://user.youtoupiao.com/index/verify.html'"/>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitRegister('ruleForm2')" id="register-btn">注册</el-button>
					  </el-form-item>
					</el-form>
					
					<el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="100px" v-show='showLogin' class="demo-ruleForm">
					  <el-form-item prop="age">
					    <el-input v-model.number="ruleForm3.age" placeholder="请输入手机号"></el-input>
					  </el-form-item>
					  <el-form-item prop="pass">
					    <el-input type="password" v-model="ruleForm3.pass" auto-complete="off" placeholder="请输入密码"></el-input>
					  </el-form-item>
					  <el-form-item prop="verify" id="verify-num">
					    <el-input v-model.number="ruleForm3.verify" id="login-verify-input" placeholder="验证码"></el-input>
					    <img id="verify-img" src="http://user.youtoupiao.com/index/verify.html" onclick="this.src='http://user.youtoupiao.com/index/verify.html'"/>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitLogin('ruleForm3')" @keyup.enter="submitLogin('ruleForm3')" id="login-btn">登录</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<footer>
			<p>© 2017 YouTouPiao.Com All Rights Reserved. 陕ICP备17015469号-1 Ser:3 </p>
			<p>版权所有:西安伍拾度网络科技有限公司</p>
		</footer>
	</div>
</template>

<script>
	
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
          	var str=value.toString().length;
            if ( str != 11) {
              callback(new Error('手机号码必须是十一位数'));
            } else {
              callback();
            }
          }
        }, 1000);
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
      var verify = (rule, value, callback) => {
      	    var _this = this;
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
        	callback();
//          this.$http.get(objs.url.verifyNum, {
//          	verify_num:_this.ruleForm2.verify
//          })
//            .then(function (response) {
//            	if(response.data.code == 1){
//            		callback();
//            	}else{
//            		callback(new Error('验证码输入有误'));
//            	}
//            })
//            .catch(function (error) {
//              console.log(error);
//            });
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          verify:''
        },
        ruleForm3: {
          pass: '',
          checkPass: '',
          age: '',
          verify:''
        },
      	showRegister:false,
        showLogin:true,
        scanLogin:false,
        
        loginActive:true,
        registerActive:false,
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
          verify: [
            { validator: verify, trigger: 'blur' }
          ]
        },
        rules3: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          verify: [
            { validator: verify, trigger: 'blur' }
          ]
		}
 	};
 },
 methods: {
 		registerSuccess: function(title) {
 			this.$notify({
 				title: '成功',
 				message: title,
 				type: 'success'
 			});
 		},
 		loginFail:function(title){
 			this.$notify({
 				title: '失败',
 				message: title,
 				type: 'error'
 			});
 		},
 		registerFail: function(title) {
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
 		numLogin: function() {
 			this.loginActive = true;
 			this.registerActive = false;

 			this.showLogin = true;
 			this.showRegister = false;
 			this.scanLogin = false;
 		},
 		scanLoginBtn: function() {
 			this.loginActive = true;
 			this.registerActive = false;

 			this.showLogin = false;
 			this.showRegister = false;
 			this.scanLogin = true;
 		},
 		changeLogin: function() {
 			this.loginActive = true;
 			this.registerActive = false;

 			this.showLogin = true;
 			this.showRegister = false;
 			this.scanLogin = false;
 		},
 		changeRegister: function() {
 			this.loginActive = false;
 			this.registerActive = true;

 			this.showLogin = false;
 			this.showRegister = true;
 			this.scanLogin = false;
 		},
 		submitRegister: function(formName) {
 			var _this = this;
 				this.$refs[formName].validate((valid) => {
 					if(valid) {
			            _this.ajaxData(_this,objs.url.register,{
						            	iphone_num:_this.ruleForm2.age,
						            	password:_this.ruleForm2.pass,
			            				verify:_this.ruleForm3.verify
			            },function(e,data){
							if(e){
								var title=data.msg;
					            _this.registerSuccess(title);
					 			_this.loginActive = true;
					 			_this.registerActive = false;
					 			_this.showLogin = true;
					 			_this.showRegister = false;
					 			_this.scanLogin = false;
							}
						});
			          } else {
			            return false;
			          }
	        });
    	},
    	submitLogin:function(formName){
 			var _this = this;
 				this.$refs[formName].validate((valid) => {
 					if(valid) {
			            _this.ajaxData(_this,objs.url.login,{
			            	iphone_num:_this.ruleForm3.age,
			            	password:_this.ruleForm3.pass,
			            	verify:_this.ruleForm3.verify
			            },function(e,data){
							if(e){
								_this.$store.state.userId=JSON.stringify(data.data);
								console.log(_this.$store.state.userId);
								var str=JSON.stringify(data.data);
								localStorage.setItem("userINfo", str);
								_this.$router.push({ path: '/readMonitor' })
							}
						});
			          } else {
			            return false;
			          }
	        });
    	},
    	logintitle:function(){
        	document.title=objs.page_config.pageName[0].loginPage;
        }
    },
    mounted(){
    	this.logintitle();
    }
  }
</script>
<style>
	footer{
		width: 100%;
		height: 100px;
		position: fixed;
		bottom: 0;
		left: 0;
		color: #515A6F;
		background-color: #141D33;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nav-active{
		border-bottom: 2px solid #1F5EFF;
		box-sizing: border-box;
	}
	.slider-ul li:hover{
		border-bottom: 2px solid #1F5EFF;
		box-sizing: border-box;
	}
	.top{
		width: 100%;
		height: 60px;
		position: fixed;
		background-color:#fff;
		top: 0;
		left: 0;
		box-shadow: 1px 2px 10px rgba(0,31,109,.4);
	}
	.top .nav-top{
		width: 1200px;
		min-width: 1200px;
		height: 60px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.slider-ul{
		height: 60px;
		position: absolute;
		top: 0;
		left: 300px;		
	}
	.slider-ul li{
		padding: 0 10px;
		margin-right: 20px;
		height: 60px;
		font-size: 14px;
		line-height: 60px;
		color: #333333;
		cursor: pointer;
	}
	.top .nav-top img{
		width: 173px;
		height: 32px;
		display: block;
	}
	.nav-login{
		width: 120px;
		height: 40px;
		background-color: #1F5EFF;
		border-radius: 4px;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}
	.slider-ul{
		display: flex;
	}
	button{
		cursor: pointer;
		outline: none;
		border: none;
	}
	#scan-box{
		width: 100%;
	}
	#scan-box .er-img-grid{
		width: 220px;
		height: 220px;
		margin: 0 auto;
		border: 1px solid #D1D1D1;
		border-radius: 4px;
		margin-bottom: 10px;
	}
	#scan-box .er-img-grid img{
		width: 200px;
		height: 200px;
		display: block;
		margin: 10px auto;
	}
	.scan-warn{
		font-size:14px;
		color: #494F67;
		text-align: center;
	}
a {
  color: #42b983;
  text-decoration: none;
}
html,body{
	width: 100%;
	height: 100%;
	position: relative;
	background-color:#F2F6FC; 
}
#login-grid{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
#login-grid .login-content{
	width: 1200px;
	min-width: 1200px;
	background-color:#fff ;
	height: 460px;
	display: flex;
}
#id{
	width: 480px;
	height: 460px;
}
.login{
	width: 720px;
	height: 460px;
	box-shadow: 1px 0 25px #E2E2E2;
}
.login-box{
	padding:20px 168px;
}
.login-or-register{
	width: 100%;
	margin-bottom: 20px;
	display: flex;
	justify-content: flex-start;
	border-bottom: 1px solid #EEEEEE;
}
.login-or-register li{
	padding: 10px 20px;
	cursor: pointer;
}
.login-active{
	border-bottom: 2px solid #1F5EFF;
}
.register-active{
	border-bottom: 2px solid #1F5EFF;
}
.login-box .el-form-item__content{
	margin-left: 0 !important;
}
#verify-num .el-form-item__content{
	width: 100%;
}
#verify-num .el-input{
	width: 50%;
}
#verify-img{
	height: 40px;
	float: right;
}
#login-btn{
	width: 100%;
	height: 46px;
	background-color: #1F5EFF !important;
}
#register-btn{
	width: 100%;
	height: 46px;
	background-color: #1F5EFF !important;
}
#scan-btn{
	width: 100%;
	height: 46px;
	color: #1F5EFF;
	background: #fff !important;
	border: 1px solid #1F5EFF;
}
#nubLogin-btn{	
	width: 100%;
	height: 46px;
	margin-top: 23px;
	color: #1F5EFF;
	background: #fff;
	border: 1px solid #1F5EFF;
	border-radius: 4px;
	
}
</style>