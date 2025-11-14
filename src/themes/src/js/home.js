
// home.js
(function ($) {
    "use strict";
    const TAG = 'Home'


    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class CaraPesan {

        /** @type {Array<JQuery<Element>>} */
        items;

        /**
         * 
         * @param {Array<JQuery<Element>>} items
         */
        constructor(items) {

            this.items = items;

            const self = this;
            items?.forEach($item => {
                $item
                    .on('mouseover', (event) => {
                    })

                $item
                    .find('.item-title')
                    .on('mouseover', (event) => {
                        self.removeActive()
                        self.addActive($item)
                    })
            })
        }

        removeActive() {
            this.items?.forEach($item => {
                $item.removeClass('active')
            })
        }

        /**
         * 
         * @param {JQuery<Element>} $element
         */
        addActive($element) {
            $element.addClass('active')
        }
    }


})(jQuery);