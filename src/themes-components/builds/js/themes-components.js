// google-maps
(function ($) {
    "use strict";
    const TAG = 'GoogleMaps'
    const ELEMENT = '.google-maps';

    /**
     * @template {google.maps.Size} TSize
     * @template {google.maps.InfoWindow} TInfoWindow
     * @template {google.maps.Map} TMap
     * @template {{lat:number,lng:number}} TLatLng
     * @template {{backgroundColor?: null | string, center?: TLatLng, clickableIcons?: null | boolean, controlSize?: null | number, disableDefaultUI?: null | boolean, disableDoubleClickZoom?: null | boolean, draggable?: null | boolean, draggableCursor?: null | string, draggingCursor?: null | string, fullscreenControl?: null | boolean, fullscreenControlOptions?: null | FullscreenControlOptions, gestureHandling?: null | string, heading?: null | number, isFractionalZoomEnabled?: null | boolean, keyboardShortcuts?: null | boolean, mapId?: null | string, mapTypeControl?: null | boolean, mapTypeControlOptions?: null | MapTypeControlOptions, mapTypeId?: null | string, maxZoom?: null | number, minZoom?: null | number, noClear?: null | boolean, panControl?: null | boolean, panControlOptions?: null | PanControlOptions, restriction?: null | MapRestriction, rotateControl?: null | boolean, rotateControlOptions?: null | RotateControlOptions, scaleControl?: null | boolean, scaleControlOptions?: null | ScaleControlOptions, scrollwheel?: null | boolean, streetView?: null | StreetViewPanorama, streetViewControl?: null | boolean, streetViewControlOptions?: null | StreetViewControlOptions, styles?: null | MapTypeStyle[], tilt?: null | number, zoom?: null | number, zoomControl?: null | boolean, zoomControlOptions?: null | ZoomControlOptions, }} TMapOtions
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const EVENTS = {
        BOUNDS_CHANGED: "bounds_changed",
        CENTER_CHANGED: "center_changed",
        CLICK: "click",
        CONTEXTMENU: "contextmenu",
        DBLCLICK: "dblclick",
        DRAG: "drag",
        DRAGEND: "dragend",
        DRAGSTART: "dragstart",
        HEADING_CHANGED: "heading_changed",
        IDLE: "idle",
        MAPTYPEID_CHANGED: "maptypeid_changed",
        MOUSEMOVE: "mousemove",
        MOUSEOUT: "mouseout",
        MOUSEOVER: "mouseover",
        PROJECTION_CHANGED: "projection_changed",
        RESIZE: "resize",
        RIGHTCLICK: "rightclick",
        TILESLOADED: "tilesloaded",
        TILT_CHANGED: "tilt_changed",
        ZOOM_CHANGED: "zoom_changed"
    }


    const SELECTOR = '#google-maps .google-maps-widget';

    /**
     * @type {TMapOtions} options
     */
    class GoogleMaps {

        /** @type {JQuery<SELECTOR>} */
        $element

        constructor(element) {

            this.$element = $(element);

            const data = this.$element.data();
            const options = this.$element.data('mapOption');
            const markerData = options?.marker
            const info = options?.info_window

            if (!options || typeof options !== 'object' || !markerData || !info || !options?.style_map) {
                return;
            }

            // console.log(options);
            this.$element.append([
                $('<div/>').addClass('map').attr('id', 'map').css(options.style_map)
            ])

            const map = new google.maps.Map(document.getElementById('map'), options)
            const markers = new google.maps.Marker({
                position: map.getCenter().toJSON(),
                map,
                title: options.name,
                icon: { url: markerData.icon, scaledSize: new google.maps.Size(50, 50) },
            });
            const infoWindow = new google.maps.InfoWindow(info);
            infoWindow.open({ anchor: markers, map });

            window.addEventListener('resize', function (event) {
                event.preventDefault();
                const width = this.outerWidth;
                if (width <= 768) {
                } else {
                }
            })

        }

        static validate() {
            return $(SELECTOR).length > 0 && typeof window['google'] === 'object';
        }

        static instance() {
            timeOut(500, () => {
                if (GoogleMaps.validate()) {
                    new GoogleMaps(SELECTOR)
                }
            })
        }
    }

    GoogleMaps.instance();

})(jQuery); 



