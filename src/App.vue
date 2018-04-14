<template>
		<router-view></router-view>
</template>

<script>
	import header from './components/public/header'
	import pageLeft from './components/public/pageLeft'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  	'PageHeader':header,
  	'PageLeft':pageLeft
  }
}
</script>

<style>
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
	/*min-width: 1300px;*/
}
</style>