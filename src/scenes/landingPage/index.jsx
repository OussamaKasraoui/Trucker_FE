import React from "react";
import { useNavigate, 
        useOutletContext,
        useLocation }       from 'react-router-dom';
import { useDispatch, 
         useSelector }       from 'react-redux'
import { useTranslation }   from 'react-i18next';
import { Divider, Grid, TextField, Box, useMediaQuery } from "@mui/material";
import { Button, Container, Typography, useTheme } from '@mui/material';
import Pricing from "@components/Pricing";

import { useAuth }           from "@services/useAuth"; // Custom hook for handling user and token state
import useAxiosErrorHandler from '@services/useAxiosErrorHandler'
    
import Hero         from "@components/landingPage/Hero";
import Businesses   from "@components/landingPage/Businesses";
import Squares      from "@components/landingPage/Squares";
import About        from "@components/landingPage/About";
import Features     from "@components/landingPage/Features";
import Testimonial  from "@components/landingPage/Testimonial";
import Faqs         from "@components/landingPage/Faqs";
import Subscribe    from "@components/landingPage/Subscribe";
import Footer       from "@components/landingPage/Footer";
import JoinWaitlist from "@components/landingPage/JoinWaitlist"; 
import Copyright    from "@components/landingPage/Copyright";
import Navbar       from "@components/landingPage/Navbar";
  
const LandingPage = () => {
    const { t, i18n }           = useTranslation("users");
    const theme                 = useTheme();
    const outletContext         = useOutletContext()
    const location              = useLocation();

    const navigate              = useNavigate();
    const dispatch              = useDispatch();
    const { handleAxiosError }  = useAxiosErrorHandler();
    const { user, setUser, 
            token, setToken }   = useAuth();
    
    const isMobile              = useMediaQuery(theme.breakpoints.down('sm'));
    const isNonMobile           = useMediaQuery("(min-width: 600px)");
    const isNonMediumScreens    = useMediaQuery("(min-width: 1200px)");
    
    const [selectUserPack, setSelectUserPack] = React.useState(user.userPack === false);

    return (
        <>
            <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" /* className={"yellow"} */>
                <Box sx={{ minHeight: '100vh', width: '100%' }} /* className={"purple"} */>
                    <Hero />
                    
                    {/* <Navbar /> */}
                    <Divider orientation="horizontal" />
                    <Squares />
                    <Pricing skip={setSelectUserPack} user={user} setUser={setUser} token={token} setToken={setToken} />
                    <Divider orientation="horizontal" />
                    <Businesses />


                    {/* <Testimonial /> */}
                    {/* <About /> */}

                    {/* <Divider orientation="horizontal" /> */}
                    {/* <Features /> */}

                    {/* <Businesses /> */}

                    <Divider orientation="horizontal" />
                    {/* <Divider orientation="horizontal" /> */}

                    <Faqs />
                    <Subscribe />
                    <JoinWaitlist />
                    <Divider className="footer-divider" orientation="horizontal" />
                    <Footer />
                    <Divider className="footer-divider" orientation="horizontal" />
                    <Copyright />
                </Box>
            </Box>
        </>
  );
};

export default LandingPage;