import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Footer from "./components/Footer/Footer"
import { Route, Outlet, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Crops from './components/Crops/Crops'
import ProductList from './components/Shop/ProductList';
import ProductDetail from './components/Shop/ProductDetail';
import SignUp from './components/Navbar/SignUp';
import CropDetails from './components/Crops/CropDetails';
import ShopHome from './components/Shop/ShopHome';

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
        }
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

    // -------------------------------- Cart --------------------------------

    async function updateInCart(productId, quantity) {
        axios.put(`http://localhost:4000/customer/${user._id}/cart/${productId}`,
            { quantity: quantity },
            { withCredentials: true })
            .then((response) => {
                if (response) setTrigger(prevValue => !prevValue)
            })
            .catch((error) => console.log(error));
    }

    async function removeFromCart(productId) {
        axios.delete(`http://localhost:4000/customer/${user._id}/cart/${productId}`, { withCredentials: true })
            .then((response) => {
                if (response) setTrigger(prevValue => !prevValue)
            })
            .catch((error) => console.log(error));
    }

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
                        />
                        <Outlet />
                        <Footer />
                    </>
                }>
                    <Route index element={<Home />} />
                    <Route path='crops' element={<Crops />} />
                    <Route path='crops/:season' element={<CropDetails />} />
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
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </ThemeProvider>
    );
}
