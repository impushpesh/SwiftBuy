import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/connection.js";

// Auth routes
import authRoutes from "./routes/auth/auth.routes.js";

// Admin routes
import adminProductRoutes from "./routes/admin/product.routes.js";
import adminOrderRouter from "./routes/admin/order.routes.js";

//Shop routes
import shopProductRoutes from "./routes/shop/product.routes.js";
import shopCartRoutes from "./routes/shop/cart.routes.js";
import shopAddressRoutes from "./routes/shop/address.routes.js";
import shopSearchRoutes from "./routes/shop/search.routes.js";
import shopReviewRouter from "./routes/shop/review.routes.js";
import shopFeaturedRouter from "./routes/shop/featured.routes.js";
import shopOrderRouter from "./routes/shop/shopOrder.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Expires",
      "Pragma",
      "Cache-Control",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Admin routes
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/admin/order", adminOrderRouter);

// Shop routes
app.use("/api/shop/product", shopProductRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/order", shopOrderRouter);

app.use("/api/common/feature", shopFeaturedRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
