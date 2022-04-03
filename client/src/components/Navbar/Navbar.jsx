import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import memories from '../../assets/memories.png';
import useStyles from './styles';
// import decode from 'jwt-decode';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT });

        navigate('/auth');

        setUser(null);
    };

    useEffect(() => {
        // const token = user?.token;

        // if (token) {
        //     const decodedToken = decode(token);

        //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        // }

        setUser(JSON.parse(localStorage.getItem('profile')));
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
                    user?.result
                        ? (
                            <div className={classes.profile}>

                                <Avatar
                                    className={classes.purple}
                                    alt={user?.result.name}
                                    src={user?.result.imageUrl}
                                >
                                    {user?.result.name.charAt(0)}
                                </Avatar>

                                <Typography className={classes.userName} variant="h6">
                                    {user?.result.name}
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
