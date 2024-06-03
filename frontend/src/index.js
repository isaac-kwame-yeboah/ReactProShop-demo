import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"; 
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import "bootstrap/dist/css/bootstrap.min.css";   // Default Bootstrap File // 
import { Provider } from "react-redux";
import store from "./app/store.js";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import AdminProductEditScreen from "./screens/admin/AdminProductEditScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import UserEditScreen from "./screens/admin/UserEditScreen.jsx";




                // Create Our Router //
       const router = createBrowserRouter(
             createRoutesFromElements(
            <Route path="/" element={<App />}> 
                     {/* Unprotected Route || Public Route */}
                <Route index={true} path="/" element={<HomeScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} /> 
                <Route path="/cart" element={<CartScreen />} /> 
                <Route path="/login" element={<LoginScreen />} />  
                <Route path="/register" element={<RegisterScreen />} />  
               


                     {/* Private Route || Protected Route */}  
                     <Route path="" element={<PrivateRoute />} > 
                     <Route path="/shipping" element={<ShippingScreen />} /> 
                     <Route path="/payment" element={<PaymentScreen />} />  
                     <Route path="/placeorder" element={<PlaceOrderScreen />}  />
                     <Route path="/order/:id" element={<OrderScreen />} /> 
                     <Route path="/profile" element={<ProfileScreen />} />
                     </Route> 

                    
                       {/* Admin Private Route || Protected Route */} 
                    <Route path="" element={<AdminRoute />}> 
                     <Route path="/admin/orderlist" element={<OrderListScreen />} />  
                     <Route path="/admin/productlist" element={<ProductListScreen />} />
                     <Route path="/admin/product/:id/edit" element={<AdminProductEditScreen />} /> 
                     <Route path="/admin/userslist" element={<UserListScreen />}  /> 
                     <Route path="/admin/userlist/:id/edit" element={<UserEditScreen />} />
                    </Route>


                    
            </Route>
           ) 
       )  


 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  
     <PayPalScriptProvider deferLoading={true}>  
      <RouterProvider router={router} />  
      </PayPalScriptProvider>
      </Provider>
  </React.StrictMode>
);


reportWebVitals();
 