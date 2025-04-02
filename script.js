// Define toggleSidebar function at the top
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        console.log('Toggling sidebar...'); // Debug log
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when sidebar is open
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    } else {
        console.error('Sidebar or overlay not found');
    }
}

// Typing Animation
function initTypingAnimation() {
    console.log('Initializing typing animation...'); // Debug log
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');

    if (!typingText || !typingCursor) {
        console.error('Typing animation elements not found:', {
            typingText: !!typingText,
            typingCursor: !!typingCursor
        });
        return;
    }

    console.log('Typing elements found, starting animation...'); // Debug log

    const roles = ["Software Developer", "Web Designer", "Web Developer", "Database Engineer"];
    let currentIndex = 0;
    let charIndex = 0;

    function typeText() {
        if (currentIndex < roles.length) {
            const currentRole = roles[currentIndex];
            if (charIndex < currentRole.length) {
                typingText.textContent += currentRole.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            } else {
                // After typing a role, wait and clear it
                setTimeout(() => {
                    typingText.textContent = "";
                    currentIndex++;
                    charIndex = 0;
                    if (currentIndex < roles.length) {
                        setTimeout(typeText, 500);
                    } else {
                        // All roles are typed, restart the animation
                        setTimeout(() => {
                            currentIndex = 0;
                            charIndex = 0;
                            typeText();
                        }, 1000);
                    }
                }, 2000);
            }
        }
    }

    // Start the typing animation
    typeText();
    console.log('Typing animation started'); // Debug log
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Create overlay element if it doesn't exist
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        console.log('Overlay created'); // Debug log
    }

    // Sidebar functionality
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }

    // Add event listeners for menu toggle button
    const menuToggle = document.querySelector('.menu-toggle button');
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
        console.log('Menu toggle button event listener added'); // Debug log
    }

    // Add event listener for close button
    const closeButton = document.querySelector('.close-sidebar');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
        console.log('Close button event listener added'); // Debug log
    }

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });
    console.log('Overlay click event listener added'); // Debug log

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Handle sidebar links
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                toggleSidebar(); // Close sidebar
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Wait for sidebar close animation
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 950 && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }, 250);
    });

    // Initialize section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // Start typing animation
    initTypingAnimation();

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            console.log('Form submitted:', { name, email, message });
            alert('Thank you for reaching out! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});

// Handle contact options toggle
function handleContactOptions() {
    const contactOptions = document.getElementById('contact-options');
    if (contactOptions) {
        contactOptions.style.display = contactOptions.style.display === 'none' ? 'block' : 'none';
        if (contactOptions.style.display === 'block') {
            contactOptions.classList.add('active');
            contactOptions.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            contactOptions.classList.remove('active');
        }
    }
}

// CV download handling
function handleCVDownload() {
    const password = prompt("Please enter the password to download the CV:");
    const correctPassword = "Shadow2918";

    if (password === correctPassword) {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        document.body.appendChild(loadingIndicator);

        setTimeout(() => {
            window.location.href = "../files/Salifu Foday Kamara CV.pdf";
            loadingIndicator.remove();
        }, 1500);
    } else {
        alert("Incorrect password. Please try again.");
    }
} 