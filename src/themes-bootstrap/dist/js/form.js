
(function ($) {
    "use strict";

    const SELECTTOR = 'form button[type="submit"][data-loader="true"]';
    const SELECTTOR_HREF = '[href][data-loader="true"]';

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    class Ui {
        static Loader() {
            return [
                '<div class="--loader">',
                '<div class="spinner">',
                '<div class="spinner-center"></div>',
                '</div>',
                '</div>'
            ].join('');
        }

        static LoaderBackdrop() {
            return [
                '<div class="--loader-backdrop"></div>'
            ].join('');
        }
    }

    class ButtonLoader {

        constructor(element) {
            this.$element = $(element);
            this.data = $(element).data();
            this.$form = $(element).closest('form');

            const self = this;
            this.$form.on('beforeSubmit', function (event) {
                event.preventDefault();
                $('body').append($(Ui.Loader()));
                if (!self.hasClosetModal()) {
                    $('body').append($(Ui.LoaderBackdrop()));
                }
            })
        }

        hasClosetModal() {
            return this.$form.closest('.modal.show').length > 0
        }

        static #validate() {
            return $(SELECTTOR).length > 0;
        }

        static instance() {
            if (ButtonLoader.#validate()) {
                delay(500).then(() => {
                    new ButtonLoader(SELECTTOR)
                })
            }
        }
    }
    ButtonLoader.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            ButtonLoader.instance();
        })
    });

    class LinkLoader {
        constructor(element) {
            this.$element = $(element);

            const self = this;
            this.$element.on('click', function (event) {
                self.#clear();
                $('body').append($(Ui.Loader()));
                $('body').append($(Ui.LoaderBackdrop()));
            })
        }

        #clear() {
            $('body').find('.--loader').remove()
            $('body').find('.--loader-backdrop').remove()
        }

        static #validate() {
            return $(SELECTTOR_HREF).length > 0;
        }

        static instance() {
            if (LinkLoader.#validate()) {
                delay(500).then(() => {
                    new LinkLoader(SELECTTOR_HREF)
                })
            }
        }
    }
    LinkLoader.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            LinkLoader.instance();
        })
    });

})(jQuery);



;// @ts-nocheck
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

})(jQuery); ;(function ($) {
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

})(jQuery); ;(function ($) {
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