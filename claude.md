# Headphones Hub Demo Storefront Requirements

## Goal

Update the existing Headphones Hub ecommerce site so it can support a customer-facing agent demo using Novu Connect and Tabstack.

The demo should show a customer asking an agent to:

1. Check if a specific headphone product is available in a preferred color or variant.
2. Compare it with similar alternatives under a specific budget.
3. Request a restock notification when the preferred product becomes available.
4. Receive a follow-up notification after the product is marked as back in stock.

This is a demo site, not a production ecommerce system. Do not build checkout, payment processing, shipping, tax, user accounts, or real inventory management.

---

## Demo Scenario

The main demo prompt should be:

> Check if Beats Solo Air is available in red. If not, compare it with two wireless headphones under $120 that are good for commuting and calls.

Expected agent outcome:

* The agent checks the Beats Solo Air product page.
* The agent sees that the red variant is out of stock.
* The agent finds two similar products under $120.
* The agent compares those products.
* The agent asks whether the customer wants a product link or a restock alert.
* The customer requests a restock alert.
* An admin manually marks the red Beats Solo Air variant as in stock.
* A Novu notification is triggered to tell the customer the product is back in stock.

---

## Required Features

### 1. Product detail pages

Create individual product detail pages for each demo product.

Suggested routes:

```txt
/products/beats-solo-air
/products/wireless-studio-headphones
/products/cool-in-ear-headphones
/products/noise-canceling-travel-headphones
/products/bassboost-gaming-headset
```

Each product detail page should include visible product information that an agent can read from the page.

Each page should show:

* Product name
* Product category
* Price
* Product image
* Short description
* Use cases
* Key features
* Available colors
* Stock status per color
* Similar products
* Product URL

Acceptance criteria:

* Each product has a unique public URL.
* Each product page can be accessed without login.
* Product information is visible in the page content.
* The page includes enough detail for an agent to compare products.

---

### 2. Product data model

Add a product data structure that powers the product pages.

Use a simple local data file, JSON file, or static array. A database is not required.

Suggested product fields:

```json
{
  "id": "beats-solo-air",
  "name": "Beats Solo Air",
  "category": "Wireless headphones",
  "price": 99,
  "currency": "USD",
  "description": "Lightweight wireless headphones for everyday listening, commuting, and calls.",
  "image": "/images/beats-solo-air.png",
  "features": [
    "Wireless Bluetooth connection",
    "Built-in microphone",
    "Lightweight on-ear design",
    "20-hour battery life"
  ],
  "useCases": [
    "commuting",
    "calls",
    "everyday listening"
  ],
  "variants": [
    {
      "color": "Black",
      "inStock": true
    },
    {
      "color": "White",
      "inStock": true
    },
    {
      "color": "Red",
      "inStock": false
    }
  ],
  "similarProductIds": [
    "wireless-studio-headphones",
    "cool-in-ear-headphones"
  ]
}
```

Acceptance criteria:

* Product data is reusable across product cards and product detail pages.
* Product variants include color and stock status.
* At least one product variant is out of stock.
* At least two alternative products are in stock and under the demo budget.

---

### 3. Demo product catalog

Create at least five realistic products with differentiated names, prices, and use cases.

Recommended demo products:

#### Beats Solo Air

* Category: Wireless headphones
* Price: $99
* Use cases: Commuting, calls, everyday listening
* Colors: Black, White, Red
* Red status: Out of stock
* Similar products: Wireless Studio Headphones, Cool In-ear Headphones

#### Wireless Studio Headphones

* Category: Wireless headphones
* Price: $110
* Use cases: Commuting, calls, focused work
* Colors: Black, Blue
* Stock status: In stock
* Key feature: Noise cancellation
* Battery life: 30 hours

#### Cool In-ear Headphones

* Category: Wireless earbuds
* Price: $45
* Use cases: Calls, workouts, lightweight listening
* Colors: Red, Black, White
* Stock status: In stock
* Key feature: Budget-friendly and lightweight

#### Noise-Canceling Travel Headphones

* Category: Wireless headphones
* Price: $149
* Use cases: Travel, commuting, focused work
* Colors: Black, Silver
* Stock status: In stock
* Key feature: Stronger noise cancellation

#### BassBoost Gaming Headset

* Category: Gaming headset
* Price: $89
* Use cases: Gaming, voice chat, streaming
* Colors: Black, Green
* Stock status: In stock
* Key feature: Low-latency microphone and bass-heavy sound

Acceptance criteria:

* Product names are specific and easy to reference.
* Products have clear differences.
* At least two products match this query: “wireless headphones under $120 for commuting and calls.”
* The unavailable product has useful alternatives.

---

### 4. Structured product data on each product page

Add structured product data to each product detail page so extraction is reliable.

Add a JSON block to each page, using the product data for that page.

Example:

```html
<script id="product-data" type="application/json">
{
  "id": "beats-solo-air",
  "name": "Beats Solo Air",
  "category": "Wireless headphones",
  "price": 99,
  "currency": "USD",
  "variants": [
    {
      "color": "Black",
      "inStock": true
    },
    {
      "color": "White",
      "inStock": true
    },
    {
      "color": "Red",
      "inStock": false
    }
  ],
  "useCases": [
    "commuting",
    "calls",
    "everyday listening"
  ],
  "similarProductIds": [
    "wireless-studio-headphones",
    "cool-in-ear-headphones"
  ]
}
</script>
```

