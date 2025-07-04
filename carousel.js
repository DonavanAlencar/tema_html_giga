/**
 * Carousel.js - Sistema de Carrossel Refatorado
 * Funcionalidades: Autoplay, Controles manuais, Indicadores, Suporte a teclado e touch
 */

class Carousel {
    constructor(containerSelector = '#hero', options = {}) {
        this.container = document.querySelector(containerSelector);
        this.slides = this.container.querySelectorAll('.slide');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        // Configurações padrão
        this.config = {
            autoPlayDelay: options.autoPlayDelay || 5000,
            transitionDuration: options.transitionDuration || 1000,
            enableAutoPlay: options.enableAutoPlay !== false,
            enableKeyboard: options.enableKeyboard !== false,
            enableTouch: options.enableTouch !== false,
            enableIndicators: options.enableIndicators !== false
        };
        
        this.init();
    }

    init() {
        if (this.totalSlides === 0) {
            console.warn('Carousel: Nenhum slide encontrado');
            return;
        }

        this.setupSlides();
        this.updateIndicators();
        
        if (this.config.enableAutoPlay) {
            this.startAutoPlay();
        }
        
        if (this.config.enableKeyboard) {
            this.addKeyboardSupport();
        }
        
        if (this.config.enableTouch) {
            this.addTouchSupport();
        }
        
        if (this.config.enableIndicators) {
            this.setupIndicators();
        }
    }

    setupSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.transition = `opacity ${this.config.transitionDuration}ms ease-in-out, transform ${this.config.transitionDuration}ms ease-in-out`;
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            
            if (index !== 0) {
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
            }
        });
    }

    showSlide(index) {
        if (index < 0 || index >= this.totalSlides) {
            return;
        }

        // Esconde todos os slides
        this.slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.classList.remove('active');
        });

        // Mostra o slide atual
        this.slides[index].style.opacity = '1';
        this.slides[index].style.visibility = 'visible';
        this.slides[index].classList.add('active');
        
        this.currentSlide = index;
        this.updateIndicators();
        
        // Dispara evento customizado
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: index, totalSlides: this.totalSlides }
        }));
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    updateIndicators() {
        if (!this.config.enableIndicators) return;
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    setupIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
    }

    startAutoPlay() {
        if (!this.config.enableAutoPlay) return;
        
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.config.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        if (this.config.enableAutoPlay) {
            this.startAutoPlay();
        }
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.restartAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.restartAutoPlay();
            }
        });
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });

        this.container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
            isDragging = false;
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe para esquerda - próximo slide
                this.nextSlide();
            } else {
                // Swipe para direita - slide anterior
                this.prevSlide();
            }
            this.restartAutoPlay();
        }
    }

    // Métodos públicos para controle externo
    play() {
        this.startAutoPlay();
    }

    pause() {
        this.stopAutoPlay();
    }

    destroy() {
        this.stopAutoPlay();
        // Remove event listeners se necessário
    }
}

// Funções globais para compatibilidade com HTML inline
window.changeSlide = function(direction) {
    if (window.heroCarousel) {
        if (direction > 0) {
            window.heroCarousel.nextSlide();
        } else {
            window.heroCarousel.prevSlide();
        }
        window.heroCarousel.restartAutoPlay();
    }
};

window.goToSlide = function(index) {
    if (window.heroCarousel) {
        window.heroCarousel.goToSlide(index);
        window.heroCarousel.restartAutoPlay();
    }
};

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrossel principal
    window.heroCarousel = new Carousel('#hero', {
        autoPlayDelay: 5000,
        transitionDuration: 1000,
        enableAutoPlay: true,
        enableKeyboard: true,
        enableTouch: true,
        enableIndicators: true
    });

    // Pausar autoplay quando o mouse está sobre o carrossel
    const heroSection = document.getElementById('hero');
    if (heroSection && window.heroCarousel) {
        heroSection.addEventListener('mouseenter', () => {
            window.heroCarousel.pause();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            window.heroCarousel.play();
        });
    }
}); 