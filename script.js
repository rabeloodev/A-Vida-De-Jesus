gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.timeline-section').forEach((section) => {
        const infoBlock = section.querySelector('.info-block');
        const imageBlock = section.querySelector('.image-block');
        
        const isLeft = section.classList.contains('section-left');
        const xOffset = isLeft ? -50 : 50;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                onEnter: () => section.classList.add('is-active'),
                onLeaveBack: () => section.classList.remove('is-active')
            }
        });

        tl.fromTo(infoBlock, 
            { opacity: 0, x: xOffset },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        ).fromTo(imageBlock, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        );
    });

    document.querySelectorAll('.timeline-section').forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 40%",
            end: "bottom 40%",
            onEnter: () => updateActiveNav(section.id),
            onEnterBack: () => updateActiveNav(section.id)
        });
    });

    function updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(btn => {
            if (btn.getAttribute('data-target') === id) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.nav-item').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const navHeight = document.getElementById('sticky-nav').offsetHeight;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});