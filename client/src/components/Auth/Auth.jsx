import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import { signIn, signUp } from '../../reduxStore/actions/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';


const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};


// this component is call from 🟨 App.js <Component /> 🟨
// by the help of React <Router>
const SignUp = () => {

  const [userInfo, setUserInfo] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();


  // signIn to signUp toggling function...
  const switchMode = () => {
    setUserInfo(initialState);
    setIsSignUp(prevIsSignUp => !prevIsSignUp);
    setShowPassword(false);
  }


  // collect all input value's dynamically from user input fields...
  const handleChange = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });


  // ######################################
  // Manual Login System (SignIn + SignUp)
  // ######################################
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(userInfo, navigate));
    } else {
      dispatch(signIn(userInfo, navigate));
    }
  }


  // ###################################
  // Google Login system...
  // ###################################
  const googleSuccess = async (res) => {

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      // directly send user info at ==> Redux (Auth Reducer) 
      // for storing user info at localStorage, for later using as per requirement...
      dispatch({ type: AUTH, data: { result, token } });

      // after user login, redirect user at the index page...
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const googleError = async (response) => {
    console.log(response)
    alert('🔴 Google Sign In was unsuccessful.\n🔴 Try again later...');
  }



  return (
    <Container component="main" maxWidth="xs">

      <Paper className={classes.paper} elevation={3}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>

          <Grid container spacing={2}>

            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} half required />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half required />
                </>
              )
            }

            <Input name="email" label="Email Address" type="email" handleChange={handleChange} required />
            <Input name="password" label="Password" handleChange={handleChange}
              type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} required />

            {
              isSignUp &&
              <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} required />
            }

          </Grid>


          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>


          {/* for login by google | button */}
          <GoogleLogin
            clientId="16518181149-01jum6i83a2kkj3jk1s8mmbiq2hch8v5.apps.googleusercontent.com"

            render={
              renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={classes.googleButton}
                  startIcon={<Icon />}
                  variant="contained"
                  color="primary"
                  fullWidth
                > Google Sign In </Button>
              )}
            // our custom logic set in these function...
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />


          <Grid container justifyContent="center">
            <Grid item>
              {/* button for switching between SignIn or SignUp */}
              <Button onClick={switchMode}>
                {
                  isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"
                }
              </Button>
            </Grid>
          </Grid>

        </form>

      </Paper>

    </Container>
  );
};

export default SignUp;