	var chartBottom;
	var chartTop;
	var flashDivId;
	var bottomDivId;
	var topDivId;
	var flashId;
	var basicRealTime = new Array();
	var cmpRealTime   = new Array();
	var intervals = 0;
	var currentIndex = 0;
	var rememberDataLength = 0;
	var testuse = 0;
	var testint = 24;
	 var holeYOne;
    var holeYTwo;
	var x;
	var marklineOne = new Array();
	var marklineTwo = new Array();
	var markz = 0;
	var markq = 0;
	
	var dateArrayOne =new Array();
	var dateArrayTwo =new Array();
	var intervalArrayOne = new Array();
	var intervalArrayTwo = new Array();

	var jsonResult;
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
				chartTop.setOption(optionTop,true);//加载数据
				chartBottom.setOption(optionBottom,true);
			   	// chartTop.connect(chartBottom);//添加联动
			   	// chartBottom.connect(chartTop);//添加联动
			   	chartTop.on('dataZoom', Countinternal);
			   	chartTop.refresh();//刷新
			   	chartBottom.refresh();
			   	chartTop.setOption(optionTop,true);//加载数据
				chartBottom.setOption(optionBottom,true);
					chartTop.refresh();//刷新
			   	chartBottom.refresh();
			   
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
		//document.getElementById(flashDivId).innerHTML = "<div id='flashshow' style='height:418px;width:886px;'></div>";
		document.getElementById(flashDivId).style.display='block';
		document.getElementById(bottomDivId).style.display='none';
		document.getElementById(topDivId).style.display='none';
		
		
		
