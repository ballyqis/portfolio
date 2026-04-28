function setLanguage(lang) {
    // Hide all language elements
    document.querySelectorAll('.lang-en, .lang-fr').forEach(el => {
        el.style.display = 'none';
    });

    // Show selected language elements
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.display = 'block';
    });

    // Save preference to browser storage
    localStorage.setItem('preferredLang', lang);
}

// Run on page load
const savedLang = localStorage.getItem('preferredLang') || 'fr';
setLanguage(savedLang);



// Modal functionality for images
function zoomImage(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}