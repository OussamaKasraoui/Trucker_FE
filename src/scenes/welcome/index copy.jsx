import React, { useEffect, useState }     from "react";
import { useOutletContext, 
         useLocation }                    from 'react-router-dom';
import { useTranslation }                 from "react-i18next";
import { useDispatch, useSelector }       from 'react-redux'
import { useTheme, 
         Typography, 
         Button }                         from "@mui/material";
import Box                                from '@mui/material/Box';

import StepperMobile                      from "@components/Stepper.Component";
// import Loading                            from "@components/Loading.Component";

import { useAuth }                        from "@services/useAuth"; // Custom hook for handling user and token state
import authService                        from "@services/auth.service";

const Welcome = (props) => {
  const theme                       = useTheme();
  const { t, i18n }                 = useTranslation("welcome");
  const location                    = useLocation();
  const outletContext               = useOutletContext()
  
  const [ isLoading,setIsLoading ]  = useState(true)

  const { 
        user, setUser, 
        token, setToken, }          = useAuth();
  
  const localySavedContexts         = useSelector((state) => state.global.contexts) || authService.getCacheContexts() || [];
    
  const [renderCount, 
        setRenderCount]             = useState(1);
    
  const [contexts, 
        setContexts]                = useState(localySavedContexts);

  const [allStepsCompleted, 
        setAllStepsCompleted]       = useState(contexts.every(context => context.done === true));

  const [showStepper, 
        setShowStepper]             = useState(false);
      

  useEffect(() => {
    console.log(`\n\n=====> Welcome --> renders : ${renderCount}`)
    setRenderCount((prevCount) => prevCount + 1);
    // const contexts = authService.getCacheContexts()

    if (
      !token || !outletContext.token || 
      !user || !outletContext.user ||
      !Array.isArray(contexts) || 
      // !contexts.length || 
      user.userStatus !== "OnHold"
    ) {
      console.log(`\n\n=====> Welcome --> redirects : ${renderCount}`)

      outletContext.setRedirect({
        redirect: true,
        to: "/login",
        replace: true,
        data: null,
      })
    }
    else {
      setIsLoading(false)
    }

    return () => {
      console.log(`\n\n=====> Welcome --> Unmouts : ${renderCount}`)
      setContexts(authService.getCacheContexts())
      setIsLoading(true)
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
            We're excited to have you on board. Click the button below to get started!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowStepper(true)}
          >
            Start Setup
          </Button>
        </Box>

      )}

      {
        showStepper ?
        (<StepperMobile contexts={contexts} payload={payload}/>):
        null
      }

      {allStepsCompleted && (

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            🎉 Thank You!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your setup is complete. You can now access your dashboard.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => outletContext.check()}
          >
            Go to Dashboard
          </Button>
        </Box>

      )}
    </Box>
  );
};
    
export default Welcome;

