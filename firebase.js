import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.appspot.com",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:84ca0a6079c13587e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Wait for DOM to load
window.onload = function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const showSignUp = document.getElementById("showSignUp");
    const showLogin = document.getElementById("showLogin");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const dob = document.getElementById("signupDOB").value;

            if (!name || !email || !password || !confirmPassword || !dob) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return setDoc(doc(db, "users", user.uid), {
                        name: name,
                        email: email,
                        dob: dob
                    });
                })
                .then(() => {
                    alert("Account Created Successfully!");
                    window.location.reload();
                })
                .catch((error) => {
                    alert("Error: " + error.code);
                });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Login Successful!");
                    window.location.href = "index.html"; 
                })
                .catch((error) => {
                    alert("Login Failed: " + error.code);
                });
        });
    }

    if (showSignUp && showLogin) {
        showSignUp.addEventListener("click", function () {
            document.getElementById("loginForm").classList.add("hidden");
            document.getElementById("signupForm").classList.remove("hidden");
        });

        showLogin.addEventListener("click", function () {
            document.getElementById("signupForm").classList.add("hidden");
            document.getElementById("loginForm").classList.remove("hidden");
        });
    }
};
