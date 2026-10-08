/**
 * Burger Builder - Variation B
 * Step-by-Step Wizard Layout
 * Step 1: BREAD (Select 1 required)
 * Step 2: PATTY (Counter steppers with - and +, 1st free, extra +$4.70 each)
 * Step 3: TOPPINGS (Counter steppers with - and +, +$1.29 each)
 * Step 4: SALADS & CONDIMENTS (Counter steppers with - and +, first 6 free, extra +$0.50 each)
 */

(function () {
    let builderModalRoot = null;

    // State for Variation B
    let builderState = {
        currentStep: 1, // 1: Bread, 2: Patty, 3: Toppings, 4: Salads & Condiments
        bread: "sesame",
        patties: { "beef-patty": 1 }, // Default 1 beef patty (included/free)
        toppings: {},
        saladAndSauces: {},
        combo: { isCombo: false, sideId: "fries", drinkId: "fountain-drink" },
        baseItem: null
    };

    /**
     * Get Top Bun SVG markup for a given bread type
     */
    function getTopBunSvg(breadId) {
        switch (breadId) {
            case "gluten-free":
                return `
                    <div class="var-b-bun-top" title="Gluten Free Top Bun">
                        <svg viewBox="0 0 240 70" class="var-b-svg-bun">
                            <path d="M 30 60 C 30 18, 210 18, 210 60 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <rect x="100" y="32" width="40" height="16" rx="4" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
                            <text x="120" y="44" font-family="sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#111827">GF</text>
                        </svg>
                    </div>
                `;
            case "multigrain":
                return `
                    <div class="var-b-bun-top" title="Multigrain Top Bun">
                        <svg viewBox="0 0 240 70" class="var-b-svg-bun">
                            <path d="M 28 60 C 28 16, 212 16, 212 60 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <rect x="65" y="35" width="6" height="3" rx="1.5" transform="rotate(-20 65 35)" fill="#111827"/>
                            <rect x="95" y="28" width="6" height="3" rx="1.5" transform="rotate(15 95 28)" fill="#111827"/>
                            <rect x="125" y="25" width="7" height="3" rx="1.5" transform="rotate(-10 125 25)" fill="#111827"/>
                            <rect x="155" y="32" width="6" height="3" rx="1.5" transform="rotate(25 155 32)" fill="#111827"/>
                            <circle cx="80" cy="48" r="2" fill="#111827"/>
                            <circle cx="110" cy="42" r="2" fill="#111827"/>
                            <circle cx="140" cy="45" r="2" fill="#111827"/>
                            <circle cx="170" cy="48" r="2" fill="#111827"/>
                        </svg>
                    </div>
                `;
            case "potato-bun":
                return `
                    <div class="var-b-bun-top" title="Potato Bun Top Bun">
                        <svg viewBox="0 0 240 70" class="var-b-svg-bun">
                            <path d="M 26 58 C 26 12, 214 12, 214 58 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <path d="M 50 32 C 75 22, 165 22, 190 32" fill="none" stroke="#e5e7eb" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                `;
            case "ciabatta":
                return `
                    <div class="var-b-bun-top" title="Ciabatta Top Bun">
                        <svg viewBox="0 0 240 65" class="var-b-svg-bun">
                            <path d="M 28 54 C 28 26, 45 16, 120 16 C 195 16, 212 26, 212 54 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <ellipse cx="70" cy="36" rx="8" ry="3" fill="#f3f4f6" stroke="#111827" stroke-width="1.2"/>
                            <ellipse cx="120" cy="32" rx="10" ry="3.5" fill="#f3f4f6" stroke="#111827" stroke-width="1.2"/>
                            <ellipse cx="170" cy="36" rx="8" ry="3" fill="#f3f4f6" stroke="#111827" stroke-width="1.2"/>
                        </svg>
                    </div>
                `;
            case "sesame":
            default:
                return `
                    <div class="var-b-bun-top" title="Sesame Seed Top Bun">
                        <svg viewBox="0 0 240 70" class="var-b-svg-bun">
                            <path d="M 28 60 C 28 15, 212 15, 212 60 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <ellipse cx="75" cy="38" rx="3" ry="1.5" transform="rotate(-15 75 38)" fill="#111827"/>
                            <ellipse cx="100" cy="30" rx="3.5" ry="1.8" transform="rotate(35 100 30)" fill="#111827"/>
                            <ellipse cx="125" cy="26" rx="3.5" ry="1.8" transform="rotate(-10 125 26)" fill="#111827"/>
                            <ellipse cx="150" cy="32" rx="3.5" ry="1.8" transform="rotate(40 150 32)" fill="#111827"/>
                            <ellipse cx="175" cy="42" rx="3" ry="1.5" transform="rotate(-25 175 42)" fill="#111827"/>
                            <ellipse cx="115" cy="44" rx="3.5" ry="1.8" transform="rotate(-30 115 44)" fill="#111827"/>
                            <ellipse cx="140" cy="46" rx="3.5" ry="1.8" transform="rotate(20 140 46)" fill="#111827"/>
                        </svg>
                    </div>
                `;
        }
    }

    /**
     * Get Bottom Bun SVG markup for a given bread type
     */
    function getBottomBunSvg(breadId) {
        switch (breadId) {
            case "gluten-free":
                return `
                    <div class="var-b-bun-bottom" title="Gluten Free Bottom Bun">
                        <svg viewBox="0 0 240 45" class="var-b-svg-bun">
                            <path d="M 32 6 L 208 6 C 208 32, 32 32, 32 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                `;
            case "multigrain":
                return `
                    <div class="var-b-bun-bottom" title="Multigrain Bottom Bun">
                        <svg viewBox="0 0 240 45" class="var-b-svg-bun">
                            <path d="M 30 6 L 210 6 C 210 32, 30 32, 30 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                            <circle cx="90" cy="20" r="1.5" fill="#111827"/>
                            <circle cx="150" cy="20" r="1.5" fill="#111827"/>
                        </svg>
                    </div>
                `;
            case "potato-bun":
                return `
                    <div class="var-b-bun-bottom" title="Potato Bun Bottom Bun">
                        <svg viewBox="0 0 240 45" class="var-b-svg-bun">
                            <path d="M 28 6 L 212 6 C 212 34, 28 34, 28 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                `;
            case "ciabatta":
                return `
                    <div class="var-b-bun-bottom" title="Ciabatta Bottom Bun">
                        <svg viewBox="0 0 240 45" class="var-b-svg-bun">
                            <path d="M 28 6 L 212 6 C 212 28, 204 34, 120 34 C 36 34, 28 28, 28 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                `;
            case "sesame":
            default:
                return `
                    <div class="var-b-bun-bottom" title="Sesame Seed Bottom Bun">
                        <svg viewBox="0 0 240 45" class="var-b-svg-bun">
                            <path d="M 30 6 L 210 6 C 210 32, 30 32, 30 6 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                `;
        }
    }

    /**
     * Get Centralized Burger Stack SVG (Top bun, sauces, veggies, toppings, patties, lettuce, bottom bun)
     */
    function getCentralizedBurgerSvg() {
        let layersHtml = "";
        let totalFillings = 0;

        // 1. Sauces (if any selected)
        const sauceList = ["mustard", "mayo", "bbq", "chipotle"];
        sauceList.forEach(sId => {
            const count = builderState.saladAndSauces[sId] || 0;
            if (count > 0) {
                totalFillings++;
                layersHtml += `
                    <div class="var-b-layer var-b-layer-sauce" title="${sId}">
                        <svg viewBox="0 0 240 18" class="var-b-svg-layer">
                            <path d="M 40 9 Q 60 16, 80 9 T 120 9 T 160 9 T 200 9" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 2. Veggies (Tomato, Pickle, Red Onion, Jalapeño)
        if (builderState.saladAndSauces["tomato"] > 0) {
            for (let i = 0; i < Math.min(builderState.saladAndSauces["tomato"], 3); i++) {
                totalFillings++;
                layersHtml += `
                    <div class="var-b-layer var-b-layer-tomato" title="Tomato">
                        <svg viewBox="0 0 240 22" class="var-b-svg-layer">
                            <rect x="32" y="3" width="176" height="15" rx="7.5" fill="#f3f4f6" stroke="#111827" stroke-width="2.2"/>
                            <circle cx="80" cy="10.5" r="3" fill="#111827"/>
                            <circle cx="120" cy="10.5" r="3" fill="#111827"/>
                            <circle cx="160" cy="10.5" r="3" fill="#111827"/>
                        </svg>
                    </div>
                `;
            }
        }

        if (builderState.saladAndSauces["pickle"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-pickle" title="Pickles">
                    <svg viewBox="0 0 240 20" class="var-b-svg-layer">
                        <ellipse cx="75" cy="10" rx="30" ry="7" fill="#f3f4f6" stroke="#111827" stroke-width="2.2"/>
                        <ellipse cx="165" cy="10" rx="30" ry="7" fill="#f3f4f6" stroke="#111827" stroke-width="2.2"/>
                    </svg>
                </div>
            `;
        }

        if (builderState.saladAndSauces["red-onion"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-onion" title="Red Onion">
                    <svg viewBox="0 0 240 20" class="var-b-svg-layer">
                        <path d="M 45 13 C 48 4, 115 4, 118 13" fill="none" stroke="#111827" stroke-width="2.5"/>
                        <path d="M 122 13 C 125 4, 192 4, 195 13" fill="none" stroke="#111827" stroke-width="2.5"/>
                    </svg>
                </div>
            `;
        }

        if (builderState.saladAndSauces["jalapeno"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-jalapeno" title="Jalapeño">
                    <svg viewBox="0 0 240 18" class="var-b-svg-layer">
                        <circle cx="85" cy="9" r="7" fill="#ffffff" stroke="#111827" stroke-width="2.2"/>
                        <circle cx="120" cy="9" r="7" fill="#ffffff" stroke="#111827" stroke-width="2.2"/>
                        <circle cx="155" cy="9" r="7" fill="#ffffff" stroke="#111827" stroke-width="2.2"/>
                    </svg>
                </div>
            `;
        }

        // 3. Toppings (Cheese, Bacon, Egg, etc.)
        const hasCheese = (builderState.toppings["cheddar"] || 0) + (builderState.toppings["smoked-cheddar"] || 0) + (builderState.toppings["blue-cheese"] || 0) > 0;
        if (hasCheese) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-cheese" title="Cheese">
                    <svg viewBox="0 0 240 24" class="var-b-svg-layer">
                        <polygon points="28,3 212,3 198,19 120,23 42,19" fill="#f9fafb" stroke="#111827" stroke-width="2.5"/>
                    </svg>
                </div>
            `;
        }

        const hasBacon = (builderState.toppings["beef-bacon"] || 0) + (builderState.toppings["strip-bacon"] || 0) > 0;
        if (hasBacon) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-bacon" title="Bacon">
                    <svg viewBox="0 0 240 20" class="var-b-svg-layer">
                        <path d="M 35 10 Q 60 2, 85 10 T 135 10 T 185 10 T 205 10" fill="none" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>
                    </svg>
                </div>
            `;
        }

        if (builderState.toppings["fried-egg"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-egg" title="Fried Egg">
                    <svg viewBox="0 0 240 26" class="var-b-svg-layer">
                        <ellipse cx="120" cy="13" rx="85" ry="10" fill="#ffffff" stroke="#111827" stroke-width="2.2"/>
                        <circle cx="120" cy="13" r="7" fill="#e5e7eb" stroke="#111827" stroke-width="2"/>
                    </svg>
                </div>
            `;
        }

        if (builderState.toppings["guacamole"] > 0 || builderState.toppings["mushrooms"] > 0 || builderState.toppings["crispy-onions"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-extra-topping" title="Gourmet Toppings">
                    <svg viewBox="0 0 240 18" class="var-b-svg-layer">
                        <path d="M 40 11 C 60 5, 90 15, 120 9 C 150 15, 180 5, 200 11" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
            `;
        }

        // 4. Patties
        Object.entries(builderState.patties).forEach(([pid, qty]) => {
            for (let i = 0; i < qty; i++) {
                totalFillings++;
                layersHtml += `
                    <div class="var-b-layer var-b-patty-layer" title="${pid}">
                        <svg viewBox="0 0 240 32" class="var-b-svg-patty">
                            <rect x="26" y="4" width="188" height="24" rx="10" fill="#374151" stroke="#111827" stroke-width="2.5"/>
                            <line x1="48" y1="16" x2="192" y2="16" stroke="#1f2937" stroke-width="2" stroke-dasharray="6,6"/>
                        </svg>
                    </div>
                `;
            }
        });

        // 5. Lettuce (base bed under patties)
        if (builderState.saladAndSauces["lettuce"] > 0) {
            totalFillings++;
            layersHtml += `
                <div class="var-b-layer var-b-layer-lettuce" title="Lettuce">
                    <svg viewBox="0 0 240 26" class="var-b-svg-layer">
                        <path d="M 26 15 Q 40 4, 58 15 T 95 15 T 132 15 T 169 15 T 206 15 T 214 15" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;
        }

        // If no fillings at all, render open dashed guide gap
        if (totalFillings === 0) {
            layersHtml = `
                <div class="var-b-stage-gap" aria-hidden="true">
                    <span class="gap-indicator-line"></span>
                </div>
            `;
        }

        return `
            ${getTopBunSvg(builderState.bread)}
            <div class="var-b-fillings-container">
                ${layersHtml}
            </div>
            ${getBottomBunSvg(builderState.bread)}
        `;
    }

    /**
     * Calculate current price dynamically
     */
    function getCurrentPrice() {
        if (window.burgerPricingEngine) {
            const priceInfo = window.burgerPricingEngine.calculatePrice(builderState);
            return priceInfo.totalPrice;
        }
        return 10.99;
    }

    /**
     * Close Variation B modal
     */
    function closeBuilder() {
        if (builderModalRoot) {
            builderModalRoot.innerHTML = "";
        }
    }

    /**
     * Open Variation B Modal
     */
    window.openBuilderVariationB = function (item) {
        if (!builderModalRoot) {
            builderModalRoot = document.getElementById("builder-modal-root");
        }
        if (!builderModalRoot) {
            console.error("builder-modal-root element not found in DOM");
            return;
        }

        builderState.baseItem = item;
        builderState.currentStep = 1;
        builderState.bread = "sesame";
        builderState.patties = { "beef-patty": 1 }; // Default 1 beef patty
        builderState.toppings = {};
        builderState.saladAndSauces = {};

        renderStep(1);
    };

    /**
     * Route rendering to the appropriate step
     */
    function renderStep(stepNumber) {
        builderState.currentStep = stepNumber;
        if (stepNumber === 1) {
            renderBreadStep();
        } else if (stepNumber === 2) {
            renderPattyStep();
        } else if (stepNumber === 3) {
            renderToppingsStep();
        } else if (stepNumber === 4) {
            renderSaladsStep();
        }
    }

    /**
     * Helper to render the Stepper component for steps 1 through 5
     */
    function renderStepperHtml(activeStep) {
        let dots = "";
        for (let i = 1; i <= 5; i++) {
            let dotClass = "stepper-dot";
            if (i < activeStep) {
                dotClass += " completed";
            } else if (i === activeStep) {
                dotClass += " active";
            }

            dots += `<span class="${dotClass}" title="Step ${i}"></span>`;
            if (i < 5) {
                const lineClass = i < activeStep ? "stepper-line active" : "stepper-line";
                dots += `<span class="${lineClass}"></span>`;
            }
        }
        return `
            <div class="var-b-stepper" role="progressbar" aria-valuenow="${activeStep}" aria-valuemin="1" aria-valuemax="5" aria-label="Step progress">
                ${dots}
            </div>
        `;
    }

    /**
     * ==========================================================
     * STEP 1: BREAD
     * ==========================================================
     */
    function renderBreadStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const breadOptions = options.bread.options;
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">1 : BREAD</h2>
                            ${renderStepperHtml(1)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        <div class="var-b-stage">
                            <div class="var-b-burger-preview" id="var-b-burger-preview">
                                ${getCentralizedBurgerSvg()}
                            </div>
                            <div class="var-b-price-badge">
                                <span class="var-b-price-label">Price:</span>
                                <span class="var-b-price-val" id="var-b-price-val">$${currentPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="var-b-cards-grid" role="radiogroup" aria-label="Choose your bread">
                            ${breadOptions.map(b => {
                                const isSelected = builderState.bread === b.id;
                                return `
                                    <button type="button" 
                                            class="var-b-option-card ${isSelected ? "active" : ""}" 
                                            data-bread-id="${b.id}"
                                            role="radio"
                                            aria-checked="${isSelected}">
                                        <div class="card-radio-mark">${isSelected ? "✓" : ""}</div>
                                        <span class="card-option-name">${b.name}</span>
                                        <span class="card-option-sub">Included</span>
                                    </button>
                                `;
                            }).join("")}
                        </div>
                    </div>

                    <div class="var-b-footer">
                        <button type="button" class="var-b-next-btn" id="var-b-next">
                            NEXT <span class="next-arrow">&#9654;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setupBreadEvents();
    }

    function setupBreadEvents() {
        const overlay = document.getElementById("var-b-overlay");
        const closeBtn = document.getElementById("var-b-close");
        const nextBtn = document.getElementById("var-b-next");
        const cardsGrid = document.querySelector(".var-b-cards-grid");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        cardsGrid?.addEventListener("click", (e) => {
            const card = e.target.closest(".var-b-option-card");
            if (!card) return;

            const breadId = card.dataset.breadId;
            builderState.bread = breadId;

            cardsGrid.querySelectorAll(".var-b-option-card").forEach(c => {
                const isSelected = c.dataset.breadId === breadId;
                c.classList.toggle("active", isSelected);
                c.setAttribute("aria-checked", isSelected ? "true" : "false");
                const mark = c.querySelector(".card-radio-mark");
                if (mark) mark.textContent = isSelected ? "✓" : "";
            });

            const previewEl = document.getElementById("var-b-burger-preview");
            if (previewEl) {
                previewEl.innerHTML = getCentralizedBurgerSvg();
            }
        });

        nextBtn?.addEventListener("click", () => {
            renderStep(2);
        });
    }

    /**
     * ==========================================================
     * STEP 2: PATTY
     * ==========================================================
     */
    function renderPattyStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const pattyOptions = options.patty.options;
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">2 : PATTY</h2>
                            ${renderStepperHtml(2)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        <div class="var-b-stage">
                            <div class="var-b-burger-preview" id="var-b-burger-preview">
                                ${getCentralizedBurgerSvg()}
                            </div>
                            <div class="var-b-price-badge">
                                <span class="var-b-price-label">Price:</span>
                                <span class="var-b-price-val" id="var-b-price-val">$${currentPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="var-b-item-list" role="group" aria-label="Choose patties">
                            <div class="patty-hint-banner">
                                <span>* First patty is <strong>FREE</strong>. Additional patties are <strong>+$4.70</strong> each.</span>
                            </div>
                            ${pattyOptions.map(p => {
                                const qty = builderState.patties[p.id] || 0;
                                const hasSelection = qty > 0;
                                return `
                                    <div class="var-b-item-row ${hasSelection ? "has-qty" : ""}" data-item-id="${p.id}">
                                        <div class="var-b-item-info">
                                            <span class="var-b-item-name">${p.name}</span>
                                            <span class="var-b-item-pricing-note">${getPattyRowNote(p.id, qty)}</span>
                                        </div>
                                        <div class="var-b-stepper-ctrl">
                                            <button type="button" 
                                                    class="var-b-step-btn btn-minus" 
                                                    data-type="patty"
                                                    data-id="${p.id}" 
                                                    aria-label="Decrease ${p.name}" 
                                                    ${qty === 0 ? "disabled" : ""}>
                                                &minus;
                                            </button>
                                            <span class="var-b-step-qty" id="qty-patty-${p.id}">${qty}</span>
                                            <button type="button" 
                                                    class="var-b-step-btn btn-plus" 
                                                    data-type="patty"
                                                    data-id="${p.id}" 
                                                    aria-label="Increase ${p.name}">
                                                &#43;
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>

                    <div class="var-b-footer var-b-footer-nav">
                        <button type="button" class="var-b-back-btn" id="var-b-back">
                            <span class="back-arrow">&#9664;</span> BACK
                        </button>
                        <button type="button" class="var-b-next-btn" id="var-b-next">
                            NEXT <span class="next-arrow">&#9654;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setupPattyEvents();
    }

    function getPattyRowNote(pid, qty) {
        if (qty > 0) {
            return qty === 1 ? "1 included" : `1 free, ${qty - 1} extra (+$${((qty - 1) * 4.70).toFixed(2)})`;
        }
        return "+$4.70 extra";
    }

    function setupPattyEvents() {
        const overlay = document.getElementById("var-b-overlay");
        const closeBtn = document.getElementById("var-b-close");
        const backBtn = document.getElementById("var-b-back");
        const nextBtn = document.getElementById("var-b-next");
        const listEl = document.querySelector(".var-b-item-list");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        backBtn?.addEventListener("click", () => {
            renderStep(1);
        });

        nextBtn?.addEventListener("click", () => {
            renderStep(3);
        });

        listEl?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-b-step-btn");
            if (!btn) return;

            const pid = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            let qty = builderState.patties[pid] || 0;

            if (isPlus) {
                qty += 1;
            } else {
                qty = Math.max(0, qty - 1);
            }

            if (qty === 0) {
                delete builderState.patties[pid];
            } else {
                builderState.patties[pid] = qty;
            }

            const qtyEl = document.getElementById(`qty-patty-${pid}`);
            if (qtyEl) qtyEl.textContent = qty;

            const row = btn.closest(".var-b-item-row");
            const minusBtn = row.querySelector(".btn-minus");
            if (minusBtn) minusBtn.disabled = qty === 0;

            row.classList.toggle("has-qty", qty > 0);

            const noteEl = row.querySelector(".var-b-item-pricing-note");
            if (noteEl) noteEl.textContent = getPattyRowNote(pid, qty);

            const previewEl = document.getElementById("var-b-burger-preview");
            if (previewEl) previewEl.innerHTML = getCentralizedBurgerSvg();

            const priceValEl = document.getElementById("var-b-price-val");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });
    }

    /**
     * ==========================================================
     * STEP 3: TOPPINGS
     * ==========================================================
     */
    function renderToppingsStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const toppingOptions = options.toppings.options;
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">3 : TOPPINGS</h2>
                            ${renderStepperHtml(3)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        <div class="var-b-stage">
                            <div class="var-b-burger-preview" id="var-b-burger-preview">
                                ${getCentralizedBurgerSvg()}
                            </div>
                            <div class="var-b-price-badge">
                                <span class="var-b-price-label">Price:</span>
                                <span class="var-b-price-val" id="var-b-price-val">$${currentPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="var-b-item-list" role="group" aria-label="Choose toppings">
                            <div class="patty-hint-banner">
                                <span>* Toppings are <strong>+$1.29</strong> each. You can add multiple of each option.</span>
                            </div>
                            ${toppingOptions.map(t => {
                                const qty = builderState.toppings[t.id] || 0;
                                const hasSelection = qty > 0;
                                return `
                                    <div class="var-b-item-row ${hasSelection ? "has-qty" : ""}" data-item-id="${t.id}">
                                        <div class="var-b-item-info">
                                            <span class="var-b-item-name">${t.name}</span>
                                            <span class="var-b-item-pricing-note">${qty > 0 ? `${qty} added (+$${(qty * 1.29).toFixed(2)})` : "+$1.29 each"}</span>
                                        </div>
                                        <div class="var-b-stepper-ctrl">
                                            <button type="button" 
                                                    class="var-b-step-btn btn-minus" 
                                                    data-type="toppings"
                                                    data-id="${t.id}" 
                                                    aria-label="Decrease ${t.name}" 
                                                    ${qty === 0 ? "disabled" : ""}>
                                                &minus;
                                            </button>
                                            <span class="var-b-step-qty" id="qty-toppings-${t.id}">${qty}</span>
                                            <button type="button" 
                                                    class="var-b-step-btn btn-plus" 
                                                    data-type="toppings"
                                                    data-id="${t.id}" 
                                                    aria-label="Increase ${t.name}">
                                                &#43;
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>

                    <div class="var-b-footer var-b-footer-nav">
                        <button type="button" class="var-b-back-btn" id="var-b-back">
                            <span class="back-arrow">&#9664;</span> BACK
                        </button>
                        <button type="button" class="var-b-next-btn" id="var-b-next">
                            NEXT <span class="next-arrow">&#9654;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setupToppingsEvents();
    }

    function setupToppingsEvents() {
        const overlay = document.getElementById("var-b-overlay");
        const closeBtn = document.getElementById("var-b-close");
        const backBtn = document.getElementById("var-b-back");
        const nextBtn = document.getElementById("var-b-next");
        const listEl = document.querySelector(".var-b-item-list");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        backBtn?.addEventListener("click", () => {
            renderStep(2);
        });

        nextBtn?.addEventListener("click", () => {
            renderStep(4);
        });

        listEl?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-b-step-btn");
            if (!btn) return;

            const tid = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            let qty = builderState.toppings[tid] || 0;

            if (isPlus) {
                qty += 1;
            } else {
                qty = Math.max(0, qty - 1);
            }

            if (qty === 0) {
                delete builderState.toppings[tid];
            } else {
                builderState.toppings[tid] = qty;
            }

            const qtyEl = document.getElementById(`qty-toppings-${tid}`);
            if (qtyEl) qtyEl.textContent = qty;

            const row = btn.closest(".var-b-item-row");
            const minusBtn = row.querySelector(".btn-minus");
            if (minusBtn) minusBtn.disabled = qty === 0;

            row.classList.toggle("has-qty", qty > 0);

            const noteEl = row.querySelector(".var-b-item-pricing-note");
            if (noteEl) {
                noteEl.textContent = qty > 0 ? `${qty} added (+$${(qty * 1.29).toFixed(2)})` : "+$1.29 each";
            }

            const previewEl = document.getElementById("var-b-burger-preview");
            if (previewEl) previewEl.innerHTML = getCentralizedBurgerSvg();

            const priceValEl = document.getElementById("var-b-price-val");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });
    }

    /**
     * ==========================================================
     * STEP 4: SALADS & CONDIMENTS
     * ==========================================================
     */
    function renderSaladsStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const saladOptions = options.saladAndSauces.options;
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">4 : SALADS & CONDIMENTS</h2>
                            ${renderStepperHtml(4)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        <div class="var-b-stage">
                            <div class="var-b-burger-preview" id="var-b-burger-preview">
                                ${getCentralizedBurgerSvg()}
                            </div>
                            <div class="var-b-price-badge">
                                <span class="var-b-price-label">Price:</span>
                                <span class="var-b-price-val" id="var-b-price-val">$${currentPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="var-b-item-list" role="group" aria-label="Choose salads and condiments">
                            <div class="patty-hint-banner">
                                <span id="salads-status-banner">${getSaladsStatusText()}</span>
                            </div>
                            ${saladOptions.map(s => {
                                const qty = builderState.saladAndSauces[s.id] || 0;
                                const hasSelection = qty > 0;
                                return `
                                    <div class="var-b-item-row ${hasSelection ? "has-qty" : ""}" data-item-id="${s.id}">
                                        <div class="var-b-item-info">
                                            <span class="var-b-item-name">${s.name}</span>
                                            <span class="var-b-item-pricing-note">${qty > 0 ? `${qty} selected` : "First 6 free"}</span>
                                        </div>
                                        <div class="var-b-stepper-ctrl">
                                            <button type="button" 
                                                    class="var-b-step-btn btn-minus" 
                                                    data-type="saladAndSauces"
                                                    data-id="${s.id}" 
                                                    aria-label="Decrease ${s.name}" 
                                                    ${qty === 0 ? "disabled" : ""}>
                                                &minus;
                                            </button>
                                            <span class="var-b-step-qty" id="qty-salads-${s.id}">${qty}</span>
                                            <button type="button" 
                                                    class="var-b-step-btn btn-plus" 
                                                    data-type="saladAndSauces"
                                                    data-id="${s.id}" 
                                                    aria-label="Increase ${s.name}">
                                                &#43;
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>

                    <div class="var-b-footer var-b-footer-nav">
                        <button type="button" class="var-b-back-btn" id="var-b-back">
                            <span class="back-arrow">&#9664;</span> BACK
                        </button>
                        <button type="button" class="var-b-next-btn" id="var-b-next">
                            NEXT <span class="next-arrow">&#9654;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setupSaladsEvents();
    }

    function getSaladsStatusText() {
        let total = 0;
        Object.values(builderState.saladAndSauces).forEach(q => total += q);
        if (total <= 6) {
            return `* First 6 items are <strong>FREE</strong> (${total}/6 selected). Extra items are <strong>+$0.50</strong> each.`;
        }
        const extra = total - 6;
        return `* First 6 items free. ${extra} extra selected (<strong>+$${(extra * 0.50).toFixed(2)}</strong>).`;
    }

    function setupSaladsEvents() {
        const overlay = document.getElementById("var-b-overlay");
        const closeBtn = document.getElementById("var-b-close");
        const backBtn = document.getElementById("var-b-back");
        const nextBtn = document.getElementById("var-b-next");
        const listEl = document.querySelector(".var-b-item-list");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        backBtn?.addEventListener("click", () => {
            renderStep(3);
        });

        nextBtn?.addEventListener("click", () => {
            let totalSalads = 0;
            Object.values(builderState.saladAndSauces).forEach(q => totalSalads += q);

            alert(`[Step 4 Confirmed]\nSalads & condiments chosen: ${totalSalads}.\nStep 5 (Combo & Final Review) will be added next!`);
        });

        listEl?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-b-step-btn");
            if (!btn) return;

            const sid = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            let qty = builderState.saladAndSauces[sid] || 0;

            if (isPlus) {
                qty += 1;
            } else {
                qty = Math.max(0, qty - 1);
            }

            if (qty === 0) {
                delete builderState.saladAndSauces[sid];
            } else {
                builderState.saladAndSauces[sid] = qty;
            }

            const qtyEl = document.getElementById(`qty-salads-${sid}`);
            if (qtyEl) qtyEl.textContent = qty;

            const row = btn.closest(".var-b-item-row");
            const minusBtn = row.querySelector(".btn-minus");
            if (minusBtn) minusBtn.disabled = qty === 0;

            row.classList.toggle("has-qty", qty > 0);

            const noteEl = row.querySelector(".var-b-item-pricing-note");
            if (noteEl) {
                noteEl.textContent = qty > 0 ? `${qty} selected` : "First 6 free";
            }

            const bannerEl = document.getElementById("salads-status-banner");
            if (bannerEl) bannerEl.innerHTML = getSaladsStatusText();

            const previewEl = document.getElementById("var-b-burger-preview");
            if (previewEl) previewEl.innerHTML = getCentralizedBurgerSvg();

            const priceValEl = document.getElementById("var-b-price-val");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });
    }

})();
