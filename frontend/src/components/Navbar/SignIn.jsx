import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function FormDialog({ open, setOpen }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Sign In</DialogTitle>
            <DialogContent>
                <TextField
                    color='tertiary'
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone No."
                    fullWidth
                    variant="standard"
                />
                <TextField
                    color='tertiary'
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type='password'
                    fullWidth
                    variant="standard"
                />
                <Typography mt={3} variant="subtitle2">
                    New User? 
                    <Link component={RouterLink} to='/signup' color='tertiary.main'> Create an Account</Link>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color='tertiary' onClick={() => setOpen(false)}>Sign In</Button>
                <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
