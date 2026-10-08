# Project Prompts & Actions Log

This document tracks all user prompts and the corresponding actions taken during the development of the medium-fidelity Burger Restaurant Prototype.

---

## Prompt 1
> **User Prompt:**  
> "clear current files, we will start over"  
> *(Alternative clarification: "just remove all the text from each file in this workspace, HTML, CSS and JS")*

### Actions Taken:
- Cleared all contents from existing workspace files ([index.html](file:///d:/Github/mmdd226-demo/index.html), [styles.css](file:///d:/Github/mmdd226-demo/styles.css), and [script.js](file:///d:/Github/mmdd226-demo/script.js)) to establish a fresh slate for the new project.

---

## Prompt 2
> **User Prompt:**  
> "we will create medium fidelity prototypes for a build-your-own burger restaurant website. HTML, CSS and JS only. Keep it simple. No colors or branding necessary. Make placeholder menu items on a JSON file.  
>  
> There will be a menu page, a pop-up with the builder, and a cart checkout page. We will make variations on the builder popup.  
>  
> lets start with only the menu page. it should look like this. On the far right is the cart that will lead to checkout."  
> *(Attached wireframe sketch with top navbar, far-right cart indicator, left categories sidebar, and 3-column card grid in the main section)*

### Actions Taken:
- **Created [menu.json](file:///d:/Github/mmdd226-demo/menu.json):** Defined structured placeholder categories (`Build Your Own`, `Signature Burgers`, `Sides & Appetizers`, `Drinks & Shakes`, `Desserts`) and individual item objects (IDs, prices, descriptions, customizable flags).
- **Created [index.html](file:///d:/Github/mmdd226-demo/index.html):** Structured the layout to match the provided sketch:
  - Top navigation bar with wireframe brand placeholder and a cart button on the far right.
  - Left sidebar dividing categories with a full-height divider line.
  - Main area with a 3-column card grid.
  - Prototype cart drawer ready to connect to checkout.
- **Created [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Applied medium-fidelity wireframe styles (grayscale/monochrome palette, clean borders, modern neutral typography, 3-column responsive grid, no brand colors).
- **Created [script.js](file:///d:/Github/mmdd226-demo/script.js):** Implemented data loading from `menu.json` (including fallback for `file://` protocol), dynamic category rendering, interactive filtering, cart count and drawer subtotal management, and wired customizable burger triggers.

---

## Prompt 3
> **User Prompt:**  
> "for this project, please record my prompts and summaries of your actions in a prompts.md file. Update it as we go."

### Actions Taken:
- Created and initialized [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md) documenting all prior prompts and actions, establishing the format for ongoing project logging.

---

## Prompt 4
> **User Prompt:**  
> "nice, now lets tweak the menu a bit before progressing. Make the menu items 4 columns instead of 3."

### Actions Taken:
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):**
  - Changed `.menu-grid` layout to `grid-template-columns: repeat(4, 1fr)` with an optimized 20px gap.
  - Expanded `.menu-main` container `max-width` to `1400px` to comfortably accommodate the 4-column layout on desktop screens.
  - Updated media query breakpoints to scale gracefully from 4 columns to 3 (at `1200px`), 2 (at `900px`), and 1 (at `640px`).
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Updated the layout comment to reflect the 4-column structure.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 5
> **User Prompt:**  
> "remove the burger builder text and logo box from the top left. We don't need it"

### Actions Taken:
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Removed the `.nav-brand` container and logo box from `<header class="top-nav">`.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Adjusted `.top-nav` to `justify-content: flex-end` so only the cart button is displayed on the far right, exactly matching the wireframe drawing, and removed obsolete brand classes.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 6
> **User Prompt:**  
> "put the cart button back in the right of the page."

### Actions Taken:
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Added explicit `width: 100%` on `.top-nav` and `margin-left: auto` on `.nav-actions` to guarantee the Cart button is anchored flush to the right of the top navigation bar.
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Added inline `style="margin-left: auto;"` to `.nav-actions` and cache-busting to the stylesheet link to prevent browser caching from aligning the single header item to the left.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 7
> **User Prompt:**  
> "on the top bar, add a placeholder logotype named "LOGO" that links back to this menu. and beside it, a toggle button for pickup and delivery."

### Actions Taken:
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Added `.nav-left` containing `<a href="index.html" class="nav-logo">LOGO</a>` (linking back to the menu) and an accessible segmented toggle button group (`#order-mode-toggle`) with "Pickup" and "Delivery" options.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Styled the "LOGO" link in clean medium-fidelity boxed typography, styled the rounded toggle pill with subtle neutral active states, and preserved the cart button's position on the far right.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):** Added interactive toggle handler (`setupOrderToggle`) and tracked the order mode (`pickup` vs `delivery`) in the application state.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 8
> **User Prompt:**  
> "Now, make a simple checkout screen. It should have a submit button that turns green when pressed."

### Actions Taken:
- **Created [checkout.html](file:///d:/Github/mmdd226-demo/checkout.html):** Designed a simple medium-fidelity checkout page containing a top bar with `LOGO` link and "Back to Menu" navigation, a customer contact form, fulfillment details tailored to Pickup/Delivery, payment method placeholders, an order summary breakdown (Subtotal, Tax, Total), and a submit button with a confirmation banner.
- **Created [checkout.js](file:///d:/Github/mmdd226-demo/checkout.js):**
  - Reads stored cart and fulfillment mode from `localStorage` (with sample fallback data for instant testing).
  - Calculates subtotal, 8% tax, and total.
  - Implemented the submit button click event: **turns the submit button green** (`.btn-green`), updates its label to "✓ Order Submitted", and reveals the order confirmation banner.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Added medium-fidelity styling for the checkout page layout, form elements, order summary card, and the submit button's active green state (`#16a34a`).
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):** Connected the menu page's cart drawer "Proceed to Checkout" button to persist cart data and route directly to [checkout.html](file:///d:/Github/mmdd226-demo/checkout.html).
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 9
> **User Prompt:**  
> "link the "proceed to checkout" button on the cart to go to the checkout screen."

### Actions Taken:
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Converted the "Proceed to Checkout" button in the cart drawer into an active link `<a href="checkout.html" class="checkout-btn" id="checkout-btn">Proceed to Checkout</a>` ensuring direct navigation to the checkout screen.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Adjusted `.checkout-btn` styles to display as a full-width block button with centered text and hover state.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):** Ensured the cart state and order mode are saved to `localStorage` immediately upon clicking, removed disabled restrictions so users can always test checkout, and redirected directly to [checkout.html](file:///d:/Github/mmdd226-demo/checkout.html).
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 10
> **User Prompt:**  
> "now, we need to prepare for the builder menu popup variations.  
>  
> on the bottom of the page, add a black footer navbar and four buttons, A, B, C and D. Those will be toggles for our different variations of the pop-up menu."

### Actions Taken:
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Added a fixed `<footer class="variation-footer" id="variation-footer">` at the bottom containing a "Builder Variation:" indicator and four toggle buttons: **A**, **B**, **C**, and **D**.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):**
  - Styled the black footer bar with high contrast (`#000000`), subtle top border, and elevated shadow.
  - Styled toggle buttons with active white/black inversion state, hover interactions, and added bottom padding to `body` to prevent content overlap.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):**
  - Added `builderVariation` property to application state (defaulting to `"A"` and preserved via `localStorage`).
  - Implemented `setupVariationToggle()` to manage switching between variations A, B, C, and D.
  - Updated `handleOpenBuilder()` to report the active variation when opening a customizable burger.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 11
> **User Prompt:**  
> "Let's set some global parameters for the pop-up builder.  
>  
> They should all dynamically update and display the price of the current burger.  
>  
> They should share the same placeholder options:  
> Bread:  
> *Required choice. Can select only one.  
> sesame seed, gluten free, multigrain, potato bun, ciabatta.  
>  
> Patty:  
> *First 1 is free, extra patties are +4.70 each. Can add multiple of the same option (still following that only the first one is free.)  
>  
> toppings:  
> *These are +1.29 each. Can add multiple of the same option, still charging for each one.  
> Cheddar, smoked cheddar, blue cheese, crispy onions, fried egg, guacamole, beef bacon, strip bacon, mushrooms.  
>  
> Salad & Sauces:  
> *First 6 are free, extra are +0.50 each. Can add multiple of the same option (still following that only the first one is free.)  
> Pickle, lettuce, tomato, mustard, mayo, BBQ, Chipotle, Red Onion, Jalapeno.  
>  
> Combo options:  
> *Combo will be a Toggle, these options disappear if the user selects no combo.  
> Sides: poutine, fries, sweet potato fries, onion rings.  
> Drinks: fountain drink, vanilla milkshake, strawberry milkshake, orange juice.  
>  
> Store these options in a JSON file"

### Actions Taken:
- **Created [builder-options.json](file:///d:/Github/mmdd226-demo/builder-options.json):** Stored all global parameters, item choices, rules, and pricing structure:
  - Base burger price ($10.99).
  - **Bread**: Exactly 1 required (Sesame Seed, Gluten Free, Multigrain, Potato Bun, Ciabatta).
  - **Patty**: 1st included, extra at +$4.70 each; supports multiple quantities.
  - **Toppings**: +$1.29 each for all selections (Cheddar, Smoked Cheddar, Blue Cheese, Crispy Onions, Fried Egg, Guacamole, Beef Bacon, Strip Bacon, Mushrooms).
  - **Salad & Sauces**: First 6 free, additional at +$0.50 each (Pickle, Lettuce, Tomato, Mustard, Mayo, BBQ, Chipotle, Red Onion, Jalapeño).
  - **Combo Toggle & Options**: Configurable combo toggle with Sides (Poutine, Fries, Sweet Potato Fries, Onion Rings) and Drinks (Fountain Drink, Vanilla Milkshake, Strawberry Milkshake, Orange Juice).
- **Created [builder-logic.js](file:///d:/Github/mmdd226-demo/builder-logic.js):** Created `BurgerPricingEngine` to dynamically compute and return real-time burger prices and itemized breakdowns across all 4 popup variations.
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Included `builder-logic.js`.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):** Initialized `burgerPricingEngine` during startup.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 12
> **User Prompt:**  
> "Version A: The idea for version A is to give the user free choice of all options at the same time, having the burger visuals and price updating dynamically, as previously discussed. Keep the burger visuals as very minimal SVGs."

### Actions Taken:
- **Implemented Variation A modal flow** in [variation-a.js](file:///d:/Github/mmdd226-demo/variation-a.js):
  - Added a free-choice builder with simultaneous access to all categories.
  - Included a Combo/Solo toggle that reveals or hides side/drink options.
  - Added dynamic live total pricing tied to the burger configuration.
  - Enabled real-time accordion interactions for bun, patty, toppings, salad & sauces, sides, and drinks.
  - Kept the burger render very minimal by using lightweight SVG layers rather than highly detailed illustrations.
- **Styled the popup to match the medium-fidelity wireframe** in [styles.css](file:///d:/Github/mmdd226-demo/styles.css):
  - Modal shell, header controls, and accordion layout.
  - Burger visual panel and live total badge.
  - Minimal monochrome styling for a hand-drawn prototype feel.
- **Connected the menu trigger** in [script.js](file:///d:/Github/mmdd226-demo/script.js):
  - Build Your Own items open the Variation A popup when the A variation is selected.
  - The popup updates price and SVG stack as the user changes selections.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 13
> **User Prompt:**  
> "looks good. Variation B is based on this sketch. it should guide the user through a clear path to build the burger."

### Actions Taken:
- **Created [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):** Built a step-by-step builder wizard that guides the user through a clear progression:
  - Bread selection
  - Patty selection
  - Toppings selection
  - Final review before adding to cart
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):** Included the Variation B script in the page load order.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):** Added B-variation handling so Build Your Own items open the step-by-step builder when Variation B is selected.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Added monochrome, medium-fidelity styling for the guided builder path, including the progress indicator, burger preview panel, and step-by-step option cards.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 14
> **User Prompt:**  
> "This version B is full of bugs. Scrap version B, we will start again step by step. Don't run debug, I will test it myself as we go."

### Actions Taken:
- **Reset Variation B to a clean starting point** in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):
  - Removed the buggy interactive flow and rebuilt it as a static visual layout only.
  - Kept the modal structure simple and faithful to the provided sketch.
- **Kept the project stable** by preserving the working Variation A flow and removing the unstable B interaction logic.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Refined the B modal styling to match the hand-drawn wireframe more closely, including the large title, centered bun illustration, row of option cards, and NEXT button.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 15
> **User Prompt:**  
> "Follow the sketch to make just the popup's visual layout, no interactivity yet."

### Actions Taken:
- **Simplified Variation B to a pure static mockup** in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):
  - Formed the modal layout around the sketch: top title, circular progress indicators, centered bun preview, six outlined option cards, and NEXT button.
  - Removed all interactive logic so the popup behaves as a visual-only mockup.
- **Adjusted styling in [styles.css](file:///d:/Github/mmdd226-demo/styles.css):** Matched the wireframe’s hand-drawn feel with a monochrome, outlined, minimal composition.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 16
> **User Prompt:**  
> "clear version B again, we will start over."

### Actions Taken:
- **Reset Variation B to a blank working slate** in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):
  - Removed the prior static mockup and replaced it with a clean, minimal modal shell.
  - Kept the structure open and neutral so the next version can be built step by step without carrying forward old layout decisions.
- **Cleaned the B-specific styling** in [styles.css](file:///d:/Github/mmdd226-demo/styles.css):
  - Removed the previous sketch-driven composition.
  - Replaced it with a simple, minimal layout to reset the visual direction.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 17
> **User Prompt:**  
> "good, we are ready to build version B.  
>  
> The version B of the popup builder should look like this. It is a step-by-step process to create the burger, starting with bread, then patty, then toppings, then salad and sauces. The options and categories are the same as version A.  
>  
> The burger should be centralized and update visually as users select options.  
>  
> Build just the bread page for now."  
> *(Attached sketch showing Step 1: BREAD with progress dots `● — ○ — ○ — ○ — ○`, centralized SVG bun preview with gap, 6-card option grid, and bottom NEXT button)*

### Actions Taken:
- **Implemented Variation B Step 1 (Bread)** in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):
  - Modeled header directly from the sketch with centered `1 : BREAD` title, stepper indicator dots (`● — ○ — ○ — ○ — ○`), and close button `(X)`.
  - Created a **centralized burger stage** displaying minimal SVG top and bottom buns with an open gap for the upcoming ingredients.
  - Added real-time SVG updates corresponding to the 5 bread choices: *Sesame Seed*, *Gluten Free (GF mark)*, *Multigrain (grains/seeds)*, *Potato Bun (pillowy curve)*, and *Ciabatta (rustic shape)*.
  - Built a 3-column selectable option card grid matching the sketch, updating active border, checkmark, and live burger visual upon selection.
  - Integrated dynamic price tag (`$10.99`) and centered bottom `NEXT ▶` button.
- **Updated styles in [styles.css](file:///d:/Github/mmdd226-demo/styles.css):**
  - Styled the rounded modal, stepper bar, centralized burger stage, option cards, active selection states, and centered `NEXT ▶` button with medium-fidelity monochrome wireframe aesthetics.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 18
> **User Prompt:**  
> "looks good! now for the patty step.  
> Patty options should have a - and + selector, as multiple can be added."

### Actions Taken:
- **Implemented Step 2 (Patty) in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):**
  - Added step transition: clicking `NEXT ▶` on Step 1 advances to `2 : PATTY`, and clicking `◀ BACK` returns to `1 : BREAD` while preserving selections.
  - Updated stepper progress bar to display Step 1 completed and Step 2 active (`● — ● — ○ — ○ — ○`).
  - Added `-` and `+` counter selectors for each patty option (*Angus Beef Patty, Crispy Smash Patty, Crispy Chicken Patty, Black Bean Veggie Patty, Plant-Based Beyond Patty*).
  - Dynamically stacks minimal SVG patty layers in the centralized burger stage as patties are added.
  - Enforced global pricing rule: first patty is included/free, and extra patties add `+$4.70` each, updating the live price badge in real-time.
- **Updated styles in [styles.css](file:///d:/Github/mmdd226-demo/styles.css):**
  - Added styles for the patty list rows, counter steppers (`- [count] +`), active quantity highlight states, stacked SVG patty layers, and footer navigation layout (`◀ BACK` and `NEXT ▶`).
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 19
> **User Prompt:**  
> "good. Now do the same for the toppings and Salads&condiments stages."

### Actions Taken:
- **Implemented Step 3 (Toppings) in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):**
  - Added stepper transition to Step 3 (`3 : TOPPINGS`) with updated progress bar indicator (`● — ● — ● — ○ — ○`).
  - Added counter selectors (`- [count] +`) for all 9 toppings: *Cheddar, Smoked Cheddar, Blue Cheese, Crispy Onions, Fried Egg, Guacamole, Beef Bacon, Strip Bacon, Mushrooms*.
  - Enforced pricing rule: Toppings are `+$1.29` each for all selected quantities, updating row pricing notes and dynamic price badge in real-time.
  - Added minimal SVG visual layers for toppings (cheese slice silhouette, wavy bacon strips, fried egg disc, gourmet toppings) into the centralized burger stage.
  - Supported two-way navigation: `◀ BACK` returns to Step 2 (Patty), and `NEXT ▶` advances to Step 4 while preserving selections.
- **Implemented Step 4 (Salads & Condiments) in [variation-b.js](file:///d:/Github/mmdd226-demo/variation-b.js):**
  - Added stepper transition to Step 4 (`4 : SALADS & CONDIMENTS`) with progress indicator (`● — ● — ● — ● — ○`).
  - Added counter selectors (`- [count] +`) for all 9 options: *Pickle, Lettuce, Tomato, Mustard, Mayo, BBQ, Chipotle, Red Onion, Jalapeño*.
  - Enforced global rule: First 6 items selected across the category are **FREE**, with each additional item charged at `+$0.50`.
  - Added dynamic status banner tracking the free allowance count (e.g., `(3/6 selected)` vs extra charges).
  - Added minimal SVG visual layers for salads and sauces (sauce drizzle squiggles, tomato slices, pickle rounds, red onion rings, jalapeño wheels, and lettuce base).
  - Live price badge calculates and displays real-time price updates.
  - Added `◀ BACK` button returning to Step 3 with full state retention.
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.

---

## Prompt 20
> **User Prompt:**  
> "let's quickly make version C and D.  
> Reuse SVGs you already make. Do not make new SVGs. Use a simple rounded rectangle for ingredients instead.  
>  
> Version C should look like the sketch.  
> Don't implement prices on this one. Just clickable categories."  
> *(Attached sketch showing top category tabs `[ BUN ]` `[ PATTY ]` `[ TOPPINGS ]`, centered burger visual, 3x2 grid of rectangular option cards, and bottom oval `[ ADD ]` button)*

### Actions Taken:
- **Created [variation-c.js](file:///d:/Github/mmdd226-demo/variation-c.js):**
  - Built Variation C directly matching the provided sketch:
    - Top boxed category tabs: `[ BUN ]`, `[ PATTY ]`, `[ TOPPINGS ]`, and `[ SALAD & SAUCE ]` with an accessible `(X)` close button.
    - Centered burger visual reusing existing minimal top and bottom bun SVGs, with all fillings rendered as simple rounded rectangles.
    - 3x2 grid of rectangular option cards (6 cards) positioned below the burger visual.
    - Clickable category tabs switch the options shown in the grid.
    - Selecting/toggling option cards immediately adds/removes simple rounded rectangle layers in the burger visual.
    - Completely omitted all pricing displays as requested.
    - Centered oval/pill `[ ADD ]` button at the bottom to add the configured burger to the cart.
- **Created [variation-d.js](file:///d:/Github/mmdd226-demo/variation-d.js):**
  - Built Variation D using a responsive split-screen layout:
    - Reuses existing minimal bun SVGs and simple rounded rectangles for ingredients.
    - Left panel: Large centralized burger stage with live layer count badge.
    - Right panel: Category pill selector (`BUN`, `PATTY`, `TOPPINGS`, `SALADS`) and 2-column cards with counter steppers.
    - Bottom: Full-width `ADD TO CART` button.
- **Updated [index.html](file:///d:/Github/mmdd226-demo/index.html):**
  - Included `variation-c.js` and `variation-d.js` in the script load order.
- **Updated [script.js](file:///d:/Github/mmdd226-demo/script.js):**
  - Connected Variation C and Variation D to the footer toggles so clicking `C` or `D` on the bottom bar immediately launches the respective builder popup.
- **Updated [styles.css](file:///d:/Github/mmdd226-demo/styles.css):**
  - Added medium-fidelity styling for Variation C (top tab buttons, centered stage, 3x2 grid, oval ADD button) and Variation D (split-panel layout, pill tabs, stepper cards).
- **Updated [prompts.md](file:///d:/Github/mmdd226-demo/prompts.md):** Recorded this prompt and the actions taken.
