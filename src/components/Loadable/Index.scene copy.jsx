import React                    from 'react';
import { useLocation }          from 'react-router-dom';
import { useTranslation, }      from 'react-i18next';

import { Box, useTheme }        from '@mui/material';

import ErrorBoundary            from "@components/ErrorBoundary";

import DisplayScene             from "@src/components/Loadable/Display.scene"

import useFormContext           from "@services/useFormContext";

const Scene = (props) => {
    const theme                         = useTheme();
    const location                      = useLocation();

    const { context, 
            buttons,
            payload,  
            activeContext,
            indexContext,
            lengthContext, }            = useFormContext(props, location.state)

    const { t, i18n }                   = useTranslation(context.context);


    const [renderCount, setRenderCount] = React.useState(1);
    const display = React.useMemo(() => context.display || [], [context.display]);

    React.useEffect(() => {
        console.log(`\n\n=====> Scene:${context.context}[ Index ] --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);
    }, [i18n, i18n.language])


    return (
        <>        
        <ErrorBoundary source={context.context}>
            <Box
                className="yellow"
                justifyItems={"center"}
                sx={{
                    width: "100%",
                }}
            >

            {/* Render components dynamically based on the display array */}
            {
                Array.isArray(display) ?
                display.map((contextDisplay, indexDisplay) => {
                    try {

                        // const LoadableScene = contextDisplay.name === "form" ? FormScene : MainScene;
        
                        return (
                            <DisplayScene //DynamicDisplay
                                key={indexDisplay} // Ensure unique key for each rendered component

                                indexDisplay={indexDisplay} // Ensure unique key for each rendered component
                                display={contextDisplay}
        
                                indexContext={indexContext}
                                lengthContext={lengthContext}
                                activeContext={activeContext}

                                context={context}
                                buttons={buttons}
                                payload={payload}
                            />
                        );
                    } catch (error) {
                        console.warn(`Failed to load component "${contextDisplay}":`, error);
                        return null; // Safely ignore if the component import fails
                    }
                })
                :
                <Box>
                    display is empty
                </Box>
            }

            </Box>
        </ErrorBoundary>
        </>
    );
}
// React.memo(, (prev, next) =>  prev.updated === next.updated);

export default Scene;