import express from 'express';
import {createInventory, getInventoryById, getInventoryByProduct, getAllInventory, getMinimumStockInventory, updateInventory, deleteInventory} from './controller.js';

const router = express.Router();

router.post('/inventory', createInventory);

router.get('/inventory/:id', getInventoryById);

router.get('/inventory/product', getInventoryByProduct);

router.get('/stock/inventory', getMinimumStockInventory);

router.put('/inventory/:id', updateInventory);

router.delete('/inventory/:id', deleteInventory);

export default router;