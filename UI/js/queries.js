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

// show and hide nav links
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const showAndHideNavLinks = (user) => {
        if (user) {
            loggedInLinks.forEach(link => link.style.display = 'block')
            loggedOutLinks.forEach(link => link.style.display = 'none')
        } else {
            loggedInLinks.forEach(link => link.style.display = 'none')
            loggedOutLinks.forEach(link => link.style.display = 'block')
        }
    }
    //   set and display firebase data
const contactList = document.querySelector(".main-content")
const queryMessage = document.querySelector(".query-message")
const singleQuery = document.querySelector(".single-query")
const setContacts = (doc) => {

    singleQuery.setAttribute('data-id', doc.id)
    queryMessage.innerHTML = doc.data().message
    singleQuery.appendChild(queryMessage)
}

// retrieve queries from firebase collections
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('contacts').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                setContacts(doc)
                showAndHideNavLinks(user);
            })

        })
    } else {
        showAndHideNavLinks()
        setContacts([])
    }
})