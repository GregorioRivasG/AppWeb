import { Router } from "express";
import { 
    createOrder, 
    getOrderById, 
    getAllOrders, 
    updateOrderStatus, 
    cancelOrder 
} from "../controllers/order.controller";

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/cancel', cancelOrder);

export default router;