(function() {
    const isSubDir = window.location.pathname.includes('/posts/') || 
                     window.location.pathname.includes('/tutorials/') || 
                     window.location.pathname.includes('/guides/') ||
                     window.location.pathname.includes('/tools_detail/');
    const basePath = isSubDir ? '../' : './';

    const headerHTML = `
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-6">
            <nav class="flex items-center justify-between h-20">
                <a href="${basePath}index.html" class="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform">ModernDevKit</a>
                <ul class="hidden md:flex items-center gap-8">
                    <li><a href="${basePath}index.html" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors">Home</a></li>
                    <li><a href="${basePath}blog.html" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors">Blog</a></li>
                    <li><a href="${basePath}about.html" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors">About</a></li>
                    <li><a href="${basePath}contact.html" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors">Contact</a></li>
                    <li><a href="${basePath}privacy.html" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors">Privacy</a></li>
                </ul>
                <div class="flex items-center gap-4">
                    <button class="theme-toggle flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all">
                        <i data-lucide="moon" class="w-4 h-4"></i><span class="theme-label font-semibold text-sm">Dark</span>
                    </button>
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-700 dark:text-slate-300">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </nav>
            <div id="mobile-menu" class="hidden absolute left-0 right-0 top-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 md:hidden">
                <ul class="flex flex-col gap-4 font-bold text-lg">
                    <li><a href="${basePath}index.html" class="block py-2">Home</a></li>
                    <li><a href="${basePath}blog.html" class="block py-2">Blog</a></li>
                    <li><a href="${basePath}about.html" class="block py-2">About</a></li>
                    <li><a href="${basePath}contact.html" class="block py-2">Contact</a></li>
                    <li><a href="${basePath}privacy.html" class="block py-2">Privacy</a></li>
                </ul>
            </div>
        </div>
    </header>
    `;

    document.write(headerHTML);

    const initHeaderLogic = () => {
        const themeToggles = document.querySelectorAll('.theme-toggle');
        const htmlElement = document.documentElement;
        
        const updateThemeUI = (isDark) => {
            themeToggles.forEach(toggle => {
                const label = toggle.querySelector('.theme-label');
                const icon = toggle.querySelector('i');
                if (isDark) {
                    if (label) label.textContent = 'Light';
                    if (icon) {
                        icon.setAttribute('data-lucide', 'sun');
                        if (window.lucide) window.lucide.createIcons();
                    }
                } else {
                    if (label) label.textContent = 'Dark';
                    if (icon) {
                        icon.setAttribute('data-lucide', 'moon');
                        if (window.lucide) window.lucide.createIcons();
                    }
                }
            });
        };

        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
            updateThemeUI(true);
        }

        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const isDark = htmlElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                updateThemeUI(isDark);
            });
        });

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });
            document.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        }

        if (window.lucide) window.lucide.createIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderLogic);
    } else {
        initHeaderLogic();
    }
})();
