/**
 * Burger Builder - Global Options & Pricing Engine
 * Shared across all popup builder variations (A, B, C, D)
 */

const FALLBACK_BUILDER_OPTIONS = {
    baseBurgerPrice: 10.99,
    bread: {
        required: true,
        maxSelect: 1,
        description: "Required choice. Can select only one.",
        options: [
            { id: "sesame", name: "Sesame Seed Bun", price: 0, imageTop: "images/bun-top-sesame.png", imageBottom: "images/bun-bottom-sesame.png" },
            { id: "gluten-free", name: "Gluten Free Bun", price: 0, imageTop: "images/bun-top-gluten-free.png", imageBottom: "images/bun-bottom-gluten-free.png" },
            { id: "multigrain", name: "Multigrain Bun", price: 0, imageTop: "images/bun-top-multigrain.png", imageBottom: "images/bun-bottom-multigrain.png" },
            { id: "potato-bun", name: "Potato Bun", price: 0, imageTop: "images/bun-top-potato-bun.png", imageBottom: "images/bun-bottom-potato-bun.png" },
            { id: "ciabatta", name: "Ciabatta", price: 0, imageTop: "images/bun-top-ciabatta.png", imageBottom: "images/bun-bottom-ciabatta.png" }
        ]
    },
    patty: {
        freeCount: 1,
        extraPrice: 4.70,
        allowMultiple: true,
        description: "First 1 is free, extra patties are +$4.70 each. Can add multiple of the same option.",
        options: [
            { id: "beef-patty-4", name: "4oz Beef Patty", image: "images/patty-beef-4.png" },
            { id: "beef-patty-6", name: "6oz Beef Patty", image: "images/patty-beef-6.png" },
            { id: "beef-patty-8", name: "8oz Beef Patty", image: "images/patty-beef-8.png" },
            { id: "grilled-chicken-patty", name: "Crispy Smash Patty", image: "images/patty-grilled-chicken.png" },
            { id: "crispy-chicken-patty", name: "Crispy Chicken Patty", image: "images/patty-crispy-chicken.png" },
            { id: "veggie-beef-patty", name: "Plant-based Beef Patty", image: "images/patty-veggie-beef.png" },
            { id: "veggie-chicken-patty", name: "Plant-Based Crispy Chicken Patty", image: "images/patty-veggie-chicken.png" }
        ]
    },
    toppings: {
        pricePerItem: 1.29,
        allowMultiple: true,
        description: "Each topping is +$1.29 each. Can add multiple of the same option.",
        options: [
            { id: "cheddar", name: "Cheddar", image: "images/topping-cheddar.png" },
            { id: "smoked-cheddar", name: "Smoked Cheddar", image: "images/topping-smoked-cheddar.png" },
            { id: "blue-cheese", name: "Blue Cheese", image: "images/topping-blue-cheese.png" },
            { id: "crispy-onions", name: "Crispy Onions", image: "images/topping-crispy-onions.png" },
            { id: "fried-egg", name: "Fried Egg", image: "images/topping-fried-egg.png" },
            { id: "guacamole", name: "Guacamole", image: "images/topping-guacamole.png" },
            { id: "beef-bacon", name: "Beef Bacon", image: "images/topping-beef-bacon.png" },
            { id: "strip-bacon", name: "Strip Bacon", image: "images/topping-strip-bacon.png" },
            { id: "mushrooms", name: "Mushrooms", image: "images/topping-mushrooms.png" }
        ]
    },
    salads: {
        freeCount: 4,
        extraPrice: 0.50,
        allowMultiple: true,
        description: "Fresh salad toppings. First 6 are free, extra are +$0.50 each.",
        options: [
            { id: "pickle", name: "Pickle", image: "images/salad-pickle.png" },
            { id: "lettuce", name: "Lettuce", image: "images/salad-lettuce.png" },
            { id: "tomato", name: "Tomato", image: "images/salad-tomato.png" },
            { id: "red-onion", name: "Red Onion", image: "images/salad-red-onion.png" },
            { id: "jalapeno", name: "Jalapeno", image: "images/salad-jalapeno.png" }
        ]
    },
    sauces: {
        freeCount: 2,
        extraPrice: 0.50,
        allowMultiple: true,
        description: "Sauces and condiments. First 6 are free, extra are +$0.50 each.",
        options: [
            { id: "mustard", name: "Mustard", image: "images/sauce-mustard.png" },
            { id: "mayo", name: "Mayo", image: "images/sauce-mayo.png" },
            { id: "bbq", name: "BBQ", image: "images/sauce-bbq.png" },
            { id: "relish", name: "Relish", image: "images/sauce-relish.png" },
            { id: "mango-sauce", name: "Mango sauce", image: "images/sauce-mango-sauce.png" },
            { id: "mango-pineapple-sauce", name: "Mando pineapple sauce", image: "images/sauce-mango-pineapple-sauce.png" },
            { id: "honey-dijon", name: "Honey Dijon", image: "images/sauce-honey-dijon.png" },
            { id: "hot-sauce", name: "Hot Sauce", image: "images/sauce-hot-sauce.png" },
            { id: "ancho-chipotle", name: "Ancho Chipotle", image: "images/sauce-ancho-chipotle.png" },
            { id: "maple-bbq-chipotle", name: "Maple BBQ Chipotle", image: "images/sauce-maple-bbq-chipotle.png" }
        ]
    },
    combo: {
        basePrice: 4.99,
        description: "Combo toggle: adds a side and drink. Disappears if no combo is selected.",
        sides: [
            { id: "poutine", name: "Poutine", extraPrice: 1.50 },
            { id: "fries", name: "Fries", extraPrice: 0.00 },
            { id: "sweet-potato-fries", name: "Sweet Potato Fries", extraPrice: 0.75 },
            { id: "onion-rings", name: "Onion Rings", extraPrice: 0.75 }
        ],
        drinks: [
            { id: "coke", name: "Coke", extraPrice: 0.00 },
            { id: "diet-coke", name: "Diet Coke", extraPrice: 0.00 },
            { id: "ginger-ale", name: "Canada Dry Ginger Ale", extraPrice: 0.00 },
            { id: "sprite", name: "Sprite", extraPrice: 0.00 },
            { id: "nestea", "name": "Nestea", extraPrice: 0.00 },
            { id: "dasani-water", name: "Dasani Water", extraPrice: 1.00 },
            { id: "vanilla-milkshake", name: "Vanilla Milkshake", extraPrice: 4.00 },
            { id: "strawberry-milkshake", name: "Strawberry Milkshake", extraPrice: 4.00 }
        ]
    }
};

