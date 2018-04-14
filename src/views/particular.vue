<template>
        <div class="monitor-particular">
        		<p class="back">
        			<i class="el-icon-arrow-left"></i>
        			<router-link to="/readMonitor">返回</router-link>
        		</p>
			<div class="particular-box">
                <el-container>
                    <el-row :gutter="20">
                        <el-col :span="24">
                        	<div class="particular-item" v-for="item in topBoxInfo">
                        		<div class="particular-public public-flex-left">
                        			<img :src="item.public_src" alt="公众号头像" />
                        			<p class="public-grid public-flex-up">
                        				<span class="public-title">{{ item.public_title }}</span>
                        				<span class="public-name">{{ item.public_info }}</span>
                        			</p>
                        		</div>
                        		<div class="particular-article public-flex-left">
                        			<img :src="item.article_src" alt="文章图片" />
                        			<p class="article-content">{{item.public_content}}</p>
                        		</div>
                        		<div class="particular-time">
                        			<p class="monitor-time"><span>监测时间 : </span><span>{{item.monitor_time}}</span></p>
                        			<p class="publish-time"><span>发文时间 : </span><span>{{item.start_time}}</span></p>
                        		</div>
                        	</div>
                        </el-col>
                        <el-col :span="24">
                        	<div class="particular-echarts">
					            <ul class="choose-state">
					                <li 
					                	:id="item.id" 
					                	v-for="(item,index) in particularKind" 
					                	:class="{ activechoose: index==partiularItem}"
					                	@click="particularStyle(index)">{{ item.content }}</li>
					            </ul>
					            <div id="big_particular_charts_box">
						            <div id="big_particular_charts"></div>
									<img class='night_img' src='../../static/img/night.png' alt='夜晚的象征' />
									<img class='night_img' src='../../static/img/night.png' alt='夜晚的象征' />
									<img class='night_img' src='../../static/img/night.png' alt='夜晚的象征' />
									<img class='night_img' src='../../static/img/night.png' alt='夜晚的象征' />
									<img class='night_img' src='../../static/img/night.png' alt='夜晚的象征' />
					            </div>
                        	</div>
                        </el-col>
                        <el-col :span="24">
                        	<div class="particular-table">
							    <el-table
							      :data="particularTable"
							      stripe
							      style="width: 100%">
							      <el-table-column
							        prop="date"
							        label="时间"
							        width="180">
							      </el-table-column>
							      <el-table-column
							        prop="read"
							        label="总阅读量"
							        width="180">
							      </el-table-column>
							      <el-table-column
							        prop="read_diff"
							        label="阅读增量">
							      </el-table-column>
							      <el-table-column
							        prop="like"
							        label="总点赞量">
							      </el-table-column>
							      <el-table-column
							        prop="like_diff"
							        label="点赞增量">
							      </el-table-column>
							    </el-table>
                        	</div>
                        	<button class="start-monitor" id="download-info"><a href="#">导出结果</a></button>
                        </el-col>
                    </el-row>
                </el-container>
			</div>	
        </div>
</template>

