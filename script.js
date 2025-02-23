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
});