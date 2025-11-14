
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Owl Our Destinasi'
    const SELECTOR = '.owl-carousel.destinasi-travel-owl-carousel';


    class OwlDestinasi {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            this.$element.owlCarousel($element.data('options'));
            const options = this.$element.data('owl.carousel')
            this.options = options;
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (OwlDestinasi.#validate()) {
                new OwlDestinasi($(SELECTOR))
            }
        }
    }
    OwlDestinasi.instance();
}(jQuery));;
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Owl Our Clients'
    const SELECTOR = '.owl-carousel.hero-slider-owl-carousel';


    class HeroSlider {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            const options = $element.data('options')
            if (typeof options === 'object') {
                this.$element.owlCarousel(options);
                const optionsEl = this.$element.data('owl.carousel')
                this.options = optionsEl.options;
                this.#init();
                // this.#test();
            }

        }

        #init() {
            const $prev = this.$element.find('.owl-prev[type="button"]')
            const $next = this.$element.find('.owl-next[type="button"]')
            if ($prev.length === 1 && $next.length === 1) {
                $prev.attr({ 'aria-label': 'Previous slide' });
                $next.attr({ 'aria-label': 'Next slide' });
            }

            timeOut(2000, () => {
                this.$element.find('.owl-item .item-media').removeClass('reduced-motion-none').removeClass('none')
            })
        }


        #test() {
            timeOut(2000, () => {
                this.$element.trigger('stop.owl.autoplay')
            })
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (HeroSlider.#validate()) {
                new HeroSlider($(SELECTOR))
            }
        }
    }
    HeroSlider.instance();
}(jQuery));;
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Owl Our Clients'
    const SELECTOR = '.owl-carousel.client-kami-owl-carousel';


    class OwlOurClients {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            this.#addAriaLabel();

            const options = $element.data('options')
            if (typeof options === 'object') {
                this.$element.owlCarousel(options);
                const optionsEl = this.$element.data('owl.carousel')
                this.options = optionsEl.options;

            }

        }

        #addAriaLabel() {
            this.$element
                .on('initialize.owl.carousel', (event) => {
                    timeOut(1000, () => {
                        $('.owl-dot').each(function (index) {
                            $(this).attr('aria-label', 'Navigate to Slide ' + (index + 1));
                        });
                    })
                })
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (OwlOurClients.#validate()) {
                new OwlOurClients($(SELECTOR))
            }
        }
    }
    OwlOurClients.instance();
}(jQuery));;
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Review Customer'
    const SELECTOR = '.owl-carousel.review-customer-owl-carousel';


    class ReviewCustomer {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            this.$element.owlCarousel($element.data('options'));
            const options = this.$element.data('owl.carousel')
            this.options = options;
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (ReviewCustomer.#validate()) {
                new ReviewCustomer($(SELECTOR))
            }
        }
    }
    ReviewCustomer.instance();
}(jQuery));