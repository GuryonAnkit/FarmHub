import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

//Content array for cards
const profiles = [
  {
    name: "MOHAMMAD ARSHAD KHAN",
    image: "/Images/arshad.jpg",
    twitter: "https://twitter.com/marshadkhn ",
  },
  {
    name: "ADITYA KUMAR MISHRA",
    image: "/Images/demo.jpg",
    twitter: "https://twitter.com/Aditya_m037",
  },
  {
    name: "ABDUL MANNAN",
    image: "/Images/abdul.jpg",
    twitter: "https://twitter.com/Abdul_365m",
  },
  {
    name: "ANKIT KUMAR MISHRA",
    image: "/Images/demo.jpg",
    twitter: "#",
  },
];

const AboutUs = () => {
  return (
    <Container sx={{ mt: { xs: 6, sm: 8 } }}>
      <Typography
        pt={7}
        variant="h4"
        fontWeight="500"
        fontFamily="Roboto"
        color="cropHeading.main"
        gutterBottom
      >
        ABOUT US
      </Typography>
      <Typography
        paddingBottom={3}
        color="primary"
        gutterBottom
        fontFamily="Roboto"
        fontWeight="bold"
      >
        Welcome to FarmHub, your one-stop-shop for fresh, locally available
        products. At FarmHub, we are passionate about sustainable agriculture
        and committed to quality. We use sustainable and organic farming
        practices to grow a wide variety of fruits and vegetables. In addition
        to our farm stand, we also participate in local farmers' markets and
        offer a range of alternative pesticides and other agriculture methods to
        enhance your crop. We also provide help for new customers that are new
        on our website. We are proud of being able to contribute a little the
        vast domain like agricultural.
      </Typography>
      <Typography
        pt={7}
        variant="h5"
        fontWeight="500"
        fontFamily="Roboto"
        color="cropHeading.main"
        gutterBottom
      >
        Maintainers
      </Typography>
      <Grid container spacing={5}>
        {profiles.map((profile) => (
          <Grid item xs={3}>
            <Card sx={{ maxWidth: 345, width: "15rem" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="270"
                  image={profile.image}
                  alt="green iguana"
                />
                <CardContent
                  sx={{ display: "flex", alignItems: "center", height: "4rem" }}
                >
                  <Typography
                    sx={{ mr: "auto" }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {profile.name}
                  </Typography>
                  <IconButton
                    component={Link}
                    to={profile.twitter}
                    aria-label="delete"
                    sx={{ color: "#00a2f5" }}
                  >
                    <TwitterIcon />
                  </IconButton>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
