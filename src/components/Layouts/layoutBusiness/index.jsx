import React, { useState, useEffect} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { useTranslation } from "react-i18next";
import authService from "@services/auth.service";

const LayoutBusiness = () => {
  const { t, i18n } = useTranslation("navbar_home");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const localySavedUser =  useSelector((state) => state.auth.user) || authService.getCacheUser() || {};
  const localySavedToken = useSelector((state) => state.global.token) || authService.getCacheToken() || null;

  const [ user ,setUser ] = useState(localySavedUser)
  const [ token ,setToken ] = useState(localySavedToken)
  const [navItems, setNavItems] = useState(user.navItems ? user.navItems : [
    {
      text: t("signin"),
      icon: "VpnKeyOutlinedIcon"
    },
    {
      text: t("signup"),
      icon: "AssignmentIndIcon"
  }])

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          token= {token || ''}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          pathname={location.pathname}
        />
        <Outlet context={[
                          navItems, setNavItems,
                          user,     setUser,
                          token,    setToken
        ]} />
      </Box>
    </Box>
  );
};

export default LayoutBusiness;
