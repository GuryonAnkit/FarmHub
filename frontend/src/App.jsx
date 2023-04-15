import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Outlet, Routes } from 'react-router-dom'
import Navbar from './components/Layout/Navbar/Navbar'
import Home from './components/Layout/Home/Home';
import Footer from "./components/Layout/Footer/Footer"
import Crops from './components/Crops/Crops'
import ProductList from './components/Shop/ProductList';
import ProductDetail from './components/Shop/ProductDetail';
import SignUp from './components/Layout/Navbar/SignUp';
import CropDetails from './components/Crops/CropDetails';
import ShopHome from './components/Shop/ShopHome';
import AboutUs from './components/Layout/About us/AboutUs';
import User from './components/User/User';
import Order from './components/User/Order';
import CheckOutSteps from './components/Cart/CheckOutSteps';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
    palette: {
        primary: {
            main: grey[50],
            contrastText: '#07412B',
        },
        secondary: {
            main: '#609966',
        },
        tertiary: {
            main: '#00635A',
            contrastText: '#fff',
        },
        homeBtn: {
            main: '#07412B',
            contrastText: '#fff',
        },
        cropHeading: {
            main: '#40513B',
        },
        // cropSubHeading:{
        //     main: '#40513B'
        // }
    },
});

export default function App() {

    // -------------------------------- User --------------------------------

    const [user, setUser] = useState(null);
    const [updateTrigger, setTrigger] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/user`, { withCredentials: true })
            .then((response) => {
                if (response) setUser(response.data)
                else setUser(null);
            })
            .catch((err) => console.log(err));
    }, [updateTrigger]);

    const [loginDialog, setLoginDialog] = useState(false);
    const [userTab, setUserTab] = useState(0);
    const [profSec, setProfSec] = useState(true);
    const [addressSec, setAddressSec] = useState('view');

    // -------------------------------- Cart --------------------------------

    async function updateInCart(productId, quantity) {
        axios.put(`http://localhost:4000/user/${user._id}/cart/${productId}`,
            { quantity: quantity },
            { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response) setTrigger(prevValue => !prevValue)
            })
            .catch((error) => console.log(error));
    }

    async function removeFromCart(productId) {
        axios.delete(`http://localhost:4000/user/${user._id}/cart/${productId}`, { withCredentials: true })
            .then((response) => {
                if (response) setTrigger(prevValue => !prevValue)
            })
            .catch((error) => console.log(error));
    }

    // -------------------------------- Snackbar --------------------------------

    const [snackbar, setSnackbar] = useState({
        content: '',
        severity: '',
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open, content, severity } = snackbar;

    const openSnackbar = (content, severity) => {
        setSnackbar({ ...snackbar, open: true, content: content, severity: severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={
                    <>
                        <Navbar
                            shopNav={false}
                            setTrigger={setTrigger}
                            user={user}
                            loginDialog={loginDialog}
                            setLoginDialog={setLoginDialog}
                            updateInCart={updateInCart}
                            removeFromCart={removeFromCart}
                            setUserTab={setUserTab}
                        />
                        <Outlet />
                        <Footer />
                    </>
                }>
                    <Route index element={<Home />} />
                    <Route path='crops' element={<Crops />} />
                    <Route path='crops/:season' element={<CropDetails />} />
                    <Route path='about-us' element={<AboutUs />} />
                    <Route path='user' element={
                        <User
                            setTrigger={setTrigger}
                            user={user}
                            profSec={profSec}
                            setProfSec={setProfSec}
                            addressSec={addressSec}
                            setAddressSec={setAddressSec}
                            userTab={userTab}
                            setUserTab={setUserTab}
                            openSnackbar={openSnackbar}
                        />}
                    />
                    <Route path='order/:orderId' element={<Order user={user} />} />
                    <Route path='checkOut' element={<CheckOutSteps user={user} />} />
                </Route>
                <Route path='/shop' element={
                    <>
                        <Navbar
                            shopNav={true}
                            setTrigger={setTrigger}
                            user={user}
                            loginDialog={loginDialog}
                            setLoginDialog={setLoginDialog}
                            updateInCart={updateInCart}
                            removeFromCart={removeFromCart}
                            setUserTab={setUserTab}
                        />
                        <Outlet />
                        <Footer />
                    </>
                }>
                    <Route index element={<ShopHome />} />
                    <Route path='products/category/:category' element={
                        <ProductList updateTrigger={updateTrigger} />}
                    />
                    <Route path='product/:id' element={
                        <ProductDetail
                            user={user}
                            updateTrigger={updateTrigger}
                            setTrigger={setTrigger}
                            setLoginDialog={setLoginDialog}
                            updateInCart={updateInCart}
                        />}
                    />
                </Route>
                <Route path='/signup' element={
                    <SignUp setTrigger={setTrigger} openSnackbar={openSnackbar} />}
                />
            </Routes>
            <Snackbar
                anchorOrigin={{
                    vertical,
                    horizontal
                }}
                open={open}
                autoHideDuration={6000}
                onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {content}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
