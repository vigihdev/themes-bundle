// back-to-top-widget
(function ($) {
    "use strict";
    const TAG = 'BackToTop'
    const SELECTOR = '.back-to-top-widget #back-to-top'

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class BackToTop {

        /** @type {JQuery<Element>} */
        element;


        /**
         * @param {Element} element
         */
        constructor(element) {

            this.element = $(element);

            const self = this;
            this.element
                .on('hide.backToTop', () => {

                })
                .on('show.backToTop', () => {

                })

            this.element
                .on('click', function () {
                    $('body, html').animate({ scrollTop: 0 }, 1500);
                })

            $(document).on('scroll', (event) => {

                if ($(window).scrollTop() > 300) {
                    self.element.show('slow')
                    this.element.trigger('show.backToTop')
                } else {
                    self.element.hide('slow')
                    this.element.trigger('hide.backToTop')
                }
            })

            this.element.hide('slow')
            this.element.trigger('hide.backToTop')

        }

        static validate() {
            return $(SELECTOR).length > 0;
        }

        static instance() {
            if (BackToTop.validate()) {
                new BackToTop($(SELECTOR).get(0))
            }
        }
    }

    BackToTop.instance();

})(jQuery);

