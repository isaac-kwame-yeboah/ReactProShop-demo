                        // ShippingScreen // 
import { useState } from "react";
import { Form, Button, } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.js";
import CheckoutSteps from "../components/CheckoutSteps.jsx";





const ShippingScreen = () => {   
                      // Get Shipping Details from CartReducer State // 
                      // Get Cart State from cartReducer State //
              const cart = useSelector((state) => state.cart); 

            // Destructure shipping address from cartReducer State within the InitialState //
            const { shippingAddress } = cart;


                   // useState for Address, City, PostalCode, Country // 
                   const [address, setAddress] = useState(shippingAddress?.address || "");
                   const [city, setCity] = useState(shippingAddress?.city || "");
                   const [postalCode, setPostalCode ] = useState(shippingAddress?.postalCode || "");
                   const [country, setCountry] = useState(shippingAddress?.country || "");   

                       // Initialize useDispatch && useNavigate // 
              const dispatch = useDispatch();
              const navigate = useNavigate();




                 // submitHandler Function //
                 const submitHandler = (e) => {
            dispatch(saveShippingAddress({address, city, postalCode, country})); 
              navigate("/payment");
                 }


  return (
      <> 
         <FormContainer>  
               <CheckoutSteps step1 step2 />
             
             <h1> Shipping </h1>
 
              <Form onSubmit={submitHandler}> 

                         {/* Address Form Field */}
             <Form.Group controlId="address" className="my-2">
         <Form.Label> Address </Form.Label> 
<Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}>
</Form.Control>
             </Form.Group>    

                          {/* City Form Field */}  
        <Form.Group controlId="city" className="my-2">
         <Form.Label> City </Form.Label> 
<Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}>
</Form.Control>
             </Form.Group>          

                             {/* Postal Code Form Field */}  
            <Form.Group controlId="postalCode" className="my-2">
         <Form.Label> Postal Code </Form.Label> 
<Form.Control type="text" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
</Form.Control>
             </Form.Group> 

                              {/* Country Form Field */}  
        <Form.Group controlId="country" className="my-2">
        <Form.Label> Country </Form.Label> 
<Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)}>
</Form.Control>
        </Form.Group>

         <Button type="submit" variant="primary" className="my-2"> 
             Continue
         </Button>

              </Form>

         </FormContainer>
      
      
      
      
      </>
  )
}

export default ShippingScreen