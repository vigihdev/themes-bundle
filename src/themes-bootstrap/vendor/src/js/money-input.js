(function ($) {

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

