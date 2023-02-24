import express from 'express';

import { getById, getProductIdsWithItem } from '../controllers/products/products';

export const productRouter = express.Router();

productRouter.route('/:id').get(getById);
productRouter.route('/withItem/:item').get(getProductIdsWithItem);
