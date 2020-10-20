import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/popup";
import scroll from "./modules/animateScroll";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calculator";
import changePhoto from "./modules/changePhoto";
import sendForm from "./modules/sendForm";

// Timer
window.addEventListener('DOMContentLoaded', function () {
    countTimer('2020-10-27 13:23:00');
});

// Меню
toggleMenu();

// Pop-up
togglePopUp();

// плавная прокрутка
scroll();

// табы
tabs();

// Портфолио-слайдер
slider();


// Калькулятор услуг
calc();

// Смена фото при наведении
changePhoto();

// send ajax form
sendForm();