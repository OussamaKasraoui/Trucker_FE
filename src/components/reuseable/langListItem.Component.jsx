import React, { useState } from 'react';
import { useTranslation }                         from "react-i18next";
import { useTheme } from "@mui/material";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import TinyFlag                                   from "tiny-flag-react";
import { useDispatch, useSelector } from 'react-redux';
import { setStateMode }                           from "@states/slices/global";
import FlexBetween from './../FlexBetween';

const LanguageListItem = (props) => {
    const { t, i18n }               = useTranslation("navbar_home");
    const theme       = useTheme();
    const [collapsOpen, setCollapsOpen] = useState(false);
    const dispatch = useDispatch();

    const collapsHandleClick = () => {
        setCollapsOpen(!collapsOpen);
    };

    return {
        flag: (<>
            {collapsOpen ? (
                <>
                    <ListItemIcon>
                        <ExpandLess />
                    </ListItemIcon>
                    <ListItemText primary={t('Language')} />
                </>
            ) : (
                i18n.language === "ar" ? (
                    <>
                        <ListItemIcon>
                            <TinyFlag
                                country={"MA"}
                                alt={"Morocco Flag"}
                                fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/MA.svg`}
                            />
                        </ListItemIcon>
                        <ListItemText primary={'العربية'} />
                    </>
                ) : i18n.language === "fr" ? (
                    <>
                        <ListItemIcon>
                            <TinyFlag
                                country={"FR"}
                                alt={"France Flag"}
                                fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/FR.svg`}
                            />
                        </ListItemIcon>
                        <ListItemText primary={'Français'} />
                    </>
                ) : (
                    <>
                        <ListItemIcon>
                            <TinyFlag
                                country={"EN"}
                                alt={"United States Flag"}
                                fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/US.svg`}
                            />
                        </ListItemIcon>
                        <ListItemText primary={'English'} />
                    </>
                )
            )}
        </>),
        lang: t('Language')
    }
};

export default LanguageListItem;
