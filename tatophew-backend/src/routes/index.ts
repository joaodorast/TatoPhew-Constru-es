import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { ProductController } from '../controllers/productController';
import { CartController } from '../controllers/cartController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();


router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);

router.use('/cart', authMiddleware);
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);

export default router;