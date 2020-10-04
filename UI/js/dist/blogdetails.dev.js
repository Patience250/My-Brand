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
var db = firebase.firestore();
var navBar = document.querySelector('.nav-links');
var nav = document.querySelector('nav');
var navLinks = document.querySelectorAll('a');
var bars = document.querySelector('.bars');
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
}); //   get single blog from firebase 

var singleBlog = document.querySelector(".blogdetails");
var postId = location.href.split("?id=")[1];
var blogTextDiv = document.createElement('div');
var blogTitle = document.createElement("h2");
var blogHeaderDiv = document.createElement("div");
var blogImage = document.createElement('img');
var editButton = document.createElement('a');
var likeButton = document.createElement('a');
var deleteButton = document.createElement('a');
var editIcon = document.createElement('i');
var deleteIcon = document.createElement('i');
var likeIcon = document.createElement('i');
var blogMaintext = document.createElement("div");
var blogParagraph = document.createElement("p");

var getBlog = function getBlog(doc) {
  editButton.className = "blog-button edit";
  editButton.setAttribute("href", "../admin/update.html?id=".concat(doc.id));
  editIcon.className = "fas fa-edit";
  deleteIcon.className = "fas fa-trash";
  blogImage.className = "blog-image";
  singleBlog.setAttribute('data-id', doc.id);
  blogTitle.textContent = doc.data().title;
  blogHeaderDiv.className = "blog-header";
  blogImage.setAttribute('src', doc.data().blogImage);
  blogTextDiv.className = "blogdetails-text";
  blogTextDiv.appendChild(blogTitle);
  editButton.appendChild(editIcon);
  deleteButton.appendChild(deleteIcon);
  blogMaintext.className = "blog-main-text";
  blogParagraph.textContent = doc.data().body;
  likeButton.className = "blog-button like";
  deleteButton.className = "blog-button delete";
  likeIcon.className = "fas fa-heart";
  likeButton.appendChild(likeIcon);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      blogHeaderDiv.appendChild(editButton);
      blogHeaderDiv.appendChild(deleteButton);
    }
  });
  blogMaintext.appendChild(blogParagraph);
  blogMaintext.appendChild(likeButton);
  singleBlog.appendChild(blogTextDiv);
  singleBlog.appendChild(blogHeaderDiv);
  singleBlog.appendChild(blogImage);
  singleBlog.appendChild(blogMaintext);
}; // retrieve queries from firebase collections based on authentication


db.collection('blog-posts').doc(postId).get().then(function (doc) {
  getBlog(doc);
}); //    else {
//         setContacts([])
// }
// delete blog 

deleteButton.addEventListener('click', function (e) {
  e.stopPropagation();
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // db.collection('blog-posts').doc(postId).delete();
      console.log('You will be redirected to blog page in 5s');
      setTimeout(function () {
        window.location.href = "../index.html#blog-section";
      }, 5000);
    } else {
      alert("You can't delete this blog");
    }
  });
});