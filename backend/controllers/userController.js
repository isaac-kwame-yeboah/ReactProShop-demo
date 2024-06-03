// Bring in asyncHandler //  
import asyncHandler from "../middleware/asyncHandler.js";

// Bring in User Model //  
import User from "../models/userModel.js"; 

// Bring in generateToken // 
import generateToken from "../utils/generateToken.js";



           // @desc     Auth or Login user && get token // 
           // @route    POST  /api/users/login
           // @access   Public
           const authUser = asyncHandler (async (req, res) => {
              // deconstruct from req.body // 
                const {email, password} = req.body;
            
                 // check for user //   
            const user = await User.findOne({email});

             // check if user exist && match password // 
               if (user && (await user.matchPassword(password))) { 
                generateToken(res, user._id);

                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                })

               } else {
                    // if user does not exist //    
                  res.status(401);
                  throw new Error("Invalid email or password");
               }
             
        });    



           // @desc     Register user // 
           // @route    POST  /api/users
           // @access   Public
           const registerUser = asyncHandler (async (req, res) => {
              // destructure from req.body //   
              const {name, email, password } = req.body;

                      // check if user exits //  
            const userExist = await User.findOne({email});
             
                 if (userExist) {
                  res.status(400);
                  throw new Error("User already exist");
                 } 
 
               // if user does not exit then create user //  
            const user = await User.create({
                name,
                email,
                password 
            });

             // check if user is created //
              if (user) {
                generateToken(res, user._id); 

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    password: user.password,
                    isAdmin: user.isAdmin,
                })
              } else {
                res.status(400);
                throw new Error("Invalid user data");
              }

      });  



           // @desc     Logout user && clear cookie // 
           // @route    POST  /api/users/logout
           // @access   Private
           const logoutUser = asyncHandler (async (req, res) => {
              res.cookie("jwt", "", {
                  httpOnly: true,
                  expires: new Date(0)
              });  

              res.status(200).json({message: "Logout Successfully"});
           
      });  



           // @desc     Get user profile || Currently Logged In User // 
           // @route    GET  /api/users/profile
           // @access   Private
           const getUserProfile = asyncHandler (async (req, res) => {
                     // Get user from User Model // 
              const user = await User.findById(req.user._id); 

                 // check for user // 
                 if (user) {
                 res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                 }) 

                 } else { 
                    res.status(404);
                    throw new Error ("User mot found");
                 }

      });  

        

          // @desc      Update user profile || Update Currently Logged In User // 
           // @route    PUT  /api/users/profile
           // @access   Private
           const updateUserProfile = asyncHandler( async (req, res) => {
                     // Get user from User Model // 
            const user = await User.findById(req.user._id)

                 // check for user //
            if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
                 
             // check for password //
             if (req.body.password) {
                 // set user to req.body.password //
               user.password = req.body.password;
             }

                  // save User data // 
           const updatedUser = await user.save();

             res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
             });

            } else {
               res.status(404)
               throw new Error("User not found");
            }  
 });   

          

       
                 /* ADMIN CONTROLLER FUNCTIONS */

             // @desc    Get All Users // 
             // @route   Get  /api/users
             // @access  Private/ Admin 
            const getUsers = asyncHandler( async (req, res) => { 
                   // Get user from User Model // 
                 const users = await User.find({});  

                  res.status(200).json(users);
        });  


         
             // @desc    Get User by id   // 
             // @route   Get  /api/users/:id
             // @access  Private/ Admin 
             const getUserById = asyncHandler( async (req, res) => {
                        // Get user from User Model // 
            const user = await User.findById(req.params.id).select("-password");
                  // Check if user exist //  
                if (user) {
                res.status(200).json(user);
                } else {
                  res.status(404);
                  throw new Error("User not found");
                }
        });  


             // @desc    Delete User   // 
             // @route   Get  /api/users/:id
             // @access  Private/ Admin 
             const deleteUser = asyncHandler( async (req, res) => {
                         // Get user from User Model // 
            const user = await User.findById(req.params.id);
                      // Check if user exist // 
                      if (user) { 
                     // Cannot delete admin user //
                        if (user.isAdmin) {
                       res.status(400);
                   throw new Error("Cannot delete admin user")
                        } 
                  await User.deleteOne({_id: user._id})
                  res.status(201).json({message:"User deleted"})
                      } else {
                        res.status(404);
                        throw new Error("User not found");
                      }
        });  



             // @desc    Update User  // 
             // @route   Get  /api/users/:id
             // @access  Private/ Admin 
             const updateUser = asyncHandler( async (req, res) => { 
                      // Get user from User Model // 
               const user = await User.findById(req.params.id); 
                     // Check if user exist // 
                  if (user) {
                    user.name = req.body.name || user.name;
                    user.email = req.body.email || user.email;
                    user.isAdmin = Boolean(req.body.isAdmin); 
                          // save user // 
                  const updatedUser = await user.save(); 
                   
                     res.status(200).json({
                          _id: updatedUser._id,
                          name: updatedUser.name,
                          email: updatedUser.email,
                          isAdmin: updatedUser.isAdmin,
                       }) 
                  } else {
                     res.status(404);
                     throw new Error("User not found");
                  }
        });  


        export {
            authUser, 
            registerUser,
            logoutUser,
            getUserProfile,
            updateUserProfile,
            getUsers, 
            getUserById,
            deleteUser,
            updateUser
        }