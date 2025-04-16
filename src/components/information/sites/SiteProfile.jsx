import React                        from 'react';
import { useTranslation }           from "react-i18next";

import { List, ListItem, ListItemText, Button, Grid, Divider, Box,
Typography, TextField, FormControl, CardMedia, CardActions,
InputLabel, Select, MenuItem, Avatar, Card, CardContent,
FormHelperText, ButtonGroup, Stack,
useMediaQuery, useTheme }           from '@mui/material';

import Site from "./../../../assets/icons/siteLocation.png"
import Buildings from "./../../../assets/icons/siteFrontComplex.png"
import Contractor from "./../../../assets/icons/contractorMale.png"

import buildingsIcon from "./../../../assets/buildingsIcon.svg";
import authService from "@services/auth.service";
import FlexBetween from '../../FlexBetween';

const SiteProfile = ({ values, name, indexDisplay, payload }) => {
    const theme         = useTheme();
    const { t, i18n }   = useTranslation(Object.keys(values));
    const isMobile      = useMediaQuery(theme.breakpoints.down('sm'));
    
    const user          = values[0].users
    const contractor    = values[0].contractors
    const contract      = values[0].contracts[0]
    const site          = values[0].sites[0]
    const buildings     = values[0].buildings
    const apartment     = values[0].apartments[0]

    // Consolidated state management
    const [data, setData] = React.useState({
        contracts: values.contracts || [],
        apartments: values.apartments || [],
        buildings: values.buildings || [],
        contracts: values.contracts || [],
        sites: values.sites || []
    });

    // Helper function to get cached context
    const getCachedData = (contextName) => {
        const cachedContexts = authService.getCacheContexts();
        const cached = cachedContexts.find((element) => element.context === contextName);
        return cached?.display[indexDisplay]?.values || [];
    };

    const BuildingRow = ({ data, isMobile, rowClass }) => (
        <>
            <Grid minHeight={isMobile ? 0.25 : "auto"} item xs={3} sm={3} md={3} lg={3} /* className={rowClass} */>
                <Typography>
                    { data.buildingName }
                </Typography>
            </Grid>

            <Grid minHeight={isMobile ? 0.25 : "auto"} item xs={3} sm={3} md={3} lg={3} /* className={rowClass} */>
                <Typography>
                    { data.buildingPrefix }
                </Typography>
            </Grid>

            <Grid minHeight={isMobile ? 0.25 : "auto"} item xs={3} sm={3} md={3} lg={3} /* className={rowClass} */>
                <Typography>
                    { data.buildingFloors }
                </Typography>
            </Grid>

            <Grid minHeight={isMobile ? 0.25 : "auto"} item xs={3} sm={3} md={3} lg={3} /* className={rowClass} */>
                <Typography>
                    { data.buildingAptPerFloor }
                </Typography>
            </Grid>

        </>
    );
    

    // Consolidated useEffect hook for all data fetching
    React.useEffect(() => {
        if (user.userPack.packName === "Syndicate" &&
            user.userStatus === "OnHold"
        ) {

            setData((prevData) => ({
                ...prevData,
                contracts:  !prevData.contracts.length  ? getCachedData("contracts")    : prevData.contracts,
                sites:      !prevData.sites.length      ? getCachedData("sites")        : prevData.sites,
                buildings:  !prevData.buildings.length  ? getCachedData("buildings")    : prevData.buildings,
                apartments: !prevData.apartments.length ? getCachedData("apartments")   : prevData.apartments,
            }));
        } 
    }, [name]);

    return (
        <Box 
            sx={{
                // border: "1px solid blue"
            }}
        >
            {/* Syndic Information Section */}
            <Box
                display="flex"
                backgroundColor={theme.palette.background.dark}
                sx={{ 
                    flexDirection: isMobile ? "column" : "row" 
                }}
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
                        { t("Manager", { ns: 'contractors' }) }
                    </Typography>
                </Box>

                {/* Information Section */}
                <Grid
                    container
                    // columns={12}
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

            <Divider sx={{
                my: 1
            }}/>
            
            {/* Site Information Section */}
            <Box
                display="flex"
                backgroundColor={theme.palette.background.dark}
                sx={{ 
                    flexDirection: isMobile ? "column" : "row",
                }}
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
                        src={Site}
                        height="64px"
                        width="64px"
                        borderRadius="50%"
                    />
                    <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.primary.xdarker }} // XDone
                    >
                        { t("Site", { ns: "sites"}) }
                    </Typography>
                </Box>

                {/* Information Section */}
                <Grid
                    container
                    columns={12}
                    margin={0}
                    width={1}
                    rowGap={0.5}
                    columnSpacing={1}
                >
                    {/* row 1 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("siteName", { ns: "sites"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <FlexBetween>
                            <Typography textAlign="start" noWrap>
                                {site.siteName}
                            </Typography>
                            <Typography textAlign="start" noWrap>
                                {site.sitePrefix}
                            </Typography>
                        </FlexBetween>
                        <Typography textAlign="start" noWrap>
                            {site.siteDetails}
                        </Typography>
                    </Grid>

                    {/* row 2 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("siteAddress", { ns: "sites"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <Typography textAlign="start" noWrap>
                            {site.siteAddress}
                        </Typography>
                        <Typography textAlign="start" noWrap>
                            {site.siteCity}
                        </Typography>
                    </Grid>

                    {/* row 3 */}
                    <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                        <Typography textAlign="start" >
                            {t("siteType", { ns: "sites"})}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <Typography textAlign="start" noWrap>
                            {site.siteType}
                        </Typography>
                        <Typography textAlign="start" noWrap>
                            {site.siteStatus}
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Box>

            <Divider sx={{
                my: 1
            }}/>

            {/* Buildings Information Section */}
            <Box
                display="flex"
                backgroundColor={theme.palette.background.dark}
                sx={{ 
                    flexDirection: isMobile ? "column" : "row",
                }}
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
                        src={Buildings}
                        height="64px"
                        width="64px"
                        borderRadius="50%"
                    />
                    <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.primary.xdarker }} // XDone
                    >
                        { t("Buildings", { ns: "buildings"}) }
                    </Typography>
                </Box>

                <Box
                    display={isMobile ? "block" : "flex"}
                    sx={{
                        width: 1,
                    }}
                >
                    {/* row 1 */}
                    <Grid 
                        container
                        // columns={12}
                        margin={0}
                        width={1}
                        rowGap={0.5}
                        columnSpacing={1}
                    >
                        <BuildingRow 
                            isMobile={isMobile}
                            data={{
                                buildingName: t('buildingName', { ns: "buildings"}),
                                buildingPrefix: t('buildingPrefix', { ns: "buildings"}),
                                buildingFloors: t('buildingFloors', { ns: "buildings"}),
                                buildingAptPerFloor: t('buildingAptPerFloor', { ns: "buildings"}),
                            }}
                        />

                        {buildings?.length > 0 && buildings.map((building, index) => (
                            <BuildingRow 
                                key={index} 
                                data={building} 
                                isMobile={isMobile}
                            />
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default SiteProfile;