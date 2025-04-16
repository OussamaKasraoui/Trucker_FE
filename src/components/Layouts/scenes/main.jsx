import React                from 'react';
import { useLocation,
        useOutletContext}   from 'react-router-dom';
import { useTranslation, }  from 'react-i18next';
import loadable             from "@loadable/component";

import { 
       useQuery,
       useQueryClient,
       useMutation }        from '@tanstack/react-query'

import { Box, Card, 
        CardContent, 
        Typography, 
        List, ListItem, 
        Divider, useTheme,
        FormControl,
        InputLabel, 
        MenuItem, 
        IconButton,
        Select, Button }    from '@mui/material';

import { 
        Menu as MenuIcon,
        ArrowDropDownOutlined,
        }                   from "@mui/icons-material";
import MenuOpenIcon         from '@mui/icons-material/MenuOpen';

import { styled }           from '@mui/material/styles';
import Paper                from '@mui/material/Paper';
import Grid                 from '@mui/material/Grid';

import axios                from "axios";
import dayjs                from 'dayjs';

import useAxiosErrorHandler from '@services/useAxiosErrorHandler'
import http                 from '@services/user.service';
import authService          from "@services/auth.service";

import FlexBetween          from "@components/FlexBetween"
import MainLayout           from "@components/Layouts/ResponsiveBox.Layout"
import SearchWithFilters    from "@components/reuseable/InputFields/SearchWithFilters"

import { contractsDataSearchFiletrs }       from "@consts/contracts.consts"
  

const Main = (props) => {
    const {indexDisplay, display, context, buttons, payload, lengthContext, indexContext, activeContext, from} = props
    
    const { t, i18n }                   = useTranslation("agreements");
    const theme                         = useTheme();
    const location                      = useLocation();
    const queryClient                   = useQueryClient()
    const outletContext                 = useOutletContext();
    const { handleAxiosError }          = useAxiosErrorHandler();
    
    const [renderCount, setRenderCount] = React.useState(1);
    const [isLoading, setisLoading]     = React.useState(true); 
    const [agreements, setAgreements]   = React.useState([{}])

    const [showSidebar, setShowSidebar] = React.useState(true); 


    const [mainContent, setMainContent] = React.useState(<h4>Main content</h4>)

    const [sidebarContent, setSidebarContent] = React.useState(<h4>Side bar content</h4>)


    /* ----------------------------------------------------------------------------------------------------------------------------- */
    
    const query = useQuery({
        queryKey: ["agreements"],
        queryFn: async () => {
            const controller = new AbortController();
            // http.init(`/${"comingFrom/Agreements"}`)
            http.init(location.pathname)
            return await http.getXATdata('agreements', 'all', [], controller, location);
        },
        enabled: false,
    });

    React.useEffect(() => {
        console.log(`\n\n=====> Agreements [ Main ] --> renders : ${renderCount}`);
        setRenderCount((prevCount) => prevCount + 1);

        try {

            if (query.isLoading) return;

            if (query.isError) {
                handleAxiosError(query.error, {}, "agreements", outletContext, t, authService.removeCacheUser);
                return;
            }

            if (query.isFetched && query.status === "success" && !query.data?.data?.error) {
                
                if(Array.isArray(query.data?.data?.data)){
                    setAgreements(query.data.data.data)
                    console.log(`\n\n=====> Agreements [ Main ] --> Agreements :`, query.data.data.data);
                }

                setisLoading((prevState) => !prevState);

                queryClient.resetQueries({ queryKey: ['agreements'], exact: true })

                return;
            }

        } catch (error) {

            if (axios.isCancel(error)) {
                console.log("=====> Request canceled:", error.message);
            } else {
                console.error("Error fetching data:", error);
            }
        }

    }, [query.status]);

    React.useEffect(() => {
        const controller = axios.CancelToken.source();

        if(isLoading){
            query.refetch()
        }

        return () => {
            controller.cancel("Cleanup: Cancelling previous request");
        }
    }, [])

    const handleChange = (name, value) => {
    }

    const handleSearch = (query, filter) => {
        console.log("Search Query:", query);
        console.log("Selected Filter:", filter);
    };

    return (
        <>
            {/* Main Title */}
            <Box 
                className="blue"
                sx={{
                    width: 1,
                    height: 50,
                    mb: 2,
                }}
            >
                <h4>src/components/Layouts/scenes/main.jsx</h4>
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
                                // borderBottom: "solid 1px grey",
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

            {/* Main Content */}
            <Box 
                className="blue"
                sx={{
                    // border: "4px solid blue",
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
        </>
    );
};

export default Main;

                    
