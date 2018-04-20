	
	(function ($) {
	    $.getUrlParam = function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
	    }
	})(jQuery);
	//获取分类
	getList()
	
	//获取列表
	function getProlist(code,data){
			console.log(code)
			var tagCode=code
			if(code!=undefined&&code!="TAG000001"){
				var str={
					"siId":$.getUrlParam('siId'),
					"isAll": 0,
	  				"pageIndex": 1,
	  				"pageSize": 100,
	  				"tagCode":code
				}
			}else if(data!=undefined){
				var str={
					"siId":$.getUrlParam('siId'),
					"isAll": 0,
	  				"pageIndex": 1,
	  				"pageSize": 100,
	  				"prodName":data
				}
			}else{
				var str={
					"siId":$.getUrlParam('siId'),
					"isAll": 0,
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
					if(res.output!=undefined){
						var list=res.output,html="";
						console.log(res.output[0].tagList)
						for(var i=0,j=list.length;i<j;i++){
							html+='<li class="item" cmpCode="'+list[i].cmpCode+'" invalidTime="'+list[i].invalidTime+'" prodCode="'+list[i].prodCode+'" prodName="'+list[i].prodName+'"  prodDesc="'+list[i].prodDesc+'" code="1">'
							html+='<div class="left"><img class="check" src="img/no.png"/></div>'
							html+='<div class="center"><img class="item_img" src="'+list[i].attachList[0].attachUrl+'"/><div class="item_title">'
							html+='<p>'+list[i].prodName+'</p><span class="money">'+list[i].minPrice+'元起</span><div class="bottom"><p>'+list[i].cmpName+'</p>'
							html+='<span class="ratio">推广费比例16.0%</span></div></div></li>'
						}
						$('.list').css("display","block")
						$('.empty').css("display","none")
						$('.list').html(html)
						handleClick()
						haha()
					}else{
						$('.list').css("display","none")
						$('.empty').css("display","block")
					}
					
				},
				error:function(){
					console.log("回显错误")
				}
			})
		}
		getProlist()
	
	var arr=[]
	function haha(){
		$('.btn').on('click',function(){
			
			var list=$(".item")
			for(var i=0,j=list.length;i<j;i++){
				if($(".item").eq(i).attr('code')==2){
					var str={
						'cmpCode':$(".item").eq(i).attr('cmpCode'),
						"invalidTime":$(".item").eq(i).attr('invalidTime'),
						"prdCode":$(".item").eq(i).attr('prodCode'),
						"prdDesc":$(".item").eq(i).attr('prodDesc'),
						"prdName":$(".item").eq(i).attr('prodName'),
					}
					arr.push(str)
				}
			}
			if($.getUrlParam('first')!=undefined){
				var str={
					"siId":$.getUrlParam('siId'),
					"prdList": arr,
	  				"isCreate": "Y"
				}
			}else{
				var str={
					"siId":$.getUrlParam('siId'),
					"prdList": arr,
	  				"isCreate": "N"
				}
			}
				
				var data=JSON.stringify(str)
				console.log(data)
				$.ajax({
					url:URL1+"add_std_prod_info_jsons.tml",
					type:"POST",
					data:data,
					success:function(res){
						console.log(res)
						arr=[]
						if(res.code=="SYS_S_000"){
							if($.getUrlParam('first')!=undefined){
								Tiny.execute('yes(1)')
								window.location.href="index.html?siId="+$.getUrlParam('siId')
							}else{
								getProlist()
								//mui.alert("添加成功")
							}
						}
					},
					error:function(){
						//mui.alert("添加失败，请重新选择")
					}
				})
			
			
		})
	}
	function handleClick(){
		$('.item').on("click",function(){
			if($(this).attr("code")==1){
				$(this).find(".check").attr("src","img/yes.png")
				$(this).attr("code","2")
			}else{
				$(this).find(".check").attr("src","img/no.png")
				$(this).attr("code","1")
			}
		})
	}
