$(function() {
	//个性签名
	var userSignInfo = {
		"": ""
	}
	var userSign = JSON.stringify(userSignInfo);
	userSignAjax(userSign);
	userSignSelect();
	
	//个人荣誉选择
	$(".mEdit_userHonorBox").on('click','figure',function(){
		if ($(this).hasClass("mEdit_userHonorSel")) {
			$(this).removeClass("mEdit_userHonorSel");
			$(this).find("img.mEdit_honorImgSel").attr("src","img/notSelected_mEdit_honor.png");
		}else{
			$(this).addClass("mEdit_userHonorSel");
			$(this).find("img.mEdit_honorImgSel").attr("src","img/selected_mEdit_honor.png");
		}
	})
	
	//公司简介
	$("#mEdit_userCompanyDes").focus(function(){
		if ($("#mEdit_userCompanyName").val()) {
			
		}else{
			mui.alert("请先输入公司名字在输入公司简介！");
		}
	})
	
	//个人工作室查询
	var updateArr = [];
	var siId1 = $.getUrlParam('siId');
    var siIdInfo = {
		"siId": siId1
	}
	var siId = JSON.stringify(siIdInfo);
	workroomInfoAjax (siId,updateArr);
	
	//头像上传
	mEdit_headerImgSubmit();	
	
	//个人风采图片上传
	mEdit_userImgSubmit(siId1,updateArr);
	
})

