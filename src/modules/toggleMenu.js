export default function toggleMenu(){
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