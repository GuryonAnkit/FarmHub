import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";



const items = [
    {
        name: 'Wheat',
        image: 'Images/wheat.jpg',
    }
]


function CropDetail() {

    const { crop } = useParams;

    return (
        <Container>
            <Typography
                pt={7}
                variant="h4"
                fontWeight="500"
                color="tertiary"
                gutterBottom>
                RABI CROPS
            </Typography>
            <Typography
                paddingBottom={3}
                color="primary"
                gutterBottom
                fontFamily="Roboto"
                fontWeight="bold">
                Rabi crops or rabi harvest, also known as winter crops, are agricultural crops that are sown in winter and harvested in the spring in India, Pakistan and Bangladesh.
                The rabi crops are sown around mid-November, preferably after the monsoon rains are over, and harvesting begins in April / May. The crops are grown either with rainwater that has percolated into the ground or using irrigation
            </Typography>

            {items.map((item) => (
                <Card
                    sx={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'primary.main',
                        color: 'white'
                    }}
                        
                    >
                    <Box width='10em'>
                        <CardMedia
                            component="img"
                            width="100%"
                            height="100%"
                            image='Images/combine.jpg'
                            alt="Cereal"
                        />
                    </Box>
                    <Box width='80em'>
                    <CardContent  >
                        <Typography component="div" variant="h5" textAlign='center' color='tertiary.main' fontFamily='Times New Roman' fontWeight='700' fontSize='3em'>
                            {item.name}
                        </Typography>
                    </CardContent>
                    </Box>
                </Card>
            ))}
        </Container>
    )
}

export default CropDetail;
