import React from 'react';
import { useTranslation }           from "react-i18next";
import { useSelector } from 'react-redux';
import { Box, Avatar, Typography, useTheme, Grid, useMediaQuery } from '@mui/material';
import avatar1 from "./../../../assets/avatarImages/Ellipse 31.png";
import FlexBetween from '../../FlexBetween';
import { useAuth } from "@services/useAuth"; // Custom hook for handling user and token state

const UserProfile = ({ values, display }) => {
    const theme                   = useTheme();
    const { t, i18n }   = useTranslation(["users", "contractors"]);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobile      = useMediaQuery(theme.breakpoints.down('sm'));
    const loggedUser          = useSelector((state) => state.auth.user);

    const { user, setUser,
        token, setToken } = useAuth();


    const userInfo = values[0] || user;


    return (
    <Box>
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
                    src={avatar1}
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
                        {`${t("userName")}:`}
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                        <Typography textAlign="start" noWrap>
                            {userInfo?.userFirstName} {userInfo?.userLastName}
                        </Typography>
                </Grid>

                {/* row 2 */}
                <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                    <Typography textAlign="start" >
                        {`${t("userPhone")}:`}
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                    <Typography textAlign="start" noWrap>
                        {userInfo?.userPhone}
                    </Typography>
                </Grid>

                {/* row 3 */}
                <Grid item xs={3} sm={3} md={3} lg={4} height={"max-content"}>
                    <Typography textAlign="start" >
                        {`${t("userEmail")}:`}
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={8} height={"max-content"}>
                    <FlexBetween>
                    </FlexBetween>
                        <Typography textAlign="start" noWrap>
                            {userInfo?.userEmail}
                        </Typography>
                        <Typography textAlign="start" noWrap>
                            {userInfo?.userStatus}
                        </Typography>
                </Grid>
            </Grid>
        </Box>
    </Box>
    );
}

export default UserProfile;