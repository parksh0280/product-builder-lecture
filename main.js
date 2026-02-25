// Dark Mode Implementation
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️ Light';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙 Dark';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️ Light';
        }
    });
}

// Navigation Highlight (Simple)
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.style.color = 'var(--primary)';
        link.style.fontWeight = 'bold';
    }
});

// Card Animation on Scroll (Basic Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});
