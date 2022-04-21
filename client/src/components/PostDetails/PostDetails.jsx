import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { getPost, getPostsBySearch } from '../../reduxStore/actions/posts';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommentSection from './CommentSection';
import useStyles from './styles';
import moment from 'moment';


const PostDetails = () => {

  const { post, posts, isLoading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();


  // get only single post base on ID, which click by user at UI...
  useEffect(() => {

    // redux - reducer ==> action creator call here...
    dispatch(getPost(id));

  }, [dispatch, id]);


  // for ==> you may also like other posts... 
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [dispatch, post]);


  // open this id specific post... by programmatically navigate...
  const openPost = _id => navigate(`/posts/${_id}`);

  // if no post have ==> return null
  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // recommended post related to current post...
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const { title, message, name, tags, createdAt, imgUrl } = post;

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>

      {/* Post Details - UI Section */}
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2"> {title} </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{message}</Typography>
          <Typography variant="h6">Created by: {name}</Typography>
          <Typography variant="body1">{moment(createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />

          {/* Comment Section call from here */}
          <CommentSection post={post} />

          <Divider style={{ margin: '20px 0' }} />
        </div>

        <div className={classes.imageSection}>
          <img
            alt={post.title}
            className={classes.media}
            src={imgUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          />
        </div>
      </div>


      { // Links of Related Posts...
        !!recommendedPosts.length &&
        (
          <div className={classes.section}>

            <Typography gutterBottom variant="h5">You might also like:</Typography>

            <Divider />

            <div className={classes.recommendedPosts}>

              {
                recommendedPosts.map(({ title, name, message, likes, imgUrl, _id }) =>
                (
                  <div style={{ margin: '20px', cursor: 'pointer' }}
                    onClick={() => openPost(_id)} key={_id}>

                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    <img src={imgUrl} width="200px" alt="" />
                  </div>
                ))
              }
            </div>

          </div>
        )
      }
    </Paper>
  );
};

export default PostDetails;
