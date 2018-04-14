import Vue from 'vue'
import Router from 'vue-router'
import readMonitor from '@/views/readMonitor'
import readParticular from '@/views/readparticular'
import personalCenter from '@/views/personalCenter'
import login from '@/views/login'
import allPage from '@/views/allPage'
import pageRight from '@/views/pageRight'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      component: allPage,
      children:[
	      {
	      	path:'readMonitor',
	      	component:readMonitor      	
	      },
	      {
	      	path:'personalCenter',
	      	component:personalCenter,
	      	meta: {
		        title: '个人中心'
		      }
	      },
	      {
	      	path:'readParticular',
	      	component:readParticular,
	      	meta: {
		        title: '数据详情'
		      }
	      }
      ],
      meta: {
        title: '数据监控'
      }
    },
    {
      path: '/pageRight',
      component:pageRight,

      meta: {
        title: '数据监控'
      }
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录页面'
      }
    }
  ],
})
  
