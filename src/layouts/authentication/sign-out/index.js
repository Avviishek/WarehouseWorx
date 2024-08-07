// SignOut.js
import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

const SignOut = ({ onSignOut }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
        Are you sure to sign out?
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: alpha("#FF0000", 0.8), // Adjust the opacity for the fade effect
          color: "white",
          "&:hover": {
            backgroundColor: alpha("#FF0000", 1), // Full red on hover
          },
        }}
        onClick={onSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
};

SignOut.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default SignOut;
