import express from 'express';
import {
    placeOrderCOD,
    placeOrderStripe,
    verifyPayment,
    getUserOrders,
    getAllOrders
} from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/verify-payment', authUser, verifyPayment);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

// Export both named and default to avoid ESM import issues
export { orderRouter };
export default orderRouter;
