function displayLoadTime() {
    let loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    let footer = document.querySelector('footer');
    let loadInfo = document.createElement('p');

    loadInfo.textContent = `${loadTime} мс`;
    loadInfo.style.color = 'lightgray';
    loadInfo.style.fontSize = '10px';
    loadInfo.style.margin = '0';
    loadInfo.style.textAlign = 'right';

    footer.appendChild(loadInfo);
}

function handleNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/index.html') {
        currentPath = '/index.html';
    }

    navLinks.forEach(link => {
        let linkPath = new URL(link.href).pathname;

        if (linkPath === '/') {
            linkPath = '/index.html';
        }

        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}


(function() {
    window.addEventListener('load', function() {
        displayLoadTime();
        handleNavLinks();
    });
})();
