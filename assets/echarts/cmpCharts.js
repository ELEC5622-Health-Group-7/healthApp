	var chartBottom;
	var chartTop;
	var flashDivId;
	var bottomDivId;
	var topDivId;
	var flashId;
	var baseStr = new String();
	var testuse = 0;
	var basicRealTime = new Array();
	var cmpRealTime   = new Array();
	var testint = 24;
	var x;
	var holeY;
	var holeYOne;
    var holeYTwo;1
	var intervals = 0;
	var currentIndex = 0;
	var rememberDataLength = 0; 
	var dateArrayOne = new Array();
 	var dateArrayTwo = new Array();
 	var intervalArrayOne = new Array();
	var intervalArrayTwo = new Array();
	var stackinterval = 0;
	var stacknumber = 0;
	var zAxisMark = 0;
	var qAxisMark = 0;
	//-----
	var jsonResult;
	//-----
	/*
	 * 初始化图表
	 * @author wxcwater
	 * @param bottomDiv 底图所用div的id
	 * @param topDiv    上层图所用div的id
	 * @param flashDiv  flash的父div的id
	 * @param flash     flash的id(非flash的div的id)
	 * 
	 */
	function rmpChartinit(bottomDiv,topDiv,flashDiv,flash){
		flashDivId = flashDiv;
		bottomDivId = bottomDiv; 
		topDivId = topDiv;
		flashId  = flash;
		chartBottom = echarts.init(document.getElementById(bottomDivId));
		chartTop    = echarts.init(document.getElementById(topDivId));
	}
	/*
	 * 更新图标数据，并将两图做关联
	 * @author wxcwater
	 */
	function upDatechart(optionBottom,optionTop){
				chartBottom.setOption(optionBottom,true);
			 	chartTop.setOption(optionTop,true);//加载数据
			   	// chartTop.connect(chartBottom);
			   	// chartBottom.connect(chartTop);//添加联动
			   	//chartTop.on('dataZoom', Countinternal);
			   	chartBottom.refresh();
			   	chartTop.refresh();//刷新
	}
	/*
	 * 图表打印功能
	 * @author wxcwater
	 */
	function cmpChartprint(){
		var image = chartBottom.getDataURL('jpeg');
		var imageback = chartTop.getDataURL('jpeg');
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
		downloadLink.innerHTML = '<img id="wxcwaterimg" style="vertical-align:middle;margin-top:35px;width:818px;" src="' + imageback
		+'"/><img id="wxcwaterimgt" style="vertical-align:middle;margin-top:-453px;height:340;" src="' + image+'"/>';
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
	/*
	 * 图表淡出功能起始方法
	 * @author wxcwater
	 * ps:因为指定div开始时隐藏状态，显示div后swf才会加载，因此此步只显示div待swf加载完成后回调其他方法继续导出
	 */
	function cmpChartExport(){
		var image = chartBottom.getDataURL('jpeg');
		var imageback = chartTop.getDataURL('jpeg');
		if(image.length==0){
			// alert("对不起，您使用的浏览器版本过低,\n暂不支持本图表的一键导出功能，请升级浏览器或使用其他截图工具\n给您带来的不便尽请谅解");
			return;
		}
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
		downloadLink.innerHTML = '<img id="wxcwaterimg" style="vertical-align:middle" src="' + image 
		+'"/><img id="wxcwaterimgt" style="vertical-align:middle" src="' + imageback+'"/>';
		downloadDiv.appendChild(downloadLink);
		document.body.appendChild(downloadDiv);
		// downloadLink = null;
		//downloadDiv = null;
		baseStr = document.getElementById("wxcwaterimg").src;
		baseStrt= document.getElementById("wxcwaterimgt").src;
		// downloadLink = null;
		//downloadDiv = null;
		baseStr = document.getElementById("wxcwaterimg").src;
		var d = document.getElementById(
		'__echarts_download_wrap__'
		);
		d.onclick = null;
		d.innerHTML = '';
		document.body.removeChild(d);
		d = null;
		if ( $.browser.msie ) {
			closeUI();
		}
		document.getElementById(flashDivId).style.display='block';
		document.getElementById(bottomDivId).style.display='none';
		document.getElementById(topDivId).style.display='none';
	}
	/*
	 * 此方法在图片导出结束或取消后回到图表显示的样式
	 * @author wxcwater
	 */
	function returnToChart(){
		document.getElementById(flashDivId).style.display='none';
		document.getElementById(bottomDivId).style.display='block';
		document.getElementById(topDivId).style.display='block';
	}
	/*
	 * 此方法是自动重新适应宽高的方法，考虑到可能有这个需求加入的
	 * @author wxcwater
	 */
	function cmpChartResize(){
		chartBottom.resize();
		chartTop.resize();
	}
	
	/* 打印指定div
	 * @author wxcwater
	 * @date   2014-9-17
	 */
	function printdiv(printpage){
		var headstr = "<html><head><title></title></head><body>";
		var footstr = "</body>";
		var newstr = document.all.item(printpage).innerHTML;
		var oldstr = document.body.innerHTML;
		myWindow=window.open('','','width=200,height=100');
		//myWindow.document.write("This is 'myWindow'")
		myWindow.document.body.innerHTML = headstr+newstr+footstr;
		myWindow.print();
		return false;
	}
	/*
	 * 当swf加载完成后回调此函数继续进行图片导出的工作
	 * @author wxcwater
	 */
	function forASToCallBack(){
	image = baseStr;//获得图表的base64字符串
		imaget= baseStrt;
		imaget= imaget.replace("data:image/jpeg;base64,", "");
		image = image.replace("data:image/jpeg;base64,", ""); //去掉字符串的头部信息，否则图表转换有问题
		thisMovie(flashId).sendToActionScriptForExportBaseImage(image,imaget);//将base64字符串送入swf继续处理并下载到本地
		
	}
//function getrealdatabydateArrayDate(date);
function getdatabydateArrayDate(date,dateArray,otherDateArray,baseZ,baseQ,cmpZ,cmpQ){
		var dateIndex = 0;
		for(var i  = 0;i<dateArray.length;i++){
			if(dateArray[i]==date){
				dateIndex = i;
			}
		}
		var otherDateIndex = dateIndex/dateArray.length * otherDateArray.length;
		otherDateIndex = Math.round(otherDateIndex);
		var otherDate = otherDateArray[otherDateIndex];
		var otherDateZ  = '';   //= baseZ[otherDateIndex];
		var otherDateQ	= '';   //= baseQ[otherDateIndex];
		var dateZ       = '';   //= cmpZ[dateIndex];
		var dateQ       = '';   //= cmpQ[dateIndex];
		for(var i = 0;i<jsonResult.oneTm.length;i++){
			if(otherDate==jsonResult.oneTm[i]){
				if(jsonResult.oneZ[i]!='-'){
				otherDateZ = jsonResult.oneZ[i].toFixed(2);
				}
				if(jsonResult.oneQ[i]!='-'){
				otherDateQ = jsonResult.oneQ[i].toFixed(1);
				}
			}
		}
		for(var i = 0;i<jsonResult.TwoTm.length;i++){
			if(date==jsonResult.TwoTm[i]){
				if(jsonResult.TwoZ[i]!='-'){
				dateZ = jsonResult.TwoZ[i].toFixed(2);
				}
				if(jsonResult.TwoQ[i]!='-'){
				dateQ = jsonResult.TwoQ[i].toFixed(1);
				}
			}
		}
		try{
		Ext.getCmp('nt').setValue(otherDate);
		Ext.getCmp('ct').setValue(date);
		}catch(e){
		}
		Ext.getCmp('swz').setValue(otherDateZ);
		Ext.getCmp('llz').setValue(otherDateQ);
		Ext.getCmp('lsswz').setValue(dateZ);	
		Ext.getCmp('lsllz').setValue(dateQ);
		//put put put wxcwatertodolist
	}





	function getBasicRealFormatter(params,resTm,basicToArray,status){
			//for(var i = 0;i<basicToArray.length;i++){
				//if(resTm==basicToArray[i]){
					 if(status==11){
					 var res = params[0][1];
					 for(var i = 0;i<params.length;i++){
					 	 var tempParam =  Number(params[i][2]);
					 	 if(isNaN(tempParam)){
					 	 	tempParam = '-';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	 if(params[i][0]=="当前水位"){
					 	 	Ext.getCmp('swz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="当前流量"){
					 	 	Ext.getCmp('llz').setValue(tempParam);
					 	 }
					 }
						 if(res==params[0][1]){
					 	return null;
					 }
				   	 return res;
				   	}else if(status==12){

				   	 var res = params[0][1];
				   	 for(var i = 0;i<params.length;i++){
					 	 var tempParam =  Number(params[i][2]);
					 	 if(isNaN(tempParam)){
					 	 	tempParam = '';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	  if(params[i][0]=="历史水位"){
					 	 	Ext.getCmp('lsswz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史流量"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	
					 }
					 		 if(res==params[0][1]){
					 	return null;
					 }
				   	 return res;
				   	}
				//}
			//}
			var res = '';
			return res;
				   	           
				  
	}
	function getIntervalArray(_datalength,dateArray,zoom){
			var indextArray = [];
			var middleStart = 0;
			var middleEnd   = 0;
			middleStart = Math.floor(dateArray.length*(zoom.start/100));
			middleEnd   = Math.floor(dateArray.length*(zoom.end/100));
			// console.log("计算起始点："+dateArray[middleStart]);
			// console.log("计算结束点："+dateArray[middleEnd]);
			// console.log("计算宽度"+_datalength);
			var middleDateArray = new Array();
			for(var tempUseindex = middleStart;tempUseindex<middleEnd;tempUseindex++){
				middleDateArray.push(dateArray[tempUseindex]);
			}
 			 if(_datalength<=24){
 			 		echartsGinterval = 0;
 			 		var remember = 0;
 			 		var rememberIndex = 0;
			    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
			    			if(remember==0&&middleDateArray[0]==dateArray[0]){
			    				remember = 1;
			    			}else{
			    				var tempInterval = tempx - rememberIndex;
			    				indextArray.push(tempInterval);
			    				rememberIndex = tempx;
			    			}
			    	}
			    	}else if(_datalength<=96){
					echartsGinterval = 0;
 			 		var remember = 0;
 			 		var rememberIndex = 0;
			    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
			    		if(middleDateArray[tempx].substr(11,2)=='00'||middleDateArray[tempx].substr(11,2)=='06'||middleDateArray[tempx].substr(11,2)=='12'||middleDateArray[tempx].substr(11,2)=='18'){
			    			if(remember==0&&middleDateArray[0]==dateArray[0]){
			    				remember = 1;
			    			}else{
			    				var tempInterval = tempx - rememberIndex;
			    				indextArray.push(tempInterval);
			    				rememberIndex = tempx;
			    			}
			    		}
			    	}
			    }else {
			    		if(_datalength<=720){
			    			echartsGinterval = 0;
						 	var remember = 0;
						 	var rememberIndex = 0;
					    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
					    		if(middleDateArray[tempx].substr(11,2)=='00'){
					    			if(remember==0&&middleDateArray[0]==dateArray[0]){
					    				remember = 1;
					    			}else{
					    				var tempInterval = tempx - rememberIndex;
					    				indextArray.push(tempInterval);
					    				rememberIndex = tempx;
					    			}
					    		}
					    	}
			    		}else if(_datalength>=720&&_datalength<=1440){
			    			chartsGinterval = 0;
						 	var remember = 0;
						 	var rememberIndex = 0;
					    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
					    		if(middleDateArray[tempx].substr(11,2)=='00'&&(middleDateArray[tempx].substr(8,2)=='01'||middleDateArray[tempx].substr(8,2)=='05'||middleDateArray[tempx].substr(8,2)=='10'||middleDateArray[tempx].substr(8,2)=='15'||middleDateArray[tempx].substr(8,2)=='20'||middleDateArray[tempx].substr(8,2)=='25')){
					    			if(remember==0&&middleDateArray[0]==dateArray[0]){
					    				remember = 1;
					    			}else{
					    				var tempInterval = tempx - rememberIndex;
					    				indextArray.push(tempInterval);
					    				rememberIndex = tempx;
					    			}
					    		}
					    	}
			    		}else if(_datalength>=1440&&_datalength<=3600){
			    			chartsGinterval = 0;
						 	var remember = 0;
						 	var rememberIndex = 0;
					    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
					    		if(middleDateArray[tempx].substr(11,2)=='00'&&(middleDateArray[tempx].substr(8,2)=='01'||middleDateArray[tempx].substr(8,2)=='10'||middleDateArray[tempx].substr(8,2)=='20')){
					    			if(remember==0&&middleDateArray[0]==dateArray[0]){
					    				remember = 1;
					    			}else{
					    				var tempInterval = tempx - rememberIndex;
					    				indextArray.push(tempInterval);
					    				rememberIndex = tempx;
					    			}
					    		}
					    	}
			    		}else if(_datalength>3600){
			    			chartsGinterval = 0;
						 	var remember = 0;
						 	var rememberIndex = 0;
					    	for(var tempx = 1;tempx<middleDateArray.length;tempx++){
					    		if(middleDateArray[tempx].substr(11,2)=='00'&&(middleDateArray[tempx].substr(8,2)=='01'||middleDateArray[tempx].substr(8,2)=='15')){
					    			if(remember==0&&middleDateArray[0]==dateArray[0]){
					    				remember = 1;
					    			}else{
					    				var tempInterval = tempx - rememberIndex;
					    				indextArray.push(tempInterval);
					    				rememberIndex = tempx;
					    			}
					    		}
					    	}
			    		}	
			    }
			  // alert(indextArray);
			  return indextArray;
	}
	
	/*
     * 根据选定的datazoom重新计算适合的间隔
	 * @author wxcwater
	*/
	function Countinternal(params){
		 	intervalArrayOne = [];
		 	intervalArrayTwo = []; 
			var zoom = params.zoom;
			// console.log(zoom.start);
			// console.log(zoom.end);
			x = Math.floor(testint*(zoom.end-zoom.start)/100);
			holeYOne = Math.floor(dateArrayOne.length*(zoom.end-zoom.start)/100);
			holeYTwo = Math.floor(dateArrayTwo.length*(zoom.end-zoom.start)/100);
			intervalArrayOne = getIntervalArray(holeYOne,dateArrayOne,zoom);
			intervalArrayTwo = getIntervalArray(holeYTwo,dateArrayTwo,zoom);
			chartTop.refresh();//刷新
			chartBottom.refresh();
			
	}
	function test_getInter(dateArray){
		var totalday = dateArray.length / 24; //得出数据一共多少天
		var totalDays= new Array();
		var totalDaysIndex = new Array();
		var totalInterval = 0;
		for(var i = 0;i<dateArray.length;i++){
			if(dateArray[i].substr(11,2)=='00'){
				totalDays.push(dateArray[i]);
				totalDaysIndex.push(i);
			}
		}
		totalInterval = totalday/10;
		var basicIndex = new Array();
		if(totalInterval<=1.5){
			for(var i = 0;i<totalDays.length;i=i+1){
					basicIndex.push(totalDaysIndex[i]);
			}
		}else if(totalInterval<2.5){
			for(var i = 0;i<totalDays.length;i=i+2){
					basicIndex.push(totalDaysIndex[i]);
			}
		}else if(totalInterval<=3.5){
			for(var i = 0;i<totalDays.length;i=i+3){
					basicIndex.push(totalDaysIndex[i]);
			}
		}else if(totalInterval<=4.5){
				for(var i = 0;i<totalDays.length;i=i+4){
					basicIndex.push(totalDaysIndex[i]);
			}
		}else if(totalInterval<=10){
			//case week 7
			for(var i = 0;i<totalDays.length;i=i+7){
					basicIndex.push(totalDaysIndex[i]);
				
			}
		}else if(totalInterval<=14){
			//case ten day 10
			for(var i = 0;i<totalDays.length;i++){
					if(totalDays[i].substr(8,2)=='10'||totalDays[i].substr(8,2)=='20'||totalDays[i].substr(8,2)=='01'){
					basicIndex.push(totalDaysIndex[i]);
					}
			}
		}else if(totalInterval<=20){
			//case half-mounth 15
			for(var i = 0;i<totalDays.length;i++){
					if(totalDays[i].substr(8,2)=='15'||totalDays[i].substr(8,2)=='01'){
					basicIndex.push(totalDaysIndex[i]);
					}
			}
		}else if(totalInterval<=64){
			//case mounth 30
			for(var i = 0;i<totalDays.length;i++){
					if(totalDays[i].substr(8,2)=='01'){
					basicIndex.push(totalDaysIndex[i]);
					}
			}
		}
		if((dateArray.length-1) - basicIndex[basicIndex.length-1]<totalInterval*24*0.5){
			basicIndex[basicIndex.length-1] = dateArray.length-1;
		}else{
			basicIndex.push(dateArray.length-1);
		}
		if((basicIndex[0]-0)<24*totalInterval*0.5){
			basicIndex[0] = 0;
		}else{
			basicIndex.push(0);
		}
		return basicIndex;
	}
	function getCatLabelOut(_datalength,dateArray,value,axisName){
			var res = [];
			var _value =value;
			if(currentIndex>=dateArray.length||_datalength!=rememberDataLength){
				rememberDataLength = _datalength;
				currentIndex = 0;
			}else{
				currentIndex++;		
			}
			    	if(_datalength<=24){
			    		if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    		}else if(_value.substr(11,2)=='00'){
			    			res[0] = _value.substr(8,2) ;
			    			res[1] =  '日';
			    			
			    		}else{
			    			
			    			res[0] = value.substr(11,2) ;
			    			res[1] =  '时';
			    		}
			    	}else if(_datalength<=96){
			    		if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    		}else if(_value.substr(11,2)=='00'){
			    			res[0] = _value.substr(8,2) ;
			    			res[1] =  '日';
			    		}else{
			    			if(_value.substr(11,2)=='06'||_value.substr(11,2)=='12'||_value.substr(11,2)=='18'){
			    				
			    			res[0] = _value.substr(11,2) ;
			    			res[1] =  '时';
			    		}else{
			    			
			    			res[0] =  '';
			    			}
			    		}
			    	}else {
			    		if(_datalength<=720){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'){
			    				
			    				res[0] = _value.substr(5,2) ;
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'){
			    					res[0] = _value.substr(8,2) ;
			    					res[1] = '日';
			    			}else{
			    				
			    				res[0] = '';
			    			}
			    		}else if(_datalength>=720&&_datalength<=1440){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				
			    				res[0] = _value.substr(5,2) ;
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='05'||_value.substr(8,2)=='10'||_value.substr(8,2)=='15'||_value.substr(8,2)=='20'||value.substr(8,2)=='25'){
			    					res[0] = _value.substr(8,2) ;
			    					res[1] =  '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}else if(_datalength>=1440&&_datalength<=3600){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				res[0] = _value.substr(5,2) ;
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='10'||_value.substr(8,2)=='20'){
			    					res[0] = _value.substr(8,2) ;
			    					res[1] =  '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}else if(_datalength>3600){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				res[0] = _value.substr(5,2) ;
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='15'){
		    					res[0] = _value.substr(8,2) ;
		    					res[1] =  '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}
			    	}
			    	if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    		if(_value==dateArray[dateArray.length-1]){
			    			res = [];
			    			res[0] = '    ';
			    			res[1] = _value.substr(11,2) ;
			    			res[2] =  '时';
			    		}
			    		var text = res.join("");
			    		return text;
			    	}else{
			    		if(res.length<=1||tempusevalue!=0){
			    			if(res.length>1){
			    				tempusevalue = 0;
			    			}
			    			return '';
			    		}
					var text = res.join("");
			    	return text;
			    	}
	}
	function getLabelOut(_datalength,dateArray,value,axisName){
			var res = [];
			var _value = dateArray[Math.round(value)];
			if(currentIndex>=dateArray.length||_datalength!=rememberDataLength){
				rememberDataLength = _datalength;
				currentIndex = 0;
			}else{
				currentIndex++;		
			}
			    	if(_datalength<=24){
			    		if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2)
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2)
			    			res[7] = '   ';
			    		}else if(_value.substr(11,2)=='00'){
			    			res[0] = _value.substr(8,2);
			    			res[1] = '日';
			    		}else{
			    			res[0] = value.substr(11,2);
			    			res[1] = '时';
			    		}
			    	}else if(_datalength<=96){
			    		if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    		}else if(_value.substr(11,2)=='00'){
			    			res[0] = _value.substr(8,2) ;
			    			res[1] =  '日';
			    		}else{
			    			if(_value.substr(11,2)=='06'||_value.substr(11,2)=='12'||_value.substr(11,2)=='18'){
			    			res[0] = _value.substr(11,2);
			    			res[1] = '时';
			    		}else{
			    			res[0] =  '';
			    			}
			    		}
			    	}else {
			    		if(_datalength<=720){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'){
			    				res[0] = _value.substr(5,2);
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'){
			    					res[0] = _value.substr(8,2);
			    					res[1] =  '日';
			    			}else{
			    				res[0] = '';
			    			}
			    		}else if(_datalength>=720&&_datalength<=1440){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				res[0] = _value.substr(5,2);
			    				res[1] = '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='05'||_value.substr(8,2)=='10'||_value.substr(8,2)=='15'||_value.substr(8,2)=='20'||_value.substr(8,2)=='25'){
			    					res[0] = _value.substr(8,2) ;
			    					res[1] = '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}else if(_datalength>=1440&&_datalength<=3600){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				res[0] = _value.substr(5,2) ;
			    				res[1] = '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='10'||_value.substr(8,2)=='20'){
			    					res[0] = _value.substr(8,2);
			    					res[1] = '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}else if(_datalength>3600){
			    			if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    			tempusevalue++;
			    			res[0] =  axisName;
			    			res[1] = ':';
			    			res[2] = _value.substr(5,2);
			    			res[3] = '/';
			    			res[4] = _value.substr(8,2);
			    			res[5] = '-';
			    			res[6] = _value.substr(11,2);
			    			res[7] = '   ';
			    			}else if(_value.substr(8,2)=='01'&&_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				res[0] = _value.substr(5,2) ;
			    				res[1] =  '月';
			    			}else if(_value.substr(11,2)=='00'&&(currentIndex+72)<dateArray.length){
			    				if(_value.substr(8,2)=='15'){
		    					res[0] = _value.substr(8,2);
		    					res[1] = '日';
			    				}
			    			}else{
			    				res[0] = '';
			    			}
			    		}
			    	}
			    	if(_value==dateArray[0]||_value==dateArray[dateArray.length-1]){
			    		if(_value==dateArray[dateArray.length-1]){
			    			res = [];
			    			res[0] = '    ';
			    			res[1] = _value.substr(11,2);
			    			res[2] = '时';
			    		}
			    		var text = new String();
			    		text = res.join("");
			    		return text;
			    	}else{
			    		if(res.length==0||tempusevalue!=0){
			    			if(res.length>1){
			    				tempusevalue = 0;
			    			}
			    			
			    			return '';
			    		}
						
				var text = new String();
				text = res.join("");
			    	return text;
			    	}
	}
	function countTheJsonToOption(startDateOne,endDateOne,startDateTwo,endDateTwo,json){
		//先根据日期获得两个完整字符串
		 jsonResult = json;
		 dateArrayOne = getDateArrayBetweenTwoDate(startDateOne,endDateOne);
		 test_intervalArrayOne = test_getInter(dateArrayOne);
		 dateArrayTwo = getDateArrayBetweenTwoDate(startDateTwo,endDateTwo);
		 test_intervalArrayTwo = test_getInter(dateArrayTwo);
		 intervalArrayOne = new Array();
 		 intervalArrayTwo = new Array();
		 var intervalArrayOneIndex = 1;
		 intervalArrayOne[0] = 0;
		 for(var i = 0;i<test_intervalArrayOne.length;i++){
		 	if(i == 0 ){
		 		intervalArrayOne[intervalArrayOneIndex] = test_intervalArrayOne[i] - 0 ;
		 	}else{
		 		intervalArrayOne[intervalArrayOneIndex] = test_intervalArrayOne[i] - test_intervalArrayOne[i-1];
		 	}
		 	intervalArrayOneIndex++;
		 }

		//var dateArrayTwo = getDateArrayBetweenTwoDate();
		//根据服务器返回的日期串拼装data
		
		var baseZ = new Array();
		var baseQ = new Array();
		var cmpZ = new Array();
		var cmpQ = new Array();
		var tempIndex = 0;
		var nullNum = 0;
		var middleArray = new Array();
		var middleArrayQ = new Array();
		var basicRealTime = json.oneTm;
		var cmpRealTime   = json.TwoTm;
		var scatterBZ = new Array();
		var avgQ;
		var avg;
		var scatterBQ = new Array();
		var scatterCZ = new Array();
		var scatterCQ = new Array();
		  for(var i=0;i<dateArrayOne.length;i++){
		  		while(tempIndex>0&&json.oneTm[tempIndex]==json.oneTm[tempIndex-1]){
			  				tempIndex++;
			  	 }	
		  		if(json.oneTm[tempIndex]==dateArrayOne[i]){
		  			if(json.oneZ[tempIndex]!='-'){
		  				scatterBZ.push([i,json.oneZ[tempIndex]]);
		  			}
		  			if(json.oneQ[tempIndex]!='-'){
						scatterBQ.push([i,json.oneQ[tempIndex]]);
					}
			  			if(nullNum==0){
			  					baseZ.push(json.oneZ[tempIndex]);
			  					baseQ.push(json.oneQ[tempIndex]);
			  					tempIndex++;
			  			}else{
			  				if(baseZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(0);
				  				 		middleArrayQ.push(0);
				  				 	}
				  				 baseZ = baseZ.concat(middleArray);
				  				 baseQ = baseQ.concat(middleArrayQ);
				  				 middleArray = new Array();
				  				 middleArrayQ = new Array();
				  				 nullNum = 0;
				  				 baseZ.push(json.oneZ[tempIndex]);
				  				 baseQ.push(json.oneQ[tempIndex]);
				  				tempIndex++;
			  				}else{
			  					
			  				  avg = (json.oneZ[tempIndex] - json.oneZ[tempIndex-1])/nullNum;
			  				  avgQ=  (json.oneQ[tempIndex] - json.oneQ[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(baseZ[baseZ.length-1]+(avg*(t+1)));
			  				 		middleArrayQ.push(baseQ[baseQ.length-1]+(avgQ*(t+1)));
			  				 		
			  				 	}
			  				 baseZ = baseZ.concat(middleArray);
			  				 baseQ = baseQ.concat(middleArrayQ);
			  				 middleArray = new Array();
			  				 middleArrayQ = new Array();
			  				 nullNum = 0;
			  				 baseZ.push(json.oneZ[tempIndex]);
			  				 baseQ.push(json.oneQ[tempIndex]);
			  				 tempIndex++;
			  				}
			  				
			  			}
			  			
		  		}else{
		  			if(i==dateArrayOne.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(0);
	  				 		middleArrayQ.push(0);
	  				 	}
	  				 baseZ = baseZ.concat(middleArray);
	  				 baseQ = baseQ.concat(middleArrayQ);
	  				 middleArray = new Array();
	  				 middleArrayQ = new Array();
	  				 nullNum = 0;
		  				
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}
		 tempIndex = 0;
		nullNum = 0;
		middleArray = new Array();
		middleArrayQ = new Array();
		  
		  for(var i=0;i<dateArrayTwo.length;i++){
		  		while(tempIndex>0&&json.TwoTm[tempIndex]==json.TwoTm[tempIndex-1]){
			  				tempIndex++;
			  	 }
		  		if(json.TwoTm[tempIndex]==dateArrayTwo[i]){
		  			if(json.TwoZ[tempIndex]!='-'){
		  				scatterCZ.push([i,json.TwoZ[tempIndex]]);
		  			}
		  			if(json.TwoQ[tempIndex]!='-'){
						scatterCQ.push([i,json.TwoQ[tempIndex]]);
					}
			  			if(nullNum==0){
			  					cmpZ.push(json.TwoZ[tempIndex]);
			  					cmpQ.push(json.TwoQ[tempIndex]);
			  					
			  					
			  					tempIndex++;
			  			}else{
			  				if(cmpZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(0);
				  				 		middleArrayQ.push(0);
				  				 	}
				  				 cmpZ = cmpZ.concat(middleArray);
				  				 cmpQ = cmpQ.concat(middleArrayQ);
				  				 middleArray = new Array();
				  				 middleArrayQ = new Array();
				  				 nullNum = 0;
				  				 cmpZ.push(json.TwoZ[tempIndex]);
				  				 cmpQ.push(json.TwoQ[tempIndex]);
				  				tempIndex++;
			  				}else{
			  				  avg = (json.TwoZ[tempIndex] - json.TwoZ[tempIndex-1])/nullNum;
			  				  avgQ=  (json.TwoQ[tempIndex] - json.TwoQ[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(cmpZ[cmpZ.length-1]+(avg*(t+1)));
			  				 		middleArrayQ.push(cmpQ[cmpQ.length-1]+(avgQ*(t+1)));
			  				 	}
			  				 cmpZ = cmpZ.concat(middleArray);
			  				 cmpQ = cmpQ.concat(middleArrayQ);
			  				 middleArray = new Array();
			  				 middleArrayQ = new Array();
			  				 nullNum = 0;
			  				 cmpZ.push(json.TwoZ[tempIndex]);
			  				 cmpQ.push(json.TwoQ[tempIndex]);
			  				 tempIndex++;
			  				}	
			  			}
			  			if(tempIndex>0&&json.TwoTm[tempIndex]==json.TwoTm[tempIndex-1]){
			  				tempIndex++;
			  			}	
		  		}else{								
		  			if(i==dateArrayTwo.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(0);
	  				 		middleArrayQ.push(0);
	  				 	}
	  				 cmpZ = cmpZ.concat(middleArray);
	  				 cmpQ = cmpQ.concat(middleArrayQ);
	  				 middleArray = new Array();
	  				 middleArrayQ = new Array();
	  				 nullNum = 0;
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}

		  var ZAxisMax = 0;
		  var ZAxisMin = scatterBZ.length==0?0:scatterBZ[0][1];
		  var QAxisMax = 0;
		  var QAxisMin = scatterBQ.length==0?0:scatterBQ[0][1];
		  for(var i = 0;i<scatterBZ.length;i++){
			
			  if(scatterBZ[i][1]!='-'&&ZAxisMax<scatterBZ[i][1]){
				  ZAxisMax = scatterBZ[i][1];
			  }
			  if(i<scatterBQ.length&&scatterBQ[i][1]!='-'&&QAxisMax<scatterBQ[i][1]){
				  QAxisMax = scatterBQ[i][1];
			  }
			  if(scatterBZ[i][1]!='-'&&ZAxisMin>scatterBZ[i][i]){
				  ZAxisMin = scatterBZ[i][1];
			  }
			  if(i<scatterBQ.length&&scatterBQ[i][1]!='-'&&QAxisMin>scatterBQ[i][1]){
				  QAxisMin = scatterBQ[i][1];
			  }
		  }
		  // alert('z'+ZAxisMax+' '+ZAxisMin)
		  // alert('in'+IOAxisMin+" "+IOAxisMax);
		  for(var i = 0;i<scatterCZ.length;i++){
			  
				  if(ZAxisMax<scatterCZ[i][1]){
					  ZAxisMax = scatterCZ[i][1];
				  }
				  if(i<scatterCQ.length&&QAxisMax<scatterCQ[i][1]){
					  QAxisMax = scatterCQ[i][1];
				  }
				  if(ZAxisMin>scatterCZ[i][1]){
					  ZAxisMin = scatterCZ[i][1];
				  }
				  if(i<scatterCQ.length&&QAxisMin>scatterCQ[i][1]){
					  QAxisMin = scatterCQ[i][1];
				  }
				
		  }
		  

		  
		  if(QAxisMin>=QAxisMax){
		  	if(QAxisMax==0){
		  		QAxisMin = 0;
		  	}else{
		  		QAxisMin = QAxisMax - 2 ;
		  	}
		  	
		  	QAxisMax = QAxisMax + 2;
		  }
		  if(ZAxisMax==ZAxisMin){
		  	ZAxisMax++;
		  	ZAxisMin--;
		  	if(ZAxisMin<0){
		  		ZAxisMin = 0;
		  	}
		  }
		    QAxisMax = QAxisMax + QAxisMax*0.01;
		    QAxisMin = QAxisMin - QAxisMin*0.01;
		    ZAxisMax = ZAxisMax + ZAxisMax*0.01;
		    ZAxisMin = ZAxisMin - ZAxisMin*0.01;
		  // alert("4");
		 	holeYOne = Math.floor(dateArrayOne.length);
			holeYTwo = Math.floor(dateArrayTwo.length);
 			 // alert("2");
 			var tempzoom =new Object();
 			tempzoom.start = 0;
 			tempzoom.end   = 100;
 			 // alert("46");
 			
			// intervalArrayTwo = getIntervalArray(holeYOne,dateArrayOne,tempzoom);
			// intervalArrayOne = getIntervalArray(holeYTwo,dateArrayTwo,tempzoom);
			var rememberAxisLabel = 0;

			zAxisMark = 0;
			qAxisMark = 0;
			if(scatterBZ.length==0){
				scatterBZ = [[0,'-'],[dateArrayOne.length-1,'-']];
			}
			if(scatterBQ.length==0){
				scatterBQ = [[0,'-'],[dateArrayOne.length-1,'-']];
			}
			if(scatterCZ.length==0){
				scatterCZ = [[0,'-'],[dateArrayTwo.length-1,'-']];
			}
			if(scatterCQ.length==0){
				scatterCQ = [[0,'-'],[dateArrayTwo.length-1,'-']];
			}
		    var optionArray = new Array();
		    var  option = {
							tooltip : {
								show:false   
							},
							legend: {
								data:['当前水位','历史水位','当前流量','历史流量']
							},
							toolbox: {
								show : false
							},
							xAxis : [
								{
									type : 'value',
									scale:true,
									splitNumber:dateArrayOne.length,
									max:dateArrayOne.length,
									min:0,
									axisLabel : {
										show:true,
										formatter: function (value) {
										var xvalue = dateArrayOne[Math.round(value)];
										for(var i = 0;i<test_intervalArrayOne.length;i++){
										if(dateArrayOne[test_intervalArrayOne[i]]==xvalue){
										var tempvalue = xvalue.substr(5,5);
										if(i>0&&tempvalue==dateArrayOne[test_intervalArrayOne[i-1]].substr(5,5)){
										tempvalue = xvalue.substr(11,2)+'时'; 
										}else {

										}
										return tempvalue;
										}
										}
										return '';
										},        // Template
										textStyle: {
											fontFamily: 'Calibri',
											fontSize: 11.5,
											color:'#3D3D3D',
											fontStyle: 'normal'
										}
									},
									axisLine:{
										lineStyle: {
										color: 'black',
										type: 'solid',
										width: 1
										}
									},
									splitLine:{
										show:true,
										lineStyle: {
											color: '#ccc',
											type: 'solid',
											width: 1
										}
									}
								},
								{
								type : 'value',
								show:true,
								splitNumber:dateArrayTwo.length,
								max:dateArrayTwo.length,
								min:0,
								axisLabel:{show:false},
								axisLine:{show:false},
								splitLine:{
									show:false,
									lineStyle: {
										color: 'red',
										type: 'dashed',
										width: 1
									}
								}
								}
							],
							yAxis : [
							{
							type : 'value',
							name:'水位(m)',
							max:ZAxisMax,
							min:ZAxisMin,
							splitNumber: 5,
							axisLabel : {
								show:true,
								interval: 'auto',    // {number}

								margin: 8,
								formatter: function (value) {
								// Function formatter
								// if(Math.round(value)==Math.round(ZAxisMax)&&zAxisMark==0){
								// 	zAxisMark = 1;
								// 	return '\n水位(m)\n' + value.toFixed(2) + '';
								// }
								return value.toFixed(2) + '';
								},        // Template formatter!
								textStyle: {
									fontFamily: 'Calibri',		
									fontSize:11.5,   		
									color:'#3D3D3D',                      
									fontStyle: 'normal'
								//fontWeight:'bold'
								}
							},
							axisLine:{
								lineStyle: {
									color: 'red',
									type: 'solid',
									width: 1
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
							axisTick:{
								show:true,
								lineStyle:{
									color:'red'
								}
							}
							},
							{
							type : 'value',
							name:'流量(m³/s)',
							splitNumber: 5,
							max:Math.round(QAxisMax),
							min:Math.round(QAxisMin),
							axisLabel : {
								show:true,
								interval: 'auto',    // {number}

								margin: 8,
								formatter: function (value) {
								// Function formatter
								value = value.toFixed(1);
								// if(value==Math.round(QAxisMax)&&qAxisMark==0){
								// 	qAxisMark = 1;
								// 	return '\n流量(m3/s)\n' + value.toFixed(0) + '';
								// }
								return value + '';
								},        // Template formatter!
								textStyle: {
									fontFamily: 'Calibri',		
									fontSize:11.5,
									color:'#3D3D3D',   		                   
									fontStyle: 'normal'
								}
							},
							axisLine:{
								lineStyle: {
									color: 'blue',
									type: 'solid',
									width: 1
								}
							},
							axisTick:{
								show:true,
								lineStyle:{
									color:'blue'
								}
							}
							}
							],
							series : [
							{
								name:'当前水位',
								type:'line',
								large: false,
								symbolSize:3,
								symbol:'circle',
								largeThreshold:2000,
								itemStyle: {normal: {color: '#CD0000',

								lineStyle: {

								type: 'solid',
								width: 1
								}

								}},
								data: scatterBZ
							},
							{
							name:'当前流量',
							type:'line',
							large: false,
							symbolSize:3,
							symbol:'circle',
							yAxisIndex:1,
							largeThreshold:2000,
							itemStyle: {normal: {color: '#191970',
							lineStyle: {

							type: 'solid',
							width: 1
							}}},
							data:scatterBQ
							},
							{
							name:'历史水位',
							type:'line',
							large: false,
							xAxisIndex:1,
							symbolSize:3,
							symbol:'circle',
							largeThreshold:2000,
							itemStyle: {normal: {color: '#EEC900',
							lineStyle: {

							type: 'solid',
							width: 1
							}}},
							data: scatterCZ
							},
							{
							name:'历史流量',
							type:'line',
							large: false,
							symbolSize:3,
							symbol:'circle',
							xAxisIndex:1,
							yAxisIndex:1,
							itemStyle: {normal: {color: '#6B8E23',
							lineStyle: {

							type: 'solid',
							width: 1
							}}},
							largeThreshold:2000,
							data:scatterCQ
							}
							]
							};
							                    
		   	
		  
		  var optionTwo = {
		   				tooltip : {
		   		        trigger: 'axis',
		   		         showContent:false,

		   		      
		   		        axisPointer:{
		   		        	type:'line',

		   		          		 lineStyle: {
		   		                    color: 'black',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		          	
		   		        },
		   		      
			   		      	formatter: function (params) {
				   	            var resTm = params[0][1];//时间
								//var res = getBasicRealFormatter(params,resTm,cmpRealTime,12);//使用新方法
								getdatabydateArrayDate(resTm,dateArrayTwo,dateArrayOne,baseZ,baseQ,cmpZ,cmpQ);
				   	            return '';
				   	        }
		   		    },
		   		    legend: {
		   		    	show:false,
		   		    	x:180,
		   		        data:['历史流量','历史水位','当前流量','当前水位']
		   		    
		   		    },
		   		      grid:{
		   		       	y:25,
		   		       	height:'70%',
				        borderColor:'rgba(0,0,0,0)'
				       
				    },
		   		    toolbox: {
		   		        show : false,
		   		        feature : {
		   		            mark : {show: true},
		   		            dataView : {show: false},
		   		            magicType : {show: false, type: ['line', 'bar']},
		   		            restore : {show: true},
		   		            saveAsImage : {show: false}
		   		        }
		   		    },
		   		      
		   			dataZoom : {
		   	        show : false,
		   	        realtime : true,
		   	        start : 0,
		   	         height:10,
					 y:355, 	
		   	        end : 100
		   	    	
		   	   		 },
		   	   		 animation : false,
			   		addDataAnimation:false,
			   		calculable:false,
		   		    xAxis : [
		   		        {
		   		            type : 'category',
		   		            position: 'bottom',
		   		            boundaryGap: false,
		   		            axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: '#ccc',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		                length: 10,
		   		                interval:function (value){
								 	for(var i = 0;i<test_intervalArrayTwo.length;i++){
								 		if(value==test_intervalArrayTwo[i]){
								 			return true;
								 		}
								 	}
								 	return false;
			    				},
		   		                lineStyle: {
		   		                    color: '#ccc',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		             axisLabel : {
		   		                show:true,
		   		                interval: 0,    // {number}
								 formatter: function (value){
								 	for(var i = 0;i<test_intervalArrayTwo.length;i++){
								 		if(dateArrayTwo[test_intervalArrayTwo[i]]==value){
								 			var tempvalue = value.substr(5,5);
								 			if(i>0&&tempvalue==dateArrayTwo[test_intervalArrayTwo[i-1]].substr(5,5)){
											 				tempvalue = value.substr(11,2)+'时'; 
											 			}else {
											 				
											 			}
								 			return tempvalue;
								 		}
								 	}
								 	return '';
			    					},
		   		                margin: 8,
		   		                textStyle: {
		   		                    fontFamily: 'Calibri',
		   		                    fontSize: 11.5,
		   		                    color:'#3D3D3D',
		   		                    fontStyle: 'normal'
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

		   		            data : dateArrayTwo
		   		            }
		   		        
		   		    ],
		   		    yAxis : [
		   		        {
		   		            type : 'value',
		   		        	max:ZAxisMax,
		   		        	min:ZAxisMin,
		   		            splitNumber: 5,
		   		         	 position :'right',
		   		            axisLabel : {
		   		            	show:false,
		   		                formatter: '{value}'
		   		            },
		   		              axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'dashed',
		   		                    width: 2
		   		                }
		   		            },
		   		            splitLine : {
		   		                show: false
		   		            }
		   		        },  {
		   		            type : 'value',
		   		            position: 'left',
		   		            splitNumber: 5,
		   		            max:QAxisMax,
		   		            min:QAxisMin,
		   		         	
		   		            axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'dashed',
		   		                    width: 2
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:false,
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 2
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:false,
		   		                interval: 'auto',    // {number}
		   		                rotate: -45,
		   		                margin: 18,
		   		                formatter: '{value} m3',    // Template formatter!
		   		                textStyle: {
		   		                    color: '#1e90ff',
		   		                    fontFamily: 'verdana',
		   		                    fontSize: 10,
		   		                    fontStyle: 'normal',
		   		                    fontWeight: 'bold'
		   		                }
		   		            },
		   		            splitLine : {
		   		                show:false,
		   		                lineStyle: {
		   		                    color: '#483d8b',
		   		                    
		   		                    type: 'dotted',
		   		                    width: 2
		   		                }
		   		            }
		   		            
		   		        }
		   		    ],
		   		    series : [
		   		           {
			   		            name:'历史流量',
			   		            type: 'line',
			   		         yAxisIndex: 1,
			   		      symbol:'emptyRectangle',
			   		         itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			   		            data:  ['-']     },
			   		         {
				   		            name:'当前流量',
				   		            type: 'line',
				   		         symbol:'emptyRectangle',
				   		         itemStyle: {normal: {color: '#191970'}},
				   		            data: ['-']},
				   		         {
					   		            name:'当前水位',
					   		            type: 'line',
					   		         symbol:'emptyCircle',
					   		         itemStyle: {normal: {color: '#ee0000'}},
					   		            data:  ['-']},
			   		        {
			   		            name:'历史水位',
			   		            type: 'line',
			   		         symbol:'emptyCircle',
			   		         itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			   		            data: ['-']}
		   		    ]
		   		};
		   		// alert("finish");
		  optionArray.push(option);
		  optionArray.push(optionTwo);
		  return optionArray;
	}
	
	function getDateByStr(strDate){
		var str = strDate;
		var stY = str.substr(0,4);
		var stM = str.substr(5,2);
		var stD = str.substr(8,2);
		var stH = str.substr(11,2);
		var Tm = new Date(stY,stM-1,stD,stH,00,00);
		return Tm;
	}
	function getDateArrayBetweenTwoDate(startDate,endDate){
		// alert(startDate+endDate);
		var stDATE = startDate;
		var enDATE = endDate;
        // alert(stDATE,enDATE);
		var stY = stDATE.substr(0,4);
		var stM = stDATE.substr(5,2);
		var stD = stDATE.substr(8,2);
		var stH = stDATE.substr(11,2);
		//console.log(stY+" "+stM+" "+stD+" "+stH);
        // alert("stDATE");
		var etY = enDATE.substr(0,4);
		var etM = enDATE.substr(5,2);
		var etD = enDATE.substr(8,2);
		var etH = enDATE.substr(11,2);
		  // alert("enDATE");
		// new  Date(yyyy,mth,dd,hh,mm,ss);
		var stTm = new Date(stY,stM-1,stD,stH,00,00);
		var edTm = new Date(etY,etM-1,etD,etH,00,00);
	    // alert("date");
		var dateArray = new Array();

		//dateArray.push(Ext.Date.format(stTm,"YYYY-mm-dd HH"));
		var tempTm = stTm;
		// alert("while");
		while(tempTm<=edTm){
			var tempY = tempTm.getFullYear();
			var tempM = tempTm.getMonth()+1;
          
			if(tempM<10){
				tempM = "0"+tempM.toString();
			}
			var tempD = tempTm.getDate();
			if(tempD<10){
				tempD = '0'+tempD.toString();
			}
			var tempH = tempTm.getHours();
			if(tempH<10){
				tempH = '0'+tempH.toString();
			}
			dateArray.push(tempY.toString()+"-"+tempM.toString()+"-"+tempD.toString()+" "+tempH.toString());
            
			var t = tempTm.getTime();
			t = t + 3600000;
			tempTm = new Date(t);
			
		}
        // alert(dateArray.length);
        // alert(dateArray);
		
		return dateArray;
	}

	function getPrintUsedOption(){
		var tempUsedOption = option;
		tempUsedOption.xAxis = [
		   		        {
		   		        	
		   		            type : 'category',
		   		            position: 'bottom',
		   		            boundaryGap: false,
		   		            //interval:Math.floor(dateArrayOne.length/20),
		   		            axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		             	//interval:Math.floor(dateArrayOne.length/20),
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:true,
		   		                    // {number}
		   		    			interval: 0,
		   		                margin: 8,
		   		                formatter: function (value){
							    	var result = getLabelOut(holeYOne,dateArrayOne,value,'当前时间');
							    	return result;
							    } ,
		   		                textStyle: {
		   		                    
		   		                    fontFamily: 'sans-serif',
		   		                    fontSize: 10,
		   		                    fontStyle: 'italic'
		   		                   
		   		                }
		   		            },
		   		            splitLine : {
		   		                show:false,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            splitArea : {
		   		                show: false,
		   		                areaStyle:{
		   		                    color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
		   		                }
		   		            },
		   		            data : dateArrayOne  },
		   		         {
		   		         		
			   		            type : 'category',
			   		            position: 'bottom',
			   		            boundaryGap: false,
			   		            axisLine : {    // 轴线
			   		                show: false,
			   		                //interval:Math.floor(dateArrayTwo.length/20),
			   		                lineStyle: {
			   		                    color: 'green',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		            axisTick : {    // 轴标记
			   		                show:false,
			   		                length: 10,
			   		                //interval:Math.floor(dateArrayTwo.length/20),
			   		                lineStyle: {
			   		                    color: 'red',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		            axisLabel : {
			   		                show:true,
			   		                interval: 0,    // {number}
			   		               
			   		                margin: -270,
			   		                formatter: function (value){
							    	var result = getLabelOut(holeYOne,dateArrayOne,value,'历史时间');
							    	return result;
							    	} ,
			   		                textStyle: {
			   		                    
			   		                    fontFamily: 'sans-serif',
			   		                    fontSize: 10,
			   		                    fontStyle: 'italic',
			   		                    fontWeight: 'bold'
			   		                }
			   		            },
			   		            splitLine : {
			   		                show:false,
			   		                lineStyle: {
			   		                    color: 'gray',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		          
			   		            data : dateArrayTwo
			   		            }
		   		       
		   		    ];
		   		    return tempUsedOption;
	}
	function returnToDefaultOption(){
		var tempUsedOption = option;
		tempUsedOption.xAxis = [
		   		        {
		   		        	
		   		            type : 'category',
		   		            position: 'bottom',
		   		            boundaryGap: false,
		   		            //interval:Math.floor(dateArrayOne.length/20),
		   		            axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		             	//interval:Math.floor(dateArrayOne.length/20),
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:true,
		   		                    // {number}
		   		    			interval: 0,
		   		                margin: 8,
		   		                formatter: function (value){
							    	var result = getLabelOut(holeYOne,dateArrayOne,value,'当前时间');
							    	return result;
							    } ,
		   		                textStyle: {
		   		                    
		   		                    fontFamily: 'sans-serif',
		   		                    fontSize: 10,
		   		                    fontStyle: 'italic'
		   		                   
		   		                }
		   		            },
		   		            splitLine : {
		   		                show:false,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            splitArea : {
		   		                show: false,
		   		                areaStyle:{
		   		                    color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
		   		                }
		   		            },
		   		            data : dateArrayOne  },
		   		         {
		   		         		
			   		            type : 'category',
			   		            position: 'bottom',
			   		            boundaryGap: false,
			   		            axisLine : {    // 轴线
			   		                show: false,
			   		                //interval:Math.floor(dateArrayTwo.length/20),
			   		                lineStyle: {
			   		                    color: 'green',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		            axisTick : {    // 轴标记
			   		                show:false,
			   		                length: 10,
			   		                //interval:Math.floor(dateArrayTwo.length/20),
			   		                lineStyle: {
			   		                    color: 'red',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		            axisLabel : {
			   		                show:false,
			   		                interval: 0,    // {number}
			   		               
			   		                margin: -270,
			   		                formatter: function (value){
							    	var result = getLabelOut(holeYOne,dateArrayOne,value,'历史时间');
							    	return result;
							    	} ,
			   		                textStyle: {
			   		                    
			   		                    fontFamily: 'sans-serif',
			   		                    fontSize: 10,
			   		                    fontStyle: 'italic',
			   		                    fontWeight: 'bold'
			   		                }
			   		            },
			   		            splitLine : {
			   		                show:false,
			   		                lineStyle: {
			   		                    color: 'gray',
			   		                    type: 'solid',
			   		                    width: 1
			   		                }
			   		            },
			   		          
			   		            data : dateArrayTwo
			   		            }
		   		       
		   		    ];
		   		    return tempUsedOption;
	}


	function closeUI(){
		

		// 判断 IE，用 swfobject 方法来移除嵌入事件
		if ( $.browser.msie ) {
			
			swfobject.removeSWF(flashId);
			document.getElementById("flashcontent1").innerHTML = "<div id='flashshow' style='height:418px;width:886px;'></div>";
			document.getElementById("flashcontent1").display='none';
			showSwf();
		} else {
			// 清掉 swf DIV 的内容
			
			swfobject.removeSWF(flashId);
			document.getElementById(flashDivId).innerHTML("div id='flashshow' style='height:418px;width:886px;'></div>");
			document.getElementById(flashDivId).display='none';
			// 再嵌入一次
			showSwf();
		}
		}
	
	function showSwf() {
		var flashvars = {};
		var params = {};
		params.menu = "false";
		params.quality = "high";
		params.wmode = "opaque";
		params.allowscriptaccess = "always";
		var attributes = {};
		attributes.id = "ChartComponent";
		attributes.name="ChartComponent";
		swfobject.embedSWF(flashpath, "flashshow", "100%", "100%", "9.0.0", false, flashvars, params, attributes);
			}