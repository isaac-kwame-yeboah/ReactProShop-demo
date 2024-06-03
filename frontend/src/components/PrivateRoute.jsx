import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";





const PrivateRoute = () => {  
                 // get useInfo from authSlice reducer // 
            const { userInfo } = useSelector((state) => state.auth)



  return (
            userInfo ? <Outlet /> : <Navigate to="/login" replace/>
  )
}

export default PrivateRoute