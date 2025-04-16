import React, { useState, useEffect }             from "react";
import { Navigate, useNavigate }                  from "react-router-dom";
import { useTranslation }                         from "react-i18next";
import { useDispatch }                            from "react-redux";

import TinyFlag                                   from "tiny-flag-react";

import FlexBetween                                from "./../FlexBetween";
import Notifications                              from "./../Notifications.Component"
import IconMenu                                   from "./../IconMenu.Component";

import { setStateMode }                           from "@states/slices/global";
import profileImage                               from "./../../assets/profile.jpeg";
import authService                                from "@services/auth.service";
import {LightMode,
        Menu as MenuIcon,Search,
        ArrowDropDownOutlined,}                   from "@mui/icons-material";
import HomeIcon                                   from '@mui/icons-material/Home';
import ConstructionIcon                           from '@mui/icons-material/Construction';
import MailIcon                                   from "@mui/icons-material/Mail";
import GTranslateOutlinedIcon                     from '@mui/icons-material/GTranslateOutlined';
import Settings                                   from '@mui/icons-material/Settings';
import Logout                                     from '@mui/icons-material/Logout';
import VpnKeyOutlinedIcon                         from '@mui/icons-material/VpnKeyOutlined';
import AssignmentIndIcon                          from '@mui/icons-material/AssignmentInd';
import RuleSharpIcon                              from '@mui/icons-material/RuleSharp';
import AirplanemodeActiveSharpIcon                from '@mui/icons-material/AirplanemodeActiveSharp';
import DarkModeSharpIcon                          from '@mui/icons-material/DarkModeSharp';

import { AppBar,Box,Typography,IconButton,
        Toolbar,useTheme}                         from "@mui/material";
import ListItemIcon                               from '@mui/material/ListItemIcon';
import Link                                       from '@mui/material/Link';






const Navbar = ({ user, token, isSidebarOpen, setIsSidebarOpen, pathname }) => {
  const { t, i18n } = useTranslation("navbar_home");
  const [redirect, setRedirect ] = useState(null)
  const dispatch    = useDispatch();
  const theme       = useTheme();
  const navigate    = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const isOpenUser = Boolean(anchorElUser);
  
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget)
    if(event.func === "Navigate"){
      handleCloseUser()
      setRedirect(event.params)
    }
  };
  const handleCloseUser = () => setAnchorElUser(null);

  const [anchorElTrans, setAnchorElTrans] = React.useState(null);
  const isOpenTrans = Boolean(anchorElTrans);
  
  const handleClickTrans = (event) => {
    setAnchorElTrans(event.currentTarget);
    if (event.target.lang){
      i18n.changeLanguage(event.target.lang)
      handleCloseTrans()
    }
  };
  const handleCloseTrans = () => {setAnchorElTrans(null);};

  useEffect(()=> {
    setRedirect(null)
  }, [redirect, anchorElUser])

  const pages = [
    { name: t("landpage"), icon: <HomeIcon />, url: "/" },
    { name: t("products"), icon: <ConstructionIcon />, url: "/about" },
    { name: t("contactus"), icon: <MailIcon />, url: "/contact" },
  ];

  const loggedOut  = [
    {
      action: () => { handleClickUser({func:"Navigate", params:"/login"}) },
      text: 
      (
        <FlexBetween gap={'1.5 rem'}>
          <ListItemIcon>
            <VpnKeyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          
          {t("signin")}
        </FlexBetween>
      ),
    },
    {
      action: () => { handleClickUser({func:"Navigate", params:"/register"}) },
      text: 
      (
        <FlexBetween>
        <ListItemIcon>
          <AssignmentIndIcon fontSize="small" />
        </ListItemIcon>
          {t("signup")}
        </FlexBetween>
      ),
    }
  ]

