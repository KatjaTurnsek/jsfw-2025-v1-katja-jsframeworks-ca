# JS Frameworks Course Assignment – Online Shop

Single-page online shop built with **Vite + React + TypeScript** and styled with **Bootstrap (CSS-only)** plus small custom `ui-` classes.

## Live demo

Add your deployed URL here:

- Live site: [Little Joy Shop](https://littlejoy-shop.netlify.app)

## Repo

- GitHub repo: https://github.com/NoroffFEU/jsfw-2025-v1-katja-jsframeworks-ca

## Tech stack

- Vite + React
- TypeScript (strict)
- React Router (SPA routing)
- Bootstrap 5 (CSS-only)
- Prettier (formatting)

## Features (matches the brief)

- **Home page product grid** (fetches products from API)
- **Search** with dropdown results that link to product pages
- **Product details page** (`/product/:id`) with price, discount display, tags and reviews (when available)
- **Cart**
  - Add to cart
  - Cart badge count in header
  - Update quantity (+ / −)
  - Remove item
  - Total cost
  - **Toast notifications** for “Added to cart” and “Removed from cart”
- **Checkout success** page clears the cart
- **Contact form** with validation:
  - Full name min 3
  - Subject min 3
  - Email valid format
  - Message min 10
- Loading + error states on API calls
- Responsive layout (mobile → desktop)

## API

This project uses the Noroff Online Shop API:

- `GET https://v2.api.noroff.dev/online-shop`
- `GET https://v2.api.noroff.dev/online-shop/:id`

## Getting started (run locally)

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run preview      # preview production build locally
npm run lint         # run eslint
npm run format       # format with prettier
npm run format:check # check formatting
```

## Notes

- Custom styling uses `ui-` prefixed classes (small additions on top of Bootstrap).
- Cart is persisted using `localStorage`.

## Deployment

Deployed with: Netlify
