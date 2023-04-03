import { useState } from "react";
// import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const rabi = [
    {
        name: 'Wheat',
        image: '/Images/wheat.jpg',
        crops: [
            'Barley',
            'Gram',
            'Rapeseed',
            'Mustard',
            'Oat',
            'Wheat',
            'Linseed'
        ]
    }
]

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
                variant="h4"
                fontWeight="500"
                color="tertiary"
                gutterBottom>
                RABI CROPS
            </Typography>
            <Typography
                variant='h6'
                fontWeight='400'
                paddingBottom={3}
                color="primary"
                gutterBottom
            >
                Rabi crops or rabi harvest, also known as winter crops, are agricultural crops that are sown in winter and harvested in the spring in India, Pakistan and Bangladesh.
                The rabi crops are sown around mid-November, preferably after the monsoon rains are over, and harvesting begins in April / May. The crops are grown either with rainwater that has percolated into the ground or using irrigation
            </Typography>

            {rabi.map(crop => (
                <Accordion sx={{ borderRadius: '20px !important' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        sx={{
                            pl: 0,
                            '& .MuiAccordionSummary-content': {
                                m: 0,
                                alignItems: 'center',
                                height: '5rem',
                                overflow: 'hidden',
                            },
                            '&.Mui-expanded .MuiTypography-root': {
                                color: 'white'
                            },
                            '&.Mui-expanded': {
                                backgroundColor: 'tertiary.main',
                            },
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Box component='img' src={crop.image} sx={{ width: '15%', flexShrink: 0 }} />
                        <Typography
                            variant="h5"
                            textAlign='center'
                            color='tertiary.main'
                            textTransform='uppercase'
                            fontWeight='700'
                            fontSize='3em'
                            font
                            sx={{
                                flexGrow: 1,
                            }}>
                            {crop.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {crop.crops.map(crop => (
                                <ListItem
                                    disablePadding
                                >
                                    <ListItemText sx={{ textAlign: 'center' }} primary={crop} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}

        </Container>
    )
}

export default CropDetail;
