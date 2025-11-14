
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



