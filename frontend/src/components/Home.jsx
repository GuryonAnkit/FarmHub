import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

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
});

const CaptionBox = styled(Stack)({
    zIndex: 1,
    position: 'relative',
    textAlign: 'center',
})

export default function Home() {
    return (
        <VideoBox minHeight='30em' height={{ xs: 'calc(100vh - 3rem)', md: 'calc(100vh - 4rem)' }}>
            <video autoPlay muted loop>
                <source
                    src="Images/main-video.mp4"
                    type="video/mp4"
                />
            </video>
            <CaptionBox
                alignItems='center'
                justifyContent='center'
                spacing={{ xs: 7, md: 5 }}
                minHeight='30em'
                height={{ xs: 'calc(100vh - 6rem)', md: 'calc(100vh - 8rem)' }}
            >
                <Typography
                    variant="h1"
                    fontSize={{ xs: '4rem', md: '6rem', xl: '8rem' }}
                    fontWeight='bold'
                    color='primary'
                    display='inline'
                >
                    FarmHub
                </Typography>
                <Typography
                    variant="h4"
                    fontSize={{ xs: '1.5rem', md: '1.75rem', xl: '2rem' }}
                    width={{ xs: '90%', md: '70%' }}
                    color='primary'
                    gutterBottom
                >
                    "Investments in agriculture are the best weapons against hunger and poverty, and they have made life better for billions of people"
                </Typography>
                <Stack direction='row' spacing='3vw'>
                    <Button
                        variant='contained'
                        color="secondary"
                        mr={2}>
                        See all Products
                    </Button>
                    <Button
                        variant='contained'
                        color="primary">
                        About Us
                    </Button>
                </Stack>
            </CaptionBox>
        </VideoBox>
    )
}
