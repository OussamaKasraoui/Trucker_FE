import React, { createContext, useContext, useState, useCallback } from 'react';
import produce from 'immer'; // For immutable updates

const ContextsContext = createContext();

export const ContextsProvider = ({ children }) => {
  const [contexts, setContexts] = useState([]);

  const updateContexts = useCallback((updater) => {
    setContexts(produce(contexts, updater));
  }, [contexts]);

  return (
    <ContextsContext.Provider value={{ contexts, updateContexts }}>
      {children}
    </ContextsContext.Provider>
  );
};

export const useContexts = () => {
  return useContext(ContextsContext);
};