//个人签名接口
function userSignAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'query_personality_sign_jsons.tml',
		data: data,
		cache: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				for(var i = 0; i < data.output.length; i++) {
					$li = $('<li data-id="' + data.output[i].ssId + '">' + data.output[i].ssText + '</li>');
					$(".mEdit_userSignList").append($li);
				}
				$(".mEdit_userSignList li").eq(0).addClass("mEdit_userSignSelected");
			} else {
				mui.alert(data.desc)
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//个人签名选择
function userSignSelect() {
	$(".mEdit_userSignList").on('click', 'li', function() {
		$(this).addClass("mEdit_userSignSelected");
		$(this).siblings().removeClass("mEdit_userSignSelected");
	})
	//选一个
	$(".mEdit_changeBtn").on('click', function() {
		var height = document.documentElement.clientHeight;
		$('.messageEdit').css("height",height);
		$(".Shade1").fadeIn();
		$(".mEdit_userChooseBoxMz").css({
			"display": "block"
		})
		$(".mEdit_userChooseBoxMz").css({
			"left": "100%"
		}).stop().animate({
			"left": "0"
		})
		//取消
		$(".mEdit_cancelBtn").click(function() {
			$('.messageEdit').css('height','auto');
			$(".Shade1").fadeOut(200);
			$(".mEdit_userChooseBoxMz").stop().animate({
				"left": "100%"
			}, 200, function() {
				$(".mEdit_userChooseBoxMz").css({
					"display": "none"
				})
			})
		})
		//确定
		$(".mEdit_confirmBtn").click(function() {
			$('.messageEdit').css('height','auto');
			$("#mEdit_userSignInfo").val($(".mEdit_userSignSelected").html());
			$(".Shade1").fadeOut(200);
			$(".mEdit_userChooseBoxMz").stop().animate({
				"left": "100%"
			}, 200, function() {
				$(".mEdit_userChooseBoxMz").css({
					"display": "none"
				})
			})
		})
	})
}

//获取个人荣誉
function userHonorAjax (data,spH) {
	$.ajax({
		type : 'post',
		url : URL1 + 'query_personal_honor_jsons.tml',
		data : data,
		dataType : 'json',
		cache : false,
		success : function(data) {
			console.log(data)
			var dataCode = data.code;
			if (dataCode == 'SYS_S_000') {
				for (var i=0;i<data.output.length;i++) {
					var $figure = $('<figure data-id="'+data.output[i].pkHonorTypeId+'"><img src="'+data.output[i].honorPicUrl+'" class="mEdit_honorImg" /><figcaption>'+data.output[i].honorName+'</figcaption><img src="img/notSelected_mEdit_honor.png" class="mEdit_honorImgSel" /></figure>');
					$(".mEdit_userHonorBox").append($figure);
				}
				for (var i=0;i<data.output.length;i++) {
					for (var j=0;j<spH.length;j++) {
						if (data.output[i].pkHonorTypeId == spH[j]) {
							$("figure").eq(i).find("img.mEdit_honorImgSel").attr("src","img/selected_mEdit_honor.png");
							$("figure").eq(i).addClass("mEdit_userHonorSel");
						}
					}
				}
			}else{
				mui.alert(data.desc);
			}
		},
		error:function(data){
			console.log(data)
		}
	})
}

//个人工作室信息
function workroomInfoAjax (data,updateArr) {
	$.ajax({
		type : 'post',
		url : URL1 + 'query_workroom_info_jsons.tml',
		data : data,
		dataType : 'json',
		cache : false,
		success : function(data) {
			console.log(data)
			var dataCode = data.code;
			if (dataCode == 'SYS_S_000') {
				$(".mEdit_headerImg1").attr("src",data.output.spPic);
				$("#mEdit_userStudio").val(data.output.stdName);
				$("#mEdit_userName").val(data.output.spName);
				$("#mEdit_userTel").html(data.output.phoneNo);
				$("#mEdit_userCompanyName").val(data.output.companyName);
				$("#mEdit_userCompanyInfo").val(data.output.companyDesc);
				$("#mEdit_userWork").val(data.output.spBehavior);
				$("#mEdit_userSignInfo").val(data.output.spSign);
				$("#mEdit_userInfo").val(data.output.spDesc);
				if (data.output.spPhotos && data.output.spPhotos != "") {
					if (6>data.output.spPhotos.length>0) {
						for (var i=0;i<data.output.spPhotos.length;i++) {
							updateArr.push(data.output.spPhotos[i]);
							$img = $('<span class="mEdit_appendImgBox"><img src="'+data.output.spPhotos[i]+'" class="mEdit_userImg" /><img src="img/mEdit_delete.png" class="mEdit_deleteImg" /></span>')
							$(".mEdit_appendBtn").before($img)
						}
					}
					else if (data.output.spPhotos.length >=6) {
						$(".mEdit_userImgBox").html("");
						for (var i=0;i<data.output.spPhotos.length;i++) {
							updateArr.push(data.output.spPhotos[i]);
							$img = $('<span class="mEdit_appendImgBox"><img src="'+data.output.spPhotos[i]+'" class="mEdit_userImg" /><img src="img/mEdit_delete.png" class="mEdit_deleteImg" /></span>')
							$(".mEdit_userImgBox").append($img)
						}
					}
				}
				var spH = data.output.spHonor.split(",");					
				//个人荣誉选择
				var userHonorInfo = {
					"": ""
				}
				var userHonor = JSON.stringify(userHonorInfo);
				userHonorAjax(userHonor,spH);
			}else{
				mui.alert(data.desc);
			}
		},
		error:function(data){
			console.log(data)
		}
	})
}

//个人头像图片上传
function userHeaderImgAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'upload_fms_batch_pic.tml?uploadType=2001',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.status;
			if(dataCode == '0000') {
				window.localStorage.setItem("spPic", data.data[0].fileSerialNo);
			} else {
				mui.alert(data.message);
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//头像上传
function mEdit_headerImgSubmit() {
	var formData1 = new FormData();
	$("#file_mEdit_headerImg1").change(function() {
		var fil = this.files;
		data = this.files[0];
		formData1.append("file", data)
		for(var i = 0; i < fil.length; i++) {
			reads(fil[i]);
		}
	})

	function reads(fil) {
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function(e) {
			$(".mEdit_headerImg1").attr("src", e.target.result);
			userHeaderImgAjax(formData1);
		}
	}
}

//个人风采图片上传
function mEdit_userImgSubmit(brokerId,updateArr) {
	var fileArr = [];
	var delArr = [];
	var formData = new FormData();

	$("#file_mEdit_userImg").change(function() {
		var fil = this.files;
		data = this.files[0];
		console.log(data)
		if(fil.length > 0) {
			fileArr.push(data);
		}
		for(var i = 0; i < fil.length; i++) {
			reads(fil[i]);
		}
	})
	
	
	$(".mEdit_userImgBox").on('click', 'span img.mEdit_deleteImg', function() {
		var index1 = $(".mEdit_userImgBox img.mEdit_deleteImg").index($(this));
		delArr.push($(this).attr("src"));
		$(this).parent().remove();
		console.log($(".mEdit_userImgBox .mEdit_appendImgBox").length)
		if($(".mEdit_userImgBox .mEdit_appendImgBox").length < 6) {
			$pushSpan = $('<span class="mEdit_appendBtn">'+
				        	'<img src="img/mEdit_add.png" class="mEdit_addImg" />'+
				        	'<form  id="mEdit_userImgForm" method="post" style="text-align:center;" enctype="multipart/form-data"> '+
					    		'<input type="file" id="file_mEdit_userImg" name="file" accept="image/*" />'+
						       	'<input id="submits_mEdit_userImg" type="submit" />'+
						 	'</form>'+
				        '</span>')
			$(".mEdit_userImgBox").append($pushSpan)
		}
		for (var i=0; i < updateArr.length; i++) {
			if ($(this).parent().find("img.mEdit_userImg").attr("src") == updateArr[i]) {
				updateArr.splice(i, 1);
			}
		}
		
		fileArr.splice(index1, 1);
	})
	
	console.log(fileArr.length)
	$(".mEdit_nextBtn").click(function(){
		if (delArr.length>1) {
			var delARRInfo = {
				"fileSerialNo": delArr.join(",")
			}
			var delARR = JSON.stringify(delARRInfo);
			userImgDelAjax(delARR)
		}
		console.log(fileArr.length)
		if (fileArr.length>0) {
			console.log(updateArr)
			for(var i = 0; i < fileArr.length; i++) {
				formData.append('file', fileArr[i]);
			}
			$("#Shade").css("display", "block");
			$(".agreeMz").css("display", "block");
			userImgAjax(formData,brokerId,updateArr);
		}else{
			console.log(updateArr)
			window.localStorage.setItem("userImgInfo",updateArr.join(","));
			workroomSubmit (brokerId);
		}
	})
	

	function reads(fil) {
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function(e) {
			if($(".mEdit_userImgBox .mEdit_appendImgBox").length >= 5) {
				$(".mEdit_appendBtn").css("display", "none")
			}
			var $span = $('<span class="mEdit_appendImgBox"><img src="img/mEdit_delete.png" class="mEdit_deleteImg" /></span>');
			var $img = $('<img src="' + e.target.result + '" class="mEdit_userImg" />');
			$span.append($img)
			$(".mEdit_appendBtn").before($span);
		}
	}
}

//个人风采图片上传
function userImgAjax(data,brokerId,updateArr) {
	$.ajax({
		type: 'post',
		url : URL1 + 'upload_fms_batch_pic.tml?uploadType=2020',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.status;
			if (dataCode == '0000') {
				var newUserImg = [];
				for (var i=0;i<data.data.length;i++) {
					updateArr.push(data.data[i].fileSerialNo);
					newUserImg.push(data.data[i].fileSerialNo);
				}
				var userImgInfo = newUserImg.join(",");
				console.log(updateArr.join(","))
				window.localStorage.setItem("userImgInfo",updateArr.join(","));
				workroomSubmit (brokerId);
				
			}else{
				mui.alert(data.message);
			}
			$(".Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//个人风采图片删除
function userImgDelAjax(data) {
	$.ajax({
		type: 'post',
		url : URL1 + 'del_fms_batch_pic_jsons.tml',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.status;
			if (dataCode == '0000') {
				
			}else{
				mui.alert(data.message);
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//工作室提交信息
function workroomSubmit (brokerId) {
	if ($(".mEdit_headerImg").attr("src") != "img/mEdit_headerImg.png") {
		if ($("#mEdit_userStudio").val()) {
			if ($("#mEdit_userName").val()) {
				if ($("#mEdit_userSignInfo").val()) {
					var figureArr = $(".mEdit_userHonorBox figure.mEdit_userHonorSel");
					var newFigure = []
					for (var i=0;i<figureArr.length;i++) {
						newFigure.push(figureArr.eq(i).attr("data-id"));
					}
					var spHonorInfo = newFigure.join(",")
					console.log(spHonorInfo)
					var workroomInfo = {
						companyDesc : $("#mEdit_userCompanyInfo").val(),
						companyName : $("#mEdit_userCompanyName").val(),
						phoneNo : $("#mEdit_userTel").html(),
						siId : brokerId,
						spBehavior : $("#mEdit_userWork").val(),
						spDesc : $("#mEdit_userInfo").val(),
						spHonor : spHonorInfo,
						spName : $("#mEdit_userName").val(),
						spPhotos : localStorage.getItem("userImgInfo"),
						spPic : localStorage.getItem("spPic"),
						spSign : $("#mEdit_userSignInfo").val(),
						stdName : $("#mEdit_userStudio").val()
					}
					var workroom = JSON.stringify(workroomInfo);
					$("#Shade").css("display", "block");
					$(".agreeMz").css("display", "block");
					console.log(workroom)
					workroomSubmitAjax (workroom)
				}else{
					mui.alert("请输入个人签名或者选择一条个人签名！");
				}
			}else{
				mui.alert("请输入个人姓名！");
				$("#mEdit_userName").focus();
			}
		}else{
			mui.alert("请输入个人工作室名称！");
			$("#mEdit_userStudio").focus();
		}
	}else{
		mui.alert("请上传个人头像！");
	}
}

//工作室Ajax
function workroomSubmitAjax (data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'update_workroom_info_jsons.tml',
		data: data,
		cache: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				Tiny.execute("openshow()")
//				window.open("messageShow.html?siId=" + $.getUrlParam('siId'),"_self");
			} else {
				mui.alert(data.desc)
			}
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//手机号验证
function testTel ($tel) {
    var re=/^1[3|4|5|7|8|9][0-9]{9}$/;//电话号码
	if(re.test($tel.val())){
		return true;
	}
	else{
		mui.alert("手机号输入错误！")
		return false;
	}
}

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery)

var windheight = $(window).height(); 
$(window).resize(function(){
   var docheight = $(window).height();  
   if(docheight < windheight){            
      $(".mEdit_nextBtn").css("display","none");
   }else{
      $(".mEdit_nextBtn").css("display","inline-block");
	
   }           
});
