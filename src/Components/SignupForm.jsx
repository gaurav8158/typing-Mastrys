import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';
import { toast } from "react-toastify";

const SignupForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const {theme} = useTheme();

    const checkUsernameAvailability = async()=>{
        const ref = db.collection('usernames');
        const response = await ref.doc(username).get();
        console.log(response.exists);
        return !response.exists;
    }


    const handleSubmit = async()=>{
        if(!email || !password || !confirmPassword || !username){
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
        if(password!==confirmPassword){
            toast.warning('Password mismatch', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return
        }
        
        if(await checkUsernameAvailability()){
            auth.createUserWithEmailAndPassword(email, password).then(async(response) => {
                const ref = await db.collection('usernames').doc(username).set({
                   uid:  response.user.uid
                });
                toast.success('User created', {
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
            }).catch((err) => {
                console.log("sign up failed", err);
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
        else{
            toast.error('Username taken', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        
        
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
            type='text'
            variant='outlined'
            label='Enter Username'
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
            onChange={(e)=>setUsername(e.target.value)}/>
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
        <TextField
            type='password'
            variant='outlined'
            label='Enter Confirm Password'
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
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            style={{backgroundColor: theme.title, color: theme.background}}
            onClick={handleSubmit}>
                Signup
        </Button>

    </Box>
  )
}

export default SignupForm