<script>
	
  export default {
    data() {
      return {
        partiularItem:0,
        showParticularBtn:false,
        particularTable:null,
        particularKind:[
        	{id:"allparticular",content:"阅读数趋势"},
        	{id:"particular-stating",content:"点赞数趋势"},
        	{id:"particular-wait",content:"阅读增量"},
        	{id:"particular-error",content:"点赞增量"}
        ],
        particulardata:[],
        particulardate:[],
        click_like:[],
        add_read:[],
        add_click_lick:[],
        night:[],
        nigthImg:null,
        chooseBox:'',
        nightarr:[],
        areaTimearr:[],
        topBoxInfo:[]
      };
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
 		
		particularStyle:function(index){
			this.partiularItem = index;

			switch (index){
				case 0:
					this.particularEcharts(this.particulardata,this.particulardate);
					break;
				case 1:
					this.particularEcharts(this.click_like,this.particulardate);
					break;
				case 2:
					this.particularEcharts(this.add_read,this.particulardate);
					break;
				case 3:
					this.particularEcharts(this.add_click_lick,this.particulardate);
					break;
					
				default:
					break;
			}
			
		},
       	particularEcharts:function(particulardata,particulardate){
	            let myChart = this.$echarts.init(document.getElementById('big_particular_charts'));
	            let date = particulardate;
	            let data = particulardata;
	            let _this=this;
			let option = {
			    tooltip: {
			    	show:true,
			        trigger: 'axis',
			        backgroundColor:'rgba(225,60,139,.5)'
			    },
			    toolbox:{
			    	itemSize:0
			    },
			    title: {},
	            brush: {
			    	transformable:false,
		            yAxisIndex: 'all',
		            brushLink: 'all',
		            brushStyle:{
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: 'rgba(0,38,102,.5)'
	                    }, {
	                        offset: 1,
	                        color: 'rgba(255, 255, 255,.2)'
	                    }]),
		            	borderWidth: 0,
		            }
		        },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: date
			    },
			    yAxis: {
			        type: 'value',
			        boundaryGap: [0, '100%']
			    },
			    dataZoom: [{
			        type: 'inside',
			        start: 0,
			        end: 100
			    }, {
			        start: 0,
			        end: 10,
			        backgroundColor:'RGB(241,243,249)',
			        dataBackground:{
			            areaStyle :{
			                color:'rgba(225,60,139,.4)'
			            },
			            lineStyle :{
			                color:'#fff'
			            }
			        },
			        fillerColor :'rgba(225,60,139,.1)',
			        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			        handleSize: '80%',
			        handleStyle: {
			            color: '#fff',
			            shadowBlur: 3,
			            shadowColor: 'rgba(225,60,139,.1)',
			            shadowOffsetX: 2,
			            shadowOffsetY: 2
			        }
			    }],
			    series: [
			        {
			            name:'实时数据',
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
				                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
		    myChart.dispatchAction({
		        type: 'brush',
		        areas: this.nightarr 
		    });
	    

	    	var positionStart=null;
	    	var positionEnd=null;
			var length=this.areaTimearr.length;
			var left=null;
			var leftEnd=null;
			var diff=null;
			var center=null;
			var box=null;
	    	for(var i=0;i<length;i++){
	    		positionStart=myChart.convertToPixel('grid', [this.areaTimearr[i][0], 0]);
	    		positionEnd=myChart.convertToPixel('grid', [this.areaTimearr[i][1], 0]);
	    		center=(parseInt(positionEnd) - parseInt(positionStart))/2 - 25;
	    		left=parseInt(positionStart[0]) + center;
				var box=$('#big_particular_charts').width();
				var leftDistance=box*0.9;
				
	    		leftEnd=positionEnd[0];
	    		diff=leftEnd-left;
			    if(left>=leftDistance || diff<40 || left < 100){    // || diff < 100    如果宽度小于40将会隐藏   left >= 860
	   		    	$('#big_particular_charts_box .night_img').eq(i).hide();
					console.log(left);
			    }else{
					$('#big_particular_charts_box .night_img').eq(i).css({
						left: left + 10,
						top: 80+'px'
					}).show();
			    }
	    	};
				
			myChart.on('datazoom', function (obj) {
		    	for(var i=0;i<length;i++){
		    		positionStart=myChart.convertToPixel('grid', [_this.areaTimearr[i][0], 0]);
		    		positionEnd=myChart.convertToPixel('grid', [_this.areaTimearr[i][1], 0]);
	    		center=(parseInt(positionEnd) - parseInt(positionStart))/2 - 25;
	    		left=parseInt(positionStart[0]) + center;
	
		    		leftEnd=positionEnd[0];
		    		diff=leftEnd-left;
				    if(left >= leftDistance || diff<40 || left < 100 ){    // || diff < 100
		   		    	$('#big_particular_charts_box .night_img').eq(i).hide();
				    }else{
						$('#big_particular_charts_box .night_img').eq(i).css({
							left: left + 10,
							top: 80+'px'
						}).show();
				    }
		    	}
		    })

       },
        
        axiosParticulardata: function(){
            var _this = this;
			_this.ajaxData(_this,objs.url.particular,{
				id:_this.$store.state.indexParticular
			},function(e,data){
				if(e){
	              	_this.topBoxInfo=data.data.info;
	              	var arr = data.data.list;
	              	_this.particularTable= data.data.list;
	              	var length=arr.length;
	              	var odd=1;
	              	var add=0;
	              	
	              	var firstDay=arr[0].date.slice(0,4);
	              	var lastDay=arr[ length - 1 ].date.slice(0,4);
	              	
	              	var nightTime =[];
	              	var nightarr =[];
	              	var areaTimearr=[];
	              	 
	          		for(var i=0;i<length;i++){
	          			if(arr[i].bg == 'true'){
	          				if( odd % 2 == 0){   //最后一个
	          					nightTime.push(arr[i].date);   //  两两一组开始存储  供给echarts绘制遮罩 使用
	          					areaTimearr[add]=nightTime;
	          					nightarr.push({
								                brushType: 'lineX',
								                coordRange : nightTime,
								                xAxisIndex: 0
								              });    //nightTime       
	          					add++;
	          					nightTime=[];
	          					odd++;
	          				}else{  //还有一个 
	          					nightTime.push(arr[i].date);
	          					odd++;
	          				}
	          			}
	          			
	          			_this.particulardata.push(arr[i].read);
	          			_this.click_like.push(arr[i].like);
	          			_this.add_read.push(arr[i].read_diff);
	          			_this.add_click_lick.push(arr[i].like_diff);
	          			_this.particulardate.push(arr[i].date);
	          		}
	          		_this.areaTimearr=areaTimearr;
	          		_this.nightarr=nightarr;
	          		_this.nigthImg=nightarr.length;
	                _this.particularEcharts(_this.particulardata,_this.particulardate);
				}
			})
        },
        particulartitle:function(){
        	document.title=objs.page_config.pageName[3].particular;
        },
      },    
    mounted(){
		this.axiosParticulardata();
		this.particulartitle();
    }
  };
</script>

<style scoped>
 @import "../../static/css/activity.css";
</style>