import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";  
import Message from "../components/Message.jsx";
import { addToCart, removeFromCart } from "../slices/cartSlice.js";


const CartScreen = () => { 
              // Initialize useNavigate // 
              const navigate = useNavigate();
              const dispatch = useDispatch(); 

                // Get CartItems from CartReducer State // 
            const { cartItems } = useSelector((state) => state.cart); 
         console.log(cartItems);

          // addToCartHandler(qty of items in the cart) Function // 
          const addToCartHandler = async (product, qty) => {
              dispatch(addToCart({...product, qty}));
          }
 

            // removeFromCartHandler function //
       const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
   }


          // checkoutHandler Function // 
       const checkoutHandler = () => {
            navigate("/login?redirect=/shipping");
       }

 

  return (
    <>
      <Row> 
      <Col md={8}>   {/* Parent 1 Column Start */} 
        <h1 style={{marginBottom:"20px"}}> Shopping Cart </h1> 
        {cartItems.length === 0 ? (
           <Message> 
            Your cart is empty <Link to="/"> Go Back </Link>
           </Message>
        ) : ( 
          <ListGroup variant="flush"> 
              {cartItems.map((item) => (
            <ListGroup.Item key={item._id}> 
              <Row> 
                <Col md={2}>     {/* Column 1 */}  
                <Image src={item.image} alt={item.name} fluid rounded />
                </Col>  

                <Col md={3}>  {/* Column 2 */}
                <Link to={`/product/${item._id}`}>  
                   {item.name}
                </Link>
               </Col>  

               <Col md={2}>  {/* Column 3 */}
                   {item.price}
               </Col> 

               <Col md={2}> {/* Column 4 */}
               <Form.Control as="select" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                           {/* Get the actual item number in stock (CountInStock) */} 
                        {[...Array(item.countInStock).keys()].map((x) => (
                           <option key={x + 1} value={x + 1}> 
                             {x + 1}
                           </option>
                        ))}
                            </Form.Control>
               </Col>  

               <Col md={2}> {/* Column 5 */}
                 <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}> 
                  <FaTrash />
                 </Button>
               </Col>
              </Row>   
            </ListGroup.Item> 
              ))}
          </ListGroup> 
        )}
      
      </Col>   {/* Parent 1 Column End */}  


      <Col md={4}>   {/* Parent 2 Column Start*/}
        <Card> 
          <ListGroup variant="flush">
            <ListGroup.Item> 
               <h2> 
               Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
               </h2>  

                   {/* Total Prices Of Items In The Cart */}
               ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup> 

     <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}> 
                  Proceed To Checkout
       </Button>
        </Card>
      
      </Col>



      </Row>
    
    
    
    
    
    
    </>
  )
}

export default CartScreen