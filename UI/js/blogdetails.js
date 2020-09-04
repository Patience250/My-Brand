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
    // show & hide nav links
bars.addEventListener('click', () => {
    navBar.classList.toggle('show-links')

})





//   get single blog from firebase 


const singleBlog = document.querySelector(".blogdetails")
const postId = location.href.split("?id=")[1];
let blogTextDiv = document.createElement('div')
let blogTitle = document.createElement("h2")
let blogHeaderDiv = document.createElement("div")
let blogImage = document.createElement('img')
let editButton = document.createElement('a')
let likeButton = document.createElement('a')
let deleteButton = document.createElement('a')
let editIcon = document.createElement('i')
let deleteIcon = document.createElement('i')
let likeIcon = document.createElement('i')
let blogMaintext = document.createElement("div")
let blogParagraph = document.createElement("p")
const getBlog = (doc) => {

    editButton.className = "blog-button edit"
    editButton.setAttribute("href", `../admin/update.html?id=${doc.id}`)
    editIcon.className = "fas fa-edit"
    deleteIcon.className = "fas fa-trash"
    blogImage.className = "blog-image"
    singleBlog.setAttribute('data-id', doc.id)
    blogTitle.textContent = doc.data().title
    blogHeaderDiv.className = "blog-header"
    blogImage.setAttribute('src', doc.data().blogImage)
    blogTextDiv.className = "blogdetails-text"
    blogTextDiv.appendChild(blogTitle)
    editButton.appendChild(editIcon)
    deleteButton.appendChild(deleteIcon)
    blogMaintext.className = "blog-main-text"
    blogParagraph.textContent = doc.data().body
    likeButton.className = "blog-button like"
    deleteButton.className = "blog-button delete"
    likeIcon.className = "fas fa-heart"

    likeButton.appendChild(likeIcon)

    auth.onAuthStateChanged(user => {
        if (user) {
            blogHeaderDiv.appendChild(editButton)
            blogHeaderDiv.appendChild(deleteButton)
        }
    })
    blogMaintext.appendChild(blogParagraph)
    blogMaintext.appendChild(likeButton)
    singleBlog.appendChild(blogTextDiv)
    singleBlog.appendChild(blogHeaderDiv)
    singleBlog.appendChild(blogImage)
    singleBlog.appendChild(blogMaintext)

}

// retrieve queries from firebase collections based on authentication

db.collection('blog-posts').doc(postId).get().then(doc => {
        getBlog(doc)

    })
    //    else {
    //         setContacts([])
    // }


// delete blog 
deleteButton.addEventListener('click', (e) => {
    e.stopPropagation()
    auth.onAuthStateChanged(user => {
        if (user) {

            // db.collection('blog-posts').doc(postId).delete();
            console.log('You will be redirected to blog page in 5s')
            setTimeout(() => {
                window.location.href = "../index.html#blog-section";
            }, 5000);


        } else {
            alert("You can't delete this blog")
        }
    })

})