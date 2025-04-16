import * as React                   from 'react';
import { useNavigate, useOutletContext, useLocation }    from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation }           from "react-i18next";
import * as Yup                     from 'yup';
import { useQuery, 
        useMutation }               from '@tanstack/react-query'

import { useFormik, 
        getIn, 
        Formik, 
        Form, 
        FieldArray 
    }                               from 'formik';

import TextField                    from '@mui/material/TextField';
import { FormHelperText }           from '@mui/material';
import Grid                         from '@mui/material/Grid';
import Button                       from '@mui/material/Button';
import HowToRegIcon                 from '@mui/icons-material/HowToReg';
import FormGroup                    from '@mui/material/FormGroup';
import FormControlLabel             from '@mui/material/FormControlLabel';
import Checkbox                     from '@mui/material/Checkbox';
import Alert                        from '@mui/material/Alert';
import Stack                        from '@mui/material/Stack';
import Box                          from '@mui/material/Box';
import Link                         from '@mui/material/Link';
import FormControl                  from '@mui/material/FormControl';
import InputLabel                   from '@mui/material/InputLabel';
import Select                       from '@mui/material/Select';
import MenuItem                     from '@mui/material/MenuItem';
import { useTheme, 
    useMediaQuery }                 from "@mui/material";


import { setStateUser, 
    setStateStaff, 
    setStateContractor, 
    setStateContexts,
    setStateContracts,
    setStateToken }                 from '@states/slices/auth'
import registerIcon                 from './../../assets/registerIcon.png'
import http                         from '@services/user.service';
import useAxiosErrorHandler         from '@services/useAxiosErrorHandler'

import FlexBetween                  from '@components/FlexBetween';
import Pricing                      from '@components/Pricing';

import { useAuth } from "@services/useAuth"; // Custom hook for handling user and token state


