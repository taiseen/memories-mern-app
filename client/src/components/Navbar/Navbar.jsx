import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import memories from '../../assets/memories.png';
import useStyles from './styles';
import decode from 'jwt-decode';

const Navbar = () => {

    // get user info from localStorage that server send as jwt(jsonWebToken)
    const [logInUser, setLogInUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT });

        navigate('/auth');

        setLogInUser(null);
    };


    useEffect(() => {
        // ger user token for automatic logout after some time 
        const token = logInUser?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setLogInUser(JSON.parse(localStorage.getItem('profile')));

        
        // if location change, reload this component again...
    }, [location]);



    return (

        <AppBar className={classes.appBar} position="static" color="inherit">

            <div className={classes.brandContainer}>

                <Typography
                    component={Link}
                    to="/"
                    variant="h2"
                    align="center"
                    className={classes.heading}>Memories</Typography>

                <img className={classes.image} src={memories} alt="icon" height="60" />

            </div>

            <Toolbar className={classes.toolbar}>
                {
                    logInUser?.result
                        ? (
                            <div className={classes.profile}>

                                <Avatar
                                    className={classes.purple}
                                    alt={logInUser?.result.name}
                                    src={logInUser?.result.imageUrl}
                                >
                                    {logInUser?.result.name.charAt(0)}
                                </Avatar>

                                <Typography className={classes.userName} variant="h6">
                                    {logInUser?.result.name}
                                </Typography>

                                <Button
                                    onClick={logout}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.logout} > Logout </Button>
                            </div>
                        ) : (
                            <Button
                                component={Link}
                                to="/auth"
                                variant="contained"
                                color="primary"> Sign In </Button>
                        )
                }
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
