import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
// import feature1 from "./../../assets/shapes/feature1.png";
// import feature2 from "./../../assets/shapes/feature2.1.png";
import feature1 from "./../../assets/shapes/feature1.svg";
import feature2 from "./../../assets/shapes/feature2.svg";

function Features() {
  return (
    <Box px={{ xs: "2%", sm: "7%" }}>
      {/* section first */}
      <Stack direction={{ xs: "column", sm: "row" }} useFlexGap>

        <Box flex={{ sm: "0.4", md: "0.4" }} alignItems={"center"} justifyContent={"center"}  >
          <img className="feature2-image" src={feature2} alt="person" />
        </Box>

        <Box display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center" 
          flex={{ sm: "0.6", md: "0.6" }} >

          <Typography
            variant="h2"
            fontWeight="800"
            fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
            mb={{ xs: "15px", sm: "25px" }}
          >
            Efficiency Through Integration
          </Typography>

          <Typography
            variant="body1"
            fontWeight="500"
            mb={{ xs: "15px", sm: "25px" }}
          >
            Our platform offers a suite of intuitive tools, from streamlined financial management to seamless communication 
            features. Manage properties with ease and enhance tenant satisfaction with our comprehensive solutions.
          </Typography>
          <Button variant="contained">Start free</Button>
        </Box>
      </Stack>

      
      {/* section two */}
      <Stack direction={{ xs: "column", sm: "row" }} useFlexGap >

        <Box 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center" 
          flex={{ sm: "0.6", md: "0.6" }} >

          <Typography
            variant="h2"
            fontWeight="800"
            fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
            mb={{ xs: "15px", sm: "25px" }}
          >
            Empowerment and Engagement
          </Typography>

          <Typography
            variant="body1"
            fontWeight="500"
            mb={{ xs: "15px", sm: "25px" }}
          >
            Experience simplified rent collection, transparent communication, and convenient resident portals, 
            all accessible anytime, anywhere. Elevate your condominium management experience with our user-friendly, 
            integrated platform.
          </Typography>

          <Button variant="contained">Start free</Button>
        </Box>

        <Box flex={{ sm: "0.4", md: "0.4" }} alignItems={"center"} justifyContent={"center"}>
          <img className="feature1-image" src={feature1} alt="person" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Features;
