
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { getAllPost, getPostsBySearch } from '../../reduxStore/actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        // this call is very important... 
        // for loading 1st time data in ui...
        dispatch(getAllPost());

        // currentId ==> when user edit/update the post & enter submit
        // then at Form Component id become null again
        // for updating this change base on id, reload this component again...
    }, [currentId, dispatch]);



    // run this ==> when user click search button
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    // handle user enter button...
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // user press enter ==> call this search function...
            searchPost();
        }
    };

    // store/save all tags into tags useState local variable 
    // spreads all previous tags & add new tag into it...
    const handleAddChip = (tag) => setTags([...tags, tag]);


    // delete tag from tags array 
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter(tag => tag !== chipToDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3}
                    className={classes.gridContainer}>


                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>


                    <Grid item xs={12} sm={6} md={3}>

                        <AppBar className={classes.appBarSearch} position="static" color="inherit">

                            {/* Search Inputs  */}

                            <TextField fullWidth name="search" variant="outlined" label="Search Memories"
                                value={search}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={chip => handleAddChip(chip)}
                                onDelete={chip => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />

                            <Button variant="contained" color="primary"
                                className={classes.searchButton}
                                onClick={searchPost}
                            >
                                Search
                            </Button>

                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>


                </Grid>
            </Container>
        </Grow>
    )
}

export default Home