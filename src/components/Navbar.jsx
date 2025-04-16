import React, { useState, useEffect }             from "react";
import { Navigate, useNavigate }                  from "react-router-dom";
import { useTranslation }                         from "react-i18next";
import { useDispatch }                            from "react-redux";
import FlexBetween                                from "./FlexBetween";
import Notifications                              from "./Notifications.Component"
import IconMenu                                   from "./IconMenu.Component";
import FlagImg                                    from "./reuseable/FlagImg.Component";

import { setStateMode, setStateLocale }           from "@states/slices/global";
import profileImage                               from "./../assets/profile.jpeg";
import logo                                       from "./../assets/LandingPage/logo.png";
import authService                                from "@services/auth.service";

import {Menu as MenuIcon,
        ArrowDropDownOutlined,}                   from "@mui/icons-material";
import MenuOpenIcon                               from '@mui/icons-material/MenuOpen';
import HomeIcon                                   from '@mui/icons-material/Home';
import ConstructionIcon                           from '@mui/icons-material/Construction';
import MailIcon                                   from "@mui/icons-material/Mail";
import Settings                                   from '@mui/icons-material/Settings';
import Logout                                     from '@mui/icons-material/Logout';
import VpnKeyOutlinedIcon                         from '@mui/icons-material/VpnKeyOutlined';
import AssignmentIndIcon                          from '@mui/icons-material/AssignmentInd';
import RuleSharpIcon                              from '@mui/icons-material/RuleSharp';
import AirplanemodeActiveSharpIcon                from '@mui/icons-material/AirplanemodeActiveSharp';
import ExpandLess                                 from '@mui/icons-material/ExpandLess';

import { 
        AppBar,Box,Typography,IconButton,Divider, 
        List, ListItem, ListItemButton,
        ListItemText, Drawer,Toolbar,useTheme
      }                                           from "@mui/material";
import ListItemIcon                               from '@mui/material/ListItemIcon';
import Link                                       from '@mui/material/Link';
import CssBaseline                                from '@mui/material/CssBaseline';

import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  p: 0,
  m: 0,
  width: 40,
  height: 20,
  paddingBlock: 4,
  paddingInline: 1,

  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    // backgroundColor: theme.pal ette.secondary.main, // "XDone",
    // transform: 'translateX(1px)',

    '&.Mui-checked': {
      // color: theme.palette.mode === 'dark' ? theme.palette.primary.dark: theme.palette.secondary.dark, //'#fff',
      transform: 'translateX(20px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          theme.palette.secondary.light,// 'XDone',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },

      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.darker : theme.palette.secondary.light, // : 'red',
      },
    },
  },

  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.darker /* '#0D7BE9' */ : theme.palette.secondary.light /* '#920007' */,
    width: 18,
    height: 18,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "khaki", // theme.palette.primary.main,// XDone
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.darker : theme.palette.secondary.main, // '#aab4be',
    borderRadius: 20 / 2,
    mx: 0,
    px: 0,
    width: 40,
  },
}));

