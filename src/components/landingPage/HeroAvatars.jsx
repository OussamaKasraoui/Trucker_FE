import React from "react";
import { AvatarGroup, Avatar } from "@mui/material";
import avatar1 from "./../../assets/avatarImages/Ellipse 31.png";
import avatar2 from "./../../assets/avatarImages/Ellipse 32.png";
import avatar3 from "./../../assets/avatarImages/Ellipse 33.png";
import avatar4 from "./../../assets/avatarImages/Ellipse 34.png";
import avatar5 from "./../../assets/avatarImages/Ellipse 35.png";
import avatar6 from "./../../assets/avatarImages/Ellipse 36.png";

function HeroAvatars() {
  return (
    <>
      <AvatarGroup
        sx={{ justifyContent: "left", mt: "20px" }}
        max={6}
        total={12006}
      >
        <Avatar alt="avatar" src={avatar1} />
        <Avatar alt="avatar" src={avatar2} />
        <Avatar alt="avatar" src={avatar3} />
        <Avatar alt="avatar" src={avatar4} />
        <Avatar alt="avatar" src={avatar5} />
        <Avatar alt="avatar" src={avatar6} />
      </AvatarGroup>
    </>
  );
}

export default HeroAvatars;
