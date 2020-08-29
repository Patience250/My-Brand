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


//   tracking user auth status
auth.onAuthStateChanged(user => {
    console.log(user)
})

//   get data from firebase 


const contactList = document.querySelector(".queries-container")
const queryMessage = document.querySelector(".query-message")
const singleQuery = document.querySelector(".single-query")
const senderName = document.querySelector(".sender-name")
const senderEmail = document.querySelector(".sender-email")

const setContacts = (doc) => {
    let div = document.createElement('div')
    let divSenderName = document.createElement('div')
    let divSenderEmail = document.createElement('div')
    let divMessage = document.createElement('div')
    let divDate = document.createElement('div')
    let parDate = document.createElement('p')
    let divAuthor = document.createElement('div')
    div.setAttribute('data-id', doc.id)
    div.classList.add('single-query')
    divDate.classList.add("date")
    parDate.textContent = doc.data().date
    divAuthor.classList.add("author")
    divSenderName.textContent = doc.data().name
    divSenderName.classList.add('sender-name')
    divSenderEmail.textContent = doc.data().email
    divSenderEmail.classList.add('sender-email')
    divMessage.textContent = doc.data().message
    divMessage.classList.add('query-message')
    divAuthor.appendChild(divSenderName)
    divAuthor.appendChild(divSenderEmail)
    divDate.appendChild(parDate)
    div.appendChild(divDate)
    div.appendChild(divAuthor)
    div.appendChild(divMessage)
    contactList.appendChild(div)
}

// retrieve queries from firebase collections based on authentication
auth.onAuthStateChanged(user => {
    // if (user) {
    //     db.collection('contacts').get().then(snapshot => {
    //         snapshot.docs.forEach(doc => {
    //             setContacts(doc)
    //             showAndHideNavLinks(user);
    //         })

    //     })

    db.collection('contacts').get().then(snapshot => {

            snapshot.docs.forEach(doc => {
                setContacts(doc)

            })

        })
        //    else {
        //         setContacts([])
        //     }
})



// Navbar

let homeSection = document.querySelector('#home-section')
let navBar = document.querySelector('.nav-links')
let nav = document.querySelector('nav')
let navLinks = document.querySelectorAll('a')
const bars = document.querySelector('.bars')
const contactForm = document.querySelector('.contact-form')
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