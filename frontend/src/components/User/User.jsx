import { useState, forwardRef } from 'react';
import Profile from './Profile';
import Addresses from './Addresses';
import Orders from './Orders';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTab = styled(Tab)(() => ({
    alignItems: 'start',
    textTransform: 'none',
}));

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            style={{ width: '80%' }}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ px: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function User({
    setTrigger,
    user,
    profSec,
    setProfSec,
    addressForm,
    setAddressForm,
    userTab,
    setUserTab
}) {
    const [userSnackbar, setUserSnackbar] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = userSnackbar;

    const openSnackbar = () => {
        setUserSnackbar({ ...userSnackbar, open: true });
    };

    const closeSnackbar = () => {
        setUserSnackbar({ ...userSnackbar, open: false });
    };

    if (user) {
        return (
            <Container sx={{ mt: { xs: 6, sm: 8 } }}>
                <Box display='flex' pt={5}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={userTab}
                        onChange={(e, newUserTab) => setUserTab(newUserTab)}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
                    >
                        <StyledTab label="Profile" {...a11yProps(0)} onClick={() => setProfSec(true)} />
                        <StyledTab label="Addresses" {...a11yProps(1)} onClick={() => setAddressForm(false)} />
                        <StyledTab label="Orders" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={userTab} index={0}>
                        <Profile
                            setTrigger={setTrigger}
                            user={user}
                            openSnackbar={openSnackbar}
                            profSec={profSec}
                            setProfSec={setProfSec}
                        />
                    </TabPanel>
                    <TabPanel value={userTab} index={1}>
                        <Addresses
                            setTrigger={setTrigger}
                            user={user}
                            openSnackbar={openSnackbar}
                            addressForm={addressForm}
                            setAddressForm={setAddressForm}
                        />
                    </TabPanel>
                    <TabPanel value={userTab} index={2}>
                        <Orders user={user} />
                    </TabPanel>
                    <Snackbar
                        anchorOrigin={{
                            vertical,
                            horizontal
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}>
                        <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                            Changes saved successfully
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        );
    }
}