//@ts-nocheck
(function ($) {
    "use strict";

    /**
     * @template {Twitter.Typeahead.ClassNames} TClassNames
     * @template {Twitter.Typeahead.Templates} TTemplates
     * @template {Twitter.Typeahead.Dataset} TDataset
     * @template {Twitter.Typeahead.Options} TOptions
     * @template {google.maps.places.AutocompleteService} TService
     * @template {google.maps.places.AutocompletePrediction} TAutocompletePrediction
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'AddressSearch'
    const SELECTOR = '.form-control.form-control-address-picker';

    class AddressSearch {

        /** @type {string} */
        display;

        /** @type {string} */
        name;

        /** @type {number} */
        limit = 7

        /** @type {(query:string,syncResults:<T>(results:T[]) => void) => void,asyncResults?: <T>(result: T[]) => void} */
        source;

        /** @type {TTemplates} */
        templates;

        /** @type {boolean} */
        async = true;

        /** @type {boolean} */
        highlight = true;

        /** @type {TClassNames} */
        classNames;

        /** @type {TOptions} */
        options = {};

        constructor(element) {
            this.element = $(element);
            this.#init();
        }

        #init() {
            this.display = "secondary_text";
            this.name = "address-search";
            this.source = this.#setSource
            this.templates = {
                suggestion: this.#templates().suggestion,
                notFound: this.#templates().empty
            }

            this.options = {
                highlight: false,
                hint: true,
            }

            const typeahead = this.element.typeahead(this.options, this);
            this.element.closest('.twitter-typeahead')
                .addClass('twitter-typeahead-address-search')
        }

        /**
         * @param {string} query
         * @param {(results:TAutocompletePrediction[]) => void} syncResults
         * @param {<T>(results:T[]) => void} asyncResults
         */
        #setSource(query, syncResults, asyncResults) {
            const options = { types: [], componentRestrictions: { country: 'ID' }, input: query }
            const service = new google.maps.places.AutocompleteService();

            service?.getPlacePredictions(options, (predictions, status) => {
                if (status === 'OK') {
                    let items = predictions.map(p => $.extend(p, { secondary_text: p.structured_formatting.secondary_text }));
                    syncResults(items.forEach(item => asyncResults([item])))
                    //console.log(this);
                }
            })
        }

        #templates() {
            return {
                suggestion: Handlebars.compile(
                    "<div>" +
                    "<div class='item-append'><i class='material-icons-outlined'>location_on</i></div>" +
                    "<div class='item-body'>" +
                    "<div class='item-body-title'>{{structured_formatting.main_text}}</div>" +
                    "<div class='item-body-desc'>{{structured_formatting.secondary_text}}</div>" +
                    "</div>" +
                    "<div class='item-prepend'><i class='material-icons-outlined'>north_west</i></div>" +
                    "</div>"
                ),
                empty: '<div class="empty-message">No results</div>',
            };
        }

        static #validate() {

            return $(SELECTOR).length > 0
                && typeof window['google'] === 'object'
                && typeof google?.maps?.places?.AutocompleteService === 'function'
                && typeof $.fn.typeahead === 'function'
                && typeof window['Handlebars'] === 'object';
        }

        static instance() {
            if (AddressSearch.#validate()) {
                $(SELECTOR).each((i, input) => {
                    new AddressSearch(input)
                })
            }
        }
    }

    timeOut(1000, () => {
        AddressSearch.instance();
    })
}(jQuery));

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

