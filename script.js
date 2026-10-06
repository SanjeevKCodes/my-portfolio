document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // PART 1: Accordion Functionality
    // ==========================================
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        const content = header.nextElementSibling;
        if (!content) return;

        // Accessibility: make headers keyboard-operable
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', content.classList.contains('open'));

        const toggle = () => {
            const isOpen = content.classList.toggle('open');
            header.classList.toggle('active', isOpen);
            header.setAttribute('aria-expanded', isOpen);
        };

        header.addEventListener('click', toggle);
        header.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // ==========================================
    // PART 2: Dark Mode Logic
    // ==========================================
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (toggleBtn) {
        const setLabel = isDark => {
            toggleBtn.innerHTML = isDark
                ? '<i class="fas fa-sun"></i> Light Mode'
                : '<i class="fas fa-moon"></i> Dark Mode';
        };

        // Restore saved preference (storage can be unavailable, so guard it)
        let savedTheme = null;
        try { savedTheme = localStorage.getItem('theme'); } catch (e) {}

        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            setLabel(true);
        }

        toggleBtn.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            setLabel(isDark);
            try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
        });
    }
});
