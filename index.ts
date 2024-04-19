import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ProductRouter from "./routes/productroutes";
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/GlobalErrorHandler");

const app = express();
app.use(cors({ credentials: true, origin: true }));
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 3000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limit);
app.use(express.json({ limit: "10kb" }));

app.get("/", (request: Request, response: Response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/api/products", ProductRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

export default app;
