import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import rabi from './rabi.json';
import kharif from './kharif.json';
import zaid from './zaid.json';

function CropDetail() {

    const { crop } = useParams();
    const [season, setSeason] = useState(null);

    useEffect(() => {
        if (crop === 'rabi')
            setSeason(rabi);
        else if (crop === 'kharif')
            setSeason(kharif);
        else
            setSeason(zaid);
    }, [crop])


    if (season)
        return (
            <Container sx={{ mt: { xs: 6, sm: 8 } }}>
                <Typography
                    pt={7}
                    variant="h3"
                    fontWeight="500"
                    color="primary"
                    gutterBottom>
                    {season.name} Crops
                </Typography>
                <Typography
                    variant='h6'
                    fontWeight='400'
                    paddingBottom={3}
                    color="primary"
                    gutterBottom
                >
                    {season.description}
                </Typography>

                <Grid
                    container
                    spacing={{ xs: 8, md: 15 }}
                    pt={5}
                >
                    {season.category.map(crop => (
                        <Grid item container spacing={{ xs: 5, md: 10 }}
                            sx={{
                                alignItems: 'center',
                                flexDirection: { sm: season.category.indexOf(crop) % 2 === 0 ? 'row-reverse' : '' }
                            }}>
                            <Grid item xs={12} sm={8}>
                                <Box component='img' src={crop.image} width='100%' />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                sx={{
                                    // pl: { sm: 10 },
                                }}
                            >
                                <Typography variant='h4' color='primary'>{crop.name}</Typography>
                                <List>
                                    {crop.crops.map(crop => (
                                        <ListItem disablePadding>
                                            <ListItemIcon sx={{ minWidth: '30px' }}>
                                                <FiberManualRecordIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontSize: 'small'
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primaryTypographyProps={{ style: { color: 'white' } }}
                                                primary={crop}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        )
    return null;
}

export default CropDetail;
