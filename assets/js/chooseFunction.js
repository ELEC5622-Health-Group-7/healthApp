var id;
function load(){
      document.getElementById("choosetype").click();
      var request = new Object();
	  request = GetRequest();
	  id=request['id'] ;
}

function href_change_one(){
					$("#dailytracker").attr("href","tracker_heart?id="+id);
				}

function href_change_two(){
					$("#exercisemonitor").attr("href","monitor_heart?id="+id);
				}

//获取url中参数
				function GetRequest() {
				    var url = location.search; //获取url中"?"符后的字串
				    var theRequest = new Object();
				    if (url.indexOf("?") != -1) {
				        var str = url.substr(1);
				        //alert(str);
				        strs = str.split("&");
				        for (var i = 0; i < strs.length; i++) {
				            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)
				        }
				    }
				    return theRequest;
				}