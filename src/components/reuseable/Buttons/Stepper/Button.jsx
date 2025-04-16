import React from 'react'
import { useLocation, useOutletContext }  from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import   Grid from '@mui/material/Grid';
import FlexBetween from '../../../FlexBetween';
import useAxiosErrorHandler from '@services/useAxiosErrorHandler'
import http from '@services/user.service'
import { setStateUser, setStateContractor, setStateStaff, setStateToken, setStateContexts }             from "@states/slices/auth";

function StepperButtons(props) {
  const location                          = useLocation();
  const outletContext                     = useOutletContext();
  const { handleAxiosError }              = useAxiosErrorHandler();
  const dispatch                          = useDispatch();

  const { 
    formik, instance, isDone, exContext, 
    index, action, length, disabled, 
    contextT, handleNext, handlePrev }    = props

  const onClick = {
    redirect:
      () => outletContext.setRedirect(formik),

    check:
      async () => {
        try {
          const controller = new AbortController();
          const result = await outletContext.initialCheck("context", "StepperMobile", controller)
          console.log('\n\n=====> StepperMobile --> check() --> result', result); // Example: logging the result

          outletContext.setRedirect(result.redirect);

        } catch (err) {
          console.error('\n\n=====> StepperMobile --> check() --> whatever', err);

          handleAxiosError(err, formik, exContext, outletContext, () => {})
        }
      },

    activate:
      async () => {
        try {
          const controller = new AbortController();
          // http.init(`/${"comingFrom/StepperButtons"}`)
          http.init(location.pathname)
          const response = await http.getXATdata('users', 'activate', [], controller);

          if (!response.data.error) {

            dispatch(setStateUser(response.data.data.user))
            dispatch(setStateContractor(response.data.data.contractor))
            dispatch(setStateStaff(response.data.data.staff))
            dispatch(setStateToken(response.data.data.token))
            dispatch(setStateContexts(response.data.data.context))

            outletContext.setToken(response.data.data.token)
            outletContext.setUser(response.data.data.user)


            outletContext.setRedirect(response.data.data.redirect)
          }

        } catch (err) {
          console.error('\n\n=====> StepperMobile --> check() --> whatever', err);

          handleAxiosError(err, formik, exContext, outletContext, () => {})
        }
      },

    read:
      handleNext,

    next:
      handleNext,

    create: () => {
      if (isDone) {
        handleNext()
      } else {
        formik.handleSubmit()
      }

    },
  }

  return (
    <Grid item sx={{ width: "90%" }}>
      <FlexBetween gap={5}>
          <Button variant="contained"
              disabled={index === 0}
              onClick={handlePrev}
          >
              Previous
          </Button>

          <Button variant="contained"
              // disabled={index === length - 1}
              onClick={onClick[action]}
          >
              {isDone ? "Next" : action}
          </Button>
      </FlexBetween>
    </Grid>
  )
}

export default StepperButtons