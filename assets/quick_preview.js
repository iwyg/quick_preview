(function($){
	$.fn.quickPreview = function(){
		xOffset = 20;
		yOffset = 30;
		this.hover(function(e){
			$("body").append("<p id='quick-preview'><img src='"+ this.href +"' alt='Quick Preview' /></p>");
			$("#quick-preview")
				.css("top", $(window).scrollTop() + yOffset)
				.css("left",(e.pageX + xOffset) + "px")
				.fadeIn("fast");
		},
		function(){
			$("#quick-preview").remove();
		});
		this.mousemove(function(e){
			$("#quick-preview")
				.css("top",($(window).scrollTop() + yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px");
		});
		return this;
	};
})(jQuery);

(function($){
	$(document).ready(function(){
		$(".field-upload, .selectable, .field-uniqueupload").find("a").map(function(){
			if (this.href.match(/\.(?:bmp|gif|jpe?g|png)$/i)) return this;
		}).quickPreview();
	});
})(jQuery);
