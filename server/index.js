import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./Config/DB.js";
import userRouter from "./Routes/userRoutes.js";
dotenv.config();

const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
