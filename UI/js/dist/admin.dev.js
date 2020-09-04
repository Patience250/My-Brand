"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyBjSRw5jt8aYRR_r_-w4Lf70gyupn9Cb30",
  authDomain: "my-brand-952d2.firebaseapp.com",
  databaseURL: "https://my-brand-952d2.firebaseio.com",
  projectId: "my-brand-952d2",
  storageBucket: "my-brand-952d2.appspot.com",
  messagingSenderId: "171321376470",
  appId: "1:171321376470:web:60345e7c7733e137611377",
  measurementId: "G-SQ64FYKLYP"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig); //   firebase variables

var auth = firebase.auth();
var db = firebase.database();
var homeSection = document.querySelector('#home-section');
var navBar = document.querySelector('.nav-links');
var nav = document.querySelector('nav');
var navLinks = document.querySelectorAll('a');
var bars = document.querySelector('.bars');
var logoutLink = document.querySelector('.logout');
window.addEventListener("scroll", function () {
  console.log(window.pageYOffset);

  if (window.pageYOffset >= 540) {
    nav.classList.add('change-navbar');
    navLinks.forEach(function (navLink) {
      navLink.classList.add('change-nav-links');
      bars.style.color = "white";
    });
  } else {
    nav.classList.remove('change-navbar');
    navLinks.forEach(function (navLink) {
      navLink.classList.remove('change-nav-links');
      bars.style.color = "black";
    });
  }
}); // show & hide nav links

bars.addEventListener('click', function () {
  navBar.classList.toggle('show-links');
}); //   tracking user auth status

auth.onAuthStateChanged(function (user) {
  if (user) {
    logoutLink.style.display = "block";
  } else {
    logoutLink.style.display = "none";
  }
}); // log out

logoutLink.addEventListener('click', function (e) {
  e.preventDefault();
  auth.signOut().then(function () {
    window.location.href = 'login.html';
    console.log("You have been logged out of the system. Hope to see you back.");
  });
});