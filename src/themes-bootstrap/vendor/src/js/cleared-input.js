(function ($) {
    "use strict";

    const TAG = 'ClearedInput';
    const SELECTOR = '.cleared-input';

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class ClearedInput {

        /** @type {JQuery<Element>} */
        element;

        /** @type {JQuery<Element>} */
        wrapper;

        /** @type {JQuery<Element>} */
        inputText;

        /** @type {JQuery<Element>} */
        typeahead;

        /**
         * @param {Element} element
         */
        constructor(element) {
            this.element = $(element)

            this.element.hide('slow');
            this.wrapper = this.element.parent()
            const self = this;
            if (this.wrapper && this.wrapper.length > 0) {
                const input = this.wrapper.find('input[type="text"][name]')
                if (input.length > 0) {
                    this.inputText = input;
                    this.typeahead = input.closest('.twitter-typeahead')
                    input.on('change', () => self.#init())
                    input.on('focus', () => self.#init())
                    this.#init();
                }
            }
        }

        #init() {
            if (this.inputText && this.inputText.val().length > 0) {
                this.#show();
            }
        }

        #show() {
            this.element.show('slow')
            this.element.on('click', (event) => this.#hide())
        }

        #hide() {
            this.element.hide('slow')
            this.inputText.val('')

            if (this.typeahead && this.typeahead.length > 0) {
                this.inputText.typeahead('val', '')
            }

            timeOut(500, () => {
                this.inputText.get(0).focus();
            })
        }

        static #validate() {
            return $(SELECTOR).length > 0;
        }

        static instance() {
            if (ClearedInput.#validate()) {
                $(SELECTOR).each((i, selector) => {
                    new ClearedInput(selector);
                })
            }
        }
    }

    ClearedInput.instance();
})(jQuery);


