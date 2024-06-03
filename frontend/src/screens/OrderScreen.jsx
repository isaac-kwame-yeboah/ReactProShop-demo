                // ORDER SCREEN : Shows The Order Made By A Customer //

import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card} from "react-bootstrap";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import {useOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation} from "../slices/ordersApiSlice.js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"; 
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

 

const OrderScreen = () => {   
                        // Get Id From URL // 
                const {id:orderId } = useParams();

                  // Using Redux ToolKit // 
        const {data:order, refetch, isLoading, error } = useOrderDetailsQuery(orderId);
        console.log(order);

                // Using Redux ToolKit // 
          const [payOrder, { isLoading:loadingPay}] = usePayOrderMutation();  
           console.log(payOrder);   

                  // Using Redux ToolKit // 
          const [ deliverOrder, {loading:loadingDeliver}] = useDeliverOrderMutation();
           

                    // UsePayPalScript Reducer // 
          const [{isPending}, paypalDispatch] = usePayPalScriptReducer();  

                      // Using Redux ToolKit // 
         const {data:paypal, isLoading:loadingPayPal, error:errorPayPal,} = useGetPayPalClientIdQuery();
       console.log(paypal);

                     // Get User Data //
          const { userInfo } = useSelector((state) => state.auth);
            console.log(userInfo);


                    // useEffect for Paypal Client Id Query // 
                   useEffect(( ) => { 
                          // check for error //  
                      if (!errorPayPal && !loadingPayPal && paypal.clientId){
                     const loadPayPalScript = async () => {
                          paypalDispatch({
                               type: "resetOptions",
                               value:{
                                 "client-id": paypal.clientId,
                                 currency: "USD",
                               }
                          }); 
                          paypalDispatch({type:"setLoadingStatus", value:"pending"});
                     }    
                           if (order && !order.isPaid) {
                              if(!window.paypal){
                               loadPayPalScript();
                              }
                           }
                      }
                   },[order, paypal, errorPayPal, loadingPayPal, paypalDispatch]);



                // onApprove Function (Triggers Paypal)  //  
                function onApprove(data, actions){ 
                  return actions.order.capture().then(async function (details) {
                    try {
                      await payOrder({orderId, details}); 
                        refetch(); 
                        toast.success("Payment successful");
                    } catch (error) {
                       toast.error(error?.data?.message || error.message)
                    }
                  });
                }


              // onApproveTest Function //  
                async function onApproveTest(){
                  await payOrder({ orderId, details:{payer:{} }});
                  refetch();
                toast.success("Payment Successful");
                }


                 // onError Function //
                function onError(err){ 
                  toast.error(err.message);
                }
  

                  // createOrder Function //
                function createOrder(data, actions){
                  return actions.order.create({
                     purchase_units: [
                      {
                        amount: {
                          value: order.totalPrice,
                        },
                      }
                     ]
                  }).then((orderId) => {
                     return orderId;
                  });
                }

   
                 // deliverOrderHandler Function //
                 const deliverOrderHandler = async () => {
                    try {
                          await deliverOrder(orderId);
                          refetch(); /* Prevent Reloading the page to display the Data*/
                          toast.success("Order Delivered")
                    } catch (error) {
                      toast.error(error?.data?.message || error.message)
                    }
                 }



  return ( isLoading ? <Loader /> : error ? <Message variant="danger">  </Message> : ( 
      <> 
       
          <h1>  Order Id: {order._id} </h1>
       
            <Row> 
                <Col md={8}>   {/* Column 1 Start */}
                <ListGroup variant="flush"> 
                 <ListGroup.Item> 
                     <h2> Shipping </h2>  

                     <p> <strong> Name: </strong> {order.user.name} </p>  

                     <p> <strong> Email: </strong>  {order.user.email} </p>  

                     <p> 
                    <strong> Address: </strong>  
    {order.shippingAddress.address},  {order.shippingAddress.city},  {order.shippingAddress.postalCode},  {order.shippingAddress.country}
                    </p>  

                     {/* Check if order is delivered */} 
                    {order.isDelivered ? (
                    <Message variant="success"> {order.deliveredAt} </Message>
                    ) : ( 
                    <Message variant="danger"> Not Delivered </Message> 
                    )}
           
                 </ListGroup.Item>   

                 <ListGroup.Item>  
                     <h2> Payment Method </h2>  
                     <p>  
                        <strong> {order.paymentMethod} </strong>
                     </p>  

                              {/* Check if order is paid */}  
                              {order.isPaid ? (
                    <Message variant="success"> Paid on {order.paidAt} </Message>
                    ) : ( 
                    <Message variant="danger"> Not Paid </Message> 
                    )}

                 </ListGroup.Item>  
                      <h2> Order Items </h2>   

                        {/* Map through orderItems Array */}  
                   {order.orderItems.map((item, index) => ( 
                      <ListGroup.Item key={index}>  
                        <Row> 
                           <Col md={2}> 
                  <Image src={item.image} alt={item.name} fluid rounded/>
                           </Col>  

                           <Col> 
                           <Link to={`/product/${item.product}`}> 
                             {item.name}
                           </Link>
                           </Col>  

                           <Col md={4}> 
                              {item.qty} x {item.price}
                           </Col>
                        </Row>
                      </ListGroup.Item>
                   ))}
                     
                 <ListGroup.Item> 

                 </ListGroup.Item>
                </ListGroup>



                </Col>   {/* Column 1 End */} 
 




                <Col col={4}>  {/* Column 2 Start */}
                  <Card> 
                     <ListGroup variant="flush"> 
                        <ListGroup.Item> 
                        <h2> Order Summary </h2>
                        </ListGroup.Item>  
                      
                      <ListGroup.Item> 
                        <Row>
                        <Col> Item </Col> 
                        <Col> ${order.itemsPrice} </Col>
                        </Row>  

                        <Row>
                        <Col> Shipping </Col> 
                        <Col> ${order.shippingPrice} </Col>
                        </Row>  

                        <Row>
                        <Col> Tax </Col> 
                        <Col> ${order.taxPrice} </Col>
                        </Row>   

                        <Row>
                        <Col> Total </Col> 
                        <Col> ${order.totalPrice} </Col>
                        </Row>
                      </ListGroup.Item> 

                         {/* if order is not paid show Pay Button || PAY ORDER PLACEHOLDER */}
                         {!order.isPaid && (
                           <ListGroup.Item>
                            {loadingPay && <Loader />}   

                            {isPending ? <Loader /> : (
                               <div> 
                 {/* <Button onClick={onApproveTest} style={{marginBottom:"10px"}}> Test Pay Order </Button> */}  
                                        
               <div> 
   <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}>  </PayPalButtons>            
              </div>   
                                      
                       </div>
                            )

                           }
                           </ListGroup.Item>
                         )}


                                  {/* MARK AS DELIVERED  */} 
                        {loadingDeliver && <Loader />}  

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                   <ListGroup.Item>
                   <Button type="button" className="btn btn-block" onClick={deliverOrderHandler} >
                     Mark As Delivered
                   </Button>
                 </ListGroup.Item>
            )  }

                     </ListGroup>
                  </Card>   
              
                 </Col>  {/* Column 2 End */}
                
                
           </Row>      
      
      </>
  )
       
  )
}

export default OrderScreen