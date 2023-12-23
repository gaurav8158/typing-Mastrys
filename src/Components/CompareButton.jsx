import { makeStyles } from '@material-ui/core'
import { Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebaseConfig'
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 'auto',
        textAlign: 'center'
    }
}))

const CompareButton = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const handleClose = () => {
        setOpen(false);
    }

    const { theme } = useTheme();
    const classes = useStyles();

    const navigate = useNavigate();

    const checkUsernameAvailability = async()=>{
        const ref = db.collection('usernames');
        const response = await ref.doc(username).get();
        return response.exists;
    }

    const handleSubmit = async()=>{
        if(await checkUsernameAvailability()){
            navigate(`/compare/${username}`);
        }
        else{
            toast.warning('invalid username', {
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

    const handleClick = ()=>{
        if(auth.currentUser){
            setOpen(true);
        }
        else{
            toast.warning('login to use compare', {
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
        <div>
            <div className='compare-btn' onClick={handleClick}>
                COMPARE
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}>
                <div className={classes.box}>
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
                        onChange={(e) => setUsername(e.target.value)} />
                    <Button
                        style={{ backgroundColor: theme.title, color: theme.background, marginLeft: '5px', marginTop: '10px' }}
                        onClick={handleSubmit}>
                        Compare
                    </Button>
                </div>
            </Modal>

        </div>
    )
}

export default CompareButton