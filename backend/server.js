import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import connectDB from './db/connection.js';

// Auth routes
import authRoutes from './routes/auth/auth.routes.js';

// Admin routes
import adminProductRoutes from './routes/admin/product.routes.js';
import adminOrderRouter from './routes/admin/order.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Expires",
        "Pragma",
        "Cache-Control",

    ],
    credentials: true,
}))

// Routes
app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin/product', adminProductRoutes);
app.use('/api/admin/order', adminOrderRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});