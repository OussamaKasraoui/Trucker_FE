import React, { Suspense }          from 'react';
import { useTranslation }           from "react-i18next";
import {
        useNavigate, useLocation,
        useOutletContext }          from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Grid, 
        useTheme, useMediaQuery,
        CircularProgress,
        Stepper, Step, StepLabel,
        Typography, StepContent,
        StepConnector, }            from "@mui/material";
        
import  { stepConnectorClasses }    from '@mui/material/StepConnector';
import { styled }                   from '@mui/material/styles';

import CircleOutlinedIcon           from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon              from '@mui/icons-material/CheckCircle';
import CircleTwoToneIcon            from '@mui/icons-material/CircleTwoTone';

import PropTypes                    from 'prop-types';

import LoadableScene                from '@components/Loadable/Index.scene';
import loadButtons                  from "@components/Button"
import FlexBetween                  from '@components/FlexBetween';

import useAxiosErrorHandler         from '@services/useAxiosErrorHandler'
import authService                  from "@services/auth.service";

import { setStateContexts }         from '@states/slices/auth'



const QontoConnector = styled(StepConnector)(({ theme, ownerState }) => {
    const { activeStep, stepIndex } = ownerState;

    return {
        // backgroundColor: theme.palette.background.dark,

        // Default styles for connector line
        [`& .${stepConnectorClasses.line}`]: {
            // backgroundColor: "green",
            borderColor: theme.palette.primary.main,
            borderTopWidth: 3,
            borderRadius: 1,
        },

        // Vertical line styling
        [`& .${stepConnectorClasses.lineVertical}`]: {
            // backgroundColor: "red",
            borderColor: theme.palette.primary.main,
            borderTopWidth: 3,
            borderRadius: 1,
        },

        // Horizontal line styling
        [`& .${stepConnectorClasses.lineHorizontal}`]: {
            backgroundColor: "purple",
            borderColor: theme.palette.primary.main,
            borderTopWidth: 3,
            borderRadius: 1,
        },

        // Conditional styling: hide connector if the current step is active
        ...(activeStep === stepIndex && {
            // display: 'none', // Hide the connector for the active step
            backgroundColor: "red",
        }),
    };
});
const CustomStepContent = styled(StepContent)(({ theme }) => ({
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    marginInline: 11,
}));
const CustomConnector = (props) => {
    const { activeStep, stepIndex } = props;
    return <QontoConnector ownerState={{ activeStep, stepIndex }} />;
};
const QontoStepIconRoot = styled('span')(({ theme, ownerState }) => ({
    color: "red",
    display: 'flex',
    height: 20,
    alignItems: 'center',
    ...(ownerState.active && {
        color: theme.palette.secondary.dark,
    }),
    '& .QontoStepIcon-completedIcon': {
        color: theme.palette.primary.xlighter,
        zIndex: 1,
        fontSize: 22,
    },
    '& .QontoStepIcon-circle': {
        color: theme.palette.primary.xlighter,
    },
}));
function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <CheckCircleIcon className="QontoStepIcon-completedIcon" />
            ) : !completed && !active ? (
                <CircleOutlinedIcon className="QontoStepIcon-circle" />
            ) : (
                <CircleTwoToneIcon className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}
QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
};

const MemoizedLoadableScene = React.memo(LoadableScene, (prev, next) => {
    return prev.context.done === next.context.done
        // prev.activeContext === next.activeContext &&
        // prev.context === next.context &&
        // prev.indexContext === next.indexContext;
});

