import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../actions/posts';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
import useStyles from './styles';


const Paginate = () => {

    const classes = useStyles();
    const dispatch = useDispatch();


    // count = how many pages we have
    // page = currently in which page is active
    return (
        <Pagination
            className={classes.ul}
            count={5}
            page={1}
            variant='outline'
            colo='primary'
            renderItem={item => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${1}`}
                />
            )}
        >

        </Pagination>
    )
}

export default Paginate