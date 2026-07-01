import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/database/db-conn ect.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});