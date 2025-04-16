import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Box, Grid, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { notify } from '@components/Notifications.Component';
import authService from '@services/auth.service';

import http from '@services/user.service'
import { cloneObject } from "@services/helpers";

// Initial state for the form
const initialValues = {
  id: '',
};

// Formik validation schema using Yup
const validationSchema = (t) => Yup.object().shape({
  id: Yup.string().required(t('codeRequired')).length(24, t('codeLengthError')),
});

// Defining formik
const useFormiks = (props, loggedContractor, loggedStaff, loggedUser, t, i18n, location) => useFormik({
  initialValues: initialValues,
  validationSchema: validationSchema(t),
  onSubmit: async (formData) => {
    try {
      http.init(`/${"comingFrom/UserActivate"}`)
      // http.init(location.pathname)
      http.postXATdata("twofas", props.action, {
        formData: formData,
        contractor: loggedContractor.id,
        staff: loggedStaff.id,
        user: loggedUser.id,
      })
      .then(response => {
        try {
          if (response.error) {
            // Mongo Errors
            if (response.data.name === "MongoError") {
              for (const [key, value] of Object.entries(response.data.data.keyValue)) {
                console.log(value + " " + t(value));
              }
            } else {
              for (const [key, value] of Object.entries(response.data)) {
                useFormiks.errors[key] = value;
                useFormiks.touched[key] = true;
                useFormiks.errors[key] = true;
              }
            }
          } else {
            notify(response.data.message.notificationType, response.data.message.notificationText, i18n.dir());
            useFormiks.setValues(response.data.data.map((element, index) => {
              return cloneObject(useFormiks.values[index], element);
            }), false);
            props.payload(response.data.data);
          }
        } catch (error) {
          console.log("responseHandler Try Catch error: \n", error);
        }
      })
      .catch(error => {
        if (error.code !== "ERR_BAD_REQUEST") {
          alert(`${error.name} : ${error.message}`);
        } else {
          const err = error.response.data;
          console.log("errorHandler error: \n", err);

          let errors = [];
          if (err.error) {
            if (Array.isArray(err.data)) {
              errors = err.data.map((data, index) => data.errors);
            } else if (typeof err.data === 'object') {
              let fieldsErrors = {};
              for (const [key, value] of Object.entries(err.data)) {
                fieldsErrors[key] = value.message;
              }
              errors.push(fieldsErrors);
            } else if (typeof err.data === 'string') {
              authService.removeCacheUser();
            }
            useFormiks.setErrors(errors);
          }
        }
      });
    } catch (err) {
      console.log(`\n\n=====> MyFormComponent ${props.context} formik.onSubmit try catch err: ${err}`);
    }
  }
});

// The UserActivate component
const UserActivate = (props) => {
  const { t, i18n } = useTranslation(props.context);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  
  const location = useLocation();

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedContractor = useSelector((state) => state.auth.contractor);
  const loggedStaff = useSelector((state) => state.auth.staff);

  const formikInstance = useFormiks(props, loggedContractor, loggedStaff, loggedUser, t, i18n, location);

  return (
    <Box width={isSmallScreen ? '90%' : '80%'} display="block" justifyContent="center" alignItems="center">
      <form onSubmit={formikInstance.handleSubmit} sx={{ width: isSmallScreen ? '100%' : '60%' }}>
        <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ margin: '0px', padding: '0px', width: 'auto' }}>
          <Grid item sx={{ width: '90%' }}>
            <TextField
              name="id"
              label={t('twoFactorCode')}
              onChange={formikInstance.handleChange}
              onBlur={formikInstance.handleBlur}
              value={formikInstance.values.id}
              error={formikInstance.touched.id && Boolean(formikInstance.errors.id)}
              helperText={formikInstance.touched.id && formikInstance.errors.id}
              margin="dense"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item sx={{ width: '90%' }}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {t('submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

// Exporting both UserActivate and formik
export { useFormiks };
export default UserActivate