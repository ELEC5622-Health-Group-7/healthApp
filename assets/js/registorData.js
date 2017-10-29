var uname,upassword,message,checksignal,user_id;
function registor(){
	uname=$("#adminNo").val();
	upassword=$("#password").val(); 
	//alert("@@"+uname+"%%"+upassword);
    checkUsername();
    if(checksignal=='yes'){
        insertCustomer();
        getNewAccount();
        //$("#register11").attr("href","chooseFunction?id="+user_id);
        window.location.href="chooseFunction?id="+user_id
    }else{
        alert("username has existed !")
    }
}

function checkUsername(){
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : "/checkUsername",
		data : {
				Uname:uname
				},
		success : function(msg) {

			var json = msg;
			checksignal = json.message;
		}
	});
}

function insertCustomer(){
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : "/insertuserdb",
		data : {
				Uname:uname,
				Upassword:upassword
				},
		success : function(msg) {
		
			var json = msg;
			message = json.message;
		}
	});
}

function getNewAccount(){
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : "/getNewAccountdb",
		data : {
				Uname:uname

				},
		success : function(msg) {

			var json = msg;
			user_id = json.uid;
		}
	});
}