class BurgerPricingEngine {
    constructor() {
        this.options = FALLBACK_BUILDER_OPTIONS;
    }

    async loadOptions() {
        try {
            const res = await fetch("builder-options.json");
            if (res.ok) {
                this.options = await res.json();
            }
        } catch (e) {
            console.warn("Using fallback builder options", e);
        }
        return this.options;
    }

    /**
     * Calculates current burger price dynamically according to global rules:
     * - Base burger: $10.99
     * - Bread: 1 required, free
     * - Patties: First 1 is free, extra are +$4.70 each
     * - Toppings: +$1.29 each
     * - Salad & Sauces: First 6 are free, extra are +$0.50 each
     * - Combo: Base combo price ($4.99) + side extra + drink extra (only if isCombo is true)
     */
    calculatePrice(selection) {
        const base = this.options.baseBurgerPrice || 10.99;

        // 1. Patties
        let totalPatties = 0;
        if (selection.patties) {
            Object.values(selection.patties).forEach((qty) => {
                totalPatties += Number(qty) || 0;
            });
        }
        const extraPatties = Math.max(0, totalPatties - (this.options.patty.freeCount || 1));
        const pattiesCost = extraPatties * (this.options.patty.extraPrice || 4.70);

        // 2. Toppings
        let totalToppings = 0;
        if (selection.toppings) {
            Object.values(selection.toppings).forEach((qty) => {
                totalToppings += Number(qty) || 0;
            });
        }
        const toppingsCost = totalToppings * (this.options.toppings.pricePerItem || 1.29);

        // 3. Salads
        let totalSalads = 0;
        if (selection.salads) {
            Object.values(selection.salads).forEach((qty) => {
                totalSalads += Number(qty) || 0;
            });
        }
        const saladsFree = (this.options.salads && this.options.salads.freeCount !== undefined) ? this.options.salads.freeCount : 6;
        const saladsExtraPrice = (this.options.salads && this.options.salads.extraPrice !== undefined) ? this.options.salads.extraPrice : 0.50;
        const extraSalads = Math.max(0, totalSalads - saladsFree);
        const saladsCost = extraSalads * saladsExtraPrice;

        // 4. Sauces
        let totalSauces = 0;
        if (selection.sauces) {
            Object.values(selection.sauces).forEach((qty) => {
                totalSauces += Number(qty) || 0;
            });
        }
        const saucesFree = (this.options.sauces && this.options.sauces.freeCount !== undefined) ? this.options.sauces.freeCount : 6;
        const saucesExtraPrice = (this.options.sauces && this.options.sauces.extraPrice !== undefined) ? this.options.sauces.extraPrice : 0.50;
        const extraSauces = Math.max(0, totalSauces - saucesFree);
        const saucesCost = extraSauces * saucesExtraPrice;

        // Legacy compatibility if saladAndSauces is provided
        let legacySaladSauceCost = 0;
        let totalSaladSauces = totalSalads + totalSauces;
        if (selection.saladAndSauces && !selection.salads && !selection.sauces) {
            let legacyTotal = 0;
            Object.values(selection.saladAndSauces).forEach((qty) => {
                legacyTotal += Number(qty) || 0;
            });
            totalSaladSauces = legacyTotal;
            legacySaladSauceCost = Math.max(0, legacyTotal - 6) * 0.50;
        }

        // 5. Combo
        let comboCost = 0;
        if (selection.combo && selection.combo.isCombo) {
            comboCost += (this.options.combo.basePrice || 4.99);

            if (selection.combo.sideId) {
                const sideObj = this.options.combo.sides.find((s) => s.id === selection.combo.sideId);
                if (sideObj) comboCost += (sideObj.extraPrice || 0);
            }

            if (selection.combo.drinkId) {
                const drinkObj = this.options.combo.drinks.find((d) => d.id === selection.combo.drinkId);
                if (drinkObj) comboCost += (drinkObj.extraPrice || 0);
            }
        }

        const totalPrice = base + pattiesCost + toppingsCost + saladsCost + saucesCost + legacySaladSauceCost + comboCost;

        return {
            basePrice: base,
            totalPatties,
            extraPatties,
            pattiesCost,
            totalToppings,
            toppingsCost,
            totalSalads,
            extraSalads,
            saladsCost,
            totalSauces,
            extraSauces,
            saucesCost,
            totalSaladSauces,
            extraSaladSauces: extraSalads + extraSauces,
            saladSaucesCost: saladsCost + saucesCost + legacySaladSauceCost,
            comboCost,
            totalPrice: Number(totalPrice.toFixed(2))
        };
    }

    /**
     * Helper to create a fresh default custom burger selection
     */
    getDefaultSelection() {
        return {
            bread: "sesame",
            patties: {},
            toppings: {},
            salads: {},
            sauces: {},
            combo: {
                isCombo: false,
                sideId: "fries",
                drinkId: "fountain-drink"
            }
        };
    }
}

// Global instance available across scripts
window.burgerPricingEngine = new BurgerPricingEngine();

