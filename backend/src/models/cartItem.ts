import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  productId: mongoose.Types.ObjectId;
  qty: number;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, default: 1 },
});

export default mongoose.model<ICartItem>("CartItem", cartItemSchema);
