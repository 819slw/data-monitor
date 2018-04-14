<template>
    <div class="">
        <topSearch></topSearch>
        <allActivity></allActivity>
    </div>
</template>

<script>
	import topSearch from './topSearch'
	import allActivity from './allActivity'
  export default {

    components:{
    	'topSearch':topSearch,
    	'allActivity':allActivity
    },
  };
</script>
<style scoped>
 @import "../../static/css/activity.css"
</style>