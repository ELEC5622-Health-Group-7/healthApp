var uname,upassword,message,uid,checksignal;
function registor(){
	uname=$("#adminNo").val();
	upassword=$("#password").val(); 
	//alert("@@"+uname+"%%"+upassword);
    checkUsername();
    if(checksignal=='yes'){
        insertCustomer();
        return message;
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

