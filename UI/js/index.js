var firebaseConfig = {
    apiKey: "AIzaSyBjSRw5jt8aYRR_r_-w4Lf70gyupn9Cb30",
    authDomain: "my-brand-952d2.firebaseapp.com",
    databaseURL: "https://my-brand-952d2.firebaseio.com",
    projectId: "my-brand-952d2",
    storageBucket: "my-brand-952d2.appspot.com",
    messagingSenderId: "171321376470",
    appId: "1:171321376470:web:60345e7c7733e137611377",
    measurementId: "G-SQ64FYKLYP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase variables
const auth = firebase.auth()
const db = firebase.firestore()

// declaration of variables 
let homeSection = document.querySelector('#home-section')
let navBar = document.querySelector('.nav-links')
let nav = document.querySelector('nav')
let navLinks = document.querySelectorAll('a')
const bars = document.querySelector('.bars')
const contactForm = document.querySelector('.contact-form')
const feedBack = document.querySelector('.feedback')
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

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


// handling contact form data
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    validateInputs()
})

function validateInputs() {
    let contactName = document.querySelector('.name')
    let email = document.querySelector('.email')
    let message = document.querySelector(".message")
    let alertMessage = document.querySelector(".alert-message")
    let errorMessage = document.querySelector(".error-message")
    try {
        // get contact form data
        contactName = contactName.value.trim()
        email = email.value.trim()
        message = message.value.trim()
            // form fields validation 


        if (contactName.length < 3 && contactName.length > 0 || contactName === "") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Minimum 3 characters required for name"
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = "none"
                contactName.classList.remove('.error')

            }, 5000)
        } else if (message.length < 10 && message.length > 0 || message === "") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Minimum 10 characters required for message"
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = ""
            }, 5000)
        } else if (!isEmail(email)) {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Invalid email"
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = ""
            }, 5000)
        } else {

            // create contact message in firebase database
            db.collection('contacts').add({
                name: contactName,
                email: email,
                message: message,
            })
            contactForm.reset()
            alertMessage.style.display = "block"
            setTimeout(() => {
                alertMessage.style.display = ""
            }, 5000)

        }

    } catch (error) {


    }
}

function isEmail(email) {
    return emailRegex.test(email)
}