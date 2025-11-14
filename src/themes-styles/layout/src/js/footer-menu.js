
(function ($) {
    "use strict";

    const SELECTTOR = '#footer .list-menu';

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class FooterMenu {

        /** @type {JQuery<ELEMENT>} */
        $element

        /**
         * @param {Element} element
         */
        constructor(element) {
            this.$element = $(element);

            const origin = location.origin
            const currentUrl = location.href
            const pathname = location.pathname

            this.$element.find('li.list-menu-item').each((index, item) => {
                var onclick = $(item).attr('onclick')?.replace(/location\.href=|["']+/g, '')

                $(item).removeClass('active')
                if (new RegExp(onclick).test(currentUrl.replace(origin, ''))) {
                    $(item).addClass('active')
                }

                // Home
                if (/\.id\/pesanan/.test(currentUrl)) {
                    if (onclick === location.origin) {
                        $(item).addClass('active')
                    }
                }

                if (pathname === '/' && location.href.slice(0, -1) === onclick) {
                    $(item).addClass('active')
                }
            })

        }

        static #validate() {
            return $(SELECTTOR).length > 0;
        }

        static instance() {
            if (FooterMenu.#validate()) {
                new FooterMenu($(SELECTTOR).get(0))
            }
        }
    }

    FooterMenu.instance();

})(jQuery);



