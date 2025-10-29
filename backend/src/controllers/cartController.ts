import { Request, Response } from "express";
import CartItem from "../models/cartItem";

export const getCart = async (_req: Request, res: Response) => {
  const cart = await CartItem.find().populate("productId");
  const validItems = cart.filter((item) => !!item.productId);
  const total = validItems.reduce((sum, item) => {
    const price = (item.productId as any).price || 0;
    return sum + price * item.qty;
  }, 0);
  const orphaned = cart.filter((item) => !item.productId).map((i) => i._id);
  if (orphaned.length > 0) {
    await CartItem.deleteMany({ _id: { $in: orphaned } });
  }
  res.json({ cart: validItems, total });
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, qty } = req.body;
  const existing = await CartItem.findOne({ productId });
  if (existing) {
    const nextQty = existing.qty + qty;
    if (nextQty <= 0) {
      await CartItem.findByIdAndDelete(existing._id);
    } else {
      existing.qty = nextQty;
      await existing.save();
    }
  } else {
    if (qty > 0) {
      await CartItem.create({ productId, qty });
    }
  }
  res.json({ message: "Added to cart" });
};

export const removeFromCart = async (req: Request, res: Response) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkout = async (_req: Request, res: Response) => {
  const cart = await CartItem.find().populate("productId");
  const validItems = cart.filter((item) => !!item.productId);
  const total = validItems.reduce((sum, item) => {
    const price = (item.productId as any).price || 0;
    return sum + price * item.qty;
  }, 0);
  await CartItem.deleteMany();
  res.json({ message: "Checkout successful", total, timestamp: new Date() });
};
