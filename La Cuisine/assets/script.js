'use strict';

/** 
 * PRELOAD
 * 
 * loading will be end after document is loaded
*/

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.classList.add("loaded");
});


/**
 * add event listners on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++ ) {
        elements[i].addEventListener(eventType, callback);
    }
}


/**
 * Navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * Header
 */

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    }
    else {
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
}

window,addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        hideHeader();
    } 
    else {
        header.classList.remove("active");
    }
})



/**
 * Hero
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    }
    else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    }
    else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);


/**
 * Auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/**
 * Parallax effect
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5

    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }


});


