                               // UserEditScreen ---- Admin Only //

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import FormContainer from "../../components/FormContainer.jsx";
import { toast } from "react-toastify";
import {useGetUserDetailsQuery, useUpdateUserMutation} from "../../slices/usersApiSlice.js";
                         
                         
                         

  const UserEditScreen = () => {
                            // Get Id From Url //
                        const {id:userId} = useParams();
                         
                              // useState for Edit Form //
                       const [name, setName] = useState("");
                       const [email, setEmail] = useState("");
                       const [isAdmin, setIsAdmin] = useState(false);
                     
                         
                         
                   // Using Redux Toolkit To Get User Id For Editing //
          const {data:user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
                console.log(user);
                         
                        
                 // Using Redux Toolkit To Handle File Upload //
             const [updateUser, {isloading:loadingUpdate}] = useUpdateUserMutation();
                         
                         
                                  // Initialize useNavigate //
                                const navigate = useNavigate();
                         
                                 // useEffect for form fields //
                                     useEffect(() => {
                 /* Check for user && Fill the form with the User data available */
                                     if (user) {
                                setName(user.name);
                                setEmail(user.email);
                                setIsAdmin(user.isAdmin);
                                }
                                 },[user]);
                         
                         
                                // submitHandlerFunction //
                         const submitHandler = async (e) => {
                                 e.preventDefault();
                             try {
                          await updateUser({userId, name, email, isAdmin}) 
                             toast.success("User updated");
                              refetch();
                              navigate("/admin/userslist");
                             } catch (error) {
                          toast.error(error?.data?.message || error.error)
                             }  
                            }
                         
                         
                             
                         
     return (
              <>
             <Link to="/admin/userslist" className="btn btn-light my-3">
               Go Back
            </Link>
                         
                     <FormContainer>
                     <h1> Edit Product </h1>
                       {/* Check for loadingUpdate */}
                       {loadingUpdate && <Loader />}
                         
                         
                    {/* Check for isLoading */}
                 { isLoading ? <Loader /> : error ? <Message>  </Message> : (
                         
                      <Form onSubmit={submitHandler}>
                                        {/* Name Field */}
            <Form.Group controlId="name" className="my-2">
              <Form.Label> Name  </Form.Label>
 <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}>
</Form.Control>
            </Form.Group>
                         
                                        {/* Email Field */}
            <Form.Group controlId="email" className="my-2">
            <Form.Label> Email </Form.Label>
<Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}>
</Form.Control>
            </Form.Group>
                         
                         
                                       {/* isAdmin Field */}
          <Form.Group controlId="isAdmin" className="my-2">
<Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}> 
</Form.Check>
          </Form.Group>
                         
                                  {/* Button */}
               <Button type="submit" variant="primary" className="my-2">
                  Update User
                </Button>
                         
                </Form>
                         
            )}
                         
                         
         </FormContainer>
                         
        </>
                           )
                         }
                         
export default UserEditScreen
                         