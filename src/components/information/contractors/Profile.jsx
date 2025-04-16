import React from 'react';
import { useTranslation } from "react-i18next";
import { List, ListItem, ListItemText, Button, Grid, Divider, Box, Typography, TextField, FormControl, CardMedia, CardActions, InputLabel, Select, MenuItem, Avatar, Card, CardContent, FormHelperText, ButtonGroup, Stack, useMediaQuery, useTheme } from '@mui/material';
import Contractor from "./../../../assets/icons/contractorMale.png";
import authService from "@services/auth.service";
import FlexBetween from '../../FlexBetween';

const Profile = ({ values, name, indexDisplay, payload }) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation(Object.keys(values));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const user = values[0].user || {};
    const contractor = values[0].contractor || {};

    // Consolidated state management
    const [data, setData] = React.useState({
        contractors: values.contractors || [],
    });

    // Helper function to get cached context
    const getCachedData = (contextName) => {
        const cachedContexts = authService.getCacheContexts();
        const cached = cachedContexts.find((element) => element.context === contextName);
        return cached?.display[indexDisplay]?.values || [];
    };

    // Consolidated useEffect hook for all data fetching
    React.useEffect(() => {
        if (user.userPack?.packName === "Syndicate" && user.userStatus === "OnHold") {
            setData((prevData) => ({
                ...prevData,
                contractors: !prevData.contractors.length ? getCachedData("contractors") : prevData.contractors,
            }));
        }
    }, [name]);

    return (
        <Box sx={{ /* border: "1px solid blue" */ }}>
            {/* Contractor Information Section */}
            <Box
                display="flex"
                backgroundColor={theme.palette.background.dark}
                sx={{ flexDirection: isMobile ? "column" : "row" }}
            >
                {/* Image Section */}
                <Box
                    display="block"
                    sx={{
                        width: { xs: 1, sm: "20%", md: "20%" },
                        textAlign: "center"
                    }}
                >
                    <Box
                        component="img"
                        alt="profile"
                        src={Contractor}
                        height="64px"
                        width="64px"
                        borderRadius="50%"
                    />
                    <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.primary.xdarker }} // XDone
                    >
                        {t("Contractor", { ns: 'contractors' })}
                    </Typography>
                </Box>

                {/* Information Section */}
                <Grid
                    container
                    margin={0}
                    width={1}
                    rowGap={0.5}
                    columnSpacing={1}
                >
                    {/* row 1 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("contractorUser", { ns: "contractors"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                            <Typography textAlign="start" noWrap>
                                {contractor.contractorUser}
                            </Typography>
                    </Grid>

                    {/* row 2 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("contractorTitle", { ns: "contractors"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <Typography textAlign="start" noWrap>
                            {contractor.contractorTitle}
                        </Typography>
                    </Grid>

                    {/* row 3 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("contractorType", { ns: "contractors"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <FlexBetween>
                            <Typography textAlign="start" noWrap>
                                {contractor.contractorType}
                            </Typography>
                            <Typography textAlign="start" noWrap>
                                {contractor.contractorStatus}
                            </Typography>
                        </FlexBetween>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Profile;