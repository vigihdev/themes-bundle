
(function ($) {
    'use strict';

    const TAG = 'InputPatern';

    /**
    * @param {CallableFunction} callback
    * @param {number} ms
    * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class Counter {
        constructor() { }

    }

    class Numbers {
        constructor() { }
    }

    class Alphabets {

        constructor() {

            const self = this;
            $('body').find('.pattern-alphabets')?.each((i, input) => {
                // ['keypress', 'keydown', 'keyup', 'blur', 'beforeinput'].forEach(trigger => {
                // })
                // input.addEventListener('beforeinput', (event) => self.#onBeforeinput(event))
            })
        }

        /**
        * @param {JQuery.Event & {target:Element} & EventListener} event
        */
        #onBeforeinput(event) {
            var key = event.key;
            var data = event.data;
            var target = event.target;
            if (!/[a-z-A-Z]+/.test(data)) {
            }
        }

        /**
         * @param {JQuery.Event} event
         */
        #onKeypress(event) {
            var key = event.key;
            return false;

            // return ((key >= 65 && key <= 90) || key == 8);
        }
    }

    class InputPatern {

        constructor() {
            const alphabets = new Alphabets()
        }

        static validate() {
            return true;
        }

        static instance() {

            if (InputPatern.validate()) {
                new InputPatern()
            }
        }
    }

    InputPatern.instance();
    $(document).on('show.bs.modal', function (event) {
        timeOut(700, () => InputPatern.instance())
    });

})(jQuery);