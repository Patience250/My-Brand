let homeSection = document.querySelector('#home-section')
let navBar = document.querySelector('.nav-links')
let nav = document.querySelector('nav')
let navLinks = document.querySelectorAll('a')
const bars = document.querySelector('.bars')
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

bars.addEventListener('click', () => {
    navBar.classList.toggle('show-links')

})