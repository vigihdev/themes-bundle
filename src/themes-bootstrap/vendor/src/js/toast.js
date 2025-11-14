(function ($) {
    'use strict';

    const TAG = 'Toast';
    const ELEMENT = '.toast';

    class Toast extends bootstrap.Toast {

        /** @type {JQuery<ELEMENT>} */
        $element;

        constructor(element) {
            super(element, $(element).data())
            this.$element = $(element);
            this.show();

            this.$element.on('hide.bs.toast', function (event) {
                $(event.target).remove()
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {

            if (Toast.validate()) {
                $(ELEMENT).each((i, element) => {
                    new Toast(element)
                });
            }
        }
    }
    Toast.instance();
})(jQuery);