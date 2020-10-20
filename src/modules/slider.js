export default function slider() {
    const slides = document.querySelectorAll('.portfolio-item');
    const slider = document.querySelector('.portfolio-content');
    const dotsArea = document.querySelector('.portfolio-dots');

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

}