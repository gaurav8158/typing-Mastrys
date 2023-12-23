import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext'

const UserInfo = ({totalTestTaken}) => {
    const { theme } = useTheme();
    const [user] = useAuthState(auth);
    console.log("user in userinfo", user);

  return (
    <div className="user-profile">
        <div className="user">
            <div className="picture">
                <AccountCircleIcon style={{display:'block', transform:'scale(6)', margin:'auto', marginTop: '3.5rem'}}/>
            </div>
            <div className="info">
                <div className="email">
                    {user.email}
                </div>
                <div className="joined-at">
                    {user.metadata.creationTime}
                </div>
            </div>
        </div>
        <div className="total-tests">
         <Link to="/"> 

         <Button style={{ backgroundColor: theme.title, color: theme.background, marginLeft: '5px', marginTop: '10px' }} >Back To Homepage</Button></Link>  
            <span>
                Total Test Taken - {totalTestTaken}
            </span>
        </div>
    </div>
  )
}

export default UserInfo