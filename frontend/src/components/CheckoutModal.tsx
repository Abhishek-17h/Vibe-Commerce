import { useEffect, useRef, useState } from "react";
import type { Receipt } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => Promise<Receipt>;
};

export default function CheckoutModal({ open, onClose, onSubmit }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const canSubmit = name.trim() !== "" && /@/.test(email);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const r = await onSubmit(name, email);
      setReceipt(r);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setName("");
    setEmail("");
    setReceipt(null);
    onClose();
  }

  return (
    <dialog ref={dialogRef} className="rounded-xl p-0 w-full max-w-md">
      <div className="p-5 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Checkout</h3>
          <button onClick={handleClose} className="text-gray-500">✕</button>
        </div>
      </div>
      {!receipt ? (
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="jane@example.com"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleClose} className="px-3 py-2 rounded-md border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="px-4 py-2 rounded-md bg-gray-900 text-white disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay now"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-5 space-y-2">
          <div className="text-green-700 font-medium">{receipt.message}</div>
          <div className="text-sm text-gray-600">Total: ${receipt.total.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Time: {new Date(receipt.timestamp).toLocaleString()}</div>
          <button onClick={handleClose} className="mt-4 w-full px-4 py-2 rounded-md bg-gray-900 text-white">Close</button>
        </div>
      )}
    </dialog>
  );
}

