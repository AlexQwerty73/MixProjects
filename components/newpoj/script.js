document.addEventListener('DOMContentLoaded', function() {
    // section 5
    const hamburgerMenu = document.querySelector('.hamburger');
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
    });
});