

function displayBoxes(sublesson){
	$(".result").empty()
	$(".text-result").empty()
	$.each(sublesson['colors'], function(index, value){
		let new_shape_text = $('<div>')
		$(new_shape_text).text(sublesson["display_text"][index])
		if(index==0)
		{
			let new_shape_div = $('<div class="shape-cls">')
			let new_shape = $('<div class="shape">')
			$(new_shape).css('background-color',sublesson['initial_colors'][index])
			$(new_shape_div).append(new_shape)
			$(new_shape_div).append(new_shape_text)
			$(".result").append(new_shape_div)
		} else if (index==1||index==2) 
		{
			let new_shape_div = $('<div class="shape-cls">')
			let new_shape = $('<div class="shape">')
			$(new_shape).css('background-color',sublesson['initial_colors'][index])
			let inner_shape = $('<div class="inner-shape">')
			$(inner_shape).css('background-color',sublesson['add_colors'][index-1])
			$(inner_shape).attr({'color': value})
			$(new_shape).append(inner_shape)
			$(new_shape_div).append(new_shape)
			$(new_shape_div).append(new_shape_text)
			$(".result").append(new_shape_div)
			$(inner_shape).click(function(event){
				$(inner_shape).css('background-color',$(this).attr('color'))
				$(inner_shape).addClass("expand")
				// $(new_shape).css('background-color',$(this).attr('color'))
				$.post("mark_color_complete", {"lesson_id": lesson_id, 
				"sublesson_id":sublesson['sublesson_id'],
				"color_index": index-1})
				// $(this).remove()
				displayButtons()
			})
		} else if(index==3)
		{
			let new_shape_div = $('<div class="shape-cls">')
			let new_shape = $('<div class="shape">')
			$(new_shape).css('background-color',sublesson['initial_colors'][index])
			$(new_shape_div).append(new_shape)
			$(new_shape_div).append(new_shape_text)
			$(".result").append(new_shape_div)
		}	
	})

	
}

function displayOptions(){
	$(".result-color").empty()
	$.each(images,function(index,value){
		let new_shape_div = $('<div>')
		let new_shape = $('<img class="shape-opt">')
		if(index + 1 == sublesson["sublesson_id"])
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

function displayOptionsSkin(){
	$(".result-color").empty()
	console.log(options)
	$.each(options,function(index,value){
		let new_option_div = $('<div class="col-md-4>')
		let new_option = $('<div>')
		if(index + 1 == sublesson["sublesson_id"])
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


function displaySkinBoxes(sublesson){
	$(".result").empty()
	$(".result").addClass("align-items-end")
	$(".text-result").empty()
	$.each(sublesson['colors'], function(index, value){
		if(index==0)
		{
			let shape_parent = $('<div class="skin-parent">')
			let new_shape_div = $('<div>')
			let new_shape = $('<div class="skin">')
			$(new_shape).css('background-color',sublesson['colors'][index])
			$.each(sublesson["add_colors_1"], function(index,value){
				let inner_shape = $('<div class="inner-shape">')
				$(inner_shape).css('background-color',value)
				$(inner_shape).attr({'color': sublesson["result_colors_1"][index]})
				$(new_shape).append(inner_shape)
				$(inner_shape).click(function(event){
					// $(inner_shape).css('background-color',$(this).attr('color'))
					// $(inner_shape).addClass("expandskin")
					$(new_shape).css('background-color',$(this).attr('color'))
					$.post("mark_color_complete", {"lesson_id": lesson_id, 
					"sublesson_id":sublesson['sublesson_id'],
					"color_index": index-1,
					"add_colors_index": 1},)
					$(this).remove()
					displayButtons()
			})
			})
			let new_shape_text = $('<div>')
			$(new_shape_text).html(sublesson["display_text"][index])
			$(shape_parent).append(new_shape_text)
			$(shape_parent).append(new_shape)
			$(new_shape_div).append(shape_parent)
			$(".result").append(new_shape_div)
		} else if(index==1)
		{
			let shape_parent = $('<div class="skin-parent">')
			let new_shape_div = $('<div>')
			let new_shape = $('<div class="skin">')
			$(new_shape).css('background-color',sublesson['colors'][index])
			$.each(sublesson["add_colors_2"], function(index,value){
				let inner_shape = $('<div class="inner-shape">')
				$(inner_shape).css('background-color',value)
				$(inner_shape).attr({'color': sublesson["result_colors_2"][index]})
				$(new_shape).append(inner_shape)
				$(inner_shape).click(function(event){
					// $(inner_shape).css('background-color',$(this).attr('color'))
					// $(inner_shape).addClass("expandskin")
					$(new_shape).css('background-color',$(this).attr('color'))
					$.post("mark_color_complete", {"lesson_id": lesson_id, 
					"sublesson_id":sublesson['sublesson_id'],
					"color_index": index-1,
					"add_colors_index": 2},)
					$(this).remove()
					displayButtons()
			})
			})
			let new_shape_text = $('<div>')
			$(new_shape_text).html(sublesson["display_text"][index])
			$(shape_parent).append(new_shape_text)
			$(shape_parent).append(new_shape)
			$(new_shape_div).append(shape_parent)
			$(".result").append(new_shape_div)
		}
	})
}

function displayButtons()
{
	$(".footer").empty()
	let back_button = $("<button>")
	$(back_button).text("Back")
	$(".footer").append(back_button)
	$(back_button).click(function(event){
		window.location.href = "/learn/"+lesson_id
	})

	let clicked = []
	let completed = []

	$.get("get_completed", {"sublesson": sublesson["sublesson_id"]}, function(data, status) {
		if(lesson_id == "1"){
			clicked = data["clicked"]
			completed = data["completed"]

			if(! clicked.includes("False"))
			{
				let next_button = $("<button>")
				$(next_button).text("Next")
				$(".footer").append(next_button)
				let next_sublesson = parseInt(sublesson["sublesson_id"]) + 1
				$(next_button).click(function(event){
					if(next_sublesson < completed.length)
					{
						window.location.href = "/learn/"+lesson_id+"/"+ next_sublesson
					}
					else 
					{
						let next_lesson = parseInt(lesson_id) + 1
						window.location.href = "/learn/"+next_lesson
					}
				})
			}
		}
		else{
			clicked_1 = data["clicked_1"]
			clicked_2 = data["clicked_2"]
			completed = data["completed"]

			if(! clicked_1.includes("False") && ! clicked_2.includes("False"))
			{
				let next_button = $("<button>")
				$(next_button).text("Next")
				$(".footer").append(next_button)
				let next_sublesson = parseInt(sublesson["sublesson_id"]) + 1
				console.log(completed)
				$(next_button).click(function(event){
					if(next_sublesson <= completed.length)
					{
						window.location.href = "/learn/"+lesson_id+"/"+ next_sublesson
					}
					else 
					{
						window.location.href = "/quiz"
					}
				})
			}
		}

	})



}

$(document).ready(function(){
	if(lesson_id=="1")
	{
	displayBoxes(sublesson)
	displayButtons()
	displayOptions()
	} else {
		displaySkinBoxes(sublesson)
		displayButtons()
		displayOptionsSkin()
	}
})

