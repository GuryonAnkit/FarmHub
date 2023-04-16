import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Card  from '@mui/material/Card';

const Payment = ({ user, setTrigger, setActiveStep, shippingAddress }) => {

    const navigate = useNavigate();

    function placeOrder (e) {
        e.preventDefault();
        axios.post(`http://localhost:4000/order/${user._id}`, shippingAddress, { withCredentials: true })
            .then(response => {
                if(!response.data.errors) {
                    setTrigger(prevValue => !prevValue);
                    navigate('/orderSuccess');
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <Container component='form' onSubmit={placeOrder} sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" mt={4} color="primary">Payment</Typography>

            <Card
                sx={{
                    marginTop: "1rem",
                    marginBottom: "3rem",
                    borderRadius: "1rem",
                    width: "50%",
                    height: "100%"
                }}>
                <Typography variant="h4" ml={4} mt={4} color="tertiary.main">Card Info</Typography>

                <Box m={4} display='flex' alignItems='center'>
                    <CreditCardIcon sx={{
                        color: "tertiary.main",
                        transform: "translateX(1vmax)",
                        fontSize: "1.6vmax",
                        marginRight: 4
                    }} />
                    <TextField
                        required
                        id="outlined-required"
                        label="Card number"
                        type="number"
                        color="tertiary"
                        sx={{
                            width: "100%",
                            boxSizing: "border-box",
                            color: "tertiary.main"
                        }}
                    />
                </Box>
                <Box m={4} display='flex' alignItems='center'>
                    <EventIcon sx={{
                        color: "tertiary.main",
                        transform: "translateX(1vmax)",
                        fontSize: "1.6vmax",
                        marginRight: 4
                    }} />
                    <TextField
                        required
                        color="tertiary"
                        id="outlined-required"
                        // label="Expiry Date"
                        type="month"
                        sx={{
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    />
                </Box>
                <Box m={4} display='flex' alignItems='center'>
                    <VpnKeyIcon sx={{
                        color: "tertiary.main",
                        transform: "translateX(1vmax)",
                        fontSize: "1.6vmax",
                        marginRight: 4
                    }} />
                    <TextField
                        required
                        id="outlined-required"
                        type="number"
                        label="CVV"
                        color="tertiary"
                        sx={{
                            width: "100%",
                            color: "tertiary.main",
                            boxSizing: "border-box",
                        }}
                    />
                </Box>
            </Card>

            <Button
                onClick={() => setActiveStep(1)}
                size='large'
                sx={{ textTransform: 'none', marginRight: "2rem" }}
                color='primary'
                variant='contained'
            >
                Back to Confirm Order
            </Button>

            <Button
                size='large'
                sx={{ textTransform: 'none', width: "10rem" }}
                color='tertiary'
                variant='contained'
                type='submit'
            >
                Pay
            </Button>

        </Container>
    )
}

export default Payment









