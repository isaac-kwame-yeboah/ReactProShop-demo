import { Badge, Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => { 
                 // Get CartItems from Cart State //
          const { cartItems } = useSelector((state) => state.cart);
           console.log(cartItems);

             // Get userInfo from Auth State // 
          const { userInfo } = useSelector((state) => state.auth);

          // Initialize UseNavigate && useDispatch //
         const dispatch = useDispatch();
         const navigate = useNavigate(); 

           // Using Redux ToolKit //  
           const [ logoutApiCall ] = useLogoutMutation();



             // logoutHandler Function // 
            const logoutHandler = async () => {
              try {
                  await logoutApiCall().unwrap();  
                  dispatch(logout()); 
                  navigate("/login"); 
                  toast.success("Logout Successfully");
              } catch (error) {
                 console.log(error)
              }
            }


  return (
         <> 
              <header> 
          <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect >
            <Container >
              <LinkContainer to="/"> 
              <Navbar.Brand> 
                   <img src={logo} alt="ProShop" />
                   ProShop 
                </Navbar.Brand>
              </LinkContainer>
                
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
            <Navbar.Collapse id="basic-navbar-nav"> 

              <Nav className="ms-auto"> {/* Actual Navbar Start */}
                <LinkContainer to="/cart"> 
                <Nav.Link> <FaShoppingCart /> Cart 
                     {/* Item Count In ShoppingCart */}
                 {cartItems.length > 0 && (
                   <Badge pill bg="info" style={{marginLeft: "5px"}}> 
                    {cartItems.reduce((acc, c) => acc + c.qty, 0)}
                   </Badge>
                 )}
                </Nav.Link> 
                </LinkContainer>
              

                {/* check for userInfo */}
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id= "username">
                  <LinkContainer to="/profile"> 
                   <NavDropdown.Item>  Profile </NavDropdown.Item>
                  </LinkContainer> 
                   <NavDropdown.Item onClick={logoutHandler}> Logout   </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                  <Nav.Link> <FaUser /> Sign In </Nav.Link>
                  </LinkContainer>
                ) }
               
                
                  {/* check for Admin */}
               {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                     <LinkContainer to="/admin/productlist"> 
                     <NavDropdown.Item> Products </NavDropdown.Item> 
                     </LinkContainer>  

                     <LinkContainer to="/admin/userslist"> 
                     <NavDropdown.Item> Users </NavDropdown.Item> 
                     </LinkContainer>

                     <LinkContainer to="/admin/orderlist"> 
                     <NavDropdown.Item> Orders </NavDropdown.Item> 
                     </LinkContainer> 
                  </NavDropdown>
               )}


              </Nav>  {/* Actual Navbar End */}
            </Navbar.Collapse>

            </Container>
          </Navbar>
 
              </header>
         
         
         
         </>
  )
}

export default Header

