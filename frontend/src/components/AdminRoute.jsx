import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

 


const AdminRoute = () => {     
                   // get useInfo from authSlice reducer // 
            const { userInfo } = useSelector((state) => state.auth)



  return (
         userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>
)
  
}

export default AdminRoute