import { Navigate } from 'react-router-dom';
import { useUserRole } from './useRoleContext';

export const useAuth = () => {
 const { isAuthenticated } = useUserRole();

 if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
 }
};
