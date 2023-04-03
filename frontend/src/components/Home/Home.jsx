import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Carousel from 'react-material-ui-carousel'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';

const VideoBox = styled(Box)({
    position: 'relative',
    '& video': {
        width: '100%',
        height: '100%',
        position: 'absolute',
        objectFit: 'cover',
        zIndex: 0,
        filter: 'brightness(80%)',
    },
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

const CaptionBox = styled(Stack)({
    zIndex: 1,
    position: 'relative',
    textAlign: 'center',
})

const featuredCrops = [
    {
        name: 'Wheat',
        image: 'Images/wheat.jpg',
        link: ''
    },
    {
        name: 'Carrot',
        image: 'Images/Carrot.JPG',
        link: ''
    },
    {
        name: 'Watermelon',
        image: 'Images/watermelon.webp',
        link: ''
    }
]

const items = [
    {
        image: "Images/m.s-swaminathan.jpg",
        name: "Dr. M.S. Swaminathan",
        message: '"I have been using FarmHub website for over a year now and it has been a game-changer for me. The website provides me with all information I need to make informed decisionsabout my crops, including weather forecasts, market prices, and information on fertilizers, seeds, machinery, etc. The user-friendly interface and option to use the website in different languages makes it more widely accesible"'
    },
    {
        image: "Images/m.s-swaminathan.jpg",
        name: "Dr. M.S. Swaminathan",
        message: '"I have been using FarmHub website for over a year now and it has been a game-changer for me. The website provides me with all information I need to make informed decisionsabout my crops, including weather forecasts, market prices, and information on fertilizers, seeds, machinery, etc. The user-friendly interface and option to use the website in different languages makes it more widely accesible"'
    }
]

export default function Home() {
    return (
        <Box sx={{ mt: { xs: 6, sm: 8 } }}>
            <VideoBox minHeight='30em' height={{ xs: 'calc(100vh - 3rem)', md: 'calc(100vh - 4rem)' }}>
                {/* <video autoPlay muted loop>
                    <source
                        src="Images/main-video.mp4"
                        type="video/mp4"
                    />
                </video> */}
                <CaptionBox
                    alignItems='center'
                    justifyContent='center'
                    spacing={{ xs: 7, md: 5 }}
                    minHeight='30em'
                    height={{ xs: 'calc(100vh - 6rem)', md: 'calc(100vh - 8rem)' }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            fontSize={{ xs: '4rem', md: '6rem', xl: '8rem' }}
                            fontFamily={'TimesNewRoman'}
                            fontWeight='bold'
                            color='secondary.main'
                            display='inline'
                            text-outline='1px black solid'
                        >
                            FARM
                        </Typography>
                        <Typography
                            variant="h1"
                            fontSize={{ xs: '4rem', md: '6rem', xl: '8rem' }}
                            fontFamily={'TimesNewRoman'}
                            fontWeight='bold'
                            color='primary'
                            display='inline'
                        >
                            HUB
                        </Typography>
                    </Box>
                    <Typography
                        variant="h4"
                        fontSize={{ xs: '1.5rem', md: '1.75rem', xl: '2rem' }}
                        fontFamily={'TimesNewRoman'}
                        width={{ xs: '90%', md: '70%' }}
                        color='primary'
                        gutterBottom
                    >
                        "Investments in agriculture are the best weapons against hunger and poverty, and they have made life better for billions of people"
                    </Typography>
                    <Stack direction='row' spacing='3vw'>
                        <Button
                            variant='contained'
                            color="homeBtn"
                            mr={2}
                            sx={{ width: '11rem' }}>
                            SEE ALL PRODUCTS
                        </Button>
                        <Button
                            variant='contained'
                            color="primary"
                            sx={{ width: '11rem' }}>
                            ABOUT US
                        </Button>
                    </Stack>
                </CaptionBox>
            </VideoBox>

            <Container maxWidth="lg">
                <Typography mt={8} variant="h4" fontWeight='500' textAlign='center' color="tertiary" mb={3}>
                    Top Profitable Crops
                </Typography>
                <Grid container spacing={4}>
                    {featuredCrops.map((crop) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card 
                                sx={{ 
                                    width: '100%',
                                    height: '18rem', 
                                    position: 'relative', 
                                    borderRadius: '1rem'
                                }} 
                                key={crop.name}>
                                <CardMedia
                                    component="img"
                                    width='100%'
                                    height='100%'
                                    image={crop.image}
                                    alt="Wheat"
                                    sx={{ objectFit: 'cover' }}

                                />
                                <Typography
                                    variant="h5"
                                    color='primary'
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        textAlign: 'center',
                                        pt: 16,
                                        pb: 2,
                                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)'
                                    }}>
                                    {crop.name}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography mt={8} variant="h4" fontWeight='500' textAlign='center' color="tertiary">
                    Testimonials
                </Typography>
                <Carousel
                    navButtonsAlwaysInvisible={true}
                    animation='slide'
                    indicatorIconButtonProps={{
                        style: {
                            color: 'white',
                        },

                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            color: '#07412B' // 2
                        }
                    }}
                    indicatorContainerProps={{
                        style: {
                            position: 'absolute',
                            bottom: '0.5em',
                            zIndex: 1
                        }

                    }}
                    sx={{ position: 'relative', width: '80%', m: 'auto', mt: 3, borderRadius: '1em' }}
                >
                    {items.map(item => (
                        <Card
                            key={item.name}
                            sx={{
                                display: 'flex',
                                height: '20rem',
                                backgroundColor: 'tertiary.main',
                                color: 'white'
                            }}>
                            <Box width='60em'>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    height="100%"
                                    image={item.image}
                                    alt="Live from space album cover"
                                />
                            </Box>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="subtitle1" component="div">
                                    {item.message}
                                </Typography>
                                <Typography component="div" variant="h5" mt={6}>
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            </Container>
        </Box>
    )
}
