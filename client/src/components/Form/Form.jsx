import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../reduxStore/actions/posts';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';

// get the current id
const Form = ({ currentId, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector(state => currentId && state.posts.find(p => p._id === currentId))

  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: ''
  });


  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);



  // values send to the server...
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();

    console.table(postData)
  }

  // collect user input values...
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: null });
  }

  return (

    <Paper className={classes.paper}>

      <form onSubmit={handleSubmit} className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate >

        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>

        <TextField fullWidth variant='outlined' name='creator' label='Creator' value={postData.creator} onChange={handleChange} />
        <TextField fullWidth variant='outlined' name='title' label='Title' value={postData.title} onChange={handleChange} />
        <TextField fullWidth variant='outlined' name='message' label='Message' value={postData.message} onChange={handleChange} />
        <TextField fullWidth variant='outlined' name='tags' label='Tags' value={postData.tags}
          onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })} />

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