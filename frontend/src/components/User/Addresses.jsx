import { useState, useRef } from 'react';
import { startCase } from 'lodash';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function Addresses({
    setTrigger,
    user,
    openSnackbar,
    addressForm,
    setAddressForm
}) {
    const fields = ['area', 'city', 'state', 'country', 'pincode'];
    const refs = {
        area: useRef(),
        city: useRef(),
        state: useRef(),
        country: useRef(),
        pincode: useRef()
    };
    const [editAddress, setEditAddress] = useState(null);
    const [adrsChange, setAdrsChange] = useState(false);

    function addAddress(e) {
        e.preventDefault();
    
        const address = fields.reduce((acc, field) => ({ ...acc, [field]: refs[field].current.value }), {});
    
        axios.put(`http://localhost:4000/user/${user._id}/address`, address, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if(response) {
                    setTrigger(prevValue => !prevValue);
                    openSnackbar();
                    setAddressForm(false);
                    setAdrsChange(false);
                }
            })
            .catch((error) => console.log(error))
    }
    
    function updateAddress(e, addressId) {
        e.preventDefault();
    
        const address = fields.reduce((acc, field) => ({ ...acc, [field]: refs[field].current.value }), {});
    
        axios.put(`http://localhost:4000/user/${user._id}/address/${addressId}`, address, { withCredentials: true })
            .then((response) => {
                if(response) {
                    setTrigger(prevValue => !prevValue);
                    openSnackbar();
                    setAddressForm(false);
                    setEditAddress(null);
                    setAdrsChange(false);
                }
            })
            .catch((error) => console.log(error))
    }

    function deleteAddress(e, addressId) {
        e.preventDefault();
        axios.delete(`http://localhost:4000/user/${user._id}/address/${addressId}`, { withCredentials: true })
            .then((response) => {
                if (response) {
                    setTrigger(prevValue => !prevValue);
                    openSnackbar();
                    setAdrsChange(false);
                }
            })
            .catch((error) => console.log(error))
    }
    return (
        <>
            {!addressForm ?
                <>
                    <Stack direction='row'>
                        <Typography variant='h4' mr='auto'>Addresses</Typography>
                        <Button sx={{ textTransform: 'none' }} variant='contained' onClick={() => {
                            setEditAddress(false);
                            setAddressForm(true);
                        }}>
                            Add New Address
                        </Button>
                    </Stack>
                    <Grid container mt={1} spacing={2}>
                        {user.addresses.map(address => (
                            <Grid item xs={4} key={address._id}>
                                <Card elavation={2} sx={{ display: 'flex', flexDirection: 'column', height: '15em' }}>
                                    <CardContent sx={{ mb: 'auto' }}>
                                        <Typography maxHeight='3em' overflow='hidden' gutterBottom>
                                            {address.area}
                                        </Typography>
                                        <Typography>{address.city}</Typography>
                                        <Typography>{address.state}</Typography>
                                        <Typography>{address.country}</Typography>
                                        <Typography>{address.pincode}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton onClick={() => {
                                            setEditAddress(user.addresses.indexOf(address));
                                            setAddressForm(true);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={(e) => deleteAddress(e, address._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
                :
                <>
                    <Stack direction='row'>
                        <Typography variant='h4' mr='auto'>
                            {typeof editAddress !== 'number' ? 'Add New Address' : 'Edit Address'}
                        </Typography>
                        <Button
                            sx={{ textTransform: 'none' }}
                            variant='outlined'
                            onClick={() => {
                                setEditAddress(null);
                                setAddressForm(false);
                                setAdrsChange(false);
                            }}
                        >
                            Back to Addresses
                        </Button>
                    </Stack>
                    <Grid
                        container
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={typeof editAddress !== 'number' ? addAddress :
                            (e) => updateAddress(e, user.addresses[editAddress]._id)}
                        rowSpacing={3}
                        columnSpacing={5}
                        mt={1}
                    >
                        {fields.map(field => (
                            <Grid item xs={6} key={field}>
                                <TextField
                                    label={startCase(field)}
                                    fullWidth
                                    defaultValue={typeof editAddress === 'number' ? user.addresses[editAddress][field] : ''}
                                    onChange={() => setAdrsChange(true)}
                                    inputRef={refs[field]}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                disabled={!adrsChange}
                                type='Submit'
                            >
                                {typeof editAddress !== 'number' ? 'Add Address' : 'Edit Address'}
                            </Button>
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}
