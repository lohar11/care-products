// ✅ Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.firebasestorage.app",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:be0eb289df9f4c20e3831e"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase Initialized Successfully");

// ✅ Fetch & Display Products from Firestore
async function fetchProducts() {
    try {
        console.log("📡 Fetching products...");
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);

        let productContainer = document.getElementById("menu-list");
        if (!productContainer) {
            console.error("🚨 'menu-list' container not found in HTML.");
            return;
        }

        productContainer.innerHTML = ""; // Clear previous content
        let productsFound = false;

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("📦 Product Data from Firestore:", data);

            if (!data.title || !data.price || !data.image) {
                console.warn("⚠️ Product data is incomplete:", data);
                return;
            }

            let productDiv = document.createElement("div");
            productDiv.classList.add("menu");
            productDiv.setAttribute("data-title", data.title);
            productDiv.setAttribute("data-price", data.price);

            productDiv.innerHTML = `
                <img src="${data.image}" alt="${data.title}" width="150">
                <h3>${data.title}</h3>
                <p class="price">₹${parseFloat(data.price).toFixed(2)}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productContainer.appendChild(productDiv);
            productsFound = true;
        });

        if (!productsFound) {
            console.warn("⚠️ No products found in Firestore. Check your database.");
        }

        console.log("✅ Products Loaded Successfully");
    } catch (error) {
        console.error("🚨 Error fetching products from Firestore:", error);
    }
}

// ✅ Dynamic Event Listener for Add to Cart
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
        let productDiv = event.target.parentElement;
        let title = productDiv.getAttribute("data-title");
        let price = parseFloat(productDiv.getAttribute("data-price"));

        console.log(`🛒 Adding to Cart: ${title} - ₹${price}`);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

        cart.push({ title, price });
        totalPrice += price;

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalPrice", totalPrice.toFixed(2));

        alert(`✅ ${title} added to cart!`);
    }
});

// ✅ Fetch Products on Window Load
window.onload = () => {
    console.log("🔄 Window Loaded - Fetching Products...");
    fetchProducts();
};
