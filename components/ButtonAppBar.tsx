"use cliet"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/navigation';
import { useLoggedInContext } from '@/app/LoginContext';
import { styled } from '@mui/material';

type AppBarParams = {
    label: string;
    displayRegister: boolean;
    displayLogin: boolean;
    displayProfile: boolean;
};

export default function MainButtonAppBar({ label, displayRegister, displayLogin, displayProfile }: AppBarParams) {
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


    const { loggedIn, setLoggedIn } = useLoggedInContext();
    const [selected, setSelected] = React.useState(false);
    const { push } = useRouter();
    let registerButton = <Button onClick={() => { push(('/newUser/register')); }} color="inherit">Register</Button>
    let loginButton = <Button onClick={() => { push(('/newUser/login')); }} color="inherit">Login</Button>
    if (displayRegister == false)
        registerButton = <></>
    if (displayLogin == false)
        loginButton = <></>

    let userData = <div>
        {registerButton}
        {loginButton}
    </div>
    if (displayProfile) // User is logged in
        userData = <>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                    setSelected(!selected);
                }}
            >
                <LocalGroceryStoreIcon />
            </ToggleButton>
            <AccountMenu />
        </>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { push(('/')); }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {label}
                    </Typography>
                    {userData}
                </Toolbar>
            </AppBar>
            <Offset /*https://mui.com/material-ui/react-app-bar/#fixed-placement*/ />
        </Box >
    );
}