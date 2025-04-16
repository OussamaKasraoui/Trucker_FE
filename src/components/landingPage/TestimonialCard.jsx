import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";

function TestimonialCard({ quote, personName, designation, image }) {
  return (
    <Stack
      m={{ xs: "5px", sm: "15px" }}
      className="testimonial-card"
      width={{ xs: "280px", sm: "300px" }}
      textAlign="left"
      p={{ xs: "10px", sm: "20px" }}
      borderRadius="5px"
    >
      <Box className="quote-icon-container" mb={{ xs: "10px", sm: "20px" }}>
        <FormatQuoteIcon className="quote-icon" />
      </Box>
      <Box display="flex" mb="15px">
        <StarIcon className="star-icon" />
        <StarIcon className="star-icon" />
        <StarIcon className="star-icon" />
        <StarIcon className="star-icon" />
        <StarIcon className="star-icon" />
      </Box>
      <Typography variant="body2" mb="20px">
        {quote}
      </Typography>
      <Box display="flex" gap="10px">
        <Avatar src={image} alt="avatar" />
        <Box>
          <Typography variant="body2" fontWeight="500">
            {personName}
          </Typography>
          <Typography variant="caption">{designation}</Typography>
        </Box>
      </Box>
    </Stack>
  );
}

export default TestimonialCard;
