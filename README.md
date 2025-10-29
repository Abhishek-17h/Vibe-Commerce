# Vibe Commerce

A simple e-commerce demo featuring a Node/Express + MongoDB backend and a React + Vite + Tailwind frontend.

## Project Structure

```
backend/   # Express API + Mongoose
frontend/  # React app (Vite, TypeScript, Tailwind)
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (Atlas or local)

---

## Backend

### 1) Install

```bash
cd backend
npm install
```

### 2) Environment

Create a `.env` in `backend/` with:

```
MONGO_URL="your-mongodb-connection-string"
PORT=5000
```

### 3) Seed Data

Seeds a set of sample products:

```bash
npm run seed
```


### 4) Run

```bash
npm run dev   # ts-node-dev
# or
npm run build && npm start
```

### API Endpoints

- GET `/api/products` → Product[]
- GET `/api/cart` → `{ cart: CartItem[], total: number }`
- POST `/api/cart` → `{ message: string }` with body `{ productId: string, qty: number }`
  - Positive `qty` increments; negative `qty` decrements
  - If quantity drops to 0 or below, the item is removed
- DELETE `/api/cart/:id` → `{ message: string }`
- POST `/api/cart/checkout` → `{ message, total, timestamp }`


---

## Frontend

### 1) Install

```bash
cd frontend
npm install
```

### 2) Environment (optional)

The frontend expects the backend at `http://localhost:5000` by default. To override, create `frontend/.env`:

```
VITE_API_BASE=http://localhost:5000
```

### 3) Run

```bash
npm run dev
```

Open `http://localhost:5173`.

### Features

- Landing page shows products in a responsive grid.
- Each product has an "Add to Cart" button.
- Header Cart button navigates to a dedicated cart page.
- Cart page shows items, quantity (+/−), remove, and total.
- Checkout opens a modal with name/email and returns a receipt.

### Tech

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Axios for API calls

---

## Scripts

Backend:
- `npm run dev` — start API in dev (ts-node-dev)
- `npm run seed` — seed products
- `npm run build` — compile TypeScript
- `npm start` — run compiled build

Frontend:
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build

---

## License

MIT
