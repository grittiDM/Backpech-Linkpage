/* ===================================
   Funções Principais
=================================== */

// Typewriter Effect
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1500;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

// Octogon Adjustment
function adjustOctogons() {
  const cards = document.querySelectorAll('.card-box');
  cards.forEach(card => {
    const width = card.offsetWidth;
    card.style.height = `${width * 0.35}px`;
    
    if (width < 300) {
      card.style.clipPath = 'polygon(7% 0%, 93% 0%, 100% 28%, 100% 72%, 93% 100%, 7% 100%, 0% 72%, 0% 28%)';
    } else {
      card.style.clipPath = 'polygon(5% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 5% 100%, 0% 80%, 0% 20%)';
    }
  });
}

// Preload Images
function preloadImages() {
  const images = [
    'assets/images/icons/whatsapp.png',
    'assets/images/icons/instagram.png',
    'assets/images/icons/facebook.png',
    'assets/images/icons/website.png',
    'assets/images/icons/github.png',
    'assets/images/icons/linkedin.png'
  ];
  
  images.forEach(src => {
    new Image().src = src;
  });
}

// Initialize
window.addEventListener('load', () => {
  // Typewriter Effect
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Add cursor style
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #f9f5d7 }';
  document.body.appendChild(style);

  // Splash Screen
  setTimeout(() => {
    $('#splash-screen').fadeOut('slow', () => {
      $('#main-content').fadeIn('slow');
      adjustOctogons();
    });
  }, 2000);

  // Preload images
  preloadImages();
});

// Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    adjustOctogons();
  }, 250);
});

// Profile Image Animation
$(document).ready(function() {
  $('.profile-img').hover(
    function() { $(this).addClass('animate__animated animate__pulse'); },
    function() { $(this).removeClass('animate__animated animate__pulse'); }
  );
});