(function ($) {
    "use strict";

    /**
     * @template {import("infinite-scroll")} T
     * @template {import("infinite-scroll").Options} TOptions
     * @template {import("infinite-scroll").EventsMap} TEvent
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'InfiniteScroll'
    const SELECTOR = '.container-infinite-scroll';
    const infiniteStatus = 'infinite-load-status';

    /** @type {TEvent} */
    const EVENT = {
        append: "append.infiniteScroll",
        load: "load.infiniteScroll",
        request: "request.infiniteScroll",
        last: "last.infiniteScroll",
        error: "error.infiniteScroll",
        scrollThreshold: "scrollThreshold.infiniteScroll",

    }

    class InfiniteScroll {

        /** @type {JQuery<Element>} */
        element;

        /** @type {TOptions} */
        options = {};

        /** @type {T} */
        infinite;

        /**
         * @param {Element} element
         */
        constructor(element) {

            this.options = {
                elementScroll: true,
                status: '.infinite-load-status',
                hideNav: '.pagination',
                scrollThreshold: 200,
                path: '.page-item.next a.page-link',
                append: '.card-listing-post',
                history: true,
            }

            const options = this.options;
            const self = this;
            if (typeof options === 'object' && $(options.path).length > 0 && $(options.hideNav).length > 0) {

                this.element = $(element).infiniteScroll(options)
                this.infinite = this.element.data('infiniteScroll');

                $(document).on('scroll', (event) => {
                    event.preventDefault();
                    const scrollTop = $(event.target).scrollTop();
                    const outerHeight = self.element.outerHeight();
                    const top = self.element.offset().top;

                    if (outerHeight < scrollTop) {
                        self.infinite.loadNextPage();
                    }
                })

                this.element
                    .on(EVENT.append, (event, body, path, items, response) => {
                        timeOut(2500, () => {
                            self.backdrop().hide()
                            $('body').find(`.${infiniteStatus}`)?.remove();
                        })
                    })
                    .on(EVENT.load, (event, body, path, response) => {
                    })
                    .on(EVENT.request, (event, path, fetchPromise) => {
                        $('body').append(self.#scrollerStatus())
                        self.backdrop().show()
                    })
                    .on(EVENT.last, (event) => {
                        timeOut(2500, () => {
                            const last = $('<div/>').addClass('text-center bold text-success f20').text('End of content')
                            self.element.append(last)
                        })
                    })
            }

            // Test
        }

        backdrop() {
            const backdrop = $('<div />').addClass('backdrop-infinite-scroll fade show')
            const self = this;
            return {
                show: () => {
                    this.backdrop().hide();
                    $('body').append(backdrop)
                },
                hide: () => {
                    $('body').find('.backdrop-infinite-scroll')?.remove()
                }
            }
        }

        #scrollerStatus() {
            let scroller = [
                `<div class="${infiniteStatus}">`,
                `<div class="infinite-loader-spinner infinite-scroll-request">`,
                `<div class="spinner-container">`,
                `<div class="spinner-center"></div>`,
                `</div>`,
                `</div>`,
                `<div class="infinite-scroll-last"></div>`,
                `<div class="infinite-scroll-error"></div>`,
                `</div>`,
            ].join('');
            return $(scroller)
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof window['InfiniteScroll'] === 'function';
        }

        static instance() {
            if (InfiniteScroll.#validate()) {
                $(SELECTOR).each((i, element) => {
                    new InfiniteScroll(element)
                })
            }
        }
    }
    InfiniteScroll.instance();
}(jQuery));

