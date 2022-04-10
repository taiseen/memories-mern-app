import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { deletePost, likePost } from '../../../reduxStore/actions/posts';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import useStyles from './styles';
import moment from 'moment';


const Post = ({ post, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, name, createdAt, _id, selectedFile, tags, message } = post;

  // get user info from localStorage that server send as jwt(jsonWebToken)
  const user = JSON.parse(localStorage.getItem('profile'));


  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <>
            <ThumbUpAltIcon fontSize="small" />&nbsp;
            {
              post.likes.length > 2
                ? `You and ${post.likes.length - 1} others`
                : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`
            }
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize="small" />&nbsp;
            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };



  return (
    <Card className={classes.card} raised={true} elevation={6}>

      <CardMedia className={classes.media} title={title}
        image={selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />

      <div className={classes.overlay}>
        <Typography variant="h6">{name}</Typography>

        <Typography variant="body2">
          {moment(createdAt).fromNow()}
        </Typography>
      </div>


      {/* show EDIT Button as for only Current User Login at system... */}
      <div className={classes.overlay2}>
        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(_id)}>
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )
        }
      </div>


      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {tags.map(tag => `#${tag} `)}
        </Typography>
      </div>


      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>


      <CardContent className={classes.message} >
        <Typography variant="body2" color="textSecondary" component="p">
          {message}
        </Typography>
      </CardContent>


      <CardActions className={classes.cardActions}>

        {/* if no User Login at system, disable Like Button... */}
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(_id))}>
          <Likes />
        </Button>

        {/* show Delete Button as for only Current User Login at system... */}
        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(_id))}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )
        }

      </CardActions>

    </Card>
  )
}

export default Post  