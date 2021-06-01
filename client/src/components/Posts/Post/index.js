import React from "react";
import useStyle from "./style.js";
import "./style.css";

import moment from "moment";

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";

import {Delete, MoreHoriz, Favorite, FavoriteBorder} from '@material-ui/icons';

import {useHistory} from "react-router-dom";

import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../store/actions/PostsActions.js";

const Post = ({post, setCurrId}) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateClick = () => {
        setCurrId(post._id);
        handleClose();
    }

    const handleViewMemory = () => {
        history.push(`/posts/${post._id}`);
    }

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))) {
            return <><Favorite className={classes.favoriteBtn}/>&nbsp;{post.likes.length}</>
        }
        return <><FavoriteBorder/>&nbsp;{post.likes.length}</>
    };

    const classes = useStyle();
    return (
        <Card className={classes.card} elevation={6}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile}
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                <IconButton onClick={handleClick} aria-controls={"simple-menu"} aria-haspopup={"true"}>
                    <MoreHoriz fontSize="default" className={classes.updateBtn}/>
                </IconButton>
                <Menu
                    id={"simple-menu"}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
                        <MenuItem onClick={handleUpdateClick}>Update</MenuItem>
                    )}
                    <MenuItem onClick={handleViewMemory}>View Memory</MenuItem>
                </Menu>
            </div>
            <div className={classes.details} component="h2">
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <div
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid black",
                }}
            >
                <Typography classsname={classes.title} variant="h6" gutterBottom>
                    {post.title}
                </Typography>
            </div>
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    color="primary"
                    disabled={!user?.result}
                    onClick={() => dispatch(likePost(post._id))}
                    size="small"
                >
                    <Likes/>
                </Button>
                {(user?.result?._id === post.creator || user?.result?.googleId === post.creator) && (
                    <Button
                        color="secondary"
                        onClick={() => {
                            dispatch(deletePost(post._id));
                            setCurrId(null);
                            // window.location.reload();
                            // console.log("Deleted Fired!");
                        }}
                        size="small"
                    >
                        <Delete fontSize="small" color="secondary"/>
                        Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    );
};

export default Post;
