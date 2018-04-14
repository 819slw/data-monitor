import Vue from 'vue'
import App from './App' 
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'
import all from '../static/js/const.js'
import Vuex from 'vuex'

Vue.prototype.$echarts = echarts 
Vue.prototype.$http = axios
Vue.prototype.$all = all
Vue.prototype.$fail = function(_this,title){
 			_this.$notify({
 				title: '失败',
 				message: title,
 				type: 'error'
 			});
}
Vue.prototype.$error = function(_this){
 			_this.$notify({
 				title: '失败',
 				message: '请求异常，请刷新重试或联系管理员查看',
 				type: 'error'
 			});
}
Vue.prototype.ajaxData = function(_this,url,data,callback,fail){
            _this.$http.post(url,data)
              .then(function (response) {
	              	var data=response.data;
	              	var title=response.data.msg;
	              	if(response.data.code == 1){
	              		callback(true,data);
	              	}else{
	              		callback(false,data);
	              		_this.$fail(_this,title);
	              	}
              })
              .catch(function (error) {
	                if(error.data && error.data.data.msg){
	                	var title=error.data.msg;
	                	_this.$fail(_this,title);
	                }else{
	                	_this.$error(_this);
	                }
              });
}

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)

const store = new Vuex.Store({
	state: {
		adminleftnavnum: "2", //管理后台左侧导航
		indexParticular:'',
		addMonitors:[],
		userId:[]
	},
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


