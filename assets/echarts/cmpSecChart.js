var dates;
var zbs;
var dis;
var useZb;
var useDi;
var bgbk;
var baseDi;
var flashId;
var chartId;
var flashDivId;
var baseZb;
var datas ;
var datasIndexs ;

waterLevelFlowObjectArray = new Array();

//重构使用变量
//ajaxResult;//水位流量曲线的re
var sectionDatas;

//图表通用操作部分 需要重构
function cmpChartprint(){
	var image = chartBottom.getConnectedDataURL('jpeg');
	var downloadDiv = document.createElement('div');
	downloadDiv.id = '__echarts_download_wrap__';
	downloadDiv.style.cssText = 'position:fixed;'
	+ 'z-index:99999;'
	+ 'display:block;'
	+ 'top:0;left:0;'
	//+ 'background-color:rgba(33,33,33,0.5);'
	+ 'text-align:center;'
	+ 'width:100%;'
	+ 'height:100%;'
	+ 'line-height:' 
	+ document.documentElement.clientHeight + 'px;';
	var downloadLink = document.createElement('a');
	//downloadLink.onclick = _saveImageForIE;
	downloadLink.href = image;
	downloadLink.innerHTML = '<img style="vertical-align:middle" src="' + image 
	+'"/>';
	downloadDiv.appendChild(downloadLink);
	document.body.appendChild(downloadDiv);
	// downloadLink = null;
	//downloadDiv = null;
	printdiv("__echarts_download_wrap__");
	var d = document.getElementById(
	'__echarts_download_wrap__'
	);
	d.onclick = null;
	d.innerHTML = '';
	document.body.removeChild(d);
	d = null;
}


function cmpChartExport(){
	
	document.getElementById('flashcontent1').style.display='block';
	document.getElementById('chartOne').style.display='none';
}

function returnToChart(){
	document.getElementById('flashcontent1').style.display='none';
	document.getElementById('chartOne').style.display='block';
}

//图表操作部分完结
function cmpSecinit(json,flashId,chartId,flashDivId){
	datas = new Array();
	datasIndexs = new Array();
	this.dates      = json.tms;
	this.flashId    = flashId;
	this.flashDivId = flashDivId;
	this.chartId    = chartId;
	this.bgbk       = new Array();
	this.bgbk       = json.bgbk;
	if(json.tms.length==0){
		//alert("null");
		this.dates = ['尚无测定数据'];
		this.zbs   = [[20,20,10,0,0,0,0,10,20,20]];
		this.dis   = [[0,1,2,3,4,5,6,7,8,9]];
	}else{
		this.zbs   = json.zbs;
		this.dis   = json.dis;
	}
}
	

function countData(index){
			var tempZb = zbs[index];
			var tempDi = dis[index];
			if(tempDi[0]!=0){
				var x = tempDi[0];
				for(var i = 0;i<tempDi.length;i++){
							tempDi[i] = Math.abs(tempDi[i]-x);
					}
			}
		  var width = tempDi[tempDi.length-1] - tempDi[0];
		  var tempUseDi = new Array();
		  var tempUseZb = new Array();
		  var nullNum   = 0;
		  var tempIndex = 0;
		  var middleArray = new Array();
		  for(var i=0;i<=width;i++){
		  		if(i==tempDi[tempIndex]||i>(tempDi[tempIndex]-1)||(i>tempDi[tempIndex]&&i<(tempDi[tempIndex+1]))){
		  			tempUseDi.push("'"+i+"'");
			  				if(nullNum==0){
			  				
			  				tempUseZb.push(tempZb[tempIndex]);
			  				tempIndex++;
			  			}else{
			  				if(tempUseZb.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(tempZb[tempIndex]);
				  				 		
				  				 	}
				  				 tempUseZb = tempUseZb.concat(middleArray);
				  				 middleArray = new Array();
				  				 nullNum = 0;
			  				
			  				}else{
			  				 var avg = (tempZb[tempIndex] - tempUseZb[tempUseZb.length-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(tempUseZb[tempUseZb.length-1]+(avg*(t+1)));
			  				 		
			  				 	}
			  				 tempUseZb = tempUseZb.concat(middleArray);
			  				 middleArray = new Array();
			  				 nullNum = 0;
			  				tempUseZb.push(tempZb[tempIndex]);
			  				while(tempDi[tempIndex]==tempDi[tempIndex+1]){
			  					tempIndex++;
			  				}
			  				 tempIndex++;
			  				}}
			  				
		  		}else{
		  				tempUseDi.push("'"+i+"'");
		  				nullNum++;
		  			
		  		}
		  	}
		  
		  
		  	if(bgbk.length!=0){
		  		
		  		if(bgbk[index]==null){
		  			
		  		}else {
		  			
		  			if(bgbk[index].toString()=="R"){
		  			//tempUseZb.reverse();
		  		}}
		  	}
		  	baseDi = tempUseDi;
		    baseZb = tempUseZb;
		    getdata(index,tempUseDi,tempUseZb);
	}



