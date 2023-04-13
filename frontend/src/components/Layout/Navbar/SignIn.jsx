import { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function FormDialog({ open, setOpen, setTrigger }) {

    const [loginInfo, setLoginInfo] = useState({
        phoneNumber: "",
        password: "",
    });
    
    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    
    
    async function submitUser(e) {
        e.preventDefault();
    
        const loginDetails = {
           phoneNumber: loginInfo.phoneNumber,
           password: loginInfo.password,
        };
        
        axios.post('http://localhost:4000/user/login', loginDetails, { withCredentials: true })
            .then(() => setTrigger(prevValue => !prevValue))
            .catch((error) => console.log(error));
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} disableScrollLock={true}>
            <DialogTitle>SIGN IN</DialogTitle>
            <DialogContent component='form' onSubmit={submitUser}>
                <TextField
                    value={loginInfo.phoneNumber}
                    onChange={handleChange}
                    color='tertiary'
                    autoFocus
                    margin="dense"
                    name="phoneNumber"
                    label="Phone No."
                    fullWidth
                    variant="standard"
                />
                <TextField
                    value={loginInfo.password}
                    onChange={handleChange}
                    color='tertiary'
                    autoFocus
                    margin="dense"
                    name="password"
                    label="Password"
                    type='password'
                    fullWidth
                    variant="standard"
                />
                <Typography mt={3} variant="subtitle2">
                    {'New User? '} 
                    <Link component={RouterLink} to='/signup' color='tertiary.main'>Create an Account</Link>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color='tertiary' type='submit' onClick={(e) => { setOpen(false); submitUser(e); }}>
                    Sign In
                </Button>
                <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