const Navbar = ({sidebar, navbar, user, token, pathname, window, locale, setLocale, outletContext, from}) => {
  const { t, i18n } = useTranslation("navbar_home");
  const dispatch    = useDispatch();
  const theme       = useTheme();
  const navigate    = useNavigate();
  
  const handleDrawerToggle = () => {
    sidebar.setIsSidebarOpen((prevState) => !prevState);
  };
  /* const drawerWidth = 240;
  const container = window !== undefined ? () => window().document.body : undefined;
  const navItems = ['Home', 'About', 'Contact'];
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  ); */


  const staticMenuListItem = [
    {
      name: "theme",
      action: () => { /* dispatch(setStateMode())  */ },
      label: (collapsOpen) => theme.palette.mode === "dark" ? t("dark") : t("light"),
      icon: () => (<FormGroup
        // className="purple"
        sx={{
          m: 0,
          p: 0,
          // backgroundColor: 'orange'
        }}
      >
        <FormControlLabel
          // className="orange"
          sx={{
            m: 0,
            p: 0,
            // backgroundColor: 'orange'
          }}
          control={
            <MaterialUISwitch
              // sx={{ m: 1 }} 
              defaultChecked={theme.palette.mode === "dark"}
              onChange={() => dispatch(setStateMode())}
            />
          }
        // label="MUI switch"
        />
      </FormGroup>),
    },
    {
      name: "language",
      action: () => { console.log("ha ana") },
      label: (collapsOpen) => {

        // console.log('\n\n===> collapsOpen:\n', collapsOpen)

        if (collapsOpen) {
          return t('language')
        }

        return i18n.language === "ar" ? "العربية" :
          i18n.language === "fr" ? "Français" :
            "English"
      },
      icon: (collapsOpen) => collapsOpen ? (<ExpandLess />) : (<FlagImg code={i18n.language} height={18} width={20} />),
      collapse: (func) => (<List dense component="div" disablePadding
        sx={{ backgroundColor: theme.palette.background.light }}  // # XDone
      >
        <ListItemButton sx={{ pl: 200, }} className="" 
          onClick={() => {
            func()
            i18n.changeLanguage("ar");
            dispatch(setStateLocale({locale: "ar-ma", func: setLocale}))
          }}
        >
          <ListItemIcon sx={{ justifyContent: "center", }} >
            <FlagImg code={"ar"} height={12} width={15} />
          </ListItemIcon>

          <ListItemText sx={{ px: 3, }} primary={'العربية'} />
        </ListItemButton>

        <ListItemButton sx={{ pl: 20, }} className=""
          onClick={() => {
            func()
            i18n.changeLanguage("fr");
            dispatch(setStateLocale({locale: "fr", func: setLocale}))
          }}
        >
          <ListItemIcon sx={{ justifyContent: "center", }} >
            <FlagImg code={"fr"} height={12} width={15} />
          </ListItemIcon>

          <ListItemText sx={{ px: 3, }} primary={'Français'} />
        </ListItemButton>

        <ListItemButton sx={{ pl: 20, }} className=""
          onClick={() => {
            func()
            i18n.changeLanguage("en")
            dispatch(setStateLocale({locale: "en-gb", func: setLocale}))
          }}
        >
          <ListItemIcon sx={{ justifyContent: "center", }} >
            <FlagImg code={"en"} height={12} width={15} />
          </ListItemIcon>

          <ListItemText sx={{ px: 3, }} primary={'English'} />
        </ListItemButton>
      </List>),
    },
    {
      name: "divider",
      action: () => { },
      label: (collapsOpen) => "Divider",
      icon: () => (<Divider textAlign={i18n.dir() === "ltr" ? "left" : "right"} component={"li"} />),
    },
  ]

  const loggedIn = [
    {
      action: () => {},
      label: (collapsOpen) => t("HelloUser", { name: user.userLastName}),
      icon: () => (<AirplanemodeActiveSharpIcon fontSize="small" />),
    },
    {
      action: () => {
        outletContext.setRedirect({
          redirect: true,
          to: `/${user?.userPack?.packName?.toLowerCase()}/dashboard`,
          replace: false,
          data: undefined,
        })
        // navigate(`/${user?.userPack?.packName?.toLowerCase()}/dashboard`, { state: {}, replace: false })
      },
      label: (collapsOpen) => t("Dashboard"),
      icon: () => (<RuleSharpIcon fontSize="small" />),
    },
    {
      action: () => {
        outletContext.setRedirect({
          redirect: true,
          to: `/${user?.userPack?.packName?.toLowerCase()}/settings`,
          replace: false,
          data: undefined,
        })
      },
      label: (collapsOpen) => t("settings"),
      icon: () => (<Settings fontSize="small" />),
    },
    {
      action: () => { authService.removeCacheUser() },
      label: (collapsOpen) => t("Logout"),
      icon: () => (<Logout fontSize="small" />),
    }
  ];

  const loggedOut = [
    {
      action: () => {
        outletContext.setRedirect({
          redirect: true,
          to: "/login",
          replace: true,
          data: {}
        })
      },
      label: (collapsOpen) => t("signin"),
      icon: () => (<VpnKeyOutlinedIcon fontSize="small" />),
    },
    {
      action: () => {
        outletContext.setRedirect({
          redirect: true,
          to: "/register",
          replace: true,
          data: {}
        })
      },
      label: (collapsOpen) => t("signup"),
      icon: () => (<AssignmentIndIcon fontSize="small" />),
    },
  ]
  
  const [renderCount, setRenderCount]     = React.useState(1);
  useEffect(() => {
    console.log(`\n\n=====> Navbar --> renders : ${renderCount}`)
    setRenderCount((prevCount) => prevCount + 1);
  }, [i18n.dir()])

  return (<>
    <CssBaseline />
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
      }}
    >

      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.lighter,
          borderBottom: `solid 1px ${theme.palette.background.darker}`,
          justifyContent: "space-between",
          "&.MuiToolbar-root": {
            px: 0,
          },
        }}
      >

        {sidebar.display && (<>
          <Box
            sx={{
              p: 0,
              width: 60,
              minWidth: 60,
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <IconButton onClick={() => sidebar.toggleDrawer(!sidebar.isSidebarOpen)}>
              {sidebar.isSidebarOpen ?
                <MenuOpenIcon /> :
                <MenuIcon />}
            </IconButton>

          </Box>
          {/* <Divider orientation="vertical" flexItem /> */}
        </>)}

        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: {
                sm: 1,
                md: 2,
              },
              flexGrow: 1,
            }}
          >

          {/* Title */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography color={theme.palette.primary.main} sx={{ [theme.breakpoints.up("sm")]: { display: "block", }, }} variant="h5" noWrap fontWeight="bold">
              {t("app_name")}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          {/* Notifications Button */}
          <Notifications user={user} token={token} from={from} />

          {/* User Button */}
          <IconMenu
            sx={{ fontSize: "25px" }}
            icon={(
              <>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.primary.light, /* fontSize: "25px" */ }} // XDone
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.primary.xdarker }} // XDone
                  >
                    {user.userLastName}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.primary.xlighter }} // XDone
                  >
                    {user.userStatus}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{
                    objectFit: "cover",
                    marginInlineStart: "10px",
                  }}
                />
              </>
            )}
            list={user && token ? loggedIn : loggedOut}
            staticList={staticMenuListItem}
          />

          {/* Burger Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: theme.palette.primary.dark, // XDone
              mr: 2,
              display: {
                sm: 'none'
              }
            }}
          />

        </Box>

      </Toolbar>
    </AppBar>
  </>);
};

export default Navbar;