function getdata(index,tempUseDi,tempUseZb){
		var tempOption = {
		            name: dates[index].slice(0,4)+'岸线',
   		            type: 'line',
   		         	symbol:'none',
	   		         itemStyle: {normal: {lineStyle:{ type:'solid'}}},
   		            data: tempUseZb,
   		            markPoint : {
		                data : [
		                    {name: dates[index].slice(0,4)+'左岸高',xAxis:0,yAxis:tempUseZb[0],value:tempUseZb[0].toFixed(2), symbolSize:15},
		                    {name: dates[index].slice(0,4)+'右岸高',xAxis:tempUseZb.length,yAxis:tempUseZb[tempUseZb.length-1],value:tempUseZb[tempUseZb.length-1].toFixed(2), symbolSize:15}
		                ]
	            	}
	}
	datas.push(tempOption);
	datasIndexs.push(index);
}

function countOptionData(){
	var maxLength = 0;
	for(var i = 0;i<datas.length;i++){
		if(datas[i].data.length>maxLength){
			maxLength = datas[i].data.length;
		}
	}
	for(var n = 0;n<datas.length;n++){
		if(datas[n].data.length<maxLength){
			var temp = new Array();
			for(var x = 0;x<maxLength-datas[n].data.length;x++){
				temp.push('-');
			}
			datas[n].data = datas[n].data.concat(temp);
			//alert("size"+datas[i].data.length);
		}
		var OrgMarkPoint = datas[n].markPoint.data;
		if(datas[n].data[datas[n].data.length-1]=="-"){
			datas[n].markPoint.data = [
				  	                    {name: OrgMarkPoint[0].name,xAxis:OrgMarkPoint[0].xAxis,yAxis: datas[n].data[0],value:datas[n].data[0].toFixed(2), symbolSize:15},
					                    {name: OrgMarkPoint[1].name,xAxis:OrgMarkPoint[1].xAxis,yAxis:OrgMarkPoint[1].yAxis,value:OrgMarkPoint[1].yAxis, symbolSize:15}
					                ];
		}else{
		datas[n].markPoint.data = [
		  	                    {name: OrgMarkPoint[0].name,xAxis:OrgMarkPoint[0].xAxis,yAxis: datas[n].data[0],value:datas[n].data[0].toFixed(2), symbolSize:15},
			                    {name: OrgMarkPoint[1].name,xAxis:maxLength,yAxis: datas[n].data[maxLength-1],value:datas[n].data[maxLength-1].toFixed(2), symbolSize:15}
			                ];
	}
	}
}

function getOptionByArray(dateArray){
	if(dateArray==null||dateArray.length==0){
		//alert('null');
		return nullOption();
	}
	var indexs = new Array();
	for(var i = 0;i<dateArray.length;i++){
		for(var x = 0;x<dates.length;x++){
			if(dateArray[i]==dates[x]){
				indexs.push(x);
			}
		}
	}
	//alert(indexs.toString());
	if(datasIndexs.length==0){
		//alert("+"+indexs[0]);
		countData(indexs[0]);
		return getOption();
	}else{
	//寻找变化的 新增为+减少为——
	
	for(var i = 0;i<datasIndexs.length;i++){
		var count = 0;
		for(var x = 0;x<indexs.length;x++){
			if(indexs[x]==datasIndexs[i]){
				count++;
			}else{
				
			}
		}
		if(count==0){
			//alert("-"+datasIndexs[i]);
			datas.splice(i,1);
			datasIndexs.splice(i,1);
		}
	}
	
	for(var i = 0;i<indexs.length;i++){
		var count = 0;
		for(var x = 0;x<datasIndexs.length;x++){
			if(indexs[i]==datasIndexs[x]){
				count++;
			}else{
				
			}
		}
		if(count==0){
			//alert("+"+indexs[i]);
			countData(i);
			countOptionData();
			return getOption();
		}
	  }
	}
	return getOption();
}

