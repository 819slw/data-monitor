<template>
	<div id="left-page">
	    <el-menu
	      :default-active="navselected"
	      :router="true"
	      class="el-menu-vertical-demo"
	      :active="navselected"
	      @select="selectItems"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="#18202F"
	      text-color="#6A7885"
	      active-text-color="#E23C8B">
			
			<el-menu-item index="2" :route="{path:'/readMonitor'}">
				<i class="iconfont icon-jiankong"></i>
				<span class="side-font" slot="title">阅读数监控</span>
			</el-menu-item>
			
			<el-menu-item index="3" :route="{path:'/personalCenter'}">
				<i class="iconfont icon-gerenzhongxinkaobei"></i>
				<span class="side-font" slot="title">个人中心</span>
			</el-menu-item>
			
			<!--<el-menu-item index="4" :route="{path:'/personalCenter'}">
				<i class="iconfont icon-fuwushouxufei"></i>
				<span slot="title">购买续费</span>
			</el-menu-item>-->
			
			<el-menu-item index="" @click="backLogin">     
				<i class="iconfont icon-tuichu"></i>
				<span slot="title">退出登录</span>
			</el-menu-item>
	    </el-menu>
	</div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navselected:'2'
    }
  },
    methods: {
    	 backFail: function(title) {
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
    	backLogin:function(){
			var _this = this;
			_this.ajaxData(_this,objs.url.backLogin,{
				id:_this.$store.state.userId
			},function(e,data){
				if(e){
					_this.$router.push({path:'/login'});
				}
			})
    	},
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getNavType(){
		this.navselected=this.$store.state.adminleftnavnum;
		},
      selectItems(index){
		this.$store.state.adminleftnavnum=index;
	  }
    },
    watch: {
	// 监测store.state
	'$store.state.adminleftnavnum': 'getNavType'
	}
}
</script>

<style scoped>
	#left-page{
		height: 100%;
	}
	.el-menu{
		border:none !important;
	}
	.el-menu li i{
		padding-right: 10px;
		padding-left: 30px;
	}
	ul.el-menu-vertical-demo{
		width: 200px !important;
	}
</style>