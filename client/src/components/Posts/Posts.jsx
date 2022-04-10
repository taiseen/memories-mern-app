import React from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {

  // redux read operation... get all posts from reducer | redux global store...
  const { posts, isLoading } = useSelector(state => state.posts);
  console.log(posts)

  const classes = useStyles();

   
  if(!posts.length && !isLoading) return "No Post Found...";


  return (
    isLoading
      ? <CircularProgress />
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