import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';


export default function Order() {

    const { orderId } = useParams();

    const [order, setOrder] = useState();

    useEffect(() => {
        axios.get(`http://localhost:4000/order/${orderId}`, { withCredentials: true })
            .then((response) => { setOrder(response.data) })
            .catch((err) => console.log(err));
    }, [orderId]);

    if (order) {
        return (
            <Container sx={{ mt: { xs: 6, sm: 8 } }}>
                <Grid container pt={2}>
                    <Grid item xs={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h6">Shipping Address</Typography>
                                <Typography maxHeight='3em' overflow='hidden' gutterBottom>
                                    {order.address.area}
                                </Typography>
                                <Typography>{order.address.city}</Typography>
                                <Typography>{order.address.state}</Typography>
                                <Typography>{order.address.country}</Typography>
                                <Typography>{order.address.pincode}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
