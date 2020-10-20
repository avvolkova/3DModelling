export default function scroll() {
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