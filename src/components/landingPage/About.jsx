import React from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

const aboutDetails = [
  {
    icon: <LockOutlinedIcon />,
    title: "100% Secure",
    description:
      "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.",
  },
  {
    icon: <CookieOutlinedIcon />,
    title: "No cookies required",
    description:
      "Age and draw mrs like. Improving end distrusts may instantly was household applauded incommode.",
  },
  {
    icon: <LoginOutlinedIcon />,
    title: "Login info not required",
    description:
      "Draw mrs like. Improving end distrusts may instantly was household applauded incommode.",
  },
  {
    icon: <CurrencyExchangeOutlinedIcon />,
    title: "Moneyback guarrentee",
    description:
      "Improving end distrusts may instantly was from they fine john he give of rich he. They age and draw mrs like. ",
  },
];

function About() {
  const theme       = useTheme();
  return (
    <>
    <Box 
      width={"100%"}
      // height={"500px"}
      // className="red"
      sx={{
        backgroundColor: theme.palette.background.main, // "red", // 
        my:0,
        mx:0,
      }}
    >
    <Box /* px={{ xs: "2%", sm: "7%" }} */ pt="25px" pb="40px">
      <Typography
        variant="h3"
        fontSize={{ xs: "25px", sm: "32px", md: "40px" }}
        fontWeight="800"
        width={{ sm: "100%", md: "50%" }}
      >
        One plateform to increase followers on all social media.
      </Typography>
      <Stack
        py="40px"
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {aboutDetails.map((detail, id) => (
          <Stack
            key={id}
            className="about-info-card"
            borderRadius="10px"
            px={{ xs: "10px", sm: "10px", md: "15px" }}
            py={{ xs: "15px", sm: "25px" }}
          >
            <Box mb="15px">{detail.icon}</Box>
            <Typography mb="10px" variant="h6" fontWeight="600">
              {detail.title}
            </Typography>
            <Typography variant="body2" fontWeight="500">
              {detail.description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
    </Box></>
    
  );
}

export default About;
