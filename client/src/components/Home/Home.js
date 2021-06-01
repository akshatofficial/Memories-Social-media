import React, {useEffect, useState} from "react";

import {Container, Grow, Grid, Paper, AppBar, Button, TextField, Chip} from "@material-ui/core";

import Posts from "../Posts";
import Form from "../Form";
import Paginate from '../Pagination/Paginations.jsx';

import ChipInput from 'material-ui-chip-input';

import {useDispatch} from "react-redux";
import {getPostBySearch, getPosts} from "../../store/actions/PostsActions";

import {useHistory, useLocation} from 'react-router-dom';

import useStyle from './style.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const query = useQuery();
    const history = useHistory();

    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery")

    const classes = useStyle();

    const [currId, setCurrId] = useState(null);
    const [search, setSearch] = useState("");
    const [searchTags, setSearchTags] = useState([]);

    const dispatch = useDispatch();
    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(getPosts());
    //     }, 3000);
    // }, [currId, dispatch]);

    const handleChipAdd = (tagToAdd) => {
        setSearchTags([...searchTags, tagToAdd]);
    }

    const handleChipDelete = (tagToDelete) => {
        const updatedTagsArray = searchTags.filter((tag) => tag !== tagToDelete);
        setSearchTags([...updatedTagsArray]);
    }

    const searchPost = () => {
        if (search.trim() || searchTags) {
            dispatch(getPostBySearch({search, tags: searchTags.join(",")}));
            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${searchTags.join(",")}`);
        } else {
            history.push("/");
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //Search....
            searchPost();
        }
    }

    return (
        <Grow in>
            <Container maxWidth={"xl"}>
                <Grid container justify="space-between" alignItems="stretch" spacing={2}
                      className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrId={setCurrId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position={"static"} color={"inherit"}>
                            <TextField
                                name={"search"}
                                label={"Search"}
                                variant={"outlined"}
                                fullWidth={true}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput
                                style={{margin: "10px 0"}}
                                variant={"outlined"}
                                value={searchTags}
                                onAdd={handleChipAdd}
                                onDelete={handleChipDelete}
                                label={"Search By Tags"}
                            />
                            <Button className={classes.searchButton} variant={"contained"} onClick={searchPost}>
                                Search
                            </Button>
                        </AppBar>
                        <Form setCurrId={setCurrId} currId={currId}/>
                        {!searchQuery && !searchTags.length && (
                            <div style={{marginTop: "5px"}}>
                                <Paper elevation={6} className={classes.pagination}>
                                    <Paginate page={page}/>
                                </Paper>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
