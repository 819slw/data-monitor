<template>
	<el-container>
	  <el-header><PageHeader></PageHeader></el-header>
		<el-container>
	    <el-aside width="200px"><PageLeft></PageLeft></el-aside>
	    <el-main>
			<router-view></router-view>
	    </el-main>
	  </el-container>
	</el-container> 
</template>
<script>
	import header from '../components/public/header'
	import pageLeft from '../components/public/pageLeft'
	import pageRight from './pageRight'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  	'PageHeader':header,
  	'PageLeft':pageLeft,
  	'pageRight':pageRight
  }
}
</script>

<style scoped>
a {
  color: #42b983;
  text-decoration: none;
}
.el-container.is-vertical{
	height: 100%;
}
.el-aside{
	background-color: #18202F;
}
.el-main{
	background-color: #e7eaee;
	min-width: 1126px;
}
</style>