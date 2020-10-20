'use strict';

window.addEventListener('DOMContentLoaded', function () {

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours');
        const timerMinutes = document.querySelector('#timer-minutes');
        const timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime(); // чтобы посчитать миллисекунды
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);

            return {
                'timeRemaining': timeRemaining,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            }

            // return {hours, minutes, seconds} - деструктуризация
        }


        function addZero(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return n
            }
        }

        function updateTimer() {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            if (timer.timeRemaining > 0) {
                // setTimeout(updateTimer, 1000)

            } else {
                timerHours.textContent = addZero(0);
                timerMinutes.textContent = addZero(0);
                timerSeconds.textContent = addZero(0);
            }
        }

        setInterval(updateTimer, 1000);

    }

    countTimer('2020-09-27 13:23:00');
});

// Меню

const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu');
    const menuBlock = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menuBlock.querySelectorAll('ul>li');


    const handlerMenu = () => {
        menuBlock.classList.toggle('active-menu')
    };
    menuBtn.addEventListener('click', handlerMenu);

    menuBlock.addEventListener('click', (evt) => {
        let target = evt.target;
        if (target.matches('a')) {
            handlerMenu();
        }
    })
};

toggleMenu();

// Pop-up

const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');

    popUpBtn.forEach(item => item.addEventListener('click', () => {
        setTimeout(popUpAnimate, 20);

        popUp.style.display = 'block';
    }));

    const popUpAnimate = () => {
        popUp.children[0].style.transition = '1s';
        popUp.children[0].style.transform = 'scale(1)'
    };

    const closePopUp = () => {
        popUp.style.display = 'none';
        popUp.children[0].style.transform = 'scale(0)'
    };

    popUp.addEventListener('click', (evt => {
        let target = evt.target;

        target = target.closest('.popup-content');
        if (!target || evt.target.matches('.popup-close')) {
            closePopUp();
        }
    }))
};


togglePopUp();

// плавная прокрутка

const scroll = () => {
    const scrollBtn = document.getElementById('scrollBtn');
    scrollBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const service = document.querySelector('.service');
        service.scrollIntoView({behavior: "smooth"});
    });

    const menu = document.querySelector('menu')
    menu.addEventListener('click', (evt) => {
        evt.preventDefault();
        let target = evt.target;
        if (target.matches('a') &&
            !target.matches('.close-btn')) {
            let scrollToClass = document.getElementById(target.getAttribute('href').slice(1));
            scrollToClass.scrollIntoView({behavior: "smooth"})
        } else {
            return
        }
    })
};

scroll();

// табы
const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tabs = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tabContent[i].classList.remove('d-none');
                tabs[i].classList.add('active')
            } else {
                tabContent[i].classList.add('d-none');
                tabs[i].classList.remove('active');
            }
        }
    };

    tabHeader.addEventListener('click', (evt => {
        let target = evt.target;
        target = target.closest('.service-header-tab'); // потому что часть срочки внутри таба - span без класса
        if (target.classList.contains('service-header-tab')) {
            tabs.forEach((item, index) => {
                if (item === target) {
                    toggleTabContent(index);
                }
            })
        }
        target = target.parentNode;
    }))
};

tabs();

// Портфолио-слайдер

