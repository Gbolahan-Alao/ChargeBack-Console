import { createContext, useContext, useState } from 'react';

const MerchantContext = createContext();

export const MerchantProvider = ({ children }) => {
  const [selectedMerchantId, setSelectedMerchantId] = useState(null);

  const selectMerchant = (merchantId) => {
    setSelectedMerchantId(merchantId);
  };

  return (
    <MerchantContext.Provider value={{ selectedMerchantId, selectMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }
  return context;
};