const Register = (props) => {
    const { t, i18n }                         = useTranslation("users");
    const theme                               = useTheme();
    const outletContext                       = useOutletContext()
    const location                            = useLocation();

    const navigate                            = useNavigate();
    const dispatch                            = useDispatch();
    const { handleAxiosError }                = useAxiosErrorHandler();
    const { user, setUser, 
            token, setToken }                 = useAuth();

    const isMobile                            = useMediaQuery(theme.breakpoints.down('sm'));
    const isNonMobile                         = useMediaQuery("(min-width: 600px)");
    const isNonMediumScreens                  = useMediaQuery("(min-width: 1200px)");

    const [phone, setPhone]                   = React.useState([]);
    const [password, setPassword]             = React.useState("");
    const [selectUserPack, setSelectUserPack] = React.useState(!user.userPack);
    const [existEmails, setExistEmails]       = React.useState([])
    const [isSyndicate, setIsSyndicate]       = React.useState(false)
    const [login, setLogin]                   = React.useState(true)
    // const [error, setError]                   = React.useState("");

    const [renderCount, setRenderCount]       = React.useState(0);
    const [instance, setInstance]             = React.useState(0)

    const searchParams                        = new URLSearchParams(location.search);
    const packName                            = searchParams.get('packName') || null;
    const contractId                          = searchParams.get('contractId') || null;
    const referrer                            = searchParams.get('referrer') || null;
    

    Yup.addMethod(Yup.number, 'phoneLength', function(phoneNumberLength) {
        return this.test('phone-length', function(value) {
            if (!value || isNaN(value)) return true; // Skip validation if value is empty or not a number
            
            const intValue = parseInt(value, 10);
            const valueLength = this.originalValue.length; //intValue.toString()
            let errorMessage = null;

            if(valueLength > 13){
                errorMessage = phoneNumberLength.max;
            }else if(valueLength < 10){
                errorMessage = phoneNumberLength.min;
            }else if(valueLength === 11 || valueLength === 12){
                errorMessage = "userPhoneError";
            }else{
                return true
            }

            return errorMessage ? this.createError({ message: errorMessage }) : true;
        });
    });

    const initialValues= {
        users :[{
            userEmail: 'kasraouioussama@gmail.com',
            userPassword: '12345678',
            confirmPassword: '12345678',
            userFirstName: 'Oussama',
            userLastName: 'Kasraoui',
            userPhone: '0669929220',
            userAddress: 'Guich Oudaya',
            userPack: user?.userPack?.id,
            userRef: {
                referrer : referrer,
                reference : {
                id:     contractId,
                name:   "some",
                type:   "thing"
                }
            }
        }]
    }

    const validationSchema= Yup.object().shape({
        users: Yup.array().of(Yup.object().shape({
            userEmail: Yup.string().required(t('userEmailRequired')).email(t('userEmailError')).notOneOf(existEmails),
            userPassword: Yup.string().required(t('userPasswordRequired')).min(8, t('userPasswordMinLength')).max(32, t('userPasswordMaxLength')),
            confirmPassword: Yup.string().required(t('userConfirmPasswordRequired')).min(8, t('userPasswordMinLength')).max(32, t('userPasswordMaxLength')).oneOf([Yup.ref('userPassword')], t('userConfirmPasswordError')),
            userFirstName: Yup.string().required(t("userFirstNameRequired")),
            userLastName: Yup.string().required(t('userLastNameRequired')),
            userAddress: Yup.string().required(t('userAddressRequired')),
            userPhone: Yup.number().required(t('userPhoneRequired')).notOneOf(phone, t('userPhoneUsedError')).phoneLength({
                min: t('userPhoneMinLength'),
                max: t('userPhoneMaxLength'),
            }),
        }))
    })
    
    
    const mutation                            = useMutation({
        mutationKey: props.context || "register",
        mutationFn: ({ values, formik }) => {
            values.userPack = user.userPack?.id

            let ref = {
                referrer : referrer,
                reference : {
                id:     contractId,
                name:   "some",
                type: "thing"
                }
            }

            // http.init(`/${"comingFrom/register"}`)
            http.init(location.pathname)
            
            return http.postAnonym('users', 'register', {
                formData: values,
                login: login,
                // ref: ref
            })
        },

        onMutate: ({ values, formik }) => {
            // A mutation is about to happen!
            console.log(`onMutate | rolling back formik ${formik}`)
            // Optionally return a context containing data to use when for example rolling back
            return { name: 'register' }
        },

        onError: (error, { values, formik }, context) => {
            // An error happened!
            console.log(`onError | rolling back error`, error)

            try {

                const callBack = (errorKeys) => {
                    if (errorKeys.includes('userPack')){
                        setSelectUserPack(true)
                    }
                }

                handleAxiosError(error, formik, "users", outletContext, t, callBack);
            } catch (error) {
                alert("Try Catch error: \n" + JSON.stringify(error))
            }

        },

        onSuccess: (data, { values, formik }, context) => {
            // Boom baby!
            console.log(`onSuccess | rolling back data`, data)

            if (!data.data.error) {
                if(login){
                    dispatch(setStateUser       (data.data.data.user))
                    dispatch(setStateContractor (data.data.data.contractor))
                    dispatch(setStateStaff      (data.data.data.staff))
                    dispatch(setStateToken      (data.data.data.token))
                    dispatch(setStateContracts  (data.data.data.contracts))
                    dispatch(setStateContexts(data.data.data.context))

                    outletContext.setToken(data.data.data.token)
                    outletContext.setUser(data.data.data.user)
                }

                outletContext.setRedirect(data.data.data.redirect)
            } else {
                if (data.error === "Email not found") {
                    console.log('Login error uncatched:\n', data.error)
                } else if (data.error === "Password incorrect") {
                    console.log('Login error uncatched:\n', data.error)
                } else {
                    alert('unknown Error happend')
                }
            }


        },

        onSettled: (data, error, { values, formik }, context) => {
            // Error or success... doesn't matter!
            console.log(`onSettled | rolling back data`, data)
        },
    })

    React.useEffect(() => {
        console.log(`\n\n=====> Register --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);

        if (!token) {
            if(packName && contractId){
                
            }
        }
        else {
            outletContext.setRedirect({
                redirect: true,
                to: `/${user?.userPack?.packName?.toLowerCase()}/dashboard`,
                replace: true
            })
        }
    }, [i18n, i18n.dir()])

    return (
        <>
            <Box
                className="aqua"
                display={"flex"}
                justifyContent="center"
                alignItems="center"

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
                    {
                        selectUserPack
                            ?
                            (<Pricing skip={setSelectUserPack} user={user} setUser={setUser} token={token} setToken={setToken} />)
                            :
                            (<>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, formik) => {
                                        mutation.mutate({ values, formik })
                                    }}
                                >
                                    {(formik) => (
                                        <>
                                            {formik.errors.userPack ?
                                                setSelectUserPack(true) :

                                                (<FieldArray name={props.context}>
                                                    {({ insert, remove, push }) => (

                                                        <Form>

                                                            <Grid
                                                                className="yellow"
                                                                container
                                                                columnSpacing={1}
                                                                sx={{
                                                                    px: 3,
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
                                                                        src={registerIcon}
                                                                        height="200px"
                                                                        width="200px"
                                                                        marginTop={1}
                                                                        marginBottom={1}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                                                    <TextField
                                                                        name={`users.${instance}.userFirstName`}
                                                                        label={t("userFirstName")}
                                                                        value={getIn(formik, `values.users.${instance}.userFirstName`)}
                                                                        error={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userFirstName`)) &&
                                                                            Boolean(getIn(formik.errors, `users.${instance}.userFirstName`))
                                                                        }
                                                                        helperText={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userFirstName`)) &&
                                                                            getIn(formik.errors, `users.${instance}.userFirstName`)
                                                                        }
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                                                    <TextField
                                                                        name={`users.${instance}.userLastName`}
                                                                        label={t("userLastName")}
                                                                        value={getIn(formik, `values.users.${instance}.userLastName`)}
                                                                        error={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userLastName`)) &&
                                                                            Boolean(getIn(formik.errors, `users.${instance}.userLastName`))
                                                                        }
                                                                        helperText={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userLastName`)) &&
                                                                            getIn(formik.errors, `users.${instance}.userLastName`)
                                                                        }
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                                                    <TextField
                                                                        name={`users.${instance}.userPhone`}
                                                                        label={t("userPhone")}
                                                                        value={getIn(formik, `values.users.${instance}.userPhone`)}
                                                                        error={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userPhone`)) &&
                                                                            Boolean(getIn(formik.errors, `users.${instance}.userPhone`))
                                                                        }
                                                                        helperText={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userPhone`)) &&
                                                                            getIn(formik.errors, `users.${instance}.userPhone`)
                                                                        }
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        type="phone"
                                                                        fullWidth
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        name={`users.${instance}.userAddress`}
                                                                        label={t("userAddress")}
                                                                        value={getIn(formik, `values.users.${instance}.userAddress`)}
                                                                        error={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userAddress`)) &&
                                                                            Boolean(getIn(formik.errors, `users.${instance}.userAddress`))
                                                                        }
                                                                        helperText={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.userAddress`)) &&
                                                                            getIn(formik.errors, `users.${instance}.userAddress`)
                                                                        }
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
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
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6}>
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
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6}>
                                                                    <TextField
                                                                        name={`users.${instance}.confirmPassword`}
                                                                        label={t("userConfirmPassword")}
                                                                        value={getIn(formik, `values.users.${instance}.confirmPassword`)}
                                                                        error={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.confirmPassword`)) &&
                                                                            Boolean(getIn(formik.errors, `users.${instance}.confirmPassword`))
                                                                        }
                                                                        helperText={
                                                                            Boolean(getIn(formik.touched, `users.${instance}.confirmPassword`)) &&
                                                                            getIn(formik.errors, `users.${instance}.confirmPassword`)
                                                                        }
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        type="password"
                                                                        fullWidth
                                                                        inputProps={{
                                                                            readOnly: mutation.isPending,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12}>
                                                                    <FlexBetween>
                                                                        <FormGroup>
                                                                            <FormControlLabel
                                                                                control={<Checkbox defaultChecked={login} />}
                                                                                onChange={() => {
                                                                                    setLogin(!login);
                                                                                }}
                                                                                label={t("loginAfterSignup")}
                                                                                disabled={packName === "Syndicate"}
                                                                            />
                                                                        </FormGroup>
                                                                        <Link href="/login" style={{ textDecoration: 'none' }}>
                                                                            {t("haveAccount")}
                                                                        </Link>
                                                                    </FlexBetween>
                                                                </Grid>

                                                                <Grid item xs={12}>
                                                                    <Button
                                                                        variant="contained"
                                                                        endIcon={<HowToRegIcon />}
                                                                        type="submit"
                                                                        fullWidth
                                                                        disabled={mutation.isPending}
                                                                    >
                                                                        {t("register")}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>


                                                    )}
                                                </FieldArray>
                                                )}
                                        </>
                                    )}
                                </Formik>
                            </>
                            )
                    }
                </Box>
            </Box>
        </>
    );
};


export default Register;