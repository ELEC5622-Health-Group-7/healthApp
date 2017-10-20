//chart 不等距折线图
var option;
var _stnm;
var chart;
var series = new Array();
var leftyAxisInter = 0;
var Lmax = 0;
//单条data记录转换成单条series
function dataToSeries(name,data){
    var tempS = new Object();
    tempS.type = 'line';
    tempS.name = name;
    tempS.data = new Array();
    for(var i  = 0;i<data.data.length;i++){
        var x = data.data[i].L0x;
        var y = data.data[i].L0y;
        var temparray = new Array;
        temparray.push(x);
         temparray.push(y);
         tempS.data.push(temparray);
    }
    return tempS;
}

function getMax(series){
    var _data = series.data;
    var max = 0;
    for(var i = 0;i<_data.length;i++){
        if(max<=_data[i][1]){
            max = _data[i][1];
        }
    }
    return max;
}
function deletetest(name){
    var delIndex = 90;
     for(var x = 0;x<series.length;x++){
        if(series[x].name==name){
           delIndex = x;
        }
    }
    if(delIndex==90){
        return -1;
    }
    series.splice(delIndex,1);
    
     if(series.length<=0){
        var basicS = new Object();
          basicS.type = 'line';
          basicS.name = 'test';
          basicS.data = new Array();
          series.push(basicS);
     }
      option.series=series;
    var tempSeries = option.series;
    var max = 0;
    for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i].data;
        for(var n = 0;n<_data.length;n++){
            if(max<=_data[n][1]){
                max =_data[n][1];
            }
        }
    }
    var min = max;
     for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i];
        for(var n = 0;n<_data.length;n++){
            if(min>=_data[n][1]){
                min = data[n][1];
            }
        }
    }
    option.yAxis[0].max = max;
    Lmax = max;
    option.yAxis[0].min = min;
    chart.setOption(option,true);
    chart.refresh();
}
function deleteChart(name){
    var delIndex = 0;
     for(var x = 0;x<series.length;x++){
        if(series[x].name==name){
           delIndex = x;
        }
    }
    series.splice(delIndex,1);
     if(series.length<=0){
        var basicS = new Object();
          basicS.type = 'line';
          basicS.name = 'test';
          basicS.data = new Array();
          series.push(basicS);
     }
     
    option.series=series;
    var tempSeries = option.series;
    var max = 0;
    for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i].data;
        for(var n = 0;n<_data.length;n++){
            if(max<=_data[n][1]){
                max =_data[n][1];
            }
        }
    }
    var min = max;
     for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i].data;
        for(var n = 0;n<_data.length;n++){
            if(min>=_data[n][1]){
                min = _data[n][1];
            }
        }
    }
    if(max==min){
        max = max + 10;
    }
    option.yAxis[0].max = max;
    Lmax = max;
    option.yAxis[0].min = min;
    var legendName = new Array();
    for(var i = 0;i<tempSeries.length;i++){
            if(tempSeries[i].name!='test'){
            legendName.push(tempSeries[i].name);
        }
    }
    var tempLegend = new Object();
    if(legendName.length>0){
    tempLegend.show = true;
    }else{
        tempLegend.show = false;
    }
    tempLegend.data = new Array();
    tempLegend.data = legendName;
    option.legend = tempLegend;
    chart.setOption(option,true);
    chart.refresh();
}
function countChart(name,data){
     deletetest('test');
     var tempSeriesMember;
  
        //alert("当前尚无显示数据");
    tempSeriesMember = dataToSeries(name,data);
    for(var x = 0;x<series.length;x++){
        if(series[x].name==tempSeriesMember.name){
                series.splice(x,1);
                }
            }
    series.push(tempSeriesMember);
   
    option.series=series;
    var tempSeries = option.series;
    var max = 0;
    for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i];
        for(var n = 0;n<_data.data.length;n++){
            if(max<=_data.data[n][1]){
                max =_data.data[n][1];
            }
        }
    }
    var min = max;
     for(var i = 0;i<tempSeries.length;i++){
        var _data = tempSeries[i].data;
        for(var n = 0;n<_data.length;n++){
            if(min>=_data[n][1]){
                min = _data[n][1];
            }
        }
    }
    if(max==min){
        max = max + 10;
    }
    option.yAxis[0].max = max;
    Lmax = max;
    option.yAxis[0].min = min;
    var legendName = new Array();
    for(var i = 0;i<tempSeries.length;i++){
            if(tempSeries[i].name!='test'){
            legendName.push(tempSeries[i].name);
        }
    }
    var tempLegend = new Object();
    if(legendName.length>0){
    tempLegend.show = true;
    }else{
        tempLegend.show = false;
    }
    tempLegend.data = new Array();
    tempLegend.data = legendName;
    option.legend = tempLegend;
    chart.setOption(option,true);
    chart.refresh();
   
}

function initChart(stnm,divId){
   _stnm = stnm;
       option = {
   animation:false,
        addDataAnimation:false,
    title : {
        text: stnm+'断面图'
        
    },
  grid :{
  
        },
    tooltip : {
        show:false,
        trigger: 'axis',
        axisPointer:{
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        },
        formatter : function (params) {
            return '';
        }
    },
    legend: {
        show:false,
        data:['数据1','数据2']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
   xAxis : [
            {
              type: 'value',
              splitNumber:25,
              splitArea:{show:false},
              splitLine:{show:true}
            },
            {
                type: 'value',
                max:100,
                min:0,
                splitNumber:5,
                axisLabel:{show:false},
                splitArea:{show:false},
                splitLine:{show:true,lineStyle:{color:"black"}}
            }
        ],
        yAxis : [
            {
                name:'左岸',
                type: 'value',
                boundaryGap:[20,20],
                splitNumber:25,
                axisLine: {
                    lineStyle: {
                        color: '#dc143c'
                    }
                },
                axisLabel : {
                            show:true,
                            
                            formatter: function (value) {
                                // Function formatter
                               
                                if(leftyAxisInter==0){
                                leftyAxisInter = leftyAxisInter + 1;
                                return value.toFixed(2) + '';
                                }else{
                                    if(leftyAxisInter==4){
                                        leftyAxisInter = 0;
                                    }else{
                                        leftyAxisInter = leftyAxisInter + 1;
                                    }
                                    return '';
                                }
                            }   // Template formatter!
                         
                        },
                splitArea:{show:false},
                    splitLine:{show:true},
                    formatter : function (params) {
                    return '';
                }
         
            },
            {
                name:'右岸',
                type: 'value',
                splitNumber:5,
                max:100,
                min:0,
                  axisLabel : {
                            show:false,
                            
                            formatter: function (value) {
                                // Function formatter
                                if(value==100){
                                     return '\n右岸  \n';
                                }else{
                                    return '';
                                }
                                
                            }   // Template formatter!
                         
                        },
                axisLine: {
                    lineStyle: {
                        color: '#dc143c'
                    }
                },
               splitArea:{show:false},
                    splitLine:{show:true,lineStyle:{color:"black"}}
            }
        ],
     series : [
            
        ]
};
        chart = echarts.init(document.getElementById(divId));
        chart.setOption(option);
        chart.refresh();
           
}





