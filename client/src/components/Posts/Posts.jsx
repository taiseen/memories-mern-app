import React from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {

  // redux read operation...
  const posts = useSelector(state => state.posts);
  const classes = useStyles();

  return (
    !posts.length
      ? <CircularProgress />
      : (
        <Grid
          className={classes.container}
          alignItems='stretch'
          spacing={3}
          container>
          {
            posts.map(post => (
              <Grid key={post._id} item xm={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }
        </Grid>
      )
  )
}

export default Posts