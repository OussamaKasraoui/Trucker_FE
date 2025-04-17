import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const getDefaultPath = (packName, userStatus) => {

  switch (packName) {

    case 'Administrator': 
        let root = '/administrator/dashboard';

        if(userStatus === "Pending"){
            root = '/registering'
        }
        // else if(userStatus === "OnHold"){
        //     root = '/syndicate/welcome'
        // }

        return root;
    break;

    case 'contractor': 
        return '/contractor/dashboard';
    break;
    
    case 'customer': 
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