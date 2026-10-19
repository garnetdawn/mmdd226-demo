/**
 * Burger Restaurant Website - Medium Fidelity Prototype
 * Menu Page Logic
 */

// Fallback menu data in case fetch() is blocked when opened directly via file://
const FALLBACK_MENU_DATA = {
  "categories": [
    { "id": "all", "name": "All Items" },
    { "id": "custom", "name": "Build Your Own" },
    { "id": "burgers", "name": "Signature Burgers" },
    { "id": "sides", "name": "Sides & Appetizers" },
    { "id": "drinks", "name": "Drinks & Shakes" },
    { "id": "desserts", "name": "Desserts" }
  ],
  "items": [
    {
      "id": "byo-burger",
      "name": "Build Your Own Burger",
      "category": "custom",
      "price": 10.99,
      "description": "Choose your bun, patty, cheese, fresh toppings, and house sauces.",
      "image": "images/build-your-own.png",
      "isCustomizable": true
    },
    {
      "id": "classic-cheeseburger",
      "name": "Action Hero",
      "category": "burgers",
      "price": 11.49,
      "description": "Angus beef patty, cheddar, lettuce, tomato, pickles, house sauce.",
      "image": "images/action-hero.png",
      "isCustomizable": false
    },
    {
      "id": "bacon-bbq-burger",
      "name": "Blue Moon",
      "category": "burgers",
      "price": 13.99,
      "description": "100% Seasoned Angus beef patty (4oz or 6oz or 8oz) served on a Sesame seed bun with Tomato, Lettuce, Portobello Mushrooms, and Blue Cheese.",
      "image": "images/blue-moon.png",
      "isCustomizable": false
    },
    {
      "id": "mushroom-swiss-burger",
      "name": "Heavy Hitter",
      "category": "burgers",
      "price": 12.99,
      "description": "100% Seasoned Angus beef patty (8oz) served on a Sesame seed bun with Tomato, Red Onions, Relish, Real Canadian Cheddar Cheese",
      "image": "images/heavy.png",
      "isCustomizable": false
    },
    {
      "id": "spicy-smash-burger",
      "name": "Crispy Chicken Hero",
      "category": "burgers",
      "price": 12.49,
      "description": "Smash patty, pepper jack, grilled jalapeños, chipotle mayo.",
      "image": "images/crispy.png",
      "isCustomizable": false
    },
    {
      "id": "veggie-delight-burger",
      "name": "Egg Burger",
      "category": "burgers",
      "price": 11.99,
      "description": "Black bean patty, avocado, arugula, pickled onions, herb sauce.",
      "image": "images/egg.png",
      "isCustomizable": false
    },
    {
      "id": "crispy-fries",
      "name": "Skin-On Crispy Fries",
      "category": "sides",
      "price": 4.49,
      "description": "Fresh russet potato fries seasoned with sea salt.",
      "image": "images/fries.png",
      "isCustomizable": false
    },
    {
      "id": "onion-rings",
      "name": "Crispy Onion Rings",
      "category": "sides",
      "price": 5.99,
      "description": "Thick-cut sweet onions battered and fried golden brown.",
      "image": "images/rings.png",
      "isCustomizable": false
    },
    {
      "id": "sweet-potato-fries",
      "name": "Sweet Potato Fries",
      "category": "sides",
      "price": 5.49,
      "description": "Hand-cut sweet potatoes served with garlic dip.",
      "image": "images/fries.png",
      "isCustomizable": false
    },
    {
      "id": "craft-soda",
      "name": "Fountain Soda",
      "category": "drinks",
      "price": 2.99,
      "description": "Refillable fountain soda (Cola, Lemon-Lime, Ginger Ale).",
      "image": "images/cola.png",
      "isCustomizable": false
    },
    {
      "id": "handspun-shake",
      "name": "Hand-Spun Milkshake",
      "category": "drinks",
      "price": 6.49,
      "description": "Vanilla, Dutch Chocolate, or Fresh Strawberry shake.",
      "image": "images/shake.png",
      "isCustomizable": false
    }
  ]
};



// Application State
const state = {
    menuData: null,
    activeCategory: "all",
    orderMode: "pickup",
    cart: []
};

