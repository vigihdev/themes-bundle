(function ($) {
    "use strict";
    const TAG = 'Textfield Rounded';
    const SELECTOR = '.form-group-rounded'
    const TEXTFIELD_ROUNDED_ACTIVE = 'textfield-rounded-active'
    const TEXTFIELD_ROUNDED_COMPLETED = 'textfield-rounded-completed'


    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class TextfieldRounded {

        /** @type {JQuery<Element>} */
        $input;

        /** @type {JQuery<Element>} */
        textInput;

        /**
         * @param {JQuery<Element>} $input
         */
        constructor($input) {

            this.$input = $input;
            this.$input
                .on('focus', (event) => {
                    $(event.target).closest(SELECTOR).addClass(TEXTFIELD_ROUNDED_ACTIVE)
                })
                .on('focusout', (event) => {
                    $(event.target).closest(SELECTOR).removeClass(TEXTFIELD_ROUNDED_ACTIVE)
                })
        }

        static validate() {
            return $(SELECTOR).length > 0;
        }

        static instance() {
            if (TextfieldRounded.validate()) {
                $('body').find(SELECTOR)?.toArray()?.map(el => $(el)).forEach($element => {
                    const $input = $element.find('input.form-control');
                    if ($input.length > 0) {
                        new TextfieldRounded($input)
                    }
                })
            }
        }
    }

    TextfieldRounded.instance();

    $(document).on('show.bs.modal', function (event) {
        timeOut(700, () => TextfieldRounded.instance())
    });

})(jQuery); 