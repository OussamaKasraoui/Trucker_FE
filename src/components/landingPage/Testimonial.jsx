import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import TestimonialCard from "./TestimonialCard";

import testimonialDetails from "./testimonialDetails.js";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <ArrowBackIosIcon onClick={() => scrollPrev()} />
    </Box>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <ArrowForwardIosIcon onClick={() => scrollNext()} />
    </Box>
  );
};

function Testimonial() {
  return (
    <Box
      px={{ xs: "2%", sm: "7.3%" }}
      py={{ xs: "35px", sm: "50px", md: "70px" }}
      textAlign="center"
    >
      <Typography
        mb={{ xs: "10px", sm: "20px" }}
        variant="h6"
        fontSize="18px"
        fontWeight="800"
        color="#1976d2"
      >
        TESTIMONIAL
      </Typography>
      <Typography
        variant="h2"
        fontWeight="800"
        fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
        mb={{ xs: "15px", sm: "30px" }}
      >
        What our happy users say
      </Typography>

      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {testimonialDetails.map((detail,id) => (
          <TestimonialCard
            key={id}
            quote={detail.quote}
            personName={detail.personName}
            designation={detail.designation}
            image={detail.image}
          />
        ))}
      </ScrollMenu>
      
    </Box>
  );
}

export default Testimonial;
