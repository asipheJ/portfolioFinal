$(document).ready(function () {
    // Constants
    const SCROLL_THRESHOLD_NAVBAR = 20;
    const SCROLL_THRESHOLD_BUTTON = 500;
    const NAVBAR_SELECTOR = '.navbar';
    const SCROLL_UP_BUTTON_SELECTOR = '.scroll-up-btn';
    const MENU_SELECTOR = '.navbar .menu';
    const MENU_BUTTON_SELECTOR = '.menu-btn';
    const MENU_ICON_SELECTOR = '.menu-btn i';
    const TYPING_SELECTOR = '.typing';
    const TYPING_2_SELECTOR = '.typing-2';
    const CAROUSEL_SELECTOR = '.carousel';
    const CONTACT_FORM_SELECTOR = '#contact-form';

    // Debounce function for scroll event
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Handle scroll event
    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky navbar
        if (scrollY > SCROLL_THRESHOLD_NAVBAR) {
            $(NAVBAR_SELECTOR).addClass("sticky");
        } else {
            $(NAVBAR_SELECTOR).removeClass("sticky");
        }

        // Show/hide scroll-up button
        if (scrollY > SCROLL_THRESHOLD_BUTTON) {
            $(SCROLL_UP_BUTTON_SELECTOR).addClass("show");
        } else {
            $(SCROLL_UP_BUTTON_SELECTOR).removeClass("show");
        }
    }

    // Debounced scroll event
    $(window).scroll(debounce(handleScroll, 10));

    // Slide-up script
    $(SCROLL_UP_BUTTON_SELECTOR).click(function () {
        $('html').animate({ scrollTop: 0 });
        // Remove smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    // Smooth scroll on menu items click
    $(`${MENU_SELECTOR} li a`).click(function () {
        // Reapply smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar script
    $(MENU_BUTTON_SELECTOR).click(function () {
        $(MENU_SELECTOR).toggleClass("active");
        $(MENU_ICON_SELECTOR).toggleClass("active");
    });

    // Typing text animation script
    if (typeof Typed !== 'undefined') {
        new Typed(TYPING_SELECTOR, {
            strings: ["Software Developer", "Graphic Designer", "App Developer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });

        new Typed(TYPING_2_SELECTOR, {
            strings: ["Software Developer", "Graphic Designer", "App Developer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }

    // Owl carousel script for the team section
    if ($.fn.owlCarousel) {
        $(CAROUSEL_SELECTOR).owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                },
                600: {
                    items: 2,
                    nav: false,
                },
                1000: {
                    items: 3,
                    nav: false,
                },
            },
        });
    }

    // Contact form submission
    $(CONTACT_FORM_SELECTOR).submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = {
            from_name: $('#from_name').val(),
            from_email: $('#from_email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
        };
        
        // Send email using EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData) // Replace with your Service ID and Template ID
            .then(
                function (response) {
                    alert("Message sent successfully!");
                    $(CONTACT_FORM_SELECTOR)[0].reset(); // Reset the form
                },
                function (error) {
                    alert("Failed to send the message. Please try again.");
                    console.error(error);
                }
            );
    });

    // About section tabs functionality
    $('.about-btn').click(function () {
        var idx = $(this).index();
        $('.about-btn').removeClass('active');
        $(this).addClass('active');
        $('.about-detail').removeClass('active').eq(idx).addClass('active');
    });
});

// Get elements
const modal = document.getElementById("certificateModal");
const btn = document.getElementById("viewCertificateBtn");
const span = document.getElementById("closeModal");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Also close when clicking outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// For certificate 1 (repeat for more certificates with different IDs)
const certBtn1 = document.getElementById("viewCert1");
const certModal1 = document.getElementById("certModal1");
const closeCertModal1 = document.getElementById("closeCertModal1");

certBtn1.onclick = function() {
    certModal1.style.display = "block";
}
closeCertModal1.onclick = function() {
    certModal1.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == certModal1) {
        certModal1.style.display = "none";
    }
}

for (let i = 1; i <= 5; i++) {
    document.getElementById(`viewCert${i}`).onclick = function() {
      document.getElementById(`certModal${i}`).style.display = "block";
    }
    document.getElementById(`closeCertModal${i}`).onclick = function() {
      document.getElementById(`certModal${i}`).style.display = "none";
    }
  }
  
  window.onclick = function(event) {
    for (let i = 1; i <= 5; i++) {
      const modal = document.getElementById(`certModal${i}`);
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-carousel .project-content');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let current = 0;
  
    function showProject(index) {
      projects.forEach((proj, i) => {
        proj.classList.toggle('active', i === index);
      });
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === projects.length - 1;
    }
  
    prevBtn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showProject(current);
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (current < projects.length - 1) {
        current++;
        showProject(current);
      }
    });
  
    showProject(current);
  });