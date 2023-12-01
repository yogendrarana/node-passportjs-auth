import express from 'express'
import * as adminControllers from '../controllers/adminControllers.js'

const router = express.Router()

router.get('/dashboard', adminControllers.getDashboardData);

export default router;
