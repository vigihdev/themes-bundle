(function ($) {
    "use strict";

    const TAG = 'ClearedInput';
    const SELECTOR = '.cleared-input';

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class ClearedInput {

        /** @type {JQuery<Element>} */
        element;

        /** @type {JQuery<Element>} */
        wrapper;

        /** @type {JQuery<Element>} */
        inputText;

        /** @type {JQuery<Element>} */
        typeahead;

        /**
         * @param {Element} element
         */
        constructor(element) {
            this.element = $(element)

            this.element.hide('slow');
            this.wrapper = this.element.parent()
            const self = this;
            if (this.wrapper && this.wrapper.length > 0) {
                const input = this.wrapper.find('input[type="text"][name]')
                if (input.length > 0) {
                    this.inputText = input;
                    this.typeahead = input.closest('.twitter-typeahead')
                    input.on('change', () => self.#init())
                    input.on('focus', () => self.#init())
                    this.#init();
                }
            }
        }

        #init() {
            if (this.inputText && this.inputText.val().length > 0) {
                this.#show();
            }
        }

        #show() {
            this.element.show('slow')
            this.element.on('click', (event) => this.#hide())
        }

        #hide() {
            this.element.hide('slow')
            this.inputText.val('')

            if (this.typeahead && this.typeahead.length > 0) {
                this.inputText.typeahead('val', '')
            }

            timeOut(500, () => {
                this.inputText.get(0).focus();
            })
        }

        static #validate() {
            return $(SELECTOR).length > 0;
        }

        static instance() {
            if (ClearedInput.#validate()) {
                $(SELECTOR).each((i, selector) => {
                    new ClearedInput(selector);
                })
            }
        }
    }

    ClearedInput.instance();
})(jQuery);


;(function ($) {

    "use strict";

    const TAG = 'FormControlKodeToken';
    const INPUT_KODE = 'input.form-control-kode-token';
    const INPUT_GROUP = '.input-group-kode-token';
    const EVENT_COMPLETE = 'kode.complete'

    /**
    * @param {CallableFunction} callback
    * @param {number} ms
    * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class FormControlKodeToken {

        /** @type {Array<Element>} */
        itemInputKode = [];

        /**
         * @param {Element} element
         */
        constructor(element) {
            this.$element = $(element);
            $(element).find(INPUT_KODE)?.each((i, input) => this.itemInputKode.push(input));

            const self = this;
            this.itemInputKode.forEach(input => {
                input.addEventListener('keydown', (event) => self.#onKeydown(event));
            })

            if (this.#getFirstInput().val().length === 0) {
                timeOut(1000, () => this.#getFirstInput().get(0).focus())
            }

            $(INPUT_GROUP).on(EVENT_COMPLETE, (event, data) => {
            })

            $(INPUT_GROUP).get(0).addEventListener(EVENT_COMPLETE, (event) => {
            })
        }

        #onKeydown(event) {
            timeOut(200, () => {
                const input = $(event.target)
                if (input.val().length > 0) {
                    const prefix = this.#getIndexInput(event.target) ? this.#getIndexInput(event.target) + 1 : undefined;
                    const inputPrev = prefix && $(`.index-${prefix}`).length > 0 ? $(`.index-${prefix}`) : undefined;

                    if (inputPrev) {
                        inputPrev.get(0).focus()
                    }

                    timeOut(200, () => this.#onCompleteListener())
                }
            })
        }

        #onCompleteListener() {
            let results = [];
            this.itemInputKode.forEach(input => {
                if ($(input).val().length > 0) {
                    results.push($(input).val())
                }
            })

            if (results.length === this.itemInputKode.length) {

                const event = new CustomEvent(EVENT_COMPLETE, { detail: results.join('') });
                $(INPUT_GROUP).get(0).dispatchEvent(event)

                $(INPUT_GROUP).trigger({ type: EVENT_COMPLETE }, [results.join('')])
            }

        }

        /**
         * @param {Element} input
         * @returns {number|undefined}
         */
        #getIndexInput(input) {
            let index = $(input).attr('class')?.match(/index-[0-9]+/)?.[0]?.replace('index-', '')
            return index && typeof parseInt(index) === "number" ? parseInt(index) : undefined;
        }

        /**
         * @returns {JQuery<Element>}
         */
        #getFirstInput() {
            return $(this.itemInputKode?.slice(0, 1)?.pop())
        }

        static validate() {
            return $(INPUT_GROUP).length > 0 && $(INPUT_GROUP).find(INPUT_KODE).length > 0;
        }

        static instance() {

            if (FormControlKodeToken.validate()) {
                new FormControlKodeToken($(INPUT_GROUP).get(0))
            }
        }
    }

    FormControlKodeToken.instance();

    $(document).on('show.bs.modal', function (event) {
        timeOut(1000, () => FormControlKodeToken.instance())
    });
})(jQuery);

