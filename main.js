document.addEventListener('DOMContentLoaded', () => {
    /* Menu Mobile Logic */
    const navToggle = document.querySelector('.header__toggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('nav__list--active');
            navToggle.classList.toggle('header__toggle--active');
        });
    }

    /* Script Carousel */
    const imgs = document.querySelectorAll('.carousel__img');
    
    if (imgs.length > 0) {
        let currentImg = 0;
        const totalImgs = imgs.length;

        function showImage(index) {
            imgs.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        function nextImage() {
            currentImg = (currentImg + 1) % totalImgs;
            showImage(currentImg);
        }

        // Change image every 4 seconds
        setInterval(nextImage, 4000);
    }
});
