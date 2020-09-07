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
const blogForm = document.querySelector('#blog-form')
let submitButton = document.querySelector("button")
const feedBack = document.querySelector('.feedback')
const logoutLink = document.querySelector('.logout')

// Navbar
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

const getFirebaseImage = (firebaseImage) => {
    return firebaseImage
}

blogForm.style.visibility = "hidden";
const blogId = location.href.split("?id=")[1];
const loader = document.querySelector(".loader")
let blogTitle = document.querySelector('#post-title')
let blogBody = document.querySelector("#post-message")
let blogImage = document.querySelector("#post-image")
let alertMessage = document.querySelector(".alert-message")
let errorMessage = document.querySelector(".error-message")
const getBlog = (doc) => {

    blogTitle.value = doc.data().title;
    blogBody.value = doc.data().body;
    loader.style.display = "none";
    blogForm.style.visibility = "visible"

}

db.collection('blog-posts').doc(blogId).get().then(doc => {
    getBlog(doc)

})

// handling contact form data
blogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    validateInputs()
})


function validateInputs() {

    try {
        // get blog form data
        blogTitle = blogTitle.value.trim()
        blogBody = blogBody.value.trim()
        if (blogImage) {
            blogImageName = blogImage.name;
        } else {
            blogImageName = getFirebaseImage();
        }

        if (blogTitle.length < 3 && blogTitle.length > 0 || blogTitle === "") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Minimum 3 characters required for title"
            console.log(blogImage)
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = "none"
            }, 5000)
        } else if (blogBody.length < 10 && blogBody.length > 0 || blogBody === "") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Minimum 10 characters required for body"
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = "none"

            }, 5000)
        } else if (blogImage.files[0] && blogImage.files[0].type.split('/').pop().toLowerCase() != "jpeg" &&
            blogImage.files[0].type.split('/').pop().toLowerCase() != "jpg" &&
            blogImage.files[0].type.split('/').pop().toLowerCase() != "png" &&
            blogImage.files[0].type.split('/').pop().toLowerCase() != "bmp" &&
            blogImage.files[0].type.split('/').pop().toLowerCase() != "gif") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Please select a valid image file"
            console.log(blogImage.files[0])
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = "none"

            }, 5000)
        } else if (blogImage.files[0]) {
            // blog image will be stored to this path
            let storageRef = firebase.storage().ref("blog-images/" + blogImageName)
            let imageUpload = storageRef.put(blogImage.files[0])
            blogForm.classList.add("change-button")
            submitButton.textContent = "Submitting..."
                // tracking the state of image upload
            imageUpload.on("state_changed", (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`uploaded ${progress}`)
            }, (error) => {
                console.log(error.message)
            }, () => {
                imageUpload.snapshot.ref.getDownloadURL().then(downloadURL => {
                    // link image url to its blog post
                    // create contact message in firebase database
                    db.collection('blog-posts').doc(blogId).update({
                        title: blogTitle,
                        body: blogBody,
                        blogImage: downloadURL,
                        dateCreated: Date.now()
                    })
                    blogForm.reset()
                    submitButton.textContent = "add"
                    blogForm.classList.remove("change-button")
                    alertMessage.style.display = "block"
                    setTimeout(() => {
                        alertMessage.style.display = ""
                    }, 5000)

                })
            })
        } else {
            console.log(blogImage.target)
            db.collection('blog-posts').doc(blogId).update({
                title: blogTitle,
                body: blogBody,
                dateCreated: Date.now()

            })
            blogForm.reset()
            submitButton.textContent = "add"
            blogForm.classList.remove("change-button")
            alertMessage.style.display = "block"
            setTimeout(() => {
                alertMessage.style.display = ""
            }, 5000)
        }
    } catch (error) {
        console.log(error)
    }

    // form fields validation 
}


//   tracking user auth status
auth.onAuthStateChanged(user => {
    if (user) {
        logoutLink.style.display = "block"
    } else {
        logoutLink.style.display = "none"
        window.location.href = "login.html"
    }
})

// log out
logoutLink.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut().then(() => {
        window.location.href = 'login.html'
        console.log("You have been logged out of the system. Hope to see you back.")
    })
})