const slider = () => {
    const slides = document.querySelectorAll('.portfolio-item');
    const slider = document.querySelector('.portfolio-content');
    const dotsArea = document.querySelector('.portfolio-dots');
    // const dot = document.querySelectorAll('.dot');

    let dots = [];

    const createDot = function () {
        let li = document.createElement('li');
        li.classList.add('dot');
        dotsArea.append(li);
        dots.push(li);

        if (dots.length === 1) {
            li.classList.add('dot-active');
        }
    };

    slides.forEach(slide => createDot());
    let currentSlideIdx = 0;
    let interval;

    const prevSlide = (element, index, strClass) => {
        element[index].classList.remove(strClass)
    };
    const nextSlide = (element, index, strClass) => {
        element[index].classList.add(strClass)
    };

    const autoPlaySlider = () => {
        prevSlide(slides, currentSlideIdx, 'portfolio-item-active');
        prevSlide(dots, currentSlideIdx, 'dot-active');
        currentSlideIdx++;

        if (currentSlideIdx >= slides.length) {
            currentSlideIdx = 0
        }
        nextSlide(slides, currentSlideIdx, 'portfolio-item-active');
        nextSlide(dots, currentSlideIdx, 'dot-active')

    };

    const startSlider = (time = 3000) => {
        interval = setInterval(autoPlaySlider, time);
    };

    const stopSlider = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (evt) => {
        evt.preventDefault();

        let target = evt.target;

        prevSlide(slides, currentSlideIdx, 'portfolio-item-active');
        prevSlide(dots, currentSlideIdx, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlideIdx++
        } else if (target.matches('#arrow-left')) {
            currentSlideIdx--
        } else if (target.matches('.dot')) {
            dots.forEach((d, i) => {
                if (d === target) {
                    currentSlideIdx = i;
                }
            })
        }

        if (currentSlideIdx >= slides.length) {
            currentSlideIdx = 0;
        }

        if (currentSlideIdx < 0) {
            currentSlideIdx = slides.length - 1;
        }

        nextSlide(slides, currentSlideIdx, 'portfolio-item-active');
        nextSlide(dots, currentSlideIdx, 'dot-active');
    });

    slider.addEventListener('mouseover', (evt) => {
        let target = evt.target;
        if (target.matches('.portfolio-btn') ||
            target.matches('.dot')) {
            stopSlider()
        }
    });

    slider.addEventListener('mouseout', (evt) => {
        let target = evt.target;
        if (target.matches('.portfolio-btn') ||
            target.matches('.dot')) {
            startSlider()
        }
    });

    startSlider(3000);

};

slider();


// Калькулятор услуг

const calc = (price = 100) => {
    const calcBlock = document.getElementById('calc');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcDay = document.querySelector('.calc-day');
    const roomsCount = document.querySelector('.calc-count');
    const totalValue = document.getElementById('total');


    calcBlock.addEventListener('input', (evt) => {
        let target = evt.target;
        target.value = target.value.replace(/\D/g, '')
    });

    const countSum = () => {
        let total = 0;
        let roomsCountValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value / 100;
        const squareValue = calcSquare.value;
        let calcDayValue = 1;

        if (calcDay.value) {
            if (calcDay.value <= 5) {
                calcDayValue *= 2;
            } else if (calcDay.value <= 10) {
                calcDayValue *= 1.5;
            }
        }

        if (roomsCount.value > 1) {
            roomsCountValue += (roomsCount.value - 1) / 10
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * roomsCountValue * calcDayValue);
        }

        setValue(totalValue, total, true, 100, 1);

    };

    // Анимация для показа результата (взяла из интернета)
// *inc - увеличение либо уменьшение
//  *shift - на сколько изменяется значение
    const setValue = function (elem, value, inc, shift, speed) {
        let interval = false;
        if (inc) {
            interval = setInterval(function () {
                if (elem.innerHTML * 1 + shift >= value) {
                    elem.innerHTML = value;
                    clearInterval(interval);
                } else {
                    elem.innerHTML = elem.innerHTML * 1 + shift;
                }
            }, speed);
        } else {
            interval = setInterval(function () {
                if (elem.innerHTML * 1 - shift <= value) {
                    elem.innerHTML = value;
                    clearInterval(interval);
                } else {
                    elem.innerHTML = elem.innerHTML * 1 - shift;
                }
            }, speed);
        }

    };

    calcBlock.addEventListener('change', (evt) => {
        let target = evt.target;
        if (target.matches('.calc-item')) {
            countSum();
        }
    });
};


calc();

// Смена фото при наведении

const changePhoto = () => {
    const photos = document.querySelector('.command');
    let originalPhoto;
    photos.addEventListener('mouseover', (evt => {
        if (evt.target.matches('.command__photo')) {
            originalPhoto = evt.target.src;
            evt.target.src = evt.target.dataset.img
        }
        photos.addEventListener('mouseout', (evt => {
            if (evt.target.matches('.command__photo')) {
                evt.target.src = originalPhoto;
            }
        }))
    }))


}

changePhoto();

// send ajax form

const sendForm = () => {
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

sendForm();