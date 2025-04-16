import * as React from 'react';
import Button from '@mui/material/Button';
import { Menu as MuiMenu, useTheme} from '@mui/material';
import MenuList from './MenuList.Component';
import MenuListItem from './MenuListItem.Component'

export default function Menu({ list, staticList, anchorEl, open, handleClick, handleClose }) {
    const theme       = useTheme();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (<>
        <MuiMenu
            // className='yellow'
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
                        borderColor: theme.palette.neutral.main, // # Done
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .staticItem': {
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
        >
            <MenuList 
                list={list} 
                staticList={staticList} 
                handleClick={handleClick}
                handleClose={handleClose}
            />
        </MuiMenu>
    </>);
}
