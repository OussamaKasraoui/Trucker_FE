import React                from 'react';
import loadable, { lazy }   from "@loadable/component";
import Loading              from '@components/Loading.Component';

// Reusable Loadable Component for Dynamic Imports
const LoadableDisplayScene = loadable(
    (props) => import(/* webpackChunkName: "dynamic-[request]" */ `@scenes/${props.source}`),
    {
        fallback: <Loading color={"green"} />,
        cacheKey: (props) => props.source,
        // resolveComponent: (components) => components.default,
    }
);  

const DisplayScene =
    ({
        indexDisplay, display,
        indexContext, lengthContext, activeContext,
        context, buttons, payload
    }) => {
        try {

            let source = `${context.context}/${display.name}.jsx`

            if(context.context === "information") {
                source = `${context.context}`
            }

            return (
                <LoadableDisplayScene
                    key={indexDisplay}
                    source={source}

                    indexDisplay={indexDisplay}
                    display={display}

                    indexContext={indexContext}
                    lengthContext={lengthContext}
                    activeContext={activeContext}

                    context={context}
                    buttons={buttons}
                    payload={payload}
                />
            );
        } catch (error) {
            console.warn(`Failed to load component:`, error);
            return <h2> {`Failed to load component: ${context.context}/${display.name}.jsx`} </h2>;
        }
};

/* const MemoizedMainScene = React.memo(
    ({  
        indexDisplay, display, 
        indexContext, lengthContext, activeContext, 
        context, buttons, payload 
    }) => {
        try {

            return (
                <MainScene
                    key={indexDisplay}
                    source={`${context.context}/${display.name}.jsx`}

                    indexDisplay={indexDisplay}
                    display={display}

                    indexContext={indexContext}
                    lengthContext={lengthContext}
                    activeContext={activeContext}
                    
                    context={context}
                    buttons={buttons}
                    payload={payload}
                />
            );
        } catch (error) {
            console.warn(`Failed to load component:`, error);
            return <h2> { `Failed to load component: ${context.context}/${display.name}.jsx` } </h2>;
        }
    },
    (prev, next) => prev.display === next.display
); */

export default DisplayScene;