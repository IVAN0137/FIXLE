/**
 * FIXLE - Soluciones Ortopédicas Sostenibles
 * Archivo JavaScript principal - Completamente Responsive
 * Desarrollado por: FIXLE Team
 * Versión: 2.1
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Inicializar la biblioteca AOS para animaciones al scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 ? true : false // Desactivar en móviles para mejor rendimiento
    });
    
    // Referencias a elementos del DOM
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const successToast = document.getElementById('success-toast');
    const productDetailsBtns = document.querySelectorAll('.product-details-btn');
    const productModal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // ===== Funcionalidad del menú móvil =====
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
            
            // Cambiar el ícono del botón
            const svg = this.querySelector('svg');
            if (expanded) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
            
            // Prevenir scroll cuando el menú está abierto
            if (!expanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar el menú móvil al hacer clic en un enlace
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar el menú móvil al redimensionar la ventana a tamaño desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024) { // lg breakpoint
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== Cambio de estilo del header al hacer scroll =====
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Mostrar/ocultar botón de volver arriba
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('flex');
            } else {
                backToTopButton.classList.add('hidden');
                backToTopButton.classList.remove('flex');
            }
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Ejecutar una vez al cargar para manejar recargas
    handleHeaderScroll();
    
    // ===== Cambio de tema claro/oscuro =====
    if (themeToggle) {
        // Verificar si hay una preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Aplicar tema guardado o preferencia del sistema
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            document.documentElement.classList.add('dark');
            updateThemeIcon(true);
        }
        
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
        
        // Función para actualizar el ícono del toggle
        function updateThemeIcon(isDark) {
            const svg = themeToggle.querySelector('svg');
            if (isDark) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
            }
        }
        
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                    updateThemeIcon(true);
                } else {
                    document.documentElement.classList.remove('dark');
                    updateThemeIcon(false);
                }
            }
        });
    }
    
    // ===== Botón de volver arriba =====
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Añadir soporte para teclado
        backToTopButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===== Manejo del formulario de contacto =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación del formulario
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Añadir mensaje de error si no existe
                    const errorId = `${field.id}-error`;
                    if (!document.getElementById(errorId)) {
                        const errorMsg = document.createElement('p');
                        errorMsg.id = errorId;
                        errorMsg.className = 'text-red-500 text-xs mt-1';
                        errorMsg.textContent = 'Este campo es obligatorio';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    const errorMsg = document.getElementById(`${field.id}-error`);
                    if (errorMsg) errorMsg.remove();
                }
            });
            
            // Validación específica para email
            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('border-red-500');
                    
                    const errorId = `${emailField.id}-error`;
                    if (!document.getElementById(errorId)) {
                        const errorMsg = document.createElement('p');
                        errorMsg.id = errorId;
                        errorMsg.className = 'text-red-500 text-xs mt-1';
                        errorMsg.textContent = 'Por favor, introduce un email válido';
                        emailField.parentNode.appendChild(errorMsg);
                    }
                }
            }
            
            if (!isValid) return;
            
            // Simulación de envío de formulario
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Aquí iría la lógica real de envío del formulario
            console.log('Formulario enviado:', formValues);
            
            // Mostrar mensaje de éxito
            contactForm.reset();
            showSuccessToast();
        });
        
        // Eliminar mensajes de error al escribir
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('border-red-500');
                const errorMsg = document.getElementById(`${this.id}-error`);
                if (errorMsg) errorMsg.remove();
            });
        });
    }
    
    // Función para mostrar el toast de éxito
    function showSuccessToast() {
        if (successToast) {
            successToast.classList.remove('hidden');
            setTimeout(() => {
                successToast.classList.add('toast-visible');
            }, 100);
            
            setTimeout(() => {
                successToast.classList.remove('toast-visible');
                setTimeout(() => {
                    successToast.classList.add('hidden');
                }, 500);
            }, 3000);
        }
    }
    
    // ===== Modal de detalles de producto =====
    if (productDetailsBtns.length > 0 && productModal && modalContent && closeModal) {
        // Datos de productos (en un proyecto real, esto vendría de una API o base de datos)
        const productData = {
            'ferula-muneca': {
                name: 'Férula de Muñeca FIXLE Pro',
                description: 'Nuestra férula de muñeca premium fabricada con fibras de ixtle y reforzada con biopolímeros para proporcionar el soporte óptimo durante la recuperación. Diseñada para máxima comodidad y durabilidad.',
                features: [
                    'Ultraligera - 75% más ligera que el yeso tradicional',
                    'Completamente resistente al agua',
                    'Transpirable para evitar irritaciones',
                    'Ajuste personalizado para cada paciente',
                    'Compatible con la app de monitoreo FIXLE'
                ],
                price: '$1,250 MXN',
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            'ferula-tobillo': {
                name: 'Férula de Tobillo FIXLE Air',
                description: 'Férula de tobillo de última generación diseñada con una mezcla innovadora de ixtle y materiales reciclados. Proporciona soporte óptimo mientras permite la movilidad necesaria para una recuperación efectiva.',
                features: [
                    'Diseño anatómico para mayor comodidad',
                    'Sistema de ventilación integrado',
                    'Ajuste personalizable con sistema de correas',
                    'Suela antideslizante para mayor seguridad',
                    'Monitoreo de recuperación mediante sensores integrados'
                ],
                price: '$1,450 MXN',
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            'ferula-codo': {
                name: 'Férula de Codo FIXLE Flex',
                description: 'Soporte para codo ligero y resistente fabricado con fibras de ixtle tratadas para mayor durabilidad y flexibilidad. Ideal para lesiones deportivas y recuperación postoperatoria.',
                features: [
                    'Sistema de ajuste progresivo para control de movilidad',
                    'Diseño ergonómico que se adapta a la anatomía del brazo',
                    'Material hipoalergénico y antibacteriano',
                    'Incluye almohadillas de gel para puntos de presión',
                    'Fácil de colocar y retirar sin asistencia'
                ],
                price: '$1,350 MXN',
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        };
        
        // Abrir modal con detalles del producto
        productDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.product;
                const product = productData[productId];
                
                if (product) {
                    // Construir contenido del modal
                    let featuresHTML = '';
                    product.features.forEach(feature => {
                        featuresHTML += `
                            <li class="flex items-start mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>${feature}</span>
                            </li>
                        `;
                    });
                    
                    // Contenido responsive para diferentes tamaños de pantalla
                    modalContent.innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded-lg shadow-md">
                                <div class="md:hidden mt-4">
                                    <span class="text-2xl font-bold text-primary-600">${product.price}</span>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-2xl font-heading font-bold mb-2">${product.name}</h3>
                                <p class="text-gray-600 mb-4">${product.description}</p>
                                <h4 class="font-semibold text-lg mb-2">Características:</h4>
                                <ul class="mb-6">
                                    ${featuresHTML}
                                </ul>
                                <div class="hidden md:flex justify-between items-center">
                                    <span class="text-2xl font-bold text-primary-600">${product.price}</span>
                                    <button class="btn-primary">Solicitar información</button>
                                </div>
                                <div class="md:hidden mt-4">
                                    <button class="btn-primary w-full">Solicitar información</button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Mostrar modal
                    productModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Prevenir scroll
                    
                    // Animar entrada
                    setTimeout(() => {
                        modalContent.parentElement.classList.add('animate-fade-in');
                    }, 10);
                    
                    // Asegurarse de que el modal sea accesible
                    closeModal.focus();
                }
            });
        });
        
        // Cerrar modal
        closeModal.addEventListener('click', closeProductModal);
        
        // Cerrar modal al hacer clic fuera del contenido
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
        
        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
                closeProductModal();
            }
        });
        
        function closeProductModal() {
            modalContent.parentElement.classList.remove('animate-fade-in');
            setTimeout(() => {
                productModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restaurar scroll
            }, 300);
        }
    }
    
    // ===== Animación de contadores de estadísticas =====
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px' // Activar un poco antes para mejor experiencia
        };
        
        // Usar IntersectionObserver para activar la animación cuando los elementos sean visibles
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.dataset.count);
                    
                    // No animar en dispositivos con preferencia de movimiento reducido
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        target.textContent = countTo;
                    } else {
                        animateCounter(target, 0, countTo, 2000);
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
        
        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentCount = Math.floor(progress * (end - start) + start);
                element.textContent = currentCount;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }
    
    // ===== Smooth scroll para enlaces de navegación =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuButton) {
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                        const svg = mobileMenuButton.querySelector('svg');
                        if (svg) {
                            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                        }
                    }
                    document.body.style.overflow = '';
                }
                
                // Calcular offset para header fijo
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll suave al elemento
                window.scrollTo({
                    top: targetPosition,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, '', targetId);
            }
        });
    });
    
    // ===== Resaltar enlace de navegación activo =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary-600');
                    link.classList.remove('font-semibold');
                    link.setAttribute('aria-current', 'false');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-primary-600');
                        link.classList.add('font-semibold');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }
    
    // Throttle para mejorar rendimiento
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                highlightNavLink();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    highlightNavLink(); // Ejecutar una vez al cargar
    
    // ===== Inicialización de componentes adicionales =====
    initLazyLoading();
    
    // Función para inicializar carga perezosa de imágenes
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores que no soportan IntersectionObserver
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    // ===== Detección de preferencias del sistema =====
    // Detectar si es un dispositivo táctil
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // ===== Optimizaciones para dispositivos móviles =====
    
    // Mejorar experiencia táctil en dispositivos móviles
    if (isTouchDevice()) {
        // Aumentar área táctil para botones y enlaces
        document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-link, .mobile-nav-link').forEach(el => {
            el.style.minHeight = '44px'; // Mínimo recomendado para áreas táctiles
        });
        
        // Desactivar hover en dispositivos táctiles para mejorar rendimiento
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @media (hover: none) {
                .btn-primary:hover, .btn-secondary:hover, .product-card:hover, .benefit-card:hover {
                    transform: none !important;
                    box-shadow: inherit !important;
                }
                
                .product-card .group-hover\\:scale-105 {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // ===== Mejoras de accesibilidad =====
    
    // Asegurar que todos los elementos interactivos tengan roles y atributos ARIA apropiados
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Botón');
        }
    });
    
    // Mejorar accesibilidad de formularios
    document.querySelectorAll('input, textarea, select').forEach(field => {
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (!label && !field.hasAttribute('aria-label')) {
            field.setAttribute('aria-label', field.placeholder || 'Campo de formulario');
        }
    });
    
    // ===== Optimizaciones de rendimiento =====
    
    // Cargar AOS solo cuando sea necesario
    if (window.innerWidth < 768) {
        // Desactivar AOS en móviles para mejor rendimiento
        if (typeof AOS !== 'undefined') {
            AOS.init({
                disable: true
            });
        }
    }
    
    // Optimizar imágenes para diferentes dispositivos
    function optimizeImages() {
        const isMobile = window.innerWidth < 768;
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.dataset.mobile && isMobile) {
                img.src = img.dataset.mobile;
            } else if (img.dataset.desktop && !isMobile) {
                img.src = img.dataset.desktop;
            }
        });
    }
    
    optimizeImages();
    window.addEventListener('resize', optimizeImages);
    
    // ===== Gestión de errores =====
    
    // Capturar y registrar errores
    window.addEventListener('error', function(e) {
        console.error('Error capturado:', e.error);
        // Aquí se podría implementar un sistema de registro de errores
    });
    
    // Manejar errores de carga de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
});