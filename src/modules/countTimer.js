export default function countTimer(deadline) {
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

