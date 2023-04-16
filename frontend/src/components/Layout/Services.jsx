import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Services = () => {
  return (
    <Container sx={{ mt: { xs: 6, sm: 8 }, textAlign: 'center', padding: "5vmax" }}>
        <Typography fontSize="6rem">
          ⚠️
        </Typography>
      <Typography  variant="h4" color="primary" fontFamily="Roboto" fontWeight="bold" >
        UNDER DEVLOPMENT
      </Typography>
      <Typography variant="h5"color="primary">
        This page is currently under development. Please check back later for updates.
      </Typography>
    </Container>
  );  
};

export default Services;
