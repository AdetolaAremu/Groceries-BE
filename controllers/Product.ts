import db from "../db/index"
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

interface IProduct {
  brand: string;
  productName: string;
  barCode?: string;
  quantity?: number,
  
}

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { brand, productName, quantity, barCode } = req.body as IProduct;

  try {
    const query = `
      INSERT INTO
          todos (brand, product_name, quantity, barcode)
      VALUES
          ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [brand, productName, quantity, barCode]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const findOne = async (id: string) => {
    const query = `
        SELECT * FROM
            todos
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [+id]);

    return result.rows[0];
}

const findAll = async () => {
    const query = `
        SELECT * FROM
            todos
    ;`;

    const result = await db.query(query);

    return result.rows;
}

const updateOne = async (id: string, { brand, productName }: IProduct) => {
    const query = `
        UPDATE
            todos
        SET
            brand = $2,
            productName = $3
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id, brand, productName]);

    return result.rows[0];
}

const deleteOne = async (id: string) => {
    const query = `
        DELETE FROM
            todos
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id]);

    return result.rows[0];
}

export default {
  createProduct,
    findOne,
    findAll,
    updateOne,
    deleteOne,
}
