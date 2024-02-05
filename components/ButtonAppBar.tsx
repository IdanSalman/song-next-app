"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountMenu from './AccountMenu';
import CartMenu from './CartMenu';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material';
import { useLoggedInContext } from '@/app/LoginContext';

export default function MainButtonAppBar() {
    const { loggedIn } = useLoggedInContext()
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)
    const { push } = useRouter()

    let registerButton = <Button onClick={() => { push(('/newUser/register')); }} color="inherit">Register</Button>
    let loginButton = <Button onClick={() => { push(('/newUser/login')); }} color="inherit">Login</Button>
    let userData = <div>
        {registerButton}
        {loginButton}
    </div>
    if (loggedIn) // User is logged in
        userData = <>
            <CartMenu />
            <AccountMenu />
        </>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar sx={{ flexGrow: 1 }} variant='regular'>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    {userData}
                </Toolbar>
            </AppBar>
            <Offset /*https://mui.com/material-ui/react-app-bar/#fixed-placement*/ />
        </Box >
    );
}