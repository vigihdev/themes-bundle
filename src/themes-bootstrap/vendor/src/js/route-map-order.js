// @ts-nocheck

(function ($) {
    "use strict";

    var TAG = 'RouteMapOrder';
    class RouteMapOrder {
        constructor(){}

        static instance() {
            const origin = $('.origin-item-dotted-inner')
            if(origin.length > 0){
                origin.css({
                    height: (origin.closest('.origin-group').outerHeight() + 10) + 'px'
                })
            }
        }
    }

    RouteMapOrder.instance();
})(jQuery);


