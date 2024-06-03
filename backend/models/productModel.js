// Bring in mongoose //
import mongoose from "mongoose";



          // Create Review Schema // 
          const reviewSchema = new mongoose.Schema({
              // Form Fields For Review Model //
       
          // User Relationship With Review Model //
     user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",   // User Model || User Collection // 
        
     },
         // name comes from the user who made the rating && commented on the product //
        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        }, 

        comment: {
            type: String,
            required: true
        },

          }, {
            timestamps: true,
          })




  // Create Product Schema //
      const productSchema = new mongoose.Schema({
           // Form Fields For Product Model // 

         // User Relationship With Product Model //
     user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",   // User Model || User Collection // 
        
     },

        name: {
            type: String,
             required: true,
        },

        image: {
            type: String,
            required: true,
        },

        brand: {
           type: String,
           required: true,
        },

        category: {
            type: String,
            required: true,
        },

        description: {
           type: String,
           required: true, 
        },

        reviews: [reviewSchema],

        rating: {
            type: Number,
            required: true,
            default: 0,
        },

         numReviews: {
            type: Number,
            required: true,
            default: 0,
         },

         price: {
            type: Number,
            required: true,
            default: 0,
         }, 

         countInStock: {
            type: Number,
            required: true,
            default: 0,
         },

        
      }, {    
           timestamps: true,
      }); 


      const Product = mongoose.model("Product", productSchema);

      export default Product;
