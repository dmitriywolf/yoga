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


});