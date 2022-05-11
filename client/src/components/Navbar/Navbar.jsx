import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import memoriesText from '../../assets/memoriesText.png';
import memories from '../../assets/memories.png';
import useStyles from './styles';
import decode from 'jwt-decode';


// this component is call from 🟨 App.js <Component /> 🟨
// by the help of React <Router>
const Navbar = () => {

    // get user info from localStorage that server send as jwt(jsonWebToken)
    const getLogInUserInfo = JSON.parse(localStorage.getItem('profile'));

    const [logInUser, setLogInUser] = useState(getLogInUserInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();


    // clear from LocalStorage +++ state variable +++ redirect into root component...
    const logout = () => {

        // clear from localStorage
        dispatch({ type: LOGOUT });

        // clear user Object
        setLogInUser(null);
        
        navigate('/auth');
    };


    const token = logInUser?.token;

    // call this useEffect ==> when the url is change... (by [location] dependency) 
    // reload this component after any change happen according to user... 
    useEffect(() => {
        // ger user token for automatic logout after some time 

        // manual signUp >>> token checking, for auto logout after 1 hour...        
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        // reload this component & set user info at JSX
        setLogInUser(getLogInUserInfo);
        // if location change, ↕↕↕↕↕ reload this component again...↕↕↕↕↕
    }, [token, getLogInUserInfo, location]);





    return (

        <AppBar className={classes.appBar} position="static" color="inherit">

            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </Link>

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

                                {/* ============= logOut JSX ============= */}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={logout}
                                    className={classes.logout} > Logout </Button>
                            </div>
                        ) : (
                            // ============= logIn JSX ============= 
                            <Button
                                // for login, send user into auth (registration) component...
                                component={Link}
                                to="/auth"
                                color="primary"
                                variant="contained" > Sign In </Button>
                        )
                }
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
