document.addEventListener("DOMContentLoaded", function() {
    // Only activate on screens wider than 1024px (PC)
    if (window.matchMedia("(max-width: 1024px)").matches) {
        return;
    }

    let lightboxData = [];
    let currentIndex = 0;

    // Function to create and inject the lightbox HTML into the page
    function buildLightbox() {
        const lightboxHTML = `
            <div id="lightbox-modal" class="lightbox-modal">
                <span class="lightbox-close">&times;</span>
                <a class="lightbox-prev">&#10094;</a>
                <a class="lightbox-next">&#10095;</a>
                <div class="lightbox-image-container">
                    <img class="lightbox-content" id="lightbox-img">
                    <div id="lightbox-caption" class="lightbox-caption"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    buildLightbox();

    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    // Initialize lightbox data from thumbnails
    window.initLightbox = function() { // Exposed globally
        const thumbnails = document.querySelectorAll(".thumbnail");
        lightboxData = []; // Clear previous data
        thumbnails.forEach((element, index) => {
            const img = element.querySelector('img');
            lightboxData.push({
                src: img.src
            });

            // Prevent adding duplicate listeners
            if (!element.hasAttribute('data-lightbox-listener')) {
                element.setAttribute('data-index', index);
                element.addEventListener('click', function() {
                    openModal(parseInt(this.getAttribute('data-index')));
                });
                element.setAttribute('data-lightbox-listener', 'true');
            }
        });
    };

    function openModal(index) {
        currentIndex = index;
        modal.classList.add("visible");
        updateModalContent();
    }

    function closeModal() {
        modal.classList.remove("visible");
    }

    function changeSlide(n) {
        currentIndex += n;
        if (currentIndex >= lightboxData.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = lightboxData.length - 1;
        }
        updateModalContent();
    }

    function updateModalContent() {
        if(lightboxData[currentIndex]){
            modalImg.src = lightboxData[currentIndex].src;
        }
    }

    // Event Listeners
    closeBtn.onclick = closeModal;
    prevBtn.onclick = () => changeSlide(-1);
    nextBtn.onclick = () => changeSlide(1);

    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains("visible")) {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
            if (e.key === 'Escape') closeModal();
        }
    });

    modal.addEventListener('wheel', function(e) {
        if (modal.classList.contains("visible")) {
            e.preventDefault();
            changeSlide(e.deltaY > 0 ? 1 : -1);
        }
    });
});
