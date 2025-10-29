import type { CartProduct } from "../types";

type Props = {
  items: CartProduct[];
  total: number;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (cartItemId: string) => void;
  onCheckoutClick: () => void;
};

export default function CartPanel({
  items,
  total,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckoutClick,
}: Props) {
  return (
    <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Your Cart</h2>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      <div className="divide-y divide-gray-100 max-h-80 overflow-auto">
        {items.length === 0 && (
          <div className="p-6 text-sm text-gray-500">Your cart is empty.</div>
        )}
        {items.map((item) => (
          <div key={item._id} className="p-4 flex gap-3 items-center">
            <img
              src={item.productId.image}
              alt={item.productId.name}
              className="h-14 w-14 rounded object-cover border"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.productId.name}</div>
              <div className="text-sm text-gray-500">${item.productId.price.toFixed(2)}</div>
              <div className="mt-2 inline-flex items-center gap-2">
                <button
                  className="h-7 w-7 rounded border hover:bg-gray-50"
                  onClick={() => onDecrement(item.productId._id)}
                >
                  −
                </button>
                <span className="text-sm">{item.qty}</span>
                <button
                  className="h-7 w-7 rounded border hover:bg-gray-50"
                  onClick={() => onIncrement(item.productId._id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-medium">
                ${(item.productId.price * item.qty).toFixed(2)}
              </div>
              <button
                onClick={() => onRemove(item._id)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-gray-600">Total</div>
        <div className="text-lg font-bold">${total.toFixed(2)}</div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={onCheckoutClick}
          className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-colors disabled:opacity-50"
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

