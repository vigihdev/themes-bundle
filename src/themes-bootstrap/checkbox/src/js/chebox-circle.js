
// checkbox-circle
(function ($) {
    "use strict";
    const TAG = 'CheckboxCircle'
    const ELEMENT = '.checkbox-circle';
    const INPUT_ELEMENT = 'input.checkbox-circle-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-circle-ripple';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxCircle {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if (e.target.checked) {
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                this.$inputCheckbox.closest(ELEMENT).addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                delay(1000).then(() => this.$inputCheckbox.closest(ELEMENT).removeClass(CHECKBOX_RIPPLE));
            }

        }

        #controlLabel() {
            $(ELEMENT).on('click', 'label', function (e) {
                console.log(e);
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (CheckboxCircle.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function (i, inputCheckbox) {
                    new CheckboxCircle(inputCheckbox)
                });
            }
        }
    }
    CheckboxCircle.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            CheckboxCircle.instance();
        })
    });
})(jQuery); 