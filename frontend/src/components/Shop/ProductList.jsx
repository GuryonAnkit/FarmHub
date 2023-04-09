import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export default function ProductList({ updateTrigger }) {

    const [products, setProducts] = useState(null);
    const [brands, setBrands] = useState(null);
    const { category } = useParams();
    const { search } = useParams();
    const [sort, setSort] = useState('none');

    useEffect(() => {
        category ?
            axios.get(`http://localhost:4000/products/category/${category}/${sort}`)
                .then((response) => {
                    setProducts(response.data.products);
                    setBrands(response.data.brands);
                })
                .catch((err) => console.log(err))
            :
            axios.get(`http://localhost:4000/products/search/${search}/${sort}`)
                .then((response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setBrands(null);
                })
                .catch((err) => console.log(err))
    }, [updateTrigger, search, category, sort])

    const [priceRange, setPriceRange] = useState({
        min: '',
        max: ''
    })

    function changePriceRange(event) {
        setPriceRange({ ...priceRange, [event.target.name]: event.target.value })
    }

    function checkPriceRange(event) {
        if ((event.target.name === 'min' && priceRange.max) || (event.target.name === 'max' && priceRange.min))
            if (priceRange.min > priceRange.max)
                setPriceRange({ ...priceRange, [event.target.name]: '' })
    }

    const ratings = [5, 4, 3, 2, 1];

    const [checkedRating, setCheckedRating] = useState([]);

    const changeCheckedRating = (event, rating) => {
        event.target.checked ?
            setCheckedRating([...checkedRating, rating])
            :
            setCheckedRating(newCheckedRating => newCheckedRating.filter(selected => selected !== rating))
    };

    const [checkedBrands, setCheckedBrands] = useState([]);

    const changeCheckedBrands = (event, rating) => {
        event.target.checked ?
            setCheckedBrands([...checkedBrands, rating])
            :
            setCheckedBrands(newCheckedBrands => newCheckedBrands.filter(selected => selected !== rating))
    };

    if (products) {
        return (
            <Container sx={{ mt: { xs: 6, sm: 8 } }}>
                <Grid container pt={2} rowSpacing={3} columnSpacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent sx={{ p: '0.8em !important' }}>
                                <Stack direction='row' alignItems='center'>
                                    <Typography mr='auto' variant='subtitle1' fontWeight='500'>
                                        {category ? category : `Results for "${search}"`}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight='500'>Sort by</Typography>
                                    <Select
                                        sx={{ ml: 1, minWidth: '12em' }}
                                        size='small'
                                        value={sort}
                                        onChange={(event) => setSort(event.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value='none'>Relavance</MenuItem>
                                        <MenuItem value='price'>Price Low to High</MenuItem>
                                        <MenuItem value='-price'>Price High to Low</MenuItem>
                                    </Select>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant='subtitle1' fontWeight='500'>Price Range</Typography>
                                <Box display='flex' alignItems='center' mt={2}>
                                    <TextField
                                        type='number'
                                        size="small"
                                        variant="outlined"
                                        name='min'
                                        label='Min'
                                        value={priceRange.min}
                                        onChange={(event) => changePriceRange(event)}
                                        onBlur={(event) => checkPriceRange(event)}
                                    />
                                    <Typography px={1} fontWeight='500'>-</Typography>
                                    <TextField
                                        type='number'
                                        size="small"
                                        variant="outlined"
                                        name='max'
                                        label='Max'
                                        value={priceRange.max}
                                        onChange={(event) => changePriceRange(event)}
                                        onBlur={(event) => checkPriceRange(event)}
                                    />
                                </Box>
                                <Typography variant='subtitle1' fontWeight='500' mt={5}>Ratings</Typography>
                                <FormGroup sx={{ mt: 1 }}>
                                    {ratings.map(rating => (
                                        <FormControlLabel
                                            key={rating}
                                            sx={{ ml: 0 }}
                                            control={
                                                <Checkbox
                                                    checked={checkedRating.some(selected => selected === rating)}
                                                    onChange={(event) => changeCheckedRating(event, rating)}
                                                />
                                            }
                                            label={<Rating name="read-only" value={rating} readOnly />} />
                                    ))}
                                </FormGroup>
                                {brands ?
                                    <>
                                        <Typography variant='subtitle1' fontWeight='500' mt={5}>Brands</Typography>
                                        <FormGroup sx={{ mt: 1 }}>
                                            {brands.map(brand => (
                                                <FormControlLabel
                                                    key={brand}
                                                    sx={{ ml: 0 }}
                                                    control={
                                                        <Checkbox
                                                            checked={checkedBrands.some(selected => selected === brand)}
                                                            onChange={(event) => changeCheckedBrands(event, brand)}
                                                        />
                                                    }
                                                    label={brand}
                                                />
                                            ))}
                                        </FormGroup>
                                    </>
                                    : null}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={9} container rowSpacing={3} columnSpacing={3}>
                        {products.filter(product =>
                            (checkedRating.length === 0 || checkedRating.includes(Math.round(product.avgRating)))
                            && (checkedBrands.length === 0 || checkedBrands.includes(product.brand))
                            && (priceRange.min ? product.price > priceRange.min : true)
                            && (priceRange.max ? product.price < priceRange.max : true))
                            .map(product => (
                                <Grid item xs={4} key={product._id}>
                                    <Link component={RouterLink} to={`/shop/product/${product._id}`} underline='none'>
                                        <Card elevation={2}>
                                            <CardMedia
                                                sx={{ p: 2, boxSizing: 'border-box', objectFit: 'contain' }}
                                                component="img"
                                                height='250rem'
                                                image={product.images[0].data}
                                                alt={product.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {product.name}
                                                </Typography>
                                                <Box height='1.4em'>
                                                    {product.avgRating ?
                                                        <Rating name="read-only" value={product.avgRating} readOnly size='small' />
                                                        : <Typography variant="body2" color="text.secondary">No ratings</Typography>
                                                    }
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    ₹{(product.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Container>
        )
    }
    return null;
}
