export default class FormValidation {
    form = '[data-form]';
    formInput = '[data-input-required]';
    formMsgError = '[data-msg-error]';
    formInputError = '[data-input-error]';
    formInputPlaceholder = '[data-input-placeholder]';
    termsInput = '[data-input-required-terms]';

    emptyMsg = {
        default: {
            ru: 'Заполните поле!',
            en: 'Fill in the field'
        },
        footerMsg: {
            ru: 'Не заполнены обязательные поля',
            en: 'Required fields are not filled in'
        },
        file: {
            ru: 'Укажите файл',
            en: 'Specify a file'
        },
    };

    invalidMsg = {
        default: {
            ru: 'Неверный формат',
            en: 'Wrong format'
        },
        password: {
            ru: 'Не совпадают',
            en: 'Do not match'
        }
    };



    constructor() {
        this.events();
    }

    formTermsInput () {
        return this.termsInput.substring(1,this.termsInput.length - 1)
    }

    formInputSelector () {
        return this.formInput.substring(1,this.formInput.length - 1)
    }

    formInputPlaceholderSelector () {
        return this.formInputPlaceholder.substring(1,this.formInputPlaceholder.length - 1)
    }

    events () {
        var self = this;

        $(document).on('submit', this.form, function () {
            self.validate($(this));

            return false;
        });

        $(this.formInput).on('focus click', function () {
            $(this).attr('placeholder', $(this).attr(self.formInputPlaceholderSelector()))
        });
    }

    validate ($form) {
        var self = this;
        var $inputs = $form.find(this.formInput);
        var valid = [];

        $inputs.each(function () {
            let type = $(this).attr(self.formInputSelector()) || 'text';
            let val = $(this).val();

            let formBlock = $(this).closest('.form-block');
            let errorMsg = $(this).attr('data-input-error') || null;

            $(this).removeClass('invalid');
            formBlock.find('.form-block__error').empty();

            if (!val.length) {
                valid.push(self.invalid($(this), errorMsg));
            } else {
                switch (type) {

                    case 'email':
                        valid.push(self.validateEmail(val)
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                    case 'phone':
                        valid.push(self.validatePhone(val)
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                    case 'checkbox':
                        valid.push(self.validateCheckbox($(this))
                            ? self.valid($(this))
                            : self.invalid($(this))
                        );

                        break;
                    case 'password':
                        valid.push(self.validatePassword($(this))
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.password)
                        );

                        break;
                    default:
                        valid.push(self.validateText($(this))
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                }
            }
        });

        var validCount = 0;

        valid.forEach(function (item) {
            item ? validCount++ : null
        });

        if (valid.length === validCount) {
            $form.trigger('form::valid');
        }
        return valid.length === validCount;
    }


    validateEmail (email) {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePhone (phone) {
        var cleanPhone = phone.replace(/\s/g, "");
        var re = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s]?[(]?[0-9]{1,3}[)]?([-\s]?[0-9]{3})([-\s]?[0-9]{3,4})/g;
        return re.test(cleanPhone);
    }

    validateCheckbox ($elem) {
        return $elem.prop('checked')
    }

    validatePassword ($elem) {
        var $elems = $elem.closest('form').find('[data-input-required="password"]');
        var passValues = [];

        $elems.each(function () {
            passValues.push($(this).val());
        });

        return passValues[0] === passValues[1];
    }

    validateText ($elem) {
        return !!($elem.val().length);
    }

    invalid (elem, errorMessage) {
        let message = errorMessage || this.emptyMsg.default[App.lang];

        elem.removeClass('valid').addClass('invalid');
        elem.attr('placeholder', message);

        if(message === this.emptyMsg.default[App.lang]) {
            message = this.emptyMsg.footerMsg[App.lang];
            $(this.formMsgError).empty().append('span').text(message);
        }

        return false;
    }
    
    valid(elem) {
        elem.removeClass('invalid').addClass('valid');

        return true;
    }
}