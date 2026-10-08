/**
 * Burger Builder - Variation C
 * Based on the provided wireframe sketch:
 * - Top Navigation Tabs: [ BUN ] [ PATTY ] [ TOPPINGS ] [ SALAD & SAUCE ] and (X) Close button
 * - Centralized Burger Preview: Reused minimal SVGs for top and bottom bun, simple rounded rectangles for ingredients
 * - 3x2 Grid of Option Cards below burger
 * - Bottom Pill/Oval [ ADD ] button
 * - No prices displayed (clean clickable categories)
 */

(function () {
    let builderModalRoot = null;

    // State for Variation C
    let builderState = {
        activeCategory: "bun", // "bun" | "patty" | "toppings" | "salads"
        bread: "sesame",
        patties: { "beef-patty": 1 }, // Default 1 beef patty (matches sketch burger with patty)
        toppings: {},
        saladAndSauces: {},
        baseItem: null
    };

    /**
     * Reused Top Bun SVG
     */
    function getTopBunSvg() {
        return `
            <div class="var-c-bun-top" title="Top Bun">
                <svg viewBox="0 0 220 50" class="var-c-svg-bun">
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
            <div class="var-c-bun-bottom" title="Bottom Bun">
                <svg viewBox="0 0 220 36" class="var-c-svg-bun">
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

        // 1. Sauces & Salads (Simple rounded rectangle layers)
        Object.entries(builderState.saladAndSauces).forEach(([sid, qty]) => {
            if (qty > 0) {
                count++;
                layersHtml += `
                    <div class="var-c-layer-rect var-c-layer-salad" title="${sid}">
                        <svg viewBox="0 0 220 14" class="var-c-svg-rect">
                            <rect x="36" y="2" width="148" height="10" rx="5" fill="#f3f4f6" stroke="#111827" stroke-width="2"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 2. Toppings (Simple rounded rectangle layers)
        Object.entries(builderState.toppings).forEach(([tid, qty]) => {
            if (qty > 0) {
                count++;
                layersHtml += `
                    <div class="var-c-layer-rect var-c-layer-topping" title="${tid}">
                        <svg viewBox="0 0 220 16" class="var-c-svg-rect">
                            <rect x="32" y="2" width="156" height="12" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 3. Patties (Simple rounded rectangle layers - darker fill)
        Object.entries(builderState.patties).forEach(([pid, qty]) => {
            for (let i = 0; i < qty; i++) {
                count++;
                layersHtml += `
                    <div class="var-c-layer-rect var-c-layer-patty" title="${pid}">
                        <svg viewBox="0 0 220 24" class="var-c-svg-rect">
                            <rect x="28" y="2" width="164" height="20" rx="8" fill="#374151" stroke="#111827" stroke-width="2.5"/>
                        </svg>
                    </div>
                `;
            }
        });

        // If completely empty, show wireframe guide line
        if (count === 0) {
            layersHtml = `
                <div class="var-c-empty-gap">
                    <span class="var-c-dashed-line"></span>
                </div>
            `;
        }

        return `
            ${getTopBunSvg()}
            <div class="var-c-fillings-stack">
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
     * Check if an option is currently selected
     */
    function isOptionSelected(id) {
        if (builderState.activeCategory === "bun") {
            return builderState.bread === id;
        } else if (builderState.activeCategory === "patty") {
            return (builderState.patties[id] || 0) > 0;
        } else if (builderState.activeCategory === "toppings") {
            return (builderState.toppings[id] || 0) > 0;
        } else if (builderState.activeCategory === "salads") {
            return (builderState.saladAndSauces[id] || 0) > 0;
        }
        return false;
    }

    /**
     * Toggle or select an option
     */
    function toggleOption(id) {
        if (builderState.activeCategory === "bun") {
            builderState.bread = id;
        } else if (builderState.activeCategory === "patty") {
            if (builderState.patties[id]) {
                delete builderState.patties[id];
            } else {
                builderState.patties[id] = 1;
            }
        } else if (builderState.activeCategory === "toppings") {
            if (builderState.toppings[id]) {
                delete builderState.toppings[id];
            } else {
                builderState.toppings[id] = 1;
            }
        } else if (builderState.activeCategory === "salads") {
            if (builderState.saladAndSauces[id]) {
                delete builderState.saladAndSauces[id];
            } else {
                builderState.saladAndSauces[id] = 1;
            }
        }
    }

    /**
     * Close Variation C modal
     */
    function closeBuilder() {
        if (builderModalRoot) {
            builderModalRoot.innerHTML = "";
        }
    }

    /**
     * Open Variation C Modal
     */
    window.openBuilderVariationC = function (item) {
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
        builderState.patties = { "beef-patty": 1 }; // Default 1 beef patty
        builderState.toppings = {};
        builderState.saladAndSauces = {};

        renderModal();
    };

    /**
     * Render the whole Variation C modal
     */
    function renderModal() {
        const currentOptions = getCurrentCategoryOptions();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-c-overlay">
                <div class="builder-modal var-c-modal" role="dialog" aria-modal="true" aria-label="Burger Builder Variation C">
                    
                    <!-- Top Category Tabs & Close Button matching Sketch -->
                    <div class="var-c-header">
                        <div class="var-c-tabs-group" role="tablist" aria-label="Builder Categories">
                            <button type="button" class="var-c-tab-btn ${builderState.activeCategory === "bun" ? "active" : ""}" data-category="bun" role="tab" aria-selected="${builderState.activeCategory === "bun"}">BUN</button>
                            <button type="button" class="var-c-tab-btn ${builderState.activeCategory === "patty" ? "active" : ""}" data-category="patty" role="tab" aria-selected="${builderState.activeCategory === "patty"}">PATTY</button>
                            <button type="button" class="var-c-tab-btn ${builderState.activeCategory === "toppings" ? "active" : ""}" data-category="toppings" role="tab" aria-selected="${builderState.activeCategory === "toppings"}">TOPPINGS</button>
                            <button type="button" class="var-c-tab-btn ${builderState.activeCategory === "salads" ? "active" : ""}" data-category="salads" role="tab" aria-selected="${builderState.activeCategory === "salads"}">SALAD & SAUCE</button>
                        </div>
                        <button type="button" class="modal-close-btn var-c-close-btn" id="var-c-close" aria-label="Close modal">&times;</button>
                    </div>

                    <!-- Modal Body: Centered Burger Preview & 3x2 Option Grid -->
                    <div class="var-c-body">
                        
                        <!-- Centralized Burger Visual -->
                        <div class="var-c-burger-stage">
                            <div class="var-c-burger-preview" id="var-c-burger-preview">
                                ${getBurgerVisualHtml()}
                            </div>
                        </div>

                        <!-- 3x2 Grid of Option Cards (No prices displayed) -->
                        <div class="var-c-grid" id="var-c-grid" role="group" aria-label="Category Options">
                            ${currentOptions.map(opt => {
                                const selected = isOptionSelected(opt.id);
                                return `
                                    <button type="button" 
                                            class="var-c-card ${selected ? "active" : ""}" 
                                            data-id="${opt.id}">
                                        <span class="var-c-card-check">${selected ? "✓" : ""}</span>
                                        <span class="var-c-card-title">${opt.name}</span>
                                    </button>
                                `;
                            }).join("")}
                        </div>

                    </div>

                    <!-- Bottom Centered Oval ADD Button matching Sketch -->
                    <div class="var-c-footer">
                        <button type="button" class="var-c-add-btn" id="var-c-add">
                            ADD
                        </button>
                    </div>

                </div>
            </div>
        `;

        setupEvents();
    }

    /**
     * Wire up events for Variation C
     */
    function setupEvents() {
        const overlay = document.getElementById("var-c-overlay");
        const closeBtn = document.getElementById("var-c-close");
        const addBtn = document.getElementById("var-c-add");
        const tabsGroup = document.querySelector(".var-c-tabs-group");
        const gridEl = document.getElementById("var-c-grid");
        const previewEl = document.getElementById("var-c-burger-preview");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        // Tab selection (Clickable categories)
        tabsGroup?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-c-tab-btn");
            if (!btn) return;

            const category = btn.dataset.category;
            if (builderState.activeCategory === category) return;

            builderState.activeCategory = category;

            // Update active tab buttons
            tabsGroup.querySelectorAll(".var-c-tab-btn").forEach(b => {
                const isActive = b.dataset.category === category;
                b.classList.toggle("active", isActive);
                b.setAttribute("aria-selected", isActive ? "true" : "false");
            });

            // Re-render the option cards grid
            updateGrid();
        });

        // Option cards selection
        gridEl?.addEventListener("click", (e) => {
            const card = e.target.closest(".var-c-card");
            if (!card) return;

            const id = card.dataset.id;
            toggleOption(id);

            // Update grid card visual states
            updateGrid();

            // Update burger visual
            if (previewEl) {
                previewEl.innerHTML = getBurgerVisualHtml();
            }
        });

        // Click ADD button: Add burger to cart and close
        addBtn?.addEventListener("click", () => {
            const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
                ? window.burgerPricingEngine.options
                : (typeof FALLBACK_BUILDER_OPTIONS !== "undefined" ? FALLBACK_BUILDER_OPTIONS : null);

            let details = [];

            // Bread summary
            if (options && options.bread) {
                const bObj = options.bread.options.find(b => b.id === builderState.bread);
                if (bObj) details.push(bObj.name);
            }

            // Patties summary
            if (options && options.patty) {
                Object.keys(builderState.patties).forEach(pid => {
                    const pObj = options.patty.options.find(p => p.id === pid);
                    if (pObj) details.push(pObj.name);
                });
            }

            // Toppings summary
            if (options && options.toppings) {
                Object.keys(builderState.toppings).forEach(tid => {
                    const tObj = options.toppings.options.find(t => t.id === tid);
                    if (tObj) details.push(tObj.name);
                });
            }

            // Salads summary
            if (options && options.saladAndSauces) {
                Object.keys(builderState.saladAndSauces).forEach(sid => {
                    const sObj = options.saladAndSauces.options.find(s => s.id === sid);
                    if (sObj) details.push(sObj.name);
                });
            }

            const customItem = {
                id: `custom-burger-c-${Date.now()}`,
                name: "Build Your Own Burger (Variation C)",
                price: (builderState.baseItem && builderState.baseItem.price) ? builderState.baseItem.price : 10.99,
                description: details.length > 0 ? details.join(", ") : "Custom crafted burger",
                isCustom: true
            };

            if (typeof addToCart === "function") {
                addToCart(customItem);
            } else if (window.addToCart) {
                window.addToCart(customItem);
            }

            closeBuilder();

            // Open cart drawer
            const cartDrawer = document.getElementById("cart-drawer");
            const cartOverlay = document.getElementById("cart-drawer-overlay");
            if (cartDrawer && cartOverlay) {
                cartDrawer.classList.add("active");
                cartOverlay.classList.add("active");
            }
        });
    }

    /**
     * Update the option cards grid in place
     */
    function updateGrid() {
        const gridEl = document.getElementById("var-c-grid");
        if (!gridEl) return;

        const currentOptions = getCurrentCategoryOptions();
        gridEl.innerHTML = currentOptions.map(opt => {
            const selected = isOptionSelected(opt.id);
            return `
                <button type="button" 
                        class="var-c-card ${selected ? "active" : ""}" 
                        data-id="${opt.id}">
                    <span class="var-c-card-check">${selected ? "✓" : ""}</span>
                    <span class="var-c-card-title">${opt.name}</span>
                </button>
            `;
        }).join("");
    }

})();

