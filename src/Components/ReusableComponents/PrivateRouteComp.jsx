import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const authToken = localStorage.getItem("token");

  let auth = { token: authToken };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  
};

export default PrivateRoute;