import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Post from './Post/Post'
import React from 'react'


// this component is call from 🟨 Home.js <Component /> 🟨
const Posts = ({ setCurrentId }) => {

  // redux global store...
  // redux read operation... get all posts | pagination post | search post from reducer 
  const { posts, isLoading } = useSelector(state => state.posts);

  const classes = useStyles();


  if (!posts.length && !isLoading) return <h1 style={{ color: 'orange' }}>No Post Found...</h1>;


  return (
    isLoading
      ? <CircularProgress style={{ color: "yellow" }} size={60} thickness={6} />
      : (
        <Grid
          className={classes.container}
          alignItems='stretch'
          spacing={3}
          container>
          {
            posts?.map(post => (
              <Grid key={post._id} item xm={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }
        </Grid>
      )
  )
}

export default Posts