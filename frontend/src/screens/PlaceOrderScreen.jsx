                      // PLACE-ORDER SCREEN   //
 
import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { toast } from "react-toastify"; 
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";




const PlaceOrderScreen = () => {  
                // Initialize useNavigate && useDispatch // 
             const navigate = useNavigate(); 
             const dispatch = useDispatch();
            

                      // Get Cart State //   
              const cart = useSelector((state) => state.cart); 
              console.log(cart);
 
                    // Using Redux Toolkit //  
                const [createOrder, {isLoading, error}] = useCreateOrderMutation();


                  // useEffect for Cart State //  
                 useEffect(() => {
                  if(!cart.shippingAddress.address) {
                     navigate("/shipping");
                  } else if (!cart.paymentMethod ){
                     navigate("/payment");
                  }
                 }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);


                  // placeOrderHandler Function //
              const placeOrderHandler = async () => {
               try {
               const res = await createOrder({
                  orderItems: cart.cartItems,
                  shippingAddress: cart.shippingAddress,
                  paymentMethod: cart.paymentMethod, 
                  itemsPrice: cart.itemsPrice,
                  shippingPrice: cart.shippingPrice,
                  taxPrice: cart.taxPrice,
                  totalPrice: cart.totalPrice,
               }).unwrap(); 
                 dispatch(clearCartItems()); 
                 navigate(`/order/${res._id}`); 
               } catch (error) {
                  toast.error(error)
               }
              } 




  return (
      <> 
        <CheckoutSteps step1 step2 step3 step4/>
        
            <Row>
                <Col md-={8}>  {/* Column 1 Start  */}
                  <ListGroup variant="flush"> 
                    <ListGroup.Item>
                      <h2> Shipping </h2> 
                     <p> 
                         <strong> Address: </strong> 
 {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                     </p>
                    </ListGroup.Item>  

                    <ListGroup.Item>
                      <h2> Payment Method</h2>  
                     <strong> Method:  </strong> 
                     {cart.paymentMethod}
                    </ListGroup.Item>  

                    <ListGroup.Item> 
                      <h2> Order Items </h2> 
                  {cart.cartItems.length === 0 ? (
                  <Message> Your cart is empty </Message>
                  ) : (
                    <ListGroup variant="flush"> 
                     {cart.cartItems.map((item, index) => ( 
                        <ListGroup.Item key={index}>  
                          <Row> 
                           <Col md={2}> 
                           <Image src={item.image} alt={item.name} fluid rounded />
                           </Col> 

                           <Col> 
                           <Link to={`/product/${item._id}`}>  
                               {item.name}
                           </Link>
                           </Col>    

                           <Col md={4}> 
                           {item.qty} x {item.price} = ${item.qty * item.price}
                           </Col>
                          </Row>
                        </ListGroup.Item>
                     ))}

                    </ListGroup>
                  )} 

                    </ListGroup.Item>
                  </ListGroup> 
                </Col>   {/* Column 1 End  */}



                <Col md={4}>  {/* Column 2 Start  */}
                  <Card> 
               <ListGroup variant="flush"> 
                 <ListGroup.Item> 
                    <h2>  Order Summary </h2> 
                 </ListGroup.Item>  

                   <ListGroup.Item>  
                    <Row> 
                      <Col> Items:  </Col> 
                      <Col> ${cart.itemsPrice} </Col>
                    </Row>
                   </ListGroup.Item>   

                   <ListGroup.Item>  
                    <Row> 
                      <Col> Shipping:  </Col> 
                      <Col> ${cart.shippingPrice} </Col>
                    </Row>
                   </ListGroup.Item>   

                   <ListGroup.Item>  
                    <Row> 
                      <Col> Tax:  </Col> 
                      <Col> ${cart.taxPrice} </Col>
                    </Row>
                   </ListGroup.Item> 

                   <ListGroup.Item>  
                    <Row> 
                      <Col> Total:  </Col> 
                      <Col> ${cart.totalPrice} </Col>
                    </Row>
                   </ListGroup.Item>   

                     {/* if error then show Message Component  */}  
                     <ListGroup.Item> 
                        {error && <Message variant="danger"> {error} </Message>}
                     </ListGroup.Item>

                    <ListGroup.Item> 
 <Button type="button" className="btn-block" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} >  
                       Place Order
                      </Button> 

                        {/* If is loading && show Loader */}
                            { isLoading && <Loader />}
                    </ListGroup.Item>

               </ListGroup>   

               
 
            
                  </Card>
                </Col>   {/* Column 2 End  */}
            </Row>
        
      
      </>
  )
}

export default PlaceOrderScreen