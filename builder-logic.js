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
            { id: "sesame", name: "Sesame Seed", price: 0 },
            { id: "gluten-free", name: "Gluten Free", price: 0 },
            { id: "multigrain", name: "Multigrain", price: 0 },
            { id: "potato-bun", name: "Potato Bun", price: 0 },
            { id: "ciabatta", name: "Ciabatta", price: 0 }
        ]
    },
    patty: {
        freeCount: 1,
        extraPrice: 4.70,
        allowMultiple: true,
        description: "First 1 is free, extra patties are +$4.70 each. Can add multiple of the same option.",
        options: [
            { id: "beef-patty", name: "Angus Beef Patty" },
            { id: "smash-patty", name: "Crispy Smash Patty" },
            { id: "chicken-patty", name: "Crispy Chicken Patty" },
            { id: "veggie-patty", name: "Black Bean Veggie Patty" },
            { id: "beyond-patty", name: "Plant-Based Beyond Patty" }
        ]
    },
    toppings: {
        pricePerItem: 1.29,
        allowMultiple: true,
        description: "Each topping is +$1.29 each. Can add multiple of the same option.",
        options: [
            { id: "cheddar", name: "Cheddar" },
            { id: "smoked-cheddar", name: "Smoked Cheddar" },
            { id: "blue-cheese", name: "Blue Cheese" },
            { id: "crispy-onions", name: "Crispy Onions" },
            { id: "fried-egg", name: "Fried Egg" },
            { id: "guacamole", name: "Guacamole" },
            { id: "beef-bacon", name: "Beef Bacon" },
            { id: "strip-bacon", name: "Strip Bacon" },
            { id: "mushrooms", name: "Mushrooms" }
        ]
    },
    saladAndSauces: {
        freeCount: 6,
        extraPrice: 0.50,
        allowMultiple: true,
        description: "First 6 are free, extra are +$0.50 each. Can add multiple of the same option.",
        options: [
            { id: "pickle", name: "Pickle" },
            { id: "lettuce", name: "Lettuce" },
            { id: "tomato", name: "Tomato" },
            { id: "mustard", name: "Mustard" },
            { id: "mayo", name: "Mayo" },
            { id: "bbq", name: "BBQ" },
            { id: "chipotle", name: "Chipotle" },
            { id: "red-onion", name: "Red Onion" },
            { id: "jalapeno", name: "Jalapeno" }
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
            { id: "fountain-drink", name: "Fountain Drink", extraPrice: 0.00 },
            { id: "vanilla-milkshake", name: "Vanilla Milkshake", extraPrice: 1.50 },
            { id: "strawberry-milkshake", name: "Strawberry Milkshake", extraPrice: 1.50 },
            { id: "orange-juice", name: "Orange Juice", extraPrice: 0.50 }
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

        // 3. Salad & Sauces
        let totalSaladSauces = 0;
        if (selection.saladAndSauces) {
            Object.values(selection.saladAndSauces).forEach((qty) => {
                totalSaladSauces += Number(qty) || 0;
            });
        }
        const extraSaladSauces = Math.max(0, totalSaladSauces - (this.options.saladAndSauces.freeCount || 6));
        const saladSaucesCost = extraSaladSauces * (this.options.saladAndSauces.extraPrice || 0.50);

        // 4. Combo
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

        const totalPrice = base + pattiesCost + toppingsCost + saladSaucesCost + comboCost;

        return {
            basePrice: base,
            totalPatties,
            extraPatties,
            pattiesCost,
            totalToppings,
            toppingsCost,
            totalSaladSauces,
            extraSaladSauces,
            saladSaucesCost,
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
            patties: { "beef-patty": 1 },
            toppings: {},
            saladAndSauces: {},
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

