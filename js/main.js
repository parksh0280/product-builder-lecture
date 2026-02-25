document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        updateThemeToggleIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeToggleIcon(isDark);
        });
    }

    function updateThemeToggleIcon(isDark) {
        if (!themeToggle) return;
        const textSpan = themeToggle.querySelector('span');
        const iconContainer = themeToggle.querySelector('i');
        
        if (isDark) {
            if (textSpan) textSpan.textContent = 'Light';
            // Lucide icons are replaced by SVG, so we need to handle this carefully
            // In a simple setup, we can just replace the innerHTML if needed or use separate icons
        } else {
            if (textSpan) textSpan.textContent = 'Dark';
        }
        // Re-run lucide to update icons if they were swapped
        if (window.lucide) window.lucide.createIcons();
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = newsletterForm.querySelector('button');
            const originalContent = button.innerHTML;
            
            button.innerHTML = '✓ 구독 완료!';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                newsletterForm.reset();
            }, 3000);
        });
    }

    // Intersection Observer for animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
