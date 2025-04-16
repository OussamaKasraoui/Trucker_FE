import React, 
       { Suspense, useEffect }      from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, 
         useLocation,
         useOutletContext }         from "react-router-dom";

import { useTranslation }           from "react-i18next";
import   PropTypes, { func }                  from 'prop-types';

import   StepConnector, 
       { stepConnectorClasses }     from '@mui/material/StepConnector';
import { useTheme, useMediaQuery}   from "@mui/material";
import   Grid                       from '@mui/material/Grid';
import   Box                        from '@mui/material/Box';
import   Stepper                    from '@mui/material/Stepper';
import   Step                       from '@mui/material/Step';
import   StepLabel                  from '@mui/material/StepLabel';
import { styled }                   from '@mui/material/styles';

import   Check                      from '@mui/icons-material/Check';

import LoadableScene                from '@components/Loadable/Index.scene';
import loadButtons                  from "@components/Button"


import useAxiosErrorHandler         from '@services/useAxiosErrorHandler'
import   authService                from "@services/auth.service";
import { setStateContexts }         from "@states/slices/auth";


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.secondary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.secondary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.neutral.darker : theme.palette.neutral.lighter,
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.neutral.darker : theme.palette.neutral.lighter,
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: theme.palette.secondary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
        color: theme.palette.secondary.main,
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const MemoizedLoadableScene = React.memo(LoadableScene, (prev, next) => {
    return prev.activeContext === next.activeContext &&
        prev.context === next.context &&
        prev.indexContext === next.indexContext;
});

const Carousel = (props) => {
    const theme                 = useTheme();
    const { t, i18n }           = useTranslation("welcome");
    const dispatch              = useDispatch();
    const navigate              = useNavigate();
    const location              = useLocation();
    const outletContext         = useOutletContext()
    const isSmallScreen         = useMediaQuery(theme.breakpoints.down('sm'));
    const { handleAxiosError }  = useAxiosErrorHandler();
    const loggedUser            = useSelector((state) => state.auth.user)

    const [ error, setError]    = React.useState("");
    const [ loading, setLoading] = React.useState(false);
    
    const [ contexts, setContexts]    = React.useState(props.contexts || []);
            
    const [ activeContext, 
            setActiveContext]   = React.useState(0);

    const memoizedRenderButtons = React.useCallback(
        (formik, instance, isDone, context, indexContext, action, lengthContext, disabled, contextT) => {
            const onclick = () =>{
                if (isDone && indexContext < lengthContext - 1) {
                    console.log(`context: ${context} - ${1}`)
                    handleNext()
                } 
                
                else if (isDone && indexContext === lengthContext - 1) {
                    console.log(`context: ${context} - ${3}`)
                    outletContext.check()
                }
                
                else if (!isDone && indexContext <= lengthContext - 1) {
                    console.log(`context: ${context} - ${2}`)
                    formik()
                } 
            }

            return (
                <Grid item sx={{ width: "90%" }}>
            
                  <Grid container direction="row" justifyContent="center" alignItems="center">

                    { loadButtons(action, onclick, disabled, contextT) }

                  </Grid>
            
                </Grid>
            )
        },
        [handleNext, handlePrev]
    );

    const stepperPayload = React.useCallback((values, indexContext, indexDisplay, context) => {
        try {
            let contexts = authService.getCacheContexts()
            
                    contexts[indexContext].display[indexDisplay].done = true
                    contexts[indexContext].display[indexDisplay].values = values
                    contexts[indexContext].display[indexDisplay].action = ["next"]
            
                    contexts[indexContext].done = contexts[indexContext].display.every((display) => display.done === true)
            
                    if(indexContext < contexts.length - 1){
            
                        const dependencies = {
                            [context] : values.map((item, index) => {
                                return { id: item.id, name: item.name, item: item }
                            }) || []
                        }
            
                        for (let cIndex = indexContext + 1; cIndex < contexts.length; cIndex++) {
            
            
                            if(contexts[cIndex].context === "information" && contexts[cIndex].dependencies !== undefined){
                                contexts[cIndex].dependencies.push(...dependencies[context])
            
                            } else {
            
                                contexts[cIndex].display.forEach((_display, index) => {
            
                                    if (_display.name === "form") {
            
                                        if (Array.isArray(contexts[cIndex].display[index].dependency[context]) &&
                                            contexts[cIndex].display[index].dependency[context].length > 0) {
                                                
                                            contexts[cIndex].display[index].dependency[context].push(...dependencies[context])
                                        } else {
                                            contexts[cIndex].display[index].dependency[context] = dependencies[context]
                                        }
                                    }
                                });
                            }
                        }
            
            
                        handleNext()
                    } 
                    else {
                        props.payload()
                    }
                    dispatch(setStateContexts(contexts))
                    resetContexts(contexts)
        } catch (error) {
            console.warn(`Failed to set stepper payload:`, error);
        }

    }, [/* dispatch, handleNext */]);

    const [stepperSteps, setStepperSteps] = React.useState(contexts.map((context, index) => {

        return {
            ...context,
            jsx: (
                <MemoizedLoadableScene
                    indexContext={index}
                    lengthContext={contexts.length}
                    activeContext={activeContext}

                    context={context}
                    buttons={memoizedRenderButtons}
                    payload={stepperPayload}
                />
            )
        }
    }));

    const resetContexts = React.useCallback((contexts) => {
        console.log(`\n\n=====> Stepper.Component --> resets : ${contexts}`)

        setStepperSteps(contexts.map((context, index) => {
            return {
                ...context,
                jsx: (<MemoizedLoadableScene
                        indexContext={index}
                        lengthContext={contexts.length}
                        activeContext={activeContext}

                        context={context}
                        buttons={memoizedRenderButtons}
                        payload={stepperPayload}
                    />
                )
            }
        }));
    })

    /* const initialSteps = React.useMemo(() => 
        contexts.map((context, index) => {

            return {
                ...context,
                jsx: (
                    <MemoizedLoadableScene
                        indexContext={index}
                        lengthContext={contexts.length}
                        activeContext={activeContext}

                        context={context}
                        buttons={memoizedRenderButtons}
                        payload={stepperPayload}
                    />
                )
            }
        }),
        [contexts, activeContext, memoizedRenderButtons, stepperPayload]
    ); */
    
    const [renderCount, setRenderCount]     = React.useState(1);

    function handleNext (){
        setActiveContext((prevActiveStep) => prevActiveStep + 1);
    };

    function handlePrev(){
        setActiveContext((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        console.log(`\n\n=====> Carousel.Component --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);
    }, [loading, contexts])


    return (
        <>

            {/* Stepper Section */}
            <Box
                className="orange"
                width={{
                    xs: "100%",
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
                <Stepper
                    activeStep={activeContext}
                    alternativeLabel
                    connector={<QontoConnector />}
                >
                    {stepperSteps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={QontoStepIcon}>
                                {step.name}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Content Section */}
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

                {stepperSteps[activeContext].jsx}

            </Box>
        </>
    );
}

export default Carousel