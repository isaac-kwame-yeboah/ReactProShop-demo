                 // PAYMENT METHOD SCREEN //

import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import { savePaymentMethod } from "../slices/cartSlice.js"




 


const PaymentScreen = () => {  
                       // useState for Payment Method //  
                  const [paymentMethod, setPaymentMethod] = useState("Paypal");

                       // Initialize useDispatch && useNavigate //
                 const dispatch = useDispatch();
                 const navigate = useNavigate();

                    // Get Cart State from cartReducer State // 
                 const cart = useSelector((state) => state.cart); 
                 // Get Shipping Address from Cart // 
                   const { shippingAddress } = cart; 

                     // useEffect for shippingAddress //  
                    useEffect(() => {
                         // check for not having shippingAddress // 
         // if user does not fill shipping form redirect to user to the shipping screen //  
                   if (!shippingAddress) {
                       navigate("/shipping");
                   } 
                    }, [shippingAddress, navigate])


  
                      // submitHandler Function // 
                    const submitHandler = (e) => {
                         e.preventDefault();
                         dispatch(savePaymentMethod(paymentMethod));
                         navigate("/placeorder");
                    }


  return (
       <>  
           <FormContainer> 
            <CheckoutSteps step1 step2 step3/>
                    <h1> Payment Method </h1>
                    
                     <Form onSubmit={submitHandler}> 
            <Form.Group>
                <Form.Label as="legend"> Select Method </Form.Label> 
                <Col>
            <Form.Check 
               type="radio"
               className="my-2" 
               label="Paypal or Credit Card" 
               id="Paypal"
               name="paymentMethod"
               value="Paypal"
               checked
               onChange= {(e) => setPaymentMethod(e.target.value)}
            >
            </Form.Check>
                </Col>
            </Form.Group>  


            <Button type="submit" variant="primary"> 
               Continue
            </Button>
                     </Form>


           </FormContainer>
       
       </>
  )
}

export default PaymentScreen