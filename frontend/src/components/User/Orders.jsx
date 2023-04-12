import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";

export default function Orders({ user }) {

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (!user) return;
        axios.get(`http://localhost:4000/user/${user._id}/orders`, { withCredentials: true })
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, [user])

    if (orders) {
        return (
            orders.map(order => (
                <Card elevation={4} sx={{ minWidth: 275, mb: 4 }} key={order._id}>
                    <CardContent>
                        <Grid container spacing={2} mb={5}>
                            <Grid item xs={2}>
                                <Typography>Order Placed</Typography>
                                <Typography>{DateTime.fromISO(order.createdAt).toFormat('d LLLL yyyy')}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Total</Typography>
                                <Typography>{order.totalAmount}</Typography>
                            </Grid>
                            <Grid item xs={3} ml='auto' sx={{ textAlign: 'right' }}>
                                <Typography>Order ID</Typography>
                                <Typography>{order._id}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6'>
                                    {order.status + (order.dateDelivered ?
                                        ` on ${DateTime.fromISO(order.dateDelivered).toFormat('d LLLL yyyy')}`
                                        : '')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Link
                                    component={RouterLink}
                                    to={`/product/${order.product._id}`}
                                    underline='none'
                                    sx={{ display: 'flex' }}
                                >
                                    <img
                                        src={order.product.images[0].data}
                                        alt={order.product.name}
                                        style={{
                                            width: '10em',
                                            marginRight: '2em'
                                        }}
                                    />
                                    <Typography variant="h5">{order.product.name}</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))
        )
    }
}
