(function($){
	$.fn.quickPreview = function(){
		xOffset = 20;
		this.hover(function(e){
			$("body").append("<p id='quick-preview'><img src='"+ this.href +"' alt='Quick Preview' /></p>");
			
			s = e.pageY - $("#quick-preview").height() / 2 + $(window).scrollTop();
			
			$("#quick-preview")
				.css("top", evalTop( s ))
				.css("left",(e.pageX + xOffset) + "px")
				.fadeIn("fast");
		},
		function(){
			$("#quick-preview").remove();
		});
		this.mousemove(function(e){
			s = e.pageY - $("#quick-preview").height() / 2 + $(window).scrollTop();
				
			$("#quick-preview")
				.css("top",( evalTop( s ) ) + "px")
				.css("left",(e.pageX + xOffset) + "px");
		});
		return this;
	};
	
	function evalTop( s ){
		var t;
		if( $(window).height() < $("#quick-preview").height() )
		{
			t = $(window).scrollTop();
		}
		else if( s < 0 )
		{
			t = $(window).scrollTop();
		}
		else if ( s + $("#quick-preview").height() > $(window).scrollTop() + $(window).height() - 12 )
		{
			t = $(window).scrollTop() + $(window).height() - $("#quick-preview").height() - 12;
		}
		else
		{
			t = s;
		}
		return t;
	}
})(jQuery);

(function($){
	$(document).ready(function(){
		$(".field-upload, .selectable, .field-uniqueupload").find("a").map(function(){
			if (this.href.match(/\.(?:bmp|gif|jpe?g|png)$/i)) return this;
		}).quickPreview();
	});
})(jQuery);
