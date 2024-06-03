// Bring in express // 
import express from  "express";

  // Bring in path // 
import path from "path";

// Bring in colors // 
import colors from "colors";   

// Bring in cookie-parser / 
import cookieParser from "cookie-parser";

// Bring in productRoute // 
import productRoute from "./routes/productRoutes.js"; 

 // Bring in userRoute //
import userRoute from "./routes/userRoutes.js"; 

// Bring in orderRoute // 
import orderRoute from "./routes/orderRoutes.js";

// Bring in uploadRoutes // 
import uploadRoutes from "./routes/uploadRoutes.js";

// Bring in connectDB  // 
import connectDB from "./config/db.js"; 

// Bring in errorMiddleware (Custom Error Handler) //  
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

// Bring in dotenv // 
import dotenv from "dotenv"

// use dotenv file // 
dotenv.config(); 



  // Initialize express app //
const app = express(); 

// Form Body Parser Middleware //
app.use(express.json());  // send raw json 
app.use(express.urlencoded({ extended:true }));  // URL encoded // 

// use cookie parser middleware //
app.use(cookieParser());

// Connect to database //
connectDB();

 
   // Home Route //  
   app.get("/", (req, res) => {
    res.send("API is running...");
 })  

   // Products Api EndPoint // 
app.use("/api/products", productRoute);  

   // Users Api EndPoint // 
app.use("/api/users", userRoute); 

   // orders Api Endpoint // 
app.use("/api/orders", orderRoute);  

  // File Upload Api Endpoint // 
app.use("/api/upload", uploadRoutes);

  // Paypal Api Route //  
  app.get("/api/config/paypal", (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID})); 

         /* Make uploads folder static */
             /* Set __dirname to current directory */  
     const __dirname = path.resolve(); 
     app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// use errorHandler middleware //  
app.use(notFound);
app.use(errorHandler);
 
  
// Set port // 
const PORT = process.env.PORT || 5500;

// Start server // 
app.listen(PORT, () => {
    console.log(`Server Started on  port ${PORT}`.green.underline);
  }); 