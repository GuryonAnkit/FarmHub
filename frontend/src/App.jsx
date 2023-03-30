import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import { Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[50]
        },
        secondary: {
            dark: '#00635A',
            main: '#82c777'
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
                <Navbar />
                <Routes>
                </Routes>
                <Footer />
        </ThemeProvider>
    );
}
