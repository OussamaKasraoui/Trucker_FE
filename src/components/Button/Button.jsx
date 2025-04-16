import React from 'react'
import { useNavigate, useOutletContext }  from 'react-router-dom';

import './Button.css'
import Button from '@mui/material/Button';
import useAxiosErrorHandler from '@services/useAxiosErrorHandler';


function AppButton(props) {
  const outletContext                     = useOutletContext();
  const { handleAxiosError }              = useAxiosErrorHandler();


  // const { formik, instance, isDone, exContext, index, action, length, disabled, contextT, handleNext } = props
  const { action, onClick, disabled, contextT } = props

  /* const onClick = {
    redirect: () => outletContext.setRedirect(formik),

    check: async () => {
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

    activate: () => {
        try {
          if (isDone) {
            handleNext()
          } else {
            formik.handleSubmit()
          }
        } catch (err) {
          console.error('\n\n=====> StepperMobile --> check() --> whatever', err);

          handleAxiosError(err, formik, exContext, outletContext, () => {})
        }
    },

    read: handleNext,

    next: handleNext,

    create: () => {
      if (isDone) {
        handleNext()
      } else {
        formik.handleSubmit()
      }
    },
  } */

    return (
      
      <Button variant="contained" disabled={disabled} onClick={onClick}>
        
        {contextT(action)}

      </Button>
    )
}
export default AppButton