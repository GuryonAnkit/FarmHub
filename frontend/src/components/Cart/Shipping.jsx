import React, { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Shipping = ({ user, setActiveStep }) => {

    const [addressIndex, setAddressIndex] = useState(0)

    const ChangeAddress = (addressI) => {
        setAddressIndex(addressI)

    }

    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>

            <Typography variant="h4" m={4} className="shippingHeading" color="primary">Shipping Details</Typography>
            <Grid container m={5} spacing={2}>
                {user.addresses.map(address => (
                    <Grid item xs={4} key={address._id}>
                        <Card
                            elavation={2}
                            onClick={
                                () => ChangeAddress(user.addresses.indexOf(address))
                            }
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '15em',
                                borderRadius: "1rem",
                                boxSizing: 'border-box',
                                border: user.addresses.indexOf(address) === addressIndex ? '2px solid #00635A' : '',
                            }}
                        >
                            <CardContent sx={{ mb: 'auto' }}>
                                <Typography maxHeight='3em' overflow='hidden' gutterBottom>
                                    {address.area}
                                </Typography>
                                <Typography>{address.city}</Typography>
                                <Typography>{address.state}</Typography>
                                <Typography>{address.country}</Typography>
                                <Typography>{address.pincode}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => setActiveStep(1)} size='large' sx={{ textTransform: 'none' }} color='tertiary' variant='contained'>
                            Confirm Order
            </Button>

        </Container>
    );
};

export default Shipping