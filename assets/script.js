/*==========================================================================
  Summary
==========================================================================

  1. Construtor e Animação de Digitação
  2. Carregamento de Janela Event Handler
  3. Documento Pronto Event Handlers
    3.1 Splash Screen Fade Out
    3.2 Toggle Profile Image Class

==========================================================================*/

// Constructor function para animação de digitação
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1500; // Default period is 2000 milliseconds
  this.txt = "";
  this.tick(); // Start typing animation
  this.isDeleting = false;
};

// Método para lidar com a animação de digitação
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  // Update do texto
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Update do Elemento HTML
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  // Ajuste do delta baseado no estado de digitação
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  // Programação para o próximo update
  setTimeout(function () {
    that.tick();
  }, delta);
};

// Run quando a tela está carregada
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period); // Initialize typing animation
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #f9f5d7}";
  document.body.appendChild(css); // Add CSS for typing effect
};

// Run quando o documento estiver pronto
$(document).ready(function () {
  // Show splash screen and fade out
  $("#splash-screen").delay(500).fadeOut("slow", function () {
    // Fade out the splash screen and show the main content
    $("#main-content").fadeIn("slow");
  });
});

// Run quando o documento estiver pronto
$(document).ready(function () {
  const box = $(".profile-img");
  box.toggleClass(".profile-img-rev"); // Toggle a CSS class for the profile image
});

$(document).ready(function () {
  // Pré-carrega os ícones
  function preloadImages() {
    const imageUrls = [
      'assets/images/icons/whatsapp.png',
      'assets/images/icons/instagram.png',
      'assets/images/icons/facebook.png',
      'assets/images/icons/website.png',
      'assets/images/icons/github.png',
      'assets/images/icons/linkedin.png'
    ];

    imageUrls.forEach(url => {
      new Image().src = url;
    });
  }

  preloadImages();
});

// Abre um Popup quando clica na sessão
function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function copyText() {
  const textToCopy = document.querySelector('.popup-content p').innerText;

  // Cria uma áre de texto para preparar o texto que será copiado
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  // Seleciona e cola o texto
  textarea.select();
  document.execCommand('copy');

  // Remove o texto
  document.body.removeChild(textarea);
}