function getOption(){
	var maxZ = 0;
	for(var i = 0;i<datas.length;i++){
		for(var x = 0;x<datas[i].data.length;x++){
			if(maxZ<datas[i].data[x]){
				maxZ = datas[i].data[x];
			}
		}
	}
	var minZ =maxZ;
	for(var i = 0;i<datas.length;i++){
		for(var x = 0;x<datas[i].data.length;x++){
			if(minZ>datas[i].data[x]){
				minZ = datas[i].data[x];
			}
		}
	}
	var realbi = new Array();
	for(var x = 0;x<datas[0].data.length;x++){
		realbi.push("'"+x+"'");
	}
	var doubleOption  = {
			 title : {
			        text: '历史断面图'
			        
			    },
  		    tooltip : {
  		        trigger: 'axis',
  		        position :[100,200]
  		    },
  		 legend: {
  	        data:[]
  	    },
  		 dataZoom : {
  			 
	   	        show : true,
	   	        realtime : true,
	   	        start : 0,
	   	        end : 100
	   	    	
	   	   		 },
	   		
  		   
  		    toolbox: {
  		        show : false,
  		        feature : {
  		            mark : {show: false},
  		            dataView : {show: false},
  		            magicType : {show: false, type: ['line', 'bar']},
  		            restore : {show: true},
  		            saveAsImage : {show: false, type : 'jpeg'}
  		        }
  		    },
  			
  		    xAxis : [
  		        {
  		            type : 'category',
  		            position: 'bottom',
  		            boundaryGap: true,
  		            axisLine : {    // 轴线
  		                show: true,
  		                lineStyle: {
  		                    color: 'green',
  		                    type: 'solid',
  		                    width: 2
  		                }
  		            },
  		            axisTick : {    // 轴标记
  		                show:true,
  		             	interval:Math.floor(realbi.length/50),
  		                length: 7,
  		                lineStyle: {
  		                    color: 'blue',
  		                    type: 'solid',
  		                    width: 1
  		                }
  		            },
  		            axisLabel : {
  		                show:true,
  		                interval:Math.floor(realbi.length/10),    // {number}
  		                
  		                margin: 8,
  		                formatter: '{value}m',
  		                textStyle: {
  		                    color: 'blue',
  		                    fontFamily: 'sans-serif',
  		                    fontSize: 10,
  		                    fontStyle: 'italic',
  		                    fontWeight: 'bold'
  		                }
  		            },
  		            splitLine : {
  		                show:false,
  		                lineStyle: {
  		                    color: 'blue',
  		                    type: 'dashed',
  		                    width: 1
  		                }
  		            },
  		            splitArea : {
  		                show: false,
  		                areaStyle:{
  		                    color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
  		                }
  		            },
  		            data :realbi
  		            }
  		       
  		    ],
  		    yAxis : [
  		      
  		      {
  		            type : 'value',
  		       		max : maxZ,
  		       		min : minZ,
  		            splitNumber: 15,
  		         	 position :'left',
  		            axisLabel : {
  		                formatter: function (value) {
  		                    // Function formatter
  		                    return value + ' M'
  		                }
  		            },
  		            splitLine : {
  		                show: true
  		            }
  		        }
  		    ],
  		    series : datas
  		};
	return doubleOption;
	
}

