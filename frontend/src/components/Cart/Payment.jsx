import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const Payment = ({user, setActiveStep}) => {
    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography variant="h4" m={4} className="shippingHeading" color="primary">Payment</Typography>
            <Button onClick={() => setActiveStep(1)} size='large'  sx={{ textTransform: 'none' }} color='primary' variant='contained'>
                Back to Confirm Order
            </Button>
        </Container>
    )
}

export default Payment