const loggedIn = [
    { 
      text: (
        <FlexBetween gap={'1.5 rem'}>
          <ListItemIcon><AirplanemodeActiveSharpIcon Settings fontSize="small" /></ListItemIcon>
          
          {t("HelloUser")+" "+user?.userLastName}
        </FlexBetween>
      ),
      action: () => {} 
    },
    { 
      text: (
        <FlexBetween gap={'1.5 rem'}>
          <ListItemIcon><RuleSharpIcon Logout fontSize="small" /></ListItemIcon>
          
          {t("Dashboard")}
        </FlexBetween>
      ),
      action: () => { handleClickUser({func:"Navigate", params:`/${user?.userPack?.packName?.toLowerCase()}/dashboard`}) }
    },
    { 
      text: (
        <FlexBetween gap={'1.5 rem'}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          
          {t("settings")}
        </FlexBetween>
      ),
      action: () => { handleClickUser({func:"Navigate", params:`/${user?.userPack?.packName?.toLowerCase()}/settings`}) }
    },
    { 
      text: (
        <FlexBetween gap={'1.5 rem'}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          
          {t("Logout")}
        </FlexBetween>
      ),
      action: () => { authService.removeCacheUser() }
    }
]



  return (
    <React.Fragment>
      { redirect !== null && (<Navigate to={redirect} />)}
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Sidebar Burger Icon */}
          <FlexBetween>
            {
              !['/','/register','/login','/welcome'].includes(pathname) && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <MenuIcon />
                </IconButton>
              )
            }
            
            {/* Title */}
            <FlexBetween>
              <Link href="/"    color={theme.palette.secondary.main} variant="h4" fontWeight="bold" sx={{[theme.breakpoints.up("sm")]: {display: "block",},}} noWrap style={{textDecoration: 'none'}} >
                <Typography     color={theme.palette.secondary.main} variant="h4" fontWeight="bold" sx={{[theme.breakpoints.up("sm")]: {display: "block",},}} noWrap >
                  {t("app_name")}
                </Typography>
              </Link>
            </FlexBetween>
          </FlexBetween>


          {/* RIGHT SIDE */}
          <FlexBetween gap="1.5rem">


            <FlexBetween>
              {/* Mode Button */}
              <IconButton onClick={() => dispatch(setStateMode())}>
                {theme.palette.mode === "dark" ? (
                  <LightMode sx={{  fontSize: "25px",
                  color: theme.palette.secondary.dark }} />
                ) : (
                  <DarkModeSharpIcon sx={{  fontSize: "25px",
                  color: theme.palette.primary.dark }} />
                )}
              </IconButton>

              {/* Translation Button */}
              <IconMenu 
                icon={<GTranslateOutlinedIcon sx={{ fontSize: "25px" }} />} 
                list={[
                  {
                    action: () => {i18n.changeLanguage("ar")},
                    text: 
                    (
                      <FlexBetween gap={'1.5 rem'}>
                        <TinyFlag
                          country={"MA"}
                          alt={"Morocco Flag"}
                          fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/MA.svg`}
                        />
                        {'العربية'}
                      </FlexBetween>
                    ),
                  },
                  {
                    action: () => {i18n.changeLanguage("fr")},
                    text: 
                    (
                      <FlexBetween>
                      <TinyFlag
                        c
                        country={"FR"}
                        alt={"France Flag"}
                        fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/FR.svg`}
                      />
                        {'Français'}
                      </FlexBetween>
                    ),
                  },
                  {
                    action: () => {i18n.changeLanguage("en")},
                    text:
                    ( <>
                        <TinyFlag
                          country={"EN"}
                          alt={"United States Flag"}
                          fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/US.svg`}
                        />
                        <Typography>
                          {'English'}
                        </Typography>
                      </>
                    ),
                  }
              ]} />

              {/* Notifications Button */}
              <Notifications user={user} token={token} />
              
              {/* User Button */}
              <IconMenu 
                icon={(
                  <>
                    <ArrowDropDownOutlined
                      sx={{ color: theme.palette.secondary.light, fontSize: "25px" }}
                    />
                    <Box textAlign="left">
                      <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.secondary.lighter }}
                      >
                        {user?.userLastName}
                      </Typography>
                      <Typography
                        fontSize="0.75rem"
                        sx={{ color: theme.palette.secondary.lighter }}
                      >
                        {user?.userStatus}
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
                list={ user && token ? loggedIn : loggedOut } />

            </FlexBetween>


            {/* User Icon List */}
            {/* <FlexBetween>
              <Button
                onClick={handleClickUser}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary.lighter }}
                  >
                    {user?.userLastName}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary.lighter }}
                  >
                    {user?.userStatus}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary.light, fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={isOpenUser ? true : false}
                onClose={handleCloseUser}
                onClick={handleCloseUser}
                PaperProps={{
                  elevation: 0,
                  sx: {
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
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItemsList  user={user} 
                                token={token}
                                handleClickUser={handleClickUser} 
                                handleCloseUser={handleCloseUser}
                />
              </Menu>
            </FlexBetween> */}
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

// import React from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Button,
//   IconButton,
//   Typography,
//   Menu,
//   Container,
//   Stack,
//   Link,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// const pages = ["Products", "Pricing", "Blog", "Testimonial"];

// // Appbar component from mui..................................
// function Navbar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <AppBar position="static" className="appbar">
//       <Container maxWidth="xl" className="appbar-container">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontWeight: 700,
//               fontSize: "20px",
//               color: "inherit",
//               marginRight: "20%",
//               textDecoration: "none",
//             }}
//           >
//             Handler
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               <Stack
//                 mx="10px"
//                 spacing={2}
//                 sx={{ display: { sm: "flex", md: "none" } }}
//               >
//                 <Button variant="outlined">Sign In</Button>
//                 <Button variant="contained">Start Free</Button>
//               </Stack>
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontSize: "25px",
//               fontWeight: 800,
//               textDecoration: "none",
//             }}
//           >
//             Handler
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex", gap: "25px" },
//             }}
//           >
//             {pages.map((page, id) => (
//               <Link key={id} className="nav-link" href="#" color="inherit">
//                 {page}
//               </Link>
//             ))}
//           </Box>
//           <Stack
//             direction="row"
//             spacing={2}
//             sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
//           >
//             <Button variant="outlined">Sign In</Button>
//             <Button variant="contained" sx={{ boxShadow: "none" }}>
//               Start Free
//             </Button>
//           </Stack>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navbar;
