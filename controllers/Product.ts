import db from "../db/index"
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

interface IProduct {
  brand: string;
  productName: string;
  barCode?: string;
  quantity?: number,
}

interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string
  sortOrder?: 'ASC' | 'DESC';
}

const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { brand, productName, quantity, barCode } = req.body as IProduct;

  try {
    const query = `
      INSERT INTO
          products (brand, product_name, quantity, barcode)
      VALUES
          ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [brand, productName, quantity, barCode]);

    res.status(201).json({
      "status": "success",
      "message": "Product created successfully",
      "data": result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const findOne = async (req: Request, res: Response) => {
    const query = `
        SELECT * FROM
            products
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [req.params.id]);

    if (!result.rows) res.status(400).json({ 'status': 'fail', 'message': 'Product not found' }) 

    return res.status(200).json({
      "status": "success",
      "message": "Product retrieved successfully",
      "data": result.rows[0],
    });
}

const findAll = async (req:Request, res: Response) => {

  const { page = 1, limit = 20, sortBy = 'id', sortOrder = 'ASC', search = '' } = req.query as RequestQuery;
  const offset: number = (page - 1) * limit;

    const query = `
      SELECT * FROM products
      WHERE product_name ILIKE $1 OR brand ILIKE $1
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $2 OFFSET $3
    `;

    const params = [`%${search}%`, limit, offset];

    const result = await db.query(query, params);

    res.status(200).json({
      "status": "success",
      "message": "Products retrieved successfully",
      "data": result.rows,
    });
}

const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brand, productName, barCode, quantity } = req.body as IProduct;

  const checkQuery = `
    SELECT * FROM products WHERE id = $1
  `;

  const checkResult = await db.query(checkQuery, [id]);

  if (checkResult.rows.length === 0) return res.status(400).json({ 'status': 'fail', 'message': 'Product not found' });

  const updateQuery = `
    UPDATE products
    SET brand = $2, product_name = $3, barcode = $4, quantity = $5
    WHERE id = $1
    RETURNING *
  `;

  const updateResult = await db.query(updateQuery, [id, brand, productName, barCode, quantity]);

  res.status(200).json({
    "status": "success",
    "message": "Product updated successfully",
    "data": updateResult.rows[0]
  });
}

export default {
  createProduct,
    findOne,
    findAll,
    updateOne,
}
