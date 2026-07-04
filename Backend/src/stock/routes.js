import express from 'express';
import {addRecord, getUserRecords, getRecordById, getAllRecords, updateRecord, deleteRecord} from './controller.js';

const router = express.Router();

router.post('/stock', addRecord);

router.get('/stock/user', getUserRecords);
router.get('/stock/:id',getRecordById);
router.get('/stock', getAllRecords);

router.put('/stock/:id',updateRecord);

router.delete('/stock/:id', deleteRecord);

export default router;