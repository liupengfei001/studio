
$(function () {
    var siId1 = $.getUrlParam('siId');
    var siIdInfo = {
		"siId": siId1
	}
	var siId = JSON.stringify(siIdInfo);
	console.log(siId)
	workroomInfoAjax (siId);
	
	//点击编辑
	$(".editBtn").click(function(){
		var xiang="刘messageEdit.html?siId="+siId1;
		console.log(xiang)
		Tiny.execute("openinformation('prodSaleCode="+xiang+"')")
		//window.open("messageEdit.html?siId=" + siId1,"_self");
	})
})

//个人工作室信息
function workroomInfoAjax (data) {
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
				$(".mEdit_headerImg").attr("src",data.output.spPic);
				$("#mEdit_userStudio").html(data.output.stdName);
				$("#mEdit_userName").html(data.output.spName);
				$("#mEdit_userTel").html(data.output.phoneNo);
				$("#mEdit_userCompanyName").html(data.output.companyName);
				$("#mEdit_userCompanyInfo").val(data.output.companyDesc);
				$("#mEdit_userWork").val(data.output.spBehavior);
				$("#mEdit_userSignInfo").val(data.output.spSign);
				$("#mEdit_userInfo").val(data.output.spDesc);
				if (data.output.spPhotos.length>0) {
					$(".mEdit_userImgBox").html("");
					for (var i=0;i<data.output.spPhotos.length;i++) {
						$img = $('<span class="mEdit_appendImgBox"><img src="'+data.output.spPhotos[i]+'" class="mEdit_userImg" /></span>')
						$(".mEdit_userImgBox").append($img)
					}
				}
				if (data.output.spHonor != "") {
					var spH = data.output.spHonor.split(",");
					//个人荣誉选择
					var userHonorInfo = {
						"": ""
					}
					var userHonor = JSON.stringify(userHonorInfo);
					userHonorAjax(userHonor,spH);
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
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery)

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
				$(".mEdit_userHonorBox").html("");
				for (var i=0;i<data.output.length;i++) {
					for (var j=0;j<spH.length;j++) {
						if (data.output[i].pkHonorTypeId == spH[j]) {
							var $figure = $('<figure data-id="'+data.output[i].pkHonorTypeId+'"><img src="'+data.output[i].honorPicUrl+'" class="mEdit_honorImg" /><figcaption>'+data.output[i].honorName+'</figcaption></figure>');
							$(".mEdit_userHonorBox").append($figure);
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





