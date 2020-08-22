let homeSection = document.querySelector('#home-section')
let navBar = document.querySelector('.nav-links')
let nav = document.querySelector('nav')
let navLinks = document.querySelectorAll('a')
const bars = document.querySelector('.bars')
const contactForm = document.querySelector('.contact-form')
window.addEventListener("scroll", () => {

        console.log(window.pageYOffset)
        if (window.pageYOffset >= 540) {
            nav.classList.add('change-navbar')
            navLinks.forEach(navLink => {
                navLink.classList.add('change-nav-links')
                bars.style.color = "white"
            })
        } else {
            nav.classList.remove('change-navbar')
            navLinks.forEach(navLink => {
                navLink.classList.remove('change-nav-links')
                bars.style.color = "black"
            })
        }
    })
    // show & hide nav links
bars.addEventListener('click', () => {
        navBar.classList.toggle('show-links')

    })
    // handling contact form data
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
})




// Slides ---portofolio section


const body = document.querySelector('body')
body.addEventListener('load', () => {
    console.log("Loadeds")
})
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


// Slides ---blog section


var slideBlogIndex = 1;
showBlogSlides(slideBlogIndex);

// Next/previous controls
function plusBlogSlides(n) {
    showBlogSlides(slideBlogIndex += n);
}

// Thumbnail image controls
function currentBlogSlide(n) {
    showBlogSlides(slideBlogIndex = n);
}

function showBlogSlides(n) {
    var i;
    var slides = document.getElementsByClassName("myBlogSlides");
    if (n > slides.length) { slideBlogIndex = 1 }
    if (n < 1) { slideBlogIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideBlogIndex - 1].style.display = "block";
}