(function($, window, document) {
	'use strict';

	var Selector = {
        PARENT_SELECTOR: '',
        RIPPLE_EFFECT: ".ripple-effect",
        INK: '.ink'
    };
    
	var ClassName = {
        ANIMATE: "animate"
    };
    
	var Event = {
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
    };
    
	var Template = {
        SPAN: "<span class='ink'></span>"
    };

	/**
	 * ------------------------------------------------------------------------
	 * Functions
	 * ------------------------------------------------------------------------
	 */

	function onMouseDown(e) {
		var rippler = $(e.target);
		$(Selector.INK).remove();
		// create .ink element if it doesn't exist
		if (rippler.find(Selector.INK).length === 0) {
			rippler.append(Template.SPAN);
		}
		var ink = rippler.find(Selector.INK);
		// prevent quick double clicks
		ink.removeClass(ClassName.ANIMATE);
		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}

		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;

		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass(ClassName.ANIMATE);

		setTimeout(function () {
			ink.remove();
		}, 1500);
	}

	$(document).on(Event.MOUSEDOWN+" "+Event.TOUCHSTART, Selector.RIPPLE_EFFECT,onMouseDown);
})(jQuery, window, document);