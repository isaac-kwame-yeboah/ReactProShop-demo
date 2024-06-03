import { useState, useEffect} from "react";
import { Table, Form, Button, Row, Col} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice";  /* Update data  */
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice.js";
import { FaTimes } from "react-icons/fa";



const ProfileScreen = () => {   
                        // useState for forms //    
                const [name, setName] = useState("");
                const [email, setEmail] = useState("");
                const [password, setPassword] = useState("");
                const [confirmPassword, setConfirmPassword] = useState(""); 
                
                 // initialize useDispatch // 
                 const dispatch = useDispatch();

                 // Get userinfo from authSlice reducer //
           const { userInfo } = useSelector((state) => state.auth);
            
                   // Using Redux Toolkit  // 
            const [updateProfile, {isLoading:loadingUpdateProfile} ] = useProfileMutation();
            
             // Using Redux Toolkit  // 
      const { data:orders, isLoading, error} = useGetMyOrdersQuery();
             console.log(orders);

                  // useEffect for userInfo //
                useEffect(() => {
                   if (userInfo) {
                    setName(userInfo.name);
                    setEmail(userInfo.email);          
                   }
                }, [userInfo.name, userInfo.email, userInfo])

 
                    // submitHandler Function //
             const submitHandler = async (e) => {
                    e.preventDefault();
                  
                       // check password match  //
             if (password !== confirmPassword) {
             toast.error("Password do not match");     
             } else {
              try {
                const res = await updateProfile({_id:userInfo._id, name, email, password}).unwrap(); 
                 dispatch(setCredentials(res));
                 toast.success("Profile Updated");
              } catch (error) {
                toast.error(error?.data.message || error?.message || error.error);
              }
             }



             }



  return ( 
          <> 
            <Row>
              <Col md={3}>  {/* Column 1 start */}
                <h2> User Profile </h2> 
                
                           { /* Form */}
                 <Form onSubmit={submitHandler}>  
                          {/* Name Field */}
              <Form.Group controlId="name" className="my-2"> 
               <Form.Label> Name </Form.Label> 
   <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}> 
   </Form.Control>       
            </Form.Group> 
                     
                     {/* Email Field */}
            <Form.Group controlId="email" className="my-2"> 
               <Form.Label> Email Address </Form.Label> 
   <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}> 
   </Form.Control>       
            </Form.Group> 

                {/* Password Field */}
                <Form.Group controlId="password" className="my-2"> 
               <Form.Label> Password </Form.Label> 
   <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}> 
   </Form.Control>       
            </Form.Group> 

             {/* Confirm Password Field */}
             <Form.Group controlId="confirmPassword" className="my-2"> 
               <Form.Label> Confirm Password </Form.Label> 
   <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}> 
   </Form.Control>       
            </Form.Group>
                
                 {/* Button */}
        <Button type="submit" variant="primary" className="my-2">  
           Update
        </Button>
    
                        {/* Check for Loading */} 
                    {loadingUpdateProfile && Loader}

                 </Form>


           </Col>   {/* Column 1 end */}




              <Col md={9}>  {/* Column 2 start */}
               <h2> My Orders </h2> 

            {/* Display my orders in a table */}
  {isLoading ? (<Loader />) : error ? (<Message variant="danger"> {error?.data?.message || error.error}  </Message>) : ( 
     <Table striped hover responsive className="table-sm"> 
         <thead> 
                <tr>  
                <th> ORDER ID </th> 
                <th> DATE </th> 
                <th> TOTAL </th> 
                <th> PAID </th> 
                <th> DELIVERED </th> 
                <th> </th> {/* Details Buttons */}
                </tr>
         </thead>  
              
         <tbody> 
                  {/* Map through orders */}  
               {orders.map((order) => ( 
               <tr key={order._id}> 
                    <td> {order._id}  </td>
                    <td> {order.createdAt.substring(0, 10)} </td> 
                    <td> {order.totalPrice} </td>
                    <td>  
                       {order.isPaid ? ( order.paidAt.substring(0, 10)) : ( 
                         <FaTimes style={{color: "red"}} />
                       ) }
                     </td>  

                     <td>  
                     {order.isDelivered ? ( order.deliveredAt.substring(0, 10)) : ( 
                         <FaTimes style={{color: "red"}} />
                       ) }
                     </td> 

                     <td> 
                        <LinkContainer to={`/order/${order._id}`}>  
                          <Button className="btn-sm" variant="light"> Details </Button>
                         </LinkContainer>
                     </td>
                </tr>
               ))}
         </tbody>

     </Table>
  )}




             </Col>   {/* Column 2 end */}

            </Row>
          
                  
          </>
 
        
  )
}

export default ProfileScreen