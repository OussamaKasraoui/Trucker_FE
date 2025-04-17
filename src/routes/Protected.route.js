import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const getDefaultPath = (packName, userStatus) => {

  if(userStatus === "Pending"){
    return '/registering'
  }

  switch (packName) {

    case 'Administrator': 
        return '/administrator/dashboard';
    break;

    case 'Contractor': 
        return '/contractor/dashboard';
    break;
    
    case 'Customer': 
        return '/customer/dashboard';
    break;

    default: 
        return '/';
    break;
  }
};

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const location = useLocation();

  const { userPack, ...user } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  if (!token || !userPack?.packName || !user?.userStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(["Pending", "OnHold"].includes(user.userStatus)){
    const next = getDefaultPath(userPack?.packName, user.userStatus)
    
    if(location.pathname !== next){
        return <Navigate to={next} replace />;
    }    
  }

  if (allowedRoles && !allowedRoles.includes(userPack?.packName)) {
    return <Navigate to={getDefaultPath(userPack?.packName, user.userStatus)} replace />;
  }

  return children;
};