import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { deletePost, likePost } from '../../../reduxStore/actions/posts';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import useStyles from './styles';
import moment from 'moment';


const Post = ({ post, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, creator, createdAt, _id, selectedFile, tags, message, likeCount } = post;


  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
  //       ? (
  //         <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
  //       ) : (
  //         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
  //       );
  //   }

  //   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  // };

  return (
    <Card className={classes.card}>

      <CardMedia className={classes.media} title={title}
        image={selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />

      <div className={classes.overlay}>
        <Typography variant="h6">{creator}</Typography>

        <Typography variant="body2">
          {moment(createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(_id)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
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

        <Button size="small" color="primary" onClick={() => dispatch(likePost(_id))}>
          <ThumbUpAltIcon fontSize="small" />&nbsp;{likeCount} Like  </Button>

        <Button size="small" color="primary" onClick={() => dispatch(deletePost(_id))}>
          <DeleteIcon fontSize="small" /> Delete</Button>

      </CardActions>

    </Card>
  )
}

export default Post