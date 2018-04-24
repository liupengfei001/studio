$(function(){
	var spH ="";
	emeanour_name();
	userHonorAjax();
	
})

	
	function emeanour_name(){
		var emeanour_data={
		 "siId": $.getUrlParam('siId')
	};
	var emeanour_data = JSON.stringify(emeanour_data);
	$.ajax({
		type : 'post',
		url : URL1 + 'query_workroom_info_jsons.tml',
		data : emeanour_data,
		dataType : 'json',
		cache : false,
		success : function(data) {
			console.log(data);
				var str="";
			if(data.code=="SYS_S_000"){
				spH = data.output.spHonor.split(",");
				$("#emeanour_name").html(data.output.spName+"的风采");
				$("#emeanour_honon").html(data.output.spName+"的成绩");
				$("#emeanour_honor").html(data.output.spName+"的荣誉")
				$("#emeanour_text").html(data.output.spBehavior);
				str+=' <div class="swiper-container">';
					str+='<div class="swiper-wrapper">';
				for (var i=0;i<data.output.spPhotos.length;i++) {
					
					str+='<div class="swiper-slide">';
					str+='<img class="img_swiper" src="'+data.output.spPhotos[i]+'"/>'
					str+='</div>';
					
				}
				str+='</div>';
					str+='<div class="swiper-pagination"></div>';
					str+='</div>';
				console.log(str)
				$(".emeanour_img").html(str);
				var swiper = new Swiper('.swiper-container', {
			      pagination: {
			        el: '.swiper-pagination',
			      },
			    });
			}
			
		},
		error:function(data){
			console.log(data);
		}
	});
	}

function userHonorAjax (data,spH) {
//	var spH = [1,2];
					
					//个人荣誉选择
	var userHonorInfo = {
						"": ""
		}
	var userHonor = JSON.stringify(userHonorInfo);
//	userHonorAjax(userHonor,spH);
	$.ajax({
		type : 'post',
		url : URL1 + 'query_personal_honor_jsons.tml',
		data : userHonor,
		dataType : 'json',
		cache : false,
		success : function(data) {
			console.log(data)
			var dataCode = data.code;
			var emeanour_pict="";
			if (dataCode == 'SYS_S_000') {
				$(".emeanour_honor").html("");
				for (var i=0;i<data.output.length;i++) {
					for (var j=0;j<spH.length;j++) {
						if (data.output[i].pkHonorTypeId == spH[j]) {
//							var $figure = $('<figure data-id="'+data.output[i].pkHonorTypeId+'">< img src="'+data.output[i].honorPicUrl+'" class="mEdit_honorImg" /><figcaption>'+data.output[i].honorName+'</figcaption></figure>');
//							$(".emeanour_honor").append($figure);
							emeanour_pict+='<div class="emeanour_divid">';
							emeanour_pict+='<img src="'+data.output[i].honorPicUrl+'" class="emeanour_pict" />';
							emeanour_pict+='<p class="emeanour_p" >'+data.output[i].honorName+'</p>';
							emeanour_pict+='</div>';
						}
					}
					$(".emeanour_honor").html(emeanour_pict);
				}
			}else{
//				mui.alert(data.desc);
			}
		},
		error:function(data){
			console.log(data)
		}
	})
}