function nullOption(){
	var doubleOption  = {
			 title : {
			        text: '无数据断面图'
			        
			    },
 		    tooltip : {
 		        trigger: 'axis',
 		        position :[100,200]
 		    },
 		 legend: {
 	        data:[]
 	    },
 		 dataZoom : {
 			 
	   	        show : true,
	   	        realtime : true,
	   	        start : 0,
	   	        end : 100
	   	    	
	   	   		 },
	   		
 		   
 		    toolbox: {
 		        show : false,
 		        feature : {
 		            mark : {show: false},
 		            dataView : {show: false},
 		            magicType : {show: false, type: ['line', 'bar']},
 		            restore : {show: true},
 		            saveAsImage : {show: false, type : 'jpeg'}
 		        }
 		    },
 			
 		    xAxis : [
 		        {
 		            type : 'category',
 		            position: 'bottom',
 		            boundaryGap: true,
 		            axisLine : {    // 轴线
 		                show: true,
 		                lineStyle: {
 		                    color: 'green',
 		                    type: 'solid',
 		                    width: 2
 		                }
 		            },
 		            axisTick : {    // 轴标记
 		                show:true,
 		             	interval:10,
 		                length: 7,
 		                lineStyle: {
 		                    color: 'blue',
 		                    type: 'solid',
 		                    width: 1
 		                }
 		            },
 		            axisLabel : {
 		                show:true,
 		                interval:5,    // {number}
 		                
 		                margin: 8,
 		                formatter: '{value}m',
 		                textStyle: {
 		                    color: 'blue',
 		                    fontFamily: 'sans-serif',
 		                    fontSize: 10,
 		                    fontStyle: 'italic',
 		                    fontWeight: 'bold'
 		                }
 		            },
 		            splitLine : {
 		                show:false,
 		                lineStyle: {
 		                    color: 'blue',
 		                    type: 'dashed',
 		                    width: 1
 		                }
 		            },
 		            splitArea : {
 		                show: false,
 		                areaStyle:{
 		                    color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
 		                }
 		            },
 		            data :['1','2','3','4','5','6','7','8','9','10']
 		            }
 		       
 		    ],
 		    yAxis : [
 		      
 		      {
 		            type : 'value',
 		       		max : 20,
 		       		min : 0,
 		            splitNumber: 5,
 		         	 position :'left',
 		            axisLabel : {
 		                formatter: function (value) {
 		                    // Function formatter
 		                    return value + ' M'
 		                }
 		            },
 		            splitLine : {
 		                show: true
 		            }
 		        }
 		    ],
 		    series :   [
 		                       {
 		                          name:'无数据',
 		                          type:'line',
								  data:[0,0,0,0,0,0,0,0,0,0]
 		                      }
 		                  ]
 		};
	return doubleOption;
	
	
}


//重构代码
function getCountRealOneSectionData(datesArr){
	if(datesArr.length==1&&datesArr[0]=='尚无测定数据'||datesArr.length==0){
		sectionDatas = new Array();//证明没有选择日期 应当为空或者(应当为默认数据)
		var tempObject = new Object();
				tempObject.name = '';
				tempObject.type = 'line';
				tempObject.itemStyle = new Object();
				tempObject.itemStyle = {
										normal:{
											//color: '#CD0000',
											lineStyle: {
				   		                    type: 'dashed',
				   		                    width: 1
				   		                	}
		   		          				}
		   		          			};
				tempObject.data = [[0,20],[1,20],[2,10],[3,0],[4,0],[5,0],[6,0],[7,10],[8,20],[9,20]];
				sectionDatas = [tempObject];
	}else{
		//证明有选择日期，按照选择日期选取处理相 应的数据为data
				var indexArr = new Array();
				for(var i = 0;i<datesArr.length;i++){//找出所有要求显示的断面线的下标
					for(var x = 0;x<ajaxResult.tms.length;x++){
						if(ajaxResult.tms[x]==datesArr[i]){
							indexArr.push(x);
						}
					}
				}
		//根据下标对数据进行组合 组合成[x,y]形式
			var realSectionDatas = new Array();
			var tempObjectArray = new Array();
			for(var i = 0;i<indexArr.length;i++){
				var tempSectionData = new Array();
				var tempDis = new Array();
				var tempZbs = new Array();
				for(var disi = 0;disi<ajaxResult.dis[indexArr[i]].length;disi++){
					tempDis.push(ajaxResult.dis[indexArr[i]][disi]);
				}
				for(var zbsi = 0;zbsi<ajaxResult.zbs[indexArr[i]].length;zbsi++){
					tempZbs.push(ajaxResult.zbs[indexArr[i]][zbsi]);
				}
				if(ajaxResult.bgbk[i]=='L'){
					// tempDis = ajaxResult.dis[indexArr[i]];
				}else{
					// tempDis = ajaxResult.dis[indexArr[i]];
					//tempZbs.reverse();
				}
				for(var x = 0;x<tempZbs.length;x++){
					tempSectionData.push([tempDis[x],tempZbs[x]]);
				}
				realSectionDatas.push(tempSectionData);
				var tempObject = new Object();
				tempObject.name = ajaxResult.tms[i].substring(0,10) + '('+ajaxResult.bgbk[i]+')';
				tempObject.itemStyle = new Object();
				tempObject.itemStyle = {
										normal:{
											//color: '#CD0000',
											lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                	}
		   		          				}
		   		          			};
				tempObject.data = tempSectionData;
				tempObject.type = 'line';
				tempObjectArray.push(tempObject);
			}
		//已经获得[x,y]形式的数据，需要开始组装对象？
		var testusetoremember = 1;
		sectionDatas = tempObjectArray;
	 }
}



