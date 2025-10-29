import { useEffect, useMemo, useState } from "react";
import { getProducts, getCart, addToCart, removeFromCart, checkout } from "./lib/api";
import type { Product, CartProduct, Receipt } from "./types";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [view, setView] = useState<"products" | "cart">("products");

  useEffect(() => {
    (async () => {
      try {
        const [p, c] = await Promise.all([getProducts(), getCart()]);
        setProducts(p);
        setCartItems(c.cart);
        setTotal(c.total);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function refreshCart() {
    const c = await getCart();
    setCartItems(c.cart);
    setTotal(c.total);
  }

  async function handleAdd(productId: string) {
    await addToCart(productId, 1);
    await refreshCart();
  }

  async function handleIncrement(productId: string) {
    await addToCart(productId, 1);
    await refreshCart();
  }

  async function handleDecrement(productId: string) {
    await addToCart(productId, -1);
    await refreshCart();
  }

  async function handleRemove(cartItemId: string) {
    await removeFromCart(cartItemId);
    await refreshCart();
  }

  const columnsClass = useMemo(() => {
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
  }, []);

  async function handleSubmitCheckout(name: string, email: string): Promise<Receipt> {
    const receipt = await checkout({ name, email });
    await refreshCart();
    return receipt;
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gray-900" />
            <button onClick={() => setView("products")} className="font-semibold">
              Vibe Commerce
            </button>
          </div>
          <button
            onClick={() => setView("cart")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            <span>Cart</span>
            <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-gray-900 text-white text-xs">
              {cartItems.length}
            </span>
          </button>
        </div>
      </header>

      {view === "products" && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-sm text-gray-600">Browse and add to your cart</p>
            </div>
            {loading && <div className="text-sm text-gray-500">Loading...</div>}
          </div>
          <div className={columnsClass}>
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        </main>
      )}

      {view === "cart" && (
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <p className="text-sm text-gray-600">Review items and proceed to checkout</p>
            </div>
            <button onClick={() => setView("products")} className="text-sm hover:underline">
              Continue shopping
            </button>
          </div>
          <CartPanel
            items={cartItems}
            total={total}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            onCheckoutClick={() => setShowCheckout(true)}
          />
          <CheckoutModal
            open={showCheckout}
            onClose={() => setShowCheckout(false)}
            onSubmit={handleSubmitCheckout}
          />
        </main>
      )}
    </div>
  );
};

export default App;
