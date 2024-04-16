import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser'
import ProductRouter from './routes/productroutes';

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

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// export { pool };
export default app;