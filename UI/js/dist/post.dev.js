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
var db = firebase.firestore(); // declaration of variables 

var homeSection = document.querySelector('#home-section');
var navBar = document.querySelector('.nav-links');
var nav = document.querySelector('nav');
var navLinks = document.querySelectorAll('a');
var bars = document.querySelector('.bars');
var blogForm = document.querySelector('#blog-form');
var submitButton = document.querySelector("button");
var feedBack = document.querySelector('.feedback');
var logoutLink = document.querySelector('.logout');
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
}); // handling contact form data

blogForm.addEventListener('submit', function (e) {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  var blogTitle = document.querySelector('#post-title');
  var blogBody = document.querySelector("#post-message");
  var blogImage = document.querySelector("#post-image").files[0];
  var alertMessage = document.querySelector(".alert-message");
  var errorMessage = document.querySelector(".error-message");

  try {
    // get contact form data
    blogTitle = blogTitle.value.trim();
    blogBody = blogBody.value.trim();

    if (blogImage) {
      blogImageName = blogImage.name;
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please upload file";
      return setTimeout(function () {
        errorMessage.style.display = "none";
        errorMessage.innerHTML = "none";
      }, 5000);
    }

    if (blogTitle.length < 3 && blogTitle.length > 0 || blogTitle === "") {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Minimum 3 characters required for title";
      console.log(blogImage);
      return setTimeout(function () {
        errorMessage.style.display = "none";
        errorMessage.innerHTML = "none";
      }, 5000);
    } else if (blogBody.length < 10 && blogBody.length > 0 || blogBody === "") {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Minimum 10 characters required for body";
      return setTimeout(function () {
        errorMessage.style.display = "none";
        errorMessage.innerHTML = "none";
      }, 5000);
    } else if (blogImage.type.split('/').pop().toLowerCase() != "jpeg" && blogImage.type.split('/').pop().toLowerCase() != "jpg" && blogImage.type.split('/').pop().toLowerCase() != "png" && blogImage.type.split('/').pop().toLowerCase() != "bmp" && blogImage.type.split('/').pop().toLowerCase() != "gif") {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please select a valid image file";
      return setTimeout(function () {
        errorMessage.style.display = "none";
        errorMessage.innerHTML = "none";
      }, 5000);
    } else {
      // blog image will be stored to this path
      var storageRef = firebase.storage().ref("blog-images/" + blogImageName);
      var imageUpload = storageRef.put(blogImage);
      blogForm.classList.add("change-button");
      submitButton.textContent = "Submitting..."; // tracking the state of image upload

      imageUpload.on("state_changed", function (snapshot) {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log("uploaded ".concat(progress));
      }, function (error) {
        console.log(error.message);
      }, function () {
        imageUpload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // link image url to its blog post
          // create contact message in firebase database
          db.collection('blog-posts').add({
            title: blogTitle,
            body: blogBody,
            blogImage: downloadURL,
            dateCreated: Date.now()
          });
          blogForm.reset();
          submitButton.textContent = "add";
          blogForm.classList.remove("change-button");
          alertMessage.style.display = "block";
          setTimeout(function () {
            alertMessage.style.display = "";
          }, 5000);
        });
      });
    }
  } catch (error) {
    console.log(error);
  } // form fields validation 

} //   tracking user auth status


auth.onAuthStateChanged(function (user) {
  if (user) {
    logoutLink.style.display = "block";
  } else {
    logoutLink.style.display = "none";
    window.location.href = "login.html";
  }
}); // log out

logoutLink.addEventListener('click', function (e) {
  e.preventDefault();
  auth.signOut().then(function () {
    window.location.href = 'login.html';
    console.log("You have been logged out of the system. Hope to see you back.");
  });
});