// SignOut.js
import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // onSignOut(); // Call the provided onSignOut function
    navigate("/"); // Redirect to the login page
    window.location.reload();
  };

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
            backgroundColor: alpha("#FF0000", 0.8), // Full red on hover
          },
        }}
        onClick={handleSignOut}
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
