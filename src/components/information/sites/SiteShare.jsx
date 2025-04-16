import React, { Suspense } from 'react';
import { useTranslation } from "react-i18next";
import {
    useNavigate, useLocation,
    useOutletContext
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from '../../FlexBetween';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    XIcon ,
    WhatsappIcon
  } from "react-share";
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';


// import UserProfile        from './users/UserProfile';
// import UserSetupSuccess   from './users/UserSetupSuccess';
// import InviteParticipants from './users/UserInviteParticipantsContractor';



const Sites = ({ values, name }) => {
    const theme     = useTheme();
    const isMobile  = useMediaQuery(theme.breakpoints.down('sm'));
    const url       = values?.url

    return (
        <Box
            sx={{
                display: isMobile ? "block" : "flex",
                // marginTop: "200px",
                // p: 1,
                // my: 1,
                border: "1px solid blue",
                alignItems: "center",
            }}
        >
            <Typography sx={{
                // border: "1px solid green"
            }} >
                Invite people to join you : 
            </Typography>

            <FlexBetween 
                gap={2}
                sx={{
                    // border: "1px solid green",
                    px: 2
                }} 
            >

                <FacebookShareButton url={url} quote={values?.title}>
                    <FacebookIcon size={30} round/>
                </FacebookShareButton>

                <TwitterShareButton url={url} title={values?.title}>
                    <XIcon size={30} round/>
                </TwitterShareButton>

                <WhatsappShareButton url={url} title={values?.title}>
                    <WhatsappIcon size={30} round/>
                </WhatsappShareButton>

            </FlexBetween>
        </Box>
    )
}

export default Sites