const StepperMobile = (props) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation("Stepper");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const outletContext = useOutletContext()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { handleAxiosError } = useAxiosErrorHandler();

    const [ contexts, setContexts]    = React.useState(props.contexts || []);

    // function renderButtons(formik, instance, isDone, exContext, index, action, length) {
    const memoizedRenderButtons = React.useCallback(
        (formik, instance, isDone, context, indexContext, action, lengthContext, disabled, contextT) => {
            const onclick = () => {
                if (isDone && indexContext < lengthContext - 1) {
                    console.log(`context: ${context} - ${1}`)
                    handleNext()
                }
    
                else if (!isDone && indexContext <= lengthContext - 1) {
                    console.log(`context: ${context} - ${2}`)
                    formik()
                }
    
                // else if (isDone && indexContext === lengthContext - 1) {
                //     console.log(`context: ${context} - ${3}`)
                //     outletContext.check()
                // }
            }
    
    
            return (
                <Grid item sx={{ width: 1 }}>
                    <FlexBetween gap={5}>
                        <Button variant="contained"
                            disabled={indexContext === 0}
                            onClick={handlePrev}
                        >
                            Previous
                        </Button>
    
                        {loadButtons(action, onclick, disabled, contextT)}
                    </FlexBetween>
                </Grid>
            )
        },
        [handleNext, handlePrev]
    );
    
    const memoizedStepperPayload = React.useCallback((values, indexContext, indexDisplay, context) => { 
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
    }, [contexts, ])
    
    /* const renderButtons = React.useCallback((formik, instance, isDone, context, indexContext, action, lengthContext, disabled, contextT) => {


        const onclick = () => {
            if (isDone && indexContext < lengthContext - 1) {
                console.log(`context: ${context} - ${1}`)
                handleNext()
            }

            else if (!isDone && indexContext <= lengthContext - 1) {
                console.log(`context: ${context} - ${2}`)
                formik()
            }

            // else if (isDone && indexContext === lengthContext - 1) {
            //     console.log(`context: ${context} - ${3}`)
            //     outletContext.check()
            // }
        }


        return (
            <Grid item sx={{ width: 1 }}>
                <FlexBetween gap={5}>
                    <Button variant="contained"
                        disabled={indexContext === 0}
                        onClick={handlePrev}
                    >
                        Previous
                    </Button>

                    {loadButtons(action, onclick, disabled, contextT)}
                </FlexBetween>
            </Grid>
        )
    }); */

    const [activeContext, setActiveContext] = React.useState(findIndexOfDoneStep(contexts));

    const [stepperSteps, setStepperSteps] = React.useState(contexts.map((context, index) => {
        return {
            ...context,
            jsx: (
                <>
                    <MemoizedLoadableScene
                        indexContext=   {index}
                        lengthContext=  {contexts.length}
                        activeContext=  {activeContext}

                        context=        {context}
                        buttons=        {memoizedRenderButtons}
                        payload=        {memoizedStepperPayload}
                    />
                </>
            )
        }
    }))

    const resetContexts = React.useCallback((contexts) => {
        console.log(`\n\n=====> Stepper.Component --> resets : ${contexts}`)

        setStepperSteps(contexts.map((context, index) => {
            return {
                ...context,
                jsx: (<MemoizedLoadableScene

                        indexContext=   {index}
                        lengthContext=  {contexts.length}
                        activeContext=  {activeContext}

                        context=        {context}
                        buttons=        {memoizedRenderButtons}
                        payload=        {memoizedStepperPayload}
                    />
                )
            }
        }));
    })
    function findIndexOfDoneStep(arr) {
        let resultIndex = arr.length - 1;

        arr.forEach((element, index) => {
            if (!element.done) {
                resultIndex = Math.min(resultIndex, index);
            }
        });

        return resultIndex
    }
    function findIndexOfFirstErroredStep(obj, length) {
        let resultIndex = length;

        Object.entries(obj).forEach(([key, value], index) => {
            resultIndex = Math.min(resultIndex, Number(key));
        });

        return resultIndex;
    }

    function handleReset() {
        setActiveContext(0);
    };

    function handleNext() {
        setActiveContext((prevActiveStep) => prevActiveStep + 1);
    };
    function handlePrev() {
        setActiveContext((prevActiveStep) => prevActiveStep - 1);
    };

    const [renderCount, setRenderCount] = React.useState(1);
    React.useEffect(() => {
        console.log(`\n\n=====> Stepper.Component --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);


        // console.log(`\n\n=====> Stepper.Component --> activeContext : ${activeContext}`)

        return () => {
            console.log(`\n\n=====> Stepper.Component --> Unmouts : ${renderCount}`)
        }
    }, []);

    return (
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
                orientation="vertical"
                alternativeLabel={false}
                connector={<CustomConnector activeStep={activeContext} />}  // Correctly using CustomConnector
            >
                {stepperSteps?.map((step, index) => (

                    <Step key={index} completed={step?.done}>
                        <StepLabel
                            StepIconComponent={QontoStepIcon}
                            optional={
                                index === stepperSteps.length - 1 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step?.name}
                        </StepLabel>

                        <CustomStepContent
                            TransitionProps={{
                                unmountOnExit: false,
                                mountOnEnter: true,
                            }}
                        >
                            <Suspense fallback={<CircularProgress />}>
                                {step.jsx}
                            </Suspense>
                        </CustomStepContent>
                    </Step>
                ))}
            </Stepper>

        </Box>
    );
}

export default StepperMobile