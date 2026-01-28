import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
    apiKey: "AIzaSyBCN0ILwDaD9j_p2MHHf9POcviH1P9TxKQ",
    authDomain: "myfirstwebsite-389b7.firebaseapp.com",
    projectId: "myfirstwebsite-389b7",
    appId: "1:836791320064:web:cfa6c3be8ff287a81de2e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* SECTIONS */
const signupSection = document.getElementById("signupSection");
const loginSection = document.getElementById("loginSection");

/* UI CONTROL */
function showSignup() {
    signupSection.style.display = "block";
    loginSection.style.display = "none";
}

function showLogin() {
    signupSection.style.display = "none";
    loginSection.style.display = "block";
}

/* SIGN UP */
window.signup = function () {
    createUserWithEmailAndPassword(
        auth,
        signupEmail.value,
        signupPassword.value
    )
    .then(() => {
        alert("Signup successful! Please log in.");
        showLogin();
    })
    .catch(err => {
        if (err.code === "auth/email-already-in-use") {
            alert("Email already registered. Please log in.");
            showLogin();
        } else {
            alert(err.message);
        }
    });
};

/* LOGIN */
window.login = function () {
    signInWithEmailAndPassword(
        auth,
        loginEmail.value,
        loginPassword.value
    )
    .then(() => {
        window.location.href = "webpage.html"; // ✅ redirect
    })
    .catch(err => alert(err.message));
};

/* LOGOUT (used in dashboard.html) */
window.logout = function () {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
};

/* AUTH STATE */
onAuthStateChanged(auth, user => {
    if (user) {
        // User already logged in → go to dashboard
        window.location.href = "webpage.html";
    } else {
        // First time / logged out
        showSignup();
    }
});

