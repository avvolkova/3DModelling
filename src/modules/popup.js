export default function togglePopUp() {
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
