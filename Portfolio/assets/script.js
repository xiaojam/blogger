document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const fullNavModal = document.getElementById('full-nav-modal');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const brandIcon = document.querySelector('.brand-icon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateBrandLogo(theme);
    }

    function updateBrandLogo(theme) {
        if (!brandIcon) return;
        if (theme === 'dark') {
            brandIcon.src = brandIcon.src.replace('b-ojam.png', 'w-ojam.png');
        } else {
            brandIcon.src = brandIcon.src.replace('w-ojam.png', 'b-ojam.png');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    function openNavigation() {
        if (fullNavModal) {
            fullNavModal.classList.add('active');
            body.classList.add('nav-open');
        }
    }

    function closeNavigation() {
        if (fullNavModal) {
            fullNavModal.classList.remove('active');
            body.classList.remove('nav-open');
        }
    }

    function toggleNavigation() {
        if (fullNavModal && fullNavModal.classList.contains('active')) {
            closeNavigation();
        } else {
            openNavigation();
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleNavigation();
        });
    }

    if (fullNavModal) {
        fullNavModal.addEventListener('click', (e) => {
            if (e.target === fullNavModal) {
                closeNavigation();
            }
        });
    }

    const modalNavLinks = document.querySelectorAll('.modal-nav-link');
    modalNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNavigation();
        });
    });

    const timeDisplay = document.getElementById("live-time-display");
    const dateDisplay = document.getElementById("live-date-display");

    if (timeDisplay) {
        function updateTime() {
            const utc = new Date();
            const now = new Date(utc.getTime() + (7 * 60 * 60 * 1000) + (utc.getTimezoneOffset() * 60 * 1000));

            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

            if (dateDisplay) {
                const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

                const dayName = dayNames[now.getDay()];
                const dayDate = String(now.getDate()).padStart(2, "0");
                const monthName = monthNames[now.getMonth()];

                dateDisplay.textContent = `${dayName}, ${dayDate} ${monthName}`;
            }
        }

        updateTime();
        setInterval(updateTime, 1000);
    }

    const copyBtn = document.getElementById("copy-pgp-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            const keyToCopy = copyBtn.getAttribute("data-key");
            if (!keyToCopy) return;

            try {
                await navigator.clipboard.writeText(keyToCopy);

                const originalText = copyBtn.textContent;
                copyBtn.textContent = "COPIED!";
                copyBtn.style.background = "#10b981";
                copyBtn.style.color = "#ffffff";
                copyBtn.style.borderColor = "#10b981";

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = "";
                    copyBtn.style.color = "";
                    copyBtn.style.borderColor = "";
                }, 2000);
            } catch (err) {
                console.error("Gagal menyalin PGP Key: ", err);
            }
        });
    }

    const sliders = document.querySelectorAll('.prj-t3-slider');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.prj-t3-slide');
        const dots = slider.querySelectorAll('.prj-t3-dot');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        let activeIdx = 0;
        let timer = null;

        function renderSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            activeIdx = index;
        }

        function next() {
            renderSlide(activeIdx + 1);
        }

        function prev() {
            renderSlide(activeIdx - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            timer = setInterval(next, 3800);
        }

        function stopAutoplay() {
            if (timer) clearInterval(timer);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                next();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prev();
                startAutoplay();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                renderSlide(idx);
                startAutoplay();
            });
        });

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    });

    const filterApps = document.querySelectorAll('.crt-type-0-item');
    const resetBtn = document.getElementById('crt-w0-reset');
    const allWidgets = document.querySelectorAll('.crt-homescreen-grid > section:not(.crt-type-0)');

    function applyFilter(selectedCategory) {
        allWidgets.forEach(widget => {
            const category = widget.getAttribute('data-category');

            if (!selectedCategory || category === selectedCategory) {
                widget.classList.remove('crt-is-hidden');
            } else {
                widget.classList.add('crt-is-hidden');
            }
        });
    }

    function resetFilter() {
        filterApps.forEach(app => app.classList.remove('active'));
        applyFilter(null);
    }

    filterApps.forEach(app => {
        app.addEventListener('click', () => {
            const selectedCategory = app.getAttribute('data-filter');
            const isActive = app.classList.contains('active');

            filterApps.forEach(item => item.classList.remove('active'));

            if (isActive) {
                applyFilter(null);
            } else {
                app.classList.add('active');
                applyFilter(selectedCategory);
            }
        });

        app.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                app.click();
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetFilter();
        });
    }

    const modal = document.getElementById('crt-modal');
    const modalImg = document.getElementById('crt-modal-img');
    const modalTitle = document.getElementById('crt-modal-title');
    const modalCloseBtn = document.getElementById('crt-modal-close');
    const openModalBtns = document.querySelectorAll('.crt-open-modal');

    function openModal(imgSrc, title) {
        if (!modal || !modalTitle) return;

        modalTitle.textContent = title || 'Certificate Preview';

        const modalBody = modal.querySelector('.crt-modal-body') || modal; // Sesuaikan container modal Anda
        const isPdf = imgSrc && imgSrc.toLowerCase().endsWith('.pdf');

        if (isPdf) {
            modalImg.style.display = 'none';

            let iframe = modal.querySelector('#crt-modal-pdf');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'crt-modal-pdf';
                iframe.style.width = '100%';
                iframe.style.height = '500px';
                iframe.style.border = 'none';
                modalImg.parentNode.appendChild(iframe);
            }
            iframe.src = imgSrc;
            iframe.style.display = 'block';
        } else {
            const iframe = modal.querySelector('#crt-modal-pdf');
            if (iframe) iframe.style.display = 'none';

            if (modalImg) {
                modalImg.src = imgSrc;
                modalImg.style.display = 'block';
            }
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('data-src');
            const title = btn.getAttribute('data-title');
            openModal(imgSrc, title);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const btnText = btn.querySelector('span');
            const originalText = btnText ? btnText.innerText : btn.innerText;

            if (btnText) {
                btnText.innerText = "TRANSMITTING...";
            } else {
                btn.innerText = "TRANSMITTING...";
            }

            btn.disabled = true;
            btn.style.opacity = "0.7";
            btn.style.cursor = "not-allowed";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let resJson = await response.json();
                    if (response.status === 200) {
                        if (formFeedback) {
                            formFeedback.innerHTML = `<span>✓</span> Message Sent Successfully!`;
                            formFeedback.className = "cnt-t1-feedback show success-msg";
                        }
                        contactForm.reset();
                    } else {
                        console.log(response);
                        if (formFeedback) {
                            formFeedback.innerHTML = `<span>⚠</span> ${resJson.message}`;
                            formFeedback.className = "cnt-t1-feedback show error-msg";
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (formFeedback) {
                        formFeedback.innerHTML = `<span>⚠</span> Something went wrong!`;
                        formFeedback.className = "cnt-t1-feedback show error-msg";
                    }
                })
                .then(function () {
                    if (btnText) {
                        btnText.innerText = originalText;
                    } else {
                        btn.innerText = originalText;
                    }

                    btn.disabled = false;
                    btn.style.opacity = "1";
                    btn.style.cursor = "pointer";

                    setTimeout(() => {
                        if (formFeedback) {
                            formFeedback.classList.remove('show');
                        }
                    }, 4000);
                });
        });
    }
});