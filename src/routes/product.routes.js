import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import {getProducts,registerProduct} from "../controllers/product.controller.js"
import { validateProductRegistration } from '../validators/product.validator.js'

const router = express.Router()

router.get("/", authenticate, getProducts)

router.post("/register",authenticate,validateProductRegistration, registerProduct)

export default router;