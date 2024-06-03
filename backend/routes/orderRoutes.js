// Bring in express // 
import express from "express";

// Bring in express router // 
const router = express.Router();

// Bring in order controller functions // 
import { addOrderItems, 
         getMyOrders,
        getOrderById,
        updateOrderToPaid,
        updateOrderToDelivered,
        getAllOrders,
} from "../controllers/orderController.js";  

    // Bring in protect && admin middleware // 
     import { protect, admin} from "../middleware/authMiddleware.js";
     
 
              // Get all orders  // 
          router.get("/", protect, admin, getAllOrders );

                // Create new order  // 
          router.post("/", protect, addOrderItems); 

                  // Get myOrders  // 
          router.get("/mine", protect, getMyOrders); 

                  // Get order by ID  // 
         router.get("/:id", protect, getOrderById);  

                  // Update order to paid //  
         router.put("/:id/pay", protect, updateOrderToPaid);  

             // Update order to delivered  // 
        router.put("/:id/deliver", protect, admin, updateOrderToDelivered);
           
         
export default router;
 