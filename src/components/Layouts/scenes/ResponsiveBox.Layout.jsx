import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button, Box, Stack, useTheme, useMediaQuery, Typography } from '@mui/material';
import FlexBetween from '@src/components/FlexBetween';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';


const ResponsiveBox = ({mainContent, setMainContent, showSidebar, setShowSidebar, sidebarContent, setSidebarContent, sidebarSize, sidebarHeader, mainHeader}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const aquaBoxRef = useRef(null);
    const goldBoxRef = useRef(null);
    const [goldBoxHeight, setGoldBoxHeight] = useState("auto");

    // Use useCallback to memoize the resize handler
    const handleResize = useCallback(() => {
        if (aquaBoxRef.current && goldBoxRef.current) {
            const aquaHeight = aquaBoxRef.current.clientHeight;
            setGoldBoxHeight(`${aquaHeight+2}px`);
        }
    }, [aquaBoxRef, goldBoxRef]);

    useEffect(() => {
        // Create a ResizeObserver instance
        const observer = new ResizeObserver(handleResize);

        // Start observing the aquaBoxRef
        if (aquaBoxRef.current) {
            observer.observe(aquaBoxRef.current);
        }

        // Re-run the resize handler if the goldBoxHeight changes
        handleResize();

        // Cleanup: Disconnect the observer when the component unmounts
        return () => {
            observer.disconnect();
            setGoldBoxHeight("auto")
        };
    }, [handleResize, goldBoxHeight, mainContent]); // Added goldBoxHeight as a dependency

    return (
        <>
            <Stack
                direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                }}
                spacing={1}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    height: 'fit-content',
                    alignSelf: 'flex-start',
                }}
            >
                {/* Main Content */}
                <Box
                    className="gold"
                    ref={aquaBoxRef}
                    sx={{
                        display: "block",
                        position: "relative",
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: showSidebar ? `calc(${100 - sidebarSize}% - 8px)` : "100%",
                            lg: showSidebar ? `calc(${100 - sidebarSize}% - 8px)` : "100%",
                        },
                        mb: {
                            xs: 1,
                            sm: 1,
                            md: 0,
                            lg: 0,
                        },
                        flex: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "none",
                        },
                        transition: "width 1.5s ease-out, margin-right 1.5s ease-out",
                        border: `1px solid ${theme.palette.background.darker}`,
                        backgroundColor: theme.palette.background.lighter,
                        // border: "solid 2px green"
                    }}
                >
                    {/* Main Content : Header */}
                    {mainHeader && (
                        <Box
                            sx={{
                                display: "block",
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                width: 1,
                                m: 0,
                                px: 1,
                                py: 1,
                                backgroundColor: theme.palette.background.lighter,
                                // border: "solid 2px red"
                            }}
                        >
                            <Box
                                sx={{
                                    width: 1,
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: theme.palette.background.lighter,
                                    // border: "solid 2px yellow"
                                }}
                            >
                                <FlexBetween>
                                    <Typography variant='h5' fontWeight={"bold"}>
                                        {mainHeader}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            width: 1,
                                        }}
                                    >
                                        {[{
                                            text: 'Add', Icon: AddIcon}, {
                                            text: 'Edit', Icon:DeleteIcon}, {
                                            text: 'Delete', Icon: EditIcon}].map(({text, Icon}) => (
                                            <Button key={text}
                                                // variant="contained"
                                                // color="primary"
                                                size="small"
                                                startIcon={<Icon />}
                                            >
                                                {text}
                                            </Button>
                                        ))}
                                    </Stack>
                                </FlexBetween>
                            </Box>
                        </Box>
                    )}

                    {/* Main Content */}
                    <Box
                        sx={{
                            position: "relative",
                            display: "block",
                            width: 1,
                            m: 0,
                            px: 0,
                            // border: "solid 2px blue"
                        }}
                    >
                        {mainContent}
                    </Box>

                </Box>

                {/* Sidebar */}
                <Box
                    className="gold"
                    ref={goldBoxRef}
                    sx={{
                        px: 0,
                        py: 0,
                        display: "block",
                        height: isMobile ? "auto" : goldBoxHeight,
                        maxHeight: isMobile ? "50vh" : "unset",
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: `${sidebarSize}%`,
                            lg: `${sidebarSize}%`,
                        },
                        flex: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "none",
                        },
                        opacity: showSidebar ? 1 : 0,
                        overflow: "auto",
                        transition: "opacity 1.5s ease-out, width 1.5s ease-out",
                        border: `1px solid ${theme.palette.background.darker}`,
                        backgroundColor: theme.palette.background.lighter,
                        // border: "solid 2px green"
                    }}
                >
                    <Box
                        sx={{
                            display: "block",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: 1,
                            m: 0,
                            px: 1,
                            py: 1,
                            backgroundColor: theme.palette.background.lighter,
                            // border: "solid 2px red"
                        }}
                    >
                        {/* Sidebar Header */}
                        {sidebarHeader && (
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.background.lighter,
                                    // border: "solid 2px yellow"
                                }}
                            >
                                <FlexBetween>
                                    <Typography variant='h5' fontWeight={"bold"}>
                                        {sidebarHeader}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            width: 1,
                                        }}
                                    >
                                        {[{
                                            text: '', Icon: CachedIcon}].map(({text, Icon}) => (
                                            <Button key={text}
                                                // variant="contained"
                                                // color="primary"
                                                size="small"
                                                startIcon={<Icon />}
                                            >
                                                {text}
                                            </Button>
                                        ))}
                                    </Stack>
                                </FlexBetween>
                            </Box>
                        )}
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            display: "block",
                            width: 1,
                            m: 0,
                            px: 0,
                            // border: "solid 2px blue"
                        }}
                    >
                        {/* Sidebar Content */}
                        {sidebarContent}
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default ResponsiveBox;