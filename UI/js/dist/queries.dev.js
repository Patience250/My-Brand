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
var db = firebase.firestore(); //   tracking user auth status

auth.onAuthStateChanged(function (user) {
  console.log(user);
}); //   get data from firebase 

var contactList = document.querySelector(".queries-container");
var queryMessage = document.querySelector(".query-message");
var singleQuery = document.querySelector(".single-query");
var senderName = document.querySelector(".sender-name");
var senderEmail = document.querySelector(".sender-email");

var setContacts = function setContacts(doc) {
  var div = document.createElement('div');
  var divSenderName = document.createElement('div');
  var divSenderEmail = document.createElement('div');
  var divMessage = document.createElement('div');
  var divDate = document.createElement('div');
  var parDate = document.createElement('p');
  var divAuthor = document.createElement('div');
  div.setAttribute('data-id', doc.id);
  div.classList.add('single-query');
  divDate.classList.add("date");
  parDate.textContent = doc.data().date;
  divAuthor.classList.add("author");
  divSenderName.textContent = doc.data().name;
  divSenderName.classList.add('sender-name');
  divSenderEmail.textContent = doc.data().email;
  divSenderEmail.classList.add('sender-email');
  divMessage.textContent = doc.data().message;
  divMessage.classList.add('query-message');
  divAuthor.appendChild(divSenderName);
  divAuthor.appendChild(divSenderEmail);
  divDate.appendChild(parDate);
  div.appendChild(divDate);
  div.appendChild(divAuthor);
  div.appendChild(divMessage);
  contactList.appendChild(div);
}; // retrieve queries from firebase collections based on authentication


auth.onAuthStateChanged(function (user) {
  // if (user) {
  //     db.collection('contacts').get().then(snapshot => {
  //         snapshot.docs.forEach(doc => {
  //             setContacts(doc)
  //             showAndHideNavLinks(user);
  //         })
  //     })
  db.collection('contacts').get().then(function (snapshot) {
    snapshot.docs.forEach(function (doc) {
      setContacts(doc);
    });
  }); //    else {
  //         setContacts([])
  //     }
}); // Navbar

var homeSection = document.querySelector('#home-section');
var navBar = document.querySelector('.nav-links');
var nav = document.querySelector('nav');
var navLinks = document.querySelectorAll('a');
var bars = document.querySelector('.bars');
var contactForm = document.querySelector('.contact-form');
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
});