import { GridColumnMenuFilterItem, GridColumnMenuContainer } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CustomColumnMenu = (props) => {
  return (
    <GridColumnMenuContainer {...props}>
      <GridColumnMenuFilterItem onClick={() => console.log("Filtering")} />
      <MenuItem onClick={() => console.log("Filtering")}>Test</MenuItem>
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;

/* import React from "react";
import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <React.Fragment>

      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>

    </React.Fragment>
  );
};

export default CustomColumnMenu;
 */