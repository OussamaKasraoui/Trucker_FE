import React, { createContext, useRef, useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'  // Import PropTypes for type-checking
import produce from 'immer';  // Import `produce` from `immer` for immutable updates
import authService from '@services/auth.service';  // Import the service for authentication


export const ContextApp = createContext()

const ContextAppProvider = (props) => {

  const [contexts, setContexts] = useState(authService.getCacheContexts() || []);

  const updateContexts = useCallback((updater) => {
    setContexts(produce(contexts, updater));
  }, [contexts]);


  // Group related states into an object for better organization
  const [scrollState, setScrollState] = useState({
    scrolled: false,  // Initial scrolled state
  })

  const notifisystem = useRef()  // Reference for mutable object

  // Grouping keyword state
  const [search, setSearch] = useState({
    keyword: '',  // Initial keyword state
  })

  return (
    <ContextApp.Provider
      value={{
        scrolled: scrollState.scrolled, setScrolled: (value) => setScrollState({ scrolled: value }),
        notifisystem,
        keyword: search.keyword, setKeyword: (value) => setSearch({ keyword: value }),
        contexts,
        updateContexts,
      }}
    >
      {props.children}
    </ContextApp.Provider>
  )
}

export const useAppContexts = () => { //Renamed to avoid conflict
  const context = useContext(ContextApp);
  if (!context) {
    throw new Error('useAppContexts must be used within a ContextAppProvider');
  }
  return context;
};

// Adding PropTypes to validate `props.children`
ContextAppProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Ensuring `children` is passed and is a valid React node
}

export default ContextAppProvider