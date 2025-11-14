// @ts-nocheck

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


