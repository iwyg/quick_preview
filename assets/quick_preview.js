(function($){
	$.fn.quickPreview = function(){
		xOffset = 20;
		this.hover(function(e){
			$("body").append("<div id='quick-preview'><img src='"+ this.href +"' alt='Quick Preview' /></div>");
			
			$("#quick-preview")
				.css("position", "fixed")
				.css("top", evalTop( e.pageY ))
				.css("left",(e.pageX + xOffset) + "px")
				.fadeIn("fast");
		},
		function(){
			$("#quick-preview").remove();
		});
		this.mousemove(function(e){
			$("#quick-preview")
				.css("top",( evalTop( e.pageY ) ) + "px")
				.css("left",(e.pageX + xOffset) + "px");
		});
		return this;
	};
	
	function evalTop( u ){
		s = u - $(window).scrollTop() - $("#quick-preview").height() / 2;
		qh = $("#quick-preview").height();
		wh = $(window).height();
		var t;
		if( wh < qh ) {
			t = 0
		} else if( s < 0 ) {
			t = 0
		} else if ( s + qh > wh - 12 ) {
			t = wh - qh - 12
		} else {
			t = s
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
