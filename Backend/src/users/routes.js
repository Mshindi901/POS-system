import express from 'express';
import {getAll, getByEmail, getById, getByPhone, update, deleteUser} from './controller.js';

const router = express.Router();

router.get('/users', getAll);

router.get('/user/:email', getByEmail);

router.get('/user', getByPhone);

router.get('/user', getById);

router.put('/user', update);

router.delete('/user/:id', deleteUser);

export default router;