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
const commentForm = document.querySelector(".comment-form")
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





//   get single blog from firebase 
const singleBlog = document.querySelector(".blogdetails")
const loader = document.querySelector(".loader")
const blogId = location.href.split("?id=")[1];
let blogTextDiv = document.createElement('div')
let blogTitle = document.createElement("h2")
let blogHeaderDiv = document.createElement("div")
let blogImage = document.createElement('img')
let editButton = document.createElement('a')
let commentButton = document.createElement('a')
let likeButton = document.createElement('a')
let deleteButton = document.createElement('a')
let commentIcon = document.createElement('i')
let editIcon = document.createElement('i')
let deleteIcon = document.createElement('i')
let likeIcon = document.createElement('i')
let blogMaintext = document.createElement("div")
let blogParagraph = document.createElement("p")

const getBlog = (doc) => {
    commentButton.className = "blog-button comment"
    editButton.className = "blog-button edit"
    editButton.setAttribute("href", `../admin/update.html?id=${doc.id}`)
    commentIcon.className = "fas fa-comment"
    editIcon.className = "fas fa-edit"
    deleteIcon.className = "fas fa-trash"
    blogImage.className = "blog-image"
    singleBlog.setAttribute('data-id', doc.id)
    blogTitle.textContent = doc.data().title
    blogHeaderDiv.className = "blog-header"
    blogImage.setAttribute('src', doc.data().blogImage)
    blogTextDiv.className = "blogdetails-text"
    blogTextDiv.appendChild(blogTitle)
    commentButton.appendChild(commentIcon)
    editButton.appendChild(editIcon)
    deleteButton.appendChild(deleteIcon)
    blogMaintext.className = "blog-main-text"
    blogParagraph.textContent = doc.data().body
    likeButton.className = "blog-button like"
    deleteButton.className = "blog-button delete"
    likeIcon.className = "fas fa-heart"

    likeButton.appendChild(likeIcon)
    blogHeaderDiv.appendChild(commentButton)
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
    loader.style.display = "none"
}

// retrieve queries from firebase collections based on authentication

db.collection('blog-posts').doc(blogId).get().then(doc => {
    getBlog(doc)

})




// delete blog 
deleteButton.addEventListener('click', (e) => {
    e.stopPropagation()
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('blog-posts').doc(blogId).delete();
            blogHeaderDiv.innerHTML = "Deleting.....You will be redirected to blog page in 5s"
            blogHeaderDiv.classList.add("change-blog-header")
            blogImage.style.display = "none"
            blogMaintext.style.display = "none"
            loader.style.display = "block"
            setTimeout(() => {
                window.location.href = "../index.html#blog-section";
            }, 5000);


        } else {
            alert("You can't delete this blog")
        }
    })

})


// handling contact form data
commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    validateInputs()
})

function validateInputs() {
    let userName = document.querySelector('.name')
    let email = document.querySelector('.email')
    let message = document.querySelector(".message")
    let alertMessage = document.querySelector(".alert-message")
    let errorMessage = document.querySelector(".error-message")
    try {
        // get contact form data
        userName = userName.value.trim()
        email = email.value.trim()
        message = message.value.trim()
            // form fields validation 

        if (userName.length < 3 && userName.length > 0 || userName === "") {
            errorMessage.style.display = "block"
            errorMessage.innerHTML = "Minimum 3 characters required for name"
            return setTimeout(() => {
                errorMessage.style.display = "none"
                errorMessage.innerHTML = "none"
                userName.classList.remove('.error')

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
            db.collection('blog-posts').doc(blogId).collection("comments").add({
                name: userName,
                email: email,
                commentMessage: message,
                dateCommented: Date.now()
            })
            commentForm.reset()
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


// retrieve comments
// about comments
const convertDate = (date) => {
    let dateObj = new Date(date)
    let month = dateObj.getMonth() + 1
    switch (month) {
        case 1:
            month = "January"
            break;
        case 2:
            month = "February"
            break;
        case 3:
            month = "March"
            break;
        case 4:
            month = "April"
            break;
        case 5:
            month = "May"
            break;
        case 6:
            month = "June"
            break;
        case 7:
            month = "July"
            break;
        case 8:
            month = "August"
            break;
        case 9:
            month = "September"
            break;
        case 10:
            month = "October"
            break;
        case 11:
            month = "November"
            break;
        case 12:
            month = "December"
            break;
        default:
            break;
    }
    let year = dateObj.getFullYear()
    let day = dateObj.getDate()
    let result = `${day} ${month} ${year}`
    return result

}
let commentsContainer = document.querySelector(".comments-section")
let closeComments = document.querySelector(".close-comments")
const getComment = (doc) => {

    let singleCommentDiv = document.createElement('div')
    let commentHeaderDiv = document.createElement('div')
    let authorDiv = document.createElement("div")
    let senderName = document.createElement("h3")
    let senderEmail = document.createElement("h2")
    let commmentDateDiv = document.createElement("div")
    let commentDatePar = document.createElement("p")
    let commentMessage = document.createElement('div')
    singleCommentDiv.className = "single-comment"
    commentHeaderDiv.className = "comment-header"
    authorDiv.className = "author"
    senderEmail.className = "sender-email"
    senderName.className = "sender-name"
    senderEmail.textContent = doc.data().email
    senderName.textContent = doc.data().name
    commmentDateDiv.className = "date"
    commentDatePar.textContent = convertDate(doc.data().dateCommented)
    commentMessage.className = "comment-message"
    commentMessage.textContent = doc.data().commentMessage
    authorDiv.appendChild(senderName)
    authorDiv.appendChild(senderEmail)
    commentHeaderDiv.appendChild(authorDiv)
    commmentDateDiv.appendChild(commentDatePar)
    commentHeaderDiv.appendChild(commmentDateDiv)
    singleCommentDiv.appendChild(commentHeaderDiv)
    singleCommentDiv.appendChild(commentMessage)
    commentsContainer.appendChild(singleCommentDiv)
}

// retrieve queries from firebase collections based on authentication
db.collection('blog-posts').doc(blogId).collection("comments").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            getComment(change.doc)
        }

    })
})

// show comments 
commentButton.addEventListener("click", (e) => {
        e.stopPropagation()
        commentsContainer.style.display = "block"
    })
    // hide comments
closeComments.addEventListener("click", (e) => {
    e.stopPropagation()
    commentsContainer.style.display = "none"
})

// add likes
likeButton.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log("likes")
    addLike()
    likeButton.classList.toggle("change-likes-color")
})

function addLike() {
    const increment = firebase.firestore.FieldValue.increment(1);
    db.collection("blog-posts").doc(blogId).update({ likes: increment });

}