// DOM Elements
const categoryListEl = document.getElementById("category-list");
const menuGridEl = document.getElementById("menu-grid");
const currentCategoryNameEl = document.getElementById("current-category-name");
const categoryItemCountEl = document.getElementById("category-item-count");
const cartBtn = document.getElementById("cart-btn");
const cartCountBadge = document.getElementById("cart-count");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartDrawerItems = document.getElementById("cart-drawer-items");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const checkoutBtn = document.getElementById("checkout-btn");

/**
 * Initialize application: fetch menu data and render interface
 */
async function init() {
    try {
        const savedCart = localStorage.getItem("burgerCart");
        if (savedCart) {
            state.cart = JSON.parse(savedCart);
        }
        const savedMode = localStorage.getItem("orderMode");
        if (savedMode) {
            state.orderMode = savedMode;
        }
    } catch (e) {
        console.warn("Could not load from localStorage", e);
    }

    try {
        const response = await fetch("menu.json");
        if (!response.ok) throw new Error("Network response was not ok");
        state.menuData = await response.json();
    } catch (err) {
        console.warn("Could not fetch menu.json directly (likely file:// protocol), using fallback data.", err);
        state.menuData = FALLBACK_MENU_DATA;
    }

    if (window.burgerPricingEngine) {
        await window.burgerPricingEngine.loadOptions();
    }

    renderSidebar();
    renderMenu();
    setupCartListeners();
    setupOrderToggle();
    setupByoFeatureCard();
    updateCartUI();
}

/**
 * Setup event listeners for the Build Your Own featured row card
 */
function setupByoFeatureCard() {
    const byoCard = document.getElementById("byo-card");
    const byoBtn = document.getElementById("byo-feature-btn");

    function triggerByo() {
        const byoItem = (state.menuData && state.menuData.items)
            ? state.menuData.items.find((i) => i.id === "byo-burger")
            : {
                id: "byo-burger",
                name: "Build Your Own Burger",
                price: 10.99,
                isCustomizable: true
            };
        handleOpenBuilder(byoItem);
    }

    byoBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        triggerByo();
    });

    byoCard?.addEventListener("click", () => {
        triggerByo();
    });
}

/**
 * Render category navigation items in the sidebar
 */
function renderSidebar() {
    categoryListEl.innerHTML = "";

    state.menuData.categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `category-item ${cat.id === state.activeCategory ? "active" : ""}`;
        btn.dataset.category = cat.id;

        const count = getCategoryItemCount(cat.id);

        btn.innerHTML = `
            <span>${cat.name}</span>
            <span class="category-item-count">(${count})</span>
        `;

        btn.addEventListener("click", () => {
            if (state.activeCategory === cat.id) return;
            state.activeCategory = cat.id;
            updateActiveSidebar();
            renderMenu();
        });

        categoryListEl.appendChild(btn);
    });
}

/**
 * Update active state on sidebar items
 */
