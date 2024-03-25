import { Navigate } from 'react-router-dom';
import { useUserRole } from './useRoleContext';

export const useAuth = () => {
 const { isAuthenticated } = useUserRole();

 // Check if the user is authenticated
 if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
 }

 // If authenticated, do not redirect
 return null;
};
