document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Footer Year Automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-toggle i');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // Toggle Icon
        if (navLinksContainer.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    // 4. Scroll Reveal Animation using Intersection Observer
    // Add fade-up class to elements we want to animate
    const animateElements = [
        '.section-header', 
        '.about-text', 
        '.about-stats', 
        '.timeline-item', 
        '.skill-category', 
        '.project-card', 
        '.contact-wrapper'
    ];

    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.add('fade-up'));
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 5. Welcome Modal & Background Music
    const welcomeModal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');

    if (welcomeModal && startBtn && bgMusic) {
        // Mencegah peramban (khususnya di HP) mengembalikan posisi scroll sebelumnya atau melompat ke link #hash
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        // Paksa scroll ke paling atas
        window.scrollTo(0, 0);
        setTimeout(() => window.scrollTo(0, 0), 10); // Cadangan untuk browser ponsel lambat

        // Cegah scroll saat modal masih terbuka
        document.body.style.overflow = 'hidden';

        startBtn.addEventListener('click', () => {
            // Putar musik (volume dibuat 50% agar tidak terlalu mengagetkan)
            bgMusic.volume = 0.5;
            
            // Kebijakan browser memerlukan interaksi pengguna (klik) sebelum audio bisa di-play
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio autoplay was prevented by browser:", error);
                });
            }

            // Sembunyikan modal dengan animasi CSS
            welcomeModal.classList.add('hidden');
            
            // Kembalikan kemampuan scroll
            document.body.style.overflow = '';
        });
    }

    // 6. Iframe Modal Logic
    const iframeModal = document.getElementById('iframe-modal');
    const iframeElement = document.getElementById('project-iframe');
    const closeIframeBtn = document.getElementById('close-iframe-btn');

    window.openProjectIframe = function(url) {
        if (iframeModal && iframeElement) {
            iframeElement.src = url;
            iframeModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Kunci scroll layar utama
        }
    };

    if (closeIframeBtn && iframeModal) {
        closeIframeBtn.addEventListener('click', () => {
            iframeModal.classList.add('hidden');
            document.body.style.overflow = '';
            // Hapus src untuk menghentikan resource (opsional, tapi bagus)
            setTimeout(() => { iframeElement.src = ''; }, 500);
        });
    }
});
