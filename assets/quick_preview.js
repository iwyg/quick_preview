(function($){
	$.fn.delay = function(time, name){
		return this.queue(( name || "fx" ), function(){
			var self = this;
			setTimeout(function() {
				$.dequeue(self);
			}, time );
		});
	};
	
	$.fn.quickPreview = function(){
		
		this.hover(function(e){
			$('body').append('<div id="quick-preview"><span></span><div id="holder" class="loading"></div></div>');
			$('#quick-preview').fadeIn('fast');
			var image = new Image();
			$(image)
				.load(function(){
					$(this).hide();
					$('#quick-preview span').text(this.width + "x" + this.height)
						.fadeIn('fast').delay(3000).fadeOut('fast');
					$('#holder')
						.removeClass('loading')
						.empty()
						.css('width', this.width)
						.css('height', this.height)
						.append(this);
						
					correctPosition(e);
					$(this).fadeIn('fast');
				})
				.error(function(){
					$('#holder').text('Error loading image!');
				})
				.attr('src', this.href);
		}, function(){
			$('#quick-preview').remove();
		});
		
		this.mousemove(function(e){
			correctPosition(e);
		});
		
		function correctPosition(e){
			$('#quick-preview')
				.css('top', ( evalTop( e.pageY ) ) + 'px')
				.css('left', ( evalLeft( e.pageX ) ) + 'px');
		}
		
		function evalTop(u){
			xOffset = 20;
			st = $(window).scrollTop();
			qh = $('#quick-preview').height();
			wh = $(window).height();
			ww = $(window).width();
			
			s = u - st - qh / 2;
			if ( s + qh > wh - 12 ) {
				s = wh - qh - 12
			}
			if( ( wh < qh ) || ( s < 0 ) ) {
				s = 0
			} 
			return s;
		}
		
		function evalLeft(u){
			s = u + xOffset;
			qw = $('#quick-preview').width();
			if( s + qw + 12 > ww ) {
				if( qw + xOffset + 12 < u ) {
					s = u - xOffset - qw - 12;
				}
			}
			return s;
		}
		
		return this;
	};
	
	$(document).ready(function(){
		$('.field-upload, .selectable, .field-uniqueupload').find('a').map(function(){
			if (this.href.match(/\.(?:bmp|gif|jpe?g|png)$/i)) return this;
		}).quickPreview();
	});
	
})(jQuery);
