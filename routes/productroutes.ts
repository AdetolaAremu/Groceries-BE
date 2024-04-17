import { Router } from "express";
import ProductController from "../controllers/Product";
import { createProductValidator } from "../validators/ProductValidator";

const router = Router();

router.route("/").post(createProductValidator, ProductController.createProduct).get(ProductController.findAll);
router.route("/:id").get(ProductController.findOne).patch(ProductController.updateOne);

export default router;