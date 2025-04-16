// ErrorModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Box, Typography } from '@mui/material';
import authService from '@services/auth.service';

const ErrorModal = ({ open, onClose, error, setLoaded }) => {
  // Determine the background color based on the error type
  const getErrorColor = (code) => {
    switch (code) {
      case 'ERR_BAD_REQUEST':
        return '#f44336'; // Red
      case 'ECONNABORTED':
        return '#ff9800'; // Orange
      case 'ENOTFOUND':
        return '#2196f3'; // Blue
      case 'ERR_NETWORK':
        return '#9c27b0'; // Purple
      case 'ERR_FR_TOO_MANY_REDIRECTS':
        return '#ffeb3b'; // Yellow
      case 'ERR_CANCELED':
        return '#607d8b'; // Grey
      case 'ECONNREFUSED':
        return '#ff5722'; // Deep Orange
      case 'EAI_AGAIN':
        return '#ffc107'; // Amber
      default:
        return '#9e9e9e'; // Default Grey for unexpected errors
    }
  };

  const onClick = () => {

    if (error.response && error.response.status === 401) {
        onClose()
        authService.removeCacheUser()
        return
    }

    if (error.response && error.response.status === 422) {
        onClose()
        setLoaded(false)
        return
    }


    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full height
          bgcolor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        }}
      >
        <Box
          sx={{
            background: '#fff',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%', // Responsive width
            padding: '20px',
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            { error && error.response ? error.response.statusText : "Error"}
          </Typography>

          <Typography variant="body1">
            {error && error.response?.data?.message ? error.response.data.message : 'An unexpected error occurred.'}
          </Typography>

          <Button onClick={onClick} color="primary" variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default ErrorModal;