;(function ($) {

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

;
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

})(jQuery);;// @ts-nocheck

(function ($) {
	"use strict";

	const TAG = 'Modal';
	const ELEMENT_MODAL = '#modal-fixed-bottom';
	const SELECTOR = '[data-modal-id="' + ELEMENT_MODAL.replace('#', '') + '"]';
	const ELEMENT_TOGGLE_MODAL = '[data-bs-toggle="modal"][data-bs-target]'
	const ELEMENT_MODAL_FIXED_BOTTOM = '[data-modal-id="modal-fixed-bottom"][data-url]'

	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	class Options {
		modalId; target; title; toggle; url;
		constructor(option) {
			Object.assign(this, option);
		}
	}

	class Modal {

		/** @type {JQuery<Element>} */
		#elementModal

		constructor(elementModal) {
			this.#elementModal = $(elementModal);
		}

		get modal() {
			return this.#elementModal
		}

		get modalDialog() {
			return this.#elementModal.find('.modal-dialog')
		}

		get modalHeader() {
			return this.#elementModal.find('.modal-header')
		}

		get modalBody() {
			return this.#elementModal.find('.modal-body')
		}

		get modalFooter() {
			return this.#elementModal.find('.modal-footer')
		}

		/** @param {string} title */
		setTitle(title) {
			this.modalHeader.find('.header-title').remove();
			this.modalHeader.prepend($('<div class="header-title" />').text(title));
			return this;
		}

		setHeaderIcon(iconName) {
			const element = $(`<div class="header-icon"><i class="material-icons-outlined">${iconName}</i></div>`)
			this.modalHeader.find('.header-icon').remove();
			this.modalHeader.prepend(element);
			return this;
		}

		clearBody() {
			const self = this;
			this.modal.on('hidden.bs.modal', function (event) {
				self.modalBody.empty()
			})
		}

	}

	class ModalToggle extends Modal {

		constructor(element) {
			const bsTarget = $(element).data('bsTarget') ? $($(element).data('bsTarget')) : undefined;

			if (bsTarget && typeof bsTarget === 'object' && bsTarget.length > 0) {
				const $modal = $($(element).data('bsTarget'));

				super($modal.get(0))

				$(element).on('click', function (event) {
					event.preventDefault();
					$modal.modal('show')
				})
			}
		}

		static instance() {
			$(ELEMENT_TOGGLE_MODAL).each((i, element) => {
				new ModalToggle(element)
			})
		}
	}

	/** @template {{modalId:string,title:string,url:string,headerIcon?:string,header?:boolean,backdrop?:string}} Options */
	class ModalFixedBottom extends Modal {

		/** @type {Options} */
		options;

		constructor(element) {

			/** @type {Options} */
			const options = $(element).data();

			if (options && typeof options?.modalId === 'string' && typeof options?.url === 'string') {
				const $modal = $(`#${options.modalId}`)?.length > 0 ? $(`#${options.modalId}`) : undefined;

				if ($modal) {
					super($modal.get(0));
					this.options = options;
					const self = this;

					self.#getOptionHeader();
					self.#getOptionBackdrop();
					$(element).on('click', function (event) {
						event.preventDefault();

						self.modalBody.load(options.url)
						self.modal.modal('show')
					})
				}
			}
		}

		#getOptionBackdrop() {
			const backdrop = this.options?.backdrop;
			if (backdrop && backdrop === 'static') {
				this.modal.attr({ 'data-backdrop': 'static' })
			}
		}

		#getOptionHeader() {
			const header = this.options?.header;
			const headerIcon = this.options?.headerIcon;
			const title = this.options?.title;

			if (typeof header === 'boolean' && !header) {
				this.modalHeader.hide()
			} else {

				if (title) {
					this.setTitle(title).clearBody()
				}

				if (headerIcon) {
					this.setHeaderIcon(headerIcon)
				}
			}
		}

		static instance() {
			$(ELEMENT_MODAL_FIXED_BOTTOM).each((i, element) => {
				new ModalFixedBottom(element)
			})
		}
	}


	ModalToggle.instance();
	ModalFixedBottom.instance();
})(jQuery);


