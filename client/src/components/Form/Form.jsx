import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../reduxStore/actions/posts';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

// get the current id
const Form = ({ currentId, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // get that specific post, which user click on Edit Button...
  const post = useSelector(state => currentId && state.posts.posts.find(p => p._id === currentId));

  // get user info from localStorage that server send as jwt( jsonWebToken)
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '', message: '', tags: '', selectedFile: ''
  });



  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  // values send to the server... through the help of redux action creator...
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === null) {
      // from FrontEnd send to BackEnd ==> user name ==> with creating post data...
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }

    // clear all user input values form (ui) input field, after user submit these value into server...
    clear();
  }

  // collect user input values...
  const handleChange = (e) => {

    // hold previous value of an object + update current edited/input values...
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }


  // if no user present in the system... show this message...
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign-in to create your own memories 📸 & like 👍 other's memories... 😎
        </Typography>
      </Paper>
    );
  }


  return (

    <Paper className={classes.paper} elevation={6}>

      <form onSubmit={handleSubmit} className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate >

        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>

        <TextField fullWidth variant='outlined' name='title' label='Title' value={postData.title} onChange={handleChange} />
        <TextField fullWidth variant='outlined' name='message' label='Message' value={postData.message} onChange={handleChange} />
        <TextField fullWidth variant='outlined' name='tags' label="Tags (coma separated)" value={postData.tags}
          onChange={e => setPostData({ ...postData, tags: e.target.value.split(',').map(tag => tag.trim()) })} />

        <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
          Submit
        </Button>

        <Button className={classes.buttonClear} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
          Clear
        </Button>

      </form>
    </Paper >
  )
}

export default Form