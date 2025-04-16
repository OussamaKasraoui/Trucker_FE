import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // React Router hooks for path parsing
import PropTypes from 'prop-types'; // For type-checking props
import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';

const Breadcrumbs = ({ separator, i18n, theme }) => {
  const location = useLocation(); // Get the current URL path
  const pathnames = location.pathname.split('/').filter((x) => x); // Break path into segments
  const customLabels = {
    dashboard: 'Dashboard',
    profile: 'User Profile',
    settings: 'App Settings',
  };
  
  return (
    <MUIBreadcrumbs separator={separator || '/'} aria-label="breadcrumb">
      {/* Generate links for each segment */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`; // Path up to current segment
        const isLast = index === pathnames.length - 1; // Check if last segment
        const isFirst = index === 0; // Check if first segment
        const label = customLabels[value] || value; // Use custom label if provided

        return isLast ? (
          // Current page segment: no link
          <Typography key={to} color={theme.palette.secondary.main}>
            {label}
          </Typography>
        ) : (
          // Clickable link for intermediate paths
          <Link key={to} to={isFirst ? `${to}/dashboard` : to} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            {label}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

// Prop types for flexibility
Breadcrumbs.propTypes = {
  separator: PropTypes.string, // Custom separator (e.g., ">", "|")
  customLabels: PropTypes.object, // Map for renaming default path labels
};

export default Breadcrumbs;
