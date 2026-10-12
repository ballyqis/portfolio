// Dynamic Multi-Language Switcher (EN default)
function setLanguage(lang) {
    const selectedLanguage = lang === 'fr' ? 'fr' : 'en';
    const btnEn = document.getElementById('btn-en');
    const btnFr = document.getElementById('btn-fr');

    document.documentElement.lang = selectedLanguage;
    localStorage.setItem('language', selectedLanguage);

    if (selectedLanguage === 'fr') {
        btnFr.classList.add('active');
        btnEn.classList.remove('active');
    } else {
        btnEn.classList.add('active');
        btnFr.classList.remove('active');
    }

    updateServicesAnchorSpace();
}

function updateServicesAnchorSpace() {
    const servicesTarget = document.getElementById('services');
    const footer = document.querySelector('.site-footer');

    if (!servicesTarget || !footer) {
        return;
    }

    footer.style.paddingBottom = '35px';

    const targetTop = servicesTarget.getBoundingClientRect().top + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const requiredPageHeight = targetTop - scrollOffset + window.innerHeight;
    const extraSpace = Math.max(0, requiredPageHeight - pageHeight);

    footer.style.paddingBottom = `${35 + extraSpace}px`;
}


const cvButton = document.getElementById("cvButton");
const cvMenu = document.getElementById("cvMenu");

if (cvButton && cvMenu) {
    cvButton.addEventListener("click", function (event) {
        event.stopPropagation();
        cvMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!cvMenu.contains(event.target) && !cvButton.contains(event.target)) {
            cvMenu.classList.remove("active");
        }
    });
}



// Category Filter for Featured Work Grid
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    setLanguage(savedLanguage === 'fr' ? 'fr' : 'en');
    window.addEventListener('resize', updateServicesAnchorSpace);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const revealTargets = document.querySelectorAll(
        '.filter-group, .project-card, .section-heading, .about-intro, .services-section .section-title, .service-card'
    );

    const revealVisibleTargets = () => {
        revealTargets.forEach(target => {
            if (target.getBoundingClientRect().top <= window.innerHeight * 0.9) {
                target.classList.add('is-visible');
            }
        });
    };

    revealTargets.forEach(target => target.classList.add('scroll-reveal'));
    document.documentElement.classList.add('scroll-reveal-ready');
    revealVisibleTargets();
    window.addEventListener('scroll', revealVisibleTargets, { passive: true });
    window.addEventListener('resize', revealVisibleTargets);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active pill state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show/Hide project cards with filter tag match
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Reveal brand title in sticky nav when scrolling down past the hero
    const navBrand = document.getElementById('navBrand');
    if (navBrand) {
        window.addEventListener('scroll', () => {
            navBrand.classList.toggle('visible', window.scrollY > 300);
        });
    }
});

// Interactive Lightbox Script
        function openLightbox(imgSrc, captionText) {
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            const caption = document.getElementById('modal-caption');
            
            modal.style.display = 'flex';
            modalImg.src = imgSrc;
            caption.innerText = captionText;
        }

        function closeLightbox() {
            document.getElementById('image-modal').style.display = 'none';
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });