/**
 * Burger Builder - Variation A
 * "Free Choice" Layout:
 * - Simultaneous access to all builder categories via accordions
 * - Dynamic minimal SVG burger visual that stacks ingredients in real-time
 * - Live real-time pricing calculation
 * - Solo vs. Combo toggle (Sides & Drinks appear only in Combo mode)
 */

(function () {
    // Current custom burger builder state for Variation A
    let currentBurger = {
        bread: "sesame",
        patties: { "beef-patty": 1 },
        toppings: {},
        saladAndSauces: {},
        combo: {
            isCombo: false,
            sideId: "fries",
            drinkId: "fountain-drink"
        }
    };

    let builderModalRoot = null;

    /**
     * Open Variation A Modal
     */
    window.openBuilderVariationA = function (baseItem) {
        if (!builderModalRoot) {
            builderModalRoot = document.getElementById("builder-modal-root");
        }
        if (!builderModalRoot) {
            console.error("builder-modal-root element not found in DOM");
            return;
        }

        // Initialize state with 1 default patty and default bread
        currentBurger = {
            bread: "sesame",
            patties: { "beef-patty": 1 },
            toppings: {},
            saladAndSauces: {},
            combo: {
                isCombo: false,
                sideId: "fries",
                drinkId: "fountain-drink"
            }
        };

        renderModalA(baseItem);
        setupModalEvents(baseItem);
        updateVisualAndPrice();
    };

    /**
     * Render the Modal markup for Variation A matching the sketch
     */
    function renderModalA(baseItem) {
        const options = window.burgerPricingEngine ? window.burgerPricingEngine.options : FALLBACK_BUILDER_OPTIONS;

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-a-overlay">
                <div class="builder-modal var-a-modal" role="dialog" aria-labelledby="modal-a-title" aria-modal="true">
                    <!-- Top Bar: Combo / Solo Toggle & Close Button -->
                    <div class="builder-modal-header">
                        <div class="combo-solo-toggle" role="group" aria-label="Combo or Solo Selection">
                            <button type="button" class="toggle-mode-btn ${currentBurger.combo.isCombo ? "active" : ""}" id="btn-mode-combo">Combo</button>
                            <button type="button" class="toggle-mode-btn ${!currentBurger.combo.isCombo ? "active" : ""}" id="btn-mode-solo">Solo</button>
                        </div>
                        <button type="button" class="modal-close-btn" id="modal-a-close" aria-label="Close builder">&times;</button>
                    </div>

                    <!-- Main Modal Body: 2 Columns -->
                    <div class="builder-modal-body">
                        <!-- Left Column: Dynamic SVG Burger Visual & Live Total -->
                        <div class="builder-left-col">
                            <div class="burger-visual-wrapper">
                                <div class="burger-svg-stack" id="burger-svg-stack">
                                    <!-- Dynamic minimal SVGs injected here -->
                                </div>
                            </div>
                            <div class="live-total-badge">
                                <span class="total-label">Total</span>
                                <span class="total-amount" id="live-price-display">$10.99</span>
                            </div>
                        </div>

                        <!-- Right Column: Accordion Categories -->
                        <div class="builder-right-col">
                            <div class="accordion-container" id="builder-accordion">
                                
                                <!-- 1. BUN (Single Select, Required) -->
                                <div class="accordion-item" data-category="bun">
                                    <button type="button" class="accordion-header" aria-expanded="false">
                                        <span class="accordion-arrow">▶</span>
                                        <span class="accordion-title">Bun</span>
                                        <span class="accordion-summary" id="summary-bun">Sesame Seed</span>
                                    </button>
                                    <div class="accordion-content">
                                        <p class="accordion-hint">Required choice. Select one.</p>
                                        <div class="radio-options-grid">
                                            ${options.bread.options.map(b => `
                                                <label class="radio-option-card">
                                                    <input type="radio" name="var-a-bun" value="${b.id}" ${currentBurger.bread === b.id ? "checked" : ""}>
                                                    <span class="radio-label">${b.name}</span>
                                                </label>
                                            `).join("")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 2. PATTY (Default Open in Sketch) -->
                                <div class="accordion-item open" data-category="patty">
                                    <button type="button" class="accordion-header" aria-expanded="true">
                                        <span class="accordion-arrow">▼</span>
                                        <span class="accordion-title">Patty</span>
                                        <span class="accordion-summary" id="summary-patty">1 patty (1st free)</span>
                                    </button>
                                    <div class="accordion-content">
                                        <p class="accordion-hint">First 1 is free, extra are +$4.70 each.</p>
                                        <div class="stepper-list">
                                            ${options.patty.options.map(p => {
                                                const qty = currentBurger.patties[p.id] || 0;
                                                return `
                                                    <div class="stepper-row" data-type="patty" data-id="${p.id}">
                                                        <span class="stepper-name">${p.name}</span>
                                                        <div class="stepper-controls">
                                                            <button type="button" class="btn-step btn-minus" data-type="patty" data-id="${p.id}" ${qty === 0 ? "disabled" : ""}>-</button>
                                                            <span class="step-count" id="count-patty-${p.id}">${qty}</span>
                                                            <button type="button" class="btn-step btn-plus" data-type="patty" data-id="${p.id}">+</button>
                                                        </div>
                                                    </div>
                                                `;
                                            }).join("")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 3. TOPPINGS (+$1.29 each) -->
                                <div class="accordion-item" data-category="toppings">
                                    <button type="button" class="accordion-header" aria-expanded="false">
                                        <span class="accordion-arrow">▶</span>
                                        <span class="accordion-title">Toppings</span>
                                        <span class="accordion-summary" id="summary-toppings">+$1.29 each</span>
                                    </button>
                                    <div class="accordion-content">
                                        <p class="accordion-hint">+$1.29 each. Can add multiple.</p>
                                        <div class="stepper-list">
                                            ${options.toppings.options.map(t => {
                                                const qty = currentBurger.toppings[t.id] || 0;
                                                return `
                                                    <div class="stepper-row" data-type="toppings" data-id="${t.id}">
                                                        <span class="stepper-name">${t.name}</span>
                                                        <div class="stepper-controls">
                                                            <button type="button" class="btn-step btn-minus" data-type="toppings" data-id="${t.id}" ${qty === 0 ? "disabled" : ""}>-</button>
                                                            <span class="step-count" id="count-toppings-${t.id}">${qty}</span>
                                                            <button type="button" class="btn-step btn-plus" data-type="toppings" data-id="${t.id}">+</button>
                                                        </div>
                                                    </div>
                                                `;
                                            }).join("")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 4. SALAD & SAUCES (First 6 Free, Extra +$0.50) -->
                                <div class="accordion-item" data-category="saladAndSauces">
                                    <button type="button" class="accordion-header" aria-expanded="false">
                                        <span class="accordion-arrow">▶</span>
                                        <span class="accordion-title">Salad & Sauces</span>
                                        <span class="accordion-summary" id="summary-salad">First 6 free</span>
                                    </button>
                                    <div class="accordion-content">
                                        <p class="accordion-hint">First 6 free, extra are +$0.50 each.</p>
                                        <div class="stepper-list">
                                            ${options.saladAndSauces.options.map(s => {
                                                const qty = currentBurger.saladAndSauces[s.id] || 0;
                                                return `
                                                    <div class="stepper-row" data-type="saladAndSauces" data-id="${s.id}">
                                                        <span class="stepper-name">${s.name}</span>
                                                        <div class="stepper-controls">
                                                            <button type="button" class="btn-step btn-minus" data-type="saladAndSauces" data-id="${s.id}" ${qty === 0 ? "disabled" : ""}>-</button>
                                                            <span class="step-count" id="count-saladAndSauces-${s.id}">${qty}</span>
                                                            <button type="button" class="btn-step btn-plus" data-type="saladAndSauces" data-id="${s.id}">+</button>
                                                        </div>
                                                    </div>
                                                `;
                                            }).join("")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 5. SIDES (Only visible in Combo mode) -->
                                <div class="accordion-item combo-only-item ${currentBurger.combo.isCombo ? "" : "hidden"}" data-category="sides" id="accordion-sides">
                                    <button type="button" class="accordion-header" aria-expanded="false">
                                        <span class="accordion-arrow">▶</span>
                                        <span class="accordion-title">Sides</span>
                                        <span class="accordion-summary" id="summary-side">Included with combo</span>
                                    </button>
                                    <div class="accordion-content">
                                        <div class="radio-options-grid">
                                            ${options.combo.sides.map(sd => `
                                                <label class="radio-option-card">
                                                    <input type="radio" name="var-a-side" value="${sd.id}" ${currentBurger.combo.sideId === sd.id ? "checked" : ""}>
                                                    <span class="radio-label">${sd.name} ${sd.extraPrice > 0 ? `(+$${sd.extraPrice.toFixed(2)})` : ""}</span>
                                                </label>
                                            `).join("")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 6. DRINK (Only visible in Combo mode) -->
                                <div class="accordion-item combo-only-item ${currentBurger.combo.isCombo ? "" : "hidden"}" data-category="drink" id="accordion-drink">
                                    <button type="button" class="accordion-header" aria-expanded="false">
                                        <span class="accordion-arrow">▶</span>
                                        <span class="accordion-title">Drink</span>
                                        <span class="accordion-summary" id="summary-drink">Included with combo</span>
                                    </button>
                                    <div class="accordion-content">
                                        <div class="radio-options-grid">
                                            ${options.combo.drinks.map(dr => `
                                                <label class="radio-option-card">
                                                    <input type="radio" name="var-a-drink" value="${dr.id}" ${currentBurger.combo.drinkId === dr.id ? "checked" : ""}>
                                                    <span class="radio-label">${dr.name} ${dr.extraPrice > 0 ? `(+$${dr.extraPrice.toFixed(2)})` : ""}</span>
                                                </label>
                                            `).join("")}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Bottom Bar: Centered Add to Cart -->
                    <div class="builder-modal-footer">
                        <button type="button" class="builder-add-to-cart-btn" id="modal-a-add-to-cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Set up all interaction listeners in Variation A
     */
    function setupModalEvents(baseItem) {
        const overlay = document.getElementById("var-a-overlay");
        const closeBtn = document.getElementById("modal-a-close");
        const btnCombo = document.getElementById("btn-mode-combo");
        const btnSolo = document.getElementById("btn-mode-solo");
        const accordion = document.getElementById("builder-accordion");
        const addToCartBtn = document.getElementById("modal-a-add-to-cart");

        function closeModal() {
            builderModalRoot.innerHTML = "";
        }

        closeBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });

        // Combo vs Solo toggle
        btnCombo.addEventListener("click", () => {
            currentBurger.combo.isCombo = true;
            btnCombo.classList.add("active");
            btnSolo.classList.remove("active");
            document.querySelectorAll(".combo-only-item").forEach(el => el.classList.remove("hidden"));
            updateVisualAndPrice();
        });

        btnSolo.addEventListener("click", () => {
            currentBurger.combo.isCombo = false;
            btnSolo.classList.add("active");
            btnCombo.classList.remove("active");
            document.querySelectorAll(".combo-only-item").forEach(el => el.classList.add("hidden"));
            updateVisualAndPrice();
        });

        // Accordion headers toggle
        accordion.addEventListener("click", (e) => {
            const header = e.target.closest(".accordion-header");
            if (!header) return;

            const item = header.closest(".accordion-item");
            const isOpen = item.classList.contains("open");
            const arrow = header.querySelector(".accordion-arrow");

            if (isOpen) {
                item.classList.remove("open");
                arrow.textContent = "▶";
                header.setAttribute("aria-expanded", "false");
            } else {
                item.classList.add("open");
                arrow.textContent = "▼";
                header.setAttribute("aria-expanded", "true");
            }
        });

        // Radio selections: Bun
        accordion.addEventListener("change", (e) => {
            if (e.target.name === "var-a-bun") {
                currentBurger.bread = e.target.value;
                const options = window.burgerPricingEngine.options;
                const bunObj = options.bread.options.find(b => b.id === currentBurger.bread);
                const summary = document.getElementById("summary-bun");
                if (summary && bunObj) summary.textContent = bunObj.name;
                updateVisualAndPrice();
            } else if (e.target.name === "var-a-side") {
                currentBurger.combo.sideId = e.target.value;
                updateVisualAndPrice();
            } else if (e.target.name === "var-a-drink") {
                currentBurger.combo.drinkId = e.target.value;
                updateVisualAndPrice();
            }
        });

        // Counter Steppers (- / +)
        accordion.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-step");
            if (!btn) return;

            const type = btn.dataset.type; // 'patty' | 'toppings' | 'saladAndSauces'
            const id = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            const stateKey = type === "patty" ? "patties" : type;

            const currentObj = currentBurger[stateKey];
            let currentQty = currentObj[id] || 0;

            if (type === "patty" && !isPlus) {
                const totalPattyQty = Object.values(currentBurger.patties).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
                if (totalPattyQty <= 1) {
                    currentQty = 1;
                } else {
                    currentQty = Math.max(0, currentQty - 1);
                }
            } else if (isPlus) {
                currentQty += 1;
            } else {
                currentQty = Math.max(0, currentQty - 1);
            }

            if (currentQty === 0) {
                delete currentObj[id];
            } else {
                currentObj[id] = currentQty;
            }

            // Update stepper count UI
            const countEl = document.getElementById(`count-${type}-${id}`);
            if (countEl) countEl.textContent = currentQty;

            const row = btn.closest(".stepper-row");
            const minusBtn = row.querySelector(".btn-minus");
            if (minusBtn) minusBtn.disabled = currentQty === 0;

            updateSummaries();
            updateVisualAndPrice();
        });

        // Add to Cart
        addToCartBtn.addEventListener("click", () => {
            const priceInfo = window.burgerPricingEngine.calculatePrice(currentBurger);
            const options = window.burgerPricingEngine.options;

            const bunObj = options.bread.options.find(b => b.id === currentBurger.bread);
            const bunName = bunObj ? bunObj.name : "Custom Bun";

            // Description of customization
            const details = [];
            details.push(bunName);

            // Patties summary
            let pattyCount = 0;
            Object.entries(currentBurger.patties).forEach(([pid, qty]) => {
                const pObj = options.patty.options.find(p => p.id === pid);
                if (pObj && qty > 0) {
                    details.push(`${qty}x ${pObj.name}`);
                    pattyCount += qty;
                }
            });

            // Toppings summary
            Object.entries(currentBurger.toppings).forEach(([tid, qty]) => {
                const tObj = options.toppings.options.find(t => t.id === tid);
                if (tObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${tObj.name}`);
            });

            // Salad & Sauces summary
            Object.entries(currentBurger.saladAndSauces).forEach(([sid, qty]) => {
                const sObj = options.saladAndSauces.options.find(s => s.id === sid);
                if (sObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${sObj.name}`);
            });

            if (currentBurger.combo.isCombo) {
                const sideObj = options.combo.sides.find(s => s.id === currentBurger.combo.sideId);
                const drinkObj = options.combo.drinks.find(d => d.id === currentBurger.combo.drinkId);
                details.push(`Combo: ${sideObj ? sideObj.name : "Side"} + ${drinkObj ? drinkObj.name : "Drink"}`);
            }

            const customItem = {
                id: `custom-burger-${Date.now()}`,
                name: currentBurger.combo.isCombo ? "Custom Burger (Combo)" : "Custom Burger (Solo)",
                description: details.join(", "),
                price: priceInfo.totalPrice,
                isCustom: true
            };

            // Add to state cart and localStorage
            if (typeof addToCart === "function") {
                addToCart(customItem);
            } else if (window.addToCart) {
                window.addToCart(customItem);
            }

            closeModal();

            // Open cart drawer to confirm addition
            const cartDrawer = document.getElementById("cart-drawer");
            const cartOverlay = document.getElementById("cart-drawer-overlay");
            if (cartDrawer && cartOverlay) {
                cartDrawer.classList.add("active");
                cartOverlay.classList.add("active");
            }
        });
    }

    /**
     * Update accordion summaries
     */
    function updateSummaries() {
        const priceInfo = window.burgerPricingEngine.calculatePrice(currentBurger);

        const summaryPatty = document.getElementById("summary-patty");
        if (summaryPatty) {
            if (priceInfo.totalPatties === 0) {
                summaryPatty.textContent = "Select a patty";
            } else {
                const pattyLabel = priceInfo.totalPatties === 1 ? "patty" : "patties";
                summaryPatty.textContent = `${priceInfo.totalPatties} ${pattyLabel} ${priceInfo.extraPatties > 0 ? `(+$${priceInfo.pattiesCost.toFixed(2)})` : "(1st free)"}`;
            }
        }

        const summaryToppings = document.getElementById("summary-toppings");
        if (summaryToppings) {
            summaryToppings.textContent = priceInfo.totalToppings > 0 ? `${priceInfo.totalToppings} toppings (+$${priceInfo.toppingsCost.toFixed(2)})` : "+$1.29 each";
        }

        const summarySalad = document.getElementById("summary-salad");
        if (summarySalad) {
            summarySalad.textContent = `${priceInfo.totalSaladSauces} items ${priceInfo.extraSaladSauces > 0 ? `(+$${priceInfo.saladSaucesCost.toFixed(2)})` : "(first 6 free)"}`;
        }
    }

    /**
     * Dynamically update the live price and minimal SVG stack
     */
    function updateVisualAndPrice() {
        if (!window.burgerPricingEngine) return;
        const priceInfo = window.burgerPricingEngine.calculatePrice(currentBurger);

        const priceDisplay = document.getElementById("live-price-display");
        if (priceDisplay) {
            priceDisplay.textContent = `$${priceInfo.totalPrice.toFixed(2)}`;
        }

        renderBurgerSvgStack();
    }

    /**
     * Render very minimal SVGs for the stacked burger in real time
     */
    function renderBurgerSvgStack() {
        const stackEl = document.getElementById("burger-svg-stack");
        if (!stackEl) return;

        let layersHtml = "";

        // 1. Top Bun SVG
        layersHtml += `
            <div class="svg-layer-wrap layer-top-bun">
                <svg viewBox="0 0 200 50" class="burger-svg" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 24 45 C 24 10, 176 10, 176 45 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                    <ellipse cx="65" cy="28" rx="2.5" ry="1.2" fill="#111827"/>
                    <ellipse cx="100" cy="22" rx="2.5" ry="1.2" fill="#111827"/>
                    <ellipse cx="135" cy="28" rx="2.5" ry="1.2" fill="#111827"/>
                    <ellipse cx="80" cy="36" rx="2.5" ry="1.2" fill="#111827"/>
                    <ellipse cx="120" cy="36" rx="2.5" ry="1.2" fill="#111827"/>
                </svg>
            </div>
        `;

        // 2. Sauces (if any)
        const sauceList = ["mustard", "mayo", "bbq", "chipotle"];
        sauceList.forEach(sId => {
            const count = currentBurger.saladAndSauces[sId] || 0;
            if (count > 0) {
                layersHtml += `
                    <div class="svg-layer-wrap layer-sauce" title="${sId}">
                        <svg viewBox="0 0 200 16" class="burger-svg">
                            <path d="M 36 8 Q 50 14, 65 8 T 95 8 T 125 8 T 155 8 T 165 8" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 3. Salad items (Lettuce, Tomato, Pickle, Red Onion, Jalapeno)
        if (currentBurger.saladAndSauces["tomato"] > 0) {
            for (let i = 0; i < Math.min(currentBurger.saladAndSauces["tomato"], 3); i++) {
                layersHtml += `
                    <div class="svg-layer-wrap layer-tomato">
                        <svg viewBox="0 0 200 20" class="burger-svg">
                            <rect x="28" y="3" width="144" height="13" rx="6.5" fill="#f3f4f6" stroke="#111827" stroke-width="2"/>
                            <circle cx="68" cy="9.5" r="2.5" fill="#111827"/>
                            <circle cx="100" cy="9.5" r="2.5" fill="#111827"/>
                            <circle cx="132" cy="9.5" r="2.5" fill="#111827"/>
                        </svg>
                    </div>
                `;
            }
        }

        if (currentBurger.saladAndSauces["pickle"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-pickle">
                    <svg viewBox="0 0 200 18" class="burger-svg">
                        <ellipse cx="65" cy="9" rx="25" ry="6" fill="#f3f4f6" stroke="#111827" stroke-width="2"/>
                        <ellipse cx="135" cy="9" rx="25" ry="6" fill="#f3f4f6" stroke="#111827" stroke-width="2"/>
                    </svg>
                </div>
            `;
        }

        if (currentBurger.saladAndSauces["red-onion"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-onion">
                    <svg viewBox="0 0 200 18" class="burger-svg">
                        <path d="M 38 12 C 40 4, 95 4, 98 12" fill="none" stroke="#111827" stroke-width="2.5"/>
                        <path d="M 102 12 C 105 4, 160 4, 162 12" fill="none" stroke="#111827" stroke-width="2.5"/>
                    </svg>
                </div>
            `;
        }

        if (currentBurger.saladAndSauces["jalapeno"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-jalapeno">
                    <svg viewBox="0 0 200 16" class="burger-svg">
                        <circle cx="70" cy="8" r="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>
                        <circle cx="100" cy="8" r="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>
                        <circle cx="130" cy="8" r="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>
                    </svg>
                </div>
            `;
        }

        // 4. Toppings: Cheese, Bacon, Egg, Guacamole, Mushrooms, etc.
        const hasCheese = (currentBurger.toppings["cheddar"] || 0) + (currentBurger.toppings["smoked-cheddar"] || 0) + (currentBurger.toppings["blue-cheese"] || 0) > 0;
        if (hasCheese) {
            layersHtml += `
                <div class="svg-layer-wrap layer-cheese">
                    <svg viewBox="0 0 200 22" class="burger-svg">
                        <polygon points="26,3 174,3 164,18 100,21 34,18" fill="#f9fafb" stroke="#111827" stroke-width="2.5"/>
                    </svg>
                </div>
            `;
        }

        const hasBacon = (currentBurger.toppings["beef-bacon"] || 0) + (currentBurger.toppings["strip-bacon"] || 0) > 0;
        if (hasBacon) {
            layersHtml += `
                <div class="svg-layer-wrap layer-bacon">
                    <svg viewBox="0 0 200 18" class="burger-svg">
                        <path d="M 30 9 Q 50 2 70 9 T 110 9 T 150 9 T 170 9" fill="none" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>
                    </svg>
                </div>
            `;
        }

        if (currentBurger.toppings["fried-egg"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-egg">
                    <svg viewBox="0 0 200 24" class="burger-svg">
                        <ellipse cx="100" cy="12" rx="72" ry="9" fill="#ffffff" stroke="#111827" stroke-width="2.2"/>
                        <circle cx="100" cy="12" r="6" fill="#e5e7eb" stroke="#111827" stroke-width="2"/>
                    </svg>
                </div>
            `;
        }

        if (currentBurger.toppings["guacamole"] > 0 || currentBurger.toppings["mushrooms"] > 0 || currentBurger.toppings["crispy-onions"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-extra-topping">
                    <svg viewBox="0 0 200 16" class="burger-svg">
                        <path d="M 35 10 C 50 5, 75 14, 100 8 C 125 14, 150 5, 165 10" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
            `;
        }

        // 5. Patties (stack each patty)
        let renderedPatties = 0;
        Object.entries(currentBurger.patties).forEach(([pid, qty]) => {
            for (let i = 0; i < qty; i++) {
                renderedPatties++;
                layersHtml += `
                    <div class="svg-layer-wrap layer-patty">
                        <svg viewBox="0 0 200 30" class="burger-svg">
                            <rect x="25" y="4" width="150" height="22" rx="10" fill="#374151" stroke="#111827" stroke-width="2.5"/>
                            <line x1="42" y1="15" x2="158" y2="15" stroke="#1f2937" stroke-width="2" stroke-dasharray="5,5"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 6. Lettuce (at base of patties)
        if (currentBurger.saladAndSauces["lettuce"] > 0) {
            layersHtml += `
                <div class="svg-layer-wrap layer-lettuce">
                    <svg viewBox="0 0 200 24" class="burger-svg">
                        <path d="M 22 14 Q 35 4, 50 14 T 80 14 T 110 14 T 140 14 T 170 14 T 178 14" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;
        }

        // 7. Bottom Bun SVG
        layersHtml += `
            <div class="svg-layer-wrap layer-bottom-bun">
                <svg viewBox="0 0 200 35" class="burger-svg" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 25 4 L 175 4 C 175 26, 25 26, 25 4 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                </svg>
            </div>
        `;

        stackEl.innerHTML = layersHtml;
    }

})();

