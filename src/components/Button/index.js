import loadable from "@loadable/component";
import LoadedButton from "./Button";

/**
 * Dynamically imports button components based on an array of names.
 * 
 * @param {object}   formik   - Object containing formik properties or onClick action in handleSubmit [key].
 * @param {string[]} instance - Array of button component names.
 * @param {string[]} isDone   - Array of button component names.
 * @param {string[]} context  - Array of button component names.
 * @param {string[]} index    - Array of button component names.
 * @param {string[]} actions  - Array of button component names.
 * @param {string[]} length   - Array of button component names.
 * @param {string[]} disabled - Array of button component names.
 * @param {string[]} contextT - Array of button component names.
 * 
 * @returns {Object} - Object containing dynamically imported button components.
 */
// const loadButtons = (formik, instance, isDone, context, index, actions, length, disabled, contextT) => {
const loadButtons = (actions, onClick, disabled, contextT) => {
    
    if(Array.isArray(actions) && actions.length){

        return actions?.map((action, actionIndex) => {
                try {

                    return(<LoadedButton
                        key={actionIndex}
                        // formik={formik}
                        // instance={instance}
                        // isDone={isDone}
                        // exContext={context}
                        // index={index}
                        // length={length}
                        action={action}
                        onClick={onClick}
                        disabled={disabled}
                        contextT={contextT}
                        
                    />)

                } catch (error) {
                    console.warn(`Failed to load button component "${action}":`, error);
                    return null; // Prevent crashes
                }
            });
    }

    return undefined    
};


export default loadButtons;