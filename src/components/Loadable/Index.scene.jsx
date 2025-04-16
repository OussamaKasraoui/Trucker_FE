import React                from 'react';
import { useTranslation }   from 'react-i18next';
import { useLocation }      from 'react-router-dom';

import { Box, useTheme }    from '@mui/material';

import ErrorBoundary        from "@components/ErrorBoundary";
import DisplayScene         from "@components/Loadable/Display.scene";

import useFormContext       from "@services/useFormContext";

const Scene = (props) => {
    const theme = useTheme();
    // const { t } = useTranslation(context.context);
    // const { contexts } = useContexts(); // Access contexts from the context
    
    const location              = useLocation();

    const { context, 
            buttons,
            payload, 
            indexContext,
            lengthContext, 
            activeContext, }    = useFormContext(props, location.state, props.scene)

    const displays = React.useMemo(() => context.display || [], [context.display]);

    return (
        <>
            <ErrorBoundary source={context.context}>
                <Box className="yellow" justifyItems={"center"} sx={{ width: "100%" }}>
                    {displays.map((contextDisplay, indexDisplay) => (
                        <DisplayScene

                            key={indexDisplay}
                            indexDisplay={indexDisplay}
                            display={contextDisplay}

                            indexContext={indexContext}
                            lengthContext={lengthContext}
                            activeContext={activeContext}

                            context={context}
                            buttons={buttons}
                            payload={payload}

                            // {...props} // Pass other props to DisplayScene
                        />
                    ))}
                </Box>
            </ErrorBoundary>
        </>
    );
};

export default React.memo(Scene); // Memoize the Scene component
