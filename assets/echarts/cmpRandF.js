	var chartBottom;
	var chartTop;
	var chartTopT;
	var chartBottomT;
	var flashDivId;
	var bottomDivId;
	var bottomTDivId;
	var topDivId;
	var topTDivId;
	var flashId;
	var baseStr = new String();
	var testuse = 0;
	var testint = 24;
	var x;
	var holeY;
	var intervals = 0;
	var currentIndex = 0;
	var rememberDataLength = 0;
    var holeYOne;
    var holeYTwo;
	var dateArrayTwo = new Array();
    var dateArrayOne = new Array(); 
    var intervalArrayOne = new Array();
    var intervalArrayTwo = new Array();
    var jsonResult;
	//chartString = 'chartTwo';
	//intervalArrayOne = [];

	//echartsSplitLineInterval = 0;//人为控制分割线时使用的间隔变量
	//echartsAxisTickInterval  = 0;
	//controlEchartSplitLineByData_On = 1;//经数据人为控制echart图表x轴分割线的开关，1表示人为控制，全局变量在更改后的echart中使用
	//controlEchartTwoAxisTick_On = 100;
	



	


	/*
	 * 初始化图表
	 * @author wxcwater
	 * @param bottomDiv 底图所用div的id
	 * @param topDiv    上层图所用div的id
	 * @param flashDiv  flash的父div的id
	 * @param flash     flash的id(非flash的div的id)
	 * 
	 */
	function rmpChartinit(bottomDiv,topDiv,bottomtDivId,toptDivId,flashDiv,flash){
		flashDivId = flashDiv;
		bottomDivId = bottomDiv; 
		bottomTDivId = bottomtDivId;
		topTDivId = toptDivId;
		topDivId = topDiv;
		flashId  = flash;
		// alert("cmprf");
		chartBottom = echarts.init(document.getElementById(bottomDivId));
		chartTop    = echarts.init(document.getElementById(topDivId));
		chartBottomT = echarts.init(document.getElementById(bottomtDivId));
		chartTopT    = echarts.init(document.getElementById(toptDivId));
	}
	/*
	 * 更新图标数据，并将两图做关联
	 * @author wxcwater
	 */
	function upDatechart(optionBottom,optionTop,optionBottomT,optionTopT){
				chartBottom.setOption(optionBottom,true);
				//chartBottomT.setOption(optionBottomT,true);
			 	chartTop.setOption(optionTop,true);//加载数据
			 	chartTopT.setOption(optionTopT,true);
			 	// chartBottom.connect([chartTop,chartTopT,chartBottomT]);
			 	 //chartBottomT.connect(chartTopT);
			 	 //chartTopT.connect(chartBottomT);
			  //  	chartTop.connect([chartBottom,chartBottomT,chartTopT]);//添加联动
			   	//chartTopT.on('dataZoom', Countinternal);
			 	chartTop.refresh();//刷新
			 	chartBottom.refresh();
	}

	
	
	 
	 /*
	 * 图表打印功能
	 * @author wxcwater
	 */
	function cmpChartprint(){
		var image = chartBottomT.getDataURL('jpeg');
		var imageb= chartBottom.getDataURL('jpeg');
		var imaget= chartTop.getDataURL('jpeg');
		var imagetb=chartTopT.getDataURL('jpeg');
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
		downloadLink.innerHTML = 
		'<img id="wxcwaterimgt" style="vertical-align:middle" src="' + imageb+'"/><img id="wxcwaterimgt" style="vertical-align:middle;z-index:1" src="' + imagetb
		+ '"/><img id="wxcwaterimgt" style="vertical-align:middl;margin-top:-305;" src="'+imaget+'"/>';
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
		
	
		
		
		var imageb= chartBottom.getDataURL('jpeg');
		var imaget= chartTop.getDataURL('jpeg');
		var imagetb=chartTopT.getDataURL('jpeg');
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
		downloadLink.href = imageb;
		downloadLink.innerHTML = '<img id="wxcwaterimgb" style="vertical-align:middle" src="' + imageb 
		+'"/><img id="wxcwaterimgt" style="vertical-align:middle" src="' + imaget+'"/><img id="wxcwaterimgtb" style="vertical-align:middle" src="'
		+ imagetb+'"/>';
		downloadDiv.appendChild(downloadLink);
		document.body.appendChild(downloadDiv);
		// downloadLink = null;
		//downloadDiv = null;
		baseStrb = document.getElementById("wxcwaterimgb").src;
		baseStrt= document.getElementById("wxcwaterimgt").src;
		baseStrtb=document.getElementById("wxcwaterimgtb").src;
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
		document.getElementById(bottomDivId).style.display='none';
		document.getElementById(bottomTDivId).style.display='none';
		document.getElementById(topTDivId).style.display='none';
		
	}	
	/*
	 * 此方法在图片导出结束或取消后回到图表显示的样式
	 * @author wxcwater
	 */
	function returnToChart(){
		document.getElementById(flashDivId).style.display='none';
		document.getElementById(bottomDivId).style.display='block';
		document.getElementById(topDivId).style.display='block';
		document.getElementById(bottomTDivId).style.display='block';
		document.getElementById(topTDivId).style.display='block';
		var d = document.getElementById(
				'__echarts_download_wrap__'
				);
		document.body.removeChild(d);
		d = null;
	}
	/*
	 * 此方法是自动重新适应宽高的方法，考虑到可能有这个需求加入的
	 * @author wxcwater
	 */
	function cmpChartResize(){
		chartBottom.resize();
		chartBottomT.resize();
		chartTop.resize();
		chartTopT.resize();
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
		

		imageb = baseStrb;//获得图表的base64字符串
		imaget= baseStrt;
		imagetb=baseStrtb;
		imaget= imaget.replace("data:image/jpeg;base64,", "");
		imageb= imageb.replace("data:image/jpeg;base64,", ""); 
		imagetb=imagetb.replace("data:image/jpeg;base64,", ""); //去掉字符串的头部信息，否则图表转换有问题
		thisMovie(flashId).sendToActionScriptForExportBaseImage(imageb,imaget,imagetb);//将base64字符串送入swf继续处理并下载到本地
				
		
	}
