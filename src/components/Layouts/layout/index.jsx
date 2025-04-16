import React, 
       { useState, useEffect }  from "react";
import { Outlet, 
         useLocation, 
         useNavigate }          from "react-router-dom";
import { useTranslation }       from "react-i18next";
import { useDispatch }          from "react-redux";
import axios                    from "axios";
import { useQuery, 
         useQueryClient }       from '@tanstack/react-query';

import { Box, useTheme }        from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs }         from '@mui/x-date-pickers/AdapterDayjs';

import { setStateUser, 
         setStateContractor, 
         setStateStaff, 
         setStateMenu, 
         setStateContracts,
         setStateContexts }     from "@states/slices/auth";
         
import Navbar                   from "@components/Navbar";
import Loading                  from "@components/Loading.Component";
import ErrorModal               from "@components/ErrorModal.Component";

import { useAuth }              from "@services/useAuth"; // Custom hook for handling user and token state
import authService              from "@services/auth.service";
import http                     from '@services/user.service';
import useAxiosErrorHandler     from "@services/useAxiosErrorHandler";

// Centralized user data fetching logic
const fetchUserData = async (controller, location) => {
  http.init(location.pathname);
  const response = await http.getXATdata('users', 'check', [], controller, location);
  return response;
};

const Layout = () => {
  const { t }                 = useTranslation("layout");
  const theme                 = useTheme();
  const location              = useLocation();
  const dispatch              = useDispatch();
  const navigate              = useNavigate();
  const { handleAxiosError }  = useAxiosErrorHandler();

  // Get QueryClient from the context
  const queryClient           = useQueryClient();

  const { user, setUser, 
        locale, setLocale, 
        menu, setMenu, 
        token, setToken } = useAuth();
  
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(true); 

  const query = useQuery({
    queryKey: ['layout'],
    queryFn: async (controller) => {
      console.log(`\n\n=====> Layout --> fetchs : ${renderCount}`);
      http.init(location.pathname);
      return await http.getXATdata('users', 'check', [], controller, location);
    },
    enabled: false,
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(null);
  };

  const handleRedirect = (redirect) => {
    console.log(`\n\n=====> from Layout --> to : ${redirect.to}`);

    if (location.pathname !== redirect.to) {
      navigate(redirect.to, { state: redirect.data });
    }
  };

  const fetchData = async (controller) => {
    await query.refetch({ cancelToken: controller.token });
  };
  
  async function check(needed, controller) {
    console.log(`\n\n=====> Layout --> checks : ${renderCount}`);
    const response = await fetchUserData(controller, location);

    if (!response.data.error) {
      setUser(response.data.data.user);
      setToken(response.data.data.token);

      dispatch(setStateUser(response.data.data.user));
      dispatch(setStateContractor(response.data.data.contractor));
      dispatch(setStateStaff(response.data.data.staff));
      dispatch(setStateContexts(response.data.data.context));
    }

    return { redirect: response.data.data.redirect, [needed]: response.data.data[needed] };
  }

  // Fetch user and context data
  const [renderCount, setRenderCount] = React.useState(1);
  
  useEffect(() => {
    console.log(`\n\n=====> Layout --> renders : ${renderCount}`);
    setRenderCount((prevCount) => prevCount + 1);
    
    const controller = axios.CancelToken.source();
    
    if (!loaded) {
      fetchData(controller); 
      return;
    }

    return () => {
      console.log(`\n\n=====> Layout --> Unmouts : ${renderCount}`);
    };
  }, [loaded, dispatch, location.pathname, locale]);

  useEffect(() => {
    try {
      if (query.isLoading) {
        return;
      }

      if (query.isError) {
        handleAxiosError(query.error, {}, "CONTEXT", thisContext, t, authService.removeCacheUser);
        return;
      }

      if (query.isFetched && query.status === "success" && !query.data?.data?.error) {
        const { user, contractor, staff, context, menu, token, redirect, contracts } = query.data.data.data;

        dispatch(setStateUser(user));
        dispatch(setStateContractor(contractor));
        dispatch(setStateStaff(staff));
        dispatch(setStateContexts(context));
        dispatch(setStateMenu(menu));
        // dispatch(setStateToken      (token))
        dispatch(setStateContracts  (contracts))

        setLoaded((prevState) => prevState + 1);
        setUser(user);
        setToken(token);
        setMenu(menu);

        handleRedirect(redirect)

        queryClient.resetQueries({ queryKey: ['layout'], exact: true });
        
        return;
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("=====> Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }, [query.status]);

  // useEffect(() => {
  //   if (redirect.redirect) {
  //     handleRedirect();
  //   }
  // }, [redirect]);

  const thisContext = {
    user, setUser,
    locale, setLocale,
    token, setToken,
    // redirect, setRedirect,
    setRedirect: handleRedirect,
    loaded, setLoaded,
    initialCheck: check,
    openModal, setOpenModal,
    error, setError,
    check: query.refetch
  };

  const height = {
    xs: "57px",
    sm: "57px",
    md: "57px",
    lg: "60px",
    xl: "80px",
  };

  return (<>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>

      {/* Scrollable Content (green Box) */}
      <Box
        className="lime"
        sx={{
          p: 0,
          m: 0,
          minHeight: "100vH",
          backgroundColor: theme.palette.background.main,
        }}
      >
        {/* Navbar */}
        <Navbar
          from={'Layout'}
          sidebar={{ display: false }}
          navbar={{
            display: true,
            height: height,
            links: [
              { link: "/", text: "Landpage", exact: true },
              { link: "/about", text: "Products", exact: true },
              { link: "/contact", text: "Contact Us", exact: true },
            ],
          }}
          user={user}
          token={token}
          pathname={location.pathname}
          locale={locale}
          setLocale={setLocale}
          outletContext={thisContext}
        />

        {/* Content */}
        <Box
          className="red"
          // flex={1}
          sx={{
            display: "flex",
            boxSizing: "border-box",
            width: "-webkit-fill-available",
            // backgroundColor: theme.palette.background.main,
          }}
        >
          {/* Sidebar (Blue Box) */}
          <Box
            className="blue"
            sx={{
              display: "block",
              transition: 'margin-left 0.3s ease',

              width: "100%",
              maxWidth: "100%",

              // height: "100vh",
              // maxHeight: "100vh",

              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Outlet context={thisContext} />
          </Box>
        </Box>
      </Box>

      {/* Error Modal */}
      <ErrorModal
        open={openModal}
        onClose={handleCloseModal}
        error={error}
        setLoaded={setLoaded}
        authService={authService}
      />
    </LocalizationProvider>
  </>);
};

export default Layout;