// 1. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and X
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// 2. Smooth Scrolling & Menu Auto-Close
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        }

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Offset for the fixed glassy header
        const headerOffset = 70; 
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// 3. Scroll Reveal Animations (Landing Page Effect)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // Trigger point

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        // If element is in viewport, add 'active' class to trigger CSS transition
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

// Trigger once on load, then on scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// 4. Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();