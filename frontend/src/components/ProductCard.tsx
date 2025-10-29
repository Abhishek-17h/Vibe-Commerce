import type { Product } from "../types";

type Props = {
  product: Product;
  onAdd: (id: string) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-sm text-gray-500">Product</div>
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product._id)}
            className="inline-flex items-center px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

