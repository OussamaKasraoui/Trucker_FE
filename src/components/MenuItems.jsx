import React, { useEffect, useState }         from "react";
import { MenuItem }                 from "@mui/material";
import { useTranslation }           from "react-i18next";
import authService                  from "@services/auth.service";

import Avatar                       from '@mui/material/Avatar';
import Divider                      from '@mui/material/Divider';
import ListItemIcon                 from '@mui/material/ListItemIcon';
import Settings                     from '@mui/icons-material/Settings';
import Logout                       from '@mui/icons-material/Logout';
import VpnKeyOutlinedIcon           from '@mui/icons-material/VpnKeyOutlined';
import AssignmentIndIcon            from '@mui/icons-material/AssignmentInd';
import RuleSharpIcon                from '@mui/icons-material/RuleSharp';
import AirplanemodeActiveSharpIcon  from '@mui/icons-material/AirplanemodeActiveSharp';


const MenuItemsList = ({user, token, handleClickUser, handleCloseUser} ) => {
    const { t } = useTranslation("navbar_home");
    //const navigate = useNavigate();

    const loggedOut  = [
        { 
          text: t("signin"),  
          icon: (<ListItemIcon><VpnKeyOutlinedIcon fontSize="small" /></ListItemIcon>)  , 
          action: () => handleClickUser({func:"Navigate", params:"/login"})
        },
        { 
          text: t("signup"),  
          icon: (<ListItemIcon><AssignmentIndIcon fontSize="small" /></ListItemIcon>) , 
          action: () => handleClickUser({func:"Navigate", params:"/register"})
        }
    ]

    const loggedIn = [
        { 
          text: t("HelloUser")+" "+user.userLastName, 
          icon: (<ListItemIcon><AirplanemodeActiveSharpIcon Settings fontSize="small" /></ListItemIcon>),
          action: null 
        },
        { 
          text: t("Dashboard"),                       
          icon: (<ListItemIcon><RuleSharpIcon Logout fontSize="small" /></ListItemIcon>),
          action: () => handleClickUser({func:"Navigate", params:`/${user?.userPack?.packName?.toLowerCase()}/dashboard`})  
        },
        { 
          text: t("settings"),                        
          icon: (<ListItemIcon><Settings fontSize="small" /></ListItemIcon>),
          action: () => handleClickUser({func:"Navigate", params:`/${user?.userPack?.packName?.toLowerCase()}/settings`}) 
        },
        { 
          text: t("Logout"),                          
          icon: (<ListItemIcon><Logout fontSize="small" /></ListItemIcon>),
          action: authService.removeCacheUser 
        }
    ]

    const [Items, setItems] = useState([]);

    useEffect(()=>{
      if( user && token){
        setItems(loggedIn)
      }else{
        setItems(loggedOut)
      }
    }, []);

    return(
      <React.Fragment>
        <MenuItem onClick={handleCloseUser}>
          <Avatar /> Some thing I
        </MenuItem>

        <MenuItem onClick={handleCloseUser}>
          <Avatar /> Some thing II
        </MenuItem>

        <Divider />

              
        <React.Fragment>
          {Items.map((item, index)=> (
            <MenuItem key={index} onClick={item.action}>
              {item.icon}
            {item.text}
            </MenuItem>
          ))}
        </React.Fragment>
              

      </React.Fragment>
    )
}

export default MenuItemsList;