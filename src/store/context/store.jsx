import React, { createContext, useContext } from 'react';

export const Store = createContext();

export const useMyContext = () => useContext(Store);

export const ContextProvider = ({ children }) => {
  const value = {};

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
