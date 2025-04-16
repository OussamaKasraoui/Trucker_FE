import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useOutletContext, useLocation }  from 'react-router-dom';
import * as Yup from 'yup';
import axios  from "axios";
import { getIn, Formik, FieldArray } from 'formik';

import { useTranslation, Trans } from 'react-i18next';

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { 
    Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton,
    Grid, Divider, Box, RadioGroup, Radio, FormLabel, FormControlLabel, Stack, Switch,
    TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormHelperText, 
    ButtonGroup, useMediaQuery, useTheme, Alert, } from '@mui/material';

import http from '@services/user.service'
import useAxiosErrorHandler from '@services/useAxiosErrorHandler'
import { notify } from '@components/Notifications.Component';
import FlexBetween                  from '@components/FlexBetween';
import {  setStateUser,
          setStateToken,
          setStateContracts }              from "@states/slices/auth";
import authService from '@services/auth.service';

const TwoFactorsForm = ({ indexDisplay, display, context, buttons, payload, lengthContext, indexContext, activeContext, from }) => {
    const theme                     = useTheme();
    const outletContext             = useOutletContext();
    const { handleAxiosError }      = useAxiosErrorHandler();
    const { t, i18n }               = useTranslation(context?.context);
    const dispatch                  = useDispatch();
    const queryClient               = useQueryClient();
    const location                  = useLocation();

    const loggedUser                = useSelector((state) => state.auth.user);

    const [isProd, setIsProd]       = React.useState(process.env.NODE_ENV === "production");
    const [isResent, setIsResent]   = React.useState(false);
    const [excluded, setExcluded]   = React.useState([]);
    
        
    const [action, setAction]       = React.useState(display.action || []);
    const [done, setDone]           = React.useState(display.done || false);
    const [loaded, setLoaded]       = React.useState(!done);

  
    const query = useQuery({
      queryKey: ['twofas'],
      queryFn: async () => {
        const controller = new AbortController();
        // http.init(`/${"comingFrom/Twofas"}`)
        http.init(location.pathname)

        return await http.getXATdata("twofas", "resend", { twoFAUser: loggedUser.id }, controller, location);
      },
      enabled: false,
    });
  
    const mutation = useMutation({
      mutationKey: "twofas",
      mutationFn: ({ values, formik }) => {
        const submittedSecret = values.twofas[instance].secret;
        // http.init(`/${"comingFrom/Twofas"}`)
        http.init(location.pathname)
        
        return http.postXATdata("twofas", /* display.action */ "verify", { formData: values.twofas[instance] });
      },
      onMutate: () => {
        console.log('Mutation in progress...')
  
        // Optionally return a context containing data to use when for example rolling back
        return { name: "twofas" }
      },
      onError: (error, { values, formik }) => {
        const submittedSecret = values.twofas[instance].secret;
        
        handleAxiosError(error, formik, "twofas", outletContext, t, () => {})
  
        if(error?.response?.status === 422){
          notify(error.response.data.message.notificationType, error.response.data.message.notificationText, i18n.dir());
  
          const _excluded = [...excluded];
  
          error.response.data.data.forEach((element, index) => {
  
            Object.entries(element).forEach(([key, value]) => {
  
              if (value === "secretExpired") {
                _excluded.push(submittedSecret);
              }
  
              formik.setFieldError(`${index}.${key}`, t(value));
            });
  
  
            setExcluded(_excluded)
          });
  
        }
      },
      onSuccess: (data, { values, formik }) => {
        const response = data.data;
        const submittedSecret = values.twofas[instance].secret;
  
        if (response.error) {
  
          response.data.map((element, index) => {
  
            for (const [key, value] of Object.entries(element)) {
              
              formik.setFieldError(`twofas.${index}.${key}`, t(value));
            }
          })
  
        } else {
          outletContext.setUser(response.data.user);
          outletContext.setToken(response.data.token);
  
          dispatch(setStateUser(response.data.user));
          dispatch(setStateToken(response.data.token));
          dispatch(setStateContracts(response.data.contracts));
  
          notify(response.message.notificationType, response.message.notificationText, i18n.dir());
          payload(response.data.values, indexContext, indexDisplay, context);
          // payload(_payload, indexContext, indexDisplay)
        }
      },
    });
    
    const [instance, setInstance] = React.useState(0);
  
    // Initial values and validation schema
    const initialValues = display.values && display.done ? 
          { twofas: display.values } :
          { twofas: [{
            secret: '',
            twoFAUser: loggedUser.id,
          }]};
  
    const validationSchema = Yup.object().shape({
      twofas :Yup.array().of( Yup.object().shape({
          secret: Yup.string().required(t('secretRequired'))
                      .length(6, t('secretLengthError'))
                      .notOneOf(excluded, t('secretExpired')),
          twoFAUser: Yup.string().required(t('userIdRequired')),
      }))
    })

    React.useEffect(() => {
      
      const controller = axios.CancelToken.source();

      try {  
  
        if (query.isLoading) {
          return; // Prevent logic execution during loading
        }
      
        if (query.isError) {
          handleAxiosError(query.error, {}, "twofas", outletContext, t, () => {
            authService.removeCacheUser()
          })
          return;
        }
      
        if (query.data && !query.data.error) {
          
          setIsResent(query.data.data.data);
          notify(query.data.data.message.notificationType, query.data.data.message.notificationText, i18n.dir());
          queryClient.resetQueries({ queryKey: ['twofas'], exact: true })
        }
      } catch (error) {

        if (axios.isCancel(error)) {
          console.log("=====> Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
        
      }

      return () => {
        console.log(`\n\n=====> Twofas [ Form ] --> Unmouts : ${renderCount}`)
        console.log("=====> Twofas [ Form ]: Cancelling previous request");
        controller.cancel("Twofas [ Form ]: Cancelling previous request");
      }
    }, [query.data, query.isLoading, query.isPending, mutation.data, mutation.isLoading, mutation.isPending]);

      const [renderCount, setRenderCount] = React.useState(1);

    React.useEffect(() => {
          console.log(`\n\n=====> Twofas [ Form ] --> renders : ${renderCount}`)
          setRenderCount((prevCount) => prevCount + 1);
    }, [i18n, i18n.language]);

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, formik) => mutation.mutate({ values, formik })}
            >
                {(formik) => (

                    <FieldArray 
                        name={"twofas"}
                    >
                    
                    {({ insert, remove, push }) => {

                      // const someButtons = buttons(formik, instance, display.done, "twofas", index, display.action, length, mutation.isPending || query.isFetching, t);
                    
                      return (<Grid
                            className="cyan"
                            container
                            columnSpacing={1}
                            sx={{
                              width: 1,
                              margin: 0,
                              p: 1,
                              justifySelf: "center",
                              justifyContent: "center",
                            }}
                        >

                            <Grid item sx={{ width: '90%' }}>
                                <TextField
                                    name={`twofas.${instance}.secret`}
                                    label={t('twoFactorCode')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={getIn(formik, `values.${"twofas"}.${instance}.secret`)}
                                    error={Boolean(getIn(formik, `touched.${"twofas"}.${instance}.secret`)) && Boolean(getIn(formik, `errors.${"twofas"}.${instance}.secret`))}
                                    helperText={Boolean(getIn(formik, `touched.${"twofas"}.${instance}.secret`)) && getIn(formik, `errors.${"twofas"}.${instance}.secret`)}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    // focused={display.done}
                                    color={display.done ? "success" : null}
                                    inputProps={{ readOnly: display.done }}
                                />
                            </Grid>

                            <Grid item sx={{ width: '90%' }}>
                                <FlexBetween>
                                    <Button
                                        disabled={mutation.isPending || query.isFetching}
                                        onClick={query.refetch}
                                    >
                                        {t("ResendCode")}
                                    </Button>

                                    {isResent && (
                                        <Button onClick={() => formik.setFieldValue(`twofas.${instance}.secret`, isResent)}>
                                        {t("useTemporaryCode")}
                                        </Button>
                                    )}
                                </FlexBetween>
                            </Grid>

                            {isResent && (
                                <Grid item sx={{ width: '90%' }}>
                                    <Alert severity="warning">
                                        <Trans
                                        i18nKey="skipEmail" // optional -> fallbacks to defaults if not provided
                                        defaults={t("skipEmail")} // optional defaultValue
                                        values={{
                                            app: t("app_name", { ns: "translation" }),
                                            button: t("useTemporaryCode"),
                                        }}
                                        components={[<strong />]}
                                        />
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item sx={{ width: '90%', my: 1 }}>
                              {
                                buttons && buttons(formik.handleSubmit, instance, display.done, "twofas", indexContext, display.action, lengthContext, mutation.isPending || query.isFetching, t) 
                                // buttons && buttons(someButtons.verify)
                              }
                            </Grid>
                        </Grid>)
                    }}
                    </FieldArray>)
                }
            </Formik>
        </>
    )
};

export default TwoFactorsForm;