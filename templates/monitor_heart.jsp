
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>exercise monitor</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- basic styles -->

		<link href="assets/css/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="assets/css/font-awesome.min.css" />
		<!--[if IE 7]>
		  <link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
		<![endif]-->

		<!-- page specific plugin styles -->
        <link rel="stylesheet" href="assets/css/jquery-ui-1.10.3.full.min.css" />
		<link rel="stylesheet" href="assets/css/jquery-ui-1.10.3.custom.min.css" />
		<link rel="stylesheet" href="assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="assets/css/select2.css" />

		<!-- fonts -->

		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />

		<!-- ace styles -->

		<link rel="stylesheet" href="assets/css/ace.min.css" />
		<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="assets/css/ace-skins.min.css" />

		<!--[if lte IE 8]>
		  <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
		<![endif]-->

		<!-- inline styles related to this page -->

		<!-- ace settings handler -->
		<script src="assets/js/ace-extra.min.js"></script>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

		<!--[if lt IE 9]>
		<script src="assets/js/html5shiv.js"></script>
		<script src="assets/js/respond.min.js"></script>
		<![endif]-->

</head>
<body>

		<div class="navbar navbar-default" id="navbar">
			<script src="assets/js/jquery-1.7.2.min.js"></script>
			<script type="text/javascript">
				try{ace.settings.check('navbar' , 'fixed')}catch(e){}

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

				var request = new Object();
			    request = GetRequest();
				var id=request['id'] ;
				//alert("***"+id);
				function href_change_one(){
					$(".navbar-brand").attr("href","chooseFunction?id="+id);
				}

				function href_change_two(){
					$(".monitor_heart").attr("href","monitor_heart?id="+id);
				}

				function href_change_three(){
					$(".monitor_blood").attr("href","monitor_blood?id="+id);
				}

				function href_change_four(){
					window.location.href="login";
				}

                function href_change_five(){
					$(".choosefun").attr("href","chooseFunction?id="+id);
				}

			</script>

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="" class="navbar-brand" onClick="href_change_one()">
						<small>

							HEM
						</small>
					</a><!-- /.brand -->
				</div><!-- /.navbar-header -->

				<div class="navbar-header pull-left" role="navigation">
					<ul class="nav ace-nav">


						<li class="light-blue" style="margin-left:60px;">
							<a  href="" class="monitor_heart" onClick="href_change_two()">

								<span >Heart Rate</span>
							</a>
						</li>

						<li class="light-blue" style="margin-left:40px;">
							<a  href="" class="monitor_blood" onClick="href_change_three()">
								<span >Blood pressure</span>
							</a>

						</li>
					</ul><!-- /.ace-nav -->
				</div><!-- /.navbar-header -->

				<div class="navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">

						<li class="light-blue" style="margin-right:20px;">
							<a data-toggle="dropdown" class="dropdown-toggle" id="logout" onClick="href_change_four()">

								<span >Log out</span>
							</a>
						</li>
					</ul><!-- /.ace-nav -->
				</div><!-- /.navbar-header -->
			</div><!-- /.container -->
		</div>

		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<div class="main-container-inner">
				<a class="menu-toggler" id="menu-toggler" href="#">
					<span class="menu-text"></span>
				</a>



				<div class="main-content" style=" margin-left:0px;">
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">
							try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
						</script>

						<ul class="breadcrumb" style="margin-top:8px;">
							<li>

								<a href="" class="choosefun" onClick="href_change_five()">Choose Function</a>
							</li>
							<li class="active">Exercise Monitor-Heart Rate</li>


						</ul><!-- .breadcrumb -->


					</div>

					<div class="page-content">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="alert alert-warning">
											<button type="button" class="close" data-dismiss="alert">
												<i class="icon-remove"></i>
											</button>
											<strong>Warning!</strong>

											Before clicking the button, you need to finish the process of collecting data.
											<br />
										</div>
                            </div><!-- /.col -->
                        </div><!-- /.row -->

                         <div class="row" style="width: 50%; float:left;margin-top:70px">
                                <div class="col-xs-12" >
                                <h1 >
								    Show your heart rate
								   <small>
									    <i class="icon-double-angle-right"></i>
                                        Before and after excise
								   </small>
							    </h1>
							    </div><!-- /.col -->
							    <div class="col-xs-12" >
							      <form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> Your sport name: </label>

										<div class="col-sm-9">
											<input type="text" id="form-field-1" placeholder="Sport Name" class="col-xs-10 col-sm-5" />
										</div>

									</div>
								  </form>
                                 </div><!-- /.col -->
                                 <div class="col-xs-12" >
                                    <label  style="float:left;width: 90px;margin-left:6%;"for="form-type">Choose type:</label>

															<select style="float:left;width: 150px;margin-left:6%" class="form-control" id="form-type">
																<option value="1">Before exercise</option>
																<option value="2">After exercise</option>

															</select>
                                 </div><!-- /.col -->

                                 <div class="col-xs-12" >
                                    <button id="excute_button" class="btn btn-info" type="button" style="margin-left:25%;margin-top:10%">
												<i class="icon-ok bigger-110"></i>
												Excute
											</button>
                                 </div><!-- /.col -->
                         </div><!-- /.row -->
						<div class="row" style="width: 40%; float:left;margin-left:150px;margin-top:50px">
							<div class="col-xs-12">
								<!-- PAGE CONTENT BEGINS -->
                                    <div id="bars"class="col-sm-6" style="display:none;z-index:999;position:absolute;top:100px">

										<div id="progressbar" ><div class="progress-label">Loading...</div></div>
									</div><!-- ./span -->

							</div><!-- /.col -->
						</div><!-- /.row -->
						<div class="row" style="width: 30%; float:left;margin-left:250px">
						      <div class="col-xs-12">
						      <label  style="float:left;width: 90px;margin-left:6%;"for="form-type">Before exercise:</label>
						            <div class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
													<span class="percent">Pulse/min:0</span>
												</div>
						      </div><!-- /.col -->
						</div><!-- /.row -->
						<div class="row" style="width: 30%; float:left;margin-left:250px;margin-top:100px"">
						      <div class="col-xs-12">
						      <label  style="float:left;width: 90px;margin-left:6%;"for="form-type">After exercise:</label>
						            <div class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
													<span class="percent">Pulse/min:0</span>
												</div>
						      </div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.page-content -->
				</div><!-- /.main-content -->


			</div><!-- /.main-container-inner -->


		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

		<!-- <![endif]-->

		<!--[if IE]>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<![endif]-->

		<!--[if !IE]> -->

		<script type="text/javascript">
			window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='assets/js/jquery-1.10.2.min.js'>"+"<"+"/script>");
