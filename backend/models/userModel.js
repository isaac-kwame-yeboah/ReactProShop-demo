// Bring in mongoose //
import mongoose from "mongoose";  

 // Bring in bcrypt // 
 import bcrypt from "bcryptjs";



 

       // Create User Schema //  
       const userSchema = new mongoose.Schema({
             // Form Fields For User Model //  

         name: {
            type: String, 
            required: true,
         },

         email: {
            type: String,
            required: true,
            unique: true,
              match: [
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  'Please add a valid email'
                ] // regular expression // 
         },

         password: {
            type: String,
            required: true,
         }, 

         isAdmin: {
            type: Boolean,
            required: true,
            default: false,
         },

        
       }, {
        timestamps: true,
       });

          
             // Encrypt password using bcrypt //
             userSchema.pre("save", async function (next){
               if(!this.isModified("password")) {
                   next();
               }
   
               
               // generate salt to hashed password using genSalt method //
           const salt = await bcrypt.genSalt(10);
   
                   // hash password with salt //
            this.password = await bcrypt.hash(this.password, salt)
         })

       
           // match user entered password to hashed password in database // 
        userSchema.methods.matchPassword = async function(enteredPassword){
         // compare plain text password to the hash password //  
     return await bcrypt.compare(enteredPassword, this.password)
   }
 

       const User = mongoose.model("User", userSchema);

       export default User;