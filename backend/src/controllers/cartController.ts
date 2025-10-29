import { Request, Response } from "express";
import CartItem from "../models/cartItem";

export const getCart = async (_req: Request, res: Response) => {
  const cart = await CartItem.find().populate("productId");
  const total = cart.reduce(
    (sum, item) => sum + (item.productId as any).price * item.qty,
    0
  );
  res.json({ cart, total });
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, qty } = req.body;
  const existing = await CartItem.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await CartItem.create({ productId, qty });
  }
  res.json({ message: "Added to cart" });
};

export const removeFromCart = async (req: Request, res: Response) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkout = async (_req: Request, res: Response) => {
  const cart = await CartItem.find().populate("productId");
  const total = cart.reduce(
    (sum, item) => sum + (item.productId as any).price * item.qty,
    0
  );
  await CartItem.deleteMany();
  res.json({ message: "Checkout successful", total, timestamp: new Date() });
};
