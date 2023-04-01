import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home';
import Footer from "./components/Footer/Footer"
import { Routes, Route, Outlet } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Box from '@mui/material/Box';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[50]
        },
        secondary: {
            main: '#82c777',
        },
        tertiary: {
            main: '#00635A',
        }
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mt: { xs: 6, sm: 8 }, mb: 5 }}>
                <Routes>
                    <Route path='/' element={<><Navbar /><Outlet /></>}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path='/signup' element={<></>} />
                </Routes>
            </Box>
            <Footer />
        </ThemeProvider>
    );
}
