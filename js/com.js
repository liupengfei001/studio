function getList(){
	var str={
		"":""
	}
	var data=JSON.stringify(str)
	$.ajax({
		url:URL1+"query_prod_classification_jsons.tml",
		type:"POST",
		data:data,
		success:function(res){
			var list=res.output,html=""
			console.log(list)
			for(var i=0,j=list.length;i<j;i++){
				if(i==0){
					html+='<li tagCode="'+list[i].tagCode+'" class="tab_list tab_list_active">'+list[i].tagName+'</li>'
				}else{
					html+='<li tagCode="'+list[i].tagCode+'" class="tab_list">'+list[i].tagName+'</li>'
				}
				
			}
			html+='<li class="tab_list list_end"></li>'
			$(".js-category").html(html)
			isc()
		},
		error:function(){
			console.log("产品分类错误")
		}
	})
}
function isc(){
	var myScroll=new IScroll('#wrapper', { 
		scrollX: true, 
		scrollY: false,
		click:true,
		tap:true
	});
	$(".tab_list").on("tap",function(){
		$(this).addClass("tab_list_active").siblings().removeClass("tab_list_active")
		getProlist($(this).attr('tagcode'))
	})
}