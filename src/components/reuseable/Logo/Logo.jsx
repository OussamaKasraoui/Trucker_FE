import React from 'react'
import { Link } from 'react-router-dom'
import Box from "@mui/material/Box";
import './Logo.css'

import logo from "./../../../assets/LandingPage/logo.png";

function Logo(props) {
  const {text='TurtleX', text2='Digital'} = props

  return (<>
  <Link className="logo" to=''>
    <Box
      component="img"
      alt="login"
      src={logo}
      height="48px"
      width="48px"
      borderRadius="50%"
      sx={{ objectFit: "cover" }}
    />
  </Link>
  </>)
}

export default Logo