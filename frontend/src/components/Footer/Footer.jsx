import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
// import LanguageIcon from '@mui/icons-material/Language';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledBox = styled(Box)({
    position: 'relative',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8,
        backgroundImage: `url(Images/combine.jpg)`,
        filter: 'brightness(50%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
    }
});

const LanguageSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        fill: 'white',
    },
    '& .MuiSelect-root': {
        color: 'white',
    },
});

export default function BasicGrid() {

    const [lang, setLang] = useState('English');

    return (
        <StyledBox>
            <Box component='div' position='relative' color='white' pt={5} pb={2}>
                <Container>
                    <Grid container columnSpacing={0}>
                        <Grid item xs={4}>
                            <img src="Images/main-logo.png" alt='FarmHub Logo' style={{ width: '35%' }} />
                            <List>
                                <ListItem disablePadding> <ListItemText primary="Invertis University Bareilly , Uttar Pradesh" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="Email: uilib.help@gmail.com" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="Phone: +1 1123 456 780" /> </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6'>QUICK LINKS</Typography>
                            <List>
                                <ListItem disablePadding> <ListItemText primary="HOME" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="ABOUT US " /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="CROPS" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="SERVICES" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="Terms & Conditions" /> </ListItem>
                                <ListItem disablePadding> <ListItemText primary="Privacy Policy" /> </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' gutterBottom>SOCIAL LINKS</Typography>
                            <LinkedInIcon fontSize="large" />
                            <InstagramIcon sx={{ ml: 1 }} fontSize="large" />
                            <Box mt={5}>
                                <FormControl sx={{ minWidth: '8em' }}>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: 'primary.main' }}>
                                        Language
                                    </InputLabel>
                                    <LanguageSelect
                                        value={lang}
                                        label="Language"
                                        onChange={(event) => { setLang(event.target.value) }}
                                        sx={{
                                            color: 'primary.main',
                                        }}
                                    >
                                        <MenuItem value='English'>English</MenuItem>
                                        <MenuItem value='Hindi'>Hindi</MenuItem>
                                    </LanguageSelect>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Typography variant='subtitle2' align='center'>
                                2023 All Rights Reserved,Developed By 4A's
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </StyledBox>
    );
}