//		var flashvars = {};
//		var params = {};
//		params.menu = "false";
//		params.quality = "best";
//		params.wmode = "opaque";
//		params.allowscriptaccess = "always";
//		var attributes = {};
//		attributes.id = "ChartComponent";
//		attributes.name="ChartComponent";
//		swfobject.embedSWF("<%=request.getContextPath()%>/watf/chart/swf/filedownloaduse.swf", "flashshow", "100%", "100%", "9.0.0", false, flashvars, params, attributes);
//		
	   	
		
	}
	/*
	 * 此方法在图片导出结束或取消后回到图表显示的样式
	 * @author wxcwater
	 */
	function returnToChart(){
		//closeFlash();
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
	function getBasicRealFormatter(params,resTm,basicToArray,status){

			//for(var i = 0;i<basicToArray.length;i++){
				//if(resTm==basicToArray[i]){
					 if(status==11){
					 var res = params[0][1];
					 for(var i = 0;i<params.length;i++){
					 	 var tempParam =  Number(params[i][2]);
					 	 if(isNaN(tempParam)){
					 	 	tempParam = '';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	 if(params[i][0]=="当前水位"){
					 	 	Ext.getCmp('swz').setValue(tempParam);
	
					 	 	
					 	 }
					 	 if(params[i][0]=="当前入流"){
					 	 	Ext.getCmp('llz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="当前出流"){
					 	 	Ext.getCmp('jyl').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史水位"){
					 	 	Ext.getCmp('lsswz').setValue(tempParam);
	
					 	 	
					 	 }
					 	 if(params[i][0]=="历史入流"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史出流"){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
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
					 	 if(params[i][0]=="历史入流"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史降出流"){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
					 	 }
					 }
					 		 if(res==params[0][1]){
					 	return null;
					 }
				   	 return res;
				   	}else if(status==21){
				   	var res = params[0][1];
				    for(var i = 0;i<params.length;i++){
					 	 var tempParam =  Number(params[i][2]);
					 	 tempParam *= -1;
					 	 if(isNaN(tempParam)){
					 	 	tempParam = '';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	 if(params[i][0]=="当前水位"){
					 	 	Ext.getCmp('swz').setValue(tempParam);
	
					 	 	res +='<br/>  '+params[i][0]+':'+tempParam;
					 	 }
					 	 if(params[i][0]=="当前蓄水量"){
					 	 	Ext.getCmp('llz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="当前降雨量"){
					 	 	Ext.getCmp('jyl').setValue(-tempParam);
					 	 }
					 }
					 	 if(res==params[0][1]){
					 	return null;
					 }
				   	return res;
				   	}else if(status==22){
				   	var res = params[0][1];
				    for(var i = 0;i<params.length;i++){
					 	 var tempParam =  Number(params[i][2]);
					 	 tempParam *= -1;
					 	 if(isNaN(tempParam)){
					 	 	tempParam = '';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	  if(params[i][0]=="历史水位"){
					 	 	Ext.getCmp('lsswz').setValue(tempParam);
	
					 	 	
					 	 }
					 	 if(params[i][0]=="历史蓄水量"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史降雨量"){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
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
			indextArray = [];
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
			  // console.log(indextArray);
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
			option.dataZoom.start = zoom.start;
			option.dataZoom.end   = zoom.end;
			chartBottom.setOption(option,true);
			chartTop.refresh();//刷新
			chartBottom.refresh();
			
	}


	function getdatabydateArrayDate(date,dateArray,otherDateArray,baseZ,baseINQ,baseOTQ,cmpZ,cmpINQ,cmpOTQ){
		var dateIndex = 0;
		for(var i  = 0;i<dateArray.length;i++){
			if(dateArray[i]==date){
				dateIndex = i;
			}
		}
		var otherDateIndex = dateIndex/dateArray.length * otherDateArray.length;
		otherDateIndex = Math.round(otherDateIndex);
		var otherDate  = otherDateArray[otherDateIndex];
		var otherDateZ     = '';
		var otherDateINQ   = '';
		var otherDateOTQ   = '';
		var dateZ          = '';
		var dateINQ        = '';
		var dateOTQ        = '';
		for(var i = 0;i<jsonResult.oneTm.length;i++){
			if(otherDate==jsonResult.oneTm[i]){
				otherDateZ = jsonResult.oneZ[i].toFixed(2);
				otherDateINQ = jsonResult.oneINQ[i];
				otherDateOTQ = jsonResult.oneOTQ[i];
			}
		}
		for(var i = 0;i<jsonResult.TwoTm.length;i++){
			if(date==jsonResult.TwoTm[i]){
				dateZ = jsonResult.TwoZ[i].toFixed(2);
				dateQ = jsonResult.TwoW[i].toFixed(0);
				dateINQ = jsonResult.TwoINQ[i];
				dateOTQ = jsonResult.TwoOTQ[i];
			}
		}
		if(otherDateINQ=='-'){otherDateINQ = '';}
		if(otherDateOTQ=='-'){otherDateOTQ = '';}
		if(dateINQ=='-'){dateINQ = '';}
		if(dateOTQ=='-'){dateOTQ = '';}
		try{
		Ext.getCmp('nt').setValue(otherDate);
		Ext.getCmp('ct').setValue(date);
		}catch(e){
			
		}
		Ext.getCmp('swz').setValue(otherDateZ);
		Ext.getCmp('llz').setValue(otherDateINQ);
		Ext.getCmp('jyl').setValue(otherDateOTQ);
		Ext.getCmp('lsswz').setValue(dateZ);	
		Ext.getCmp('lsllz').setValue(dateINQ);
		Ext.getCmp('lsjyl').setValue(dateOTQ);
		//put put put wxcwatertodolist
	}
	function getWdatabydateArrayDate(date,dateArray,otherDateArray,baseZ,baseW,cmpZ,cmpW){
		var dateIndex = 0;
		for(var i  = 0;i<dateArray.length;i++){
			if(dateArray[i]==date){
				dateIndex = i;
			}
		}
		var otherDateIndex = dateIndex/dateArray.length * otherDateArray.length;
		otherDateIndex = Math.round(otherDateIndex);
		var otherDate  = otherDateArray[otherDateIndex];
		var otherDateZ     = '';
		var oteherDateW    = '';
		var dateZ          = '';
		var dateW          = '';
		for(var i = 0;i<jsonResult.oneTm.length;i++){
			if(otherDate==jsonResult.oneTm[i]){
				otherDateZ = jsonResult.oneZ[i].toFixed(2);
				otherDateW = jsonResult.oneW[i].toFixed(0);

			}
		}
		for(var i = 0;i<jsonResult.TwoTm.length;i++){
			if(date==jsonResult.TwoTm[i]){
				dateZ = jsonResult.TwoZ[i].toFixed(2);
				dateW = jsonResult.TwoW[i].toFixed(0);
			}
		}
		try{
		Ext.getCmp('nt').setValue(otherDate);
		Ext.getCmp('ct').setValue(date);
		}catch(e){
			
		}
		Ext.getCmp('swz').setValue(otherDateZ);
		//Ext.getCmp('llz').setValue(oteherDateW);
		Ext.getCmp('llz').setValue(oteherDateW);
		Ext.getCmp('jyl').setValue(oteherDateW);
		Ext.getCmp('lsswz').setValue(dateZ);	
		//Ext.getCmp('lsllz').setValue(dateW);
		Ext.getCmp('lsllz').setValue(dateW);
		Ext.getCmp('lsjyl').setValue(dateW);
		
		//put put put wxcwatertodolist
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
		 dateArrayTwo = getDateArrayBetweenTwoDate(startDateTwo,endDateTwo);
		 intervalArrayOne = new Array();
		 intervalArrayTwo = new Array(); 
		 test_intervalArrayOne = test_getInter(dateArrayOne);
		 test_intervalArrayTwo = test_getInter(dateArrayTwo);
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
		var baseW = new Array();
		var baseINQ=new Array();
		var baseOTQ=new Array();
		var cmpZ =  new Array();
		var cmpW =  new Array();
		var cmpINQ= new Array();
		var cmpOTQ= new Array();
		var tempIndex = 0;
		var nullNum = 0;
		var middleArray = new Array();
		var middleArrayW = new Array();
		var tempINQ ='-';
		var tempOTQ = '-';
		var basicRealTime = json.oneTm;
		var cmpRealTime   = json.TwoTm;
		var scatterBZ = new Array();
		var scatterBINQ=new Array();
		var scatterBOTQ=new Array();
		var scatterCZ  =new Array();
		var scatterCINQ=new Array();
		var scatterCOTQ=new Array();
		  for(var i=0;i<dateArrayOne.length;i++){
		  		if(json.oneTm[tempIndex]==dateArrayOne[i]){
		  		baseINQ.push(json.oneINQ[tempIndex]);
		  		baseOTQ.push(json.oneOTQ[tempIndex]);
 			 	scatterBINQ.push([i,json.oneINQ[tempIndex]]);
 			 	scatterBOTQ.push([i,json.oneOTQ[tempIndex]]);
 			 	scatterBZ.push([i,json.oneZ[tempIndex]]);
			  			if(nullNum==0){
			  					baseZ.push(json.oneZ[tempIndex]);
			  					
			  					tempIndex++;
			  			}else{
			  				if(baseZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(json.oneZ[tempIndex]);
				  				 		middleArrayW.push(json.oneW[tempIndex]);
				  				 	}
				  				 baseZ = baseZ.concat(middleArray);
				  				 baseW = baseW.concat(middleArrayW);
				  				 middleArray = new Array();
				  				 middleArrayW = new Array();
				  				 nullNum = 0;
				  				 baseZ.push(json.oneZ[tempIndex]);
				  				 baseW.push(json.oneW[tempIndex]);
				  				tempIndex++;
			  				}else{
			  					
			  				 var avg = (json.oneZ[tempIndex] - json.oneZ[tempIndex-1])/nullNum;
			  				 var avgW=  (json.oneW[tempIndex] - json.oneW[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(baseZ[baseZ.length-1]+(avg*(t+1)));
			  				 		//scatterBZ.push([i-nullNum+t,baseZ[baseZ.length-1]+(avg*(t+1))]);
			  				 	}
			  				 baseZ = baseZ.concat(middleArray);
			  				 baseW = baseW.concat(middleArrayW);
			  				 middleArray = new Array();
			  				 middleArrayW = new Array();
			  				 nullNum = 0;
			  				 baseZ.push(json.oneZ[tempIndex]);
			  				 baseW.push(json.oneW[tempIndex]);
			  				 tempIndex++;
			  				}
			  			}
		  		}else{
		  			baseINQ.push(tempINQ);
		  			baseOTQ.push(tempOTQ);
		  			scatterBINQ.push([i,tempINQ]);
 			 	scatterBOTQ.push([i,tempOTQ]);
		  			if(i==dateArrayOne.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(baseZ[baseZ.length-1]);
	  				 		middleArrayW.push(baseZ[baseW.length-1]);
	  				 	}
	  				 baseZ = baseZ.concat(middleArray);
	  				 baseW = baseW.concat(middleArrayW);
	  				 middleArray = new Array();
	  				 middleArrayW = new Array();
	  				 nullNum = 0;
		  				
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}
		 tempIndex = 0;
		nullNum = 0;
		middleArray = new Array();
		middleArrayW = new Array();
		  tempINQ = '-';
		  tmepOTQ = '-';
		  for(var i=0;i<dateArrayTwo.length;i++){
		  		if(json.TwoTm[tempIndex]==dateArrayTwo[i]){
		  			cmpINQ.push(json.TwoINQ[tempIndex]);
			  		cmpOTQ.push(json.TwoOTQ[tempIndex]);
			  		scatterCINQ.push([i,json.TwoINQ[tempIndex]]);
 			 		scatterCOTQ.push([i,json.TwoOTQ[tempIndex]]);
 			 		scatterCZ.push([i,json.TwoZ[tempIndex]]);
			  			if(nullNum==0){
			  					cmpZ.push(json.TwoZ[tempIndex]);
			  					
			  					tempIndex++;
			  			}else{
			  				if(cmpZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(0);
				  				 		middleArrayW.push(0);
				  				 	}
				  				 cmpZ = cmpZ.concat(middleArray);
				  				 cmpW = cmpW.concat(middleArrayW);
				  				 middleArray = new Array();
				  				 middleArrayW = new Array();
				  				 nullNum = 0;
				  				 cmpZ.push(json.TwoZ[tempIndex]);
				  				 cmpW.push(json.TwoW[tempIndex]);
				  				tempIndex++;
			  				}else{
			  					
			  				 var avg = (json.TwoZ[tempIndex] - json.TwoZ[tempIndex-1])/nullNum;
			  				 var avgW=  (json.TwoW[tempIndex] - json.TwoW[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(cmpZ[cmpZ.length-1]+(avg*(t+1)));
									
			  				 		//scatterCZ.push([i-nullNum+t,cmpZ[cmpZ.length-1]+(avg*(t+1))]);
			  				 		
			  				 	}
			  				 cmpZ = cmpZ.concat(middleArray);
			  				 cmpW = cmpW.concat(middleArrayW);
			  				 middleArray = new Array();
			  				 middleArrayW = new Array();
			  				 nullNum = 0;
			  				 cmpZ.push(json.TwoZ[tempIndex]);
			  				 cmpW.push(json.TwoW[tempIndex]);
			  				 tempIndex++;
			  				}
			  				
			  			}
			  				
		  		}else{
		  			cmpINQ.push(tempINQ);
			  		cmpOTQ.push(tempOTQ);
			  		scatterCINQ.push([i,tempINQ]);
 			 		scatterCOTQ.push([i,tempOTQ]);
		  			if(i==dateArrayTwo.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(0);
	  				 		middleArrayW.push(0);
	  				 	}
	  				 cmpZ = cmpZ.concat(middleArray);
	  				 cmpW = cmpW.concat(middleArrayW);
	  				 middleArray = new Array();
	  				 middleArrayW = new Array();
	  				 nullNum = 0;
		  				
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}
		  	var tempUseINQ = 0;
		  	var tempUseOTQ;
		  	var tempUseNum = 0;
		  	for(var i = 0;i<baseINQ.length;i++){
		  		if(baseINQ[i]!='-'){
		  			tempUseINQ = baseINQ[i];
		  		}else{
		  			for(var j=i;j<baseINQ.length;j++){
		  				if(baseINQ[j] == '-'){
		  					tempUseNum++;
		  				}else{
		  					tempUseOTQ = baseINQ[j];

		  					var avg = (tempUseOTQ - tempUseINQ)/tempUseNum;
		  					for(var x = 1;x<tempUseNum;x++){
		  						baseINQ[i+x] = tempUseINQ+(avg*(x+1));

		  					}
		  					tempUseINQ = tempUseOTQ;
		  					i = j;
		  					tempUseNum = 0;
		  				}
		  			}
		  		}
		  	}
		  	tempUseINQ = 0;
		  	tempUseNum = 0;
		  	for(var i = 0;i<baseOTQ.length;i++){
		  		if(baseOTQ[i]!='-'){
		  			tempUseINQ = baseOTQ[i];
		  		}else{
		  			for(var j=i;j<baseOTQ.length;j++){
		  				if(baseOTQ[j] == '-'){
		  					tempUseNum++;
		  				}else{
		  					tempUseOTQ = baseOTQ[j];

		  					var avg = (tempUseOTQ - tempUseINQ)/tempUseNum;
		  					for(var x = 1;x<tempUseNum;x++){
		  						baseOTQ[i+x] = tempUseINQ+(avg*(x+1));

		  					}
		  					tempUseINQ = tempUseOTQ;
		  					i = j;
		  					tempUseNum = 0;
		  				}
		  			}
		  		}
		  	}
		  	tempUseINQ = 0;
		  	tempUseNum = 0;
		  	for(var i = 0;i<cmpINQ.length;i++){
		  		if(cmpINQ[i]!='-'){
		  			tempUseINQ = cmpINQ[i];
		  		}else{
		  			for(var j=i;j<cmpINQ.length;j++){
		  				if(cmpINQ[j] == '-'){
		  					tempUseNum++;
		  				}else{
		  					tempUseOTQ = cmpINQ[j];

		  					var avg = (tempUseOTQ - tempUseINQ)/tempUseNum;
		  					for(var x = 1;x<tempUseNum;x++){
		  						cmpINQ[i+x] = tempUseINQ+(avg*(x+1));

		  					}
		  					tempUseINQ = tempUseOTQ;
		  					i = j;
		  					tempUseNum = 0;
		  				}
		  			}
		  		}
		  	}
		  	tempUseINQ = 0;
		  	tempUseNum = 0;
		  	for(var i = 0;i<cmpOTQ.length;i++){
		  		if(cmpOTQ[i]!='-'){
		  			tempUseINQ = cmpOTQ[i];
		  		}else{
		  			for(var j=i;j<cmpOTQ.length;j++){
		  				if(cmpOTQ[j] == '-'){
		  					tempUseNum++;
		  				}else{
		  					tempUseOTQ = cmpOTQ[j];

		  					var avg = (tempUseOTQ - tempUseINQ)/tempUseNum;
		  					for(var x = 1;x<tempUseNum;x++){
		  						cmpOTQ[i+x] = tempUseINQ+(avg*(x+1));

		  					}
		  					tempUseINQ = tempUseOTQ;
		  					i = j;
		  					tempUseNum = 0;
		  				}
		  			}
		  		}
		  	}
		  
		  
		  var ZAxisMax = 0;
		  var ZAxisMin = baseZ[0];
		  var QAxisMax = 0;
		  var QAxisMin = baseW[0];
		  var IOAxisMax = 0;
		  var IOAxisMin = 999;
		
		  // alert("2");
		  for(var i = 0;i<baseZ.length;i++){
			 baseZ[i] = baseZ[i];
			 baseW[i] = baseW[i];
			  if(ZAxisMax<baseZ[i]){
				  ZAxisMax = baseZ[i];
			  }
			  if(QAxisMax<baseW[i]){
				  QAxisMax = baseW[i];
			  }
			  if(ZAxisMin>baseZ[i]){
				  ZAxisMin = baseZ[i];
			  }
			  if(QAxisMin>baseW[i]){
				  QAxisMin = baseW[i];
			  }
			  if(baseINQ[i]!='-'){
			  	if(IOAxisMax<baseINQ[i]){
			  		IOAxisMax = baseINQ[i];
			  	}
			  	if(IOAxisMin>baseINQ[i]){
			  		IOAxisMin = baseINQ[i];
			  	}
			  }
			   if(baseOTQ[i]!='-'){
			  	if(IOAxisMax<baseOTQ[i]){
			  		IOAxisMax = baseOTQ[i];
			  	}
			  	if(IOAxisMin>baseOTQ[i]){
			  		IOAxisMin = baseOTQ[i];
			  	}
			  }
		  }

		  // alert('z'+ZAxisMax+' '+ZAxisMin)
		  // alert('in'+IOAxisMin+" "+IOAxisMax);
		  for(var i = 0;i<cmpZ.length;i++){
			  	 cmpZ[i] = cmpZ[i];
				 cmpW[i] = cmpW[i];
				  if(ZAxisMax<cmpZ[i]){
					  ZAxisMax = cmpZ[i];
				  }
				  if(QAxisMax<cmpW[i]){
					  QAxisMax = cmpW[i];
				  }
				  if(ZAxisMin>baseZ[i]){
					  ZAxisMin = cmpZ[i];
				  }
				  if(QAxisMin>baseW[i]){
					  QAxisMin = baseW[i];
				  }
				if(cmpINQ[i]!='-'){
			  	if(IOAxisMax<cmpINQ[i]){
			  		IOAxisMax = cmpINQ[i];
			  	}
			  	if(IOAxisMin>cmpINQ[i]){
			  		IOAxisMin = cmpINQ[i];
			  	}
			  }
			   if(cmpOTQ[i]!='-'){
			  	if(IOAxisMax<cmpOTQ[i]){
			  		IOAxisMax = cmpOTQ[i];
			  	}
			  	if(IOAxisMin>cmpOTQ[i]){
			  		IOAxisMin = cmpOTQ[i];
			  	}
			  }
		  }
		  

		  
		  if(IOAxisMin>=IOAxisMax){
		  	if(IOAxisMax==0){
		  		IOAxisMin = 0;
		  	}else{
		  		IOAxisMin = IOAxisMax - 2 ;
		  	}
		  	
		  	IOAxisMax = IOAxisMax + 2;
		  }
		  if(ZAxisMax==ZAxisMin){
		  	ZAxisMax++;
		  	ZAxisMin--;
		  	if(ZAxisMin<0){
		  		ZAxisMin = 0;
		  	}
		  }
		    // alert("3");
		  IOAxisMax = IOAxisMax + IOAxisMax*0.01;
		  IOAxisMin = IOAxisMin - IOAxisMin*0.01;
		  QAxisMax = QAxisMax + QAxisMax*0.01;
		  QAxisMin = QAxisMin - QAxisMin*0.01;
		  ZAxisMax = ZAxisMax + ZAxisMax*0.01;
		  ZAxisMin = ZAxisMin - ZAxisMin*0.01;
		 	holeYOne = Math.floor(dateArrayOne.length);
			holeYTwo = Math.floor(dateArrayTwo.length);
			
 			var tempzoom =new Object();
 			tempzoom.start = 0;
 			tempzoom.end   = 100;
			// intervalArrayOne = getIntervalArray(holeYOne,dateArrayOne,tempzoom);
			// intervalArrayTwo = getIntervalArray(holeYTwo,dateArrayTwo,tempzoom);
		  var optionArray = new Array();
		  var option = {
		   		    tooltip : {
		   		    	show:false,
		   		        trigger: 'axis',
		   		        // showContent:false,
		   		        // showDelay :500,
		   		        // transitionDuration :0,
		   		        // hideDelay:0,
		   		        axisPointer:{
		   		        	type:'line'
		   		        },
		   		        position :function(params) {return [params[0],params[1]]},
			   		      	formatter: function (params){
				   	            var resTm = params[0][1];
				   	            //var res = getBasicRealFormatter(params,resTm,basicRealTime,11);
				   	            return '';
				   	        }
		   		    },
		   		    
		   		 dataZoom : {
		   			 
			   	        show : false,
			   	        realtime : false,
			   	        start : 0,
			   	        end : 100
			   	    	
			   	   		 },
			   		animation : false,
			   		addDataAnimation:false,
			   		calculable:false,
		   		    legend: {
		   		    	x:100,
		   		        data:['当前水位','历史水位','当前入流','历史入流','当前出流','历史出流']
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
				            max:dateArrayOne.length,
				            splitNumber:dateArrayOne.length,
				            axisLabel : {
		   		                show:true,// {number}
		   		    			interval:'auto',// 0,
		   		                margin: 8,
		   		                formatter: function (value){
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
				   				} ,
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
		   		          	  splitLine:{show:true}
						},
				        {
				            type : 'value',
				            show:false,
				            scale:true,
				            splitNumber:12,
				            max:dateArrayTwo.length,
				            min:0,
				            axisLine:{show:false},
				            splitLine:{show:true}
				            // min:0,
				            // max:dateArrayTwo.length
				        }
		   			],
		   		    yAxis : [
		   		        {
		   		        	name:'流量(m³/s)',
		   		            type : 'value',
		   		            position: 'right',
		   		            splitNumber: 5,
		   		        	max:IOAxisMax ,
		 				    min:IOAxisMin ,
		   		            precision:2,
		   		            axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		                //length: 10,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:true,
		   		                interval: 'auto',    // {number}
								margin: 8,
		   		                formatter: function (value) {
		   		                    // Function formatter
		   		                    // if(value==IOAxisMax){
		   		                    // 	return '\n流量(m³/s)\n' + value.toFixed(2) + ''
		   		                    // }
		   		                    return value.toFixed(1) + ''
		   		                },        // Template formatter!
		   		                textStyle: {
		   		               	fontFamily: 'Calibri',		
		   		               	    fontSize:11.5,   
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
		   		            }
		   		            
		   		        }, {
		   		        	name:'水位(m)',
		   		            type : 'value',
		   		            max:ZAxisMax,
		   		         	min:ZAxisMin,
		   		            splitNumber: 5,
		   		             precision:2,
		   		         	 position :'left',
		   		         	 axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		                //length: 10,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : { 
		   		            	textStyle: {
		   		                   
		   		                    fontFamily: 'Calibri',
		   		                    fontSize:11.5,
		   		                    color:'#3D3D3D',
		   		                    fontStyle: 'normal'
		   		                   
		   		                },
		   		                formatter: function (value) {
		   		                  // if(value==ZAxisMax){
		   		                  //  		return '\n水位(m)\n' + value.toFixed(2) + ''
		   		                  //  }
		   		                    return value.toFixed(2) + ''
		   		                }
		   		            },
		   		            splitLine : {
		   		                show: false
		   		            }
		   		        }
		   		    ],
		   		    series : [
		   		     
		   		         {
			   		            name: '当前入流',
			   		            type: 'line',
			   		         	large: false,
					            symbolSize:1, 
					            symbol:'circle',
					            largeThreshold:30,
					   		    itemStyle: {normal: {color: '#458b00',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
			   		            data: scatterBINQ  },
			   		         {
				   		            name: '当前出流',
				   		            type: 'line',
				   		         	large: false,
						            symbolSize:1,
						            largeThreshold:30,
						                symbol:'circle',
					   		         itemStyle: {normal: {color: '#191970',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
				   		            data: scatterBOTQ  },
		   		        {
		   		            name: '当前水位',
		   		            type: 'line',
		   		         	
		   		         	 yAxisIndex: 1,
		   		         	 large: false,
				             symbolSize:1, 
				             symbol:'circle',
				             largeThreshold:30,
			   		         itemStyle: {normal: {color: '#ee0000',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		             data: scatterBZ     
		   		        },
		   		     
		   		         {
			   		            name:'历史入流',
			   		            type: 'line',
			   		         	xAxisIndex: 1,
			   		         	large: false,
					            symbolSize:1, 
					            symbol:'circle',
					            largeThreshold:30,
			   		         	itemStyle: {normal: {color: '#7cfc00',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
			   		            data:  scatterCINQ
			   		           
			   		        },
			   		         {
				   		            name:'历史出流',
				   		            type: 'line',
				   		         	xAxisIndex: 1,
				   		         	large: false,
						            symbolSize:1,
						            largeThreshold:30,
				   		         	 symbol:'circle',
				   		         	itemStyle: {normal: {color:'#1c86ee',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
				   		            data:  scatterCOTQ   
				   		            },
					     {
		   		            name:'历史水位',
		   		            type: 'line',
		   		        	xAxisIndex: 1,
		   		     	 	yAxisIndex: 1,
		   		     	 	large: false,
				            symbolSize:1,
				            largeThreshold:30,
		   		     	 	 symbol:'circle',
		   		     	 	itemStyle: {normal: {color: '#ee5c42',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		            data: scatterCZ
		   		            }
		   		        
		   	
		   		    ]
		   		};
		  
		  var optionTwo = {
		   			tooltip : {
		   				show:true,
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
		   		      	//position :function(params) {return [params[0],params[1]+100]},
			   		      	formatter: function (params) {
				   	            var resTm = params[0][1];
								//var res = getBasicRealFormatter(params,resTm,cmpRealTime,12);
								getdatabydateArrayDate(resTm,dateArrayTwo,dateArrayOne,baseZ,baseINQ,baseOTQ,cmpZ,cmpINQ,cmpOTQ);
				   	            return '';
				   	        }
		   		    },
		   		    legend: {
		   		    	show:false,
		   		    	x:100,
		   		    	data:['当前水位','历史水位','当前入流','历史入流','当前出流','历史出流']
		   		    
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
		   	        realtime : false,
		   	        start : 0,
		   	        height:10,
		   	        end : 100,
		   	    	 y:340	
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
		   		                    color: 'gray',
		   		                    type: 'dashed',
		   		                    width: 1
		   		                }
		   		            },
		   		            data : dateArrayTwo
		   		            },
		   		             {
		   		            type : 'category',
		   		            position: 'top',
		   		            boundaryGap: false,
		   		            //interval:Math.floor(dateArrayOne.length/20),
		   		            axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:false,
		   		             	//interval:Math.floor(dateArrayOne.length/20),
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:false,
		   		                    // {number}
		   		    			//interval: Math.floor((dateArrayOne.length/6)-1),
		   		                margin: 18,
		   		                formatter:'{value}',
		   		                textStyle: {
		   		                    color: 'blue',
		   		                    fontFamily: 'sans-serif',
		   		                    fontSize: 8,
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
		   		            data : dateArrayOne  }
		   		        
		   		    ],
		   		    yAxis : [
		   		        {
		   		        	show : false,
		   		            type : 'value',
		   		            position: 'left',
		   		            splitNumber: 5,
		   		            max:IOAxisMax ,
		 				    min:IOAxisMin ,
		   		         	 // precision:2,
		   		            axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'dashed',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:false,
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:false,
		   		                interval: 'auto',    // {number}
		   		               
		   		                margin: 18,
		   		                formatter: function (value) {
		   		                    // Function formatter
		   		                    if(value==IOAxisMax){
		   		                    	return '流量(m³/s)\n' + value.toFixed(2) + ''
		   		                    }
		   		                    return value.toFixed(2) + ''
		   		                },    // Template formatter!
		   		                textStyle: {
		   		                  	fontFamily: 'Times New Roman',
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
		   		                    width: 1
		   		                }
		   		            }
		   		            
		   		        },
		   		     {
		   		     		show : false,
		   		            type : 'value',
		   		            max:ZAxisMax,
		   		         	min:ZAxisMin,
		   		            splitNumber: 5,
		   		              precision:2,
		   		         	 position :'right',
		   		            axisLabel : {
		   		            	show:false,
		   		            	textStyle: {
		   		                   
		   		                    fontFamily: 'Times New Roman',
		   		                    fontSize: 10,
		   		                    fontStyle: 'normal',
		   		                    fontWeight: 'bold'
		   		                },
		   		                formatter: function (value) {
		   		                   if(value==ZAxisMax){
		   		                   		return '水位(m)\n' + value.toFixed(2) + ''
		   		                   }
		   		                    return value.toFixed(2) + ''
		   		                }
		   		            },
		   		            splitLine : {
		   		                show: false
		   		            }
		   		        }
		   		    ],
		   		    series : [
					
					{
					       name: '当前入流',
					   type: 'line',
					symbol:'arrow',
					 itemStyle: {normal: {color: '#458b00'}},
					   data: ['-']  },
					{
					        name: '当前出流',
					type: 'line',
					symbol:'arrow',
					 itemStyle: {normal: {color: '#191970'}},
						            data: ['-']  },
					   {
					       name: '当前水位',
					   type: 'line',
					symbol:'Circle',
					 yAxisIndex: 1,
					itemStyle: {normal: {color: '#ee0000'}},
					       data: ['-']     
					   },
				
					{
					       name:'历史入流',
					   type: 'line',
					   symbolSize:0,
					 shadowColor : 'rgba(0,0,0,0.5)',
                        		shadowBlur: 10,
                        		shadowOffsetX: 8,
                        		shadowOffsetY: 8,
					symbol:'arrow',
					itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
					   data:  ['-']   
					   },
					{
					        name:'历史出流',
					        type: 'line',
					        symbolSize:0,
					        symbolRotate:180,
					        symbol:'arrow',
					      shadowColor : 'rgba(0,0,0,0.5)',
                        		shadowBlur: 10,
                        		shadowOffsetX: 8,
                        		shadowOffsetY: 8,
					        itemStyle: {normal: {color:'rgba(0,0,0,0)'}},
						            data:  ['-']   
					},
					 {
					   name:'历史水位',
					   type: 'line',
					   symbolSize:0,
					 	yAxisIndex: 1,
					 	shadowColor : 'rgba(0,0,0,0.5)',
                        		shadowBlur: 10,
                        		shadowOffsetX: 8,
                        		shadowOffsetY: 8,
					symbol:'emptyCircle',
					itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
					   data: ['-']
					   }
		   		    ]
		   		};
		   		
		  optionArray.push(option);
		  optionArray.push(optionTwo);
		  return optionArray;
	}
	
	function countTheJsonToOptionZW(startDateOne,endDateOne,startDateTwo,endDateTwo,json){
		markz = 0;
		//先根据日期获得两个完整字符串
		jsonResult = json;
		dateArrayOne =  getDateArrayBetweenTwoDate(startDateOne,endDateOne);
		dateArrayTwo =  getDateArrayBetweenTwoDate(startDateTwo,endDateTwo);
		test_intervalArrayOne = test_getInter(dateArrayOne);
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
		var baseW = new Array();
		
		var cmpZ =  new Array();
		var cmpW =  new Array();
		
		var tempIndex = 0;
		var nullNum = 0;
		var middleArray = new Array();
		var middleArrayW = new Array();
		
		var scatterBaZ = new Array();
	    var scatterBaW = new Array();
	    var scatterCmZ = new Array();
	    var scatterCmW = new Array();
		// alert("1");
		  for(var i=0;i<dateArrayOne.length;i++){
		  		if(json.oneTm[tempIndex]==dateArrayOne[i]){
		  		scatterBaZ.push([i,json.oneZ[tempIndex]]);
 			 	scatterBaW.push([i,json.oneW[tempIndex]]);
			  			if(nullNum==0){
			  					baseZ.push(json.oneZ[tempIndex]);
			  					baseW.push(json.oneW[tempIndex]);
			  					
			  					tempIndex++;
			  			}else{
			  				if(baseZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(0);
				  				 		middleArrayW.push(0);
				  				 	}
				  				 baseZ = baseZ.concat(middleArray);
				  				 baseW = baseW.concat(middleArrayW);
				  				 middleArray = new Array();
				  				 middleArrayW = new Array();
				  				 nullNum = 0;
				  				 baseZ.push(json.oneZ[tempIndex]);
				  				 baseW.push(json.oneW[tempIndex]);
				  				tempIndex++;
			  				}else{
			  					
			  				 var avg = (json.oneZ[tempIndex] - json.oneZ[tempIndex-1])/nullNum;
			  				 var avgW=  (json.oneW[tempIndex] - json.oneW[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(baseZ[baseZ.length-1]+(avg*(t+1)));
			  				 		middleArrayW.push(baseW[baseW.length-1]+(avgW*(t+1)));
			  				 	// 	scatterBaZ.push([i-nullNum+t,baseZ[baseZ.length-1]+(avg*(t+1))]);
 			 						// scatterBaW.push([i-nullNum+t,baseW[baseW.length-1]+(avgW*(t+1))]);
			  				 	}
			  				 baseZ = baseZ.concat(middleArray);
			  				 baseW = baseW.concat(middleArrayW);
			  				 middleArray = new Array();
			  				 middleArrayW = new Array();
			  				 nullNum = 0;
			  				 baseZ.push(0);
			  				 baseW.push(0);
			  				 tempIndex++;
			  				}
			  			}
		  		}else{
		  			
		  			if(i==dateArrayOne.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(baseZ[baseZ.length-1]);
	  				 		middleArrayW.push(baseZ[baseW.length-1]);
	  				 	}
	  				 baseZ = baseZ.concat(middleArray);
	  				 baseW = baseW.concat(middleArrayW);
	  				 middleArray = new Array();
	  				 middleArrayW = new Array();
	  				 nullNum = 0;
		  				
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}
		 tempIndex = 0;
		nullNum = 0;
		middleArray = new Array();
		middleArrayW = new Array();
		  
		  // alert("3");
		  for(var i=0;i<dateArrayTwo.length;i++){
		  		if(json.TwoTm[tempIndex]==dateArrayTwo[i]){
		  			scatterCmZ.push([i,json.TwoZ[tempIndex]]);
 			 					scatterCmW.push([i,json.TwoW[tempIndex]]);
			  			if(nullNum==0){
			  					cmpZ.push(json.TwoZ[tempIndex]);
			  					cmpW.push(json.TwoW[tempIndex]);
			  					
			  					tempIndex++;
			  			}else{
			  				if(cmpZ.length==0){
			  					 for(var t = 0;t<nullNum;t++){
				  				 		middleArray.push(json.TwoZ[tempIndex]);
				  				 		middleArrayW.push(json.TwoW[tempIndex]);
				  				 	}
				  				 cmpZ = cmpZ.concat(middleArray);
				  				 cmpW = cmpW.concat(middleArrayW);
				  				 middleArray = new Array();
				  				 middleArrayW = new Array();
				  				 nullNum = 0;
				  				 cmpZ.push(json.TwoZ[tempIndex]);
				  				 cmpW.push(json.TwoW[tempIndex]);
				  				tempIndex++;
			  				}else{
			  					
			  				 var avg = (json.TwoZ[tempIndex] - json.TwoZ[tempIndex-1])/nullNum;
			  				 var avgW=  (json.TwoW[tempIndex] - json.TwoW[tempIndex-1])/nullNum;
			  				 for(var t = 0;t<nullNum;t++){
			  				 		middleArray.push(cmpZ[cmpZ.length-1]+(avg*(t+1)));
			  				 		middleArrayW.push(cmpW[cmpW.length-1]+(avgW*(t+1)));
			  				 	// 	scatterCmZ.push([i-nullNum+t,cmpZ[cmpZ.length-1]+(avg*(t+1))]);
 			 						// scatterCmW.push([i-nullNum+t,cmpW[cmpW.length-1]+(avgW*(t+1))]);
			  				 		
			  				 	}
			  				 cmpZ = cmpZ.concat(middleArray);
			  				 cmpW = cmpW.concat(middleArrayW);
			  				 middleArray = new Array();
			  				 middleArrayW = new Array();
			  				 nullNum = 0;
			  				 cmpZ.push(json.TwoZ[tempIndex]);
			  				 cmpW.push(json.TwoW[tempIndex]);
			  				 tempIndex++;
			  				}
			  				
			  			}
			  				
		  		}else{
		  			
		  			if(i==dateArrayTwo.length-1){
		  				for(var t = 0;t<nullNum;t++){
	  				 		middleArray.push(cmpZ[cmpZ.length-1]);
	  				 		middleArrayW.push(cmpZ[cmpW.length-1]);
	  				 	}
	  				 cmpZ = cmpZ.concat(middleArray);
	  				 cmpW = cmpW.concat(middleArrayW);
	  				 middleArray = new Array();
	  				 middleArrayW = new Array();
	  				 nullNum = 0;
		  				
		  			}else{
		  				nullNum++;
		  		}
		  		}
		  	}
		 // alert("4");
		  var ZAxisMax = 0;
		  var ZAxisMin = scatterBaZ[0][1];
		  var QAxisMax = 0;
		  var QAxisMin = scatterBaW[0][1];
		 
		  for(var i = 0;i<scatterBaZ.length;i++){
			 // baseZ[i] = baseZ[i];
			 // baseW[i] = baseW[i];
			  if(ZAxisMax<scatterBaZ[i][1]){
				  ZAxisMax = scatterBaZ[i][1];
			  }
			  if(QAxisMax<scatterBaW[i][1]){
				  QAxisMax = scatterBaW[i][1];
			  }
			  if(ZAxisMin>scatterBaZ[i][1]){
				  ZAxisMin = scatterBaZ[i][1];
			  }
			  if(QAxisMin>scatterBaW[i][1]){
				  QAxisMin = scatterBaW[i][1];
			  }
			
		  }
		  // alert("45");
		  for(var i = 0;i<scatterCmZ.length;i++){
			  // 	 cmpZ[i] = cmpZ[i];
				 // cmpW[i] = cmpW[i];
				  if(ZAxisMax<scatterCmZ[i][1]){
					  ZAxisMax = scatterCmZ[i][1];
				  }
				  if(QAxisMax<scatterCmW[i][1]){
					  QAxisMax = scatterCmW[i][1];
				  }
				  if(ZAxisMin>scatterCmZ[i][1]){
					  ZAxisMin = scatterCmZ[i][1];
				  }
				  if(QAxisMin>scatterCmW[i][1]){
					  QAxisMin = scatterCmW[i][1];
				  }
				 
			  
		  }
		  // alert("46");
		   if(ZAxisMax==ZAxisMin){
		  	ZAxisMax = ZAxisMax + 1;
		  	ZAxisMin = ZAxisMin - 1; 
		  	if(ZAxisMin<0){
		  		ZAxisMin = 0;
		  	}
		  }
		   if(QAxisMax==QAxisMin){
		  	QAxisMax = QAxisMax + 1;
		  	QAxisMin = QAxisMin - 1;
		  	if(QAxisMin<0){
		  		QAxisMin = 0;
		  	}
		  }
		 QAxisMax = QAxisMax + QAxisMax*0.01;
		  QAxisMin = QAxisMin - QAxisMin*0.01;
		  ZAxisMax = ZAxisMax + ZAxisMax*0.01;
		  ZAxisMin = ZAxisMin - ZAxisMin*0.01;
		   holeYOne = Math.floor(dateArrayOne.length);
			holeYTwo = Math.floor(dateArrayTwo.length);
 			
 			var tempzoom =new Object();
 			tempzoom.start = 0;
 			tempzoom.end   = 100;
			// intervalArrayOne = getIntervalArray(holeYOne,dateArrayOne,tempzoom);
			// intervalArrayTwo = getIntervalArray(holeYTwo,dateArrayTwo,tempzoom);
		  
		   

		  var optionArray = new Array();
		  var option = {
		   		    tooltip : {
		   		    	show:false,
		   		        trigger: 'axis',
		   		         showContent:false,
		   		   	position :function(params) {return [params[0],params[1]]},
			   		      
			   		      	formatter: function (params) {
				   	            var resTm = params[0][1];
				   	            
								//var res = getBasicRealFormatter(params,resTm,basicRealTime,21);
				   	            return '';
				   	        }
		   		    },
		   		 	dataZoom : {
			   	        show : false,
			   	        realtime : false,
			   	        start : 0,
			   	         y:355, 	
			   	        end : 100
			   	   	},
		   		    legend: {
		   		    	x:100,
		   		        data:['当前蓄水量','历史蓄水量','当前水位','历史水位']
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
		   		            position: 'bottom',
		   		            min:0,
		   		            max:dateArrayOne.length,
		   		            splitNumber:dateArrayOne.length,
		   		            boundaryGap: false,
		   		            axisLabel : {
		   		                show:true,
		   		                //interval:0,    // {number}
		   		                margin: 8,
		   		               formatter: function (value){
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
			    					},
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
		   		                },

		   		          	},
		   		          	 splitLine:{show:true,
		   		          	 	lineStyle:{
		   		          	 		color:'#ccc',
		   		          	 		width:1,
		   		          	 		style:'solid'
		   		          	 	}
		   		          	 }
		   		           },
		   		        {
		   		        		show:false,
			   		            type : 'value',
			   		            min:0,
			   		            max:dateArrayTwo.length
			   		           
			   		            }
		   		       
		   		    ],
		   		    yAxis : [
		   		        {
		   		        	name:'蓄水量(m³)',
		   		            type : 'value',
		   		            position: 'right',
		   		            splitNumber: 5,
		   		            max:Math.round(QAxisMax),
		   		            min:Math.round(QAxisMin),
		   		              //precision:2,
		   		            axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:true,
		   		                length: 5,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:true,
		   		                interval: 'auto',    // {number}
		   		              
		   		                margin: 18,
		   		                formatter:function (value) {
		   		                    // Function formatter
		   		                    // if(value.toFixed(0)==QAxisMax.toFixed(0)&&markz==0){
		   		                    // 	markz = 1;
		   		                    // 	return '\n蓄水量(m³)\n' + value.toFixed(0) + ''
		   		                    // }
		   		                    return value.toFixed(1) + ''
		   		                } ,    // Template formatter!
		   		                textStyle: {
		   		                  
		   		                    fontFamily: 'Calibri',
		   		                    fontSize:11.5,
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
		   		            }
		   		            
		   		        }, {
		   		        	name:'水位(m)',
		   		            type : 'value',
		   		            max:ZAxisMax,
		   		         	min:ZAxisMin,
		   		            splitNumber: 5,
		   		            precision:2,
		   		         	position :'left',
		   		            axisLabel : {
		   		                formatter: function (value) {
		   		                    // if(value==ZAxisMax){
		   		                    // 	return '\n水位(m)\n' + value.toFixed(2) + ''
		   		                    // }
		   		                    return value.toFixed(2) + ''
		   		                },
		   		                 textStyle: {
		   		                  
		   		                    fontFamily: 'Calibri',
		   		                    fontSize:11.5,
		   		                    color:'#3D3D3D',
		   		                    fontStyle: 'normal'
		   		                   
		   		                }
		   		            },
		   		            splitLine : {
		   		                show: false
		   		            },
		   		               axisLine : {    // 轴线
		   		                show: true,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		             axisTick : {    // 轴标记
		   		                show:true,
		   		                //length: 10,
		   		                lineStyle: {
		   		                    color: 'red',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            }
		   		        }
		   		    ],
		   		    series : [
		   		        {
		   		            name: '当前蓄水量',
		   		            type: 'line',
		   		         	large: false,
							symbolSize:1,
							symbol:'circle',
 							largeThreshold:30,
			   		        itemStyle: {normal: {color: '#191970',
							         lineStyle: {
				   		                   
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		            data: scatterBaW  },
		  
		   		        {
		   		            name: '当前水位',
		   		            type: 'line',
		   		         	yAxisIndex: 1,
		   		         	large: false,
							symbolSize:1,
							symbol:'circle',
 							largeThreshold:30,
			   		        itemStyle: {normal: {color: '#ee0000',
							         lineStyle: {
				   		                   
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		            data: scatterBaZ     
		   		        },
		   		     {
		   		            name:'历史蓄水量',
		   		            type: 'line',
		   		         	xAxisIndex: 1,
		   		         	large: false,
							symbolSize:1,
							symbol:'circle',
 							largeThreshold:30,
		   		         	itemStyle: {normal: {color: '#1c86ee',
							         lineStyle: {
				   		                   
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		            data:  scatterCmW   
		   		            },
		   		       
					     {
		   		            name:'历史水位',
		   		            type: 'line',
		   		        	xAxisIndex: 1,
		   		     	 	yAxisIndex: 1,
		   		     	 	large: false,
							symbolSize:1,
							symbol:'circle',
 							largeThreshold:30,
		   		     	 	itemStyle: {normal: {color: '#ee5c42',
							         lineStyle: {
				   		                   
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
		   		            data: scatterCmZ
		   		            }
		   		    ]
		   		};

		 var  optionTwo = {
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
		   		      	position :function(params) {return [params[0],params[1]+100]},
			   		      	formatter: function (params) {
				   	            var resTm = params[0][1];
				   	            getWdatabydateArrayDate(resTm,dateArrayTwo,dateArrayOne,baseZ,baseW,cmpZ,cmpW);
				   	            
								//var res = getBasicRealFormatter(params,resTm,cmpRealTime,22);
				   	            return '';
				   	        }
		   		    },
		   		      grid:{
		   		      		y:25,
		   		       	height:'70%',
				        
				        borderColor:'rgba(0,0,0,0)',
				       
				    },
		   		    legend: {
		   		    	show:false,
		   		    	x:100,
		   		    	data:['当前蓄水量','历史蓄水量','当前水位','历史水位']
		   		    
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
		   	        realtime : false,
		   	        start : 0,
			    	y:345, 	
		   	        height:10,
		   	        end : 100
		   	    	
		   	   		 },
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
		   		                interval:0,    // {number}
		   		               
		   		                margin: 8,
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
			    					} ,
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
		   		                    color: 'gray',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            data : dateArrayTwo
		   		            },
		   		            {
		   		            type : 'category',
		   		            position: 'top',
		   		            boundaryGap: false,
		   		            axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:false,
		   		             	//interval:Math.floor(dateArrayOne.length/20),
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'blue',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		                show:false,
		   		                //interval:Math.floor((dateArrayOne.length/6)-1),    // {number}
		   		                
		   		                margin: 18,
		   		                formatter: '{value}',
		   		                textStyle: {
		   		                    color: 'blue',
		   		                    fontFamily: 'sans-serif',
		   		                    fontSize: 8,
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
		   		            data : dateArrayOne  }
		   		    ],
		   		    yAxis : [
		   		        {
		   		            type : 'value',
		   		            position: 'left',
		   		            splitNumber: 5,
		   		            max:QAxisMax,
		   		            min:QAxisMin,
		   		         	  //precision:2,
		   		            axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'gray',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisTick : {    // 轴标记
		   		                show:false,
		   		                length: 10,
		   		                lineStyle: {
		   		                    color: 'green',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		            axisLabel : {
		   		               show:false,
		   		                interval: 'auto',    // {number}
		   		               
		   		                margin: 18,
		   		                formatter: '{value}',    // Template formatter!
		   		                textStyle: {
		   		                    color: '#1e90ff',
		   		                    fontFamily: 'Times New Roman',
		   		                    fontSize: 8,
		   		                    fontStyle: 'normal',
		   		                    fontWeight: 'bold'
		   		                }
		   		            },
		   		            splitLine : {
		   		                show:false,
		   		                lineStyle: {
		   		                    color: '#483d8b',
		   		                    type: 'dotted',
		   		                    width: 1
		   		                }
		   		            }
		   		        },
		   		     {
		   		            type : 'value',
		   		            max:ZAxisMax,
		   		         	min:ZAxisMin,
		   		         	show:false,
		   		         	  precision:2,
		   		            splitNumber: 5,
		   		         	 position :'right',
		   		            axisLabel : {
		   		            	show:false,
		   		                formatter: function (value) {
		   		                    // Function formatter
		   		                    return value.toFixed(2) + ''
		   		                }
		   		            },
		   		            splitLine : {
		   		                show: false
		   		            },
		   		             axisLine : {    // 轴线
		   		                show: false,
		   		                lineStyle: {
		   		                    color: 'gray',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		            },
		   		        }
		   		    ],
		   		    series : [
						{
					       name: '当前蓄水量',
					       type: 'line',
					           symbol:'circle',
					       itemStyle: {normal: {color: '#191970'}},
					       data: ['-']  },
					
					   {
					       name: '当前水位',
					   	   type: 'line',
					       symbol:'Circle',
					       symbolSize:0,
					       yAxisIndex: 1,
					       itemStyle: {normal: {color: 'red'}},
					       data: ['-']     
					   },
					   {
					       name:'历史蓄水量',
					   	   type: 'line',
						       symbol:'circle',
					       symbolSize:3,
						   itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
					       data:  ['-']   
					   },
					   {
					   		name:'历史水位',
					   		type: 'line',
					   		symbolSize:3,
					 		yAxisIndex: 1,
							symbol:'Circle',
							itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
					  		 data: ['-']
					   }
   
		   		    ]
		   		};
		   		// alert("finish");
		  optionArray.push(option);
		  optionArray.push(optionTwo);
		  return optionArray;
	}
	function getDateByStr(strDate){
		var str = strDate;
		if(typeof(str)=='undefined'){
			return ;
		}
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
			   		                    fontStyle: 'italic'
			   		                    
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