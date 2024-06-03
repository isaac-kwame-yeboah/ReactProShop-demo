// Bring in asyncHandler //  
import asyncHandler from "../middleware/asyncHandler.js";

// Bring in Product Model //  
import Order from "../models/orderModel.js";



           // @desc     Create New Order // 
           // @route    POST  /api/orders
           // @access   Public
  const addOrderItems = asyncHandler (async (req, res) => {
       
    const { 
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
          } = req.body;   


           // check if orderItems(CART) is empty //
           if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No Order items");
           } else {  
                 // if orderItems is not empty then Create New Order // 
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x._id,
                    _id: undefined,
                })),
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            });  
             
                     // save to database //  
        const createdOrder = await order.save();  
           
            res.status(201).json(createdOrder);
           } 

  });  




           // @desc     Get Logged In Users Orders // 
           // @route    GET  /api/orders/mine
           // @access   Public
  const getMyOrders = asyncHandler (async (req, res) => { 
        const orders = await Order.find({user: req.user._id});
       
          res.status(200).json(orders);
         
});   



              // @desc     Get order by ID //
              // @route    GET  /api/orders/:id
              // @access   Private
     const getOrderById = asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate("user", "name email");

                    // check for order //
                    if (order) {
                    res.status(200).json(order);
                       } else {
                    res.status(404);
                    throw new Error("Order not found");
                   }
});
            



                // @desc     Update Order To Paid // 
                // @route    PUT  /api/orders/:id/pay
                // @access   Public
  const updateOrderToPaid = asyncHandler (async (req, res) => {
         const order = await Order.findById(req.params.id);

                // check for order //
               if (order) {
                 order.isPaid = true 
                 order.paidAt = Date.now();
                 order.paymentResult = {
                  id: req.body.id,
                  status: req.body.status,
                  update_time: req.body_time,
                  email_address: req.body.payer.email_address,
                 };  
                       // save to database // 
                const updatedOrder = await order.save(); 

                res.status(200).json(updatedOrder);
               } else { 
                 res.status(404);
                 throw new Error("Order not found");
               }
});   




                 // @desc     Update Order To Delivered // 
                 // @route    PUT  /api/orders/:id/deliver
                 // @access   Public
  const updateOrderToDelivered = asyncHandler (async (req, res) => {
       const order = await Order.findById(req.params.id);

                         // check for order //  
                    if (order) {
                      order.isDelivered = true; 
                      order.deliveredAt = Date.now();   

                      const updatedOrder = await order.save()  
                             // save order //
                      res.status(200).json(updatedOrder);  
                    } else {
                      res.status(404);
                      throw new Error("Order not found");
                    }

}); 
                    



                  // @desc     Get All Orders // 
                  // @route    GET  /api/orders
                  // @access   Public
  const getAllOrders = asyncHandler (async (req, res) => {
      const orders = await Order.find({}).populate("user", "id name");
         res.status(200).json(orders);
}); 
                  


export {  addOrderItems, 
          getMyOrders,
          getOrderById,
          updateOrderToPaid,
          updateOrderToDelivered,
          getAllOrders,
};