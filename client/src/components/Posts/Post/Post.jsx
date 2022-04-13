import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import { deletePost, likePost, imageDelete } from '../../../reduxStore/actions/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import useStyles from './styles';
import moment from 'moment';


const Post = ({ post, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const { title, name, createdAt, _id, imgUrl, tags, message, imgDeleteUrl } = post;

  // get user info from localStorage that server send as jwt(jsonWebToken)
  const user = JSON.parse(localStorage.getItem('profile'));

  // get the current login user id
  const userId = user?.result.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find(like => like === userId);

  // go to React Router for navigate this path... with post id
  const openPost = () => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === userId)
        ? (
          <>
            <ThumbUpAltIcon fontSize="small" />&nbsp;
            {
              likes.length > 2
                ? `You and ${likes.length - 1} others`
                : `${likes.length} like${likes.length > 1 ? 's' : ''}`
            }
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize="small" />&nbsp;
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const handleClick = async () => {

    await dispatch(likePost(_id));

    if (hasLikedPost) {
      setLikes(post.likes.filter(id => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  return (
    <Card className={classes.card} raised={true} elevation={6}>

      <ButtonBase className={classes.cardAction} onClick={openPost} component="span"
        name="test">

        <CardMedia className={classes.media} title={title}
          image={imgUrl ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />

        <div className={classes.overlay}>
          <Typography variant="h6">{name}</Typography>

          <Typography variant="body2">
            {moment(createdAt).fromNow()}
          </Typography>
        </div>


        { // show EDIT Button as for only Current User ==> who Login at system... 
          // (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          (userId === post?.creator) && (

            <div className={classes.overlay2} name="edit">
              <Button
                size="small"
                style={{ color: 'white' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(_id);
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </div>
          )
        }



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

      </ButtonBase>


      <CardActions className={classes.cardActions}>

        {/* if no User Login at system, disable Like Button... 👍👍👍*/}
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleClick}>
          <Likes />
        </Button>


        { // show Delete Button as for only Current User ==> who Login at system... 
          (userId === post?.creator) && (
            <Button size="small" color="secondary"
              onClick={() => [
                dispatch(deletePost(_id)),
                dispatch(imageDelete(imgDeleteUrl))
              ]}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )
        }

      </CardActions>

    </Card>
  )
}

export default Post  