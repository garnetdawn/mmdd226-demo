/**
 * Checkout Screen Logic - Burger Prototype
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Retrieve cart and order mode from localStorage (with prototype fallback data if empty)
    let cart = [];
    try {
        const storedCart = localStorage.getItem("burgerCart");
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    } catch (e) {
        console.warn("Could not load cart from localStorage", e);
    }

    // Default sample cart for testing if cart is empty
    if (!cart || cart.length === 0) {
        cart = [
            { id: "classic-cheeseburger", name: "Classic Cheeseburger", price: 11.49 },
            { id: "crispy-fries", name: "Skin-On Crispy Fries", price: 4.49 }
        ];
    }

    let orderMode = "pickup";
    try {
        const storedMode = localStorage.getItem("orderMode");
        if (storedMode) {
            orderMode = storedMode;
        }
    } catch (e) {}

    // 2. Setup Mode Indicator & Fulfillment info
    const modeBadge = document.getElementById("checkout-mode-badge");
    const fulfillmentLegend = document.getElementById("fulfillment-legend");
    const fulfillmentContent = document.getElementById("fulfillment-content");

    if (orderMode === "delivery") {
        modeBadge.textContent = "Delivery";
        fulfillmentLegend.textContent = "Delivery Address";
        fulfillmentContent.innerHTML = `
            <div class="form-row">
                <label for="delivery-address">Street Address</label>
                <input type="text" id="delivery-address" value="456 Elm Street, Apt 3B" required>
            </div>
            <div class="form-row">
                <label for="delivery-notes">Delivery Instructions (Optional)</label>
                <input type="text" id="delivery-notes" placeholder="Leave at door / ring buzzer" value="Leave by front door">
            </div>
        `;
    } else {
        modeBadge.textContent = "Pickup";
        fulfillmentLegend.textContent = "Pickup Details";
        fulfillmentContent.innerHTML = `
            <div class="pickup-info-box">
                <p><strong>Restaurant Location:</strong> 123 Main Street, Downtown</p>
                <p class="pickup-est">Estimated ready time: <strong>15–20 mins</strong></p>
            </div>
        `;
    }

    // 3. Render Order Summary Items
    const itemsListEl = document.getElementById("summary-items-list");
    const subtotalEl = document.getElementById("summary-subtotal");
    const taxEl = document.getElementById("summary-tax");
    const totalEl = document.getElementById("summary-total");

    itemsListEl.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
        subtotal += item.price;
        const itemRow = document.createElement("div");
        itemRow.className = "summary-item-row";
        itemRow.innerHTML = `
            <span class="summary-item-name">${item.name}</span>
            <span class="summary-item-price">$${item.price.toFixed(2)}</span>
        `;
        itemsListEl.appendChild(itemRow);
    });

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;

    // 4. Handle Submit Button (Turns green when pressed)
    const submitBtn = document.getElementById("submit-order-btn");
    const confirmationBanner = document.getElementById("order-confirmation-banner");

    let isSubmitted = false;

    submitBtn.addEventListener("click", () => {
        if (isSubmitted) return;
        isSubmitted = true;

        // Turn button green as specified
        submitBtn.classList.add("btn-green");
        submitBtn.textContent = "✓ Order Submitted";

        // Display confirmation banner
        confirmationBanner.style.display = "flex";

        // Clear active cart from localStorage
        try {
            localStorage.removeItem("burgerCart");
        } catch (e) {}
    });
});

