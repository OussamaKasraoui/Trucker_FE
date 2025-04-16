import React, { useCallback } from 'react';
import { useTranslation }                         from "react-i18next";
import { useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TinyFlag                                   from "tiny-flag-react";

import FlexBetween from './../../FlexBetween'

const MenuListItem = ({ icon, label, action, collapsible }) => {
    const { t } = useTranslation("navbar_home");
    const theme = useTheme();
    const [collapsOpen, setCollapsOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleCollapsToggle = useCallback(() => {
        if (collapsible) {
            setCollapsOpen(prev => !prev);
        }
    }, [collapsible]);

    const handleClick = useCallback((e) => {
        handleCollapsToggle();
        action("MenuListItem");
    }, [handleCollapsToggle, action]);

    return (
        <MenuItem>
            <FlexBetween 
                gap={4}
                onClick={handleClick}
                sx={{
                    width: "100%",
                    px: "5px",
                    // Customize styling if needed
                }}
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>

                <ListItemText primary={label} />
            </FlexBetween>
        </MenuItem>
    );
};

export default React.memo(MenuListItem);