
G sravan Kumar

Git-Hub :- ('https://github.com/sravanKumar1211/Ecommerce-App.git')

# Shoppy Globe — Ecommerce App

A responsive, Amazon-style e-commerce frontend built with React + Vite and Tailwind CSS. The project demonstrates product listing, category carousel, product details, cart management, and a simple checkout flow using Redux Toolkit.

---

## Key features

* **Product listing & categories** — fetches product data (dummyjson) and displays categorized products.
* **Amazon-like UI** — Tailwind CSS theme with dark header, yellow CTA, product cards, and responsive layouts.
* **Category carousel** — full-width auto-scrolling category carousel with manual left/right controls.
* **Product detail pages** — images, thumbnails, ratings, description, specs, reviews, and add-to-cart.
* **Cart management** — add / remove / increase / decrease quantities using Redux slice (`cartSlice`).
* **Checkout form** — client-side validation and order confirmation flow that clears the cart.
* **Search & filter** — search box and search results (debounced) using `productSlice` to store and filter.
* **Code-splitting & performance** — `React.lazy`, `Suspense`, `memo` where appropriate and lazy-loaded images.
* **Error handling components** — `Err` and `NotFound` routes for graceful error states.

---

## Tech stack

* React (with hooks)
* Vite (dev server & build)
* Tailwind CSS
* Redux Toolkit (slices for `product` and `cart`)
* React Router (v6)
* react-lazy-load-image-component
* react-icons

---

## How I wrote this code (brief)

1. **Project bootstrap** — created with Vite + React template; Tailwind configured using PostCSS / Tailwind plugin.
2. **State management** — used Redux Toolkit to keep product and cart state in slices. `addProduct` action fills the product store when API data arrives.
3. **API hook** — `useFetchData` custom hook centralizes fetching (loading / error states) from `https://dummyjson.com/products` and is reused across pages.
4. **Component design** — small, focused components in `src/components/` (Header, Footer, Home, ProductList, ProductItem, ProductDetail, Cart, CartItem, Checkout, Search, Err, NotFound).
5. **Routing** — app routes use `react-router-dom` to map pages (home, product detail, category lists, cart, checkout) and use lazy-loaded route components.
6. **Styling** — Tailwind utility classes applied throughout with an Amazon-inspired color palette and responsive breakpoints.
7. **UX & performance** — used `React.lazy` + `Suspense`, `memo` for `ProductItem`, lazy image loading, and debounced search to reduce re-renders and network calls.

---

## Code schema (high level)

* **UI / Components**

  * `Header.jsx` — top navigation, cart badge, mobile menu
  * `Footer.jsx` — site footer
  * `Home.jsx` — hero, category carousel, deals and top-rated sections
  * `ProductList.jsx` — list / grid page, search bar
  * `ProductItem.jsx` — single product card used in lists
  * `ProductDetail.jsx` — product detail and review list
  * `Cart.jsx` / `CartItem.jsx` — shopping cart and per-item controls
  * `Checkout.jsx` — billing form and order summary
  * `Search.jsx` — search results
  * `Err.jsx`, `NotFound.jsx` — error states

* **State & utils**

  * `utils/productSlice.js` — Redux slice for products, filtering and search queries
  * `utils/cartSlice.js` — Redux slice to manage cart items (add, remove, increase, decrease, clear)
  * `Hooks/useFetchData.js` — custom hook to fetch API with `loading` and `error` states

* **Assets / static**

  * Images are loaded from external URLs (dummy data). You can replace them with local `/public` assets if needed.

---

## Folder structure (typical)

```
Ecommerce-App/
├─ package.json
├─ index.html
├─ vite.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ src/
│  ├─ main.jsx              # React entry (Router & Provider)
│  ├─ App.jsx               # App routes
│  ├─ hooks/
│  │  └─ useFetchData.js
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Home.jsx
│  │  ├─ ProductList.jsx
│  │  ├─ ProductItem.jsx
│  │  ├─ ProductDetail.jsx
│  │  ├─ Cart.jsx
│  │  ├─ CartItem.jsx
│  │  ├─ Checkout.jsx
│  │  ├─ Search.jsx
│  │  ├─ Err.jsx
│  │  └─ NotFound.jsx
│  ├─ utils/
│  │  ├─ productSlice.js
│  │  └─ cartSlice.js
│  └─ styles/               # tailwind css files (if any)
└─ README.md
```

> Note: filenames above are taken from the repository's components and from code snippets.

---

## How to run (local development)

1. **Clone the repo**

```bash
git clone https://github.com/sravanKumar1211/Ecommerce-App.git
cd Ecommerce-App
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Run development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) (Vite default) in your browser.

4. **Build for production**

```bash
npm run build
# preview the production build
npm run preview
```

---

## Environment & configuration

* No API keys are required — data is fetched from `https://dummyjson.com/products`.
* Tailwind should already be configured in `tailwind.config.js`. If you add Tailwind plugins (like `scrollbar-hide`) install them and update the config.

---

## Troubleshooting

* If you see JSX parsing errors, ensure your Node and npm versions are compatible (Node >= 14 recommended).
* If carousel JS doesn’t run, ensure `useEffect` is present and that the carousel element id is `categoryCarousel`.
* If images don’t load, replace external URLs with local images in `public/` and update paths.

---

## How to extend / what to add in other components

* **Persist cart** — add `localStorage` persistence in `cartSlice` or save to backend.
* **Auth / User** — add login/signup routes and protected checkout.
* **Backend** — connect to real API for product inventory and orders.
* **Payment** — integrate payment gateway for card/UPI flows.
* **Testing** — add Jest + React Testing Library tests for critical components.

---

## License

This project is provided as-is. Add an appropriate license if you plan to open-source it.

---

If you'd like, I can commit this `README.md` to your repo (I would need collaborator access or you can paste it). I can also create a shorter `README` for GitHub front-page or generate a `CONTRIBUTING.md`.



*********************************************************************************************************************************

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
