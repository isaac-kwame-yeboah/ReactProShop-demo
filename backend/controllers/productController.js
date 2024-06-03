// Bring in asyncHandler //  
import asyncHandler from "../middleware/asyncHandler.js";

// Bring in Product Model //  
import Product from "../models/productModel.js";


           // @desc     Get All Products // 
           // @route    GET  /api/products
           // @access   Public
  const getProducts = asyncHandler (async (req, res) => {
      const products = await Product.find({}); 
        
       res.send(products);
  }); 


           // @desc    Get Single Product // 
           // @route    GET  /api/products/:id
           // @access   Public
  const getProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id); 
    if (product) {
    return res.json(product);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
});  


               // @desc     Create A Products // 
              // @route    POST  /api/products
              // @access   Private/Admin
              const addProduct = asyncHandler(async (req, res) => {
                // create product (Generate Sample Product) // 
                    const product = new Product({ 
                      // Form Fields //
                     name: "Sample Name",
                     price: 0,
                     user: req.user._id,
                     image: "/images/sample.jpg",
                     brand: "Sample brand", 
                     category: "Sample category",
                     countInStock: 0,
                     numReviews: 0,
                     description:"Sample description",
                  })
                        // Save Product // 
                const createdProduct = await product.save();  
                     res.status(201).json(createdProduct);
            });

           
                   // @desc     Update A Product //
                   // @route    PUT  /api/products/:id
                   // @access   Private/Admin
           const productUpdates = asyncHandler (async (req, res) => {
                       // Get data from req.body //
         const {name, price, description, image, brand, category, countInStock } = req.body;
                  // Find Product // 
              const product = await Product.findById(req.params.id);
         
                    // Check if product exist // 
                    if (product) {
                       product.name = name;
                       product.price = price;
                       product.description = description;
                       product.image = image;
                       product.brand = brand;
                       product.category = category;
                       product.countInStock = countInStock;
                          // Save Product //
                   const updates = await product.save();
                       res.json(updates);
                    } else {
                      res.status(400);
                      throw new Error("Resource not found");
                    }
        });  
  
                    // @desc    Delete A Product //
                    // @route    DELETE /api/products/:id
                    // @access   Private/Admin
           const deleteProduct = asyncHandler (async (req, res) => {
                        // Find Product //
    const product = await Product.findById(req.params.id);
               // Check if product exist // 
               if (product) {
           await Product.deleteOne({_id: product._id});
               res.status(200).json({message: "Product deleted"});
               } else {
                res.status(404);
                throw new Error("Resource not found");
               }
             }); 


                   // @desc     Create A New Review  //
                   // @route    POST /api/products/:id/reviews
                   // @access   Private
          const createProductReview  = asyncHandler (async (req, res) => {
                       // Get Rating && Comment from req.body // 
                       const {rating, comment} = req.body;

                 const product = await Product.findById(req.params.id);
                       // Check if product is already reviewed // 
                     if (product) {
                  const alreadyReviewed = product.reviews.find( 
                    (review) => review.user.toString() === req.user._id.toString()
                  );  
                        if (alreadyReviewed){
                        res.status(400);
                        throw new Error("Product already reviewed");
                        } 

                     const review = {
                      name: req.user.name,
                      rating: Number(rating),
                      comment,
                      user: req.user._id,
                     }

                     // Add new review to product //
                     product.reviews.push(review);

                    // Set numReview to the length of reviews //
                   product.numReviews = product.reviews.length;

                      // Get product rating //
                 product.rating =
                 product.reviews.reduce((acc, review) => acc + review.rating, 0) /
                 product.reviews.length;

                         // Save product //
                    await product.save();
                    res.status(201).json({message: "Review added"});
                     } else {
                      res.status(404);
                      throw new Error("Resource not found");
                     }

               });  
 

 





  export {
          getProducts,
          getProductById,
          addProduct,
          productUpdates,
          deleteProduct,
          createProductReview
         }