function updateActiveSidebar() {
    const buttons = categoryListEl.querySelectorAll(".category-item");
    buttons.forEach((btn) => {
        if (btn.dataset.category === state.activeCategory) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

/**
 * Calculate items in category
 */
function getCategoryItemCount(categoryId) {
    if (categoryId === "all") {
        return state.menuData.items.filter((item) => item.id !== "byo-burger").length;
    }
    return state.menuData.items.filter((item) => item.category === categoryId).length;
}

/**
 * Filter items according to current category
 */
function getFilteredItems() {
    if (state.activeCategory === "all") {
        return state.menuData.items.filter((item) => item.id !== "byo-burger");
    }
    if (state.activeCategory === "custom") {
        return [];
    }
    return state.menuData.items.filter((item) => item.category === state.activeCategory);
}

/**
 * Render menu cards into 4-column grid
 */
function renderMenu() {
    const byoRow = document.getElementById("byo-feature-row");
    const activeCategoryObj = state.menuData.categories.find((c) => c.id === state.activeCategory);
    const categoryTitle = activeCategoryObj ? activeCategoryObj.name : "Menu Items";
    const filteredItems = getFilteredItems();

    // Show BYO row above "All Items" (and when "custom" is selected)
    if (byoRow) {
        if (state.activeCategory === "all" || state.activeCategory === "custom") {
            byoRow.style.display = "block";
        } else {
            byoRow.style.display = "none";
        }
    }

    currentCategoryNameEl.textContent = categoryTitle;
    categoryItemCountEl.textContent = `${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"}`;

    menuGridEl.innerHTML = "";

    filteredItems.forEach((item) => {
        const card = document.createElement("article");
        card.className = "menu-card";

        const badgeHtml = item.isCustomizable
            ? `<div class="card-badge-container"><span class="badge">Customizable</span></div>`
            : "";

        const actionBtnText = item.isCustomizable ? "Build Your Own" : "Add to Cart";
        const actionBtnClass = item.isCustomizable ? "card-action-btn btn-custom" : "card-action-btn";

        card.innerHTML = `
            <div class="card-image-box">
                ${badgeHtml}
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="card-content">
                <h2 class="card-title">${item.name}</h2>
                <p class="card-desc">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                    <button type="button" class="${actionBtnClass}" data-id="${item.id}">
                        ${actionBtnText}
                    </button>
                </div>
            </div>
        `;

        const actionBtn = card.querySelector(".card-action-btn");
        actionBtn.addEventListener("click", () => {
            if (item.isCustomizable) {
                handleOpenBuilder(item);
            } else {
                addToCart(item);
            }
        });

        menuGridEl.appendChild(card);
    });
}

/**
 * Handler for opening the builder popup (Variation B)
 */
function handleOpenBuilder(item) {
    if (typeof window.openBuilderVariationB === "function") {
        window.openBuilderVariationB(item);
    } else {
        console.error("openBuilderVariationB is not defined");
    }
}

/**
 * Open cart drawer
 */
function openCart() {
    if (cartDrawer && cartDrawerOverlay) {
        cartDrawer.classList.add("active");
        cartDrawerOverlay.classList.add("active");
        cartDrawer.setAttribute("aria-hidden", "false");
    }
}

/**
 * Close cart drawer
 */
function closeCart() {
    if (cartDrawer && cartDrawerOverlay) {
        cartDrawer.classList.remove("active");
        cartDrawerOverlay.classList.remove("active");
        cartDrawer.setAttribute("aria-hidden", "true");
    }
}

/**
 * Add an item to cart and open cart drawer
 */
function addToCart(item, shouldOpenCart = true) {
    state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        addedAt: Date.now()
    });
    try {
        localStorage.setItem("burgerCart", JSON.stringify(state.cart));
    } catch (e) {
        console.warn("Could not save cart to localStorage", e);
    }
    updateCartUI();
    if (shouldOpenCart) {
        openCart();
    }
}

// Global access for other modules
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCart = closeCart;

/**
 * Remove an item from cart
 */
function removeFromCart(index) {
    state.cart.splice(index, 1);
    try {
        localStorage.setItem("burgerCart", JSON.stringify(state.cart));
    } catch (e) {
        console.warn("Could not save cart to localStorage", e);
    }
    updateCartUI();
}

/**
 * Update cart count and drawer contents
 */
function updateCartUI() {
    cartCountBadge.textContent = state.cart.length;

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    cartSubtotalEl.textContent = `$${total.toFixed(2)}`;

    if (state.cart.length === 0) {
        cartDrawerItems.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty.</p>
                <span>Select an item from the menu to get started.</span>
            </div>
        `;
    } else {
        cartDrawerItems.innerHTML = "";

        state.cart.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "cart-item-row";
            row.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button type="button" class="cart-item-remove" data-index="${index}" title="Remove item">&times;</button>
            `;

            row.querySelector(".cart-item-remove").addEventListener("click", () => {
                removeFromCart(index);
            });

            cartDrawerItems.appendChild(row);
        });
    }
}

/**
 * Setup event listeners for cart drawer
 */
function setupCartListeners() {
    cartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartDrawerOverlay.addEventListener("click", closeCart);

    checkoutBtn.addEventListener("click", () => {
        try {
            localStorage.setItem("burgerCart", JSON.stringify(state.cart));
            localStorage.setItem("orderMode", state.orderMode);
        } catch (e) {}
        window.location.href = "checkout.html";
    });
}

/**
 * Setup event listeners for Pickup / Delivery mode toggle
 */
function setupOrderToggle() {
    const toggleContainer = document.getElementById("order-mode-toggle");
    if (!toggleContainer) return;

    const buttons = toggleContainer.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => {
        if (btn.dataset.mode === state.orderMode) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }

        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            state.orderMode = btn.dataset.mode;
            try {
                localStorage.setItem("orderMode", state.orderMode);
            } catch (e) {}
        });
    });
}

// Start application
document.addEventListener("DOMContentLoaded", init);
