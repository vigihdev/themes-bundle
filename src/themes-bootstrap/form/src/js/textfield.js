(function ($) {
    "use strict";
    const ELEMENT_INPUT = '.form-control'
    const TEXTFIELD_FLOATING = 'textfield-floating-label'
    const TEXTFIELD_FLOATING_ACTIVE = 'textfield-floating-label-active'
    const TEXTFIELD_FLOATING_COMPLETED = 'textfield-floating-label-completed'
    const EVENT = {
        floating_active: 'floatingActive.textfield',
        floating_completed: 'floatingCompleted.textfield',
    }

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    class Textfield {

        /** @type {JQuery<Element>} */
        textfield;

        /** @type {JQuery<Element>} */
        textInput;

        /**
         * @param {Element} textfield
         */
        constructor(textfield) {

            this.textfield = $(textfield);

            this.textInput = this.textfield.find('input.form-control');
            if (this.textInput?.length > 0) {

                this.textInput
                    .on('focus', (event) => {
                        $(event.target).closest('.' + TEXTFIELD_FLOATING)
                            .addClass(TEXTFIELD_FLOATING_ACTIVE)
                            .addClass(TEXTFIELD_FLOATING_COMPLETED)
                    })
                    .on('focusout', (event) => {
                        $(event.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
                        let value = $(event.target)?.val();
                        if (value?.length === 0) {
                            $(event.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
                        }
                    })
                    .on(EVENT.floating_active, (event) => {
                        $(event.target).closest('.' + TEXTFIELD_FLOATING)
                            .addClass(TEXTFIELD_FLOATING_ACTIVE)
                            .addClass(TEXTFIELD_FLOATING_COMPLETED)
                    })
                    .on(EVENT.floating_completed, (event) => {
                        $(event.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
                        let value = $(event.target)?.val();
                        if (value?.length === 0) {
                            $(event.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
                        }
                    })

                timeOut(700, () => {
                    if (this.textInput.val().length > 0) {
                        this.textInput.closest('.' + TEXTFIELD_FLOATING).addClass(TEXTFIELD_FLOATING_COMPLETED)
                    }
                })

            }
        }

        static validate() {
            return $(ELEMENT_INPUT).length > 0;
        }

        static instance() {
            if (Textfield.validate()) {
                $("." + TEXTFIELD_FLOATING).each((i, element) => {
                    new Textfield(element);
                });
            }
        }
    }
    Textfield.instance();

    $(document).on('show.bs.modal', function (event) {
        timeOut(700, () => Textfield.instance())
    });

})(jQuery); 