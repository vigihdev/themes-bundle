// @ts-nocheck
(function ($) {
    "use strict";
    const ELEMENT_INPUT = 'textarea.form-control'
    const TEXTFIELD_FLOATING = 'textfield-floating-label'
    const TEXTFIELD_FLOATING_ACTIVE = 'textfield-floating-label-active'
    const TEXTFIELD_FLOATING_COMPLETED = 'textfield-floating-label-completed'

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    class TextArea {

        constructor(element) {
            this.$element = $(element);

            const $input = this.$element;
            if ($input.length > 0) {
                $input
                    .on('focus', (e) => {
                        $(e.target).closest('.' + TEXTFIELD_FLOATING)
                            .addClass(TEXTFIELD_FLOATING_ACTIVE)
                            .addClass(TEXTFIELD_FLOATING_COMPLETED)
                    })
                    .on('focusout', (e) => {
                        $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
                        let value = $(e.target).val();
                        if (value.length === 0) {
                            $(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
                        }
                    });

                if ($input.val().length > 0) {
                    $input.closest('.' + TEXTFIELD_FLOATING).addClass(TEXTFIELD_FLOATING_COMPLETED)
                }
            }
        }

        static validate() {
            return $(ELEMENT_INPUT).length > 0;
        }

        static instance() {
            if (TextArea.validate()) {
                $(ELEMENT_INPUT).each((i, element) => {
                    new TextArea(element);
                });
            }


        }
    }
    TextArea.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(300).then(() => {
            TextArea.instance();
        });
    });

})(jQuery); 