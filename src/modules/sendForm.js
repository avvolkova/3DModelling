export default function sendForm() {
    const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся';
    const forms = document.querySelectorAll('form')
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
    font-size: 5 rem;
    `;


    forms.forEach(form => form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const target = evt.target;

        if (target.matches('#form3')) {
            let popup = document.querySelector('.popup');
            popup.style.display = 'none';
        }

        target.appendChild(statusMessage);



        const formData = new FormData(form)
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        })

        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Status not 200')
                }
                statusMessage.textContent = successMessage;
            })
            .catch(error => {
                console.error(error)
            })

        const inputs = target.querySelectorAll('input');
        inputs.forEach(function (inp) {
            inp.value = ''
        })

    }))


    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

    }

}