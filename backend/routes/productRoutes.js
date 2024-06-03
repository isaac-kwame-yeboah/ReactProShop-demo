// Bring in express // 
import express from "express";

// Bring in express router // 
const router = express.Router();

// Bring in product controller functions // 
import { getProducts, getProductById, addProduct, productUpdates, deleteProduct, createProductReview } from "../controllers/productController.js"
    
   // Bring in protect && admin middleware //
import { protect, admin } from "../middleware/authMiddleware.js";
 

  // Get All Product  // 
  router.get("/", getProducts); 

    // Get Top Products //


  // Create Product //
  router.post("/", protect, admin, addProduct);

     // Get Single Product // 
  router.get("/:id", getProductById);  

        // Update Product //
   router.put("/:id" , protect, admin, productUpdates);

          // Delete Product //
   router.delete("/:id", protect, admin, deleteProduct);  

          // Create New Review //
   router.post("/:id/reviews", protect, createProductReview)




export default router;
