import React                from "react";
import { useNavigate, 
        useOutletContext,
        useLocation }       from 'react-router-dom';
import { useDispatch, 
        useSelector }       from 'react-redux'
import { useTranslation }   from 'react-i18next';
import * as Yup             from 'yup';

import { useQuery, 
        useMutation }       from '@tanstack/react-query'

import { useFormik, 
         getIn, 
         Formik, 
         Form, 
         FieldArray 
}                           from 'formik';


// import Grid                 from '@mui/material/Grid';
import Button               from '@mui/material/Button';
import TextField            from '@mui/material/TextField';
import HowToRegIcon         from '@mui/icons-material/HowToReg';
import Stack                from '@mui/material/Stack';
import Alert                from '@mui/material/Alert';
import FormGroup            from '@mui/material/FormGroup';
import FormControlLabel     from '@mui/material/FormControlLabel';
import Checkbox             from '@mui/material/Checkbox';
import Box                  from '@mui/material/Box';
import OutlinedInput        from '@mui/material/OutlinedInput';
import InputLabel           from '@mui/material/InputLabel';
import FormControl          from '@mui/material/FormControl';
import InputAdornment       from '@mui/material/InputAdornment';
import IconButton           from '@mui/material/IconButton';
import FormHelperText       from '@mui/material/FormHelperText';
import Link                 from '@mui/material/Link';
import Grid                 from '@mui/material/Grid';
import { useTheme, 
        useMediaQuery }     from "@mui/material";

import Visibility           from '@mui/icons-material/Visibility';
import VisibilityOff        from '@mui/icons-material/VisibilityOff';

import http                 from "@services/user.service";
// import authService          from "@services//auth.service";
import useAxiosErrorHandler from '@services/useAxiosErrorHandler'
// import { TitleComponent }from "./../../pages/title";
import loginIcon            from "./../../assets/loginIcon.png";
import FlexBetween          from "@components/FlexBetween";
import { 
    setStateUser, 
    setStateStaff, 
    setStateContractor, 
    setStateContexts,
    setStateContracts,
    setStateToken, 
    setStateMenu}          from "@states/slices/auth";

import { useAuth }           from "@services/useAuth"; // Custom hook for handling user and token state


