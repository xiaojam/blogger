$(document).ready(function() {

    // --- CONFIG ---
    const CACHE_INTRO = 'ojam_intro_fip0s_v8'; 
    const CACHE_THEME = 'ojam_theme';
    const CACHE_TIME = 30 * 60 * 1000;
    
    const now = new Date().getTime();
    const lastVisit = localStorage.getItem(CACHE_INTRO);
    const savedTheme = localStorage.getItem(CACHE_THEME);
    
    // Selectors
    const htmlTag = $('html');
    const themeBtns = $('.theme-toggle-btn');
    const introText = $('#intro-text-layer');
    const blockOverlay = $('#block-overlay');
    const wrapper = $('#wrapper');

    // --- THEME ---
    const brandLogo = $('.brand-logo');

    function applyTheme(isLight) {
        
        if (isLight) {
            htmlTag.addClass('light-mode');
            themeBtns.html(`
                <svg viewBox="0 0 24 24">
                    <path d="M20.0258 17.0014C17.2639 21.7851 11.1471 23.4241 6.3634 20.6622C5.06068 19.9101 3.964 18.8926 3.12872 17.6797C2.84945 17.2741 3.0301 16.7141 3.49369 16.5482C7.26112 15.1997 9.27892 13.6372 10.4498 11.4021C11.6825 9.04908 12.001 6.47162 11.1387 2.93862C11.0195 2.45008 11.4053 1.98492 11.9075 2.01186C13.4645 2.09539 14.9856 2.54263 16.3649 3.33903C21.1486 6.10088 22.7876 12.2177 20.0258 17.0014ZM11.7785 12.0981C10.5272 14.4867 8.46706 16.1972 4.96104 17.597C5.5693 18.2929 6.29275 18.8894 7.1134 19.3632C11.1796 21.7108 16.3791 20.3176 18.7267 16.2514C21.0744 12.1852 19.6812 6.98571 15.6149 4.63807C14.7379 4.1317 13.7951 3.79168 12.8228 3.62253C13.4699 7.00652 13.0525 9.66622 11.7785 12.0981Z"/>
                </svg>
            `);
        } else {
            htmlTag.removeClass('light-mode');
            themeBtns.html(`
                <svg viewBox="0 0 24 24" >
                    <path d="M12 2C12.4142 2 12.75 2.33579 12.75 2.75V4.25C12.75 4.66421 12.4142 5 12 5C11.5858 5 11.25 4.66421 11.25 4.25V2.75C11.25 2.33579 11.5858 2 12 2ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5ZM21.25 12.75C21.6642 12.75 22 12.4142 22 12C22 11.5858 21.6642 11.25 21.25 11.25H19.75C19.3358 11.25 19 11.5858 19 12C19 12.4142 19.3358 12.75 19.75 12.75H21.25ZM12 19C12.4142 19 12.75 19.3358 12.75 19.75V21.25C12.75 21.6642 12.4142 22 12 22C11.5858 22 11.25 21.6642 11.25 21.25V19.75C11.25 19.3358 11.5858 19 12 19ZM4.25 12.75C4.66421 12.75 5 12.4142 5 12C5 11.5858 4.66421 11.25 4.25 11.25H2.75C2.33579 11.25 2 11.5858 2 12C2 12.4142 2.33579 12.75 2.75 12.75H4.25ZM4.21967 4.22004C4.51256 3.92715 4.98744 3.92715 5.28033 4.22004L6.78033 5.72004C7.07322 6.01294 7.07322 6.48781 6.78033 6.7807C6.48744 7.0736 6.01256 7.0736 5.71967 6.7807L4.21967 5.2807C3.92678 4.98781 3.92678 4.51294 4.21967 4.22004ZM5.28033 19.7807C4.98744 20.0736 4.51256 20.0736 4.21967 19.7807C3.92678 19.4878 3.92678 19.0129 4.21967 18.72L5.71967 17.22C6.01256 16.9271 6.48744 16.9271 6.78033 17.22C7.07322 17.5129 7.07322 17.9878 6.78033 18.2807L5.28033 19.7807ZM19.7803 4.22004C19.4874 3.92715 19.0126 3.92715 18.7197 4.22004L17.2197 5.72004C16.9268 6.01294 16.9268 6.48781 17.2197 6.7807C17.5126 7.0736 17.9874 7.0736 18.2803 6.7807L19.7803 5.2807C20.0732 4.98781 20.0732 4.51294 19.7803 4.22004ZM18.7197 19.7807C19.0126 20.0736 19.4874 20.0736 19.7803 19.7807C20.0732 19.4878 20.0732 19.0129 19.7803 18.72L18.2803 17.22C17.9874 16.9271 17.5126 16.9271 17.2197 17.22C16.9268 17.5129 16.9268 17.9878 17.2197 18.2807L18.7197 19.7807Z"/>
                </svg>
            `);
        }

        brandLogo.each(function() {
            const img = $(this);
            const currentSrc = img.attr('src'); 
            if (currentSrc) {
                if (isLight) {
                    if (currentSrc.includes('w-ojam.png')) {
                        const newSrc = currentSrc.replace('w-ojam.png', 'b-ojam.png');
                        img.attr('src', newSrc);
                    }
                } else {
                    if (currentSrc.includes('b-ojam.png')) {
                        const newSrc = currentSrc.replace('b-ojam.png', 'w-ojam.png');
                        img.attr('src', newSrc);
                    }
                }
            }
        });

    }
    if (savedTheme === 'light') applyTheme(true); else applyTheme(false);
    
    themeBtns.click(function(e) {
        e.preventDefault();
        coverScreen(function() {
            if(htmlTag.hasClass('light-mode')) {
                applyTheme(false); localStorage.setItem(CACHE_THEME, 'dark');
            } else {
                applyTheme(true); localStorage.setItem(CACHE_THEME, 'light');
            }
            setTimeout(revealScreen, 100);
        });
    });

    // --- BLOCK SYSTEM ---
    function initBlocks() {
        if(blockOverlay.children().length === 0) {
            for(let i=0; i<10; i++) blockOverlay.append('<div class="block"></div>');
        }
        blockOverlay.css('z-index', 99999);
        $('.block').css({
            'transform': 'scaleY(1)', 
            'transform-origin': 'top',
            'transition': 'none'
        });
    }

    function revealScreen() {
        const blocks = $('.block');
        
        blockOverlay.css('background-color', 'transparent');

        $('body').removeClass('is-loading');

        wrapper.addClass('visible').css('opacity', 1);
        $('#mobile-top-bar, #desktop-header, #mobile-nav').css('opacity', 1);

        setTimeout(() => {
            blocks.each(function(i) {
                $(this).css({
                    'transition': 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    'transition-delay': (i * 0.05) + 's', 
                    'transform': 'scaleY(0)' 
                });
            });

            setTimeout(() => {
                blockOverlay.css('z-index', -1);
                startScrollObserver();
            }, 1500); 
        }, 100);
    }

    function coverScreen(callback) {
        blockOverlay.css('z-index', 99999);
        blockOverlay.css('background-color', 'transparent'); 
        
        $('.block').css({'transform': 'scaleY(0)', 'transition': 'none', 'transform-origin': 'top'});
        
        setTimeout(() => {
            $('.block').each(function(i) {
                $(this).css({
                    'transition': 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    'transition-delay': (i * 0.05) + 's',
                    'transform': 'scaleY(1)'
                });
            });
        }, 10);

        setTimeout(() => { if(callback) callback(); }, 1200);
    }


    // --- PAGE LOAD ---
    initBlocks(); 

    const isHomePage = introText.length > 0;

    if (isHomePage) {
        if(lastVisit && (now - lastVisit < CACHE_TIME)) {
            setTimeout(revealScreen, 100);
        } else {
            setTimeout(() => {
                blockOverlay.css('background-color', 'transparent');
                introText.css('opacity', 1);
                
                $('.block').each((i, el) => $(el).css({ 
                    'transition': 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    'transition-delay': (i * 0.05) + 's',
                    'transform': 'scaleY(0)' 
                }));
                
                setTimeout(() => {
                    $('.block').each((i, el) => $(el).css({ 'transform': 'scaleY(1)' }));
                    
                    setTimeout(() => {
                        introText.hide();
                        $('.block').css('transition', 'none'); 
                        setTimeout(revealScreen, 50); 
                    }, 1000);
                }, 2500);
            }, 100);
            localStorage.setItem(CACHE_INTRO, now);
        }
    } else {
        setTimeout(revealScreen, 100);
    }


    // --- CLICK LINK ---
    $('a').on('click', function(e) {
        const target = $(this).attr('href');
        if (target && target.indexOf('#') !== 0 && target.indexOf('mailto') !== 0 && $(this).attr('target') !== '_blank') {
            e.preventDefault(); 
            forceCloseMenu();   
            
            coverScreen(function() {
                window.location.href = target;
            });
        }
    });

    // --- NAV & UTILS ---
    const fullMenu = $('#fullscreen-menu');
    const mobileBtn = $('#mobile-plus-btn');
    function toggleMenu() {
        if (fullMenu.hasClass('active')) { fullMenu.removeClass('active'); mobileBtn.removeClass('is-open'); } 
        else { fullMenu.addClass('active'); mobileBtn.addClass('is-open'); }
    }
    function forceCloseMenu() { fullMenu.removeClass('active'); mobileBtn.removeClass('is-open'); }

    $('#desktop-menu-toggle').click(toggleMenu);
    $('#close-menu').click(forceCloseMenu);
    mobileBtn.click(toggleMenu);
    $('#fullscreen-menu a[href^="#"]').click(forceCloseMenu);

    const modal = $('#cert-modal');
    if(modal.length) {
        $('.btn-view-cert').click(function(e) {
            const src = $(this).data('src');
    
            if (!src) {
                return; 
            }
            e.preventDefault();
            const title = $(this).data('title');
            $('#modal-title').text(title);
            if(src.toLowerCase().endsWith('.pdf')) {
                $('#modal-body').html(`<embed src="${src}" type="application/pdf" width="100%" height="100%" />`);
            } else {
                $('#modal-body').html(`<img src="${src}" alt="Certificate View">`);
            }
            modal.css('display', 'flex');
        });
        $('.close-modal').click(() => { modal.hide(); $('#modal-body').empty(); });
        $(window).click((e) => { if($(e.target).is(modal)) { modal.hide(); $('#modal-body').empty(); } });
    }

    // --- SCROLL REVEAL ---
    let isScrollObserverActive = false;

    function startScrollObserver() {
        if (isScrollObserverActive) return; 
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { 
                if(e.isIntersecting) {
                    e.target.classList.add('active');
                    observer.unobserve(e.target); 
                }
            });
        }, { threshold: 0.15 }); 

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
        isScrollObserverActive = true;
    }

    // --- CANVAS (NN) ---
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particlesArray;
        let mouse = { x: null, y: null, radius: 100 }
        window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
        window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
        window.addEventListener('resize', () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initCanvas(); });

        class Particle {
            constructor(x, y, dx, dy, size) {
                this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = htmlTag.hasClass('light-mode') ? "rgba(30, 41, 59, 1)" : "rgba(255, 255, 255, 1)";
                ctx.fill();
            }
            update() {
                if (mouse.x != null) {
                    let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < mouse.radius + this.size){
                        if (mouse.x < this.x && this.x < width - 10) this.x += 3;
                        if (mouse.x > this.x && this.x > 10) this.x -= 3;
                        if (mouse.y < this.y && this.y < height - 10) this.y += 3;
                        if (mouse.y > this.y && this.y > 10) this.y -= 3;
                    }
                }
                if (this.x > width || this.x < 0) this.dx = -this.dx;
                if (this.y > height || this.y < 0) this.dy = -this.dy;
                this.x += this.dx; this.y += this.dy;
                this.draw();
            }
        }
        function initCanvas() {
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = width; canvas.height = height;
            particlesArray = [];
            let count = (width * height) / 15000;
            for (let i = 0; i < count; i++) {
                let size = (Math.random() * 2) + 1;
                let x = Math.random() * (width - size * 2) + size;
                let y = Math.random() * (height - size * 2) + size;
                let dx = (Math.random() * 0.4) - 0.2;
                let dy = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, dx, dy, size));
            }
        }
        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dist = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (dist < (width/7) * (height/7)) {
                        let opacity = 1 - (dist / 20000);
                        ctx.strokeStyle = htmlTag.hasClass('light-mode') ? 'rgba(2, 132, 199,' + opacity + ')' : 'rgba(14, 165, 233,' + opacity + ')';
                        ctx.lineWidth = 1; ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
            connect();
        }
        initCanvas(); animate();
    }

    // --- WEB3FORMS ---
    const contactForm = document.getElementById('contact-form-page');
    let formResult = document.getElementById('form-result');
    if (!formResult) {
        formResult = document.createElement('div');
        formResult.id = 'form-result';
        document.body.appendChild(formResult);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = "Sending...";
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
                let json = await response.json();
                if (response.status == 200) {
                    formResult.innerHTML = `<span>✓</span> Message Sent Successfully!`;
                    formResult.className = "show success-msg";
                    contactForm.reset();
                } else {
                    console.log(response);
                    formResult.innerHTML = `<span>⚠</span> ${json.message}`;
                    formResult.className = "show error-msg";
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = `<span>⚠</span> Something went wrong!`;
                formResult.className = "show error-msg";
            })
            .then(function() {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = "1";
                btn.style.cursor = "pointer";
                
                setTimeout(() => {
                    formResult.classList.remove('show');
                }, 4000);
            });
        });
    }

    let currentFilter = null;

    $('.cert-tag').on('click', function() {
        const clickedCategory = $(this).find('.tag-text').text().trim().toLowerCase();

        if (currentFilter === clickedCategory) {
            currentFilter = null; 
            $('.cert-tag').removeClass('active-filter');
        } else {
            currentFilter = clickedCategory;
            
            $('.cert-tag').removeClass('active-filter');
            $(`.cert-tag:contains('${$(this).find('.tag-text').text()}')`).addClass('active-filter');
        }

        filterCertificates(currentFilter);
    });

    function filterCertificates(filter) {
        $('.year-group').each(function() {
            let hasItem = false;
            
            $(this).find('.cert-item').each(function() {
                const itemCategory = $(this).find('.tag-text').text().trim().toLowerCase();
                
                if (!filter || itemCategory === filter) {
                    $(this).fadeIn(300);
                    hasItem = true;
                } else {
                    $(this).hide();
                }
            });

            hasItem ? $(this).fadeIn(400) : $(this).hide();
        });
    }
});