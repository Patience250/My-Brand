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
const db = firebase.database()


//   tracking user auth status
auth.onAuthStateChanged(user => {
    console.log(user)
})

// login 

const loginForm = document.querySelector('#loginform');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //  grab user data
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        if (cred.user) {
            window.location.href = "../admin/queries.html"
        } else {
            window.location.href = 'login.html'
        }
        loginForm.reset()

    })
})