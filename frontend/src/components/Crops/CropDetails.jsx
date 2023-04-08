import { useState } from "react";
// import { useParams } from "react-router-dom";
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
// import kharif from './kharif.json';
// import zaid from './zaid.json';

function CropDetail() {

    // const { crop } = useParams;

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container sx={{ mt: { xs: 6, sm: 8 } }}>
            <Typography
                pt={7}
                variant="h3"
                fontWeight="500"
                color="primary"
                gutterBottom>
                {rabi.name} Crops
            </Typography>
            <Typography
                variant='h6'
                fontWeight='400'
                paddingBottom={3}
                color="primary"
                gutterBottom
            >
                {rabi.description}
            </Typography>

            {rabi.category.map(crop => (
                <Grid 
                    container  
                    m='auto'
                    mt={15} 
                    alignItems='center' 
                    flexDirection={rabi.category.indexOf(crop) % 2 == 0 ? 'row-reverse' : ''}>
                    <Grid item xs={4} pl={rabi.category.indexOf(crop) % 2 == 0 ? 10 : 0}>
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
                    <Grid item xs={8}>
                        <Box component='img' src={crop.image} width='100%' />
                    </Grid>
                </Grid>
            ))}

        </Container>
    )
}

export default CropDetail;
