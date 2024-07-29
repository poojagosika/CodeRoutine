import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./Config/DB.js";
import userRouter from "./Routes/userRoutes.js";
import problemRouter from "./Routes/problemRouter.js";
import discussRouter from "./Routes/discussRoutes.js";
import JobRouter from "./Routes/JobRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json("Hi this is CodeRoutine Pojects");
});

app.use("/api/users", userRouter);
app.use("/api/problem", problemRouter);
app.use("/api/discuss", discussRouter);
app.use("/api/job", JobRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
