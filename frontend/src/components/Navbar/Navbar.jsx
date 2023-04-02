import { useState } from 'react';
import { Link } from "react-router-dom";
import SignIn from './SignIn'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = [
    {
        name: 'Crops',
        link: '/crops'
    }, 
    {
        name: 'Services',
        link: '/'
    }, 
    {
        name: 'Shop',
        link: '/'
    }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar({ setTrigger }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [loginDialog, setLoginDialog] = useState(false);

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    {/* -------------------------------- LOGO Start -------------------------------- */}
                    <Link to='/'>
                        <Box
                            component='img'
                            display={{ xs: 'none', md: 'block' }}
                            src="Images/main-logo.png"
                            alt='FarmHub Logo'
                            width='3.5rem'
                        />
                    </Link>
                    {/* -------------------------------- LOGO End -------------------------------- */}

                    {/* -------------------------------- Responsive start -------------------------------- */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            disableScrollLock={true}
                        >
                            {pages.map((page) => (
                                <MenuItem component={Link} to={page.link} key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        component='img'
                        width='3rem'
                        display={{ xs: 'flex', md: 'none' }}
                        src="Images/main-logo.png"
                        alt='FarmHub Logo'
                    />
                    {/* -------------------------------- Responsive end -------------------------------- */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={page.link}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, fontWeight: 'bold', color: 'tertiary.main', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                        <Button
                            onClick={() => { handleCloseNavMenu(); setLoginDialog(true); }}
                            sx={{ my: 2, fontWeight: 'bold', color: 'tertiary.main', display: 'block' }}
                        >
                            Sign In
                        </Button>
                    </Box>
                        <IconButton >
                            <SearchIcon color="tertiary"/>
                        </IconButton>
                        <IconButton >
                            <ShoppingCartIcon color="tertiary"/>
                        </IconButton>

                    {/* <Box sx={{ flexGrow: 0 }}>
                        
                    </Box> */}
                </Toolbar>
            </Container>
            <SignIn open={loginDialog} setOpen={setLoginDialog} setTrigger={setTrigger}/>
        </AppBar>
    );
}
export default NavBar;