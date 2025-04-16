import { useState, useEffect, useMemo } from 'react';
import * as MuiIcons from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Box
} from '@mui/material';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  ExpandLess,
  ExpandMore,
  ErrorOutline
} from '@mui/icons-material';

// Dynamic icon loader with error handling and tree-shaking
const getIconComponent = (iconName) => {
  try {
    const baseName = iconName.replace(/Icon$/, '');
    const icon = MuiIcons[iconName] || MuiIcons[baseName];
    if (!icon) {
      console.warn(`Icon "${iconName}" not found. Using fallback.`);
      return ErrorOutline;
    }
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error);
    return ErrorOutline;
  }
};

const Sidebar = ({ isSidebarOpen, toggleDrawer, menu, route, outletContext }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const [active, setActive] = useState('');
  const [collapsable, setCollapsable] = useState(() => {
    const initialCollapsable = {};
    menu.forEach(item => {
      if (item.items?.length) initialCollapsable[item.name] = false;
    });
    return initialCollapsable;
  });

  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const drawerWidth = isSidebarExtended ? 200 : 60;
  const direction = i18n.dir() === 'ltr' ? 'left' : 'right';
  const Chevron = direction === 'left' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />;

  useEffect(() => {
    const route = pathname.split('/').filter(Boolean);
    setActive(route[1]?.toLowerCase());
  }, [pathname, i18n.dir()]);

  const handleCollapseToggle = (itemText) => {
    setCollapsable(prev => ({ ...prev, [itemText]: !prev[itemText] }));
  };

  const ColorizeIcon = useMemo(() => ({ iconName, color, size }) => {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent sx={{ color, fontSize: size }} />;
  }, []);

  const renderListItem = ({ children, dense }) => (
    <ListItem disablePadding dense={dense}>
      {children}
    </ListItem>
  );

  const renderMainListItemButton = ({ name, icon }) => (
    <Tooltip title={!isSidebarExtended ? name : ""} placement="right">
      <ListItemButton
        onClick={() => handleCollapseToggle(name)}
        sx={{
          backgroundColor: theme.palette.background.lighter,
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
        }}
      >
        <ListItemIcon>
          <ColorizeIcon 
            iconName={icon} 
            color={collapsable[name] ? theme.palette.primary.main : theme.palette.secondary.lighter}
            size={24}
          />
        </ListItemIcon>

        {isSidebarExtended && (
          <ListItemText
            primary={name}
            primaryTypographyProps={{
              color: collapsable[name] ? theme.palette.primary.main : theme.palette.secondary.lighter,
              fontWeight: "700",
            }}
            sx={{ opacity: isSidebarExtended ? 1 : 0, transition: 'opacity 0.3s ease' }}
          />
        )}
        {isSidebarExtended && (collapsable[name] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
    </Tooltip>
  );

  const renderNestedListItems = ({ items }) => (
    items.map((item) => (
      <Tooltip key={item.name} title={!isSidebarExtended ? item.name : ""} placement="right">
        <ListItemButton
          onClick={() => {
            outletContext.setRedirect({
              redirect: true,
              to: `/${route?.toLowerCase()}/${item.name?.toLowerCase()}`,
              replace: false,
              data: item,
            });
            setActive(item.name?.toLowerCase());
          }}
          sx={{ transition: 'all 0.3s ease' }}
        >
          <ListItemIcon>
            <ColorizeIcon 
              iconName={item.icon} 
              color={theme.palette.secondary.main}
              size={24}
            />
          </ListItemIcon>
          {isSidebarExtended && (
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                color: theme.palette.secondary.main,
                fontWeight: "400",
              }}
              sx={{ opacity: isSidebarExtended ? 1 : 0, transition: 'opacity 0.3s ease' }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    ))
  );

  return (
    <Box>
      <Drawer
        open={isSidebarOpen}
        onClose={() => toggleDrawer(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            position: "absolute",
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.background.lighter,
            width: drawerWidth,
            dir: i18n.dir(),
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Box width="100%" component="nav">
          <List
            subheader={
              <Tooltip title={isSidebarExtended ? "Collapse" : "Expand"} placement="right">
                <ListItemButton onClick={() => setIsSidebarExtended(prev => !prev)}>
                  <ListItemIcon sx={{ color: theme.palette.secondary.lighter }}>
                    {isSidebarExtended ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            }
          >
            {menu.map(({ name, icon, items }) => (
              <Box key={name}>
                {items?.length ? (
                  <>
                    {renderListItem({ children: renderMainListItemButton({ name, icon }) })}
                    <Collapse
                      in={collapsable[name]}
                      timeout={500}
                      unmountOnExit
                      sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                      {renderNestedListItems({ items })}
                    </Collapse>
                  </>
                ) : (
                  renderListItem({
                    children: (
                      <Tooltip title={!isSidebarExtended ? name : ""} placement="right">
                        <ListItemButton
                          onClick={() => {
                            outletContext.setRedirect({
                              redirect: true,
                              to: `/${name.toLowerCase()}`,
                              replace: false,
                            });
                            setActive(name.toLowerCase());
                          }}
                          sx={{ transition: 'all 0.3s ease' }}
                        >
                          {!isSidebarExtended && (
                            <ListItemIcon>
                              <ColorizeIcon iconName={icon} color="red" size={24} />
                            </ListItemIcon>
                          )}
                          {isSidebarExtended && (
                            <ListItemText
                              primary={name}
                              sx={{
                                color: "pink",
                                fontWeight: "bold",
                                fontSize: "18px",
                                opacity: isSidebarExtended ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                              }}
                            />
                          )}
                        </ListItemButton>
                      </Tooltip>
                    )
                  }))
                }
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;



// import React, { useState, useEffect } from 'react';
// import {
//   Box, Drawer, Tooltip, List, Button, ListItem,
//   ListItemButton, ListItemIcon, ListItemText, Collapse,
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// import {
//   ChevronRightOutlined,
//   ChevronLeftOutlined,
//   ShoppingCartOutlined,
//   Groups2Outlined,
//   ReceiptLongOutlined,
//   PublicOutlined,
//   PointOfSaleOutlined,
//   TodayOutlined,
//   CalendarMonthOutlined,
//   AdminPanelSettingsOutlined,
//   TrendingUpOutlined,
//   PieChartOutlined,
//   ExpandMore,
//   ExpandLess,
// } from "@mui/icons-material";

// import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
// import RoofingIcon from '@mui/icons-material/Roofing';
// import HandshakeIcon from '@mui/icons-material/Handshake';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
// import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
// import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import Groups3Icon from '@mui/icons-material/Groups3';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import GavelIcon from '@mui/icons-material/Gavel';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import TuneIcon from '@mui/icons-material/Tune';
// import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
// import HomeIcon from '@mui/icons-material/Home';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
// import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
// import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import DoneIcon from '@mui/icons-material/Done';
 

// const navItemsIcon = {
//   null: null,
//   HomeOutlined: HomeIcon, // <HomeOutlined />,
//   HomeIcon: HomeIcon, // <HomeOutlined />,
//   ShoppingCartOutlined: ShoppingCartOutlined, // <ShoppingCartOutlined />,
//   Groups2Outlined: Groups2Outlined, // <Groups2Outlined />,
//   ReceiptLongOutlined: ReceiptLongOutlined, // <ReceiptLongOutlined />,
//   PublicOutlined: PublicOutlined, // <PublicOutlined />,
//   PointOfSaleOutlined: PointOfSaleOutlined, // <PointOfSaleOutlined />,
//   TodayOutlined: TodayOutlined, // <TodayOutlined />,
//   CalendarMonthOutlined: CalendarMonthOutlined, // <CalendarMonthOutlined />,
//   PieChartOutlined: PieChartOutlined, // <PieChartOutlined />,
//   AdminPanelSettingsOutlined: AdminPanelSettingsIcon, // <AdminPanelSettingsOutlined />,
//   AdminPanelSettingsOutlinedIcon: AdminPanelSettingsOutlined,
//   TrendingUpOutlined: TrendingUpOutlined, // <TrendingUpOutlined />,
//   VpnKeyOutlinedIcon: VpnKeyOutlinedIcon, // <VpnKeyOutlinedIcon/>,
//   AssignmentIndIcon: AssignmentIndIcon, // <AssignmentIndIcon/>,
//   DashboardOutlined: DashboardOutlinedIcon, // <DashboardOutlinedIcon />,
//   DashboardOutlinedIcon: DashboardOutlinedIcon, // <DashboardOutlinedIcon />,
//   NotificationsOutlined: NotificationsNoneOutlinedIcon, // <NotificationsNoneOutlinedIcon />,
//   NotificationsNoneOutlinedIcon: NotificationsNoneOutlinedIcon,
//   FlashOnOutlined: FlashOnOutlinedIcon, // <FlashOnOutlinedIcon />,
//   FlashOnOutlinedIcon: FlashOnOutlinedIcon, // <FlashOnOutlinedIcon />,
//   ApartmentOutlined: RoofingIcon, // <RoofingIcon />,
//   RoofingIcon: RoofingIcon, // <RoofingIcon />,
//   HandshakeOutlined: HandshakeIcon, // <HandshakeIcon />,
//   HandshakeIcon: HandshakeIcon, // <HandshakeIcon />,
//   BalanceOutlined: BalanceOutlinedIcon, // <BalanceOutlinedIcon />,
//   BalanceOutlinedIcon: BalanceOutlinedIcon, // <BalanceOutlinedIcon />,
//   GroupsOutlined: Diversity3OutlinedIcon, // <Diversity3OutlinedIcon />,
//   Diversity3OutlinedIcon: Diversity3OutlinedIcon, // <Diversity3OutlinedIcon />,
//   AccountBalanceOutlined: AccountBalanceWalletIcon, // <AccountBalanceWalletIcon />,
//   AccountBalanceWalletIcon: AccountBalanceWalletIcon, // <AccountBalanceWalletIcon />,
//   MonetizationOnOutlined: MonetizationOnOutlinedIcon, // <MonetizationOnOutlinedIcon />,
//   MonetizationOnOutlinedIcon: MonetizationOnOutlinedIcon, // <MonetizationOnOutlinedIcon />,
//   ManageAccountsOutlined: ManageAccountsIcon, // <ManageAccountsIcon />,
//   ManageAccountsIcon: ManageAccountsIcon, // <ManageAccountsIcon />,
//   GroupWorkOutlined: Diversity2Icon, // <Diversity2Icon />,
//   StrategyOutlined: AppRegistrationIcon, // <AppRegistrationIcon />,
//   AppRegistrationIcon: AppRegistrationIcon, // <AppRegistrationIcon />,
//   TeamOutlined: Groups3Icon, // <Groups3Icon />,
//   Groups3Icon: Groups3Icon, // <Groups3Icon />,
//   EmojiPeopleOutlined: EmojiPeopleOutlinedIcon, // <EmojiPeopleOutlinedIcon />,
//   LocationCityOutlined: LocationCityIcon, // <LocationCityIcon />,
//   LocationCityIcon: LocationCityIcon,
//   ConnectWithoutContactOutlined: ConnectWithoutContactIcon, // <ConnectWithoutContactIcon />,
//   EngineeringOutlined: EngineeringIcon, // <EngineeringIcon />,
//   RequestQuoteOutlined: RequestQuoteIcon, // <RequestQuoteIcon />,
//   RequestQuoteIcon: RequestQuoteIcon, // <RequestQuoteIcon />,
//   AssignmentLateOutlined: AssignmentLateIcon, // <AssignmentLateIcon />,
//   AssignmentLateIcon: AssignmentLateIcon,
//   NotificationImportantOutlined: NotificationImportantOutlinedIcon, // <NotificationImportantIcon />,
//   AttachMoneyOutlined: AttachMoneyIcon, // <AttachMoneyIcon />,
//   AttachMoneyIcon: AttachMoneyIcon, // <AttachMoneyIcon />,
//   GavelOutlined: GavelIcon, // <GavelIcon />,
//   SettingsOutlined: TuneIcon, // <SettingsOutlinedIcon />,
//   TuneIcon: TuneIcon, // <SettingsOutlinedIcon />,
//   BuildOutlined: SettingsOutlinedIcon, // <TuneIcon />,
//   SettingsOutlinedIcon: SettingsOutlinedIcon, // <TuneIcon />,
//   PersonOutlined: Person2OutlinedIcon, // <PersonIcon />,
//   Person2OutlinedIcon: Person2OutlinedIcon, // <PersonIcon />,
//   LockOpenOutlined: LockOpenOutlinedIcon, // <LockOpenOutlinedIcon />,
//   LockOpenOutlinedIcon: LockOpenOutlinedIcon, // <LockOpenOutlinedIcon />,
//   MessageOutlined: ForumOutlinedIcon, // <ForumIcon />,
//   ForumOutlinedIcon: ForumOutlinedIcon, // <ForumIcon />,
//   NotificationsActiveOutlined: NotificationsActiveOutlinedIcon, // <NotificationsActiveIcon />,
//   NotificationsActiveOutlinedIcon: NotificationsActiveOutlinedIcon, // <NotificationsActiveIcon />,
//   HelpOutlineOutlined: HelpOutlineSharpIcon, // <HelpOutlineSharpIcon />,
//   MoneyOffIcon: MoneyOffCsredOutlinedIcon, // <HelpOutlineSharpIcon />,
//   HelpOutlineSharpIcon: MoneyOffCsredOutlinedIcon, // <HelpOutlineSharpIcon />,
//   AssignmentOutlinedIcon: AssignmentIcon,
//   CalendarTodayOutlinedIcon: CalendarTodayOutlinedIcon,
//   CalendarTodayIcon: CalendarTodayOutlinedIcon,
//   DoneOutlineIcon: DoneIcon,
//   SupportAgentOutlined: SupportAgentIcon, // <SupportAgentIcon />,
//   SupportAgentOutlinedIcon: SupportAgentIcon,
// }

// const Sidebar = ({ isSidebarOpen, toggleDrawer, menu, route, outletContext }) => {
//   const theme                   = useTheme();
//   const { t, i18n }             = useTranslation();
//   const { pathname }            = useLocation();  

//   const [active, 
//         setActive]              = useState("");

//   const [collapsable, 
//         setCollapsable]         = useState(() => {

//     const initialCollapsable = {};
//     const recursuve = (name, array) => {
//       array.forEach(item => {

//         if (item.items?.length) {
//           initialCollapsable[item.name] = false; // Initially closed
//         }
  
//       });
//     }

//     menu.forEach(item => {

//       if (item.items?.length) {
//         initialCollapsable[item.name] = false; // Initially closed
//       }

//     });

//     return initialCollapsable;
//   });

//   const [isSidebarExtended,
//         setIsSidebarExtended]   = useState(false);

//   const nestedStyle             = { paddingLeft: theme.spacing(2) };
//   const drawerWidth             = isSidebarExtended ? 200 : 60; // Adjust width based on `isSidebarOpen`
//   const direction               = i18n.dir() === 'ltr' ? 'left' : 'right';
//   const Chevron                 = direction === 'left' ? <ChevronRightOutlined sx={{ ml: "auto" }} /> : <ChevronLeftOutlined sx={{ ml: "auto" }} />;


//   useEffect(() => {

//     // Split the string by "/" and filter out empty parts
//     const route = pathname.split('/').filter(Boolean);
    
//     setActive(route[1]?.toLocaleLowerCase());
//   }, [pathname, i18n.dir()]);

//   const handleCollapseToggle = (itemText) => {
//     setCollapsable((prev) => ({
//       ...prev,
//       [itemText]: !prev[itemText],
//     }));
//   };

//   // Helper function to render a ListItem wrapper
//   const renderListItem = ({ children, dense }) => (
//     <ListItem disablePadding dense={dense}>
//       {children}
//     </ListItem>
//   );

//   // Helper function to render the main ListItemButton with Tooltip
//   const renderMainListItemButton = ({ name, icon, }) => {
//     return (
//       <Tooltip title={!isSidebarExtended ? name : ""} placement="right">
//         <ListItemButton
//           onClick={() => handleCollapseToggle(name)}
//           sx={{
//             // color: name??.toLowerCase() === active && !isSidebarExtended ? theme.palette.primary.main : 'transparent',
//             backgroundColor: theme.palette.background.lighter
//             // justifyContent: isSidebarExtended ? "space-between" : "center",
//             // px: isSidebarExtended ? 2 : 0,
//           }}
//         >
//           <ListItemIcon>
//             <ColorizeIcon
//               Icon={icon}
//               color={collapsable[name] ? theme.palette.primary.main : theme.palette.secondary.lighter}
//               size={24}
//             />
//           </ListItemIcon>

//           {isSidebarExtended && (
//             <ListItemText primary={`${name}`} // 22222222222222222222 
//               primaryTypographyProps={{
//                 color: /* theme.palette.secondary.lighter */ collapsable[name] ? theme.palette.primary.main : theme.palette.secondary.lighter,
//                 fontWeight: "700",
//               }}
//             />
//           )}
//           {isSidebarExtended && collapsable[name] ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//       </Tooltip>
//   )};

//   // Helper function to render nested ListItems
//   const renderNestedListItems = ({ items }) => (
//     <>
//       {items.map((item, index) => {
        
//         return renderListItem({
//           dense: true,
//           children: (

//             <Tooltip title={!isSidebarExtended ? item.name : ""} placement="right">
//               <ListItemButton
//                 key={item.name}
//                 onClick={() => {
//                   outletContext.setRedirect({
//                     redirect: true,
//                     to: `/${route?.toLowerCase()}/${item.name?.toLowerCase()}`,
//                     replace: false,
//                     data: item, //.props,
//                   })
//                   setActive(item.name?.toLowerCase());
//                 }}
//               >
//                 <ListItemIcon>
//                   <ColorizeIcon Icon={item.icon} color={theme.palette.secondary.main} size={24} />
//                 </ListItemIcon>

//                 {isSidebarExtended && <ListItemText primary={`${item.name}`}  // 111111111111111111
//                   primaryTypographyProps={{
//                     color: theme.palette.secondary.main,
//                     fontWeight: "400",
//                   }}
//                 />}
//               </ListItemButton>
//             </Tooltip>)
//         })
      
//       })}
//     </>
//   );

//   // Helper function to render non-collapsible ListItemButton
//   const renderNonCollapsibleListItem = ({ name, icon, lcText }) => (
//     <Tooltip title={!isSidebarExtended ? name : ""} placement="right">
//       <ListItemButton
//         onClick={() => {
//           outletContext.setRedirect({
//             redirect: true,
//             to: `/${lcText}`,
//             replace: false,
//             data: undefined,
//           })

//           setActive(lcText);
//         }}
//       >
//         {!isSidebarExtended && (
//           <ListItemIcon>
//             <ColorizeIcon Icon={icon} color={"red"} size={24}/>
//             {/* {navItemsIcon[icon]} */}
//           </ListItemIcon>
//         )}
//         {isSidebarExtended && <ListItemText primary={`${name} 333333333333`} sx={{
//           color: "pink",
//           fontWeight: "bold",
//           fontSize: "18px",
//         }}
//         />}
//       </ListItemButton>
//     </Tooltip>
//   );

//   // Main component
//   const SidebarItem = ({ name, items, icon, lcText }) => (
//     <Box key={name}>
//       {items?.length ? (
//         <>
//           {renderListItem({ children: renderMainListItemButton({name, icon }) })}
//           <Collapse
//             in={collapsable[name]} // Determines whether the section is open
//             unmountOnExit // Removes DOM content when collapsed
//             timeout={1500} // Animation duration for open/close
//             sx={{
//               backgroundColor: theme.palette.primary.main, // Background color for visibility
//             }}
//           >
//             {renderNestedListItems({ items })}
//           </Collapse>
//         </>
//       ) : (
//         renderListItem({ children: renderNonCollapsibleListItem({ name, icon, lcText, }) })
//       )}
//     </Box>
//   );
  

//   const ColorizeIcon = ({ Icon, color, size }) => {
//     const SomeIcon = navItemsIcon[Icon]
//     return (<SomeIcon sx={{ color: color, fontSize: size }} />)
//   };


//   return (
//     <Box>

//       <Drawer
//         open={isSidebarOpen}
//         onClose={() => toggleDrawer(false)}
//         variant={"persistent"}
//         anchor="left"
//         sx={{
//           width: drawerWidth,
//           top: "unset",
//           '& .MuiDrawer-paper': {
//             position: "absolute",
//             color: theme.palette.secondary.light,
//             // backgroundColor: theme.palette.background.alt,
//             backgroundColor: theme.palette.background.lighter,
//             boxSizing: 'border-box',
//             borderWidth: '1px',
//             width: drawerWidth,
//             dir: i18n.dir() === 'ltr' ? 'left' : 'right',
//           },
//         }}
//       >

//         <Box width="100%" component="nav">

//           <List 
//             component="nav"
//             subheader={
//               <Tooltip title={isSidebarExtended ? "collapse" : "Expand"} placement="right">
//                   <ListItemButton
//                     onClick={() => setIsSidebarExtended(prevState => !prevState)}
//                     sx={{
//                       // backgroundColor: active === lcText ? theme.palette.secondary.light : 'transparent',
//                       // color: active === lcText ? theme.palette.primary.main : theme.palette.secondary.lighter,
//                     }}
//                   >
//                     <ListItemIcon sx={{ color: theme.palette.secondary.lighter }}>
//                       {
//                         !isSidebarExtended ?
//                           <ChevronRightOutlined /* sx={{ ml: "auto" }} */ /> :
//                           <ChevronLeftOutlined /* sx={{ ml: "auto" }} */ />
//                       }
//                     </ListItemIcon>
//                   </ListItemButton>
//                 </Tooltip>
//             }
      
//           >

//             { menu.map(({ name, icon, items }, index) => {
//               const lcText = name?.toLowerCase();
//               return (
//                 <SidebarItem
//                   key={name}

//                   index=          {index}
//                   length=         {menu.length}
//                   active=         {active}
//                   activeContext=  {active}

//                   name={name}
//                   items={items}
//                   icon={icon}
                  
//                   lcText={lcText}
//                 />
//               );
//             })}


//           </List>
//         </Box>
//       </Drawer>

//     </Box>
//   );
// };

// export default Sidebar;