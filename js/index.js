		(function ($) {
		    $.getUrlParam = function (name) {
		        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		        var r = window.location.search.substr(1).match(reg);
		        if (r != null) return unescape(r[2]); return null;
		    }
		})(jQuery);
		function getData(){
			var str={
				"brokerId":$.getUrlParam('brokerId'),
				"siId":$.getUrlParam('siId')
			}
			var data=JSON.stringify(str)
			console.log(data)
			$.ajax({
				url:URL1+"query_workroom_info_jsons.tml",
				type:"POST",
				data:data,
				success:function(res){
					console.log(res)
					$('.img').attr("src",res.output.spPic)
					$('.name').html(res.output.spName)
					$('.introduce').html(res.output.spSign)
					$('.presonal').attr('src',res.output.stdLogo)
					
				},
				error:function(){
					console.log("回显错误")
				}
			})
		}
		getData()
		
		getList()
		
		function getProlist(code){
			console.log(code)
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
					if(res.output!=undefined){
						var list=res.output,html="";
						//console.log(list[0].attachList.attachUrl)
						for(var i=0,j=list.length;i<j;i++){
							html+='<li prodSaleCode="'+list[i].prodCode+'" prodCode="'+list[i].prodCodeList[0].prodCode+'" class="item"><img class="item_img" src="'+list[i].attachList[0].attachUrl+'" />'
							html+='<p class="item_title">'+list[i].prodName+'</p><div class="bottom">'
							html+='<p>'+list[i].prodRecmd+'</p><span class="money">'+list[i].minPrice+'元起</span></div></li>'
						}
						$('.empty').css("display","none")
						$('.list').css("display","block")
						$('.list').html(html)
						listOpation()
					}else{
						$('.empty').css("display","block")
						$('.list').css("display","none")
						nextPage()
					}
					
				},
				error:function(){
					console.log("回显错误")
				}
			})
		}
		getProlist()
		
		//下一页
		function nextPage(){
			$(".btn_next").on('click',function(){
				window.location.href="manage.html?siId="+$.getUrlParam('siId')
			})	
		}
		
		//详情
		function listOpation(){
			$(".item").on('click',function(){
				var xiang="刘http://h5.qtoubao.cn/details/index.html?prodSaleCode="+$(this).attr("prodSaleCode")+"&prodCode="+$(this).attr("prodCode")
				//var prodSaleCode=$(this).attr("prodSaleCode")+"prodCode="$(this).attr("prodCode");
				
				Tiny.execute("opendetail('prodSaleCode="+xiang+"')")
			})
		}
