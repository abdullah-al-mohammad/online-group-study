
import { Navigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useLocation } from 'react-router';

const ProtectRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation()
  console.log(location);


  return user ? children : <Navigate to={'/login'} state={{ from: location }} ></ Navigate>

};

export default ProtectRoute;