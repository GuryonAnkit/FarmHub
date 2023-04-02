import {  CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";

const featuredCrops = [
    {
        name: "Rabi Crops",
        image: "Images/wheat.jpg",
        link: "/crops/rabi",
    },
    {
        name: "Kharif Crops",
        image: "Images/Carrot.JPG",
        link: "/crops/kharif",
    },
    {
        name: "Zaid Crops",
        image: "Images/watermelon.webp",
        link: "/crops/zaid",
    },
];

function Crops() {
    return (
        <Container maxWidth="lg">
            <Typography
                pt={7}
                variant="h4"
                fontWeight="500"
                color="tertiary"
                gutterBottom
            >
                CROPS
            </Typography>
            <Typography
                paddingBottom={3}
                color="primary"
                gutterBottom
                fontFamily="Roboto"
                fontWeight="bold"
            >
                Here’s everything you need to know about a wide range of crops such as
                Rabi, Zaid, Kharif. Browse through these section to get complete
                information and valuable farming tips. This section covers important
                information related to crops such as climate and soils, land
                preparation, seed rate and spacing, crop nutrition management,
                irrigation management, weeds and weed management, harvesting and post
                harvesting measures, plant diseases, how to get a better quality and
                more.
            </Typography>

            <Stack direction="row" justifyContent="space-between">
                {featuredCrops.map((crop) => (
                    <Card
                        component={RouterLink}
                        to={crop.link}
                        sx={{ maxWidth: 345, borderRadius: "1em" , textDecoration:'none'}}
                        key={crop.name}
                    >
                            <CardMedia
                                component="img"
                                image={crop.image}
                                alt="Wheat"
                                width={250}
                                height={380}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ backgroundColor: "primary.main" }}>
                                <Typography
                                    color="tertiary.main"
                                    variant="h4"
                                    component="div"
                                    textAlign="center"
                                >
                                    {crop.name}
                                </Typography>
                            </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}

export default Crops;
