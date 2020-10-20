// Т.к. это плагин - т.е.  метапрограммная штука, в этом конкретном случае создание new Validator происходит в html файле.

class Validator {
    constructor({selector, pattern, method}) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
    }

    init() {
        this.applyStyle();
        const elemsForm = [...this.form.elements].filter(el => el.id === 'form2-email' ||  el.id === 'form2-name');
        console.log(elemsForm)
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv)
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
        border: 2 px solid green
        };
        
        input.error {
        border: 2 px solid red
        };
        
        validator-error {
        font-size: 14px;
        color: red
        }
        `;
        document.head.appendChild(style);
    }
}