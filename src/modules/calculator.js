export default function calc(price = 100) {
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
