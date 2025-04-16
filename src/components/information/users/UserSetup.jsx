import React from 'react';
import { Box, CardMedia, Stack, Typography, Grid, useMediaQuery } from '@mui/material';
import successSVG from "./../../../assets/shapes/setupComplete.svg";
// import authService from '@services/auth.service';

const UserSetup = ({ values, theme, t, name }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
    <>
        <h1>Ha ana !</h1>

        <Box
            width={isSmallScreen ? "90%" : "80%"}
            display={isSmallScreen ? "block" : "flex"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={theme.palette.background.main} // # Done
            sx={{
                borderRadius: "10px",
                padding: "10px",
                margin: "10px 0px",
                // borderColor: "silver",
                // borderStyle: "solid",
                // borderWidth: "1px",
                // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
                <CardMedia component="img" image={successSVG} alt="Success" sx={{ width: "auto", height: 150 }} />
                <Grid container spacing={1} columns={12} justifyContent="center" alignItems="center">
                    <Typography variant="informationSecondary">{values?.body ? values?.body : null}</Typography>
                </Grid>
            </Stack>
        </Box>
    </>
    );
}

export default UserSetup;
