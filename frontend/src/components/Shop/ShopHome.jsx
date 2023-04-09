import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';

const banner = [
    'Images/ad1.jpg',
    'Images/ad2.jpg',
    'Images/ad2.jpg',
]

export default function ShopHome() {
    return (
        <Box sx={{ mt: { xs: 6, sm: 8 } }}>
            <Carousel
                interval={3000}
                stopAutoPlayOnHover={false}
                animation='slide'
                height='35rem'
                indicatorContainerProps={{
                    style: {
                        display: 'none'
                    }

                }}
            >
                {banner.map(item => (
                    <Box component='img' sx={{ width: '100%', height: '100%'}} src={item} />
                ))}
            </Carousel>
        </Box>
    )
}
