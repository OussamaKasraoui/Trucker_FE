import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children, source }) {
    const [hasError, setHasError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (hasError) {
            // Log to the console (for development)
            console.error("ErrorBoundary caught an error", error, errorInfo);

            // Send to an error tracking service (for production)
            if (process.env.NODE_ENV === 'production') {
                // Example using a hypothetical error tracking service:
                // errorTrackingService.logError(error, errorInfo);
                // Sentry.captureException(error, { extra: errorInfo });
            }
        }
    }, [hasError]);

    const staticGetDerivedStateFromError = (error) => {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    const componentDidCatch = (error, errorInfo) => {
        setError(error);
        setErrorInfo(errorInfo);
        setHasError(true);
    }

    if (hasError) {
        return (
            <div className="error-boundary-fallback">
                <h2>Oops! Something went wrong.</h2>
                <p>There was an error in the {source} component.</p>
                <button onClick={() => window.location.reload()}>
                    Try Reloading
                </button>
                {/* <a href="/support">Contact Support</a> */}
            </div>
        );
    }

    return children;
}

export default ErrorBoundary;


// import React from 'react';

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     static getDerivedStateFromError(error) {
//         // Update state so the next render will show the fallback UI.
//         return { hasError: true };
//     }

//     componentDidCatch(error, errorInfo) {
//         // You can also log the error to an error reporting service
//         console.error("ErrorBoundary caught an error", error, errorInfo);
//     }

//     render() {
//         if (this.state.hasError) {
//             // You can render any custom fallback UI
//             return <h1>Something went wrong in {this.props.source}.</h1>;
//         }

//         return this.props.children; 
//     }
// }

// export default ErrorBoundary;