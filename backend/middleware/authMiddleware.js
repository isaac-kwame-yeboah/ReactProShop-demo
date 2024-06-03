// Bring in JWT // 
import jwt from "jsonwebtoken";

// Bring in Custom asyncHandler Middleware // 
import asyncHandler from "./asyncHandler.js"; 

// Bring in User model // 
import User from "../models/userModel.js"; 


 // Protect Routes Function Middleware //  
     const protect = asyncHandler(async(req, res, next) => {
       // Initialized token // 
       let token;  

         // Read the jwt from the cookies || Set token //
         token = req.cookies.jwt;

            // verify token //  
            if (token) {
             try {
        // Decode token to get userId as payload || Extract payload(data) //  
           const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Set req.user to the User of the token //  
            req.user = await User.findById(decoded.userId).select("-password");
             next(); 

             } catch (error) { 
                console.log(error);
                res.status(401);
                throw new Error("Not Authorized, Token Failed");
             }
            } else {
               res.status(401);
               throw new Error("Not Authorized, No Token"); 
            }

 }); 

   
          // Admin Routes Function Middleware //   
        const admin = (req, res, next) => {
               // check if user is an Admin //  
              if (req.user && req.user.isAdmin) {
                next();
              } else {
                res.status(401);
               throw new Error("Not Authorized As Admin"); 
              }
        }

        
export { protect, admin};
