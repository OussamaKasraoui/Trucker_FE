import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from '@services/auth.service';
// import { setStateUser, setStateToken, setStateContracts } from '@states/slices/global';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const liveSavedUser = useSelector((state) => state.auth.user) || undefined ;
  const localySavedUser = authService.getCacheUser() || undefined;

  const [user, setUser] = useState(liveSavedUser || localySavedUser);
  /* ----------------------------------------------------------------------- */
  
  const liveSavedContractor = useSelector((state) => state.auth.contractor) || undefined ;
  const localySavedContractor = authService.getCacheContractor() || undefined;
  
  const [contractor, setContractor] = useState(liveSavedContractor || localySavedContractor);
  /* ----------------------------------------------------------------------- */
  
  const liveSavedStaff = useSelector((state) => state.auth.staff) || undefined ;
  const localySavedStaff = authService.getCacheStaff() || undefined;

  const [staff, setStaff] = useState(liveSavedStaff || localySavedStaff);
  /* ----------------------------------------------------------------------- */
  
  const liveSavedToken = useSelector((state) => state.auth.token) || undefined;
  const localySavedToken = authService.getCacheToken() || undefined;

  const [token, setToken] = useState(liveSavedToken || localySavedToken );
  /* ----------------------------------------------------------------------- */
  
  const liveSavedContexts = useSelector((state) => state.auth.contexts) || undefined;
  const localySavedContexts = authService.getCacheContexts() || [];

  const [contexts, setContexts] = useState(liveSavedContexts || localySavedContexts);
  /* ------------------------------------------------------------------------ */
  
  const liveSavedMenu = useSelector((state) => state.auth.menu) || undefined;
  const localySavedMenu = authService.getCacheMenu() || [];

  const [menu, setMenu] = useState(liveSavedMenu || localySavedMenu);
  /* ------------------------------------------------------------------------ */
  
  const liveSavedContracts = useSelector((state) => state.auth.contracts) || undefined;
  const localySavedContracts = authService.getCacheContracts() || [];

  const [contracts, setContracts] = useState(liveSavedContracts || localySavedContracts);
  /* ------------------------------------------------------------------------ */
  
  const liveSavedLocale = useSelector((state) => state.global.locale) || "en-gb";
  const localySavedLocale = authService.getCacheLocale() || "en-gb";

  const [locale, setLocale] = useState(liveSavedLocale || localySavedLocale);
  /* ------------------------------------------------------------------------ */

  const [name, setName] = useState("alex" || "popo");

  return { 
    user, setUser,
    contractor, setContractor,
    staff, setStaff,
    
    token, setToken,
    menu, setMenu,
    contexts, setContexts,
    contracts, setContracts,
    locale, setLocale,

    name, setName
  };
};
