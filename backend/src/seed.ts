import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 19,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655896/headphone_hlzg24.jpg",
  },
  {
    name: "Smartwatch",
    price: 29,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655883/smartwatch_m9jvua.jpg",
  },
  {
    name: "Bluetooth Speaker",
    price: 49,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655878/blutooth_zdfmuk.jpg",
  },
  {
    name: "Gaming Mouse",
    price: 15,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655865/mouse_s4gvnu.jpg",
  },
  {
    name: "Mechanical Keyboard",
    price: 19,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655860/keyboard_h7shu6.jpg",
  },
  {
    name: "USB-C Cable",
    price: 9,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655848/cable_fsnum6.jpg",
  },
  {
    name: "External SSD",
    price: 59,
    image: "https://res.cloudinary.com/dldh2qkqy/image/upload/v1761655842/ssd_p1malq.jpg",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});

    await Product.insertMany(products);
    console.log("🌱 Seeded product data successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
