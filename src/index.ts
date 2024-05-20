import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error";
import authRouter from "./routers/authRouter";
import sessionHandler from "./middlewares/session";
import savedDataRouter from "./routers/savedDataRouter";
import userRouter from "./routers/userRouter";
import sharedDataRouter from "./routers/sharedDataRouter";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

const morgan = require("morgan");
const app = express();
const port = 5500;

app.use(express.json());
app.use(cookieParser());
app.use(sessionHandler());
app.use(cors());
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  
app.use("/auth", authRouter);
app.use("/saveddata", savedDataRouter);
app.use("/user", userRouter);
app.use("/shareddata", sharedDataRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));

export default app;