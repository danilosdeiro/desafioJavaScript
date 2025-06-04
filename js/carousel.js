let carouselArr = [];

class Carousel {
    static _sequence = 0;
    static _size = 0;
    static _interval = null;
    static _carouselDiv = null;
    static _carouselTitleDiv = null;
    static _carouselDotsDiv = null;

    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    static Start(arr) {
        if (arr && arr.length > 0) {
            if (Carousel._interval) {
                clearInterval(Carousel._interval);
            }
            Carousel._carouselDiv = document.getElementById("carousel");
            Carousel._carouselTitleDiv = document.getElementById("carousel-title");
            Carousel._carouselDotsDiv = document.getElementById("carousel-dots");

            if (!Carousel._carouselDiv || !Carousel._carouselTitleDiv || !Carousel._carouselDotsDiv) {
                console.error("Elementos essenciais do carrossel (carousel, carousel-title ou carousel-dots) não encontrados.");
                return;
            }

            Carousel._sequence = 0;
            Carousel._size = arr.length;

            Carousel._createDots();
            Carousel.GoToSlide(0);

            Carousel._interval = setInterval(function() {
                Carousel.Next();
            }, 2000);
        } else {
            console.error("O método Start precisa de um array com itens Carousel.");
        }
    }


    static _createDots() {
        Carousel._carouselDotsDiv.innerHTML = '';
        for (let i = 0; i < Carousel._size; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            dot.dataset.slideTo = i;
            dot.addEventListener('click', function() {
                Carousel.GoToSlide(parseInt(this.dataset.slideTo));
            });
            Carousel._carouselDotsDiv.appendChild(dot);
        }
    }

    static _updateDots() {
        const dots = Carousel._carouselDotsDiv.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === Carousel._sequence) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    static GoToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= Carousel._size) {
            console.error("Índice do slide inválido:", slideIndex);
            return;
        }

        Carousel._sequence = slideIndex;
        const currentItem = carouselArr[Carousel._sequence];

        if (currentItem && Carousel._carouselDiv && Carousel._carouselTitleDiv) {
            Carousel._carouselDiv.innerHTML = `
                <a href="${currentItem.url}">
                    <img src="img/${currentItem.image}" alt="${currentItem.title}" style="width:100%; height:auto; display:block; object-fit: cover; border-radius: 10px;">
                </a>`;
            Carousel._carouselTitleDiv.innerHTML = `
                <a href="${currentItem.url}" style="text-decoration:none; color: #333; font-size: 1.2em; text-align:center; display:block; padding-top:10px; font-weight: bold;">
                    ${currentItem.title}
                </a>`;
        }

        Carousel._updateDots();

        if (Carousel._interval) {
            clearInterval(Carousel._interval);
        }
        Carousel._interval = setInterval(function() {
            Carousel.Next();
        }, 2000);
    }


    static Next() {
        if (Carousel._size === 0) return;

        let nextSequence = Carousel._sequence + 1;
        if (nextSequence >= Carousel._size) {
            nextSequence = 0;
        }
        Carousel.GoToSlide(nextSequence);
    }
}