import React, { useRef, useCallback } from 'react';
import { useTranslation }                         from "react-i18next";
import { useDispatch }                            from "react-redux";
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import {useTheme} from "@mui/material";
import Menu from '@components/reuseable/Menu/Menu.Component'


const MenuItemsList = ({icon, list, staticList}) => {
  const dispatch                  = useDispatch();
  const { t, i18n }               = useTranslation("navbar_home");
  const arrowRef = useRef();
  const theme       = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);


  return (
    <>
      <IconButton 
        // className='pink'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {icon}
      </IconButton>

      <Popper
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        placement="bottom"
        disablePortal={true}
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: false,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: false,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef.current,
            },
          },
        ]}
      >
        <Menu
          list={list}
          staticList={staticList}
          anchorEl={anchorEl}
          open={open}
          handleClick={handleClick}
          handleClose={handleClose}
          
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            disablePadding: true,
          }}
          slotProps={{
            root: {
              sx: {
                // border: "solid green 3px",
                backgroundColor: "rgba(45 45 45 / 0.08)",

                '& .MuiButtonBase-root': {
                  // backgroundColor: 'royalblue', // Style for MuiButtonBase-root
                  px: "5px",
                  '&:hover': {
                    // backgroundColor: 'lime', // Hover style for MuiButtonBase-root
                  },
                },
                '& .MuiMenuItem-root': {
                  // fontSize: '1.25rem', // Style for MuiMenuItem-root
                  '&:hover': {
                    // backgroundColor: 'purple', // Hover style for MuiMenuItem-root
                  },
                },
              }
            },

            paper: {
              elevation: 0,
              sx: {
                backgroundColor: theme.palette.background.default, // # Done
                border: "solid 1px",
                borderColor: theme.palette.neutral.main,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: -1,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.background.main,
                  borderLeft: "solid 1px",
                  borderLeftColor: theme.palette.neutral.main,
                  borderTop: "solid 1px",
                  borderTopColor: theme.palette.neutral.main,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },

            },

            
            
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        />
      </Popper>
    </>
  );
};

export default React.memo(MenuItemsList);
