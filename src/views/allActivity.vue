<template>
        <div class="monitor-state">
            <ul class="choose-state">
                <li 
                	:id="item.id" 
                	v-for="(item,index) in monitorKind" 
                	:class="{ activechoose: index==selectItem}"
                	@click="addStyle(index)">{{ item.content }}</li>
            </ul>
            <div class="show-monitor">
<!--                <transition-group tag="div" name="list">-->
	            	<div class="monitor-float" v-for="(item,index) in response">
			                <div class="show-item">
			                    <div class="item-top">
			                        <img :src="item.src" alt="图片"/>
			                        <div class="monitor-content">
			                            <p class="monitor-item-title">{{ item.title }}</p>
			                            <p class="monitor-item-info">{{ item.info }}</p>
			                        </div>
			                        <i class="iconfont icon-lajitong delete-monitor" @click="deleteMonitor(index)"></i>
			                    </div>
			                    <div class="item-middle">
			                    	<div class="location-particular">
			                    		<router-link to="/readParticular">
			                    			<button @click="seeParticular(index)" :class="item.id_particular">查看详情</button>
			                    		</router-link>
			                    	</div>
			                        <div class="middle-word">
			                            <span>阅读数量增量趋势</span>
			                            <span class="stating monitor-ing" v-if="item.state == 1">监控中</span>
			                            <span class="stating monitor-wait" v-else-if="item.state == 2">等待监控</span>
			                            <span class="stating monitor-error" v-else-if="item.state == 3">监控失效</span>
			                            <span class="stating monitor-fail" v-else-if="item.state ==4">监控失败</span>
			                            <span class="stating monitor-success" v-else="item.state == 5">监控完成</span>
			                        </div>
			                        <div :id="item.id" class="myChart">{{ myChart(item.id,item.arrData,item.xData) }}</div>
			                    </div>
			                    <div class="item-bottom">
			                        <div class="monitor-item-time">
			                            2018-03-05 12:24:56
			                        </div>
			                        <div class="monitor-data">
			                            <span class="monitor-visit"><i class="el-icon-view"></i> 游览量: <span class="visit-num">514</span></span>
			                            <span class="monitor-up"><i class="el-icon-star-on"></i> 点赞数: <span class="up-num">71</span></span>
			                        </div>
			                    </div>
			                </div>
	                </div>
      			<!--</transition-group>-->
                <div style="clear:both"></div>
					<el-pagination
					  background
					  :page-size="8"
					  layout="prev, pager, next"
					  :total="total"
					  @current-change="handleCurrentChange"
					  :current-page.sync="currentPage"
					  id="pagination">
					</el-pagination>
            </div>
        </div>
</template>

