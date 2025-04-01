// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com/",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.appspot.com",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:84ca0a6079c13587e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form Submission
document.getElementById("contact-Form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Save Data to Firebase
    saveMessages(name, email, message);

    // Show Success Message
    const formMessage = document.getElementById("formMessage");
    formMessage.style.display = "block";

    // Hide Message After 3 Seconds
    setTimeout(() => {
        formMessage.style.display = "none";
    }, 3000);

    // Reset Form
    document.getElementById("contact-Form").reset();
});

// Function to Save Messages in Firebase
const saveMessages = (name, email, message) => {
    const contactFormDB = ref(db, "contactForm");
    const newContactForm = push(contactFormDB);
    set(newContactForm, {
        name: name,
        email: email,
        message: message
    });
};
