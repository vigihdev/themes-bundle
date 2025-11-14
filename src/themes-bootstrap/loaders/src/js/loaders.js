(function ($) {
    'use strict';

    const TAG = 'LoaderSpinner';
    const TIME_OUT = 2500;
    const ELEMENT = '.loader-spinner';
    const BACKDROP = '.backdrop-loader-spinner';
    const ATTRIBUTE = '[loader-spinner="true"]';

    /**
    * @param {CallableFunction} callback
    * @param {number} ms
    * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const SpinnerHtml = '' +
        '<div class="loader-spinner">' +
        '    <div class="spinner-container">' +
        '        <div class="spinner-center"></div>' +
        '    </div>' +
        '</div>';

    const SpinnerBackdrop = `<div class="backdrop-loader-spinner"></div>`;

    class LoaderSpinner {

        constructor() {

            const self = this;
            $('body').find('[loader-spinner]')?.each((i, element) => {
                $(element).on('click', function (event) {
                    self.show();
                })
            });
        }

        /**
         * @returns {void}
         */
        show() {
            $('body').append($(SpinnerHtml));
            $('body').append($(SpinnerBackdrop));

            timeOut(TIME_OUT, () => {
                this.hide()
            })
        }

        /**
         * @returns {void}
         */
        hide() {
            $('body').find(BACKDROP)?.remove();
            $('body').find(ELEMENT)?.remove();
        }

        /**
         * @returns {boolean}
         */
        static validate() {
            return $(ATTRIBUTE).length > 0;
        }

        /**
         * @returns {void}
         */
        static instance() {
            if (LoaderSpinner.validate()) {
                const self = new LoaderSpinner();
            }
        }
    }

    LoaderSpinner.instance();
})(jQuery);