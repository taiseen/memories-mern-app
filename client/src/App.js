import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Form, Posts } from './components';
import { useDispatch } from 'react-redux';
import { getAllPost } from './reduxStore/actions/posts';
import memory from './assets/memories.png';
import useStyles from './styles';


function App() {

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();


  useEffect(() => {
    // this call is so important... 
    // for loading 1st data in ui...
    dispatch(getAllPost());
  }, [currentId, dispatch]);


  return (
    <Container maxWidth='lg'>

      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant='h2' align='center'>Moment's</Typography>
        <img className={classes.image} src={memory} alt="" height='60' />
      </AppBar>

      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>

            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>

          </Grid>
        </Container>
      </Grow>

    </Container >
  );
}

export default App;
