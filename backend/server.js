import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
