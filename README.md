# Galaxy Motors

Luxury car dealership frontend — React + Vite + Tailwind CSS + Framer Motion.
Wired to your existing backend at `https://full-backend-kapadya.vercel.app`
for auth (signup/login/JWT) and orders (checkout with receipt upload).

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Structure

- `src/pages` — Home, Buy/Rent listing (`/cars/buy`, `/cars/rent`), Car detail,
  Cart, Checkout, Login, Signup, My Orders, About, Contact
- `src/context` — `AuthContext` (JWT, backed by `/api/auth/*`),
  `CartContext` (localStorage-persisted cart)
- `src/api/client.js` — all backend calls; change `API_BASE` here if you
  redeploy the backend elsewhere
- `src/data/cars.js` — the car catalog. The backend currently only exposes
  auth + orders, so the fleet is mocked here. Swap this file for a real
  `/api/cars` fetch later without touching any page.

## Notes

- Checkout posts a `multipart/form-data` request to `POST /api/orders`
  exactly matching your `orderRoutes.js`: `name, phone, country, city,
  items (JSON string), subtotalPKR, receipt (file)`, with the JWT sent as
  `Authorization: Bearer <token>`.
- Delivery fee is estimated client-side (₨4,000 Pakistan / ₨11,000
  international) purely for display — your backend recalculates and
  enforces the real total server-side, as it already does.
- Uses `HashRouter`, so it deploys cleanly on Vercel/Netlify with zero
  rewrite config (URLs look like `/#/cars/buy`). Swap to `BrowserRouter`
  in `src/main.jsx` if you add a rewrite rule instead.
