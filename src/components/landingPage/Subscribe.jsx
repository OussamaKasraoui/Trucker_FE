import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

function Subscribe() {
  return (
    <>
      <Paper className="bottom-banner">
        <Box
          display="flex"
          pt={{ xs: "15%", sm: "7%" }}
          px={{ xs: "2%", sm: "7%" }}
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          alignItems="center"
        >
          <Box
            flex="0.5"
            p={{ xs: "3%", sm: "5%" }}
            className="email-container"
          >
            <Typography
              variant="body2"
              mb={{ xs: "10px", sm: "20px" }}
              color="#ffffff"
              fontWeight="500"
            >
              JOIN WITH OUR COMMUNITY
            </Typography>
            <Typography
              variant="h4"
              mb={{ xs: "10px", sm: "20px" }}
              fontSize={{ xs: "25px", sm: "30px" }}
              fontWeight="800"
              color="#ffffff"
            >
              Set your social media growth on autopilot.
            </Typography>
            <Box display="flex" flexDirection="row">
              <TextField
                className="textfield"
                id="outlined-basic"
                label="YOUR EMAIL ADDRESS"
                variant="outlined"
              />
              <Button className="subscribe-button" variant="contained">
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default Subscribe;
