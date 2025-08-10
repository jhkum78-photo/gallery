document.addEventListener("DOMContentLoaded", function() {
    const imageFiles = [
        "images/jhkum78/20250608-11M01245.jpg",
        "images/jhkum78/20250523-A7C01582.jpg",
        "images/jhkum78/20250523-A7C01572.jpg",
        "images/yulucida/DSC00816.jpg",
        "images/yulucida/DSC00794.jpg",
        "images/yulucida/DSC00675.jpg"
    ];

    const sliderPlaceholder = document.getElementById('slider-placeholder');

    if (sliderPlaceholder) {
        let slidesHTML = '';
        imageFiles.forEach((img, index) => {
            slidesHTML += `
                <div class="slide${index === 0 ? ' active' : ''}">
                    <img src="${img}" alt="Gallery image">
                </div>
            `;
        });

        const sliderHTML = `
            <div class="slider-container">
                ${slidesHTML}
                <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
                <a class="next" onclick="changeSlide(1)">&#10095;</a>
            </div>
        `;
        sliderPlaceholder.innerHTML = sliderHTML;
    }

    let slideIndex = 0;
    showSlide(slideIndex);

    // Make changeSlide global
    window.changeSlide = function(n) {
        slideIndex += n;
        const slides = document.getElementsByClassName("slide");
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        showSlide(slideIndex);
    }

    function showSlide(index) {
        const slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        slides[index].style.display = "block";
        slides[index].classList.add("active");
    }
});
