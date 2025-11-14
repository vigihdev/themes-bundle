
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
})(jQuery); ;
// chebox-switch
(function ($) {
    "use strict";
    const ELEMENT = '.checkbox-switch'
    const INPUT_ELEMENT = 'input.checkbox-switch-form-control[type="checkbox"]';
    const SWITCH_RIPPLE = 'switch-ripple';
    const CHECKED = 'checked';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class Switch {

        constructor(element) {
            this.$element = $(element);
            this.$inputCheckbox = $(element).find(INPUT_ELEMENT);

            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                self.addRipple(context);
                self.switchCollapseShow(e.target.checked);

                if (e.target.checked) {
                    context.addClass(CHECKED);
                }
                else {
                    context.removeClass(CHECKED)
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                const context = this.$inputCheckbox.closest(ELEMENT);
                context.addClass(CHECKED);
                self.addRipple(context);
                this.switchCollapseShow(true);
            }
        }

        addRipple(context) {
            context.addClass(SWITCH_RIPPLE);
            delay(1000).then(() => context.removeClass(SWITCH_RIPPLE))
        }

        switchCollapseShow(bools) {
            if (this.#validateCollapse()) {
                delay(500).then(() => {
                    $(this.$inputCheckbox.data('target')).collapse((bools ? 'show' : 'hide'))
                })
            }
        }

        #validateCollapse() {
            let validate = Object.keys(this.$inputCheckbox.data()).filter(v => ['target', 'toggle'].includes(v)).length === 2;
            return validate && this.$inputCheckbox.data('toggle') === 'collapse' && $(this.$inputCheckbox.data('target')).length > 0;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (Switch.validate()) {
                $(ELEMENT).each((i, element) => {
                    new Switch(element);
                });
            }
        }
    }
    Switch.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            Switch.instance();

        })
    });
})(jQuery); 
;
// checkbox-outline
(function ($) {
    "use strict";
    const TAG = 'CheckboxOutline'
    const ELEMENT = '.checkbox-outline';
    const INPUT_ELEMENT = 'input.checkbox-outline-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-outline-ripple';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxOutline {

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
            if (CheckboxOutline.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function (i, inputCheckbox) {
                    new CheckboxOutline(inputCheckbox)
                });
            }
        }
    }
    CheckboxOutline.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            CheckboxOutline.instance();
        })
    });
})(jQuery); 