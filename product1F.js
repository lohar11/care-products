document.addEventListener("DOMContentLoaded", async () => {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    if (!cartCount || !cartItems || !totalPriceElement || !checkoutButton) {
        console.error("🚨 Some elements are missing! Check your HTML.");
        return;
    }

    let cart = [];
    let totalPrice = 0;

    // ✅ Function to Attach Event Listeners to "Add to Cart" Buttons
    function attachAddToCartListeners() {
        const buttons = document.querySelectorAll(".add-to-cart");

        if (buttons.length === 0) {
            console.warn("⚠️ No 'Add to Cart' buttons found. Ensure products are loaded.");
            return;
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const product = button.closest(".menu"); // Ensure correct parent element
                if (!product) {
                    console.error("🚨 Product element not found!");
                    return;
                }

                const title = product.getAttribute("data-title");
                const price = parseFloat(product.getAttribute("data-price"));

                if (!title || isNaN(price)) {
                    console.error("🚨 Invalid product data!");
                    return;
                }

                cart.push({ title, price });
                totalPrice += price;

                updateCart();
            });
        });

        console.log("✅ Event listeners attached to 'Add to Cart' buttons.");
    }

    // ✅ Function to Update Cart UI
    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.title} - ₹${item.price.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "❌";
            removeButton.style.marginLeft = "10px";
            removeButton.onclick = () => removeFromCart(index);

            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    }

    // ✅ Function to Remove Items from Cart
    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            totalPrice -= cart[index].price;
            cart.splice(index, 1);
            updateCart();
        } else {
            console.error("🚨 Invalid cart index!");
        }
    }

    // ✅ Checkout Button Event Listener
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("🛒 Your cart is empty!");
            return;
        }
        alert(`✅ Proceeding to checkout. Total: ₹${totalPrice.toFixed(2)}`);
        // Payment Integration can be added here
    });

    // ✅ Ensure products are loaded before attaching event listeners
    try {
        await fetchProducts();
        attachAddToCartListeners();
    } catch (error) {
        console.error("🚨 Error fetching products:", error);
    }
});

// ✅ Ensure `fetchProducts` Returns a Promise
function fetchProducts() {
    console.log("📡 Fetching products...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ Products fetched successfully.");
            resolve(); // Resolve the promise after fetching
        }, 1000); // Simulated delay for fetching
    });
}