;(function ($) {

    "use strict";

    const TAG = 'MoneyInput';
    const SELECTOR = 'input.form-control.money-input';
    const ELEMENT = $('input.form-control.money-input');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    Number.prototype.numberFormat = function (decimals, dec_point, thousands_sep) {
        dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
        thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

        var parts = this.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

        return parts.join(dec_point);
    }

    class MoneyInput{
        constructor(element) {
            this.$element = $(element);
            this.$textfield = $(element).closest('.textfield');
            this.$inputTarget = this.$textfield.find('input[id][type="hidden"]')

            const self = this;
            this.$element
            .on('change',function(event){
                delay(500).then(() => {
                    self.$element.val( self.#getValue().numberFormat(0,'.','.') )
                    self.$inputTarget.val(self.#getValue());

                })
            })
            .on('keydown',function(event){
                delay(500).then(() => {
                    self.$element.val( self.#getValue().numberFormat(0,'.','.') )
                    self.$inputTarget.val(self.#getValue());
                })

            })

            delay(500).then(() => {
                if(this.$element.val().length > 0){
                    this.$element.trigger('change')

                }
            })

            var number = new Intl.NumberFormat();
        }

        #getValue(){
            let value = this.$element.val().replace(/[^0-9]/g,'');
            return isNaN(parseInt(value)) ? 0 : parseInt(value);
        }

        static validate() {
            return $(ELEMENT).length > 0 && $(ELEMENT).closest('.textfield').length > 0;
        }

        static instance() {
            if (MoneyInput.validate()) {
                $(ELEMENT).each(function(i,element){
                    new MoneyInput(element)
                })
            }
        }
    }

    MoneyInput.instance();

    $(document).on('show.bs.modal',function(event){
        delay(500).then(() => {
            let $element = $(event.target).find('.modal-body');
            $element.find(SELECTOR).each(function(i,element){
                new MoneyInput(element);
            });
        });
    });
})(jQuery);

;;(function ($) {
    'use strict';

var TAG = 'PasswordVisibility';
const VISIBILITY = 'visibility';
const VISIBILITY_OFF = 'visibility_off';
const INPUT_PASSWORD = 'input.form-control[type="password"]';

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

class PasswordVisibility{

    constructor(element){
        this.$element = $(element);
        const self = this;
        const icon = $(element).find('.input-group-append .material-icons').text();
        $(element).find('.input-group-append .input-group-text').addClass('ripple-effect');

        $(element).find('.input-group-append').addClass('ripple-effect').on('click',function(e){
            if($(this).find('.material-icons').text() === VISIBILITY){
                self.#runVisibility();
                return;
            }

            if($(this).find('.material-icons').text() === VISIBILITY_OFF){
                self.#runVisibilityOff();
            }
        });

    }

    #runVisibility(){
        this.$element.find('input[id]').attr({type:'text'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY_OFF);
    }

    #runVisibilityOff(){
        this.$element.find('input[id]').attr({type:'password'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY);
    }

	static validate(){
		return $(INPUT_PASSWORD).length > 0;
	}

	static instance(){
		if (PasswordVisibility.validate()) {
            $(INPUT_PASSWORD).each((i,element) => {
                const $append = $(element).closest('.input-group').find('.input-group-append');
                if($append.length > 0){
                    if($append.find('.material-icons').length > 0 ){
                        new PasswordVisibility( $(element).closest('.input-group').get(0) )
                    }
                }
            });
		}
	}
}
PasswordVisibility.instance();

$(document).on('show.bs.modal',function(event){
    delay(300).then(() => {
        PasswordVisibility.instance();
    });
});
})(jQuery);;(function($, window, document) {
	'use strict';

	var Selector = {
        PARENT_SELECTOR: '',
        RIPPLE_EFFECT: ".ripple-effect",
        INK: '.ink'
    };
    
	var ClassName = {
        ANIMATE: "animate"
    };
    
	var Event = {
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
    };
    
	var Template = {
        SPAN: "<span class='ink'></span>"
    };

	/**
	 * ------------------------------------------------------------------------
	 * Functions
	 * ------------------------------------------------------------------------
	 */

	function onMouseDown(e) {
		var rippler = $(e.target);
		$(Selector.INK).remove();
		// create .ink element if it doesn't exist
		if (rippler.find(Selector.INK).length === 0) {
			rippler.append(Template.SPAN);
		}
		var ink = rippler.find(Selector.INK);
		// prevent quick double clicks
		ink.removeClass(ClassName.ANIMATE);
		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}

		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;

		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass(ClassName.ANIMATE);

		setTimeout(function () {
			ink.remove();
		}, 1500);
	}

	$(document).on(Event.MOUSEDOWN+" "+Event.TOUCHSTART, Selector.RIPPLE_EFFECT,onMouseDown);
})(jQuery, window, document);;// @ts-nocheck

(function ($) {
    "use strict";

    var TAG = 'RouteMapOrder';
    class RouteMapOrder {
        constructor(){}

        static instance() {
            const origin = $('.origin-item-dotted-inner')
            if(origin.length > 0){
                origin.css({
                    height: (origin.closest('.origin-group').outerHeight() + 10) + 'px'
                })
            }
        }
    }

    RouteMapOrder.instance();
})(jQuery);


;(function ($) {
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