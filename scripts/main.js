function handleNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    let currentPath = window.location.pathname;

    if (currentPath === "/Resume/") {
        currentPath = '/Resume/index.html';
    }

    navLinks.forEach(link => {
        let linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}


(function() {
    window.addEventListener('load', function() {
        handleNavLinks();
    });
})();
