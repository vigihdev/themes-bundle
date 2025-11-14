
// checkbox-circle
(function ($) {
    "use strict";
    const TAG = 'CheckboxCircle'
    const ELEMENT = '.checkbox-circle';
    const INPUT_ELEMENT = 'input.checkbox-circle-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-circle-ripple';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxCircle {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if (e.target.checked) {
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                this.$inputCheckbox.closest(ELEMENT).addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                delay(1000).then(() => this.$inputCheckbox.closest(ELEMENT).removeClass(CHECKBOX_RIPPLE));
            }

        }

        #controlLabel() {
            $(ELEMENT).on('click', 'label', function (e) {
                console.log(e);
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (CheckboxCircle.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function (i, inputCheckbox) {
                    new CheckboxCircle(inputCheckbox)
                });
            }
        }
    }
    CheckboxCircle.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            CheckboxCircle.instance();
        })
    });
})(jQuery); ;
// chebox-switch
(function ($) {
    "use strict";
    const ELEMENT = '.checkbox-switch'
    const INPUT_ELEMENT = 'input.checkbox-switch-form-control[type="checkbox"]';
    const SWITCH_RIPPLE = 'switch-ripple';
    const CHECKED = 'checked';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class Switch {

        constructor(element) {
            this.$element = $(element);
            this.$inputCheckbox = $(element).find(INPUT_ELEMENT);

            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                self.addRipple(context);
                self.switchCollapseShow(e.target.checked);

                if (e.target.checked) {
                    context.addClass(CHECKED);
                }
                else {
                    context.removeClass(CHECKED)
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                const context = this.$inputCheckbox.closest(ELEMENT);
                context.addClass(CHECKED);
                self.addRipple(context);
                this.switchCollapseShow(true);
            }
        }

        addRipple(context) {
            context.addClass(SWITCH_RIPPLE);
            delay(1000).then(() => context.removeClass(SWITCH_RIPPLE))
        }

        switchCollapseShow(bools) {
            if (this.#validateCollapse()) {
                delay(500).then(() => {
                    $(this.$inputCheckbox.data('target')).collapse((bools ? 'show' : 'hide'))
                })
            }
        }

        #validateCollapse() {
            let validate = Object.keys(this.$inputCheckbox.data()).filter(v => ['target', 'toggle'].includes(v)).length === 2;
            return validate && this.$inputCheckbox.data('toggle') === 'collapse' && $(this.$inputCheckbox.data('target')).length > 0;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (Switch.validate()) {
                $(ELEMENT).each((i, element) => {
                    new Switch(element);
                });
            }
        }
    }
    Switch.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            Switch.instance();

        })
    });
})(jQuery); 
;
// checkbox-outline
(function ($) {
    "use strict";
    const TAG = 'CheckboxOutline'
    const ELEMENT = '.checkbox-outline';
    const INPUT_ELEMENT = 'input.checkbox-outline-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-outline-ripple';

    function delay(ms) {
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxOutline {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if (e.target.checked) {
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if (this.$inputCheckbox.is(':' + CHECKED)) {
                this.$inputCheckbox.closest(ELEMENT).addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                delay(1000).then(() => this.$inputCheckbox.closest(ELEMENT).removeClass(CHECKBOX_RIPPLE));
            }

        }

        #controlLabel() {
            $(ELEMENT).on('click', 'label', function (e) {
                console.log(e);
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (CheckboxOutline.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function (i, inputCheckbox) {
                    new CheckboxOutline(inputCheckbox)
                });
            }
        }
    }
    CheckboxOutline.instance();

    $(document).on('show.bs.modal', function (event) {
        delay(500).then(() => {
            CheckboxOutline.instance();
        })
    });
})(jQuery); 

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