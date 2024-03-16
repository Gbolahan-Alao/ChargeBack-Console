import { useAuth } from './useAuth';


const ProtectedRoute = ({ children }) => {
 const authRedirect = useAuth();

 return authRedirect || children;
};


export default ProtectedRoute;