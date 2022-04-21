import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginationPost } from '../../reduxStore/actions/posts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useStyles from './styles';



const Paginate = ({ page }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector(state => state.posts)

    
    // when user click on Pagination button for new posts...
    // then re-run this component again with new posts...
    useEffect(() => {
        if (page) dispatch(getPaginationPost(page));
    }, [dispatch, page])


    // count = how many pages we have || numberOfPages
    // page = currently in which page is active/highlighted
    return (

        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='secondary'
            renderItem={item => (

                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?pageNumber=${item.page}`}
                />
                
            )}
        />
    )
}

export default Paginate