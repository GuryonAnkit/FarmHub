import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import startCase from 'lodash/startCase';
import axios from 'axios';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';   

function TextFieldx({ children, ...other }) {
    return (
        <TextField
            variant="outlined"
            color='tertiary'
            sx={{
                mb: 2,
                '& .MuiFormLabel-filled.MuiFormLabel-root': {
                    display: 'none',
                },
            }}
            InputLabelProps={{ shrink: false }}
            {...other}
        >
            {children}
        </TextField>
    );
}

export default function SignUp({ setTrigger }) {

    const fields = [
        { name: 'name', label: 'Enter your name' },
        { name: 'phoneNumber', label: 'Enter your Phone Number' },
        { name: 'email', label: 'example@mail.com', type: 'email' },
        { name: 'password', label: '*********', type: 'password' },
        { name: 'confirmPassword', label: '*********', type: 'password' }
    ];

    const [signUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });

    const handleChange = (event) => {
        setSignUpInfo({ ...signUpInfo, [event.target.name]: event.target.value });
    };

    const [avatar, setAvatar] = useState();

    const registerDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    async function createUser(e) {
        e.preventDefault();

        if (signUpInfo.password !== signUpInfo.confirmPassword) {
            return;
        };

        const userDetails = {
            avatar: avatar,
            name: signUpInfo.name,
            email: signUpInfo.email,
            password: signUpInfo.password,
            phoneNumber: signUpInfo.phoneNumber
        };

        axios.post('http://localhost:4000/user/register', userDetails, { withCredentials: true })
            .then((response) => {
                if (response) {
                    console.log(response);
                    loginUser();
                }
            })
            .catch((error) => console.log(error));
    }

    const navigate = useNavigate();

    async function loginUser() {
        const loginDetails = {
            email: signUpInfo.email,
            password: signUpInfo.password,
        };

        axios.post('http://localhost:4000/user/login', loginDetails, { withCredentials: true })
            .then(() => {
                setTrigger(prevValue => !prevValue)
                navigate('/');
            })
            .catch((error) => console.log(error));
    }

    return (
        <Container maxWidth='xl'   sx={{background:'url(/Images/signupbg.jpg) ',py:'3rem'}}>
            <Card sx={{ width: 500, mx: 'auto'  }}>
            <CardContent sx={{ p: 5 }} component='form' onSubmit={createUser}>
                <Stack>
                    <img
                        src='/Images/main-logo.png'
                        alt='FarmHub'
                        style={{ width: '5em', height: '5em', margin: 'auto' }}
                    />
                    <Typography align='center' variant='h6' mt={2}>Create Your Account</Typography>
                    <Avatar
                        sx={{ mx: 'auto', width: '5em', height: '5em', mt: '1rem' }}
                        src={avatar}
                    />
                    <Button variant="contained" color='tertiary' component="label" sx={{ mx: 'auto', my: 3 }}>
                        Upload your Image
                        <input
                            hidden
                            onChange={registerDataChange}
                            name='avatar'
                            accept="image/*"
                            type="file"
                        />
                    </Button>
                    {fields.map(field => (
                        <Box key={field.name}>
                            <Typography variant='subtitle2' gutterBottom>
                                {startCase(field.name)}
                            </Typography>
                            <TextFieldx
                                value={signUpInfo[field.name]}
                                onChange={handleChange}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                fullWidth
                            />
                        </Box>
                    ))}
                    <Button
                        variant='contained'
                        color='tertiary'
                        size='large'
                        type='submit'
                        sx={{ my: 3 }}
                    >
                        Submit
                    </Button>
                </Stack>
            </CardContent>
        </Card>
        </Container>
    )
}