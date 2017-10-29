var login_name,login_password;
var user_list=[];
var isUser;
var user;
function login(){
	login_name=document.getElementById("logname").value;
	login_password=document.getElementById("logpass").value;
	//alert("username:"+login_name+"userpassword:"+login_password);
	checkUser();
	isUser=user;
    if(isUser==null){
        alert("no user");
    }else{
        self.location='chooseFunction?id='+isUser.uid;
    }
}

function showRegister(){
      self.location='register';
}

function checkUser(){
	getUser();
	for(var i=0;i<user_list.length;i++){
		if(login_name==user_list[i].uname){
		  if(login_password==user_list[i].upassword){
		        user=user_list[i];
		  }

			//alert("*****"+user_list[i].uname).length;
		}
		//alert("*****"+user_list[i].uname.length);
	}
}


function getUser(){
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : "/getuserdb",
		data : {},
		success : function(msg) {
		
			var json = msg;
			user_list = json;
		}
	});
}