Acceptance criteria:

* Each product page includes a `script` tag with `id="product-data"`.
* The JSON is valid.
* The JSON matches the visible product content.
* The product data includes price, variants, stock status, use cases, and similar products.

---

### 5. Product comparison support

Add enough data for an agent to compare similar products.

Each product should include:

* Price
* Category
* Use cases
* Battery life
* Noise cancellation status
* Microphone support
* Stock status
* Short recommendation angle

Example fields:

```json
{
  "batteryLifeHours": 20,
  "noiseCancellation": false,
  "hasMicrophone": true,
  "recommendationAngle": "Best for everyday listening and calls at a lower price."
}
```

Acceptance criteria:

* The agent can compare products based on price, use case, and features.
* The alternatives for Beats Solo Air are both under $120.
* The comparison can explain why each alternative is relevant.

---

### 6. Restock alert demo flow

Add a simple way to simulate a restock event.

This does not need to be a real inventory system. Use a simple admin page, hidden route, API route, or script.

Recommended route:

```txt
/admin/products
```

The admin page should show:

* Product name
* Variant color
* Current stock status
* Button to mark variant as in stock
* Button to mark variant as out of stock

For the main demo, include this item:

```txt
Beats Solo Air — Red
Current status: Out of stock
Action: Mark as in stock
```

Acceptance criteria:

* Admin can manually change the red Beats Solo Air variant from out of stock to in stock.
* The updated stock state is reflected on the product detail page.
* The action can trigger or simulate a Novu notification.

---

### 7. Novu notification trigger placeholder

Add a placeholder function or API route that can be connected to Novu later.

Suggested route:

```txt
/api/trigger-restock-alert
```

Suggested payload:

```json
{
  "subscriberId": "demo-customer",
  "productName": "Beats Solo Air",
  "variant": "Red",
  "productUrl": "https://headphones-hub.vercel.app/products/beats-solo-air"
}
```

Suggested message:

```txt
Good news — Beats Solo Air is back in stock in red. View it here: https://headphones-hub.vercel.app/products/beats-solo-air
```

Acceptance criteria:

* The route can be called when the admin marks a product as back in stock.
* The function is isolated so Novu integration can be added later.
* If Novu credentials are missing, the app should not crash. It should log the intended notification payload.

---

### 8. Demo-friendly homepage updates

Update the homepage so it supports the demo story.

The homepage should include:

* A clear product grid.
* Product cards with names, prices, and stock badges.
* Links to product detail pages.
* A visible “Out of stock” badge for Beats Solo Air in red, either on the card or detail page.
* A small section explaining that customers can ask the shopping assistant for help.

Suggested homepage copy:

```txt
Not sure what to buy?
Ask our shopping assistant to check availability, compare similar headphones, and notify you when an item is back in stock.
```

Acceptance criteria:

* Product cards link to detail pages.
* Product names are no longer generic.
* The demo product is easy to find.
* The homepage makes the assistant use case obvious.

---

## Out of Scope

Do not build these for the demo:

* Checkout
* Payment processing
* Stripe integration
* Shipping address collection
* Tax calculation
* User authentication
* Customer account pages
* Real cart persistence
* Order placement
* Real inventory database
* Production admin security
* Full ecommerce CMS

The demo should end with a product link, wishlist-style intent, or restock notification.

---

## Final Demo Script

Use this as the primary test flow.

### Customer message

```txt
Check if Beats Solo Air is available in red. If not, compare it with two wireless headphones under $120 that are good for commuting and calls.
```

### Expected agent response

```txt
Beats Solo Air is currently out of stock in red.

I found two similar wireless headphones under $120:

1. Wireless Studio Headphones — $110
   Best for commuting and calls because it includes noise cancellation, a built-in microphone, and 30-hour battery life.

2. Cool In-ear Headphones — $45
   Best budget option for calls and lightweight everyday listening.

My recommendation: choose Wireless Studio Headphones if you want the closest all-around alternative. Choose Cool In-ear Headphones if price matters most.

Do you want the product link, or should I notify you when Beats Solo Air is back in stock in red?
```

### Customer follow-up

```txt
Notify me when it is back in stock.
```

### Expected agent response

```txt
Got it. I’ll notify you when Beats Solo Air is available in red.
```

### Admin action

Admin marks:

```txt
Beats Solo Air — Red: In stock
```

### Expected notification

```txt
Good news — Beats Solo Air is back in stock in red. View it here: https://headphones-hub.vercel.app/products/beats-solo-air
```

---

## Success Criteria

The work is complete when:

* The site has at least five realistic product detail pages.
* Each product page has visible product data and embedded structured JSON.
* Beats Solo Air has a red variant marked as out of stock.
* At least two similar products under $120 are available.
* There is a simple admin or script-based way to mark the red Beats Solo Air variant as back in stock.
* There is a placeholder Novu notification trigger.
* The demo can run without checkout, payments, customer accounts, or a real inventory backend.
