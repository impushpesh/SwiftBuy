import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import connectDB from './db/connection.js';

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
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running....');
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});