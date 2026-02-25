document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            // Re-run lucide to update icons if they are changed
            if (window.lucide) window.lucide.createIcons();
        });
    });

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-in');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Blog Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterBtns.length > 0 && blogCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600'));
                btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

                blogCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Scroll Reveal Animation
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});
