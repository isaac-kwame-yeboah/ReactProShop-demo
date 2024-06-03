                               // UserListScreen  --- Admin Only //  
                                
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";                       
                         
                        
     const UserListScreen = () => {   
                  // Using Redux Toolkit //  
             const {data:users, refetch, isLoading, error } = useGetUsersQuery()
            console.log(users);
                            
                         // Using Redux Toolkit //  
                const [deleteUser, {isLoading:loadingDelete} ] = useDeleteUserMutation()


                // deleteHandler Function // 
                const deleteHandler = async (id) => {
                     if (window.confirm("Are you sure?")) {
                      try {
                         await deleteUser(id); 
                         refetch();
                         toast.success("User deleted"); 
                      } catch (err) {
                        toast.error(err?.data?.message || err.error);
                      }
                     }
                } 



        return (
           <> 
                  <h1> Users </h1> 
             
                  {loadingDelete && <Loader /> }
                    
        {isLoading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : ( 
                       
              <Table striped hover responsive className="table-sm">  
                  <thead> 
                        <tr> 
                            <th> USER ID </th> 
                            <th> NAME </th> 
                            <th> EMAIL </th> 
                            <th> ADMIN </th> 
                            <th> </th> {/* Details Buttons */}
                         </tr>
                </thead>    
                       
                         <tbody>  
                        {/* Map through users */}   
                        { users.map((user) => (
                          <tr key={user._id}>   
                              <td> {user._id} </td>  
                              <td> {user.name} </td>  
                              <td> <a href={`mailto:${user.email}`}> </a> {user.email} </td>  

                              <td>  
                     {user.isAdmin ? (
                        <FaCheck style={{color:"green"}} />
                     ) : (
                        <FaTimes style={{color:"red"}} />
                     ) }
                          </td> 

                          <td> 
                            <LinkContainer to={`/admin/userlist/${user._id}/edit`}> 
                                <Button variant="light" className="btn-sm">  
                                  <FaEdit /> Edit
                                </Button>
                            </LinkContainer>
                          </td> 

                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}> 
                     <FaTrash /> Delete
                 </Button>
                    
                            </tr> 
                              ))}
                                   
                                  </tbody>
                       
                                 </Table>
                       
                                ) }
                               
                               
                               </>
                       
                         )
                       }
                       
                       export default UserListScreen