document.addEventListener('DOMContentLoaded', () => {

    /* Header */
    const headerFixed = () => {
        const header = document.getElementById('header');
        const intro = document.getElementById('intro');

        let introHeight = intro.offsetHeight;
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        window.addEventListener('scroll', () => {
            introHeight = intro.offsetHeight;
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > introHeight) {
                header.classList.add('fixed', 'animated', 'fadeInDown');
            } else {
                header.classList.remove('fixed', 'fadeInDown');
            }
        });
    };
    headerFixed();

    /* Modals */
    const modals = () => {

        function popupModal(triggerSelector, modalSelector, closeSelector) {
            const trigger = document.querySelectorAll(triggerSelector);
            const modal = document.querySelector(modalSelector);
            const close = document.querySelector(closeSelector);
            const scroll = calcScroll();

            trigger.forEach((item) => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
                    modal.classList.add('show', 'animated');
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                });
            });

            close.addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }

        // Получаем ширину скролла
        function calcScroll() {
            const div = document.createElement('div');
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';
            document.body.appendChild(div);
            const scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
            return scrollWidth;
        }

        popupModal('.button--request', '.popup--request', '.popup--request .popup__close');
    };
    modals();

    /* PageUp */
    const scrolling = () => {
        /* PageUp */
        const upElement = document.querySelector('.pageup');
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 1700) {
                upElement.classList.add('fadeIn');
                upElement.classList.remove('fadeOut');
            } else {
                upElement.classList.add('fadeOut');
                upElement.classList.remove('fadeIn');
            }
        });

        // Вспомогательные переменные для кроссбраузерности
        const element = document.documentElement;
        const {body} = document;

        // Якоря
        const anchors = document.querySelectorAll('[href^="#"]');

        // Подсчет расстояния скролинга
        const calcScroll = () => {
            anchors.forEach((item) => {
                item.addEventListener('click', function (event) {
                    console.log(item.hash);

                    const scrollTop = Math.round(body.scrollTop || element.scrollTop);

                    if (this.hash !== '') {
                        event.preventDefault();

                        // Элемент к которому будет произведен скрол
                        let hashElement = document.querySelector(this.hash);
                        let hashElementTop = 0;

                        while (hashElement.offsetParent) {
                            hashElementTop += hashElement.offsetTop;
                            hashElement = hashElement.offsetParent;
                        }

                        hashElementTop = Math.round(hashElementTop);

                        smoothScroll(scrollTop, hashElementTop, this.hash);
                    }
                });
            });
        };

        // Функция скролинга
        const smoothScroll = (from, to, hash) => {
            const timeInterval = 1;
            let prevScrollTop;
            let speed;

            // Скорость
            if (to > from) {
                speed = 30;
            } else {
                speed = -30;
            }

            // Анимация скролла
            const move = setInterval(() => {
                const scrollTop = Math.round(body.scrollTop || element.scrollTop);

                if (
                    prevScrollTop === scrollTop
                    || (to > from && scrollTop >= to)
                    || (to < from && scrollTop <= to)
                ) {
                    clearInterval(move);
                    history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
                } else {
                    body.scrollTop += speed;
                    element.scrollTop += speed;
                    prevScrollTop = scrollTop;
                }
            }, timeInterval);
        };

        calcScroll();
    };
    scrolling();

    /* Carousel */
    const carousel = () => {

        const configCarousel = {
            type: 'carousel',
            startAt: 1,
            perView: 1
        };

        const configFeatures = {
            type: 'carousel',
            startAt: 1,
            perView: 1,
            focusAt: 'center'
        };

        new Glide('.glide-reviews', configCarousel).mount();
        new Glide('.glide-instructors--first', configCarousel).mount();
        new Glide('.glide-instructors--second', configCarousel).mount();
        new Glide('.glide-features', configFeatures).mount();
        new Glide('.glide-program', configFeatures).mount();
    };
    carousel();

});