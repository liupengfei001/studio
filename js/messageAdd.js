$(function() {
	//头像上传
	mEdit_headerImgSubmit();

	//个性签名
	var userSignInfo = {
		"": ""
	}
	var userSign = JSON.stringify(userSignInfo);
	userSignAjax(userSign);
	userSignSelect();

	var brokerId = $.getUrlParam('brokerId');
	var brokerPhone = $.getUrlParam('brokerPhone');
	$("#mEdit_userTel").html(brokerPhone);

	//个人荣誉选择
	var userHonorInfo = {
		"": ""
	}
	var userHonor = JSON.stringify(userHonorInfo);
	userHonorAjax(userHonor);
	$(".mEdit_userHonorBox").on('click', 'figure', function() {
		if($(this).hasClass("mEdit_userHonorSel")) {
			$(this).removeClass("mEdit_userHonorSel");
			$(this).find("img.mEdit_honorImgSel").attr("src", "img/notSelected_mEdit_honor.png");
		} else {
			$(this).addClass("mEdit_userHonorSel");
			$(this).find("img.mEdit_honorImgSel").attr("src", "img/selected_mEdit_honor.png");
		}
	})

	//公司简介
	$("#mEdit_userCompanyDes").focus(function() {
		if($("#mEdit_userCompanyName").val()) {

		} else {
			mui.alert("请先输入公司名字在输入公司简介！");
		}
	})

	//个人风采图片上传
	mEdit_userImgSubmit(brokerId, brokerPhone);

})

//获取个人荣誉
function userHonorAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'query_personal_honor_jsons.tml',
		data: data,
		dataType: 'json',
		cache: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				for(var i = 0; i < data.output.length; i++) {
					var $figure = $('<figure data-id="' + data.output[i].pkHonorTypeId + '"><img src="' + data.output[i].honorPicUrl + '" class="mEdit_honorImg" /><figcaption>' + data.output[i].honorName + '</figcaption><img src="img/notSelected_mEdit_honor.png" class="mEdit_honorImgSel" /></figure>');
					$(".mEdit_userHonorBox").append($figure);
				}
			} else {
				mui.alert(data.desc);
			}
		},
		error: function(data) {
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
	$("#file_mEdit_headerImg").change(function() {
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
			$(".mEdit_headerImg").attr("src", e.target.result);
			userHeaderImgAjax(formData1);
		}
	}
}

//个人风采图片上传
function userImgAjax(data, brokerId, brokerPhone) {
	$.ajax({
		type: 'post',
		url: URL1 + 'upload_fms_batch_pic.tml?uploadType=2020',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.status;
			if(dataCode == '0000') {
				var newUserImg = []
				for(var i = 0; i < data.data.length; i++) {
					newUserImg.push(data.data[i].fileSerialNo);
				}
				var userImgInfo = newUserImg.join(",")
				console.log(userImgInfo)
				window.localStorage.setItem("userImgInfo", userImgInfo);
				workroomSubmit(brokerId, brokerPhone);
			} else {
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

//个人风采图片上传
function mEdit_userImgSubmit(brokerId, brokerPhone) {
	var fileArr = [];
	var formData = new FormData();
	$("#file_mEdit_userImg").change(function() {
		var fil = this.files;
		data = this.files[0];
		if(fil.length > 0) {
			fileArr.push(data);
		}
		for(var i = 0; i < fil.length; i++) {
			reads(fil[i]);
		}
	})
	$(".mEdit_userImgBox").on('click', 'span img.mEdit_deleteImg', function() {
		var index1 = $(".mEdit_userImgBox img.mEdit_deleteImg").index($(this));
		$(this).parent().remove();
		if($(".mEdit_userImgBox .mEdit_appendImgBox").length < 6) {
			$(".mEdit_appendBtn").css("display", "inline-block")
		}
		fileArr.splice(index1, 1);
	})
	$(".mAdd_nextBtn").click(function() {
		if(fileArr.length > 0) {
			for(var i = 0; i < fileArr.length; i++) {
				formData.append('file', fileArr[i]);
			}
			$("#Shade").css("display", "block");
			$(".agreeMz").css("display", "block");
			userImgAjax(formData, brokerId, brokerPhone);
		} else {
			workroomSubmit(brokerId, brokerPhone);
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
		$('.messageEdit').css("height", height);
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
			$('.messageEdit').css('height', 'auto');
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
			$('.messageEdit').css('height', 'auto');
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

//工作室信息提交
function workroomSubmit(brokerId, brokerPhone) {
	if($(".mEdit_headerImg").attr("src") != "img/mEdit_headerImg.png") {
		if($("#mEdit_userStudio").val()) {
			if($("#mEdit_userName").val()) {
				if($("#mEdit_userSignInfo").val()) {
					var figureArr = $(".mEdit_userHonorBox figure.mEdit_userHonorSel");
					var newFigure = []
					for(var i = 0; i < figureArr.length; i++) {
						newFigure.push(figureArr.eq(i).attr("data-id"));
					}
					var spHonorInfo = newFigure.join(",");
					
					var workroomInfo = {
						brokerId: brokerId,
						companyDesc: $("#mEdit_userCompanyDes").val(),
						companyName: $("#mEdit_userCompanyName").val(),
						phoneNo: brokerPhone,
						spBehavior: $("#mEdit_spBehavior").val(),
						spDesc: $("#mEdit_userDes").val(),
						spHonor: spHonorInfo,
						spName: $("#mEdit_userName").val(),
						spPhotos: localStorage.getItem("userImgInfo"),
						spPic: localStorage.getItem("spPic"),
						spSign: $("#mEdit_userSignInfo").val(),
						stdName: $("#mEdit_userStudio").val()
					}
					var workroom = JSON.stringify(workroomInfo);
					console.log(workroom)
					$("#Shade").css("display", "block");
					$(".agreeMz").css("display", "block");
					workroomSubmitAjax(workroom)
				} else {
					mui.alert("请输入个人签名或者选择一条个人签名！");
				}
			} else {
				mui.alert("请输入个人姓名！");
				$("#mEdit_userName").focus();
			}
		} else {
			mui.alert("请输入个人工作室名称！");
			$("#mEdit_userStudio").focus();
		}
	} else {
		mui.alert("请上传个人头像！");
	}
}
//工作室信息Ajax
function workroomSubmitAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'update_workroom_info_jsons.tml',
		data: data,
		cache: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				$("#Shade").css("display", "none");
				$(".agreeMz").css("display", "none");
//				window.open("manage.html?siId=" + data.output.siId, "_self");
			} else {
				mui.alert(data.desc)
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//手机号校验
function testTel($tel) {
	var re = /^1[3|4|5|7|8|9][0-9]{9}$/; //电话号码
	if(re.test($tel.val())) {
		return true;
	} else {
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