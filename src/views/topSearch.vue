<template>
        <el-container>
            <el-row>
                <el-col :span="13">
                    <div class="grid-content bg-purple">
                        <p class="left-top-title"><span class="bar"></span><span class="step-font">STEP.1</span>阅读数监控</p>
                        <div class="search-read">
                            <div class="search-grid">
                                <input type="text" placeholder="请输入公众号链接" v-model="publicContent" />
                                <button class="" @click="searchClick"><i class="el-icon-search"></i>搜索</button>
                            </div>
                            <p class="warn-word">可对公众号发文进行预测监控或即时监控，提供分钟级的文章阅读数点赞监测，掌握公众号文章阅读走向。</p>
                            <div class="monitor-example-grid">
	                            <div class="monitor-example" v-for="item in linkContent">
	                                <img :src="item.img" alt="活动图片" />
	                                <p class="monitor-example-info">{{ item.title }}</p>
	                            </div>
	                            <p class="monitor-example-info">{{ searchError }}</p>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple-light">
                        <p class="left-top-title"><span class="bar"></span><span class="step-font">STEP.2</span>监控设置</p>
                        <div class="set-time">
							<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
							  <el-form-item label="开始时间" prop="pass">
							  <el-date-picker
							    v-model="ruleForm2.pass"
							    type="date"
							    class="change-i"
							    placeholder="选择日期">
							  </el-date-picker>
							  </el-form-item>
							  <el-form-item label="监测时长" prop="age">
								<el-select v-model="ruleForm2.age" clearable placeholder="请选择">
								    <el-option
								      v-for="item in frequency"
								      :key="item.times"
								      :label="item.title"
								      :value="item.times">
								    </el-option>
								</el-select>
							  </el-form-item>
							  <el-form-item label="监控频率" prop="checkPass">
								<el-select v-model="ruleForm2.checkPass" clearable placeholder="请选择">
								    <el-option
								      v-for="item in cycle"
								      :key="item.times"
								      :label="item.title"
								      :value="item.times">
								    </el-option>
								</el-select>
							  </el-form-item>  
							  <el-form-item>
							    <el-tooltip :disabled="disabled"  :class="{ 'start-monitor-Active': active, 'start-monitor': startmonitor }"  effect="dark" content="请先输入推文链接" placement="right">
							      <el-button @click="submitForm('ruleForm2')">开始监控</el-button>
							    </el-tooltip>
							  </el-form-item>
							</el-form>                
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-container>   
</template>

<script>
	export default{
		data(){
		      var checkAge = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('监测时长不能为空'));
		        }else{
		        	callback();
		        }
		      };
		      var validatePass = (rule, value, callback) => {
		        if (!value) {
		          callback(new Error('时间不能为空'));
		        }else{
		        	callback();
		        }
		      };
		      var validatePass2 = (rule, value, callback) => {
		        if (!value) {
		          callback(new Error('监控频率不能为空'));
		        }else{
		        	callback();
		        }
		      };
			return{
		        ruleForm2: {
		          pass: '',
		          checkPass: '',
		          age: ''
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
		          ]
		        },
				disabled:false,
				active:false,
				startmonitor:true,
				cycle:null,
				frequency:null,
				linkContent:'',
				publicContent:"",
				orStart:false,
				searchError:'',
				pickerOptions1: {
		          disabledDate(time) {
		            return time.getTime() > Date.now();
		          },
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        },
		        monitorLongs: '',
		        monitorRates:'',
		        monitorDate:'',
		        rules: {
		          date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		        }
			}
		},
		methods:{
			monitorSuccess: function(title) {
	 			this.$notify({
	 				title: '成功',
	 				message: title,
	 				type: 'success'
	 			});
	 		},
			monitorFail: function(title) {
	 			this.$notify({
	 				title: '失败',
	 				message: title,
	 				type: 'success'
	 			});
	 		},
	 		 backFailWarn: function() {
	 			this.$notify({
	 				title: '失败',
	 				message: title,
	 				type: '请求异常，请刷新重试或联系管理员查看'
	 			});
	 		},
			searchClick:function(){
				this.searchError='';
	            var _this = this;
	            var url=objs.url.searchPublic;
	            if(this.publicContent){
		            _this.ajaxData(_this,url,{
		            	public_content: _this.publicContent
		            },function(e,data){
						if(e){
			                _this.linkContent = data.data;
			                _this.orStart=true;
			                _this.active=true;
			                _this.startmonitor=false;
			                _this.disabled=true;
						}else{
							_this.searchError = data.msg;
						}
					})
	            }
			},
	      submitForm(formName) {
	      	var url=objs.url.addMonitor;
	      	var _this=this;
	      	var title;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
				if(this.orStart){
		            _this.ajaxData(_this,url,{
		            	id:this.$store.state.userId,
		            	public_content: _this.publicContent,
		            	monitor_rates: _this.ruleForm2.checkPass,
		            	monitor_time: _this.ruleForm2.age,
		            	monitor_date: _this.ruleForm2.pass
		            },function(e,data){
						if(e){
							var title=data.msg;
		              		_this.monitorSuccess(title);
		                	_this.orStart=true;
		                	_this.$store.state.addMonitors=data.data;
						}
					})
				}
	         }else{
	            return false;
	          }
	        });
	      },
			initMonitorTime: function(){
				this.cycle = objs.page_config.monitorLongs;
				this.frequency = objs.page_config.monitorRates;
			}
		},
		mounted(){
			this.initMonitorTime();
		}
	}
</script>

<style>
 @import "../../static/css/activity.css";
 .el-button:focus, .el-button:hover{
 	color:#fff;
 }
</style>