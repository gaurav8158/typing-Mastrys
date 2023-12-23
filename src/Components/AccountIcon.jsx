import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';
const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center'
    }
}))


const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [user] = useAuthState(auth);
    console.log("user", user);
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleValueChange = (e,v)=>{
        setValue(v);
    }  

    const navigate = useNavigate();

    const handleOpen = ()=>{
        if(user){
            //routing because user is logged in;
            navigate('/user');
        }
        else{
            //no user, so open login/signup form
            setOpen(true);
        }
    }

    const logout = ()=>{
        auth.signOut().then((response)=>{
            toast.success('Successfully Logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
        }).catch((err)=>{
            console.log(err);
            toast.error('Not able to Logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        });
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = ()=>{
        signInWithPopup(auth,googleProvider).then(async(response)=>{
            const username = response.user.email;
            const ref= await db.collection('usernames').doc(username).set({
                uid: response.user.uid
            });
            toast.success('Logged in successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'Not able to use google authentication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        });
    }

    const {theme} = useTheme();
    const classes = useStyles();
    console.log(classes);
    console.log(value);
    
  return (
    <div>
        <AccountCircleIcon onClick={handleOpen}/>
        {(user) && <LogoutIcon onClick={logout}/>}

        <Modal 
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.box}>
                <AppBar position='static'
                    style={{backgroundColor:'transparent'}}>
                    <Tabs
                        value={value}
                        onChange={handleValueChange}
                        variant='fullWidth'
                    >
                        <Tab label='login' style={{color: theme.title}}></Tab>
                        <Tab label='signup' style={{color: theme.title}}></Tab>
                    </Tabs>
                </AppBar>
                {value===0 && <LoginForm handleClose={handleClose}/>}
                {value===1 && <SignupForm handleClose={handleClose}/>}

                <Box>
                    <span>OR</span>
                    <GoogleButton
                        style={{width:'100%',marginTop:'8px'}}
                        onClick={signInWithGoogle}
                    />
                </Box>
            </div>
        </Modal>
    </div>
  )
}

export default AccountIcon