<script>
  export default {
    data() {
      return {
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
        id:0,
        value1: '',
		nowUrl:objs.url.allMonitor,
        value2: '',
        selectItem:0,
        partiularItem:0,
        response:null,
        currentPage:1,
        total:0,
        showParticularBtn:false,
        particularTable:null,
        scrollSize:window.innerWidth,
        monitorKind:[
        	{id:"allMonitor",content:"全部"},
        	{id:"monitor-stating",content:"监控中"},
        	{id:"monitor-wait",content:"等待监控"},
        	{id:"monitor-error",content:"监控失效"},
        	{id:"monitor-fail",content:"监控失败"},
        	{id:"monitor-success",content:"监控完成"}
        ],
        chartData:null,
        chartDate:null,
      };
    },
      methods: {
      	handleCurrentChange:function(currentPage){
            var _this = this;
            _this.ajaxData(_this,this.nowUrl,{
            	type:_this.selectItem,
            	page_num:currentPage
            },function(e,data){
				if(e){
					var arrData=[];
					var xData=[];
					var monitor=[];
					var length=null;
					var  monitorLength=data.data.list.length;
					for(var j=0;j<monitorLength;j++){
						monitor=data.data.list[j].echarts;
						length=monitor.length;
						for(var i=0;i<length;i++){
							arrData.push(monitor[i].read);
							xData.push(monitor[i].xaxis);
						}
						data.data.list[j].arrData=arrData;
						data.data.list[j].xData=xData;
						arrData=[];
						xData=[];
					}
					_this.response = data.data.list;
					_this.total = data.data.total;
				}
			});
      	},
 		deleteSuccessWran: function(title) {
 			this.$notify({
 				title: '成功',
 				message: title,
 				type: 'success'
 			});
 		},
      	deleteMonitor:function(index){
      		var id=this.response[index].id;
			var _this = this;
			_this.ajaxData(_this,objs.url.deleteMonitor,{id:id},function(e,data){
				if(e){
					var title=data.msg;
              		_this.deleteSuccessWran(title);
					_this.response.splice(index,1);
				}
			})
      	},
      	seeParticular:function(index){
        	var id=this.response[index].id;
			this.$store.state.indexParticular=id;
      	},
		muchAxios:function(index){
            var _this = this;
            this.currentPage=1;
            _this.ajaxData(_this,objs.url.allMonitor,{
            	type:index,
            	page_num:1
            },function(e,data){
				if(e){
					var arrData=[];
					var xData=[];
					var monitor=[];
					var length=null;
					var  monitorLength=data.data.list.length;
					for(var j=0;j<monitorLength;j++){
						monitor=data.data.list[j].echarts;
						length=monitor.length;
						for(var i=0;i<length;i++){
							arrData.push(monitor[i].read);
							xData.push(monitor[i].xaxis);
						}
						data.data.list[j].arrData=arrData;
						data.data.list[j].xData=xData;
						arrData=[];
						xData=[];
					}
					_this.response = data.data.list;
					_this.total = data.data.total;
				}
			});
			
		},      	
		addStyle:function(index){
			this.selectItem = index;
			switch (index){
				case 0:
					this.muchAxios(index);
					break;
				case 1:
					this.muchAxios(index);
					break;
				case 2:
					this.muchAxios(index);
					break;
				case 3:
					this.muchAxios(index);
					break;
				case 4:
					this.muchAxios(index);
					break;
				case 5:
					this.muchAxios(index);
					break;
				default:
					break;
			}
		},

        myChart: function(id,read,xaxis){
        	let _this=this;
        	setTimeout(function(){
	            let myChart = _this.$echarts.init(document.getElementById(id));
	            let date = xaxis;
	            let data = read;
	            var option={
	            	title: {},
	                tooltip: {},
		            grid:{
		                x:0,
		                y:0,
		                x2:0,
		                y2:0,
		            },
	                xAxis: {
	                    show : false,
	                    type: 'category',
	                    boundaryGap: false,
	                    data: date,
	                },
	                yAxis: {
	                    show : false,
	                    type: 'value',
	                    boundaryGap: [0, '10%']
	                },
				    series: [
				        {
				            name:'模拟数据',
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            itemStyle: {
				                normal: {
				                    color: 'RGB(225,60,139)'
				                }
				            },
				            areaStyle: {
				                normal: {
				                    color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgba(225,60,139,.1)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 255, 255)'
				                    }])
				                }
				            },
				            data: data
				        }
				    ]
	            };
	            myChart.setOption(option);
        	},0);
        },
        axios: function(){	
            var _this = this;
            _this.ajaxData(_this,objs.url.allMonitor,{
            	id:this.$store.state.userId,
            	page_num:1
            },function(e,data){
				if(e){
					var arrData=[];
					var xData=[];
					var monitor=[];
					var length=null;
					var  monitorLength=data.data.list.length;
					for(var j=0;j<monitorLength;j++){
						monitor=data.data.list[j].echarts;
						length=monitor.length;
						for(var i=0;i<length;i++){
							arrData.push(monitor[i].read);
							xData.push(monitor[i].xaxis);
						}
						data.data.list[j].arrData=arrData;
						data.data.list[j].xData=xData;
						arrData=[];
						xData=[];
					}
					_this.response = data.data.list;
					_this.total = data.data.total;
				}
			});
        },

        activitytitle:function(){
      		document.title=objs.page_config.pageName[1].allActivity;
        }
      },
    watch: {
		"$store.state.addMonitors": function(){
			var data=this.$store.state.addMonitors[0].echarts
			var length=data.length;
			var arrData=[];
			var xData=[];
			for(var i=0;i<length;i++){
				arrData.push(data[i].read);
				xData.push(data[i].xaxis);
			}
			this.$store.state.addMonitors[0].arrData=arrData;
			this.$store.state.addMonitors[0].xData=xData;
			this.response.unshift(this.$store.state.addMonitors[0]);
		}
	},
	mounted(){
        this.axios();
        this.activitytitle();
    },
  };
</script>

<style scoped>
 @import "../../static/css/activity.css"
 .list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>



