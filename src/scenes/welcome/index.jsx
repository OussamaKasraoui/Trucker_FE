import React, { useEffect } from "react";
import { useOutletContext, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useAuth } from "@services/useAuth";
import { useContexts } from './ContextsContext'; // Import the new context
import StepperMobile from "@components/Stepper.Component";
import Box from '@mui/material/Box';
import { Typography, Button } from "@mui/material";
import authService from '@services/auth.service';

import { useAppContexts } from '@components/ContextAPI'; // Import from ContextAPI

const Welcome = () => {
  const { t } = useTranslation("welcome");
  const { user, token } = useAuth();
  const outletContext = useOutletContext();
  const location = useLocation();

  // const { contexts, updateContexts } = useAppContexts(); // Use the new hook
  const [contexts, updateContexts] = React.useState(authService.getCacheContexts() || []); // Use the new hook
  
  const [allStepsCompleted,
         setAllStepsCompleted] = React.useState(contexts.every(context => {
          const ret = context.done

          return ret
        }));

  const [showStepper,
         setShowStepper] = React.useState(false);


  useEffect(() => {

    // Redirect logic (moved outside useEffect for better readability)
    if (!token || !user || user.userStatus !== "OnHold") {
      outletContext.setRedirect({ redirect: true, to: "/login", replace: true });
      return; // Prevent further execution
    }

    // Fetch contexts only if needed (e.g., on initial load)
    if (!contexts.length) {
      const fetchedContexts = authService.getCacheContexts(); // Your existing fetch logic
      updateContexts((draft) => {
        draft.push(...fetchedContexts); // Use immer for immutable update
      });
    }
  }, [contexts.length, token, user, updateContexts, outletContext]);

  const payload = () => {
    setAllStepsCompleted(true);
    setShowStepper(false);
  };

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
          (<StepperMobile contexts={contexts} payload={payload} source={"welcome"}/>) :
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
