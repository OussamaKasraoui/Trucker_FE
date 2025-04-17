import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; // Import axios

import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import Loading from "@components/Loading.Component";
import ErrorModal from "@components/ErrorModal.Component";
import BreadCrumbs from "@components/reuseable/List/BreadCrumbs";

import useAxiosErrorHandler from '@services/useAxiosErrorHandler';
import { useAuth } from "@services/useAuth"; // Custom hook for handling user and token state
import authService from "@services/auth.service";
import http from '@services/user.service';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/ar-ma';
import 'dayjs/locale/fr';

import { setStateUser, 
         setStateContractor, 
         setStateStaff, 
         setStateMenu, 
         setStateContexts,
         setStateContracts } from "@states/slices/auth";



const LayoutUser = () => {
  const { t, i18n }               = useTranslation("syndicate");
  const theme                     = useTheme();
  const location                  = useLocation();
  const dispatch                  = useDispatch();
  const navigate                  = useNavigate();
  const { handleAxiosError }      = useAxiosErrorHandler();

  // Get QueryClient from the context
  const queryClient               = useQueryClient()

  const { user, setUser, 
          token, setToken,
          locale, setLocale,
          menu, setMenu }         = useAuth();
          
  const [openModal, setOpenModal] = useState(false);
  const [error, setError]         = useState(null);
  const [loaded, setLoaded]       = useState(true);
  const [isSidebarOpen, 
         setIsSidebarOpen]        = useState(true);
  
  const query = useQuery({
    queryKey: ["syndicate"],
    queryFn: async (controller) => {
      console.log(`\n\n=====> LayoutUser --> fetchs : ${renderCount}`)
        // const controller = new AbortController();
        http.init(location.pathname)
        return await http.getXATdata('users', 'check', [], controller, location);
    },
    enabled: false,
  });

  const toggleDrawer = (newState) => {
    setIsSidebarOpen(newState);
  };
  
  const handleRedirect = (redirect) => {
    console.log(`\n\n=====> LayoutUser --> redirects to : ${redirect.to}`)

    if(redirect.redirect && location.pathname !== redirect.to){
      navigate(redirect.to, { state: redirect.data });
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(null);
  };

  // Updated `check` function to use centralized data fetching
  const fetchData = async (controller) => {
    await query.refetch({ cancelToken: controller.token });
  };

  const check = () => {
    setLoaded(false);
  }

  // Fetch user and context data
  const [renderCount, setRenderCount]     = React.useState(1);

  const thisContext = {
    user, setUser,
    menu, setMenu,
    locale, setLocale,
    token, setToken,
    // redirect, 
    setRedirect: handleRedirect,
    loaded, setLoaded,
    initialCheck: check,
    openModal, setOpenModal,
    error, setError,
    check: check
  }

  const height = {
    xs: "57px",
    sm: "57px",
    md: "57px",
    lg: "60px",
    xl: "80px",
  }
  
  useEffect(() => {
    console.log(`\n\n=====> LayoutUser --> renders : ${renderCount}`);
    setRenderCount((prevCount) => prevCount + 1);    

    const controller = axios.CancelToken.source();

    try {

      if (query.isLoading) return;

      if (query.isError) {
        handleAxiosError(query.error, {}, "CONTEXT", thisContext, t, authService.removeCacheUser);
        // setLoaded((prevState) => prevState + 1);
        return;
      }

      if (!loaded && query.isFetched && query.status === "success" && !query.data?.data?.error) {
        const { user, contractor, staff, context, menu, token, redirect, contracts} = query.data.data.data;

        dispatch(setStateUser       (user));
        dispatch(setStateContractor (contractor));
        dispatch(setStateStaff      (staff));
        dispatch(setStateContexts   (context));
        dispatch(setStateMenu       (menu))
        // dispatch(setStateToken      (token))
        dispatch(setStateContracts  (contracts))

        setLoaded((prevState) => prevState + 1);
        setUser(user)
        setToken(token)
        setMenu(menu)
        // setRedirect(redirect)

        handleRedirect(redirect)

        // queryClient.invalidateQueries({ queryKey: ['syndicate'] })
        // queryClient.resetQueries({ queryKey: ['syndicate'], exact: true })

        return;
      }      
      
      if (!loaded && !query.isFetched) {
        // fetchData(controller); 
        // return;
      }

    } catch (error) {

      if (axios.isCancel(error)) {
        console.log("=====> Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }

    return () => {
      console.log(`\n\n=====> LayoutUser --> Unmouts : ${renderCount}`)
      console.log("=====> LayoutUser: Cancelling previous request");

      controller.cancel("LayoutUser: Cancelling previous request");
      queryClient.resetQueries({ queryKey: ['syndicate'], exact: true })

    };

  }, [query.status, loaded /* query.isLoading, query.isFetched, query.data, dispatch */]); 

  return (<>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>

      {/* Scrollable Content (Green Box) */}
      <Box
        className="lime"
        sx={{
          p: 0,
          m: 0,
          minHeight: "100vH",
          // maxHeight: "100vH",
          backgroundColor: theme.palette.background.main,
        }}
      >
        {/* Navbar */}
        <Navbar
          from={'Layout'}
          sidebar={{
            display: user && token && user.userStatus === "Active" ? true : false,
            isSidebarOpen,
            toggleDrawer,
          }}
          navbar={{
            display: user && token && user.userStatus === "Active" ? true : false,
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
          {user && token && user.userStatus === "Active" ?
            (<Box
              className="blue"
              sx={{
                position: "sticky",                        // Makes it sticky to the viewport
                top: 0,                                    // Aligns to the top
                height: "100vh",                           // Occupies full viewport height
                width: "auto",                             // Fixed width
                display: isSidebarOpen ? 'block' : 'none', // Conditional visibility

                transition: 'width 0.3s ease',
              }}
            >
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleDrawer={toggleDrawer}
                menu={menu}
                route={user.userPack?.packName}
                outletContext={thisContext}
              />
            </Box>) : null
          }

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
            {/* Breadcrumbs */}
            {user && token && user.userStatus === "Active" ?
              (<Box
                className='olive'
                sx={{
                  width: "fit-content",
                  height: "auto",
                  alignContent: "center",
                  m: 2,
                  p: 1,
                  backgroundColor: theme.palette.background.xlighter,
                  border: `1px solid ${theme.palette.background.darker}`,
                }}
              >
                {/* Breadcrumbs content here */}
                <BreadCrumbs separator={'>'} i18n={i18n} theme={theme} />
              </Box>) : null}

            {/* Outlet */}
            <Box
              className='olive'
              sx={{
                width: "-webkit-fill-available",
                height: "auto",
                alignContent: "center",
                m: 2,
              }}
            >
              
              <Outlet context={thisContext} />
            </Box>
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

export default LayoutUser;