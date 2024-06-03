                         // Register SCREEN // 
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader.jsx";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
                    
                
                        
const RegisterScreen = () => { 
                      // useState for form // 
                 const [email, setEmail] = useState(""); 
                 const [name, setName]= useState("");
                 const [password, setPassword] = useState("");
                 const [confirmPassword, setConfirmPassword] = useState();
                         
                         // Initialize useDispatch && useNavigate // 
                      const dispatch = useDispatch();
                      const navigate = useNavigate();  
                         
                             // Using Redux ToolKit //  
                   const [ register, {isLoading} ] = useRegisterMutation();
                   console.log(register)
                            
                     // get useInfo from authSlice reducer //
                 const { userInfo } = useSelector((state) => state.auth);
                          
                      // destructure search property from useLocation Hook //  
                         const { search } = useLocation();
                         const sp = new URLSearchParams(search); 
                         const redirect = sp.get("redirect") || "/";
                          
                        // useEffect hook //  
                      useEffect(() => {
                             if (userInfo) {
                             navigate(redirect);
                            }
                      }, [userInfo, redirect, navigate]);  
                         
                         
                     // submitHandler Function // 
                const submitHandler = async (e) => { 
                      e.preventDefault ();   

                        // check password match //  
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                 return; 
            } else {
                try {
                    const res = await register({name, email, password}).unwrap(); 
                               dispatch(setCredentials({...res,}));
                               navigate(redirect);
                               toast.success("Register Successful");
                        
                } catch (error) {
              toast.error(error.data?.message || error.error) // Default error message 
                }
                        
                  }
            }
                
                         
                         
                         
                         
  return ( 
            <>
                    <FormContainer> 
                <h1> Sign Up </h1>  
                
                           {/* Form */}
                    <Form onSubmit={submitHandler}>  

                             {/* Name Form Field */}
                    <Form.Group controlId="name" className="my-3"> 
                 <Form.Label> Name </Form.Label> 
                 <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} /> 
                 </Form.Group>
             
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

                  {/* Confirm Password Form Field */}
                  <Form.Group controlId="confirmPassword" className="my-3"> 
                <Form.Label> Confirm Password </Form.Label> 
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> 
                </Form.Group> 
                        
                <Button type="submit" variant="primary" className="my-3" disabled={isLoading}>
                  Register
               </Button>   
                    
                         {/* Once we try to login  */}
                          { isLoading && <Loader /> }
                </Form>
                         
                <Row className="py-3"> 
                            <Col>
       Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}`: "/login" }> Login </Link>
                           </Col>
                 </Row>
                         
                 </FormContainer> 
     
                </>
            ) 
        }
    
export default RegisterScreen 