import React                    from 'react';
import { useLocation, 
        useOutletContext }      from 'react-router-dom';
import { useTranslation, }      from 'react-i18next';
import { useSelector }          from 'react-redux'

import {useQuery,
        useMutation}            from '@tanstack/react-query'

import { Box, 
        Typography,
        useTheme, 
        IconButton,
        useMediaQuery }         from '@mui/material';

import { Menu as MenuIcon,
        ArrowDropDownOutlined } from "@mui/icons-material";
    
import MenuOpenIcon             from '@mui/icons-material/MenuOpen';

import { cloneObject }          from "@services/helpers";
import http                     from '@services/user.service'
import useAxiosErrorHandler     from '@services/useAxiosErrorHandler'

import ErrorBoundary            from "@components/ErrorBoundary";
import { notify }               from '@components/Notifications.Component';
import FlexBetween              from '@components/FlexBetween';
import MainLayout               from "@src/components/Layouts/scenes/ResponsiveBox.Layout"
import SearchWithFilters        from "@components/reuseable/InputFields/SearchWithFilters"

import { 
    contractsDataSearchFiletrs} from "@consts/contracts.consts"




const TwofasMain = React.memo((props) => {
    const { indexDisplay, display, context, buttons, payload, lengthContext, indexContext, activeContext, from } = props;

    const theme                         = useTheme();
    const outletContext                     = useOutletContext();
    const { handleAxiosError }              = useAxiosErrorHandler();
    const { t, i18n }                       = useTranslation("sites");
    const location                          = useLocation();
    const isMobile                          = useMediaQuery(theme.breakpoints.down('sm'));

    const loggedUser                        = useSelector((state) => state.auth.user);
    const loggedContractor                  = useSelector((state) => state.auth.contractor);
    const loggedStaff                       = useSelector((state) => state.auth.staff);

    const [action, setAction]               = React.useState(display.action || []);
    const [done, setDone]                   = React.useState(display.done || false);
    const [loaded, setLoaded]               = React.useState(!done);
    const [instance, setInstance]           = React.useState(0)
    const [renderCount, setRenderCount]     = React.useState(1);

    const [isLoading, setisLoading]     = React.useState(true); 
    const [agreements, setAgreements]   = React.useState([{}])

    const [showSidebar, setShowSidebar] = React.useState(true); 


    const [mainContent, setMainContent] = React.useState(<h4>Main content</h4>
        /* display.map((componentName, index) => {
            return <h4>Main content {index}</h4>
            try {
                // Dynamically import the component
                const DynamicComponent = loadable(() =>
                    import(`./${componentName}`)
                );

                return (
                    <DynamicComponent
                        key={componentName} // Ensure unique key for each rendered component
                        context={context}
                        buttons={buttons}
                        payload={payload}
                        index={indexContext}
                        length={lengthContext}
                        activeContext={activeContext}
                    />
                );
            } catch (error) {
                console.warn(`Failed to load component "${componentName}":`, error);
                return null; // Safely ignore if the component import fails
            } 
        })*/
    )

    const [sidebarContent, setSidebarContent] = React.useState(<h4>Side bar content</h4>
        /* display.map((componentName, index) => {
            return <h4>Side bar content {index}</h4>
            try {
                // Dynamically import the component
                const DynamicComponent = loadable(() =>
                    import(`./${componentName}`)
                );

                return (
                    <DynamicComponent
                        key={componentName} // Ensure unique key for each rendered component
                        context={context}
                        buttons={buttons}
                        payload={payload}
                        index={index}
                        length={length}
                        activeContext={activeContext}
                    />
                );
            } catch (error) {
                console.warn(`Failed to load component "${componentName}":`, error);
                return null; // Safely ignore if the component import fails
            }
        }) */
    )

    const query = useQuery({
        queryKey: ['twofas'],
        queryFn: async () => {
            const controller = new AbortController();
            // http.init(`/${"comingFrom/Twofas"}`)
            http.init(location.pathname)
            return await http.getXATdata("twofas", "resend", { twoFAUser: loggedUser.id }, controller, location);
        },
        enabled: false,
    });

    const mutation = useMutation({
        mutationKey: "sites",
        mutationFn: ({ values, formik }) => {
            // http.init(`/${"comingFrom/Twofas"}`)
            http.init(location.pathname)
            
            return http.postXATdata("sites", display.action, {
                formData: values["sites"],
                contractor: loggedContractor.id,
                staff: loggedStaff.id,
                user: loggedUser.id,
            })
        },
        onMutate: () => {
            console.log('Mutation in progress...')
      
            // Optionally return a context containing data to use when for example rolling back
            return { name: "sites" }
        },
        onError: (error, { values, formik }) => {
            handleAxiosError(error, formik, "sites", outletContext, t, () => {})
        },
        onSuccess: (data, { values, formik }) => {
            const response = data.data;

            if (response.error && Array.isArray(response.data)) {

                response.data.forEach((element, index) => {
                    if(element.error) {
                        formik.setFieldError(`${"sites"}.${index}`, element.data, )
                    } else {
                        formik.setFieldValue(`${"sites"}.${index}`, element.data, false)
                    }
                })

            } else {
                notify(response.message.notificationType, response.message.notificationText, i18n.dir());
                const _payload = []

                // formik.setValues(response.data.map((element, index) => {
                formik.setFieldValue("sites", response.data.map((element, index) => {
                    _payload.push(element.data)
                    
                    return cloneObject(values[index], element.data)
                }), false)

                payload(_payload, indexContext, indexDisplay, "sites")
            }
        },
    });


    React.useEffect(() => {
        console.log(`\n\n=====> Sites [ Index ] --> renders : ${renderCount}`)
        setRenderCount((prevCount) => prevCount + 1);
    }, [i18n, i18n.language])

    const handleChange = (name, value) => {
    }

    const handleSearch = (query, filter) => {
        console.log("Search Query:", query);
        console.log("Selected Filter:", filter);
    };


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
                {/* Main Title + Search bar */}
                <Box 
                    className="blue"
                    sx={{
                        border: "2px blue solid",
                        width: 1,
                        height: 50,
                        mb: 2,
                    }}
                >
                    <FlexBetween>
                        <Box>
                            <Typography variant='h5' fontWeight={"bold"}>
                                {context.name}
                            </Typography>
                        </Box>

                        <Box 
                            sx={{
                                display: "flex"
                            }}
                        >
                            <SearchWithFilters filters={contractsDataSearchFiletrs} onSearch={handleSearch} />

                            {/* Toggle Sidebar Button */}
                            <Box 
                                sx={{
                                    p: 0,
                                    width: 60,
                                    minWidth: 60,
                                    textAlign: "center",
                                    alignContent: "center",
                                    borderBottom: "solid 1px grey",
                                }}
                            >
                                <IconButton onClick={() => setShowSidebar((prev) => !prev)}>
                                    {showSidebar ?
                                    <MenuOpenIcon /> :
                                    <MenuIcon />}
                                </IconButton>

                            </Box>
                        </Box>
                    </FlexBetween>

                </Box>

                {/* Main Content + Sidebar */}
                <Box 
                    className="blue"
                    sx={{
                        border: "2px solid blue",
                        // py: 1,
                        width: 1,
                        mb: 2,
                        // backgroundColor: theme.palette.background.dark
                    }}
                >
                    <MainLayout 
                        mainContent={mainContent}       setMainContent={setMainContent} 
                        showSidebar={showSidebar}       setShowSidebar={setShowSidebar}
                        sidebarContent={sidebarContent} setSidebarContent={setSidebarContent}
                        sidebarSize={30}                sidebarHeader={true}
                    />

                </Box> 
            </Box>
        </ErrorBoundary>
        </>
    );
}, (prev, next) =>  prev.updated === next.updated);

export default TwofasMain;