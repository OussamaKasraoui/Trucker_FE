import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loading = ({ progress, color }) => {

  // alert(color)

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      sx={{
        // backgroundColor: "yellow",
        // width: "100px",
        // height: "100px",
        // minHeight: "100px",

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress 
        variant={progress && "determinate"} 
        value={progress && progress} 
        sx={{
          // backgroundColor: "yellow",
          color: color,
        }}
      />
      <Box sx={{ marginTop: '8px' }}>{progress &&  `${progress}% Complete`}</Box>
    </Box>
  );
};

export default Loading;
