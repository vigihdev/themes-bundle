(function ($) {

    "use strict";

    const TAG = 'FormControlKodeToken';
    const INPUT_KODE = 'input.form-control-kode-token';
    const INPUT_GROUP = '.input-group-kode-token';
    const EVENT_COMPLETE = 'kode.complete'

    /**
    * @param {CallableFunction} callback
    * @param {number} ms
    * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class FormControlKodeToken {

        /** @type {Array<Element>} */
        itemInputKode = [];

        /**
         * @param {Element} element
         */
        constructor(element) {
            this.$element = $(element);
            $(element).find(INPUT_KODE)?.each((i, input) => this.itemInputKode.push(input));

            const self = this;
            this.itemInputKode.forEach(input => {
                input.addEventListener('keydown', (event) => self.#onKeydown(event));
            })

            if (this.#getFirstInput().val().length === 0) {
                timeOut(1000, () => this.#getFirstInput().get(0).focus())
            }

            $(INPUT_GROUP).on(EVENT_COMPLETE, (event, data) => {
            })

            $(INPUT_GROUP).get(0).addEventListener(EVENT_COMPLETE, (event) => {
            })
        }

        #onKeydown(event) {
            timeOut(200, () => {
                const input = $(event.target)
                if (input.val().length > 0) {
                    const prefix = this.#getIndexInput(event.target) ? this.#getIndexInput(event.target) + 1 : undefined;
                    const inputPrev = prefix && $(`.index-${prefix}`).length > 0 ? $(`.index-${prefix}`) : undefined;

                    if (inputPrev) {
                        inputPrev.get(0).focus()
                    }

                    timeOut(200, () => this.#onCompleteListener())
                }
            })
        }

        #onCompleteListener() {
            let results = [];
            this.itemInputKode.forEach(input => {
                if ($(input).val().length > 0) {
                    results.push($(input).val())
                }
            })

            if (results.length === this.itemInputKode.length) {

                const event = new CustomEvent(EVENT_COMPLETE, { detail: results.join('') });
                $(INPUT_GROUP).get(0).dispatchEvent(event)

                $(INPUT_GROUP).trigger({ type: EVENT_COMPLETE }, [results.join('')])
            }

        }

        /**
         * @param {Element} input
         * @returns {number|undefined}
         */
        #getIndexInput(input) {
            let index = $(input).attr('class')?.match(/index-[0-9]+/)?.[0]?.replace('index-', '')
            return index && typeof parseInt(index) === "number" ? parseInt(index) : undefined;
        }

        /**
         * @returns {JQuery<Element>}
         */
        #getFirstInput() {
            return $(this.itemInputKode?.slice(0, 1)?.pop())
        }

        static validate() {
            return $(INPUT_GROUP).length > 0 && $(INPUT_GROUP).find(INPUT_KODE).length > 0;
        }

        static instance() {

            if (FormControlKodeToken.validate()) {
                new FormControlKodeToken($(INPUT_GROUP).get(0))
            }
        }
    }

    FormControlKodeToken.instance();

    $(document).on('show.bs.modal', function (event) {
        timeOut(1000, () => FormControlKodeToken.instance())
    });
})(jQuery);

