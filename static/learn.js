function displayButtons(lesson){
	$("#next_button").click(function(){
		if(lesson["next_lesson"]=="end"){
				window.location.href = "/quiz"
		} else{
				window.location.href = "/learn/"+lesson["next_lesson"]
		}
	})
}

function displayOptionsSkin(lesson){
	$(".result-color").empty()
	$.each(lesson["options"],function(index,value){
		let new_option_div = $('<div class="col-md-4>')
		let new_option = $('<div>')
		if(index==0)
		{
			$(new_option).css({"border-color": "blue", 
             "border-width":"4px", 
             "border-style":"solid"})
		}
		$(new_option).attr({"id":index+1})
		$(new_option).text(value)
		$(".result-color").append(new_option)
		$(new_option).click(function(event){
			window.location.href = "/learn/"+lesson_id+"/"+$(new_option).attr("id")
		})
	})
}

function displayOptions(lesson){
	$(".result-color").empty()
	$.each(lesson["images"],function(index,value){
		let new_shape_div = $('<div class="col-md-4>')
		let new_shape = $('<img class="shape">')
		if(index==0)
		{
			$(new_shape).css({"border-color": "blue", 
             "border-width":"4px", 
             "border-style":"solid"})
		}
		$(new_shape).attr("src",value)
		$(new_shape).attr({"id":index+1})
		$(".result-color").append(new_shape)
		$(new_shape).click(function(event){
			window.location.href = "/learn/"+lesson_id+"/"+$(new_shape).attr("id")
		})
	})
}


$(document).ready(function(){
	if(lesson_id=="1")
	{
	displayButtons(lesson)
	displayOptions(lesson)
	} else {
		displayButtons(lesson)
		displayOptionsSkin(lesson)
	}
})