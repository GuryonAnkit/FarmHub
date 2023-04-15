import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ConfirmOrder = ({ user, setActiveStep }) => {

    const subtotal = user.cart.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
    );

    const shippingCharges = subtotal > 1500 ? 0 : 60;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" m={4} color="primary">Confirm Order</Typography>

            <Box mb={3}>
                <Typography variant="h5" m={4} color="primary">Shipping Info</Typography>
                <Card
                    sx={{
                        padding: "1em",
                        backgroundColor: "secondary.main",
                        width: "40%",
                        border: 1,
                        borderColor: "primary.main",
                        borderRadius: "1rem"
                    }}>
                    <Box ml={5} mb={2} display='flex' alignItems='center'>
                        <Typography  >Name:</Typography>
                        <Typography color="primary" >{user.name}</Typography>
                    </Box>
                    <Box ml={5} mb={2} display='flex' alignItems='center'>
                        <Typography  >Phone:</Typography>
                        <Typography color="primary" >{user.phoneNumber}</Typography>
                    </Box>
                    <Box ml={5} mb={2} display='flex' alignItems='center'>
                        <Typography  >Address:</Typography>
                        <Typography color="primary" >{ }</Typography>
                    </Box>
                </Card>
            </Box>

            <Box className="confirmCartItems">
                <Typography variant="h5" m={4} color="primary">Your Cart Items:</Typography>
                {user.cart &&
                    user.cart.map((item) =>



                        <Card sx={{ display: 'flex', width: '50%', marginBottom: '2rem', backgroundColor: "secondary.main", borderRadius: "1rem" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 80, padding: 2 }}
                                src={item.product.images[0].data} alt="Product"
                            />

                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                                <Link  to={`/shop/product/${item.product._ids}`} color="tertiary.main" underline='none' fontFamily="Roboto" fontSize="large">
                                    {item.product.name}
                                </Link>

                                <Typography variant="h6 " mt={2} color="tertiary.main" ml={4} fontFamily="Roboto" fontSize="large">
                                    {item.quantity} X ₹{item.product.price} = ₹{item.product.price * item.quantity}
                                </Typography>
                            </CardContent>


                        </Card>
                    )}
            </Box>

            <Box>
                <Box className="orderSummary">
                    <Typography variant="h5" m={4} color="primary">Order Summery</Typography>
                    <Box>
                        <Box display="flex">
                            <Typography variant="h6" m={4} color="homeBtn.main">Subtotal :-</Typography>
                            <Typography variant="h6" mt={4} color="primary.main">₹{subtotal}</Typography>

                        </Box>
                        <Box display="flex">
                            <Typography variant="h6" m={4} color="homeBtn.main">Shipping Charges :-</Typography>
                            <Typography variant="h6" mt={4} color="primary.main">₹{shippingCharges}</Typography>

                        </Box>
                        <Box display="flex">
                            <Typography variant="h6" m={4} color="homeBtn.main">GST :-</Typography>
                            <Typography variant="h6" mt={4} color="primary.main">18%(₹{tax})</Typography>

                        </Box>
                    </Box>

                    <Box display="flex">
                        <Typography variant="h6" m={4} color="homeBtn.main">
                            Total :-
                        </Typography>
                        <Typography variant="h6" mt={4} color="primary.main">
                            ₹{totalPrice}
                        </Typography>
                        <></>
                    </Box>

                </Box>
            </Box>


            <Button onClick={() => setActiveStep(0)} size='large' sx={{ textTransform: 'none', marginRight: "2rem" }} color='primary' variant='contained'>
                Back to Shipping Details
            </Button>
            <Button onClick={() => setActiveStep(2)} size='large' sx={{ textTransform: 'none' }} color='tertiary' variant='contained'>
                Proceed for Payment
            </Button>
        </Container>
    )
}

export default ConfirmOrder