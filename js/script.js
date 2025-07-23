// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Page Navigation (for folder-based structure)
function showPage(page) {
    // Handle navigation for folder-based structure
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Update active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const targetLink = Array.from(navLinks).find(link => {
        const href = link.getAttribute('href');
        return href && href.includes(page + '.html');
    });
    
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href) {
            // Extract the actual filename from href
            const linkFile = href.split('/').pop();
            
            // Check if current page matches the link
            if (currentPage === linkFile) {
                link.classList.add('active');
            }
            // Special case for index page
            else if (currentPage === 'index.html' && (href === 'index.html' || href === '../index.html' || href.includes('index.html'))) {
                link.classList.add('active');
            }
            // Handle relative paths for files in navigasi folder
            else if (currentPage === 'tentang.html' && href.includes('tentang.html')) {
                link.classList.add('active');
            }
            else if (currentPage === 'tutorial.html' && href.includes('tutorial.html')) {
                link.classList.add('active');
            }
            else if (currentPage === 'galeri.html' && href.includes('galeri.html')) {
                link.classList.add('active');
            }
            else if (currentPage === 'kontak.html' && href.includes('kontak.html')) {
                link.classList.add('active');
            }
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation on page load
    setActiveNavigation();
    
    // Smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const navMenu = document.getElementById('nav-menu');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .testimonial, .feature-card, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.innerText.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.innerText = counter.innerText.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.innerText = counter.innerText.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsNumbers = entry.target.querySelectorAll('.stat-number');
                statsNumbers.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Dynamic content loading for tutorial pages, gallery, etc.
function loadDynamicContent(page) {
    const dynamicContent = document.getElementById('dynamic-content');
    
    // This would typically load content via AJAX
    // For now, we'll just show a placeholder
    switch(page) {
        case 'tutorials':
            dynamicContent.innerHTML = `
                <section class="content-section">
                    <div class="container">
                        <h2 class="section-title">Tutorial Lengkap Segera Hadir</h2>
                        <p style="text-align: center; font-size: 1.1rem;">
                            Kami sedang menyiapkan tutorial lengkap untuk Anda. 
                            Pantau terus website ini untuk update terbaru!
                        </p>
                    </div>
                </section>
            `;
            break;
            
        case 'gallery':
            dynamicContent.innerHTML = `
                <section class="content-section">
                    <div class="container">
                        <h2 class="section-title">Galeri Proyek</h2>
                        <div class="gallery-grid">
                            <div class="gallery-item">
                                <img src="images/project1.jpg" alt="Project 1" loading="lazy">
                                <div class="gallery-overlay">
                                    <h3>Proyek Website Modern</h3>
                                    <p>Desain responsif dengan teknologi terkini</p>
                                </div>
                            </div>
                            <div class="gallery-item">
                                <img src="images/project2.jpg" alt="Project 2" loading="lazy">
                                <div class="gallery-overlay">
                                    <h3>Aplikasi Mobile</h3>
                                    <p>User interface yang intuitif dan modern</p>
                                </div>
                            </div>
                            <div class="gallery-item">
                                <img src="images/project3.jpg" alt="Project 3" loading="lazy">
                                <div class="gallery-overlay">
                                    <h3>E-commerce Platform</h3>
                                    <p>Solusi lengkap untuk bisnis online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;
            
        case 'services':
            dynamicContent.innerHTML = `
                <section class="content-section">
                    <div class="container">
                        <h2 class="section-title">Layanan Kami</h2>
                        <div class="services-grid">
                            <div class="service-card">
                                <div class="service-icon">🌐</div>
                                <h3>Pengembangan Website</h3>
                                <p>Pembuatan website modern, responsif, dan SEO-friendly untuk bisnis Anda.</p>
                                <ul>
                                    <li>Desain responsif</li>
                                    <li>Optimasi SEO</li>
                                    <li>Content Management System</li>
                                    <li>E-commerce integration</li>
                                </ul>
                            </div>
                            <div class="service-card">
                                <div class="service-icon">📱</div>
                                <h3>Aplikasi Mobile</h3>
                                <p>Pengembangan aplikasi mobile native dan hybrid untuk iOS dan Android.</p>
                                <ul>
                                    <li>Native iOS & Android</li>
                                    <li>Cross-platform development</li>
                                    <li>UI/UX Design</li>
                                    <li>App Store optimization</li>
                                </ul>
                            </div>
                            <div class="service-card">
                                <div class="service-icon">🎨</div>
                                <h3>UI/UX Design</h3>
                                <p>Desain antarmuka yang menarik dan pengalaman pengguna yang optimal.</p>
                                <ul>
                                    <li>User research</li>
                                    <li>Wireframing & prototyping</li>
                                    <li>Visual design</li>
                                    <li>Usability testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;
            
        case 'contact':
            dynamicContent.innerHTML = `
                <section class="content-section">
                    <div class="container">
                        <h2 class="section-title">Hubungi Kami</h2>
                        <div class="contact-content">
                            <div class="contact-info">
                                <div class="contact-item">
                                    <h3>📍 Alamat</h3>
                                    <p>Jl. Teknologi No. 123<br>
                                    Jakarta Selatan, DKI Jakarta<br>
                                    Indonesia 12345</p>
                                </div>
                                <div class="contact-item">
                                    <h3>📞 Telepon</h3>
                                    <p>+62 21 1234 5678<br>
                                    +62 812 3456 7890</p>
                                </div>
                                <div class="contact-item">
                                    <h3>✉️ Email</h3>
                                    <p>info@example.com<br>
                                    support@example.com</p>
                                </div>
                                <div class="contact-item">
                                    <h3>🕒 Jam Operasional</h3>
                                    <p>Senin - Jumat: 09:00 - 18:00<br>
                                    Sabtu: 09:00 - 15:00<br>
                                    Minggu: Tutup</p>
                                </div>
                            </div>
                            <div class="contact-form">
                                <form id="contactForm">
                                    <div class="form-group">
                                        <label for="name">Nama Lengkap</label>
                                        <input type="text" id="name" name="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Nomor Telepon</label>
                                        <input type="tel" id="phone" name="phone">
                                    </div>
                                    <div class="form-group">
                                        <label for="subject">Subjek</label>
                                        <select id="subject" name="subject" required>
                                            <option value="">Pilih subjek</option>
                                            <option value="general">Pertanyaan Umum</option>
                                            <option value="project">Konsultasi Proyek</option>
                                            <option value="support">Technical Support</option>
                                            <option value="partnership">Kerjasama</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Pesan</label>
                                        <textarea id="message" name="message" rows="5" required></textarea>
                                    </div>
                                    <button type="submit" class="submit-btn">Kirim Pesan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;
            
        default:
            dynamicContent.innerHTML = `
                <section class="content-section">
                    <div class="container">
                        <h2 class="section-title">Halaman Tidak Ditemukan</h2>
                        <p style="text-align: center;">Halaman yang Anda cari tidak tersedia.</p>
                    </div>
                </section>
            `;
    }
    
    // Re-initialize animations for new content
    initializeContentAnimations();
}

// Initialize animations for dynamically loaded content
function initializeContentAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe new elements
    const newElements = document.querySelectorAll('.gallery-item, .service-card, .contact-item');
    newElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form validation and submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Nama harus diisi minimal 2 karakter');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Email tidak valid');
    }
    
    if (!data.subject) {
        errors.push('Silakan pilih subjek');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Pesan harus diisi minimal 10 karakter');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Gallery lightbox functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            showLightbox(this.src, this.alt);
        });
    });
}

function showLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.lightbox')) {
            document.querySelector('.lightbox').remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
}

function performSearch(query) {
    // This would typically make an API call
    // For now, we'll simulate search results
    const mockResults = [
        { title: 'Tutorial HTML Dasar', url: '#tutorials', excerpt: 'Pelajari dasar-dasar HTML untuk pemula' },
        { title: 'CSS Grid Layout', url: '#tutorials', excerpt: 'Cara menggunakan CSS Grid untuk layout modern' },
        { title: 'JavaScript ES6+', url: '#tutorials', excerpt: 'Fitur-fitur terbaru JavaScript yang wajib dikuasai' }
    ];
    
    const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(filteredResults);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>Tidak ada hasil yang ditemukan.</p>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}">${result.title}</a></h4>
                <p>${result.excerpt}</p>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(function() {
            if (originalHandler) {
                originalHandler();
            }
        });
    });
    
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavigation(); // Set active nav on page load
    initializeContactForm();
    initializeGallery();
    initializeLazyLoading();
    initializeSearch();
    optimizePerformance();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadDynamicContent(event.state.page);
    }
});

// Export functions for global use (if needed)
window.toggleMobileMenu = toggleMobileMenu;
window.showPage = showPage;
window.setActiveNavigation = setActiveNavigation;
window.loadDynamicContent = loadDynamicContent;