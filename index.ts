import express, { Request, Response } from "express";
import bodyParser from 'body-parser'
import ProductRouter from './routes/productroutes';
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/GlobalErrorHandler");

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request: Request, response: Response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/api/products', ProductRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// export { pool };
export default app;