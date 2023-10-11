import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import { userRouter } from "./routes/user.route";
import { todoRouter } from "./routes/todo.route";
import { NotFoundError } from "./errors";
import { errorHandler, requireAuth } from "./middlewares";

const app = express();
app.set("trust proxy", true);

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    signed: false,
    // secure: false,
    // secure: true,
    httpOnly: false,
    sameSite: "none",
  })
);

app.use("/user", userRouter);
app.use(requireAuth);
app.use("/todo", todoRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
