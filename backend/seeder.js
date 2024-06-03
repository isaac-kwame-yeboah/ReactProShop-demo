// Bring in mongoose //  
import mongoose from "mongoose";

// Bring in dotenv //
import dotenv from "dotenv";

// use dotenv file //
dotenv.config();  

// Bring in colors // 
import colors from "colors";

// Bring in users data // 
import users from "./data/users.js";

// Bring in products data // 
import products from "./data/products.js";

// Bring in User model // 
import User from "./models/userModel.js";

// Bring in Product model // 
import Product from "./models/productModel.js";

// Bring in Order Model // 
import Order from "./models/orderModel.js"; 

// Bring in connectDB //  
import connectDB from "./config/db.js"; 

// connect to database //
connectDB();


// Import Data // 
const importData = async () => {
    try {
           // Before we import data we delete everything //  
          await Order.deleteMany();
          await Product.deleteMany();
          await User.deleteMany();

        const createdUsers = await User.insertMany(users); 
        
          // Get AdminUser // 
        const adminUser = createdUsers[0]._id;

          // Insert Products // 
        const sampleProducts = products.map((product) => {
            return {...product, user:adminUser};
        })

       
         // Insert Data Into Database // 
        await Product.insertMany(sampleProducts);
        

        console.log("Data Imported!".green.inverse);

        process.exit();
         
    } catch (error) {
        console.log(`${error}`.red.inverse) 
        process.exit(1);
    }
} 


     
         // Destroy Data // 
    const destroyData = async () => {
       try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany(); 

        console.log("Data Destroyed!".red.inverse);
         process.exit(); 

       } catch (error) {
          console.log(`${error}`.red.inverse);
          process.exit(1);
       }
    };   


        // Run Import Data && Destroy Data Methods // 
        if(process.argv[2] === "-d"){
            destroyData();
        } else if (process.argv[2] === "-i") {
           importData();
        }
 
     
      
         /*
            node backend/seeder -i      ---  (importData)
            node backend/seeder -d      ---  (destroyData)  
         */