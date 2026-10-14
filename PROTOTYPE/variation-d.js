/**
 * Burger Builder - Variation D
 * Split-Screen Layout:
 * - Left Panel: Prominent burger stage (reused bun SVGs, simple rounded rectangle ingredients) with live layer tags
 * - Right Panel: Category pill selector + interactive cards with counter steppers
 * - Bottom: Full-width Add to Cart button
 * - Reuses existing minimal bun SVGs and simple rounded rectangles for all ingredients
 */

(function () {
    let builderModalRoot = null;

    let builderState = {
        activeCategory: "bun", // "bun" | "patty" | "toppings" | "salads"
        bread: "sesame",
        patties: { "beef-patty": 1 },
        toppings: {},
        saladAndSauces: {},
        baseItem: null
    };

    /**
     * Reused Top Bun SVG
     */
    function getTopBunSvg() {
        return `
            <div class="var-d-bun-top" title="Top Bun">
                <svg viewBox="0 0 220 50" class="var-d-svg-bun">
                    <path d="M 26 44 C 26 12, 194 12, 194 44 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                </svg>
            </div>
        `;
    }

    /**
     * Reused Bottom Bun SVG
     */
    function getBottomBunSvg() {
        return `
            <div class="var-d-bun-bottom" title="Bottom Bun">
                <svg viewBox="0 0 220 36" class="var-d-svg-bun">
                    <path d="M 28 6 L 192 6 C 192 30, 28 30, 28 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                </svg>
            </div>
        `;
    }

    /**
     * Centralized Burger Preview with Simple Rounded Rectangle Ingredients
     */
    function getBurgerVisualHtml() {
        let layersHtml = "";
        let count = 0;

        // 1. Sauces & Salads
        Object.entries(builderState.saladAndSauces).forEach(([sid, qty]) => {
            for (let i = 0; i < qty; i++) {
                count++;
                layersHtml += `
                    <div class="var-d-layer-rect var-d-layer-salad" title="${sid}">
                        <svg viewBox="0 0 220 14" class="var-d-svg-rect">
                            <rect x="36" y="2" width="148" height="10" rx="5" fill="#f3f4f6" stroke="#111827" stroke-width="2"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 2. Toppings
        Object.entries(builderState.toppings).forEach(([tid, qty]) => {
            for (let i = 0; i < qty; i++) {
                count++;
                layersHtml += `
                    <div class="var-d-layer-rect var-d-layer-topping" title="${tid}">
                        <svg viewBox="0 0 220 16" class="var-d-svg-rect">
                            <rect x="32" y="2" width="156" height="12" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 3. Patties (darker fill)
        Object.entries(builderState.patties).forEach(([pid, qty]) => {
            for (let i = 0; i < qty; i++) {
                count++;
                layersHtml += `
                    <div class="var-d-layer-rect var-d-layer-patty" title="${pid}">
                        <svg viewBox="0 0 220 24" class="var-d-svg-rect">
                            <rect x="28" y="2" width="164" height="20" rx="8" fill="#374151" stroke="#111827" stroke-width="2.5"/>
                        </svg>
                    </div>
                `;
            }
        });

        if (count === 0) {
            layersHtml = `<div class="var-d-empty-gap"><span class="var-d-dashed-line"></span></div>`;
        }

        return `
            ${getTopBunSvg()}
            <div class="var-d-fillings-stack">
                ${layersHtml}
            </div>
            ${getBottomBunSvg()}
        `;
    }

    /**
     * Get options list for current category
     */
    function getCurrentCategoryOptions() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : (typeof FALLBACK_BUILDER_OPTIONS !== "undefined" ? FALLBACK_BUILDER_OPTIONS : null);

        if (!options) return [];

        switch (builderState.activeCategory) {
            case "bun":
                return options.bread.options;
            case "patty":
                return options.patty.options;
            case "toppings":
                return options.toppings.options;
            case "salads":
                return options.saladAndSauces.options;
            default:
                return options.bread.options;
        }
    }

    /**
     * Get active quantity of an item
     */
    function getItemQty(id) {
        if (builderState.activeCategory === "bun") {
            return builderState.bread === id ? 1 : 0;
        } else if (builderState.activeCategory === "patty") {
            return builderState.patties[id] || 0;
        } else if (builderState.activeCategory === "toppings") {
            return builderState.toppings[id] || 0;
        } else if (builderState.activeCategory === "salads") {
            return builderState.saladAndSauces[id] || 0;
        }
        return 0;
    }

    /**
     * Modify item quantity
     */
    function adjustQty(id, delta) {
        if (builderState.activeCategory === "bun") {
            builderState.bread = id;
            return;
        }

        let stateObj = null;
        if (builderState.activeCategory === "patty") stateObj = builderState.patties;
        else if (builderState.activeCategory === "toppings") stateObj = builderState.toppings;
        else if (builderState.activeCategory === "salads") stateObj = builderState.saladAndSauces;

        if (!stateObj) return;

        let cur = stateObj[id] || 0;
        cur = Math.max(0, cur + delta);
        if (cur === 0) {
            delete stateObj[id];
        } else {
            stateObj[id] = cur;
        }
    }

    /**
     * Get active layer count summary
     */
    function getTotalLayerCount() {
        let total = 2; // top & bottom bun
        Object.values(builderState.patties).forEach(q => total += q);
        Object.values(builderState.toppings).forEach(q => total += q);
        Object.values(builderState.saladAndSauces).forEach(q => total += q);
        return total;
    }

    /**
     * Close Variation D modal
     */
    function closeBuilder() {
        if (builderModalRoot) {
            builderModalRoot.innerHTML = "";
        }
    }

    /**
     * Open Variation D Modal
     */
    window.openBuilderVariationD = function (item) {
        if (!builderModalRoot) {
            builderModalRoot = document.getElementById("builder-modal-root");
        }
        if (!builderModalRoot) {
            console.error("builder-modal-root not found");
            return;
        }

        builderState.baseItem = item;
        builderState.activeCategory = "bun";
        builderState.bread = "sesame";
        builderState.patties = { "beef-patty": 1 };
        builderState.toppings = {};
        builderState.saladAndSauces = {};

        renderModal();
    };

    /**
     * Render Variation D Modal
     */
    function renderModal() {
        const currentOptions = getCurrentCategoryOptions();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-d-overlay">
                <div class="builder-modal var-d-modal" role="dialog" aria-modal="true" aria-label="Burger Builder Variation D">
                    
                    <div class="var-d-header">
                        <div class="var-d-header-left">
                            <h2 class="var-d-title">BUILD YOUR BURGER</h2>
                            <span class="var-d-layer-counter" id="var-d-counter">${getTotalLayerCount()} total layers</span>
                        </div>
                        <button type="button" class="modal-close-btn var-d-close-btn" id="var-d-close" aria-label="Close modal">&times;</button>
                    </div>

                    <div class="var-d-body">
                        <!-- Left Panel: Large Centralized Burger Visual -->
                        <div class="var-d-left-panel">
                            <div class="var-d-burger-stage">
                                <div class="var-d-burger-preview" id="var-d-burger-preview">
                                    ${getBurgerVisualHtml()}
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Category Pills & Item Cards -->
                        <div class="var-d-right-panel">
                            <div class="var-d-category-pills" role="tablist">
                                <button type="button" class="var-d-pill ${builderState.activeCategory === "bun" ? "active" : ""}" data-category="bun">BUN</button>
                                <button type="button" class="var-d-pill ${builderState.activeCategory === "patty" ? "active" : ""}" data-category="patty">PATTY</button>
                                <button type="button" class="var-d-pill ${builderState.activeCategory === "toppings" ? "active" : ""}" data-category="toppings">TOPPINGS</button>
                                <button type="button" class="var-d-pill ${builderState.activeCategory === "salads" ? "active" : ""}" data-category="salads">SALADS</button>
                            </div>

                            <div class="var-d-items-grid" id="var-d-items-grid">
                                ${renderItemsGridHtml(currentOptions)}
                            </div>
                        </div>
                    </div>

                    <div class="var-d-footer">
                        <button type="button" class="var-d-add-btn" id="var-d-add">
                            ADD TO CART
                        </button>
                    </div>

                </div>
            </div>
        `;

        setupEvents();
    }

    function renderItemsGridHtml(options) {
        const isBun = builderState.activeCategory === "bun";

        return options.map(opt => {
            const qty = getItemQty(opt.id);
            const isSelected = qty > 0;

            if (isBun) {
                return `
                    <button type="button" class="var-d-item-card var-d-card-radio ${isSelected ? "selected" : ""}" data-id="${opt.id}">
                        <div class="var-d-card-radio-circle">${isSelected ? "✓" : ""}</div>
                        <span class="var-d-card-name">${opt.name}</span>
                    </button>
                `;
            }

            return `
                <div class="var-d-item-card ${isSelected ? "selected" : ""}" data-id="${opt.id}">
                    <span class="var-d-card-name">${opt.name}</span>
                    <div class="var-d-stepper">
                        <button type="button" class="var-d-step-btn btn-minus" data-id="${opt.id}" ${qty === 0 ? "disabled" : ""}>&minus;</button>
                        <span class="var-d-step-qty">${qty}</span>
                        <button type="button" class="var-d-step-btn btn-plus" data-id="${opt.id}">&#43;</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    function setupEvents() {
        const overlay = document.getElementById("var-d-overlay");
        const closeBtn = document.getElementById("var-d-close");
        const addBtn = document.getElementById("var-d-add");
        const pillsGroup = document.querySelector(".var-d-category-pills");
        const gridEl = document.getElementById("var-d-items-grid");
        const previewEl = document.getElementById("var-d-burger-preview");
        const counterEl = document.getElementById("var-d-counter");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        // Pill category change
        pillsGroup?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-d-pill");
            if (!btn) return;

            const cat = btn.dataset.category;
            if (builderState.activeCategory === cat) return;

            builderState.activeCategory = cat;

            pillsGroup.querySelectorAll(".var-d-pill").forEach(p => {
                p.classList.toggle("active", p.dataset.category === cat);
            });

            if (gridEl) {
                gridEl.innerHTML = renderItemsGridHtml(getCurrentCategoryOptions());
            }
        });

        // Grid interactions
        gridEl?.addEventListener("click", (e) => {
            const isBun = builderState.activeCategory === "bun";

            if (isBun) {
                const card = e.target.closest(".var-d-card-radio");
                if (!card) return;
                adjustQty(card.dataset.id, 1);
            } else {
                const btn = e.target.closest(".var-d-step-btn");
                if (!btn) return;
                const id = btn.dataset.id;
                const delta = btn.classList.contains("btn-plus") ? 1 : -1;
                adjustQty(id, delta);
            }

            if (gridEl) {
                gridEl.innerHTML = renderItemsGridHtml(getCurrentCategoryOptions());
            }
            if (previewEl) {
                previewEl.innerHTML = getBurgerVisualHtml();
            }
            if (counterEl) {
                counterEl.textContent = `${getTotalLayerCount()} total layers`;
            }
        });

        // Add to cart
        addBtn?.addEventListener("click", () => {
            const customItem = {
                id: `custom-burger-d-${Date.now()}`,
                name: "Build Your Own Burger (Variation D)",
                price: (builderState.baseItem && builderState.baseItem.price) ? builderState.baseItem.price : 10.99,
                description: "Custom crafted burger with selected ingredients",
                isCustom: true
            };

            if (typeof addToCart === "function") {
                addToCart(customItem);
            } else if (window.addToCart) {
                window.addToCart(customItem);
            }

            closeBuilder();

            const cartDrawer = document.getElementById("cart-drawer");
            const cartOverlay = document.getElementById("cart-drawer-overlay");
            if (cartDrawer && cartOverlay) {
                cartDrawer.classList.add("active");
                cartOverlay.classList.add("active");
            }
        });
    }

})();

