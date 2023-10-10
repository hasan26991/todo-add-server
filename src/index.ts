import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to mongo db");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
};

start();
