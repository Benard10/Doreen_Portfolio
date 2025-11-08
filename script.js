document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenu.classList.toggle('hidden');
        // Update aria-expanded attribute for accessibility
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
    Array.from(mobileMenuLinks).forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // Close menu on click
            mobileMenuButton.setAttribute('aria-expanded', 'false'); // Ensure state is correct
        });
    });

    // Highlight active navigation link on scroll
    const desktopNavLinks = document.querySelectorAll('nav.container > div.hidden.md\\:flex a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    const allNavLinks = [...desktopNavLinks, ...mobileNavLinks]; // Combine all navigation links
    const sections = document.querySelectorAll('section[id]');
    const setActiveLink = (sectionId) => {
        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href.substring(1); // e.g., 'about-me'
            const isActive = targetId === sectionId;

            // Handle the 'Contact' button styling
            if (link.classList.contains('bg-primary') || link.classList.contains('bg-secondary')) {
                link.classList.toggle('bg-primary', !isActive);
                link.classList.toggle('bg-secondary', isActive);
            } 
            // Handle regular text link styling
            else {
                link.classList.toggle('text-gray-600', !isActive);
                link.classList.toggle('text-primary', isActive);
                link.classList.toggle('font-bold', isActive);
            }
        });
    };

    // --- Intersection Observer for Skill Bars ---
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the bar is visible

    skillBars.forEach(bar => skillBarObserver.observe(bar));

    // --- Intersection Observer for Nav Highlighting ---
    const header = document.querySelector('header');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                setActiveLink(sectionId);
            }
        });
    }, {
        rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, // Offset by header height
        threshold: 0.4 // Trigger when 40% of the section is visible below the header
    });

    sections.forEach(section => {
        if (section.id) navObserver.observe(section);
    });

    // Set current year in footer
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // --- Contact Form to WhatsApp ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const whatsAppNumber = '254720117386';

            // Get form values
            const name = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Construct the message for WhatsApp
            const fullMessage = `Hello Doreen, I'm contacting you from your portfolio.\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Subject:* ${subject}\n\n*Message:*\n${message}`;

            const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(fullMessage)}`;

            window.open(whatsappUrl, '_blank');
            this.reset();
        });
    }
});