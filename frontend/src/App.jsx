import { useState, useEffect } from 'react';
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
import Cart from './components/Cart/cart';
import AboutUs from './components/Layout/About us/AboutUs';
import User from './components/User/User';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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
    const [profSec, setProfSec] = useState(true);
    const [addressForm, setAddressForm] = useState(false);
    const [userTab, setUserTab] = useState(0);

    // -------------------------------- Cart --------------------------------

    async function updateInCart(productId, quantity) {
        axios.put(`http://localhost:4000/user/${user._id}/cart/${productId}`,
            { quantity: quantity },
            { withCredentials: true })
            .then((response) => {
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

    const [userSnackbar, setUserSnackbar] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = userSnackbar;

    const userCreatedSnackbar = () => {
        setUserSnackbar({ ...userSnackbar, open: true });
    };

    const closeUserSnackbar = () => {
        setUserSnackbar({ ...userSnackbar, open: false });
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
                    <Route path='cart' element={
                        <Cart
                            user={user}
                            updateInCart={updateInCart}
                            removeFromCart={removeFromCart}
                        />}
                    />
                    <Route path='/user' element={
                        <User
                            setTrigger={setTrigger}
                            user={user}
                            profSec={profSec}
                            setProfSec={setProfSec}
                            addressForm={addressForm}
                            setAddressForm={setAddressForm}
                            userTab={userTab}
                            setUserTab={setUserTab}
                        />}
                    />
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
                    <SignUp setTrigger={setTrigger} userCreatedSnackbar={userCreatedSnackbar} />}
                />
            </Routes>
            <Snackbar
                anchorOrigin={{
                    vertical,
                    horizontal
                }}
                open={open}
                autoHideDuration={6000}
                onClose={closeUserSnackbar}>
                <Alert onClose={closeUserSnackbar} severity="success" sx={{ width: '100%' }}>
                    Account created successfully
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
