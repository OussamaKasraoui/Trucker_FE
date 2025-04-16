import React from "react";
import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import NotFound from "@components/notfound";
import DataGrid from "./DataGrid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import CustomColumnMenu from "./DataGridCustomColumnMenu"


const Test = (props) => {
    const theme = useTheme();
    
    //   const { name, setName } = useAuth();

      const [inputValue, setInputValue] = React.useState("");

      const handleInputChange = (event) => {
          setInputValue(event.target.value);
      };
  
      const handleButtonClick = () => {
        //   setName(inputValue);
      };

    return (
    <>
      <Typography>DataGrid</Typography>
        <DataGrid />
      <Divider  />

      <Typography>DataGridCustomToolbar</Typography>
        <DataGridCustomToolbar />
      <Divider  />

      <Typography>CustomColumnMenu</Typography>
        <CustomColumnMenu />
      <Divider  />

    </>
    )
}

export default Test;