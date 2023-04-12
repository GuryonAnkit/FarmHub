import React from 'react';
import Container  from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import  Grid from '@mui/material/Grid';
import  Card  from '@mui/material/Card';
import  CardContent from '@mui/material/CardContent';
import  CardMedia  from '@mui/material/CardMedia';

const AboutUs = () => {
    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" component="h1" gutterBottom>
                About FarmHub
            </Typography>
            <Typography variant="body1" gutterBottom>
                FarmHub is an agriculture-based project that aims to connect farmers with the resources they need to succeed. Our mission is to provide a platform for farmers to access information, tools, and support to help them grow their businesses and feed their communities.
            </Typography>
            {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Farmers working in field"
                            height="140"
                            image="/images/farmers.jpg"
                            title="Farmers working in field"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Our Farmers
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                At FarmHub, we value our farmers and the hard work they put in every day. We strive to provide them with the best resources and support to help them succeed.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Fresh produce"
                            height="140"
                            image="/images/produce.jpg"
                            title="Fresh produce"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Our Produce
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We believe in providing fresh, healthy produce to our communities. Our farmers use sustainable practices to grow the best fruits and vegetables for you and your family.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> */}
            {/* </Grid> */}
        </Container>
    );
};

export default AboutUs;