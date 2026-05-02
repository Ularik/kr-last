import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cafeRouter from "./routes/cafes";
import cafeRatingRouter from "./routes/cafeRating";
import config from "./config";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(config.publicPath));
const port = 8001;

app.use("/users", usersRouter);
app.use("/cafes", cafeRouter);
app.use("/ratings", cafeRatingRouter);

const run = async () => {
  await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((err) => console.error(err));
