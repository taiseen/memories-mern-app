import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import { signIn, signUp } from '../../reduxStore/actions/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {

  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();


  const switchMode = () => {
    setForm(initialState);
    setIsSignUp(prevIsSignUp => !prevIsSignUp);
    setShowPassword(false);
  }

  // 1:16:30
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(form, navigate));
    } else {
      dispatch(signIn(form, navigate));
    }
  }

  const googleSuccess = async (res) => {

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const googleError = () => alert('🔴 Google Sign In was unsuccessful.\n🔴 Try again later...');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  
   
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
                  <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }

            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange}
              type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

            {
              isSignUp &&
              <Input type="password" name="confirmPassword" label="Repeat Password" handleChange={handleChange} />
            }

          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>


          <GoogleLogin
            clientId="16518181149-01jum6i83a2kkj3jk1s8mmbiq2hch8v5.apps.googleusercontent.com"

            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={classes.googleButton}
                startIcon={<Icon />}
                color="primary"
                variant="contained"
                fullWidth
              > Google Sign In </Button>
            )}

            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />


          <Grid container justifyContent="center">
            <Grid item>
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