(function ($) {
    "use strict";

    /**
     * @template {TempusDominus} T
     * @template {import("tempus-dominus/display/index").default} TDisplay
     * @template {import("tempus-dominus/utilities/optionsStore")} TOptionsStore
     * @template {TempusDominus.TempusDominus} TTempusDominus
     * @template {TempusDominus.Unit} TUnit
     * @template {TempusDominus.DateTime} TDateTime
     * @template {TempusDominus.Options} TOptions
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'DateTimePicker'
    const SELECTOR = '.form-control.form-control-date-time-picker';
    const CONTAINER_PICKER = '.container-date-time-picker';
    const INPUT_GROUP = '.input-group';

    const EVENT = {
        show: "show.td",
        hide: "hide.td",
        change: "change.td",
        update: "update.td",
    }

    /** @type {TempusDominus.Options} */
    const optionsDefauld = {
        restrictions: {
            minDate: moment()._d
        },
        display: {
            theme: 'light',
            components: {
                date: true, month: false, year: false, decades: false, clock: true, hours: true,
                minutes: true, seconds: false, useTwentyfourHour: true
            }
        },

        localization: { locale: 'id' }
    }


    class OptionsPicker {
    }

    class ButtonClose {

        /** @type {TTempusDominus} */
        tempusDominus;

        /** @type {string} variable */
        btnClose = 'btn-close'

        /** @type {JQuery<Element>} */
        toolbar

        /**
         * @param {TTempusDominus} tempus
         */
        constructor(tempus) {
            if (tempus && typeof tempus === 'object' && tempus?.display?.widget) {
                const widget = $(tempus?.display?.widget)?.length > 0 ? $(tempus?.display?.widget) : false;
                const toolbar = widget && widget?.find('.toolbar').length > 0 ? widget?.find('.toolbar') : false;

                if (toolbar && toolbar.find(`.${this.btnClose}`).length === 0) {
                    this.tempusDominus = tempus;
                    this.toolbar = toolbar;

                    toolbar.append(this.#getHtml())
                }
            }
        }

        /**
         * @return {JQuery<Element>}
         */
        #getHtml() {
            const self = this;
            const btnClose = $('<div/>')
                .attr({ 'data-action': 'closePicker', title: 'Close Picker' })
                .addClass(`${this.btnClose}`)
                .append([
                    $('<span/>').addClass('btn-close-title bold text-danger ripple-effect').text('Close')
                ])

            btnClose.on('click', (event) => {
                event.preventDefault();
                self.tempusDominus.hide();
            });

            return btnClose;
        }

        /**
         * @param {TTempusDominus} tempus
         * @return {void}
         */
        static instance(tempus) {
            new ButtonClose(tempus)
        }
    }

    class DateTimePicker {

        /** @type {JQuery<Element>} */
        element;

        /** @type {TOptions} */
        options;

        /** @type {TTempusDominus}  */
        tempusDominus;

        /** @type {string} */
        styleWidgetOld;

        /** @type {TDisplay} */
        display;

        /**
         * @param {Element} element
         */
        constructor(element) {

            this.element = $(element);
            const inputGroup = this.element?.closest(INPUT_GROUP)
            if (inputGroup?.length > 0) {
                if (inputGroup.find(CONTAINER_PICKER).length === 0) {
                    inputGroup.append([
                        $('<div/>').addClass(CONTAINER_PICKER.slice(1))
                            .css({
                                position: "absolute",
                                top: '52px',
                            })
                    ])
                }
            }

            var data = this.element.data();
            data = $.extend(data, {
                container: $(CONTAINER_PICKER).get(0)
            })

            this.options = $.extend(optionsDefauld, data)

            this.element.val(moment().add(1, 'hour').format('YYYY-MM-DD HH:mm'))
            this.element.closest('.textfield')?.addClass('textfield-floating-label-completed');

            this.tempusDominus = new tempusDominus.TempusDominus(element, this.options);
            this.display = this.tempusDominus.display;

            const self = this;
            const tempus = this.tempusDominus;

            tempus.dates.formatInput = (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm')
            }

            this.#events();
        }

        #events() {
            const self = this;
            const tempus = this.tempusDominus;

            $(tempus._toggle)
                .on(EVENT.show, (event) => {
                    var currentView = self.display.optionsStore.currentView;

                    $(self.display.widget).addClass('bootstrap')

                    if (currentView !== 'calendar') {
                        const togglePicker = $('[data-action="togglePicker"]');
                        togglePicker.trigger('click')
                    }

                })
                .on(EVENT.hide, (event) => {
                })
                .on(EVENT.update, (event) => {
                    ButtonClose.instance(tempus);
                })
        }


        static #validate() {
            return $(SELECTOR).length > 0
                && typeof moment === 'function'
                && typeof window['tempusDominus'] === 'object';
        }

        static instance() {
            if (DateTimePicker.#validate()) {

                $(SELECTOR).each((i, input) => {
                })
            }
        }
    }


}(jQuery));