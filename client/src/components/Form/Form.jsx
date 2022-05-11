import { createPost, updatePost, imageUpload } from '../../reduxStore/actions/posts';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import FileBase from 'react-file-base64';
import useStyles from './styles';


// this component is call from 🟨 Home.js <Component /> 🟨
const Form = ({ currentId, setCurrentId }) => {
  // get the current id

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // get that specific post, which user click on Edit Button...
  const post = useSelector(state => currentId && state.posts.posts.find(p => p._id === currentId));
  const imgbb = useSelector(imgStore => imgStore.img);


  // get user info from localStorage that server send as jwt( jsonWebToken)
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '', message: '', tags: '', imgUrl: '', imgDeleteUrl: ''
  });


  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  var value = true;
  // false ===> btn Open | Enable
  // true ===> btn Close | Disable
  if (currentId !== null) {
    value = false;
  } else if (!imgbb.isSuccess) {
    value = false;
  } else {
    value = true;
  }



  // values send to the server... through the help of redux action creator...
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === null) {

      // console.log({ ...postData, name: user?.result?.name, selectedFile: imgbb?.url })

      const userPost = {
        ...postData,
        // from FrontEnd send to BackEnd ==> user name ==> with creating post data...
        name: user?.result?.name,
        imgUrl: imgbb?.imgbb?.url,
        imgDeleteUrl: imgbb?.imgbb?.deleteUrl
      }
      dispatch(createPost(userPost, navigate));
      value = true;
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }

    // clear all user input values form (ui) input field, after user submit these value into server...
    e.target.value = null;
    clear();

    // for disabling submit btn...
  }

  // collect user input values...
  const handleChange = (e) => {

    // hold previous value of an object + update current edited/input values...
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', imgUrl: '' });
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

  const handleImageUpload = (e) => {

    const selectedIMG = e.target.files[0];
    const imageData = new FormData();
    imageData.set('key', 'e6a6e2fab17e156f5aec357902880cea');
    imageData.append('image', selectedIMG);

    dispatch(imageUpload(imageData));
  }

  console.log('img d.link ', imgbb?.imgbb?.deleteUrl);


  return (

    <Paper className={classes.paper} elevation={6}>

      <form
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        autoComplete='off'
        noValidate
      >

        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a memory
        </Typography>

        <TextField
          fullWidth
          name='title'
          label='Title'
          variant='outlined'
          value={postData.title}
          onChange={handleChange} />

        <TextField
          fullWidth
          name='message'
          label='Message'
          variant='outlined'
          multiline rows={5}
          value={postData.message}
          onChange={handleChange} />

        <TextField
          fullWidth
          name='tags'
          variant='outlined'
          label="Tags (coma separated)"
          value={postData.tags}
          onChange={e => setPostData(
            {
              ...postData, tags: e.target.value
                .split(',')
                .map(tag => tag.trim())
            }
          )} />

        {/* <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div> */}

        <div className={classes.fileInput}>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload} />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant='contained'
          disabled={value}
          color='primary'
          type='submit'
          size='large'
          fullWidth
        >
          {currentId ? 'Update' : 'Submit'}
        </Button>

        <Button
          disabled={!postData.tags.length}
          className={classes.buttonClear}
          variant='contained'
          color='secondary'
          onClick={clear}
          size='small'
          fullWidth
        >
          Clear all
        </Button>

      </form>
    </Paper >
  )
}

export default Form