	(function ($) {
	    $.getUrlParam = function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
	    }
	})(jQuery);
	getList()
	function getProlist(code){
		var tagCode=code
			if(code!=undefined&&code!="TAG000001"){
				var str={
					"siId":$.getUrlParam('siId'),
					"isAll": 1,
	  				"pageIndex": 1,
	  				"pageSize": 100,
	  				"tagCode":code
				}
			}else{
				var str={
					"siId":$.getUrlParam('siId'),
					"isAll": 1,
	  				"pageIndex": 1,
	  				"pageSize": 100
				}
				
			}
		var data=JSON.stringify(str)
		console.log(data)
		$.ajax({
			url:URL1+"query_std_prod_list_jsons.tml",
			type:"POST",
			data:data,
			success:function(res){
				console.log(res)
				var list=res.output,html="";
				console.log(res.output)
				if(res.output!=undefined){
					for(var i=0,j=list.length;i<j;i++){
						html+='<li class="item"><div class="top_w"><img class="item_img" src="'+list[i].attachList[0].attachUrl+'"/>'
						html+='<div class="del" code="'+list[i].prodCode+'"><img class="del_img" src="img/del.png"/><p class="del_txt">删除</p></div></div>'
						html+='<p class="item_title">'+list[i].prodName+'</p><div class="bottom">'
						html+='<p>'+list[i].prodRecmd+'</p><span class="money">'+list[i].minPrice+'元起</span></div></li>'
					}
					$('.list').css("display","block")
					$('.empty').css("display","none")
					$('.list').html(html)
					touchLeft()
					delClick()
				}else{
					$('.list').css("display","none")
					$('.empty').css("display","block")
				}
				
			},
			error:function(){
				console.log("内容")
				$('.list').css("display","none")
				$('.empty').css("display","block")
			}
		})
	}
	getProlist()
	
	//左滑删除
	function touchLeft(){
		$(".item").on("swipeleft",function(){
			$(this).find(".top_w").stop().animate({
				left:"-1.6rem"
			},300).parent().siblings().find(".top_w").stop().animate({
				left:"0"
			},300)
		}).on("swiperight",function(){
			$(this).find(".top_w").stop().animate({
				left:"0"
			},300)
		})
	}
	
	//点击删除
	function delClick(){
		$('.del').on('click',function(){
			var code=$(this).attr('code')
			delList(code)
		})
	}
	function delList(code){
		var str={
			"prdCode":code,
			"siId":$.getUrlParam('siId')
		}
		var data=JSON.stringify(str)
		console.log(data)
		$.ajax({
			url:URL1+"del_std_prod_info_jsons.tml",
			type:"POST",
			data:data,
			success:function(res){
				console.log(res)
				 getProlist()
			},
			error:function(){
				console.log("删除错误")
			}
		})
	}
	
	//跳页
	$('.del').on('click',function(){
		//window.location.href="manage.html"
//		var xiang="刘messageEdit.html?siId="+siId1;
//		console.log(xiang)
//		Tiny.execute("openinformation('prodSaleCode="+xiang+"')")
	})
	
	//Tiny.execute('namefor(2)')