(function($, global){
	
	var xOffset,st,qh,wh,ww,s,qw,
		$global = $(global);
	
	$.fn.delay = function(time, name){
		return this.queue(( name || "fx" ), function(){
			var self = this;
			setTimeout(function() {
				$.dequeue(self);
			}, time );
		});
	};
	function evalTop(u, el){
		xOffset = 20;
		st = $global.scrollTop();
		qh = el.height();
		wh = $global.height();
		ww = $global.width();
			
			s = u - st - qh / 2;
			if ( s + qh > wh - 12 ) {
				s = wh - qh - 12
			}
			if( ( wh < qh ) || ( s < 0 ) ) {
				s = 0
			} 
			return s;
		}
		
	function evalLeft(u, el){
		s = u + xOffset;
		qw = el.width();
		if( s + qw + 12 > ww ) {
			if( qw + xOffset + 12 < u ) {
				s = u - xOffset - qw - 12;
			}
		}
		return s;
	}
	
	function QuickPreview (){
		this.setup();
	}
	
	QuickPreview.prototype = {
		setup: function(){
			this.el = $('<div id="quick-preview"><span></span><div id="holder" class="loading"></div></div>');
			
			$('body')
					.bind('mousemove', $.proxy(this.correctPosition, this))
					.delegate('a','mouseenter',$.proxy(this.trigger,this))
					.delegate('a','mouseleave',$.proxy(this.removePreview, this));				
		},
		
		showPreview: function(e, src) {
			var that = this,image,
				holder = that.el.find('#holder');
			
			$('body').append(this.el)			
			
			this.el.fadeIn('fast');
			
			image = new Image();
			$(image)
				.load(function(){
					$(this).hide();
					that.el.find('span').text(this.width + "x" + this.height)
						.fadeIn('fast').delay(3000).fadeOut('fast');
						
					holder
						.removeClass('loading')
						.empty()
						.css('width', this.width)
						.css('height', this.height)
						.append(this);
						
					that.correctPosition(e);
					$(this).fadeIn('fast');
				})
				.error(function(){
					holder.text('Error loading image!');
				})
				.attr('src', src);			
			
		},
		
		removePreview: function(){
			this.el.detach();			
		},
		correctPosition: function(e){
			this.el.css('top', ( evalTop( e.pageY, this.el ) ) + 'px')				
				.css('left', ( evalLeft( e.pageX, this.el ) ) + 'px');			
		},
		trigger: function(e){
			var target = $([e.target, e.target.parentNode]).filter(function(){
				return !!this.href && this;
			})[0];
			if (target && target.href.match(/\.(?:bmp|gif|jpe?g|png)$/i)) {
				return this.showPreview.call(this,e, target.href);
			} 
			return false;
		}
	}
	
	
	$.fn.quickPreview = function(){
		this.data('quickpreview', new QuickPreview());
		return this;
	};
	
	$(document).ready(function(){
		
		$('form').quickPreview();
		/*
		$('.field-upload, .selectable, .field-uniqueupload').find('a').map(function(){
			if (this.href.match(/\.(?:bmp|gif|jpe?g|png)$/i)) return this;
		}).quickPreview();
		*/
	});
	
}(this.jQuery, this));