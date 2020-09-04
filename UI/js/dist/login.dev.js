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
var db = firebase.database(); //   tracking user auth status

auth.onAuthStateChanged(function (user) {
  console.log(user);
}); // login 

var loginForm = document.querySelector('#loginform');
var authErrorPar = document.querySelector('.auth-error');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); //  grab user data

  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    if (cred.user) {
      window.location.href = "../admin/index.html";
    } else {
      window.location.href = 'login.html';
    }

    loginForm.reset();
  })["catch"](function (error) {
    authErrorPar.style.display = "block";
    authErrorPar.innerHTML = error.message;
    setTimeout(function () {
      authErrorPar.innerHTML = "";
      authErrorPar.style.display = "none";
    }, 4000);
  });
});