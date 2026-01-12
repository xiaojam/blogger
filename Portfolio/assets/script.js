$(document).ready(function() {

    // --- CONFIG ---
    const CACHE_INTRO = 'ojam_intro_fixe00_v8'; 
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
    function applyTheme(isLight) {
        if (isLight) {
            htmlTag.addClass('light-mode');
            themeBtns.html('<i class="fas fa-moon"></i>');
        } else {
            htmlTag.removeClass('light-mode');
            themeBtns.html('<i class="fas fa-sun"></i>');
        }
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
            e.preventDefault();
            const title = $(this).data('title');
            const src = $(this).data('src');
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
});