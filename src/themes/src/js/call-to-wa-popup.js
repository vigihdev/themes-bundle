// call-to-wa-widget
(function ($) {
    "use strict";
    const TAG = 'Call To Wa Widget'
    const SELECTOR = '.call-to-wa-widget'
    const SELECTOR_POPUP = '#call-to-wa-popup'
    const SELECTOR_POPUP_CLOSE = '.whatsapp-popup-close'
    const CALL_TO_WA = '#call-to-wa'

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class CallToWa {

        /** @type {JQuery<Element>} */
        element;

        /**
         * @param {Element} element
         */
        constructor(element) {

            this.element = $(element);

            const self = this;

            $(SELECTOR_POPUP).find(SELECTOR_POPUP_CLOSE).on('click', (event) => {
                event.preventDefault();
                $(SELECTOR_POPUP).collapse('hide');
            })
        }

        static validate() {
            return $(SELECTOR).length > 0 && $(SELECTOR_POPUP).length > 0;
        }


        static instance() {
            if (CallToWa.validate()) {
                new CallToWa($(SELECTOR).get(0))
            }
        }
    }

    CallToWa.instance();

})(jQuery); 