import { Router } from "express";
import ProductController from "../controllers/Product";
import { createProductValidator } from "../validators/ProductValidator";

const router = Router();

router.post("/", createProductValidator, ProductController.createProduct);

export default router;