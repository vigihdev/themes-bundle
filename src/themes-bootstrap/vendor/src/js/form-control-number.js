(function ($) {

    "use strict";

    const TAG = 'FormControlKodeToken';
    const ELEMENT = $('input.form-control-number');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    class FormControlNumber {

        constructor(element) {
            this.$element = $(element);
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (FormControlNumber.validate()) {
            }
        }
    }

    FormControlNumber.instance();

    $(document).on('show.bs.modal', function (event) {

    });
})(jQuery);

