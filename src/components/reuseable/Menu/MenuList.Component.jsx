import React, { useCallback } from 'react';
import { useTranslation } from "react-i18next";
import {
    MenuList as MuiMenuList,
    ListItemText, ListItemIcon,
    Box, Collapse,
} from '@mui/material';
import MenuListItem from './MenuListItem.Component';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FlexBetween from './../../FlexBetween';


const MenuList = ({ list, staticList, handleClick, handleClose }) => {
    const { t } = useTranslation("navbar_home");
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // Initialize collapsible open state
    const [collapsOpen, setCollapsOpen] = React.useState(() => 
        list.concat(staticList).reduce((acc, element) => {
            if (element.collapse) acc[element.name] = false;
            return acc;
        }, {})
    );

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const _handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
        }
    };

    // Toggle collapse open state
    const collapsHandleClick = useCallback((item) => {
        setCollapsOpen(prevCollapsOpen => ({
            ...prevCollapsOpen,
            [item]: !prevCollapsOpen[item]
        }));
    }, []);

    // Track previous state to handle focus
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    // Handle item click with optional collapse toggle
    const handleItemClick = useCallback((name, collapse) => () => {
        if (collapse) collapsHandleClick(name);
    }, [collapsHandleClick]);

    return (
        <Box>
            {staticList.map(({ action, label, icon, collapse, name }, index) => {
                const isDivider = label(collapsOpen[name]) === "Divider";
                const isCollapsable = collapse && collapsOpen[name];

                return (
                    <React.Fragment key={index}>
                        {!isDivider && (
                            <FlexBetween 
                                gap={4} 
                                onClick={handleItemClick(name, collapse)}
                                sx={{
                                    width: "100%",
                                    px: "5px",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        width: "30%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: 31,
                                    }}
                                >
                                    {isCollapsable ? <ExpandLess /> : icon(collapsOpen[name])}
                                </ListItemIcon>

                                <ListItemText 
                                    primary={label(collapsOpen[name])} 
                                    sx={{
                                        px: 2,
                                    }}
                                />
                            </FlexBetween>
                        )}
                        {collapse && (
                            <Collapse in={collapsOpen[name]} timeout="auto" unmountOnExit>
                                {collapse(() => { collapsHandleClick(name) })}
                            </Collapse>
                        )}
                        {isDivider && icon(collapsOpen[name])}
                    </React.Fragment>
                );
            })}

            <MuiMenuList sx={{ py: 0.5, px: 0 }}>
                {list.map(({ action, label, icon, collapse, name }, index) => (
                    <React.Fragment key={index}>
                        {label(collapsOpen[name]) !== "Divider" ? (
                            <MenuListItem 
                                icon={icon ? icon(collapsOpen[name]) : 'icon'} 
                                label={label ? label(collapsOpen[name]) : 'label'} 
                                action={(from)=>{
                                    handleClose();
                                    action(from ? from+":MenuList" : "MenuList");
                                }} 
                            />
                        ) : (
                            icon(collapsOpen[name])
                        )}
                    </React.Fragment>
                ))}
            </MuiMenuList>
        </Box>
    );
};

export default React.memo(MenuList);
