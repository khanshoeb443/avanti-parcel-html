/* Header Background Change on Scroll */
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scrolled') 
                       : header.classList.remove('scrolled')
}
window.addEventListener('scroll', scrollHeader)

/* Scroll Sections Active Link */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/* Simple Mobile Menu Toggle */
const navToggle = document.getElementById('nav-toggle'),
      navMenu = document.getElementById('nav-menu')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu')
    })
}

/* Simple Animation on Scroll (Optional) */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-in')
        }
    })
}, { threshold: 0.1 })

document.querySelectorAll('.card, .section__title, .hero__data, .hero__tracking-box').forEach(el => observer.observe(el))

/* Banner Slider Logic */
const slides = document.querySelectorAll('.slide')
const dots = document.querySelectorAll('.dot')
const prevBtn = document.getElementById('prevSlide')
const nextBtn = document.getElementById('nextSlide')
let currentSlide = 0

const showSlide = (n) => {
    slides.forEach(slide => slide.classList.remove('active'))
    dots.forEach(dot => dot.classList.remove('active'))
    
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add('active')
    dots[currentSlide].classList.add('active')
}

if(nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1))
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1))
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx))
    })

    // Auto-play
    setInterval(() => showSlide(currentSlide + 1), 6000)
}

/* Quick Tracking Demo Funtionality */
const trackingForm = document.getElementById('trackingForm')
const trackingInput = document.getElementById('trackingInput')
const trackingResult = document.getElementById('trackingResult')

if(trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const id = trackingInput.value.toUpperCase()
        
        // Show loading
        trackingResult.innerHTML = `<div class="tracking__spinner"></div> <span style="color: #666; font-weight: 600;">Searching Global Database...</span>`
        trackingResult.classList.add('active')

        setTimeout(() => {
            if(id.startsWith('AV-')) {
                trackingResult.innerHTML = `
                    <div class="tracking__status-box">
                        <div class="tracking__status-label">Shipment Status</div>
                        <div class="tracking__status-val">📦 In Transit - Hub Arrival</div>
                        <div style="font-size: 0.8rem; margin-top: 5px; color: #444;">
                            Berlin, DE &rarr; New York, US
                        </div>
                    </div>
                `
            } else {
                trackingResult.innerHTML = `<span style="color: #e74c3c; font-weight: 800;">Invalid Tracking ID. Try "AV-12345"</span>`
            }
        }, 1500)
    })
}
