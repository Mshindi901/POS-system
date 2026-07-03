import express from 'express';
import {addProduct, getProductByName, getProductById, getALlProducts, getAllUnits, updateProduct, updateUnit, deleteProduct, deletedUnit, newUnit, filterByUnitName} from './controller.js'

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/add-unit', newUnit);

router.get('/product', getProductByName);
router.get('/product/:id', getProductById);
router.get('/products', getALlProducts);
router.get('/units', getAllUnits);
//For search purposes
router.get('/unit/product', filterByUnitName);

router.put('/product', updateProduct);
router.put('/unit', updateUnit);

router.delete('/product', deleteProduct);
router.delete('/unit', deletedUnit);

export default router;