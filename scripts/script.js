'use strict'

window.addEventListener('DOMContentLoaded', function () {

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours');
        const timerMinutes = document.querySelector('#timer-minutes');
        const timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime() // чтобы посчитать миллисекунды
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
            let timer = getTimeRemaining()

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

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', handlerMenu);
    })
};

toggleMenu();

// Pop-up

const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpClose = document.querySelector('.popup-close');

    popUpBtn.forEach(item => item.addEventListener('click', () => {
        setTimeout(popUpAnimate, 10);

        popUp.style.display = 'block';
    }));

    const popUpAnimate = () => {
        popUp.children[0].style.transition = '1s'
        popUp.children[0].style.transform = 'scale(1.5)'
    };

    popUpClose.addEventListener('click', () => {
        popUp.style.display = 'none';
        popUp.children[0].style.transform = 'scale(0)'
    })


};


togglePopUp();
