import { useState, useRef } from 'react';
import { startCase } from 'lodash';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

export default function Profile({ 
    setTrigger, 
    user, 
    openSnackbar,
    profSec,
    setProfSec
}) {
    const userFields = ["name", "email", "phoneNumber"];
    
    const userRefs = {
        name: useRef(),
        email: useRef(),
        phoneNumber: useRef()
    };

    const [userChange, setUserChange] = useState(false);

    function updateUser(e) {
        e.preventDefault();

        const User = userFields.reduce((acc, field) => ({ ...acc, [field]: userRefs[field].current.value }), {});

        axios.put(`http://localhost:4000/customer/${user._id}`, User, { withCredentials: true })
            .then((response) => {
                if (response) {
                    setTrigger(prevValue => !prevValue);
                    openSnackbar();
                    setUserChange(false);
                }
            })
            .catch((error) => console.log(error))
    }

    // const oldPass = useRef(null);
    // const newPass = useRef(null);
    // const newPassConfirm = useRef(null);

    return (
        <>
            {profSec
                ?
                <Grid
                    container
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={updateUser}
                    rowSpacing={3}
                    columnSpacing={5}
                >
                    <Grid item xs={12}>
                        <Typography variant='h4'>Profile</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Avatar
                            alt="Remy Sharp"
                            src={user.avatar}
                            sx={{ width: '5em', height: '5em' }}
                        />
                    </Grid>
                    {userFields.map((field) => (
                        <Grid item xs={6} key={field}>
                            <TextField
                                label={startCase(field)}
                                fullWidth
                                defaultValue={user[field]}
                                onChange={() => setUserChange(true)}
                                inputRef={userRefs[field]}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            disabled={!userChange}
                            type='Submit'
                        >
                            Save Changes
                        </Button>
                        <Button
                            sx={{ ml: 2 }}
                            variant="outlined"
                            type='button'
                            onClick={() => setProfSec(false)}
                        >
                            Change Password
                        </Button>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={2} >
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
                    <Grid item xs={12}>
                        <Button variant='outlined' type='button' onClick>Update Password</Button>
                        <Button variant='outlined' type='button' onClick={() => setProfSec(true)}>
                            Go Back
                        </Button>
                    </Grid>
                </Grid>
            }
        </>
    )
}