const Login = () => {
    const { t, i18n }           = useTranslation("users");
    const theme                 = useTheme();
    const outletContext         = useOutletContext()
    const location              = useLocation();

    const navigate              = useNavigate();
    const dispatch              = useDispatch();
    const { handleAxiosError }  = useAxiosErrorHandler();
    const { user, setUser, 
            token, setToken }   = useAuth();
    
    const isMobile              = useMediaQuery(theme.breakpoints.down('sm'));
    const isNonMobile           = useMediaQuery("(min-width: 600px)");
    const isNonMediumScreens    = useMediaQuery("(min-width: 1200px)");

    const [ loaded, setLoaded ]           = React.useState(false);
    const [ remmemberMe, setRemmemberMe ] = React.useState(true);
    const [ errors, setErrors ]           = React.useState("");
    const [ email, setEmail ]             = React.useState(location.state?.userEmail || "");
    const [ password, setPassword ]       = React.useState([]);
    const [ existEmails, setExistEmails ] = React.useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const [instance, setInstance]         = React.useState(0);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [renderCount, setRenderCount]     = React.useState(1);


    const mutation              = useMutation({
                                    mutationKey: "login",
                                    mutationFn: ({values, formik}) =>{
                                        console.log(http)
                                        // http.init(`/${"comingFrom/Login"}`)
                                        http.init(location.pathname)
                                        return http.postAnonym('users', 'login', {formData: values})
                                    },

                                    onMutate: ({values, formik}) => {
                                        // A mutation is about to happen!
                                        console.log(`onMutate | rolling back formik ${formik}`)
                                        // Optionally return a context containing data to use when for example rolling back
                                        return { name: 'login' }
                                    },

                                    onError: (error, {values, formik}, context) => {
                                        
                                        handleAxiosError(error, formik, "users", outletContext, t, () => {})
                                    },

                                    onSuccess: (data, {values, formik}, context) => {
                                        // Boom baby!
                                        console.log(`onSuccess | rolling back data`, data)

                                        if (!data.data.error) {
                                            dispatch(setStateUser       (data.data.data.user))
                                            dispatch(setStateContractor (data.data.data.contractor))
                                            dispatch(setStateStaff      (data.data.data.staff))
                                            dispatch(setStateToken      (data.data.data.token))
                                            dispatch(setStateMenu       (data.data.data.menu))
                                            dispatch(setStateContracts  (data.data.data.contracts))
                                            dispatch(setStateContexts   (data.data.data.context))
                                            
                                            outletContext.setToken(data.data.data.token)
                                            outletContext.setUser (data.data.data.user)
                                            outletContext.setRedirect(data.data.data.redirect)
                                        }else{
                                            if(data.error === "Email not found"){
                                                console.log('Login error uncatched:\n', data.error)
                                            }else if (data.error === "Password incorrect"){
                                                console.log('Login error uncatched:\n', data.error)
                                            }else{
                                                alert('unknown Error happend')
                                            }
                                        }


                                    },

                                    onSettled: (data, error, {values, formik}, context) => {
                                        // Error or success... doesn't matter!
                                        console.log(`onSettled | rolling back data`, data)
                                    },
                                  })
    
    React.useEffect(() => {
        console.log(`\n\n=====> Login --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);

        if(token && outletContext.token === token ){
            outletContext.setRedirect({
                redirect: true,
                to: `/${user?.userPack?.packName?.toLowerCase()}/dashboard`,
                replace: true
            }) 
        }
    }, []);


    const initialValues = {
        users: [{
            userEmail: email ? email : '',
            userPassword: ''
        }]
    }

    const validationSchema = Yup.object().shape({
        users :Yup.array().of( Yup.object({
            userEmail: Yup.string().required(t('userEmailRequired')).email(t('userEmailError')),
            userPassword: Yup.string().required(t('userPasswordRequired')).min(8, t('userPasswordLength')).max(32, t('userPasswordLength')),
        }))
    })
        

    return (
        <>
            <Box
                className="aqua"
                display={"flex"}
                justifyContent="center"
                alignItems="center" s
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    className="orange"
                    width={{
                        sm: "100%",
                        md: "80%",
                        lg: "70%",
                    }}
                    sx={{
                        display: "block",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, formik) => { mutation.mutate({ values, formik }) }}
                    >
                        {(formik) => (
                            <FieldArray name={"users"}>
                                {({ insert, remove, push }) => (

                                    <Form>

                                        <Grid
                                            className="yellow"
                                            container
                                            columnSpacing={1}
                                            sx={{
                                                p: 3,
                                                // backgroundColor: "yellow",
                                                // border: "solid 5px darkgoldenrod",
                                                width: 1,
                                                margin: 0
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    alt="login"
                                                    src={loginIcon}
                                                    height="200px"
                                                    width="200px"
                                                    marginTop={1}
                                                    marginBottom={1}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    name={`users.${instance}.userEmail`}
                                                    label={t("userEmail")}
                                                    value={getIn(formik, `values.users.${instance}.userEmail`)}
                                                    error={
                                                        Boolean(getIn(formik.touched, `users.${instance}.userEmail`)) &&
                                                        Boolean(getIn(formik.errors, `users.${instance}.userEmail`))
                                                    }
                                                    helperText={
                                                        Boolean(getIn(formik.touched, `users.${instance}.userEmail`)) &&
                                                        getIn(formik.errors, `users.${instance}.userEmail`)
                                                    }
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    margin="dense"
                                                    variant="outlined"
                                                    size="small"
                                                    type="email"
                                                    fullWidth
                                                    slotProps={{
                                                        input: {
                                                            readOnly: mutation.isPending,
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    name={`users.${instance}.userPassword`}
                                                    label={t("userPassword")}
                                                    value={getIn(formik, `values.users.${instance}.userPassword`)}
                                                    error={
                                                        Boolean(getIn(formik.touched, `users.${instance}.userPassword`)) &&
                                                        Boolean(getIn(formik.errors, `users.${instance}.userPassword`))
                                                    }
                                                    helperText={
                                                        Boolean(getIn(formik.touched, `users.${instance}.userPassword`)) &&
                                                        getIn(formik.errors, `users.${instance}.userPassword`)
                                                    }
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    margin="dense"
                                                    variant="outlined"
                                                    size="small"
                                                    type="password"
                                                    fullWidth
                                                    slotProps={{
                                                        input: {
                                                            readOnly: mutation.isPending,
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FlexBetween>
                                                    <FormGroup >
                                                        <FormControlLabel
                                                            control={<Checkbox defaultChecked />}
                                                            onChange={() => { setRemmemberMe(!remmemberMe) }}
                                                            label={t("saveLogin")} />
                                                    </FormGroup>

                                                    <Link href="/register" style={{ textDecoration: 'none' }} >
                                                        {t("makeAccount")}
                                                    </Link>
                                                </FlexBetween>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button //sx={{ width: '200px' }}
                                                    variant="contained"
                                                    endIcon={<HowToRegIcon />}
                                                    className="Test"
                                                    type='submit'
                                                    disabled={mutation.isPending}
                                                    fullWidth
                                                >
                                                    {t("login")}
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Form>

                                )}
                            </FieldArray>
                        )}
                    </Formik>
                </Box>
            </Box>
        </>
    );
}

export default Login;