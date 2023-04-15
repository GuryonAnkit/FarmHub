import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const ConfirmOrder = ({ user, setActiveStep, shippingAddress }) => {

    const subtotal = user.cart.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
    );

    const shippingCharges = subtotal > 1500 ? 0 : 60;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" mt={4} color="primary">Confirm Order</Typography>

            <Grid container spacing={5}>
                <Grid item xs={6} mr='auto'>
                    <Typography variant="h5" mt={4} mb={2} color="cropHeading.main">Shipping Info</Typography>
                    <Card
                        sx={{
                            padding: "1em",
                            backgroundColor: "primary.main",
                            width: "100%",
                            border: 1,
                            borderColor: "secondary.main",
                            borderRadius: "1rem",
                            boxSizing: "border-box"
                        }}>
                        <Box ml={3} mb={2} mt={2} display='flex' alignItems='center'>
                            <Typography color="tertiary.main">Name:</Typography>
                            <Typography color="primary.dark" ml={2}>{user.name}</Typography>
                        </Box>
                        <Box ml={3} mb={2} display='flex' alignItems='center'>
                            <Typography color="tertiary.main">Phone:</Typography>
                            <Typography color="primary.dark" ml={2}>{user.phoneNumber}</Typography>
                        </Box>
                        <Box ml={3} mb={2} display='flex' alignItems='flex-start'>
                            <Typography color="tertiary.main">Address:</Typography>
                            <Box display='flex' flexDirection='column' justifyContent='center' ml={2} >
                                <Typography color="primary.dark" >{shippingAddress.area}</Typography>
                                <Typography color="primary.dark" >{shippingAddress.city}</Typography>
                                <Typography color="primary.dark" >{shippingAddress.state}</Typography>
                                <Typography color="primary.dark" >{shippingAddress.country}</Typography>
                                <Typography color="primary.dark" >{shippingAddress.pincode}</Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Typography variant="h5" mt={4} mb={2} color="cropHeading.main">Your Cart Items:</Typography>
                    {user.cart &&
                        user.cart.map((item) =>



                            <Link component={RouterLink} to={`/shop/product/${item.product._id}`} underline='none'>
                                <Card sx={{ display: 'flex', width: '100%', marginBottom: '2rem', backgroundColor: "primary.main", borderRadius: "1rem" }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 80, padding: 2 }}
                                        src={item.product.images[0].data} alt="Product"
                                    />

                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                        <Typography variant="h4" color="tertiary.main" fontFamily="Roboto" fontSize="large" fontWeight='bold'>
                                            {item.product.name}
                                        </Typography>
                                        <Box display='flex'>
                                            <Typography variant='h6' mt={2} color="tertiary.main" fontFamily="Roboto" fontSize="small" >
                                                {item.quantity} X ₹{item.product.price} =
                                            </Typography>
                                            <Typography variant='h6' mt={2} color="primary.dark" fontFamily="Roboto" fontSize="small"  >
                                                ₹{item.product.price * item.quantity}
                                            </Typography>
                                        </Box>
                                    </CardContent>


                                </Card>
                            </Link>
                        )}
                </Grid>

                <Grid item xs={5} className="orderSummary">
                    <Typography variant="h5" mt={4} mb={2} color="cropHeading.main">Order Summery</Typography>
                    <Card sx={{ borderRadius:"1rem"}}>
                        <CardContent>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="primary.dark">Subtotal:</Typography>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="tertiary.main">₹{subtotal}</Typography>

                            </Box>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="primary.dark">Shipping Charges:</Typography>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="tertiary.main">₹{shippingCharges}</Typography>

                            </Box>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="primary.dark">GST:</Typography>
                                <Typography variant="subtitle2" fontSize="1rem" mt={2} color="tertiary.main">18%(₹{tax})</Typography>

                            </Box>
                        </CardContent>

                        <Divider variant="middle" />

                        <CardContent>
                            <Box display="flex"  justifyContent='space-between'>
                                <Typography variant="h6" mt={2} color="primary.dark">Total :-</Typography>
                                <Typography variant="h6" mt={2} color="tertiary.main">₹{totalPrice}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <Button onClick={() => setActiveStep(0)} size='large' sx={{ textTransform: 'none', marginRight: "2rem", }} color='primary' variant='contained'>
                Back to Shipping Details
            </Button>
            <Button onClick={() => setActiveStep(2)} size='large' sx={{ textTransform: 'none' }} color='tertiary' variant='contained'>
                Proceed for Payment
            </Button>
        </Container>
    )
}

export default ConfirmOrder