import React from "react";
import { useTranslation }                         from "react-i18next";
import { useDispatch }                            from "react-redux";
import { Stack, Typography, Box, Button, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
// import heroImage from "./../../assets/LandingPage/hero.svg";
import heroImage from "./../../assets/LandingPage/heroBG.svg";
// import heroBG from "./../../assets/shapes/bgAlt.svg";
import HeroAvatars from "./HeroAvatars";


function Hero() {
  const theme       = useTheme();
  const { t, i18n } = useTranslation("hero");
  const dispatch    = useDispatch();

  const ActionButton = styled(Button)(({ theme }) => ({
    color: theme.palette.neutral.main, // main[900],
    backgroundColor: theme.palette.primary.main , //secondary.dark,
    '&:hover': {
      color: theme.palette.neutral.light, // main[900],
      backgroundColor: theme.palette.primary.light , //secondary.dark,
    },
  }));

  const heroBG = `<svg id="e8UrxAeyvsz1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 9000 4000" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                      <defs>
                          <path id="e8UrxAeyvsz2" d="M3730.018,0c-8.667,598.472,424.367,1826.23,1760.577,1688.619C8875.694,1340,7875.397,3436.196,9000,3267.393L9000,0h-5269.982Z"/>
                          <path id="e8UrxAeyvsz3" d="M6918.683,2539.984C7934.821,3034.322,9000,1999.999,9000,1999.999L9000,0h-7175.755c562.997,1483.383,2375.576,617.559,3240.668,850.994c865.094,233.436,837.631,1194.651,1853.77,1688.99"/>
                          <linearGradient id="e8UrxAeyvsz8-fill" x1="3109.5934" y1="312.953" x2="2405.8478" y2="2415.7222" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0)">
                              <stop id="e8UrxAeyvsz8-fill-0" offset="0%" stop-color= "${theme.palette.background.main/*# XDone*/}"/>
                              <stop id="e8UrxAeyvsz8-fill-1" offset="100%" stop-color="${theme.palette.background.xlighter/*# XDone*/}"/>
                          </linearGradient>
                          <linearGradient id="e8UrxAeyvsz13-fill" x1="4560.1482" y1="-1070.3217" x2="3495.9475" y2="1761.8257" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0)">
                              <stop id="e8UrxAeyvsz13-fill-0" offset="0%" stop-color="${theme.palette.background.main/*# XDone*/}"/>
                              <stop id="e8UrxAeyvsz13-fill-1" offset="100%" stop-color="${theme.palette.background.xlighter/*# XDone*/}"/>
                          </linearGradient>
                      </defs>
                      <g>
                          <rect width="9000" height="4000" rx="0" ry="0" clip-rule="evenodd" fill="${theme.palette.background.main/*# XDone*/}" fill-rule="evenodd"/>
                      <g>
                          <g clip-path="url(#e8UrxAeyvsz9)">
                              <rect width="5278.65" height="3436.2" rx="0" ry="0" transform="translate(3721.35 0)" fill="url(#e8UrxAeyvsz8-fill)"/>
                              <clipPath id="e8UrxAeyvsz9">
                                  <use width="5270.109375" height="3277.086914" xlink:href="#e8UrxAeyvsz2"/>
                              </clipPath>
                          </g>
                      </g>
                          <g>
                              <g clip-path="url(#e8UrxAeyvsz14)">
                                  <rect width="7175.75" height="3034.32" rx="0" ry="0" transform="translate(1824.24 0)" fill="url(#e8UrxAeyvsz13-fill)"/>
                                  <clipPath id="e8UrxAeyvsz14">
                                      <use width="7175.754883" height="2673.807861" xlink:href="#e8UrxAeyvsz3"/>
                                  </clipPath>
                              </g>
                          </g>
                      </g>
                  </svg>`
  return (
    <Stack
      // className="purple"
      direction={{
        xs: "column-reverse", sm: "row", md: "row"
      }}

      sx={{
        my:0,
        mx:0,
        px: {
          xs: 1.5,
          sm: 2,
          md: 3,
          lg: 6,
          xl: 25,
        },

        backgroundImage: `url('data:image/svg+xml;utf8,${heroBG.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}')`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        // className="blue"
        flex={0.5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >

        <Typography
          variant="heroTitleMain"
          // fontWeight="900"
          color={theme.palette.primary.main} // XDone
          // fontFamily={"BitterBold"}
          sx={{
            fontVariantCaps: "small-caps",
            fontSize:{ 
              xs: "50px", 
              sm: "52px", 
              md: "72px", 
              lg: "92px",
              xl: "100px"
            }
          }}
        >
          {t("app_name")}
        </Typography>

        <Typography
          justifyContent={"center"}
          textAlign={"center"}
          variant="heroDescMain"
          fontWeight="400"
          sx={{
            my:3,
            fontSize:{ 
              xs: "12px", 
              sm: "13px", 
              md: "15px", 
              lg: "17px",
              xl: "20px"
            },
          }}
        >
          {t("app_description")}
        </Typography>

        <ActionButton
          variant="contained"
          theme={theme}
          endIcon={
            <VerifiedSharpIcon
              sx={{
                // Apply responsive font sizes to the icon
                fontSize: {
                  xs: 112,  // Font size for extra small screens
                  sm: 114,  // Font size for small screens
                  md: 118,  // Font size for medium screens
                  lg: 122,  // Font size for large screens
                  xl: 126,  // Font size for extra large screens
                },
              }}
            />
          }
        
          sx={{
            my:{ 
              xs: 2, 
              sm: 2, 
              md: 2, 
              lg: 4,
              xl: 6
            },


            // backgroundColor: {
            //   xs: "orange",
            //   sm: "yellow",
            //   md: "lime",
            //   lg: "aquamarine",
            //   xl: "fuchsia",
            // },

            borderRadius:10,
            
            fontSize:{ 
              xs: "12px", 
              sm: "14px", 
              md: "18px", 
              lg: "22px",
              xl: "26px"
            },
          }}
        >
          {t("app_action")}
        </ActionButton>

      </Box>


      <Box
        // className="orange"
        flex={0.5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <img src={heroImage} alt="graphic" /> */}
        <Box
          // className="green"
          component="img"
          alt="Hero Image"
          src={heroImage}
          sx={{ 
            objectFit: "cover" ,
            width:{ 
              xs: "90vw", 
              sm: "45vw", 
              md: "45vw", 
              lg: "40vw",
              xl: "35vw"
            },
          }}
        />
      </Box>
    </Stack>
  );
}

export default Hero;
