import React from "react";
import Post from "./Post/index.js";
import useStyle from "./style.js";

import {Grid, CircularProgress} from "@material-ui/core";

import {useSelector} from "react-redux";

const Posts = ({setCurrId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyle();

    if (!posts.length && !isLoading) {
        return <><p> No Posts </p></>
    }

    //console.log(posts);
    return  isLoading ? (
        <CircularProgress/>
    ) : (
        <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts?.map((post) => (
                <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrId={setCurrId}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
