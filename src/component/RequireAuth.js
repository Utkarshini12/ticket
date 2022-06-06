import { useLocation, Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    
    return (
      // wrap this condition with status = logged in 
        localStorage.getItem("userTypes") === allowedRoles[0]
            ? <Outlet />
            : localStorage.getItem("userTypes")
                ? <Navigate to="/unauthorized" state={{ from: location }} replace  />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;