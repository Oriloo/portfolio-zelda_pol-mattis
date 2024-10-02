const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 1;  // Commencez avec la 2ème carte comme carte centrale
const itemWidth = 380;  // Largeur de l'élément (300px de largeur + 20px de marge)

function updateCarousel() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const centerOffset = (containerWidth - itemWidth) / 2;
    
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const offset = -currentIndex * itemWidth + centerOffset;  // Centrage dynamique
    carousel.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1;
    }
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

// Initial update to ensure proper display on page load
updateCarousel();

// Optional: Update the carousel on window resize to ensure centering remains correct
window.addEventListener('resize', updateCarousel);
