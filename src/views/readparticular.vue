<template>
	<div class="">
		<particular></particular>
	</div>
</template>

<script>
	import topSearch from './topSearch'
	import allActivity from './allActivity'
	import particular from './particular'
	
	export default {
	    components:{
	    	'topSearch':topSearch,
	    	'particular':particular
	    }
	}
</script>
<style scoped>
 @import "../../static/css/activity.css"
</style>