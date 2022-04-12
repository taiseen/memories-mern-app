import { Typography, TextField, Button } from '@material-ui/core/';
import { commentPost } from '../../reduxStore/actions/posts';
import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import useStyles from './styles';


const CommentSection = ({ post }) => {

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();
    const dispatch = useDispatch();

    // get the current login user info, form LocalStorage...
    // & use it for ==> comment identification... that who is commenting?
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleComment = async () => {

        // 1) set user name : user comment, 
        // 2) this comment belong to which post? 
        //                                                          1)                       2)
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        // live update comment at current page...
        setComments(newComments);

        // clear the comment input area after click comment btn...
        setComment('');

        // auto scroll down at this position...
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    // handle user enter button...
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // user press enter ==> call this search function...
            handleComment();
        }
    };


    return (
        <div>
            <div className={classes.commentsOuterContainer}>

                <div className={classes.commentsInnerContainer}>

                    <Typography gutterBottom variant="h6">Comments</Typography>

                    {
                        comments?.map((comment, i) => (
                            <Typography
                                key={i}
                                gutterBottom
                                variant="subtitle1"
                            >
                                <strong>{comment.split(': ')[0]} : </strong>
                                {comment.split(':')[1]}
                            </Typography>
                        ))
                    }

                    {/* this is an anchor to use for auto scroll down */}
                    <div ref={commentsRef} />

                </div>


                {
                    user?.result?.name &&
                    (
                        <div style={{ width: '70%' }}>

                            <Typography gutterBottom variant="h6">Write a comment</Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                label="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />

                            <br />

                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                style={{ marginTop: '10px' }}
                                disabled={!comment.length}
                                onClick={handleComment}
                            >
                                Comment
                            </Button>

                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default CommentSection;