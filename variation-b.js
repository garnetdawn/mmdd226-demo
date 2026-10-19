/**
 * Burger Builder - Variation B
 * Step-by-Step Wizard Layout
 * Step 1: BREAD (Select 1 required)
 * Step 2: PATTY (Counter steppers with - and +, 1st free, extra +$4.70 each)
 * Step 3: TOPPINGS (Counter steppers with - and +, +$1.29 each)
 * Step 4: SALADS (Counter steppers with - and +, first 6 free, extra +$0.50 each)
 * Step 5: SAUCES (Counter steppers with - and +, first 6 free, extra +$0.50 each)
 * Step 6: COMBO (Toggle combo or no combo, select side and drink)
 */

(function () {
    let builderModalRoot = null;

    // State for Variation B
    let builderState = {
        currentStep: 1, // 1: Bread, 2: Patty, 3: Toppings, 4: Salads, 5: Sauces, 6: Combo
        bread: "sesame",
        patties: {}, 
        toppings: {},
        salads: {},
        sauces: {},
        combo: { isCombo: false, sideId: "fries", drinkId: "fountain-drink" },
        baseItem: null
    };

    /**
     * Helper to get options from pricing engine or fallback
     */
    function getOptions() {
        return (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;
    }

    function getBreadOption(breadId) {
        const opts = getOptions();
        return (opts.bread && opts.bread.options) ? opts.bread.options.find(b => b.id === breadId) : null;
    }

    function getPattyOption(pattyId) {
        const opts = getOptions();
        return (opts.patty && opts.patty.options) ? opts.patty.options.find(p => p.id === pattyId) : null;
    }

    function getToppingOption(toppingId) {
        const opts = getOptions();
        return (opts.toppings && opts.toppings.options) ? opts.toppings.options.find(t => t.id === toppingId) : null;
    }

    function getSaladOption(saladId) {
        const opts = getOptions();
        return (opts.salads && opts.salads.options) ? opts.salads.options.find(s => s.id === saladId) : null;
    }

    function getSauceOption(sauceId) {
        const opts = getOptions();
        return (opts.sauces && opts.sauces.options) ? opts.sauces.options.find(s => s.id === sauceId) : null;
    }

    /**
     * Get Top Bun Image Placeholder (230px width x 50px height)
     */
    function getTopBunVisual(breadId) {
        const opt = getBreadOption(breadId);
        const name = opt ? opt.name : "Top Bun";
        const imgSrc = (opt && opt.imageTop) ? opt.imageTop : `images/bun-top-${breadId}.png`;
        return `
            <div class="var-b-layer-item var-b-layer-bun-top" title="${name} Top Bun">
                <img src="${imgSrc}" alt="${name} Top Bun" class="var-b-layer-img var-b-img-bun-top" 
                     style="display:none;" 
                     onload="this.style.display='block'; if(this.nextElementSibling) this.nextElementSibling.style.display='none';" 
                     onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
                <div class="var-b-placeholder-box var-b-ph-bun-top">
                    <span>${name} Top Bun [230&times;50]</span>
                </div>
            </div>
        `;
    }

    /**
     * Get Bottom Bun Image Placeholder (230px width x 30px height)
     */
    function getBottomBunVisual(breadId) {
        const opt = getBreadOption(breadId);
        const name = opt ? opt.name : "Bottom Bun";
        const imgSrc = (opt && opt.imageBottom) ? opt.imageBottom : `images/bun-bottom-${breadId}.png`;
        return `
            <div class="var-b-layer-item var-b-layer-bun-bottom" title="${name} Bottom Bun">
                <img src="${imgSrc}" alt="${name} Bottom Bun" class="var-b-layer-img var-b-img-bun-bottom" 
                     style="display:none;" 
                     onload="this.style.display='block'; if(this.nextElementSibling) this.nextElementSibling.style.display='none';" 
                     onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
                <div class="var-b-placeholder-box var-b-ph-bun-bottom">
                    <span>${name} Bottom Bun [230&times;30]</span>
                </div>
            </div>
        `;
    }

    /**
     * Get Patty Image Placeholder (230px width x 30px height)
     */
    function getPattyLayerVisual(pattyId) {
        const opt = getPattyOption(pattyId);
        const name = opt ? opt.name : "Patty";
        const imgSrc = (opt && opt.image) ? opt.image : `images/patty-${pattyId}.png`;
        return `
            <div class="var-b-layer-item var-b-layer-patty" title="${name}">
                <img src="${imgSrc}" alt="${name}" class="var-b-layer-img var-b-img-patty" 
                     style="display:none;" 
                     onload="this.style.display='block'; if(this.nextElementSibling) this.nextElementSibling.style.display='none';" 
                     onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
                <div class="var-b-placeholder-box var-b-ph-patty">
                    <span>${name} [230&times;30]</span>
                </div>
            </div>
        `;
    }

    /**
     * Get Topping / Salad / Sauce Image Placeholder (230px width x 20px height)
     */
    function getToppingLayerVisual(category, itemId) {
        let opt = null;
        let defaultImg = "";
        let suffix = "";

        if (category === "toppings") {
            opt = getToppingOption(itemId);
            defaultImg = `images/topping-${itemId}.png`;
        } else if (category === "salads") {
            opt = getSaladOption(itemId);
            defaultImg = `images/salad-${itemId}.png`;
        } else if (category === "sauces") {
            opt = getSauceOption(itemId);
            defaultImg = `images/sauce-${itemId}.png`;
            suffix = " Sauce";
        }

        const name = opt ? `${opt.name}${suffix}` : itemId;
        const imgSrc = (opt && opt.image) ? opt.image : defaultImg;

        return `
            <div class="var-b-layer-item var-b-layer-topping" title="${name}">
                <img src="${imgSrc}" alt="${name}" class="var-b-layer-img var-b-img-topping" 
                     style="display:none;" 
                     onload="this.style.display='block'; if(this.nextElementSibling) this.nextElementSibling.style.display='none';" 
                     onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
                <div class="var-b-placeholder-box var-b-ph-topping">
                    <span>${name} [230&times;20]</span>
                </div>
            </div>
        `;
    }

    /**
     * Get Centralized Burger Stack (Top bun, sauces, salads, toppings, patties, bottom bun)
     * All layers use exact image placeholder dimensions:
     * - Top bun: 230px width x 50px height
     * - Bottom bun: 230px width x 30px height
     * - Patties: 230px width x 30px height
     * - Toppings/Salads/Sauces: 230px width x 20px height
     */
    function getCentralizedBurgerVisual() {
        let layersHtml = "";
        let totalFillings = 0;

        // 1. Sauces (230px width x 20px height)
        if (builderState.sauces) {
            Object.entries(builderState.sauces).forEach(([sId, qty]) => {
                for (let i = 0; i < qty; i++) {
                    totalFillings++;
                    layersHtml += getToppingLayerVisual("sauces", sId);
                }
            });
        }

        // 2. Salads (230px width x 20px height) - excluding lettuce
        if (builderState.salads) {
            Object.entries(builderState.salads).forEach(([sId, qty]) => {
                if (sId !== "lettuce") {
                    for (let i = 0; i < qty; i++) {
                        totalFillings++;
                        layersHtml += getToppingLayerVisual("salads", sId);
                    }
                }
            });
        }

        // 3. Toppings (230px width x 20px height)
        if (builderState.toppings) {
            Object.entries(builderState.toppings).forEach(([tId, qty]) => {
                for (let i = 0; i < qty; i++) {
                    totalFillings++;
                    layersHtml += getToppingLayerVisual("toppings", tId);
                }
            });
        }

        // 4. Patties (230px width x 30px height)
        if (builderState.patties) {
            Object.entries(builderState.patties).forEach(([pId, qty]) => {
                for (let i = 0; i < qty; i++) {
                    totalFillings++;
                    layersHtml += getPattyLayerVisual(pId);
                }
            });
        }

        // 5. Lettuce (230px width x 20px height - bed under patties)
        if (builderState.salads && builderState.salads["lettuce"] > 0) {
            const qty = builderState.salads["lettuce"];
            for (let i = 0; i < qty; i++) {
                totalFillings++;
                layersHtml += getToppingLayerVisual("salads", "lettuce");
            }
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
            ${getTopBunVisual(builderState.bread)}
            <div class="var-b-fillings-container">
                ${layersHtml}
            </div>
            ${getBottomBunVisual(builderState.bread)}
        `;
    }

    // Alias for backward compatibility across step renderers
    const getCentralizedBurgerSvg = getCentralizedBurgerVisual;

    /**
     * Render the Burger Visualizer stage column
     * Kept separate from selections so it does not scroll and stays visible at all times
     */
    function renderVisualizerColumnHtml(currentPrice) {
        return `
            <div class="var-b-visual-column">
                <div class="var-b-stage">
                    <div class="var-b-burger-preview" id="var-b-burger-preview">
                        ${getCentralizedBurgerVisual()}
                    </div>
                    <div class="var-b-price-badge">
                        <span class="var-b-price-label">Price:</span>
                        <span class="var-b-price-val" id="var-b-price-val">$${currentPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
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
        builderState.patties = {}; // No default patty selected
        builderState.toppings = {};
        builderState.salads = {};
        builderState.sauces = {};
        builderState.combo = { isCombo: false, sideId: "fries", drinkId: "fountain-drink" };

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
        } else if (stepNumber === 5) {
            renderSaucesStep();
        } else if (stepNumber === 6) {
            renderComboStep();
        }
    }

    /**
     * Helper to render the Stepper component for steps 1 through 6
     */
    function renderStepperHtml(activeStep) {
        let dots = "";
        for (let i = 1; i <= 6; i++) {
            let dotClass = "stepper-dot";
            if (i < activeStep) {
                dotClass += " completed";
            } else if (i === activeStep) {
                dotClass += " active";
            }

            dots += `<span class="${dotClass}" title="Step ${i}"></span>`;
            if (i < 6) {
                const lineClass = i < activeStep ? "stepper-line active" : "stepper-line";
                dots += `<span class="${lineClass}"></span>`;
            }
        }
        return `
            <div class="var-b-stepper" role="progressbar" aria-valuenow="${activeStep}" aria-valuemin="1" aria-valuemax="6" aria-label="Step progress">
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
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
                            <div class="var-b-item-list" role="radiogroup" aria-label="Choose your bread">
                                <div class="patty-hint-banner">
                                    <span>* Choose 1 bread option. All bread options are <strong>included</strong>.</span>
                                </div>
                                ${breadOptions.map(b => {
                                    const isSelected = builderState.bread === b.id;
                                    return `
                                        <div class="var-b-item-row ${isSelected ? "has-qty" : ""}" 
                                             data-bread-id="${b.id}"
                                             role="radio"
                                             aria-checked="${isSelected}"
                                             style="cursor:pointer;">
                                            <div class="var-b-item-info">
                                                <span class="var-b-item-name">${b.name}</span>
                                                <span class="var-b-item-pricing-note">Included</span>
                                            </div>
                                            <div class="var-b-bread-radio ${isSelected ? "selected" : ""}" id="bread-radio-${b.id}">
                                                ${isSelected ? "✓" : ""}
                                            </div>
                                        </div>
                                    `;
                                }).join("")}
                            </div>
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
        const listEl = document.querySelector(".var-b-item-list");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        listEl?.addEventListener("click", (e) => {
            const row = e.target.closest(".var-b-item-row");
            if (!row) return;

            const breadId = row.dataset.breadId;
            builderState.bread = breadId;

            listEl.querySelectorAll(".var-b-item-row").forEach(r => {
                const isSelected = r.dataset.breadId === breadId;
                r.classList.toggle("has-qty", isSelected);
                r.setAttribute("aria-checked", isSelected ? "true" : "false");
                const radio = r.querySelector(".var-b-bread-radio");
                if (radio) {
                    radio.textContent = isSelected ? "✓" : "";
                    radio.classList.toggle("selected", isSelected);
                }
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
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
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
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
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
     * STEP 4: SALADS
     * ==========================================================
     */
    function renderSaladsStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const saladOptions = (options.salads && options.salads.options) ? options.salads.options : [];
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">4 : SALADS</h2>
                            ${renderStepperHtml(4)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
                            <div class="var-b-item-list" role="group" aria-label="Choose fresh salads">
                                <div class="patty-hint-banner">
                                    <span id="salads-status-banner">${getSaladsStatusText()}</span>
                                </div>
                                ${saladOptions.map(s => {
                                    const qty = (builderState.salads && builderState.salads[s.id]) || 0;
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
                                                        data-type="salads"
                                                        data-id="${s.id}" 
                                                        aria-label="Decrease ${s.name}" 
                                                        ${qty === 0 ? "disabled" : ""}>
                                                    &minus;
                                                </button>
                                                <span class="var-b-step-qty" id="qty-salads-${s.id}">${qty}</span>
                                                <button type="button" 
                                                        class="var-b-step-btn btn-plus" 
                                                        data-type="salads"
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
        const opts = getOptions();
        const freeCount = (opts.salads && typeof opts.salads.freeCount === "number") ? opts.salads.freeCount : 4;
        let total = 0;
        if (builderState.salads) {
            Object.values(builderState.salads).forEach(q => total += q);
        }
        if (total <= freeCount) {
            return `* First ${freeCount} salads are <strong>FREE</strong> (${total}/${freeCount} selected). Extra items are <strong>+$0.50</strong> each.`;
        }
        const extra = total - freeCount;
        return `* First ${freeCount} salads free. ${extra} extra selected (<strong>+$${(extra * 0.50).toFixed(2)}</strong>).`;
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
            renderStep(5);
        });

        listEl?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-b-step-btn");
            if (!btn) return;

            const sid = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            if (!builderState.salads) builderState.salads = {};
            let qty = builderState.salads[sid] || 0;

            if (isPlus) {
                qty += 1;
            } else {
                qty = Math.max(0, qty - 1);
            }

            if (qty === 0) {
                delete builderState.salads[sid];
            } else {
                builderState.salads[sid] = qty;
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

    /**
     * ==========================================================
     * STEP 5: SAUCES
     * ==========================================================
     */
    function renderSaucesStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const sauceOptions = (options.sauces && options.sauces.options) ? options.sauces.options : [];
        const currentPrice = getCurrentPrice();

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">5 : SAUCES</h2>
                            ${renderStepperHtml(5)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
                            <div class="var-b-item-list" role="group" aria-label="Choose sauces and condiments">
                                <div class="patty-hint-banner">
                                    <span id="sauces-status-banner">${getSaucesStatusText()}</span>
                                </div>
                                ${sauceOptions.map(s => {
                                    const qty = (builderState.sauces && builderState.sauces[s.id]) || 0;
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
                                                        data-type="sauces"
                                                        data-id="${s.id}" 
                                                        aria-label="Decrease ${s.name}" 
                                                        ${qty === 0 ? "disabled" : ""}>
                                                    &minus;
                                                </button>
                                                <span class="var-b-step-qty" id="qty-sauces-${s.id}">${qty}</span>
                                                <button type="button" 
                                                        class="var-b-step-btn btn-plus" 
                                                        data-type="sauces"
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

        setupSaucesEvents();
    }

    function getSaucesStatusText() {
        const opts = getOptions();
        const freeCount = (opts.sauces && typeof opts.sauces.freeCount === "number") ? opts.sauces.freeCount : 2;
        let total = 0;
        if (builderState.sauces) {
            Object.values(builderState.sauces).forEach(q => total += q);
        }
        if (total <= freeCount) {
            return `* First ${freeCount} sauces are <strong>FREE</strong> (${total}/${freeCount} selected). Extra items are <strong>+$0.50</strong> each.`;
        }
        const extra = total - freeCount;
        return `* First ${freeCount} sauces free. ${extra} extra selected (<strong>+$${(extra * 0.50).toFixed(2)}</strong>).`;
    }

    function setupSaucesEvents() {
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
            renderStep(4);
        });

        nextBtn?.addEventListener("click", () => {
            renderStep(6);
        });

        listEl?.addEventListener("click", (e) => {
            const btn = e.target.closest(".var-b-step-btn");
            if (!btn) return;

            const sid = btn.dataset.id;
            const isPlus = btn.classList.contains("btn-plus");
            if (!builderState.sauces) builderState.sauces = {};
            let qty = builderState.sauces[sid] || 0;

            if (isPlus) {
                qty += 1;
            } else {
                qty = Math.max(0, qty - 1);
            }

            if (qty === 0) {
                delete builderState.sauces[sid];
            } else {
                builderState.sauces[sid] = qty;
            }

            const qtyEl = document.getElementById(`qty-sauces-${sid}`);
            if (qtyEl) qtyEl.textContent = qty;

            const row = btn.closest(".var-b-item-row");
            const minusBtn = row.querySelector(".btn-minus");
            if (minusBtn) minusBtn.disabled = qty === 0;

            row.classList.toggle("has-qty", qty > 0);

            const noteEl = row.querySelector(".var-b-item-pricing-note");
            if (noteEl) {
                noteEl.textContent = qty > 0 ? `${qty} selected` : "First 6 free";
            }

            const bannerEl = document.getElementById("sauces-status-banner");
            if (bannerEl) bannerEl.innerHTML = getSaucesStatusText();

            const previewEl = document.getElementById("var-b-burger-preview");
            if (previewEl) previewEl.innerHTML = getCentralizedBurgerSvg();

            const priceValEl = document.getElementById("var-b-price-val");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });
    }

    /**
     * ==========================================================
     * STEP 6: COMBO & REVIEW (FINAL STAGE)
     * ==========================================================
     */
    function renderComboStep() {
        const options = (window.burgerPricingEngine && window.burgerPricingEngine.options)
            ? window.burgerPricingEngine.options
            : FALLBACK_BUILDER_OPTIONS;

        const comboOptions = options.combo || {
            basePrice: 4.99,
            sides: [
                { id: "fries", name: "Fries", extraPrice: 0 },
                { id: "poutine", name: "Poutine", extraPrice: 1.50 },
                { id: "sweet-potato-fries", name: "Sweet Potato Fries", extraPrice: 0.75 },
                { id: "onion-rings", name: "Onion Rings", extraPrice: 0.75 }
            ],
            drinks: [
                { id: "fountain-drink", name: "Fountain Drink", extraPrice: 0 },
                { id: "vanilla-milkshake", name: "Vanilla Milkshake", extraPrice: 1.50 },
                { id: "strawberry-milkshake", name: "Strawberry Milkshake", extraPrice: 1.50 },
                { id: "orange-juice", name: "Orange Juice", extraPrice: 0.50 }
            ]
        };

        const sides = comboOptions.sides || [];
        const drinks = comboOptions.drinks || [];
        const currentPrice = getCurrentPrice();
        const isCombo = Boolean(builderState.combo && builderState.combo.isCombo);

        builderModalRoot.innerHTML = `
            <div class="modal-overlay" id="var-b-overlay">
                <div class="builder-modal var-b-modal" role="dialog" aria-modal="true" aria-labelledby="var-b-title">
                    
                    <div class="var-b-header">
                        <div class="var-b-header-center">
                            <h2 class="var-b-step-title" id="var-b-title">6 : COMBO</h2>
                            ${renderStepperHtml(6)}
                        </div>
                        <button type="button" class="modal-close-btn var-b-close-btn" id="var-b-close" aria-label="Close builder">&times;</button>
                    </div>

                    <div class="var-b-body">
                        ${renderVisualizerColumnHtml(currentPrice)}

                        <div class="var-b-selections-column">
                            <div class="var-b-combo-wrapper">
                                <!-- Combo vs No Combo Toggle -->
                                <div class="var-b-combo-toggle-wrapper">
                                    <span class="var-b-combo-toggle-label">Make it a Combo?</span>
                                    <div class="combo-solo-toggle var-b-combo-toggle" role="group" aria-label="Combo or Solo Selection">
                                        <button type="button" class="toggle-mode-btn ${!isCombo ? "active" : ""}" id="var-b-toggle-solo">
                                            No Combo (Solo)
                                        </button>
                                        <button type="button" class="toggle-mode-btn ${isCombo ? "active" : ""}" id="var-b-toggle-combo">
                                            Make it a Combo (+$${(comboOptions.basePrice || 4.99).toFixed(2)})
                                        </button>
                                    </div>
                                </div>

                                <!-- No Combo Message -->
                                <div class="var-b-no-combo-banner ${isCombo ? "hidden" : ""}" id="var-b-no-combo-msg">
                                    Solo burger selected. Switch to <strong>Make it a Combo</strong> above to add a side and drink.
                                </div>

                                <!-- Combo Sides & Drinks Options (Disappear if no combo is selected) -->
                                <div class="var-b-combo-options ${isCombo ? "" : "hidden"}" id="var-b-combo-options">
                                    <!-- Sides Section -->
                                    <div class="var-b-combo-group">
                                        <div class="var-b-combo-group-header">
                                            <span class="var-b-combo-group-title">Choose Side</span>
                                            <span class="var-b-combo-group-subtitle">Select 1 option</span>
                                        </div>
                                        <div class="var-b-combo-grid" id="var-b-sides-grid" role="radiogroup" aria-label="Choose a side">
                                            ${sides.map(s => {
                                                const isSelected = builderState.combo.sideId === s.id;
                                                const extraText = (s.extraPrice && s.extraPrice > 0)
                                                    ? `+$${s.extraPrice.toFixed(2)}`
                                                    : "Included";
                                                return `
                                                    <button type="button" 
                                                            class="var-b-option-card var-b-side-card ${isSelected ? "active" : ""}" 
                                                            data-side-id="${s.id}"
                                                            role="radio"
                                                            aria-checked="${isSelected}">
                                                        <div class="card-radio-mark">${isSelected ? "✓" : ""}</div>
                                                        <span class="card-option-name">${s.name}</span>
                                                        <span class="card-option-sub">${extraText}</span>
                                                    </button>
                                                `;
                                            }).join("")}
                                        </div>
                                    </div>

                                    <!-- Drinks Section -->
                                    <div class="var-b-combo-group">
                                        <div class="var-b-combo-group-header">
                                            <span class="var-b-combo-group-title">Choose Drink</span>
                                            <span class="var-b-combo-group-subtitle">Select 1 option</span>
                                        </div>
                                        <div class="var-b-combo-grid" id="var-b-drinks-grid" role="radiogroup" aria-label="Choose a drink">
                                            ${drinks.map(d => {
                                                const isSelected = builderState.combo.drinkId === d.id;
                                                const extraText = (d.extraPrice && d.extraPrice > 0)
                                                    ? `+$${d.extraPrice.toFixed(2)}`
                                                    : "Included";
                                                return `
                                                    <button type="button" 
                                                            class="var-b-option-card var-b-drink-card ${isSelected ? "active" : ""}" 
                                                            data-drink-id="${d.id}"
                                                            role="radio"
                                                            aria-checked="${isSelected}">
                                                        <div class="card-radio-mark">${isSelected ? "✓" : ""}</div>
                                                        <span class="card-option-name">${d.name}</span>
                                                        <span class="card-option-sub">${extraText}</span>
                                                    </button>
                                                `;
                                            }).join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="var-b-footer var-b-footer-nav">
                        <button type="button" class="var-b-back-btn" id="var-b-back">
                            <span class="back-arrow">&#9664;</span> BACK
                        </button>
                        <button type="button" class="var-b-next-btn var-b-add-cart-btn" id="var-b-finish">
                            ADD TO CART <span class="next-arrow">&#9654;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setupComboEvents(options);
    }

    function setupComboEvents(options) {
        const overlay = document.getElementById("var-b-overlay");
        const closeBtn = document.getElementById("var-b-close");
        const backBtn = document.getElementById("var-b-back");
        const finishBtn = document.getElementById("var-b-finish");
        const toggleSoloBtn = document.getElementById("var-b-toggle-solo");
        const toggleComboBtn = document.getElementById("var-b-toggle-combo");
        const comboOptionsEl = document.getElementById("var-b-combo-options");
        const noComboMsgEl = document.getElementById("var-b-no-combo-msg");
        const sidesGrid = document.getElementById("var-b-sides-grid");
        const drinksGrid = document.getElementById("var-b-drinks-grid");
        const priceValEl = document.getElementById("var-b-price-val");

        closeBtn?.addEventListener("click", closeBuilder);
        overlay?.addEventListener("click", (e) => {
            if (e.target === overlay) closeBuilder();
        });

        backBtn?.addEventListener("click", () => {
            renderStep(5);
        });

        // Toggle Solo / No Combo
        toggleSoloBtn?.addEventListener("click", () => {
            builderState.combo.isCombo = false;
            toggleSoloBtn.classList.add("active");
            toggleComboBtn.classList.remove("active");
            comboOptionsEl?.classList.add("hidden");
            noComboMsgEl?.classList.remove("hidden");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });

        // Toggle Make it a Combo
        toggleComboBtn?.addEventListener("click", () => {
            builderState.combo.isCombo = true;
            toggleComboBtn.classList.add("active");
            toggleSoloBtn.classList.remove("active");
            comboOptionsEl?.classList.remove("hidden");
            noComboMsgEl?.classList.add("hidden");
            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });

        // Sides selection
        sidesGrid?.addEventListener("click", (e) => {
            const card = e.target.closest(".var-b-side-card");
            if (!card) return;

            const sideId = card.dataset.sideId;
            builderState.combo.sideId = sideId;

            sidesGrid.querySelectorAll(".var-b-side-card").forEach(c => {
                const isSelected = c.dataset.sideId === sideId;
                c.classList.toggle("active", isSelected);
                c.setAttribute("aria-checked", isSelected ? "true" : "false");
                const mark = c.querySelector(".card-radio-mark");
                if (mark) mark.textContent = isSelected ? "✓" : "";
            });

            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });

        // Drinks selection
        drinksGrid?.addEventListener("click", (e) => {
            const card = e.target.closest(".var-b-drink-card");
            if (!card) return;

            const drinkId = card.dataset.drinkId;
            builderState.combo.drinkId = drinkId;

            drinksGrid.querySelectorAll(".var-b-drink-card").forEach(c => {
                const isSelected = c.dataset.drinkId === drinkId;
                c.classList.toggle("active", isSelected);
                c.setAttribute("aria-checked", isSelected ? "true" : "false");
                const mark = c.querySelector(".card-radio-mark");
                if (mark) mark.textContent = isSelected ? "✓" : "";
            });

            if (priceValEl) priceValEl.textContent = `$${getCurrentPrice().toFixed(2)}`;
        });

        // Add to Cart
        finishBtn?.addEventListener("click", () => {
            const details = [];

            // Bread summary
            const breadObj = options.bread.options.find(b => b.id === builderState.bread);
            if (breadObj) details.push(breadObj.name);

            // Patties summary
            Object.entries(builderState.patties).forEach(([pid, qty]) => {
                const pObj = options.patty.options.find(p => p.id === pid);
                if (pObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${pObj.name}`);
            });

            // Toppings summary
            Object.entries(builderState.toppings).forEach(([tid, qty]) => {
                const tObj = options.toppings.options.find(t => t.id === tid);
                if (tObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${tObj.name}`);
            });

            // Salads summary
            if (options.salads && options.salads.options && builderState.salads) {
                Object.entries(builderState.salads).forEach(([sid, qty]) => {
                    const sObj = options.salads.options.find(s => s.id === sid);
                    if (sObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${sObj.name}`);
                });
            }

            // Sauces summary
            if (options.sauces && options.sauces.options && builderState.sauces) {
                Object.entries(builderState.sauces).forEach(([sid, qty]) => {
                    const sObj = options.sauces.options.find(s => s.id === sid);
                    if (sObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${sObj.name}`);
                });
            }

            // Legacy Salad & Sauces summary if present
            if (builderState.saladAndSauces && options.saladAndSauces && options.saladAndSauces.options) {
                Object.entries(builderState.saladAndSauces).forEach(([sid, qty]) => {
                    const sObj = options.saladAndSauces.options.find(s => s.id === sid);
                    if (sObj && qty > 0) details.push(`${qty > 1 ? qty + "x " : ""}${sObj.name}`);
                });
            }

            // Combo summary
            if (builderState.combo && builderState.combo.isCombo) {
                const sideObj = options.combo.sides.find(s => s.id === builderState.combo.sideId);
                const drinkObj = options.combo.drinks.find(d => d.id === builderState.combo.drinkId);
                details.push(`Combo: ${sideObj ? sideObj.name : "Side"} + ${drinkObj ? drinkObj.name : "Drink"}`);
            }

            const currentPrice = getCurrentPrice();
            const customItem = {
                id: `custom-burger-${Date.now()}`,
                name: (builderState.combo && builderState.combo.isCombo) ? "Custom Burger (Combo)" : "Custom Burger (Solo)",
                description: details.join(", "),
                price: currentPrice,
                isCustom: true
            };

            // Add to cart state
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

})();
