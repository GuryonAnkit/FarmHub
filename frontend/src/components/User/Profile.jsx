import { useState } from 'react';
import { startCase } from 'lodash';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export default function Profile({
    setTrigger,
    user,
    openSnackbar,
    profSec,
    setProfSec
}) {
    const userFields = ['name', 'email', 'phoneNumber'];

    const [status, setStatus] = useState('success');

    // const [avatar, setAvatar] = useState(user.avatar);

    const registerDataChange = (e) => {
        setStatus('typing');
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUserValues((prevValues) => ({
                    ...prevValues,
                    avatar: reader.result,
                }));
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }



    const [userValues, setUserValues] = useState({
        avatar:user.avatar,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
    });
    const [userErrors, setUserErrors] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (event) => {
        setStatus('typing');
        setUserValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
        setUserErrors((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value === '' ? 'Required' : ''
        }));
    };

    function updateUser(e) {
        e.preventDefault();
        const hasEmptyRequiredField = userFields.some((field) => userValues[field] === '');
        if (hasEmptyRequiredField) return;
        setStatus('submitting');
        
        axios.put(`http://localhost:4000/user/${user._id}`, userValues, { withCredentials: true })
            .then((response) => {
                if (response.data.errors) {
                    openSnackbar('Changes could not be saved', 'error');
                    setStatus('typing');
                    return;
                }
                if (response.data.keyPattern) {
                    let key = response.data.keyPattern;
                    setUserErrors((prevValues) => ({
                        ...prevValues,
                        email: key.email ? 'Email already registered' : '',
                        phoneNumber: key.phoneNumber ? 'Phone number already registered' : ''
                    }));
                    setStatus('typing');
                    return;
                }
                setTrigger(prevValue => !prevValue);
                openSnackbar('Changes saved successfully', 'success');
                setStatus('success');
            })
            .catch((error) => {
                console.log(error); 
                setStatus('typing')
                openSnackbar('Changes could not be saved', 'error');
            })
    }

    // const oldPass = useRef(null);
    // const newPass = useRef(null);
    // const newPassConfirm = useRef(null);

    return (
        <>
            <Stack direction='row'>
                <Typography variant='h4' mr='auto' color='primary' fontWeight='bold'>
                    {profSec ? 'Profile' : 'Change Password'}
                </Typography>
                {!profSec ?
                    <Button
                        sx={{ textTransform: 'none' }}
                        variant='contained'
                        onClick={() => {
                            setProfSec(true);
                        }}
                    >
                        Back to Profile
                    </Button>
                    : null
                }
            </Stack>
            <Card
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={updateUser}
                sx={{ borderRadius: '0.5rem', mt: 2 }}
            >
                <CardContent sx={{ px: 4, pb: 0, pt: 3 }}>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={5}
                    >
                        {profSec ?
                            <>
                                <Grid item xs={12}>
                                    <Badge
                                        badgeContent={
                                            <IconButton  component="label" color="primary" sx={{ border: '0.1px solid lightgray' }} >
                                                <EditIcon color="tertiary" />
                                                
                                                    <input
                                                        hidden
                                                        onChange={registerDataChange}
                                                        name='avatar'
                                                        accept="image/*"
                                                        type="file"
                                                    />
                                            </IconButton>
                                        }



                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        overlap="circular">
                                        <Avatar
                                            alt={user.name}
                                            src={userValues.avatar}
                                            sx={{ width: '5em', height: '5em' }}
                                        />
                                    </Badge>
                                </Grid>
                                {userFields.map((field) => (
                                    <Grid item xs={6} key={field}>
                                        <TextField
                                            color="tertiary"
                                            label={startCase(field)}
                                            fullWidth
                                            name={field}
                                            value={userValues[field]}
                                            onChange={handleChange}
                                            required
                                            error={userErrors[field] !== ''}
                                            helperText={userErrors[field] ? userErrors[field] : ' '}
                                        />
                                    </Grid>
                                ))}
                            </>
                            :
                            <>
                                {/* <Grid item xs={6}>
                                    <TextField
                                        label="Old Password"
                                        fullWidth
                                        inputRef={oldPass}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="New Password"
                                        fullWidth
                                        inputRef={newPass}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Confirm New Password"
                                        fullWidth
                                        inputRef={newPassConfirm}
                                    />
                                </Grid> */}
                            </>
                        }
                    </Grid>
                </CardContent>
                <CardActions sx={{ px: 4, py: 3 }}>
                    {profSec ?
                        <>
                            <Button
                                variant="contained"
                                color='tertiary'
                                disabled={status !== 'typing'}
                                type='Submit'
                            >
                                Save Changes
                            </Button>
                            {status === 'submitting'
                                ? <CircularProgress sx={{ ml: 3 }} color='tertiary' size='2rem' />
                                : null
                            }
                            {/* <Button
                                sx={{ ml: 2 }}
                                variant="outlined"
                                color='tertiary'
                                type='button'
                                onClick={() => setProfSec(false)}
                            >
                                Change Password
                            </Button> */}
                        </>
                        :
                        <Button variant='outlined' type='button' color='tertiary'>Update Password</Button>
                    }
                </CardActions>
            </Card>
        </>
    )
}
