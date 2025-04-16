import { useMemo } from "react";

/**
 * Custom hook to extract specific keys with non-undefined values 
 * from either props or state.
 * 
 * @param {Object} props - The props object to search for keys.
 * @param {Object} state - The state object to search for keys.
 * @returns {Object}     - An object containing only keys with non-undefined values.
 **/

const useFormContext = (_props = {}, state = {}) => {
    // Validation function for checking if an argument is a valid object
    const isValidObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);

    return useMemo(() => {
        try {
            // distructure scene from props then remove it from props
            const { scene, title, ...props } = _props;

            // Early return if validation fails
            if (!Object.keys(props).length && !isValidObject(state)) {
                console.warn("Invalid arguments passed to useFormContext. Both props and state should be objects.");
                return {
                    context: {
                        name: title,
                        context: scene,
                        display: [{
                            name: "main",
                            dependency: {},
                            values: [],
                        }],
                    },
                    
                    indexContext: undefined,
                    lengthContext: undefined,
                    activeContext: undefined,

                    buttons: undefined,
                    payload: undefined,
                };
            }

            // Keys to check in both objects
            const keysToExtract = ["context", "buttons", "payload", "indexContext", "lengthContext", "activeContext"];

            // Object to store the result
            const result = {};

            // Loop through the keys and assign values from props or state
            keysToExtract.forEach((key) => {
                if (props[key] !== undefined) {
                    result[key] = props[key];
                } else if (state[key] !== undefined) {
                    result[key] = state[key];
                }
            });

            return result;
        } catch (error) {
            console.error("Error in useFormContext:", error);
            return {}; // Return an empty object on error to prevent crashes
        }
    }, [_props, state]);
};

export default useFormContext;
