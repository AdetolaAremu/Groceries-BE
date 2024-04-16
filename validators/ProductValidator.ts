import { body } from 'express-validator';

export const createProductValidator = [
  body('brand').notEmpty().withMessage('Brand is required'),
  body('productName').notEmpty().withMessage('Product name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('barCode').isLength({ min: 12, max: 12 }).withMessage('Barcode must be 12 characters long'),
];