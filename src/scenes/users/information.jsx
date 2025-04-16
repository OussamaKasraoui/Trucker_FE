import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import {
    useNavigate,
    useLocation,
    useOutletContext
} from 'react-router-dom';
import { useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
    EmailShareButton,
    EmailIcon,
    TwitterShareButton,
    XIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    ViberShareButton,
    ViberIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon
} from "react-share";


import {
    Button, Grid, Divider, Box,
    Typography, TextField, FormControl, CardMedia, CardActions,
    InputLabel, Select, MenuItem, Avatar, Card, CardContent,
    FormHelperText, ButtonGroup, Stack,
    useMediaQuery, useTheme
} from '@mui/material';

import http from '@services/user.service'
import authService from '@services/auth.service'
import { cloneObject } from "@services/helpers";
import { notify } from '@components/Notifications.Component';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FlexBetween from '@components/FlexBetween';
import avatar1 from "./../../assets/avatarImages/Ellipse 31.png";
import successSVG from "./../../assets/shapes/setupComplete.svg";
import InviteParticipantsContractor from "./../../assets/shapes/InviteParticipantsContractor.svg";
import siteLogo from "./../../assets/shapes/siteLogo.svg";

const UserProfile = ({ values, theme, t }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const user = values.data
    const cacheContexts = authService.getCacheContexts()
    const contexts = cacheContexts?.map((element, index) => {

    })

    return (<>
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
            <Box
                
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar
                    alt="avatar"
                    src={avatar1}
                    sx={{
                        width: 100,
                        height: 100,
                        border: `solid 3px ${theme.palette.secondary.main}`
                    }}
                />
            </Box>

            <Grid
                spacing={1}
                columns={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                
                minHeight={100}
                margin={0}
                width={"auto"}
            >
                <Grid item xs={4} sm={4} md={4} >
                    <Typography textAlign={"end"} fontWeight="bold">
                        Full name:
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <Typography noWrap>
                        {user?.userFirstName + " " + user?.userLastName}
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={4} md={4} >
                    <Typography textAlign={"end"} fontWeight="bold">
                        Phone Number:
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <Typography noWrap>
                        {user?.userPhone}
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={4} md={4} >
                    <Typography textAlign={"end"} fontWeight="bold">
                        Email Address:
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <Typography noWrap>
                        {user?.userEmail}
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={4} md={4} >
                    <Typography textAlign={"end"} fontWeight="bold">
                        Status:
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <Typography noWrap>
                        {user?.userStatus}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </>)
}

const UserSetupSuccess = ({ values, theme, t }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    

    const user = authService.getCacheUser()
    const cacheContexts = authService.getCacheContexts()
    const contexts = cacheContexts?.map((element, index) => {

    })

    return (<>
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
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Box
                    
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >

                    <CardMedia
                        component="img"
                        image={successSVG}
                        alt="Paella dish"
                        sx={{
                            width: "auto",
                            height: 150
                        }}
                    />

                </Box>

                <Grid
                    spacing={1}
                    columns={12}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    
                    minHeight={100}
                    margin={0}
                    width={"auto"}
                >

                    <Typography variant="informationSecondary">{values?.body ? t(values?.body) : null}</Typography>

                </Grid>
            </Stack>
        </Box>
    </>)
}

const UserInviteParticipantsContractor = ({ values, theme, t }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const user = authService.getCacheUser()
    const cacheContexts = authService.getCacheContexts()
    const contexts = {}

    cacheContexts.forEach((element, index) => {
        if (element.context !== "information") {
            contexts[element.context] = element.values
        }
    });

    return (<>
        <Box
            width= "auto"
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
            {/* Site */}
            <Box
                
                display={isSmallScreen ? "block" : "flex"}
                justifyContent={"center"}
                
                padding={1}
                gap={2}
                spacing={4}
            >

                <Box
                    
                    
                    
                    
                >
                    <Stack
                        
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                    >
                        <Avatar
                            alt="avatar"
                            src={siteLogo}
                            sx={{
                                width: 100,
                                height: 100,
                                
                            }}
                        />
                        <Typography fontWeight="bold">{`${contexts.sites[0].siteType} ${contexts.sites[0].name}`}</Typography>
                    </Stack>
                </Box>

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    
                    minHeight={100}
                    justifyContent="space-between"
                    paddingLeft={1}
                    paddingRight={1}
                >
                    <Grid 
                        item
                        
                        xs={6} sm={6} md={4} 
                    >
                        <Typography textAlign={"start"} >
                            {t('siteContract')}
                        </Typography>
                    </Grid>
                    <Grid 
                        item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto' }}
                    >
                        <Typography noWrap fontWeight="bold" textAlign={"end"} >
                            {`${contexts.sites[0].siteContract}`}
                        </Typography>
                    </Grid>

                    <Grid 
                        item
                        
                        xs={6} sm={6} md={4} 
                        marginBlock={1}
                    >
                        {t("siteAddress")}
                    </Grid>
                    <Grid 
                        item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto' }}
                    >
                        <Typography noWrap fontWeight="bold" textAlign={"end"} >
                            {`${contexts.sites[0].siteAddress} - ${contexts.sites[0].siteCity}`}
                        </Typography>
                    </Grid>

                    <Grid 
                        item
                        
                        xs={6} sm={6} md={4} 
                        
                    >
                        {t("siteDetails")}
                    </Grid>
                    <Grid 
                        item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto', alignItems: "center" }}
                    >
                        <Typography noWrap fontWeight="bold" textAlign={"end"} >
                            {`${contexts.sites[0].siteDetails}`}
                        </Typography>
                    </Grid>
                </Grid>

            </Box>

            <Divider />

            {/* Manager */}
            <Box
                
                display={isSmallScreen ? "block" : "flex"}
                justifyContent={"center"}
                
                padding={1}
                gap={2}
                spacing={4}
            >
                <Box
                >
                    <Stack
                        
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                    >
                        <Avatar
                            alt="avatar"
                            src={avatar1}
                            sx={{
                                width: 100,
                                height: 100,
                                
                            }}
                        />
                        <Typography fontWeight="bold">Role: Hacker</Typography>
                    </Stack>
                </Box>

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    
                    minHeight={100}
                    justifyContent="space-between"
                    paddingLeft={1}
                    paddingRight={1}
                >
                    <Grid item
                        
                        xs={6} sm={5} md={4} 
                    >
                        <Typography textAlign={"start"}>
                            Full name:
                        </Typography>
                    </Grid>
                    <Grid item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto', alignItems: "center" }}
                    >
                        <Typography fontWeight="bold" textAlign={"end"} >
                            {user?.userFirstName + " " + user?.userLastName}
                        </Typography>
                    </Grid>


                    <Grid item
                        
                        xs={6} sm={5} md={4} 
                    >
                        <Typography textAlign={"start"} >
                            Phone Number:
                        </Typography>
                    </Grid>
                    <Grid item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto', alignItems: "center" }}
                    >
                        <Typography fontWeight="bold" textAlign={"end"} >
                            {user?.userPhone}
                        </Typography>
                    </Grid>

                    <Grid item
                        
                        xs={6} sm={5} md={4} 
                    >
                        <Typography textAlign={"start"} >
                            Email Address:
                        </Typography>
                    </Grid>
                    <Grid item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto', alignItems: "center" }}
                    >
                        <Typography fontWeight="bold" textAlign={"end"} >
                            {user?.userEmail}
                        </Typography>
                    </Grid>

                    <Grid item
                        
                        xs={6} sm={5} md={4} 
                    >
                        <Typography textAlign={"start"} >
                            Status:
                        </Typography>
                    </Grid>
                    <Grid item
                        
                        xs={"auto"} sm={"auto"} md={8} 
                        style={{ marginLeft: 'auto', alignItems: "center" }}
                    >
                        <Typography fontWeight="bold" textAlign={"end"} >
                            {user?.userStatus}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Box>

        <Stack direction="row" spacing={1}>

            <WhatsappShareButton url={values.data} title={"Marhba marhba ... \n"} >
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <FacebookMessengerShareButton url={values.data}>
                <FacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={`Marhba marhba ... \n${values.data}`}>
                <XIcon size={32} round={true} />
            </TwitterShareButton>

            <TelegramShareButton url={values.data}>
                <TelegramIcon size={32} round={true} />
            </TelegramShareButton>

            <ViberShareButton url={values.data}>
                <ViberIcon size={32} round={true} />
            </ViberShareButton>

            <EmailShareButton url={values.data}>
                <EmailIcon size={32} round={true} />
            </EmailShareButton>


            {/* </FacebookMessengerShareButton> */}
        </Stack>
    </>)
}


const Information = ({ values, t }) => {
    const theme = useTheme();
    
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const information = {

        UserProfile: (<><UserProfile values={values} theme={theme} t={t} /></>),

        UserSetupSuccess: (<><UserSetupSuccess values={values} theme={theme} t={t} /></>),

        UserInviteParticipantsContractor: (<><UserInviteParticipantsContractor values={values} theme={theme} t={t} />
            {/* 
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="informationMain">
                    {values?.title}
                </Typography>

                <Box width="90%"
                    display="block"
                    justifyContent={"center"}
                    alignItems={"center"}
                
                >

                    <Grid
                        spacing={1}
                        columns={12}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        
                        minHeight={100}
                        margin={0}
                        width={"auto"}
                    >
                        

                    </Grid>
                </Box>


            </Stack> 
            */}
        </>),
    }


    return (<>

        {information[values.title]}
    </>
    )
}

export default Information;