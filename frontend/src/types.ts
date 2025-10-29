export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export type CartProduct = {
  _id: string; 
  productId: Product;
  qty: number;
};

export type CartResponse = {
  cart: CartProduct[];
  total: number;
};

export type Receipt = {
  message: string;
  total: number;
  timestamp: string;
  name?: string;
  email?: string;
};

