// RadioButton
(function ($) {
    "use strict";
    const TAG = 'RadioGroup';
    const ELEMENT = '.radio-group';
    const RADIO_ITEM = '.radio-item';
    const RADIO_RIPPLE = 'button-ripple';
    const CHECKED = 'checked';
    const HOVER = 'hover';
    const ACTIVE = 'active';
    const INPUT_RADIO = 'input.radio-item-form-control[type="radio"]';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    /**
     * @param {number} ms
     * @param {function} cb
     */
    function timeOut(ms, cb) {
        return new Promise(resolve => setTimeout(resolve, ms)).then(cb);
    }

    class RadioGroup {

        constructor(inputRadio) {
            this.$element = $(ELEMENT);
            this.$listRadioButton = $(ELEMENT).find(RADIO_ITEM);

            const self = this;
            this.$inputRadio = $(inputRadio);
            this.$inputRadio.on('change', function (event) {

                if (event?.target?.checked) {

                    self.#clearCheked(event.target);
                    self.#addCheked($(event.target).closest(RADIO_ITEM).get(0))
                }
            });

            if (this.$inputRadio.is(':' + CHECKED)) {
                this.$inputRadio.trigger('change');
            }
        }

        /**
         * @param {ELEMENT} inputRadio
         */
        #clearCheked(inputRadio) {
            $(inputRadio).closest(ELEMENT).find(RADIO_ITEM).each(function (i, radio) {
                if ($(radio).hasClass(CHECKED)) {
                    $(radio).addClass(HOVER);
                    timeOut(300, () => {
                        $(radio).removeClass(HOVER);
                    })
                }
                $(radio).removeClass(CHECKED);
            });
            return this;
        }

        #addCheked(radioButton) {
            $(radioButton).addClass(CHECKED).addClass(RADIO_RIPPLE);
            delay(1000).then(() => $(radioButton).removeClass(RADIO_RIPPLE));
        }

        #handleRadioCheked(inputRadio) {
            this.$element.find(INPUT_RADIO).each(function (i, input) {
                input.checked = false;
            });
            inputRadio.checked = true;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (RadioGroup.validate()) {
                $(ELEMENT).find(INPUT_RADIO).each((i, element) => {
                    new RadioGroup(element);
                });
            }
        }
    }
    RadioGroup.instance();
    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            RadioGroup.instance();
        })
    });
})(jQuery); 