import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

// Function to return an SVG image based on a given code and size
const FlagImg = ({ code, height, width }) => {
    


    return code === "fr" ? (
      // <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 900 600">
        <rect width="300" height="600" fill="#002395" />
        <rect x="300" width="300" height="600" fill="#FFF" />
        <rect x="600" width="300" height="600" fill="#ED2939" />
      </svg>
    ) : code === "ar" ? (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 90000 60000">
        <rect width="90000" height="60000" fill="#c1272d" />
        <path fill="none" stroke="#006233" strokeWidth="1426" d="M45000 17308l7460 22960-19531-14190h24142L37540 40268z" />
      </svg>
    ) : code === "en" ? (
        // <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 60 30">
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 60 30">
        {/* Define clip paths */}
        <clipPath id="a">
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id="b">
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
        
        {/* Use the clip paths */}
        <g clipPath="url(#a)">
          <path d="M0 0v30h60V0z" fill="#012169" />
          <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
          <path d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    ) : (
        // <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 60 30">
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 60 30">
        {/* Define clip paths */}
        <clipPath id="a">
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id="b">
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
        
        {/* Use the clip paths */}
        <g clipPath="url(#a)">
          <path d="M0 0v30h60V0z" fill="#012169" />
          <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
          <path d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
      );

};

export default FlagImg;
