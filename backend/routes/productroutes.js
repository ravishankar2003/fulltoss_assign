import {verifyToken} from '../utils/jwt.js';
import {getProducts, addToCart, deletefromCart, getCart} from '../controllers/products.js';



import express from 'express';

const router = express.Router();


router.get('/getproducts', verifyToken, getProducts);
router.post('/addtocart', verifyToken, addToCart);
router.post('/deletefromcart', verifyToken, deletefromCart);
router.get('/getcart', verifyToken, getCart);

export default router;

