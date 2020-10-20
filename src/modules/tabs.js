export default function tabs() {
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
}
