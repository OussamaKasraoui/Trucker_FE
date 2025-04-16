import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider, Box } from "@mui/material";
import { themeSettings } from "./theme";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import { useQuery,useMutation,
        useQueryClient, QueryClient,
        QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Layout             from "@src/components/Layouts/layout";
import LayoutUser         from "@src/components/Layouts/layoutUser";
// import LayoutBusiness     from "@scenes/layoutBusiness";
// import LayoutAdmin        from "@scenes/layoutAdmin";
import Dashboard          from "@scenes/dashboard";
import Login              from "@scenes/login";
import Register           from "@scenes/register";
import Registering        from "@scenes/register/registering";
import LandingPage        from "@scenes/landingPage";
import Welcome            from "@scenes/welcome";
import { ContextsProvider } from '@scenes/welcome/ContextsContext';


// import Contracts          from "@scenes/contracts";
// import Agreements         from "@scenes/agreements";
// import Services           from "@scenes/services";

// import Sites              from "@scenes/sites";
// import Buildings          from "@scenes/buildings";
// import Apartments         from "@scenes/apartments";

import Scene              from "@components/Loadable/Index.scene";
import NotFound           from "@components/notfound";
import ContextAppProvider from "@components/ContextAPI";
import Test               from "@components/Test"

import { ProtectedRoutes,
       PublicRoutes }     from "./routes"


import "./App.css";

// Emotion cache configurations for RTL and LTR support
const cacheLtr = createCache({ key: "muiltr" });
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create a client
const queryClient = new QueryClient()

const App = () => {
  const { t, i18n } = useTranslation("landingPage"); // Language translations hook
  const mode = useSelector((state) => state.global.mode); // Fetch theme mode from Redux store

  // Memoized theme creation based on mode and language direction
  const theme = useMemo(() => createTheme({ 
    ...themeSettings(mode, i18n.dir()), // Apply mode and direction to theme
    direction: i18n.dir()               // Set theme direction (LTR/RTL) based on language
  }), [mode, i18n.dir()]);

  const [renderCount, setRenderCount] = React.useState(1);

  React.useEffect(() => {
    console.log(`\n\n=====> App --> renders : ${renderCount}`)
    setRenderCount((prevCount) => prevCount + 1);
    document.dir = i18n.dir(); // Sync the document's text direction with the selected language direction
  }, [i18n, i18n.dir()]);

  return (
    <Box className="App">

      {/* // Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* Cache provider for handling RTL and LTR */}
          <CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLtr}>
            <ThemeProvider theme={theme}>
              <CssBaseline /> {/* Material UI baseline styling */}
              <ContextAppProvider>


                <Routes>

                  {/* Public Routes */}
                  <Route path="/"             element={<PublicRoutes> <Layout /> </PublicRoutes>}>
                    <Route index              element={<LandingPage />} />
                    <Route path="home"        element={<LandingPage />} />
                    <Route path="register"    element={<Register />} />
                    <Route path="registering" element={<Registering />} />
                    <Route path="login"       element={<Login />} />
                    <Route path="test"        element={<Test />} />
                    <Route path="*"           element={<NotFound />} />
                    {/* <Route path="welcome"     element={<Welcome />} /> */}
                  </Route>

                  {/* Auth Routes for regular users  */}
                  <Route path="/syndicate"    element={<ProtectedRoutes allowedRoles={['Syndicate']}> <LayoutUser /> </ProtectedRoutes>}>
                    <Route index              element={<Dashboard />} />
                    <Route path="*"           element={<NotFound />} />
                    <Route path="test"        element={<Test />} />
                    <Route path="dashboard"   element={<Dashboard />} />
                    <Route path="welcome"     element={<ContextsProvider><Welcome /></ContextsProvider>} /> {/* TODO: remove ContextsProvider Wrapper */}

                    <Route path="sites"       element={<Scene scene={'sites'} title={'Sites Management'} />}/>
                    <Route path="buildings"   element={<Scene scene={'buildings'} title={'Buildings Management'} />}/>
                    <Route path="apartments"  element={<Scene scene={'apartments'} title={'Apartments Management'} />}/>
                    <Route path="commonareas" element={<Scene scene={'commonareas'} title={'Commonareas Management'} />}/>

                    <Route path="contracts"   element={<Scene scene={'contracts'} title={'Contracts Management'} />}/>
                    <Route path="agreements"  element={<Scene scene={'agreements'} title={'Agreements Management'} />}/>
                    <Route path="services"    element={<Scene scene={'services'} title={'Services Management'} />}/>

                    <Route path="owners"      element={<Scene scene={'owners'} title={'Owners Management'} />}/>
                    <Route path="members"     element={<Scene scene={'members'} title={'Members Management'} />}/>
                    <Route path="staff"       element={<Scene scene={'staff'} title={'Staff Management'} />}/>

                    <Route path="invoices"    element={<Scene scene={'invoices'} title={'Invoices Management'} />}/>
                    <Route path="payments"    element={<Scene scene={'payments'} title={'Payments Management'} />}/>
                    <Route path="reports"     element={<Scene scene={'reports'} title={'Reports Management'} />}/>
                  </Route>

                </Routes>


              </ContextAppProvider>
            </ThemeProvider>
          </CacheProvider>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Box>
  );
};

export default App;