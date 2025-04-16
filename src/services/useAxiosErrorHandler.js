import { useCallback } from 'react';
import axios from 'axios';

const useAxiosErrorHandler = () => {
    /**
     * Handles Axios errors and optionally updates Formik errors
     * @param {Object} error - The Axios error object
     * @param {Object} formik - Formik object to handle form field errors (optional)
     */
    const handleAxiosError = useCallback((error, formik, context, outletContext, t, myCallBack) => {

        if (axios.isAxiosError(error)) {

            switch (error.code) {
                case 'ERR_BAD_REQUEST':

                    if (error?.response?.status === 401) {
                        outletContext.setOpenModal(true)
                        outletContext.setError(error)
                    }
                    else if (error?.response?.status === 403) {
                        outletContext.setOpenModal(true)
                        outletContext.setError(error)
                        myCallBack()
                    }
                    else if (error?.response?.status === 422) {
                        outletContext.setLoaded(false)
                    }
                    // If the response contains validation errors and formik is provided
                    else if (formik && error.response?.data?.data) {

                        const errorKeys = []
                        
                        if(Array.isArray(error.response?.data?.data) && error.response?.data?.data?.length){
                            
                            error.response.data.data.forEach((element, index) => {
                                if(element.error) {
                                    // formik.setFieldError(`${context}.${index}`, t(element.data),)
                                    for (const [key, value] of Object.entries(element.data)) {
                                        errorKeys.push(key);

                                        formik.setFieldError(`${context}.${index}.${key}`, t(value),)
                                    }
                                }
                            })
                        }
                        else if(typeof error.response?.data?.data == 'object' && error.response?.data?.data?.length){
                            formik.setFieldError(context, t(error.response.data.data))
                        }
                        else {
                            outletContext.setOpenModal(true)
                            outletContext.setError(error)
                        }

                        myCallBack(errorKeys);

                    } else {
                        console.error('Bad request:', error.response?.data?.message || error.message);
                    }
                break;

                case 'ERR_BAD_RESPONSE':

                    outletContext.setOpenModal(true)
                    outletContext.setError(error)

                    console.error('Request timed out:', error.message);
                    break;

                case 'ECONNABORTED':

                    outletContext.setOpenModal(true)
                    outletContext.setError(error)

                    console.error('Request timed out:', error.message);
                    break;

                case 'ENOTFOUND':
                    console.error('Server not found:', error.message);
                    break;

                case 'ERR_NETWORK':

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('Network error:', error.message);
                    break;

                case 'ERR_FR_TOO_MANY_REDIRECTS':

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('Too many redirects:', error.message);
                    break;

                case 'ERR_CANCELED':

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('Request canceled:', error.message);
                    break;

                case 'ECONNREFUSED':

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('Connection refused:', error.message);
                    break;

                case 'EAI_AGAIN':

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('Temporary DNS resolution issue:', error.message);
                    break;

                default:

                outletContext.setOpenModal(true)
                outletContext.setError(error)

                    console.error('An unexpected error occurred:', error.message);
                    break;
            }

        } else {
            // Handle non-Axios errors
            console.error('Non-Axios error:', error);
        }
    }, []);

    return { handleAxiosError };
};

export default useAxiosErrorHandler;
