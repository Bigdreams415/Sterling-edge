document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');
    
    // Toggle mobile navigation when hamburger is clicked
    hamburgerMenu.addEventListener('click', () => {
        mobileNav.classList.toggle('active'); // Toggle the 'active' class
    });

    // Close the mobile navigation when close button (X) is clicked
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active'); // Remove the 'active' class to close nav
    });
});