function getChartOption(){
	//在前方要增加对series数据的相关处理  包括计算最大最小值 数据引用等
	var realdatas = new Array();
	var max;
	var min;
	var qmax;
	var qmin;
	var xLength = 0;
	var legenddata = new Array();
	for(var i = 0 ;i<sectionDatas.length;i++){
		realdatas.push(sectionDatas[i]);
		legenddata.push(sectionDatas[i].name);
	}
	if(realdatas.length!=0){
		max = realdatas[0].data[0][1];
		min = realdatas[0].data[0][1];
		for(var i = 0;i<realdatas.length;i++){

			for(var x = 0;x<realdatas[i].data.length;x++){
				if(max<realdatas[i].data[x][1]){
					max = realdatas[i].data[x][1];
				}
				if(min>=realdatas[i].data[x][1]){
					min = realdatas[i].data[x][1];
				}
				if(xLength<=realdatas[i].data[x][0]){
				xLength = realdatas[i].data[x][0];
				}
			}
		}
	}else{
		//代表没有数据
		if(waterLevelFlowObjectArray.length!=0){
			waterLevelFlowObject = waterLevelFlowObjectArray[0];
		if(typeof(waterLevelFlowObject)!='undefined'){
			max = waterLevelFlowObject.data[0][1];
			min = waterLevelFlowObject.data[0][1]; 
		}
		}
	}
	if(waterLevelFlowObjectArray.length!=0){
			waterLevelFlowObject = waterLevelFlowObjectArray[0];
	if(realdatas.length==1&&realdatas[0].name==''){
		if(typeof(waterLevelFlowObject)!='undefined'){
			max = waterLevelFlowObject.data[0][1];
			min = waterLevelFlowObject.data[0][1]; 
		}
	}
	}
	for(var oi = 0;oi<waterLevelFlowObjectArray.length;oi++){
		waterLevelFlowObject = waterLevelFlowObjectArray[oi];
	if(typeof(waterLevelFlowObject)!='undefined'){
		realdatas.push(waterLevelFlowObject);
		legenddata.push(waterLevelFlowObject.name);
		qmin  = waterLevelFlowObject.data[0][0];
		qmax  = waterLevelFlowObject.data[0][0];
		if(typeof(max)=='undefined'){
				max = waterLevelFlowObject.data[0][1];
			}
			if(typeof(min)=='undefined'){
				min = waterLevelFlowObject.data[0][1];
			}
		for(var i = 0;i<waterLevelFlowObject.data.length;i++){
			if(qmin>=waterLevelFlowObject.data[i][0]){
				qmin = waterLevelFlowObject.data[i][0];
			}
			if(qmax<=waterLevelFlowObject.data[i][0]){
				qmax = waterLevelFlowObject.data[i][0];
			}
			if(max<=waterLevelFlowObject.data[i][1]){
				max = waterLevelFlowObject.data[i][1];
			}
			if(min>waterLevelFlowObject.data[i][1]){
				min = waterLevelFlowObject.data[i][1];
			}

		}
	}
	}
	//拼接已完成，此时应该所有断面与水位流量过程曲线的data对象都在realdatas当中，可在外部由两个check事件处理函数调用
	//图已经可以出来了 需要对y轴的max值与min值进行计算
	
	
	
	var realOption =           
	{
	title : {
		text: '大断面图',
		x:'center',
		textStyle:{
			fontFamily:'宋体',
			fontStyle:'normal'
		}
	},

	// tooltip : {
	// 	show:false,//test用
	// 	trigger: 'axis',
	// 	position :[100,200]
	// },
	legend: {
	        data:legenddata,
	        y:'bottom'
	    },
	dataZoom : {
		show : false,
		realtime : true,
		start : 0,
		end : 100
	},
	toolbox: {
		show : false,
		feature : {
			mark : {show: false},
			dataView : {show: false},
			magicType : {show: false, type: ['line', 'bar']},
			restore : {show: true},
			saveAsImage : {show: false, type : 'jpeg'}
		}
	},
	xAxis : [
		{
			type : 'value',
			min:0,
			max:xLength,
			position: 'bottom',
			boundaryGap: true,
			splitNumber:15,
			axisLine : {    // 轴线
				show: true,
				lineStyle: {
					color: 'black',
					type: 'solid',
					width: 1
				}
			},
			axisTick : {    // 轴标记
				show:true,
				//interval:Math.floor(realbi.length/50),
				length: 7,
				lineStyle: {
					color: 'black',
					type: 'solid',
					width: 1
				}
			},
			axisLabel : {
				show:true,
				//interval:Math.floor(realbi.length/10),    // {number}
				margin: 8,
				
					formatter: function (value) {
						return value.toFixed(0);
					},
				
				textStyle: {
					fontFamily: 'Calibri',
                    fontSize: 11.5,
                    color:'#3D3D3D',
                    fontStyle: 'normal'
				}
			},
			splitLine : {
				show:true,
				lineStyle: {
					color: '#ccc',
					type: 'dashed',
					width: 1
				}
			},
			splitArea : {
				show: false,
				areaStyle:{
					color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
				}
			}
			
		},
		{
			type : 'value',
			min:qmin,
			max:qmax,
			
			position: 'top',
			splitNumber:5,
			boundaryGap: true,
			axisLine : {    // 轴线
				show: true,
				lineStyle: {
					color: 'black',
					type: 'solid',
					width: 1
				}
			},
			axisTick : {    // 轴标记
				show:true,
				//interval:Math.floor(realbi.length/50),
				length: 7,
				lineStyle: {
					color: '#ccc',
					type: 'solid',
					width: 1
				}
			},
			axisLabel : {
	 			show:true,
				//interval:Math.floor(realbi.length/10),    // {number}
				margin: 8,
				formatter: function (value) {
                    // Function formatter
                    
                    return value.toFixed(1) + ''
                },   
				textStyle: {
					fontFamily: 'Calibri',
                    fontSize: 11.5,
                    color:'#3D3D3D',
                    fontStyle: 'normal'
				}
			},
			splitLine : {
				show:true,
				lineStyle: {
					color: '#ccc',
					type: 'solid',
					width: 1
				}
			},
			splitArea : {
				show: false,
				areaStyle:{
					color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
				}
			}
			
		}
		//是否要添加第二天横轴 为水位数据横轴
	],
	yAxis : [
		{
			type : 'value',
			max : max,
			min : min,
			splitNumber: 10,
			position :'left',
			
				
			
			axisLine : {    // 轴线
				show: true,
				lineStyle: {
					color: 'black',
					type: 'solid',
					width: 1
				}
			},
			axisLabel : {
				show:true,
				//interval:Math.floor(realbi.length/10),    // {number}
				margin: 8,
				formatter: function (value) {
					return value.toFixed(0)+'';
				},
				textStyle: {
					fontFamily: 'Calibri',
                    fontSize: 11.5,
                    color:'#3D3D3D',
                    fontStyle: 'normal'
				}
			},
			splitLine : {
				show: true
			}
		}

		//预计增加流量数轴 x
	],
	 series :realdatas
	};
	var resultStringFortest = realOption.toString();
	return realOption;
}





function cmpChartprint(){
	var image = chartBottom.getConnectedDataURL('jpeg');
	var downloadDiv = document.createElement('div');
	downloadDiv.id = '__echarts_download_wrap__';
	downloadDiv.style.cssText = 'position:fixed;'
	+ 'z-index:99999;'
	+ 'display:block;'
	+ 'top:0;left:0;'
	//+ 'background-color:rgba(33,33,33,0.5);'
	+ 'text-align:center;'
	+ 'width:100%;'
	+ 'height:100%;'
	+ 'line-height:' 
	+ document.documentElement.clientHeight + 'px;';
	var downloadLink = document.createElement('a');
	//downloadLink.onclick = _saveImageForIE;
	downloadLink.href = image;
	downloadLink.innerHTML = '<img style="vertical-align:middle" src="' + image 
	+'"/>';
	downloadDiv.appendChild(downloadLink);
	document.body.appendChild(downloadDiv);
	// downloadLink = null;
	//downloadDiv = null;
	printdiv("__echarts_download_wrap__");
	var d = document.getElementById(
	'__echarts_download_wrap__'
	);
	d.onclick = null;
	d.innerHTML = '';
	document.body.removeChild(d);
	d = null;
}
