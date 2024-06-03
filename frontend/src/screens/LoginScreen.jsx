                         // LOGIN SCREEN // 
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader.jsx";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";



const LoginScreen = () => { 
               // useState for form // 
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

          // Initialize useDispatch && useNavigate // 
          const dispatch = useDispatch();
          const navigate = useNavigate();  

           // Using Redux ToolKit //  
    const [ login, {isLoading} ] = useLoginMutation();
         console.log(login)
   
        // get useInfo from authSlice reducer //
      const { userInfo } = useSelector((state) => state.auth);
 
          // destructure search property from useLocation Hook //  
        const { search } = useLocation();
        const sp = new URLSearchParams(search); 
        const redirect = sp.get("redirect") || "/";
 
           // useEffect hook - check if user is login //  
           useEffect(() => {
            if (userInfo) {
              navigate(redirect);
            }
         }, [userInfo, redirect, navigate]);  


        // submitHandler Function // 
        const submitHandler = async (e) => { 
              e.preventDefault (); 
           try {
            const res = await login({email, password}).unwrap(); 
              dispatch(setCredentials({...res,}));
              navigate(redirect);
              toast.success("Login Successful");
                // clear form //
                 setEmail("");
                 setPassword("");
           } catch (error) {
            toast.error(error.data?.message || error.error) // Default error message 
           }

        }




  return ( 
    <>
         <FormContainer> 
            <h1> Sign In </h1>  
 
                   {/* Form */}
            <Form onSubmit={submitHandler}> 

                   {/* Email Form Field */}
             <Form.Group controlId="email" className="my-3"> 
             <Form.Label> Email Address </Form.Label> 
  <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
             </Form.Group> 

                   {/* Password Form Field */}
             <Form.Group controlId="password" className="my-3"> 
             <Form.Label> Password </Form.Label> 
  <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
             </Form.Group> 

    <Button type="submit" variant="primary" className="my-3" disabled={isLoading}>
                   Sign In
             </Button>   

                       {/* Once we try to login  */}
                       { isLoading && <Loader /> }
            </Form>

         <Row className="py-3"> 
          <Col>
           New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: "/register" }> Register </Link>
          </Col>
         </Row>

         </FormContainer> 
    
    </>
  )
}

export default LoginScreen