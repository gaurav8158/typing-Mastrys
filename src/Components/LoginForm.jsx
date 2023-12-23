import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { themeOptions } from '../Utils/theme';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';
import { toast } from "react-toastify";

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {theme} = useTheme();
    const handleSubmit = ()=>{
        if(!email || !password){
            toast.warning('Fill all details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        auth.signInWithEmailAndPassword(email,password).then((response)=>{
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
            console.log("error", err);
            toast.error(errorMapping[err.code] || 'some error occured', {
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
  return (
    <Box
        p={3}
        style={{
            display:"flex",
            flexDirection:'column',
            gap:'20px'
        }}
    >
        
        <TextField
            type='email'
            variant='outlined'
            label='Enter Email'
            InputLabelProps={{
                style: {
                    color: theme.title
                }
            }}
            InputProps={{
                style: {
                    color: theme.title
                }
            }}
            onChange={(e)=>setEmail(e.target.value)}/>
        <TextField
            type='password'
            variant='outlined'
            label='Enter Password'
            InputLabelProps={{
                style: {
                    color: theme.title
                }
            }}
            InputProps={{
                style: {
                    color: theme.title
                }
            }}
            onChange={(e)=>setPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            style={{backgroundColor: theme.title, color: theme.background}}
            onClick={handleSubmit}>
                LOGIN
        </Button>

    </Box>
  )
}

export default LoginForm