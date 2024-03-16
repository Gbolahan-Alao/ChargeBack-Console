import { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
 const [userRole, setUserRole] = useState([]);
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [merchantId, setMerchantId] = useState(null); 

 const isAdmin = () => {
    return userRole.includes('Admin');
 };
 const setUserMerchantId = (id) => {
    setMerchantId(id);
 };
// console.log({ userRole, setUserRole, isAuthenticated, setIsAuthenticated, isAdmin, merchantId, setUserMerchantId });

 return (
  <UserRoleContext.Provider value={{ userRole, setUserRole, isAuthenticated, setIsAuthenticated, isAdmin, merchantId, setMerchantId, setUserMerchantId }}>
  {children}
</UserRoleContext.Provider>


 );
};
