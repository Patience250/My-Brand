"use strict";

var navBar = document.querySelector('.nav-links');
var nav = document.querySelector('nav');
var navLinks = document.querySelectorAll('a');
var bars = document.querySelector('.bars');
window.addEventListener("scroll", function () {
  console.log(window.pageYOffset);

  if (window.pageYOffset >= 100) {
    nav.classList.add('change-navbar');
    navLinks.forEach(function (navLink) {
      navLink.classList.add('change-nav-links');
    });
  } else {
    nav.classList.remove('change-navbar');
    navLinks.forEach(function (navLink) {
      navLink.classList.remove('change-nav-links');
    });
  }
}); // show & hide nav links

bars.addEventListener('click', function () {
  navBar.classList.toggle('show-links');
});