import React, {useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import useStyles from './style.js';
import moment from 'moment';
import {getPost, getPostBySearch} from "../../store/actions/PostsActions";
import {CircularProgress, Divider, Paper, Typography} from "@material-ui/core";

const PostDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {post, posts, isLoading} = useSelector(state => state.posts);
    const {id} = useParams();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({search: "none", tags: post.tags.join(",")}));
        }
    }, [dispatch, post]);

    if (!post) {
        return null;
    }

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress
                    size={"7em"}
                />
            </Paper>
        )
    }

    const recommendedPost = posts.filter(({_id}) => _id !== post._id);

    const handleRecommendedPostOpen = (_id) => history.push(`/posts/${_id}`);

    return (
        <Paper style={{padding: '20px', borderRadius: '15px', marginBottom: "10px",}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary"
                                component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Divider/>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div>
                            <Typography variant="h6">Created by: {post.name}</Typography>
                            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        </div>
                        <Typography variant="h6">
                            Likes <span style={{color: "red"}}>&#10084;</span>: {post.likes.length}
                        </Typography>
                    </div>
                    {/*<Typography variant="h6">Created by: {post.name}</Typography>*/}
                    {/*<Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>*/}
                    <Divider style={{margin: '20px 0'}}/>
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{margin: '20px 0'}}/>
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{margin: '20px 0'}}/>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media}
                         src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                         alt={post.title}/>
                </div>
            </div>
            {!!recommendedPost.length && (
                <div className={classes.section}>
                    <div style={{textAlign: "center"}}>
                        <Typography gutterBottom variant={"h4"}>You may also like&#128071;</Typography>
                    </div>
                    <Divider/>
                    <div className={classes.recommendedPosts}>
                        {recommendedPost.map(({title, name, message, likes, selectedFile, _id}) => (
                            <div
                                className={classes.recommendedPost}
                                onClick={() => handleRecommendedPostOpen(_id)} key={_id}>
                                <div style={{textAlign: "center"}}>
                                    <Typography gutterBottom variant={"h5"}>{title}</Typography>
                                    <Typography gutterBottom variant="h8">{name}</Typography>
                                    <Divider/>
                                    <div style={{height: "100px", overflowY: "scroll"}}>
                                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    </div>
                                    <Divider/>
                                    <Typography gutterBottom variant="subtitle1">Likes <span
                                        style={{color: "red"}}>&#10084;</span>: {likes.length}</Typography>
                                    <img src={selectedFile} width="200px" style={{ borderRadius: "5px" }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default PostDetail;