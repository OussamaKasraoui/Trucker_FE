import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const getDefaultPath = (role) => {
    switch (role) {
        case 'user': return '/syndicate/dashboard';
        case 'business': return '/business/dashboard';
        case 'admin': return '/admin/dashboard';
        default: return '/';
    }
};

export const PublicRoutes = ({ children }) => {
  const location = useLocation();

  const { userPack, userRole } = useSelector((state) => state.auth.user);

  if (userPack?.packName) {
    // return <Navigate to={getDefaultPath(userRole)} replace />;
  }

  return children;
};