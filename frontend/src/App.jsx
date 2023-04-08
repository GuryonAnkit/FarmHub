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
import SignUp from './components/Navbar/SignUp';
import CropDetails from './components/Crops/CropDetails';

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

    return (
        <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' element={
                        <>
                            <Navbar setTrigger={setTrigger} user={user} />
                            <Outlet />
                            <Footer />
                        </>
                    }>
                        <Route index element={<Home />} />
                        <Route path='crops' element={<Crops/>} />
                        <Route path='crops/:crop' element={<CropDetails/>} />
                    </Route>
                    <Route path='/signup' element={<SignUp/>} />
                </Routes>
        </ThemeProvider>
    );
}
