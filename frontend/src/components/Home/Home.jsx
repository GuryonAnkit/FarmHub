import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel'
import Avatar from '@mui/material/Avatar';
import './home.css'

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
        name: 'WHEAT',
        image: 'Images/wheat.jpg',
        link: ''
    },
    {
        name: 'CARROT',
        image: 'Images/Carrot.JPG',
        link: ''
    },
    {
        name: 'WATERMELON',
        image: 'Images/watermelon.webp',
        link: ''
    }
]

const items = [
    {
        image: "Images/m.s-swaminathan.jpg",
        name: "DR. M.S. SWAMINATHAN",
        message: "I have been using FarmHub website for over a year now and it has been a game-changer for me. The website provides me with all information I need to make informed decisionsabout my crops, including weather forecasts, market prices, and information on fertilizers, seeds, machinery, etc. The user-friendly interface and option to use the website in different languages makes it more widely accesible"
    }
]

export default function Home() {
    return (
        <>
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

            <Stack direction='row' justifyContent='center'>
                {featuredCrops.map((crop) => (
                    <Card sx={{ maxWidth: 345, mt: 5, mx: 3, position: 'relative' }} >
                        <CardMedia
                            component="img"
                            height='200px'
                            image={crop.image}
                            alt="Wheat"
                            sx={{objectFit:'cover'}}

                        />
                        <Typography
                            variant="h4"
                            color='primary'
                            sx={{
                                position: 'absolute',
                                bottom: '0.5rem',
                                left: 0,
                                right: 0,
                                textAlign: 'center',
                                paddingTop: '60px'
                            }}>
                            {crop.name}
                        </Typography>
                    </Card>
                ))}
            </Stack>

            <div className="testimonial">
                <div className='card'>
                    <h1 className="heading">Testimonial Slider</h1>
                    <Carousel>
                        {items.map((test) => (
                            <div className="main">
                                    <img
                                        className="avatar"
                                        src={test.image}
                                    />
                                <div className="Client-Card">
                                    <p style={{ marginTop: 25 }}>
                                        <span>&ldquo;</span>
                                        {test.message}
                                    </p>
                                    <p>
                                        <span className="Name">
                                            {test.name}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>

    )
}