/*
 *	自定义控制tooltip显示方法，现作为实测数据展示，非实测数据不展示的功能
 *	@author:wxcwater
 */
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
					 	 if(params[i][0]=="当前降雨量"){
					 	 	if(tempParam<0){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
					 	 	}else{
					 	 	Ext.getCmp('lsjyl').setValue(tempParam);
					 	 	}
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
					 	 	tempParam = '-';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	  if(params[i][0]=="历史水位"){
					 	 	Ext.getCmp('lsswz').setValue(tempParam);
	
					 	 	
					 	 }
					 	 if(params[i][0]=="历史流量"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史降雨量"){
					 	 	if(tempParam<0){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
					 	 	}else{
					 	 	Ext.getCmp('lsjyl').setValue(tempParam);
					 	 	}
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
					 	 	tempParam = '-';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	 if(params[i][0]=="当前水位"){
					 	 	Ext.getCmp('swz').setValue(tempParam);
	
					 	 	res +='<br/>  '+params[i][0]+':'+tempParam;
					 	 }
					 	 if(params[i][0]=="当前流量"){
					 	 	Ext.getCmp('llz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="当前降雨量"){
					 	 	if(tempParam<0){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
					 	 	}else{
					 	 	Ext.getCmp('lsjyl').setValue(tempParam);
					 	 	}
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
					 	 	tempParam = '-';
					 	 }else{
					 	 	tempParam = tempParam.toFixed(2);
					 	 }
					 	  if(params[i][0]=="历史水位"){
					 	 	Ext.getCmp('lsswz').setValue(tempParam);
	
					 	 	
					 	 }
					 	 if(params[i][0]=="历史流量"){
					 	 	Ext.getCmp('lsllz').setValue(tempParam);
					 	 }
					 	 if(params[i][0]=="历史降雨量"){
					 	 	if(tempParam<0){
					 	 	Ext.getCmp('lsjyl').setValue(-tempParam);
					 	 	}else{
					 	 	Ext.getCmp('lsjyl').setValue(tempParam);
					 	 	}
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





	function getdatabydateArrayDate(date,dateArray,otherDateArray,baseZ,baseQ,baseY,cmpZ,cmpQ,cmpY){
		var dateIndex = 0;
		for(var i  = 0;i<dateArray.length;i++){
			if(dateArray[i]==date){
				dateIndex = i;
			}
		}
		var otherDateIndex = dateIndex/dateArray.length * otherDateArray.length;
		otherDateIndex   = Math.round(otherDateIndex);
		var otherDate    = otherDateArray[otherDateIndex];
		var otherDateZ   = '';
		var otherDateQ   = '';
		var otherDateY   = baseY[otherDateIndex];
		var dateZ        = '';
		var dateQ        =  '';
		var dateY        = cmpY[dateIndex];
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
		Ext.getCmp('jyl').setValue(otherDateY.toFixed(2));
		Ext.getCmp('lsswz').setValue(dateZ);	
		Ext.getCmp('lsllz').setValue(dateQ);
		Ext.getCmp('lsjyl').setValue(dateY.toFixed(2));
		//put put put wxcwatertodolist
	}

	function getIntervalArray(_datalength,dateArray,zoom){
        // alert("getIntervalArray");
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
			   // alert("getIntervalArray2");
			  return indextArray;
	}
	/*
     * 根据选定的datazoom重新计算适合的间隔
	 * @author wxcwater
	*/
	function Countinternal(params){
            if(intervalArrayOne){
		 	    intervalArrayOne = [];
            }
            if(intervalArrayTwo){
		 	    intervalArrayTwo = [];
            } 
			var zoom = params.zoom;
			console.log(zoom.start);
			console.log(zoom.end);
			x = Math.floor(testint*(zoom.end-zoom.start)/100);
			holeYOne = Math.floor(dateArrayOne.length*(zoom.end-zoom.start)/100);
			holeYTwo = Math.floor(dateArrayTwo.length*(zoom.end-zoom.start)/100);
             if(intervalArrayOne){
			intervalArrayOne = getIntervalArray(holeYOne,dateArrayOne,zoom);
             }
            if(intervalArrayTwo){
			intervalArrayTwo = getIntervalArray(holeYTwo,dateArrayTwo,zoom);
            }
			chartTop.refresh();//刷新
			chartBottom.refresh();
			chartTopT.refresh();//刷新
			chartBottomT.refresh();
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
	function countTheJsonToOption(startDateOne,endDateOne,startDateTwo,endDateTwo,json){
        // alert("enter");
		//先根据日期获得两个完整字符串
            jsonResult = json;
             dateArrayOne =  getDateArrayBetweenTwoDate(startDateOne,endDateOne);
             // alert(dateArrayOne);
        	 dateArrayTwo = getDateArrayBetweenTwoDate(startDateTwo,endDateTwo);
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
		 intervalArrayTwo = intervalArrayOne;
		//var dateArrayTwo = getDateArrayBetweenTwoDate();
		//根据服务器返回的日期串拼装data
        // alert('dateEnded');
		var baseZ = new Array();
		var baseQ = new Array();
		var cmpZ = new Array();
		var cmpQ = new Array();
		var baseY= new Array();
		var cmpY = new Array();
		var tempIndex = 0;
		var nullNum = 0;
		var basicRealTime = json.oneTm;
		var cmpRealTime   = json.TwoTm;
		var middleArray = new Array();
		var middleArrayQ = new Array();
		var scatterBZ = new Array();
		var scatterBQ = new Array();
		var scatterCZ = new Array();
		var scatterCQ = new Array();
		var scatterBY = new Array();
		var scatterCY = new Array();
		var avg;
		var avgQ;
        // alert("forstarts");
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
					scatterBY.push([i,json.oneP[tempIndex]]);
					
			  			if(nullNum==0){
			  					if(isNaN(json.oneP[tempIndex])){
			  						baseY.push(0);
			  						//scatterBY.push([i,0]);
			  					}else{
			  						baseY.push(json.oneP[tempIndex]);
			  							
			  					}
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
			  				 		middleArrayQ.push( baseQ[baseQ.length-1]+(avgQ*(t+1)));
			  				 		
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
			  					if(isNaN(json.oneP[tempIndex])){
			  						baseY.push(0);
			  						//scatterBY.push([i,0]);
			  					}else{
			  						baseY.push(json.oneP[tempIndex]);
			  							
			  					}
			  			}		
		  		}else{
		  			if(isNaN(json.oneP[tempIndex])){
			  						baseY.push(0);
			  						//scatterBY.push([i,0]);
			  					}else{
			  						baseY.push(json.oneP[tempIndex]);
			  							
			  					}
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
		avg = 0;
		avgQ = 0;
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
						scatterCY.push([i,-json.TwoP[tempIndex]]);
			  			if(nullNum==0){
			  					if(isNaN(json.TwoP[tempIndex])){
			  						cmpY.push(0);
			  					}else{
			  						cmpY.push(json.TwoP[tempIndex]);	
			  					}
			  					cmpZ.push(json.TwoZ[tempIndex]);
			  					cmpQ.push(json.TwoQ[tempIndex]);
			  					
			  					tempIndex++;
			  			}else{
			  				if(isNaN(json.TwoP[tempIndex])){
			  						cmpY.push(0);
			  						
			  					}else{
			  						cmpY.push(json.TwoP[tempIndex]);
			  						
			  					}
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
		  		}else{
		  			if(isNaN(json.TwoP[tempIndex])){
			  						cmpY.push(0);
			  						
			  					}else{
			  						cmpY.push(json.TwoP[tempIndex]);
			  						
			  					}
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
		 // alert('BZ'+baseZ);
		 // alert('bq'+baseQ);
		 //  alert('by'+baseY);
		 // alert('cz'+cmpZ);
		 // alert('cq'+cmpQ);
		 // alert('cy'+cmpY);  
		  var Zmax = 0;
		  var Zmin = scatterBZ.length==0?0:scatterBZ[0][1];
		  var Qmax = 0;
		  var Qmin = scatterBQ.length==0?0:scatterBQ[0][1];
		  var Pmax = 0;
		  var Pmin = 0;
          for(var x = 0;x<scatterBZ.length;x++){
          	  if(scatterBZ[x][1]!='-'&&Zmax<scatterBZ[x][1]){
				  Zmax = scatterBZ[x][1];
			  }
			  if(x<scatterBQ.length&&scatterBQ[x][1]!='-'&&Qmax<scatterBQ[x][1]){
				  Qmax = scatterBQ[x][1];
			  }
			  if(scatterBZ[x][1]!='-'&&Zmin>scatterBZ[x][1]){
				  Zmin = scatterBZ[x][1];
			  }
			  if(x<scatterBQ.length&&scatterBQ[x][1]!='-'&&Qmin>scatterBQ[x][1]){
				  Qmin = scatterBQ[x][1];
			  }
          }
            for(var i = 0;i<scatterCZ.length;i++){
			  
				  if(scatterCZ[i][1]!='-'&&Zmax<scatterCZ[i][1]){
					  Zmax = scatterCZ[i][1];
				  }
				  if(i<scatterCQ.length&&scatterCQ[i][1]!='-'&&Qmax<scatterCQ[i][1]){
					  Qmax = scatterCQ[i][1];
				  }
				  if(scatterCZ[i][1]!='-'&&Zmin>scatterCZ[i][1]){
					  Zmin = scatterCZ[i][1];
				  }
				  if(i<scatterCQ.length&&scatterCQ[i][1]!='-'&&Qmin>scatterCQ[i][1]){
					  Qmin = scatterCQ[i][1];
				  }
				
		  }
		  for(var pindex=0;pindex<json.oneP.length;pindex++){
		  	if(Pmin<json.oneP[pindex]){
		  		Pmin = json.oneP[pindex];
		  	}
		  }
		  for(var pindex=0;pindex<json.TwoP.length;pindex++){
		  	if(Pmin<json.TwoP[pindex]){
		  		Pmin = json.TwoP[pindex];
		  	}
		  }
		  Pmin = Pmin * -1;
		  if(Zmax==Zmin){
		  	Zmax = 185;
		  	Zmin = 0;
		  }
		  if(Qmax==Qmin){
		  	Qmax = 185;
		  	Qmin = 0;
		  }
		  if(Pmax==Pmin){
		  	Pmax = 0;
		  	Pmin = -30;
		  }
          
		  Zmax = Zmax+Zmax*0.01;
		  Qmax = Qmax+Qmax*0.01;
		  Zmin = Zmin-Zmin*0.01;
		  Qmin = Qmin-Qmin*0.01;
       	  //Pmax = Pmax+Pmax*0.3;
       	  Pmin = Pmin;
       	  Pmax = Pmin*-1;
		  var testint = Math.floor(dateArrayTwo.length/6-1);
		  var x = testint;
		 
			 holeYOne = Math.floor(dateArrayOne.length);
			 holeYTwo = Math.floor(dateArrayTwo.length);
 			
 			var tempzoom =new Object();
 			tempzoom.start = 0;
 			tempzoom.end   = 100;
           // alert("intervalArrayOne");
			
            // intervalArrayOne = getIntervalArray(holeYOne,dateArrayOne,tempzoom); ;       
			
            // intervalArrayTwo = getIntervalArray(holeYTwo,dateArrayTwo,tempzoom) ;
             // alert("option");
             
		  	var optionArray = new Array();
		var   option = {
   				title:{text:'时段雨洪对比分析图',
   					x:300,
   					y:'top',
   					textStyle:{
   						fontFamily:'宋体'
   					}
   				},
                
    tooltip : {
    	show:false,
        trigger: 'axis',
        showContent:false,
         
		  formatter: function (params){
   	            var resTm = params[0][1];
   	            var res = getBasicRealFormatter(params,resTm,cmpRealTime,22);
   	            return res;
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
    	x:773,
    	y: 57 ,
    	orient:'vertical',
    	borderWidth:0,
        data:['当前降雨量','历史降雨量']
    },
    grid:{
    	x:60,
    	y:25,
    	width:658,
    	height:"75%"
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
         {
            type : 'value',
            min:0,
            max:dateArrayOne.length,
            show:true,
            //max:dateArrayOne.length,
            splitNumber:dateArrayOne.length,
            axisLine:{show:false},
            axisLabel:{show:false},
            splitLine:{show:true,
      	 	lineStyle:{
      	 		color:'#ccc',
      	 		width:1,
      	 		style:'dashed'
      	 	}
      	 }
      
            //scale:true
        },
         {
            type : 'value',
            show:false,
            scale:true,	
             min:0,
            max:dateArrayTwo.length
        }
    ],
    yAxis : [
        {
        	name:'降雨量(mm)',
        	nameTextStyle:{
        		fontFamily:'Calibri',
        		fontSize:11.5,
        		color:'#3D3D3D',
        		fontStyle:'normal'
        	},
        	max:Pmax,
        	min:Pmin,
        	splitNumber: 4,
        	splitLine : {
			    show:true,
			    lineStyle: {
			        color: '#ccc',
			        type: 'solid',
			        width: 1
			    }
			},
			axisLine:{
	          		 lineStyle: {
	                    color: '#ccc',
	                    type: 'solid',
	                    width: 1
	                }

	          	},
        	boundaryGap:true,
            type : 'value',
               axisLabel : {
               	interval: 'auto',
                formatter: function(v){
                	// if(v.toFixed(2)==Pmax.toFixed(2)){
                	// 	return '\n降雨量  \n(mm)'+ -v.toFixed(2);
                	// }else{
                	if(v>0){

                		return v.toFixed(1);
                	}else{
                    	return - v.toFixed(1);
                	}
                //}
                },
                textStyle: {
	               	fontFamily: 'Calibri',
               		color:'#3D3D3D',
               		fontSize: 11.5,
                    fontStyle: 'normal'
                }
            }
        }
    ],
    series : [
        {
            name:'历史降雨量',
            type:'bar',
            barWidth:1,
            symbolSize:1,
            xAxisIndex:1,
            symbol:'rectangle',
            large: false,
 			largeThreshold:20,
            itemStyle: {normal: {color:'red'}},
            data: scatterCY
        },
        {
            name:'当前降雨量',
            type:'bar',
            barWidth:1,
            xAxisIndex:0,
            symbolSize:1,
            symbol:'rectangle',
             large: false,
 			largeThreshold:5000,
             itemStyle: {normal: {color: '#191970'}},
            data: scatterBY
                
        }
    ]
};
          var optionOneTop = {
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
   		          formatter: function (params){
		   	            var resTm = params[0][1];
		   	            //var res = getBasicRealFormatter(params,resTm,basicRealTime,21);
		   	            return '';
		   	        }
            },
             
            dataZoom : {
                show : false,
                realtime : false,
                start : 0,
                end : 100
            },
            legend: {
                x:773,
                y: 57 ,
                show:false,
                orient:'vertical',
                borderWidth:0,
                data:['当前降雨量','历史降雨量']
            },
            grid:{
                x:60,
                y:25,
                width:658,
                height:"75%"
            },
            toolbox: {
                show : false,
                feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
                }
            },
            animation : false,
	   		addDataAnimation:false,
	   		calculable:false,
            xAxis : [
            {
            	//本位轴
            	show:false,
                type : 'category',
                boundaryGap: false,
                axisLine : {    // 轴线
                show: true,
                // interval:testint,
                lineStyle: {
                color: 'green',
                type: 'solid',
                width: 1
                }
                },
                axisTick : {    // 轴标记
                show:true,
                length: 10,
                //interval:Math.floor(dateArrayOne.length/20-1),
                lineStyle: {
                color: 'red',
                type: 'solid',
                width: 1
                }
                },
                axisLabel : {
                show:false,
                // interval: testint,    // {number}
                margin: 8,
                formatter: '{value}',
                textStyle: {
                color: 'red',
                fontFamily: 'Calibri',
                fontSize: 11.5,
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
                data : dateArrayOne
            }
          
            ],
        yAxis : [
       {
       		show:false,
        	max:Pmax,
        	min:Pmin,
        	splitNumber: 3,
        	splitLine : {
			    show:true,
			    lineStyle: {
			        color: 'gray',
			        type: 'dashed',
			        width: 1
			    }
			},
        	boundaryGap:true,
            type : 'value',
               axisLabel : {
               	show:false,
               	interval: 'auto',
                
                textStyle: {
               	fontFamily: 'Times New Roman',
               		color:'blue',
               		fontSize: 10,
                    fontStyle: 'normal'
                }
            }
        }
        ],
        series : [
        {
            name:'当前降雨量',
            type:'bar',
            symbolSize:0,
             itemStyle: {normal: {color: '#191970',lineStyle:{width:1}}},
            data: ['-']
        },
        {
        name:'历史降雨量',
        type:'bar',
        symbolSize:0,
       	itemStyle: {normal: {color:'rgba(0,0,0,0)',lineStyle:{width:1}}},
        data: ['-']
        }
        ]
        };  

        	//wxcwater下方对比
	var optionTwo = {
    tooltip : {
    	show:false,
        trigger: 'axis',
        showContent:false
    },
    
    legend: {
    	x:773,
    	y:68,
    	show:true,
    	orient:'vertical',
    	borderWidth:0,
    	itemWidth:15,
        data:['当前水位','历史水位','当前流量','历史流量']
    },
    dataZoom : {
    	x:50,
    	y:245,
        show : false,
        realtime : false,
        start : 0,
        end : 100
    },
    
    grid:{
    	x:60,
    	y:10,
    	width:658,
    	height:"84%"
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
   animation : false,
			   		addDataAnimation:false,
			   		calculable:false,
    xAxis : [
        {
        	//本位轴
            type : 'value',
            position:'bottom',
            min:0,
            max:dateArrayOne.length,
            splitNumber:dateArrayOne.length,
            axisLine:{
          		 lineStyle: {
                    color: 'black',
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
                    color: '#3D3D3D',
                    fontFamily: 'Calibri',
                    fontSize: 11.5,
                    fontStyle: 'normal'
                    
                }
            },
            splitLine:{show:true}
        },
         {
         	show:false,
         	type:'value',
         	min:0,
         	splitNumber:12,
         	max:dateArrayTwo.length,
         	min:0
             }
             
    ],
    yAxis : [
        {
        	//name:'水位(m)',
        	max:Zmax,
        	min:Zmin,
        	precision:2,
            type : 'value',
            axisLabel : {
                show:true,
                interval: 'auto',    // {number}
              
                margin: 8,
                formatter: function (value) {
                    // Function formatter
                    if(value.toFixed(2)==Zmax.toFixed(2)){
                    	return '\n水位(m)\n' + value.toFixed(2) + '';
                    }
                    return value.toFixed(2) + ''
                },        // Template formatter!
                textStyle: {
               	fontFamily: 'Calibri',
               	color:'#3D3D3D',
               	 fontSize: 11.5,
                    fontStyle: 'normal'

                   

                }
            },
             axisLine:{
            	 lineStyle: {
                    width: 1,
                    color:'red'
                }
            },
            splitLine:{
            	 lineStyle: {
                    color: '#ccc',
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
        },
        {
        	//name:'流量(m³/s)',
        	max:Qmax,
        	min:Qmin,
        	precision:2,
            type : 'value',
            axisLabel : {
                show:true,
                interval: 'auto',    // {number}
              
                margin: 8,
                formatter: function (value) {
                    // Function formatter
                    if(value.toFixed(2)==Qmax.toFixed(2)){
                    	return '\n流量(m³/s)\n' + value.toFixed(1) + '';
                    }
                    return value.toFixed(1) + ''
                },        // Template formatter!
                textStyle: {
               	fontFamily: 'Calibri',
                   	color:'#3D3D3D',
                   	 fontSize: 11.5,
                    fontStyle: 'normal'
                   

                }
            },
            axisLine:{
            	 lineStyle: {
                    width: 1
                }
            },
            splitLine:{
            	 lineStyle: {
                    color: '#ccc',
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
		   		            }

        }
    ],
    series : [
        {
            name:'当前水位',
            type:'line',
            symbolSize:1,
             symbol:'circle',
             large: false,
 			largeThreshold:20,
         	itemStyle: {normal: {color: '#ee0000',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
            data:scatterBZ
           
        },
        {
            name:'历史水位',
            type:'line',
            xAxisIndex:1,
            symbolSize:1,
             symbol:'circle',
             large: false,
 			largeThreshold:20,
            itemStyle: {normal: {color: '#ee5c42',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
            data:scatterCZ
        },
         {
            name:'当前流量',
            type:'line',
            yAxisIndex:1,
             symbol:'circle',
            symbolSize:1,
             large: false,
 			largeThreshold:20,
            itemStyle: {normal: {color: '#458b00',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
            data:scatterBQ
           
        },
        {
            name:'历史流量',
            type:'line',
            xAxisIndex:1,
            yAxisIndex:1,
             large: false,
 			largeThreshold:20,
            itemStyle: {normal: {color: '#7cfc00',
					   						lineStyle: {
				   		                    type: 'solid',
				   		                    width: 1
				   		                }}},
            symbolSize:1,
             symbol:'circle',
            data:scatterCQ
        }
    ]
};
  var optionTwoTop = {
   
    tooltip : {
        trigger: 'axis',
        showContent:false,
         axisPointer:{
		   		        	type:'line',
		   		        	showDelay:0,
		   		        	hideDelay:0,
		   		          		 lineStyle: {
		   		                    color: 'black',
		   		                    type: 'solid',
		   		                    width: 1
		   		                }
		   		          	
		   		        },
	    formatter: function (params){
			   	            var resTm = params[0][1];
			   	           getdatabydateArrayDate(resTm,dateArrayTwo,dateArrayOne,baseZ,baseQ,baseY,cmpZ,cmpQ,cmpY);
			   	            return '';
			   	        }
    },
    legend: {
    	show:false,
        x:773,
        y:43,
        orient:'vertical',
        borderWidth:0,
        itemWidth:15,
        data:['当前水位','历史水位','当前流量','历史流量']
    },
    dataZoom : {
        x:62,
        y:220, 	
        height:10,
        show : false,
        realtime : false,
        start : 0,
        end : 100
    },

    grid:{
        x:60,
        y:-25,
        width:658,
        borderColor:'rgba(0,0,0,0)',
        height:"90%"
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    animation : false,
			   		addDataAnimation:false,
			   		calculable:false,
    xAxis : [
        
        {
        	//对比
            type : 'category',
            position:'bottom',
            boundaryGap: false,
            //interval:Math.floor(dateArrayOne.length/20),
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
                interval:function (value){
								 	for(var i = 0;i<test_intervalArrayTwo.length;i++){
								 		if(value==test_intervalArrayTwo[i]){
								 			return true;
								 		}
								 	}
								 	return false;
			    				},
                length: -7,
                lineStyle: {
                    color: '#ccc',
                    type: 'solid',
                    width: 1
                }
            },
            axisLabel : {
                show:true,
                   
                interval:0,
                margin: 3,
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
                textStyle: {
                    color: '#3D3D3D',
                    fontFamily: 'Calibri',
                    fontSize: 11.5,
                    fontStyle: 'normal'
                   
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
            data : dateArrayTwo
        }
    ],
    yAxis : [
         {
        	max:Zmax,
        	min:Zmin,
        	precision:2,
        	show:false,
            type : 'value',
            axisLabel : {
                show:false,
                interval: 'auto',    // {number}
              
                margin: 18,
                formatter: function (value) {
                    // Function formatter
                    if(value==Zmax){
                    	return '\n水位(m)\n' + value.toFixed(2) + '';
                    }
                    return value.toFixed(2) + ''
                },        // Template formatter!
                textStyle: {
               	fontFamily: 'Calibri',
                   fontSize:11.5,
                    fontStyle: 'normal'
                   

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
            lineStyle:{
            	width:1
            }
        },
        {
        	max:Qmax,
        	min:Qmin,
        	show:false,
        	precision:2,
            type : 'value',
            axisLabel : {
                show:false,
                interval: 'auto',    // {number}
              
                margin: 18,
                formatter: function (value) {
                    // Function formatter
                    if(value==Qmax){
                    	return '\n流量(m³/s)\n' + value.toFixed(2) + '';
                    }
                    return value.toFixed(2) + ''
                },        // Template formatter!
                textStyle: {
               	fontFamily: 'Calibri',
                   fontSize:11.5,
                    fontStyle: 'normal'
                   

                }
            },
             splitLine : {
                show:false,
                lineStyle: {
                    color: 'blue',
                    type: 'solid',
                    width: 1
                }
            }
        }
    ],
    series : [
         {
            name:'当前水位',
            type:'line',
            symbolSize:0,
            
            itemStyle: {normal: {color: '#ee0000'}},
            data:['-']
           
        },
        {
            name:'历史水位',
            type:'line',
            
            itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
            data:['-']
        },
         {
            name:'当前流量',
            type:'line',
            
            yAxisIndex:1,
            symbolSize:0,
            itemStyle: {normal: {color: '#458b00'}},
            data:['-']
           
        },
        {
            name:'历史流量',
            type:'line',
            
           itemStyle: {normal: {color: 'rgba(0,0,0,0)'}},
            yAxisIndex:1,
            symbolSize:0,
            data:['-']
        }
    ]
};          
      // alert("finish");
	  optionArray.push(option);
	  optionArray.push(optionTwo);
	  optionArray.push(optionOneTop);
	  optionArray.push(optionTwoTop);
	  return optionArray;
	}
	
	function getDateArrayBetweenTwoDateWithNoReturn(startDate,endDate,testDate){
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
        
        testDate =  dateArray;
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
