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

// const theme = createTheme({
//     components: {
//        MuiTypography: {
//          styleOverrides: {
//            h1: {
//              '&.MuiTypography-gutterBottom': {
//                marginBottom: 32
//              }
//            },
//            gutterBottom: {
//              marginBottom: 8 //default e.g. body1/paragraphs
//            }
//          }
//        }
//      }
//    })

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

export default function BasicGrid() {

    const [lang, setLang] = useState('');

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
                            <Typography variant='h6'>SOCIAL LINKS</Typography>
                            <LinkedInIcon fontSize="large" />
                            <InstagramIcon fontSize="large" />

                            <Box sx={{ minWidth: 80 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={lang}
                                        label="Language"
                                        onChange={(event) => { setLang(event.target.value) }}
                                        sx={{
                                            color: 'primary.main',
                                        }}
                                    >
                                        <MenuItem value={10}>Hindi</MenuItem>
                                        <MenuItem value={20}>English</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Typography variant='subtitle2' align='center'>2023 All Rights Reserved,Developed By 4A's</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </StyledBox>
    );
}




