import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function JoinWaitlist() {
  return (
    <Box
      className="join-waitlist"
      display="flex"
      flexDirection="column"
      p="5%"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      pb={{ xs: "10%", sm: "4%" }}
    >
      <Typography
        variant="h3"
        color="#ffffff"
        fontWeight="400"
        fontSize={{ xs: "25px", sm: "32px", md: "40px" }}
        width={{ xs: "100%", sm: "70%", md: "50%" }}
        mb="20px"
      >
        Join millions of creative people with Handler
      </Typography>
      <Button
        variant="contained"
        className="waitlist-button"
        endIcon={<ArrowRightAltIcon />}
      >
        Join the waitlist
      </Button>
    </Box>
  );
}

export default JoinWaitlist;
