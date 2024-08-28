// slide_index.js
document.addEventListener (
    "DOMContentLoaded", function () {
        let currentSlide = 0;
        const slides = document.querySelectorAll (
            ".slide"
        );

        function showSlide (
            index
        ) {
            slides.forEach (
                (
                    slide, i
                ) => {
                    slide.style.display = i === index ? "block" : "none";
                }
            );
        }

        function nextSlide () {
            currentSlide = (
                currentSlide + 1
            ) % slides.length;
            showSlide (
                currentSlide
            );
        }

        function prevSlide () {
            currentSlide = (
                currentSlide - 1 + slides.length
            ) % slides.length;
            showSlide (
                currentSlide
            );
        }

        function autoSlide () {
            nextSlide ();
        }

        const slideInterval = setInterval (
            autoSlide, 3000
        );

        document.querySelector (
            '.slide-container'
        ).addEventListener (
            'mouseenter' , function () {
                clearInterval (
                    slideInterval
                );
            }
        );

        document.querySelector (
            '.slide-container'
        ).addEventListener (
            'mouseleave' , function () {
                slideInterval = setInterval (
                    autoSlide , 3000
                );
            }
        );

        showSlide (
            currentSlide
        )
    }
);