</script>
<![endif]-->

		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>
		<script src="assets/js/typeahead-bs2.min.js"></script>

		<!-- page specific plugin scripts -->

		<!--[if lte IE 8]>
		  <script src="assets/js/excanvas.min.js"></script>
		<![endif]-->
        <script src="assets/js/jquery-ui-1.10.3.full.min.js"></script>
		<script src="assets/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="assets/js/jquery.ui.touch-punch.min.js"></script>
		<script src="assets/js/chosen.jquery.min.js"></script>
		<script src="assets/js/bootstrap-colorpicker.min.js"></script>
		<script src="assets/js/jquery.knob.min.js"></script>
		<script src="assets/js/jquery.autosize.min.js"></script>
		<script src="assets/js/jquery.inputlimiter.1.3.1.min.js"></script>
		<script src="assets/js/jquery.maskedinput.min.js"></script>
		<script src="assets/js/bootstrap-tag.min.js"></script>
		<script src="assets/js/bootbox.min.js"></script>
		<script src="assets/js/jquery.easy-pie-chart.min.js"></script>
		<script src="assets/js/jquery.gritter.min.js"></script>
		<script src="assets/js/spin.min.js"></script>

		<!-- ace scripts -->

		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->

		<script type="text/javascript">
			jQuery(function($) {


                //progressbar
				$( "#progressbar" ).progressbar({
					value: 0,
					create: function( event, ui ) {
						$(this).addClass('progress progress-striped active')
							   .children(0).addClass('progress-bar progress-bar-success');
					},
					 change: function() {
                         $( "#progressLabel" ).text( $(this).progressbar( "value" ) + "%" );
                    },
                    complete: function() {
                        $( "#progressLabel" ).text( "Finish" );
                        $("#bars").css("display","none");
                    }
				});

                var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
				$('.easy-pie-chart.percentage').each(function(){
					$(this).easyPieChart({
						barColor: $(this).data('color'),
						trackColor: '#EEEEEE',
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: 8,
						animate: oldie ? false : 1000,
						size:155
					}).css('color', $(this).data('color'));
				});

             function progress() {
                    var val = $( "#progressbar" ).progressbar( "value" ) ;
                     $( "#progressbar" ).progressbar( "value", val + 1 );
                        if ( val < 99 ) {
                            setTimeout( progress, 100 );
                        }
               }

                $( "#excute_button" ).click(function(){
                 $( "#bars" ).css("display","block");
                setTimeout( progress, 1000 );
                  });

  });
		</script>

</body>
</html>