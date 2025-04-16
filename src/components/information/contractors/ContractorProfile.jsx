import React from 'react';
import { useTranslation } from "react-i18next";
import { Box, Avatar, Typography, Grid, Divider, useMediaQuery } from '@mui/material';
import avatar1 from "./../../../assets/avatarImages/Ellipse 31.png";

const ContractorProfile = ({ values, theme, name }) => {
    const { t, i18n } = useTranslation("users");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const user = values.user;
    const contractor = values.contractor;

    return (
        <>
            <Grid
                className='yellow'
                textAlign={"-webkit-center"}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Box
                    // width={isSmallScreen ? "95%" : "90%"}
                    backgroundColor={theme.palette.background.dark} // # Done
                    sx={{
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "10px 0px",
                        borderColor: "silver",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >

                    {/* <Box className='green'> */}

                        {/* <Box display={"flex"} className="blue">
                            <Grid item xs={6}>
                                <Typography textAlign={"start"} fontWeight="bold">{
                                    contractor?.contractorTitle === user?.userEmail ?
                                    contractor?.contractorUser :
                                    contractor?.contractorTitle
                                }</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography textAlign={"end"} fontWeight="bold">{contractor?.contractorType}</Typography>
                            </Grid>

                        </Box> */}
                        <Box
                            className='red'
                            display={isSmallScreen ? "block" : "flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >

                            <Grid
                                className='purple'
                                spacing={1}
                                columns={12}
                                justifyContent="center"
                                alignItems="center"
                                minHeight={100}
                                textAlign={"-webkit-center"}
                            >
                                <Grid item xs={12}>
                                    <Avatar
                                        alt="avatar"
                                        src={avatar1}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            border: `solid 3px ${theme.palette.secondary.main}`
                                        }}
                                    />
                                </Grid>

                                {/* <Grid item xs={12}>
                            <Typography textAlignt={"center"} noWrap>
                                {user?.userFirstName} {user?.userLastName}
                            </Typography>
                        </Grid> */}

                                <Grid item xs={12}>
                                    <Typography textAlign={"center"} noWrap>{user?.userStatus}</Typography>
                                </Grid>
                            </Grid>


                            <Grid
                                className='pink'
                                container
                                item
                                spacing={1}
                                columns={12}
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    m: 0,
                                    p: 0,
                                    width: '100%'
                                }}
                            >
                                <Grid item xs={6}>
                                    <Typography textAlign={"start"} fontWeight="bold">{
                                        contractor?.contractorUser
                                    }</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography textAlign={"end"} fontWeight="bold">{contractor?.contractorType}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography textAlign={"start"} fontWeight="bold">{
                                        contractor?.contractorTitle
                                    }</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography textAlign={"start"} fontWeight="bold">{contractor?.contractorPhone}</Typography>
                                </Grid>

                                {/* <Grid item xs={4}><Typography textAlign={"end"} fontWeight="bold">Full name:</Typography></Grid>
                                <Grid item xs={8}><Typography textAlign={"start"} noWrap>{user?.userFirstName} {user?.userLastName}</Typography></Grid> */}

                                {/* <Grid item xs={4}><Typography textAlign={"end"} fontWeight="bold">Phone Number:</Typography></Grid>
                                <Grid item xs={8}><Typography textAlign={"start"} noWrap>{user?.userPhone}</Typography></Grid> */}

                                {/* <Grid item xs={4}><Typography textAlign={"end"} fontWeight="bold">Email Address:</Typography></Grid>
                                <Grid item xs={8}><Typography textAlign={"start"} noWrap>{user?.userEmail}</Typography></Grid> */}

                                {/* <Grid item xs={4}><Typography textAlign={"end"} fontWeight="bold">Status:</Typography></Grid>
                                <Grid item xs={8}><Typography textAlign={"start"} noWrap>{user?.userStatus}</Typography></Grid> */}
                            </Grid>

                        </Box>

                    {/* </Box> */}

                </Box>
            </Grid>
        </>
    );
}

export default ContractorProfile;