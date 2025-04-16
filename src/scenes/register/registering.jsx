import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
// import { useTheme }              from '@mui/material/styles';
import {
  useNavigate,
  useLocation,
  useOutletContext
} from 'react-router-dom';

import { useTheme, useMediaQuery } from "@mui/material";
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Carousel    from '@components/Carousel.Component';
import Loading from "@components/Loading.Component";
import FlexBetween from '@components/FlexBetween';
import authService from "@services/auth.service";

const Registering = (props) => {
  const theme = useTheme();
  const { t, i18n }                 = useTranslation("Registering");
  const location                    = useLocation();
  const outletContext               = useOutletContext()
  const isSmallScreen               = useMediaQuery(theme.breakpoints.down('sm'));  

  const localySavedUser             = useSelector((state) => state.auth.user) || authService.getCacheUser() || {};
  const localySavedToken            = useSelector((state) => state.global.token) || authService.getCacheToken() || null;
  const localySavedContexts         = useSelector((state) => state.global.contexts) || authService.getCacheContexts() || [];

  const [ isLoading,setIsLoading ]  = useState(true)
  const [ user ,setUser ]           = useState(localySavedUser)
  const [ token ,setToken ]         = useState(localySavedToken)
  const [ contexts,setContexts ]    = useState(localySavedContexts)
  
  const [allStepsCompleted, 
         setAllStepsCompleted]      = useState(contexts.every(context => context.done === true));
  
  const [showStepper, 
         setShowStepper]            = useState(false);
  

  const [renderCount, setRenderCount] = useState(1);

  React.useEffect(() => {
    console.log(`\n\n=====> Registering --> renders : ${renderCount}`)
    setRenderCount((prevCount) => prevCount + 1);

    if (
      !token || !outletContext.token ||
      !user || !outletContext.user ||
      !Array.isArray(contexts) || !contexts.length || 
      user.userStatus !== "Pending"
    ) {
      outletContext.setRedirect({
        redirect: true,
        to: "/login",
        replace: true,
        data: null
      })
    }
    else {
      setIsLoading(false)
    }
  }, []);

  const payload = () => {
    setAllStepsCompleted(true);
    setShowStepper(false);
  }

  return (
    <Box
      className="aqua"
      justifyItems={"center"}
      sx={{
          width: "100%",
      }}
    >
      {!showStepper && !allStepsCompleted && (

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            👋 Welcome New User!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We're excited to have you on Plateform. Insert the code you've recieved mother hacker!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowStepper(true)}
          >
            Insert it !!!
          </Button>
        </Box>

      )}

      {
        showStepper ?
          (<Carousel contexts={contexts} resetContexts={setContexts} payload={payload} />) :
          null
      }

      {allStepsCompleted && (

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            🎉 Thank You!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your Now Verified as Human. You can now Start your shit.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => outletContext.check()}
          >
            Go to ahead !!
          </Button>
        </Box>

      )}


      {
        // isLoading ?
        // (<Loading color={"yellow"}/>) :
        // (<Carousel contexts={contexts} resetContexts={setContexts} />)
      }
    </Box>
  );
};

export default Registering;