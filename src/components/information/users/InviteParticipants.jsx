import React from 'react';
import { Box, Stack, Typography, Avatar, Grid, Divider, useMediaQuery } from '@mui/material';
// import authService from '@services/auth.service';
// import avatar1 from "./../../assets/avatarImages/Ellipse 31.png";
import siteLogo from "./../../../assets/shapes/siteLogo.svg";

const InviteParticipants = ({ values, theme, t, name }) => {
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const cacheContexts = authService.getCacheContexts();
    const contexts = {}; // Populate contexts from cacheContexts here

    return (
        <Box
            width="auto"
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
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Avatar src={siteLogo} sx={{ width: 100, height: 100 }} />
                <Typography fontWeight="bold">{`${contexts?.sites[0]?.siteType} ${contexts?.sites[0]?.name}`}</Typography>
            </Stack>
            <Grid container spacing={1} columns={12} justifyContent="space-between">
                {/* Additional fields */}
            </Grid>
            <Divider />
            {/* Manager section */}
        </Box>
    );
}

export default InviteParticipants;
