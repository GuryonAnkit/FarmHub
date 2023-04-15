import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Card } from '@mui/material';


const Payment = ({ user, setActiveStep }) => {

    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" mt={4} className="shippingHeading" color="primary">Payment</Typography>

            <Card className="paymentForm" sx={{ marginTop: "1rem",marginBottom: "3rem", borderRadius: "1rem", width: "50%", height: "100%" }}>

                <Typography variant="h4"  ml={4} mt={4} color= "tertiary.main">Card Info</Typography>

                <Box m={4}  display='flex' alignItems='center'>
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
                        color= "tertiary"
                        sx={{
                            width: "100%",
                            boxSizing: "border-box",
                            color:"tertiary.main" 
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
                        color= "tertiary"
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
                        color= "tertiary"
                        sx={{
                            width: "100%",
                            color: "tertiary.main",
                            boxSizing: "border-box",
                        }}
                    />
                </Box>
            </Card>
            
            <Button onClick={() => setActiveStep(1)} size='large' sx={{ textTransform: 'none',marginRight: "2rem" }} color='primary' variant='contained'>
                Back to Confirm Order
            </Button>
            <Button size='large' sx={{ textTransform: 'none',width: "10rem" }} color='primary' variant='contained'>
                Pay
            </Button>

        </Container>
    )
}

export default Payment









